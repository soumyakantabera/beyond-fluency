import fs from 'node:fs';
import assert from 'node:assert/strict';
import worker from '../dist/server/index.js';
const env={ASSETS:{async fetch(request){const file='dist/client'+new URL(request.url).pathname;if(!fs.existsSync(file))return new Response('Missing',{status:404});return new Response(fs.readFileSync(file),{headers:{'Content-Type':'application/octet-stream'}})}}};
const context={waitUntil(){},passThroughOnException(){}};
const sitemap=fs.readFileSync('public/sitemap.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
for(const url of urls){const response=await worker.fetch(new Request(url+'?utm_source=validation'),env,context);assert.equal(response.status,200);assert.match(response.headers.get('Content-Type'),/text\/html/);assert.match(await response.text(),/<h1/);}
const redir=await worker.fetch(new Request(urls[1]+'/?utm_source=validation'),env,context);assert.equal(redir.status,308);assert.equal(redir.headers.get('Location'),urls[1]+'?utm_source=validation');
const head=await worker.fetch(new Request(urls[0],{method:'HEAD'}),env,context);assert.equal(await head.text(),'');
console.log('PASS: all 30 routes deliver pre-rendered HTML, canonical trailing-slash redirects retain UTM values, and HEAD has no body.');
