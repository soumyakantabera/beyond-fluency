import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { Miniflare } from 'miniflare';
const compile=(p)=>ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const data=(code)=>'data:text/javascript;base64,'+Buffer.from(code).toString('base64');
const contentURL=data(compile('lib/content.ts'));
const diagnosticURL=data(compile('lib/diagnostic.ts').replace("'./content'",JSON.stringify(contentURL)));
const {scoreDiagnostic}=await import(diagnosticURL);
for(let n=0;n<3**7;n++){let m=n;const a=Array.from({length:7},()=>{const v=m%3;m=Math.floor(m/3);return v;});const r=scoreDiagnostic(a);assert.equal(r.scores.reduce((s,v)=>s+v,0),6);assert.equal(r.scores[r.dominant],Math.max(...r.scores));assert.ok(r.course?.slug);if(a[6]===0)assert.equal(r.courseIndex,1);}
assert.equal(scoreDiagnostic([0,0,1,1,2,2,1]).dominant,2);
assert.equal(scoreDiagnostic([1,1,1,1,1,1,1]).courseIndex,0);
assert.equal(scoreDiagnostic([2,2,2,2,2,2,2]).courseIndex,3);
const mf=new Miniflare({modules:true,script:'export default {fetch(){return new Response("test")}}',d1Databases:['DB'],compatibilityDate:'2026-05-15'});
try{
const db=await mf.getD1Database('DB');
for(const file of fs.readdirSync('drizzle').filter(x=>x.endsWith('.sql')))for(const sql of fs.readFileSync('drizzle/'+file,'utf8').split('--> statement-breakpoint').map(s=>s.trim()).filter(Boolean))await db.prepare(sql).run();
globalThis.__testDB=db;
const serverURL=data('export async function database(){return globalThis.__testDB};export async function mailConfig(){return {ready:false}}');
const routeCode=compile('app/api/leads/route.ts').replace("'@/lib/server-db'",JSON.stringify(serverURL)).replace("'@/lib/diagnostic'",JSON.stringify(diagnosticURL)).replace("'@/lib/content'",JSON.stringify(contentURL));
const {POST}=await import(data(routeCode));
const req=(p,origin='https://test.example')=>new Request('https://test.example/api/leads',{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(p)});
const base={kind:'report',email:'report@example.com',answers:[0,0,0,0,0,0,1],consent:true,website:'',utm:{utm_campaign:'test'}};
assert.equal((await POST(req({...base,email:'bad'}))).status,400);
assert.equal((await POST(req({...base,consent:false}))).status,400);
assert.equal((await POST(req(base,'https://elsewhere.example'))).status,403);
const response=await POST(req(base));assert.equal(response.status,201);assert.match((await response.json()).message,/pending/);
const row=await db.prepare('SELECT * FROM leads WHERE email = ?').bind(base.email).first();assert.equal(row.dimension,'Persuasive Structure');assert.equal(row.course,'professional-communication');assert.equal(row.email_status,'pending');assert.equal(JSON.parse(row.utm).utm_campaign,'test');
assert.equal((await POST(req(base))).status,429);
const trial={kind:'trial',email:'trial@example.com',name:'Test Learner',timezone:'Europe/Berlin',availability:'Evenings',course:'career-interview-intensive',consent:true,website:''};
assert.equal((await POST(req(trial))).status,201);
assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM leads').first()).n,2);
console.log('PASS: 2,187 diagnostic combinations, tie handling, interview mapping, invalid input, origin check, consent, duplicate control, and persisted report/trial requests. No emails sent.');
}finally{await mf.dispose();delete globalThis.__testDB;}
