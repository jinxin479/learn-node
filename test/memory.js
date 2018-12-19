process.nextTick(function () {
    console.log('nextTick执行1');
});

 process.nextTick(function () {
    console.log('nextTick执行2');
    setImmediate(function(){
        console.log("setImmediate 3");
    });
    process.nextTick(function(){
        console.log("nextTick执行4");
    });
});

 setImmediate(function () {
    console.log('setImmediateჽ执行5');

process.nextTick(function () {
        console.log('强势插入6');
    });
});

setImmediate(function () {
    console.log('setImmediateჽ执行2');
    new Promise((resolve,reject)=>{
        console.log(99+"promise");
        resolve();
    }).then(e=>{
        console.log(100+"promise+then");
    })
});
setTimeout(e=>{
    console.log(8);
    new Promise((resolve,reject)=>{
        console.log(8+"promise");
        resolve();
    }).then(e=>{
        console.log(8+"promise+then");
    })
},0)
setTimeout(e=>{ console.log(9); },0)

console.log('正常执行');