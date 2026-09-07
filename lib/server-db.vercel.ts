// Vercel's Node runtime uses libSQL over HTTPS; no filesystem persistence.
export function storageReady(){return Boolean(process.env.TURSO_DATABASE_URL&&process.env.TURSO_AUTH_TOKEN)}
type Value=string|number|null;
async function execute(sql:string,values:Value[]){
 if(!storageReady())throw new Error('Lead storage has not been connected');
 const base=process.env.TURSO_DATABASE_URL!.replace(/^(libsql|turso):/, 'https:');
 const response=await fetch(new URL('/v2/pipeline',base),{method:'POST',cache:'no-store',signal:AbortSignal.timeout(10000),headers:{Authorization:`Bearer ${process.env.TURSO_AUTH_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({requests:[{type:'execute',stmt:{sql,args:values.map(v=>v===null?{type:'null'}:{type:typeof v==='number'?'integer':'text',value:String(v)}),want_rows:true}},{type:'close'}]})});
 if(!response.ok)throw new Error('Database request failed');
 const body=await response.json() as {results?:{type:string;response:{result:{cols:{name:string}[];rows:{type:string;value?:string}[][]}}}[]};const entry=body.results?.[0];if(entry?.type!=='ok')throw new Error('Database statement failed');return entry.response.result as {cols:{name:string}[];rows:{type:string;value?:string}[][]};
}
export async function database(){if(!storageReady())throw new Error('Lead storage has not been connected');return {prepare(sql:string){return {bind(...values:Value[]){return {async first(){const r=await execute(sql,values);return r.rows.length?Object.fromEntries(r.cols.map((c,i)=>[c.name,r.rows[0][i].value??null])):null},async run(){return execute(sql,values)}}}}}}}
export async function mailConfig(){return {key:process.env.RESEND_API_KEY,from:process.env.EMAIL_FROM,ready:Boolean(process.env.RESEND_API_KEY&&process.env.EMAIL_FROM)}}
