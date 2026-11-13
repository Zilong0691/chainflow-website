async (page) => {
 await page.waitForFunction(() => document.querySelector('.cf-globe-wrap')?.dataset.ready === '1',null,{timeout:35000});
 await page.waitForFunction(() => document.querySelector('[data-testid="marketing-globe"]')?.dataset.globeTexture === 'surface',null,{timeout:20000});
 await page.waitForFunction(()=>Number(document.querySelector('.cf-globe-wrap')?.dataset.risks)>0,null,{timeout:15000});
 if(await page.locator('.cf-chain-box').count()!==3||await page.locator('.cf-rail-right li').count()<1)throw Error('三流或风险列表缺失');
 const host=page.locator('[data-testid="marketing-globe"]');
 const first=await host.evaluate(el=>({attempt:el.dataset.globeAttempt,calls:Number(el.dataset.globeCalls),texture:el.dataset.globeTexture,canvas:el.querySelectorAll('canvas').length}));
 if(first.canvas!==1||first.calls<1)throw Error('地球没有实际完成绘制');
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('.cf-earth-fallback')).opacity==='0',null,{timeout:3000});
 await page.waitForTimeout(15000);
 const stable=await host.evaluate(el=>({ready:el.dataset.globeReady,attempt:el.dataset.globeAttempt,canvas:el.querySelectorAll('canvas').length}));
 if(stable.ready!=='1'||stable.attempt!==first.attempt||stable.canvas!==1)throw Error('地球正常显示后发生重复销毁');
 return {ok:true,...first,stable};
}
