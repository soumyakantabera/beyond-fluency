'use client';
import {Children,useEffect,useState,type ReactNode} from 'react';
import {LabIcon} from './lab-icon';
export function MobileDeck({children,className,label}:{children:ReactNode,className:string,label:string}){
 const items=Children.toArray(children);
 const [mobile,setMobile]=useState(false),[all,setAll]=useState(false),[index,setIndex]=useState(0);
 const compact=mobile&&!all;
 useEffect(()=>{const m=matchMedia('(max-width: 580px)');const update=()=>setMobile(m.matches);update();m.addEventListener('change',update);return()=>m.removeEventListener('change',update)},[]);
 function move(next:number){setIndex(Math.max(0,Math.min(items.length-1,next)));}
 return <div className={'mobile-deck '+(compact?'deck-compact':'')} role="region" aria-label={label}>
 {mobile&&<div className="deck-controls"><span aria-live="polite">{all?`${items.length} ${label}`:`${index+1} / ${items.length}`}</span><div>{!all&&<><button type="button" onClick={()=>move(index-1)} disabled={index===0} aria-label={`Previous ${label}`}><LabIcon name="back"/></button><button type="button" onClick={()=>move(index+1)} disabled={index===items.length-1} aria-label={`Next ${label}`}><LabIcon name="next"/></button></>}<button type="button" className="deck-expand" onClick={()=>setAll(!all)}>{all?'One at a time':'Show all'}</button></div></div>}
 <div className={className}>{items.map((item,i)=><div key={i} className="deck-item" hidden={compact&&i!==index}>{item}</div>)}</div>
 </div>
}
