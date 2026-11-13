async (page) => {
 const results=[];
 const ready=()=>page.waitForFunction(()=>document.querySelector('.cf-globe-wrap')?.dataset.ready==='1',null,{timeout:35000});
 const state=()=>page.locator('[data-testid="marketing-globe"]').evaluate(el=>({attempt:Number(el.dataset.globeAttempt),ready:el.dataset.globeReady,calls:Number(el.dataset.globeCalls),canvas:el.querySelectorAll('canvas').length}));
 const fallback=async()=>{
  await page.waitForTimeout(350);
  const visible=await page.locator('.cf-earth-fallback').evaluate(el=>el.complete&&el.naturalWidth>0&&Number(getComputedStyle(el).opacity)===1&&el.getBoundingClientRect().width>100);
  if(!visible)throw Error('故障时静态地球没有出现');
 };
 await ready();
 const riskCount=await page.locator('.cf-globe-wrap').getAttribute('data-risks');
 if(!riskCount||Number(riskCount)<1)throw Error('风险资料没有加载');
 for(const name of ['manifest.json','globe-renderer.js','world-land.geojson']){
  const pattern='**/globe-assets/'+name+'*';
  await page.route(pattern,route=>route.abort());
  await page.reload();
  await page.waitForFunction(()=>Number(document.querySelector('[data-testid="marketing-globe"]')?.dataset.globeAttempt)>0,null,{timeout:15000});
  await fallback();
  if(await page.locator('.cf-globe-wrap').getAttribute('data-risks')!==riskCount)throw Error('地球失败影响了风险列表');
  if(await page.locator('.cf-chain-box').count()!==3)throw Error('地球失败影响了三流列表');
  if(name==='manifest.json')await page.screenshot({path:'output/playwright/globe-fallback.png'});
  await page.unroute(pattern);await ready();
  const recovered=await state();
  if(recovered.canvas!==1||recovered.calls<1)throw Error(name+' 解除故障后没有自动恢复');
  results.push({fault:name,recovered});
 }
 const rendererLoads=[];
 page.on('request',request=>{if(request.url().includes('/globe-assets/globe-renderer.js'))rendererLoads.push(request.url());});
 let before=await state();
 await page.locator('[data-testid="marketing-globe"] canvas').evaluate(canvas=>{
  const extension=canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context');
  if(!extension)throw Error('无法模拟显卡绘制中断');
  extension.loseContext();
 });
 await page.waitForFunction(()=>document.querySelector('.cf-globe-wrap')?.dataset.ready==='0',null,{timeout:5000});
 await fallback();await ready();
 let recovered=await state();if(recovered.attempt<=before.attempt)throw Error('显卡绘制中断后没有重建地球');
 results.push({fault:'webglcontextlost',recovered});
 before=await state();
 await page.locator('[data-testid="marketing-globe"] canvas').evaluate(canvas=>canvas.remove());
 await page.waitForFunction(()=>Number(document.querySelector('[data-testid="marketing-globe"]')?.dataset.globeAttempt)>0&&document.querySelector('.cf-globe-wrap')?.dataset.ready==='0',null,{timeout:5000});
 await ready();recovered=await state();
 if(recovered.attempt<=before.attempt)throw Error('绘制节点丢失后没有重建地球');
 results.push({fault:'canvas removed',recovered});
 if(rendererLoads.length!==0)throw Error('显卡重建重复加载渲染模块');
 let heldRequest=null;
 const hangPattern='**/globe-assets/manifest.json*';
 await page.route(hangPattern,route=>{if(!heldRequest){heldRequest=route;return;}return route.continue();});
 await page.reload();await ready();
 if((await state()).attempt<1)throw Error('持续等待的资源没有触发超时恢复');
 await page.unroute(hangPattern);
 await heldRequest?.abort().catch(()=>{});
 results.push({fault:'resource timeout',recovered:await state()});
 await page.screenshot({path:'output/playwright/globe-recovered.png'});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.setViewportSize({width:390,height:844});
 await page.reload();await ready();
 const mobile=await state();await page.waitForTimeout(14000);
 if((await state()).attempt!==mobile.attempt)throw Error('减少动态效果导致无故重建');
 await page.getByRole('button',{name:'切换为英文'}).click();
 if(await page.locator('html').getAttribute('lang')!=='en')throw Error('语言切换不可用');
 results.push({fault:'mobile and reduced motion',recovered:await state()});
 await page.screenshot({path:'output/playwright/globe-mobile-en.png'});
 await page.setViewportSize({width:1440,height:900});
 await page.addInitScript(()=>document.addEventListener('DOMContentLoaded',()=>{
  const style=document.createElement('style');style.id='test-hidden-globe';style.textContent='.cf-globe-stage{display:none!important}';document.head.append(style);
 }));
 await page.reload();await page.waitForTimeout(14000);
 if((await state()).attempt!==0)throw Error('隐藏的地球被误判为首帧超时');
 await page.evaluate(()=>document.querySelector('#test-hidden-globe')?.remove());await ready();
 results.push({fault:'initially hidden',recovered:await state()});
 return {ok:true,riskCount,results};
}
