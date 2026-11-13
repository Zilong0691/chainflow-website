export function createGlobeRecovery(options?:{
 schedule?:(callback:()=>void,delay:number)=>unknown;
 cancel?:(timer:unknown)=>void;
 onRetry?:()=>void;
 delays?:number[];
}):{
 failed:()=>void;
 recovered:()=>void;
 dispose:()=>void;
};
