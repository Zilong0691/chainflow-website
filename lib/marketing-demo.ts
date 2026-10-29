// 官网专用人工案例，与真实工作区和供应商资料独立。
const materials=[
 {id:'CF-1001',name:'主控芯片',en:'Controller IC',per:1,available:300,cents:12800},
 {id:'CF-1002',name:'存储芯片',en:'Memory IC',per:2,available:480,cents:4600},
 {id:'CF-1003',name:'电源芯片',en:'Power IC',per:3,available:900,cents:380},
 {id:'CF-1004',name:'板端连接器',en:'Board connector',per:4,available:960,cents:260},
 {id:'CF-1005',name:'时钟器件',en:'Clock IC',per:1,available:240,cents:190},
 {id:'CF-1006',name:'阻容组件',en:'Passive assembly',per:8,available:2400,cents:8}
];
export function reconcileDemo(buildQty:number,round:number){
 if(!Number.isInteger(buildQty)||buildQty<1||buildQty>10000||![0,1,2].includes(round))throw new Error('套数或回件版本无效');
 const rows=materials.map(m=>{const need=m.per*buildQty,available=Math.floor(m.available*[.6,.85,1][round]);return {...m,need,available,shortage:Math.max(0,need-available)};});
 const cents=rows.reduce((sum,r)=>sum+r.need*r.cents,0);
 return {rows,gaps:rows.filter(r=>r.shortage>0).length,shortage:rows.reduce((n,r)=>n+r.shortage,0),cost:cents/100,unitCost:Math.round(cents/buildQty)/100};
}
