import type { NextConfig } from 'next';
import path from 'node:path';
const nextConfig:NextConfig={
 webpack(config){if(process.env.VERCEL==='1'||process.env.BFL_VERCEL_BUILD==='1')config.resolve.alias['@/lib/server-db']=path.resolve('lib/server-db.vercel.ts');return config},
 poweredByHeader:false,
 experimental:{cpus:2},
};
export default nextConfig;
