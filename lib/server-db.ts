export async function database(){const {env}=await import('cloudflare:workers');if(!env.DB)throw new Error('Database unavailable');return env.DB;}
export async function mailConfig(){const {env}=await import('cloudflare:workers');const e=env as unknown as Record<string,string>;return {key:e.RESEND_API_KEY,from:e.EMAIL_FROM,ready:Boolean(e.RESEND_API_KEY&&e.EMAIL_FROM)};}

export async function storageReady(){try{const {env}=await import('cloudflare:workers');return Boolean(env.DB)}catch{return false}}
