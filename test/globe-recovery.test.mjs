import test from 'node:test';
import assert from 'node:assert/strict';
import {createGlobeRecovery} from '../lib/globe/recovery.mjs';

test('地球失败时逐步延长重试间隔并封顶',()=>{
 const timers=[],delays=[],retries=[];
 const recovery=createGlobeRecovery({
  schedule:(callback,delay)=>{const timer={callback,cancelled:false};timers.push(timer);delays.push(delay);return timer;},
  cancel:timer=>{timer.cancelled=true;},
  onRetry:()=>retries.push(true)
 });
 for(let index=0;index<8;index++){
  recovery.failed();
  timers[index].callback();
 }
 assert.deepEqual(delays,[1000,2000,4000,8000,16000,30000,30000,30000]);
 assert.equal(retries.length,8);
 recovery.dispose();
});

test('地球恢复后重置退避并在卸载时取消待处理重试',()=>{
 const timers=[],delays=[],retries=[];
 const recovery=createGlobeRecovery({
  schedule:(callback,delay)=>{const timer={callback,cancelled:false};timers.push(timer);delays.push(delay);return timer;},
  cancel:timer=>{timer.cancelled=true;},
  onRetry:()=>retries.push(true)
 });
 recovery.failed();
 timers[0].callback();
 recovery.failed();
 timers[1].callback();
 recovery.recovered();
 recovery.failed();
 assert.equal(delays.at(-1),1000);
 const pending=timers.at(-1);
 recovery.dispose();
 assert.equal(pending.cancelled,true);
 pending.callback();
 assert.equal(retries.length,2);
});

test('同一次失败只安排一次重试且成功可取消它',()=>{
 const timers=[];
 const recovery=createGlobeRecovery({
  schedule:(callback,delay)=>{const timer={callback,delay,cancelled:false};timers.push(timer);return timer;},
  cancel:timer=>{timer.cancelled=true;},
  onRetry:()=>{}
 });
 recovery.failed();
 recovery.failed();
 assert.equal(timers.length,1);
 recovery.recovered();
 assert.equal(timers[0].cancelled,true);
 recovery.dispose();
});

test('恢复后已经取消的旧回调不会触发新的重建',()=>{
 const timers=[],retries=[];
 const recovery=createGlobeRecovery({
  schedule:callback=>{const timer={callback};timers.push(timer);return timer;},
  cancel:()=>{},
  onRetry:()=>retries.push(true)
 });
 recovery.failed();
 recovery.recovered();
 recovery.failed();
 timers[0].callback();
 assert.equal(retries.length,0);
 timers[1].callback();
 assert.equal(retries.length,1);
 recovery.dispose();
});
