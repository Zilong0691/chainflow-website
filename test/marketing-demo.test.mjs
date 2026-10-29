import test from 'node:test';
import assert from 'node:assert/strict';
import {reconcileDemo} from '../lib/marketing-demo.ts';
test('300套案例按物料行核算缺口和含税参考成本',()=>{const d=reconcileDemo(300,2);assert.equal(d.gaps,3);assert.equal(d.shortage,420);assert.equal(d.cost,73302);assert.equal(d.unitCost,244.34);assert.equal(d.rows.length,6);});
test('降低套数不会制造负缺口，增大需求不会把缺项当齐套',()=>{assert.equal(reconcileDemo(100,2).gaps,0);assert.equal(reconcileDemo(500,2).gaps,6);assert(reconcileDemo(300,0).shortage>reconcileDemo(300,2).shortage);});
test('无效套数和回件版本拒绝，不静默生成结果',()=>{for(const n of [0,-1,NaN,Infinity,1.5,10001])assert.throws(()=>reconcileDemo(n,2));assert.throws(()=>reconcileDemo(300,3));});
