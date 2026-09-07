import fs from 'node:fs';
import path from 'node:path';
const from=path.resolve('dist/server/prerendered-routes'),to=path.resolve('dist/client/_pages');
let count=0;
function copy(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const src=path.join(dir,entry.name);if(entry.isDirectory())copy(src);else if(entry.name.endsWith('.html')){const dest=path.join(to,path.relative(from,src).replace(/\.html$/,'.page'));fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(src,dest);count++;}}}
copy(from);if(count!==31)throw new Error(`Expected 30 pages plus 404, got ${count}`);console.log(`Prepared ${count} static HTML assets for Worker delivery.`);
