"use client";
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,ArrowUpRight,Menu,X,ChevronDown,ExternalLink} from 'lucide-react';
import {MarketingGlobe} from './MarketingGlobe';
import type {GlobeRisk} from './MarketingGlobe';
export function MarketingLanding(){
 const [lang,setLang]=useState<'zh'|'en'>('zh'),[menu,setMenu]=useState(false),[risks,setRisks]=useState<GlobeRisk[]>([]),[activeRisk,setActiveRisk]=useState(''),[hoverRisk,setHoverRisk]=useState('');const site=useRef<HTMLDivElement>(null),heroRef=useRef<HTMLElement>(null);const zh=lang==='zh';
 useEffect(()=>{fetch('/risk-feed.json').then(r=>r.json()).then(d=>{if(Array.isArray(d.items))setRisks(d.items);}).catch(()=>{});},[]);
 useEffect(()=>{const stored=localStorage.getItem('chainflow-language'),next=stored==='en'?'en':'zh';setLang(next);document.documentElement.lang=next==='en'?'en':'zh-CN';},[]);
 useEffect(()=>{if(!site.current)return;const nodes=site.current.querySelectorAll('[data-reveal]'),reduce=matchMedia('(prefers-reduced-motion: reduce)');if(reduce.matches)return;const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){const el=entry.target;el.animate([{opacity:.1,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});observer.unobserve(el);}},{threshold:.12});nodes.forEach(n=>observer.observe(n));return()=>observer.disconnect();},[]);
 useEffect(()=>{
  const el=heroRef.current;if(!el)return;
  let frame=0;
  const apply=()=>{frame=0;const rect=el.getBoundingClientRect(),total=Math.max(1,rect.height-window.innerHeight);
   const p=Math.min(1,Math.max(0,-rect.top/total));el.style.setProperty('--p',p.toFixed(4));};
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(apply);};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
  return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);cancelAnimationFrame(frame);};
 },[]);
 const openGlobe=()=>{const el=heroRef.current;if(!el)return;const rect=el.getBoundingClientRect(),top=window.scrollY+rect.top,total=rect.height-window.innerHeight;window.scrollTo({top:top+total*.85,behavior:'smooth'});};
 function toggleLang(){const next=zh?'en':'zh';setLang(next);localStorage.setItem('chainflow-language',next);document.documentElement.lang=next==='zh'?'zh-CN':'en';}
 const nav=[[zh?'关于':'About','#about']];
 return <div className="cf-site" ref={site}><a className="cf-skip" href="#main">{zh?'跳到正文':'Skip to content'}</a><header className="cf-nav"><div className="cf-container cf-nav-inner"><a href="#top" className="cf-wordmark" aria-label="ChainFlow home"><img className="cf-brand-icon" src="/chainflow-mark-256.png" alt="" width="30" height="30" decoding="async"/>ChainFlow<span className="cf-brand-cn">链流</span></a><nav className={menu?'is-open':''} aria-label={zh?'官网导航':'Site navigation'}>{nav.map(([label,href])=><a key={href} href={href} onClick={()=>setMenu(false)}>{label}</a>)}</nav><div className="cf-nav-actions"><button onClick={toggleLang} className="cf-lang" aria-label={zh?'切换为英文':'Switch to Chinese'}>{zh?'EN':'中文'}</button><a className="cf-button cf-button-small" href="/demo">{zh?'体验工作台':'Open workbench'}<ArrowUpRight size={15}/></a><button className="cf-menu" aria-label={zh?'展开导航':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X size={21}/>:<Menu size={21}/>}</button></div></div></header>
 <main id="main"><section id="top" className="cf-hero-scroll" ref={heroRef}>
  <div className="cf-hero-pin">
   <div className="cf-hero-inner">
    <div className="cf-hero-copy"><h1 className="cf-hero-title">{(zh?['让供应链，','如水一般。']:['Supply chains,','in full flow.']).map((line,i)=><span className="cf-line-mask" key={i}><span style={{animationDelay:i*110+'ms'}}>{line}</span></span>)}</h1><p className="cf-hero-description">{zh?'打通物料、资金、信息的全球流动，提前感知供应链风险':'Move materials, capital and information as one flow. See supply risk before it lands.'}</p></div>
    <div className="cf-globe-stage"><MarketingGlobe lang={lang} risks={risks} activeId={activeRisk} onPick={setActiveRisk} onHover={setHoverRisk} onOpen={openGlobe}/></div>
   </div>
   <aside className="cf-rail cf-rail-left" aria-label={zh?'全球三流':'Global three flows'}>
    <header><span className="cf-dot"/>{zh?'全球三流':'Three flows'}</header>
    {[{k:'goods',c:'#2A76BB',t:zh?'实物流':'Physical flow',d:zh?'零部件、原材料与成品的跨区流转':'Parts, materials and finished goods'},{k:'capital',c:'#E9C46A',t:zh?'资金流':'Capital flow',d:zh?'货款、账期与票据结算往来':'Payment, terms and settlement'},{k:'information',c:'#2EC4B6',t:zh?'信息流':'Information flow',d:zh?'订单、交期、质量与变更协同':'Orders, lead time, quality and changes'}].map(g=>{const items=risks.filter(r=>r.flow===g.k).slice(0,3);return <section className="cf-chain-box" key={g.k}><div className="cf-chain-head"><i style={{background:g.c}}/><b>{g.t}</b></div><ul>{items.map(r=><li key={r.id} onMouseEnter={()=>setActiveRisk(r.id)}><b>{r.title}</b><small>{r.place} · {r.publishedAt}</small></li>)}{!items.length&&<li className="is-empty">{zh?'本期无更新':'No updates'}</li>}</ul></section>;})}
   </aside>
   <aside className="cf-rail cf-rail-right" aria-label={zh?'全球风险':'Global risks'}>
    <header><span className="cf-dot is-alert"/>{zh?'全球风险':'Global risks'}<em>{risks.length}</em></header>
    <ul>{risks.slice(0,6).map(r=><li key={r.id} className={activeRisk===r.id||hoverRisk===r.id?'is-active':''} onMouseEnter={()=>setActiveRisk(r.id)}><span className={`cf-risk-tag topic-${r.topic}`}>{r.topicLabel}</span><b>{r.title}</b><small>{r.place} · {r.publishedAt}</small></li>)}</ul>
   </aside>
  </div>
 </section>
 <section id="demo" className="cf-section cf-container"><div className="cf-section-heading" data-reveal><div><h2>{zh?'一个工作台，把业务连起来。':'One workbench. Connected work.'}</h2><p>{zh?'从产品 BOM 到多方回件、齐套核算和供应网络，围绕同一批工作连续推进。':'Follow the same build from product BOMs through supplier replies, material readiness and the supply network.'}</p></div><a className="cf-text-link" href="#top">{zh?'回到顶部':'Back to top'}<ArrowUpRight size={17}/></a></div><div className="cf-product-preview" data-ui="true" data-reveal><div className="cf-preview-frame"><img src="/marketing/workbench.jpg" alt={zh?'ChainFlow 齐套工作台实际演示界面':'Actual ChainFlow workbench demonstration'} width="1440" height="1050" loading="lazy"/></div></div><div className="cf-scenario-scale" data-reveal>{[[120,zh?'供应商':'Suppliers'],[360,zh?'联系人':'Contacts'],['2,400',zh?'物料':'Materials'],[12,zh?'产品案例':'Product cases']].map(([n,label])=><div key={label}><strong>{n}</strong><span>{label}</span></div>)}<p>{zh?'完整演示使用独立虚构案例。':'The full demo uses independent fictional cases.'}</p></div></section>
 <section className="cf-container cf-network-story cf-section"><div data-reveal><h2>{zh?<>找到供应商，<br/>也看见连接。</>:<>Find suppliers.<br/>See connections.</>}</h2><p>{zh?'地点、物料、联系人与风险来源，放进同一张网络。让下一次寻料、询价和核对，从已有积累开始。':'Places, materials, contacts and risk sources in one network. Start your next sourcing or quote request with what you already know.'}</p><a className="cf-text-link" href="#risk-live">{zh?'看风险扫描':'See risk scan'}<ArrowUpRight size={17}/></a></div><figure data-reveal data-ui="true"><img src="/marketing/network.jpg" alt={zh?'供应网络三维地球与地域查询的实际演示界面':'Actual supply-network globe and geographic browsing interface'} width="1440" height="1050" loading="lazy"/></figure></section>
 <section id="risk-live" className="cf-container cf-section cf-risk-live">
  <div className="cf-section-heading" data-reveal><div><h2>{zh?'点开地球，看见正在发生的供应风险。':'Open the globe. See what is moving.'}</h2><p>{zh?'来自各国监管机构、企业公告与国际主要媒体，每条都可回到原文。':'From regulators, company announcements and major international outlets. Every item links back to its source.'}</p></div><a className="cf-text-link" href="#top">{zh?'看三流地球':'See the globe'}<ArrowUpRight size={17}/></a></div>
  <div className="cf-risk-desk" data-reveal>
   <div className="cf-cockpit">
    <header className="cf-cockpit-head"><span className="cf-dot"/><b>{zh?'供应风险看板':'Supply risk cockpit'}</b><small>{zh?'公开来源汇总':'Public sources'}</small></header>
    <div className="cf-cockpit-metrics">
     {[{n:risks.length,l:zh?'监测条目':'Items'},{n:risks.filter(r=>r.level==='important').length,l:zh?'需关注':'Watch'},{n:new Set(risks.map(r=>r.topic)).size,l:zh?'风险类别':'Topics'},{n:new Set(risks.map(r=>r.place)).size,l:zh?'涉及地区':'Regions'}].map(m=><div key={m.l}><strong>{m.n}</strong><span>{m.l}</span></div>)}
    </div>
    <ul className="cf-cockpit-flow">
     {[{k:'memory',t:zh?'存储与内存':'Memory'},{k:'components',t:zh?'被动元件与分立器件':'Components'},{k:'chips',t:zh?'芯片与材料管制':'Chips & materials'},{k:'upstream',t:zh?'航运与港口':'Logistics'},{k:'automotive',t:zh?'汽车电子与召回':'Automotive'}].map(g=>{const items=risks.filter(r=>r.topic===g.k);return <li key={g.k} className={items.length?'':'is-empty'}><div className="cf-flow-head"><span className={`cf-risk-tag topic-${g.k}`}>{g.t}</span><em>{items.length}</em></div>{items.slice(0,2).map(r=><button key={r.id} className={activeRisk===r.id?'is-active':''} onClick={()=>setActiveRisk(r.id)} onMouseEnter={()=>setActiveRisk(r.id)}><b>{r.title}</b><small>{r.place} · {r.publishedAt}</small></button>)}{!items.length&&<p className="cf-flow-empty">{zh?'本期无更新':'No updates'}</p>}</li>;})}
    </ul>
   </div>
   <div className="cf-risk-list">
    <header><b>{zh?'具体风险':'Risk items'}</b><small>{zh?'悬停或点击高亮对应地点':'Hover to highlight the location'}</small></header>
    <ul>{risks.map(r=><li key={r.id} className={activeRisk===r.id?'is-active':''} onMouseEnter={()=>setActiveRisk(r.id)}><div className="cf-risk-line"><span className={`cf-risk-tag topic-${r.topic}`}>{r.topicLabel}</span><time>{r.publishedAt}</time></div><b>{r.title}</b><p>{r.summary}</p><div className="cf-risk-foot"><span>{r.place} · {r.kind}</span>{r.source&&<a href={r.source} target="_blank" rel="noreferrer noopener">{zh?'原始来源':'Source'}<ExternalLink size={13}/></a>}</div></li>)}</ul>
   </div>
  </div>
 </section>
 <section className="cf-container cf-risk-story cf-section"><figure data-reveal data-ui="true"><img src="/marketing/risk.jpg" alt={zh?'风险扫描分层信息的实际人工演示界面':'Actual risk scan showing priority and source layers'} width="1440" height="1050" loading="lazy"/></figure><div data-reveal><h2>{zh?<>看到变化，<br/>也知道影响。</>:<>See the change.<br/>Trace the impact.</>}</h2><p>{zh?'重要事件、次要变化与待核线索分层显示。先读一句话结论，再展开来源，判断哪些事情值得跟进。':'Priorities, changes and unverified leads are shown separately. Read the summary, inspect the source, then decide what deserves follow-up.'}</p><a className="cf-text-link" href="#top">{zh?'回到顶部':'Back to top'}<ArrowUpRight size={17}/></a></div></section>
 <section className="cf-container cf-faq cf-section"><h2 data-reveal>{zh?'打开前，你可能想知道。':'Before you explore.'}</h2><div data-reveal>{[[zh?'这里看到的是公司真实数据吗？':'Does the demo contain company data?',zh?'演示用一套独立构造的产品、BOM、供方和联系人，业务关系完整。':'No. The public demo uses independently fictional products, BOMs, suppliers and contacts. Public industry information retains its source and date.'],[zh?'能直接体验哪些功能？':'What can I try?',zh?'驾驶舱、产品 BOM、齐套工作台、供应网络和风险扫描都可以直接操作。':'Explore the cockpit, BOMs, readiness workbench, supply network and risk examples. Real imports, company AI credentials, private email and actual sending are not connected in the public demo.'],[zh?'可以用于自己的团队吗？':'Can my team use ChainFlow?',zh?'可以，聊聊你的工作流和数据来源，从一项具体工作开始。':'We can discuss your workflow, data sources and deployment. Start with one clearly defined task and expand after validation.']].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
 <section id="about" className="cf-close"><div className="cf-container" data-reveal><h2>{zh?<>让下一步，<br/>接得上。</>:<>Keep work<br/>in flow.</>}</h2><div><p>{zh?'ChainFlow 是一个持续打磨的供应链工作台。目前以供应商管理为主线，后续沿业务扩展交付、工艺和质量模块。':'ChainFlow is an evolving supply-chain workbench. Supplier management is the current focus, with delivery, process and quality modules to follow.'}</p><div className="cf-close-actions"><a className="cf-button" href="#top">{zh?'回到顶部':'Back to top'}<ArrowRight size={18}/></a><a className="cf-text-link" href="mailto:zilong0691@outlook.com">{zh?'联系共创':'Get in touch'}<ArrowRight size={17}/></a></div></div></div></section></main>
 <footer className="cf-footer"><div className="cf-container"><a href="#top" className="cf-footer-word">ChainFlow</a><div><span>{zh?'连接信息，推动行动。':'Connect information. Move work forward.'}</span><a href="mailto:zilong0691@outlook.com">zilong0691@outlook.com</a><span>© {new Date().getFullYear()} ChainFlow</span></div></div></footer></div>;
}
