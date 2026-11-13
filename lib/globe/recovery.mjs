const retryDelays=[1000,2000,4000,8000,16000,30000];

export function createGlobeRecovery({
 schedule=(callback,delay)=>setTimeout(callback,delay),
 cancel=timer=>clearTimeout(timer),
 onRetry=()=>{},
 delays=retryDelays
}={}){
 let attempt=0,timer=null,disposed=false,generation=0;
 const clear=()=>{
  generation++;
  if(timer!==null){cancel(timer);timer=null;}
 };
 return {
  failed(){
   if(disposed||timer!==null)return;
   const delay=delays[Math.min(attempt,delays.length-1)];
   attempt++;
   const currentGeneration=++generation;
   timer=schedule(()=>{
    if(disposed||currentGeneration!==generation)return;
    timer=null;
    onRetry();
   },delay);
  },
  recovered(){clear();attempt=0;},
  dispose(){disposed=true;clear();}
 };
}
