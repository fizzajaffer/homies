'use client';
import NextLink from 'next/link';
import {useSyncExternalStore} from 'react';
import type {ComponentProps} from 'react';
import {activeCase} from '../client/case-session';
function subscribe(fn:()=>void){window.addEventListener('tenant-case',fn);window.addEventListener('popstate',fn);return()=>{window.removeEventListener('tenant-case',fn);window.removeEventListener('popstate',fn);};}
export default function CaseLink(props:ComponentProps<typeof NextLink>){const id=useSyncExternalStore(subscribe,activeCase,()=> '');let href=props.href;if(id&&typeof href==='string'&&href.startsWith('/')&&!href.startsWith('/api/')){const u=new URL(href,'http://local');u.searchParams.set('case',id);href=u.pathname+u.search+u.hash;}return <NextLink {...props} href={href}/>;}
