'use client';
import { useState, useEffect } from 'react';
import { LabIcon } from './lab-icon';
import { usePathname } from 'next/navigation';
export function Navigation(){
 const [open,setOpen]=useState(false);const path=usePathname();
 useEffect(()=>{
  setOpen(false);
  const source=new URLSearchParams(location.search);const params=new URLSearchParams();
  for(const k of ['utm_source','utm_medium','utm_campaign','utm_term','utm_content']){const value=source.get(k);if(value)params.set(k,value.slice(0,200));}
  if(!params.size)return;
  function enrich(a:HTMLAnchorElement){const u=new URL(a.href,location.origin);if(u.origin!==location.origin)return;params.forEach((v,k)=>u.searchParams.set(k,v));a.href=u.pathname+u.search+u.hash;}
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach(enrich);
  function track(event:MouseEvent){const a=(event.target as Element)?.closest<HTMLAnchorElement>('a[href]');if(a)enrich(a);}
  document.addEventListener('click',track,true);return ()=>document.removeEventListener('click',track,true);
 },[path]);
 return <><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}><LabIcon name={open?'close':'menu'}/><span>{open?'Close':'Menu'}</span></button><nav id="navigation" aria-label="Main navigation" className={'nav '+(open?'open':'')}>{[['/courses','Courses'],['/who-its-for','Who it’s for'],['/our-method','Our method'],['/blog','Journal'],['/about','About']].map(([href,label])=><a key={href} href={href} className={path.startsWith(href)?'active':''} aria-current={path===href?'page':undefined}>{label}</a>)}<a className="btn" href="/enrol">Join a course <LabIcon name="arrow" size={16}/></a></nav></>;
}
