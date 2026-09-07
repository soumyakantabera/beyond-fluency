import fs from 'node:fs';
const origin=process.env.NEXT_PUBLIC_SITE_URL||(process.env.VERCEL_PROJECT_PRODUCTION_URL?'https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL:null);
if(!origin)throw new Error('Set NEXT_PUBLIC_SITE_URL to the final HTTPS production origin before building.');
for(const file of ['public/sitemap.xml','public/robots.txt','public/llms.txt']){const text=fs.readFileSync(file,'utf8');fs.writeFileSync(file,text.replace(/https:\/\/beyond-fluency-lab\.sbera9901\.chatgpt\.site/g,origin));}
