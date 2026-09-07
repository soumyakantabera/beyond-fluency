/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { paths } from "../lib/routes";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (env?.ASSETS && (request.method === "GET" || request.method === "HEAD") && !request.headers.has("rsc")) {
      const clean = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : "/";
      if (paths.includes(clean)) {
        if (clean !== url.pathname) { url.pathname = clean; return Response.redirect(url.toString(), 308); }
        const file = "/_pages" + (clean === "/" ? "/index" : clean) + ".page";
        const asset = await env.ASSETS.fetch(new Request(new URL(file, request.url)));
        if (asset.ok) {
          const headers = new Headers(asset.headers);
          headers.set("Content-Type", "text/html; charset=utf-8");
          headers.set("Cache-Control", "public, max-age=0, must-revalidate");
          headers.set("X-Content-Type-Options", "nosniff");
          return new Response(request.method === "HEAD" ? null : asset.body, {status:200, headers});
        }
      }
    }
    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
