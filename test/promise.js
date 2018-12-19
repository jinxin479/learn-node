console.log(1);
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
function MyPromise (executor){
    let self = this;
    self.state = PENDING;
    self.value = null;
    self.reason = null;
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];
    function resolve(value){
        if(self.state===PENDING){
            self.state = FULFILLED;
            self.value = value; 
            self.onFulfilledCallbacks.forEach(function(fulfilledCallback){
                fulfilledCallback()
            })
        }
        
    }
    function reject(reason){
        if(self.state===PENDING){
            self.state = REJECTED;
            self.reason  = reason;
            self.onRejectedCallbacks.forEach(function(rejectedCallback){
                rejectedCallback()
            })
        }
        
    }
    try {
        executor(resolve,reject)
    } catch (reason) {
        reject(reason)
    }
}
MyPromise.prototype.then = function(onFulfilled,onRejected){
    let self = this;
    let promise2 = null;
    // 这两个方法是不必传参数
    onFuifilled = typeof onFuifilled === 'function' ? onFuifilled : value => {return value;};
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

    promise2 = new MyPromise((resolve,reject)=>{
        if(self.state===PENDING){
            self.onFulfilledCallbacks.push(()=>{
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        self.resolvePromise(promise2,x,resolve,reject)
                    } catch (reason) {
                        reject(reason)
                    }
                },0)
                
            });
            self.onRejectedCallbacks.push(()=>{
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason)
                        self.resolvePromise(promise2, x, resolve, reject);
                    } catch (reason) {
                        reject(reason)
                    } 
                },0)
               
            })
        }
        if(self.state === FULFILLED){
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    self.resolvePromise(promise2,x,resolve,reject)
                } catch (reason) {
                    reject(reason);
                }     
            },0)
            
        }
        if(self.state === REJECTED){
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    self.resolvePromise(promise2, x, resolve, reject);
                  } catch (reason) {
                    reject(reason);
                  }    
            },0)
           
        }
    })
    // 返回promise
    return promise2;
    
}

MyPromise.prototype.resolvePromise = function(promise2,x,resolve,reject){
    let self = this;
    let called = false;//防止多次调用
    if(promise2===x){
        return reject(new TypeError("循环引用"))
    }
    // x是对象或者函数
    if(x!==null&&Object.prototype.toString.call(x)==='[object Object]'||Object.prototype.toString.call(x)==='[object Function]'){
        try {
            let then = x.then;
            if(typeof then ==="function"){//是函数
                then.call(x,(y)=>{
                    if(called) return;
                    called = true;
                     // 成功值y有可能还是promise或者是具有then方法等，再次resolvePromise，直到成功值为基本类型或者非thenable
                    self.resolvePromise(promise2,y,resolve,reject);
                },(reason)=>{
                    if(called) return;
                    called = true;
                    reject(reason);
                })
            }else{ //不是函数
                if(called) return;
                called = true;
                resolve(x);
            }
        } catch (reason) {
            if(called) return;
            called = true;
            reject(reason);
        }
    }else{
        // x就是普通值，不是对象和函数
        resolve(x)
    }
}

// catch方法
MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
};

// finally方法
MyPromise.prototype.finally = function(fn){
    return this.then(value=>{
        fn()
        return value;
    },reason=>{
        fn();
        throw reason;
    })
}
// done方法作为Promise链式调用的最后一步，
// 用来向全局抛出没有被Promise内部捕获的错误，并且不再返回一个Promise。
// 一般用来结束一个Promise链。
MyPromise.prototype.done = function(){
    this.catch(reason=>{
        console.log("done")
        throw reason
    })
}

// Promise.all
MyPromise.all = function(promiseArr){
    return new MyPromise((resolve,reject)=>{
        let result = [];
        promiseArr.forEach((promise,index)=>{
            promise.then(((value)=>{
                result[index] = value;
                if(result.length===promiseArr.length){
                    resolve(result)
                }
            }),reject)
        })
    })
}
// Promise.race

MyPromise.race = function(promiseArr){
    return new MyPromise ((resolve,reject)=>{
        promiseArr.forEach((promise,index)=>{
            promise.then((value)=>{
                resolve(value);
            },reject)
        })
    })
}

// Promise.resolve

MyPromise.resolve = function(value){
    let promise;
    promise = new MyPromise((resolve,reject)=>{
        this.prototype.resolvePromise(promise,value,resolve,reject)
    })
    return promise;
}
// Promise.reject
MyPromise.reject = function(reason){
    return new MyPromise((resolve,reject)=>{
        reject(reason)
    })
}

console.log('start');

let promise = new MyPromise((resolve, reject) => {
  console.log('step-');
  setTimeout(() => {
    resolve(123);
  }, 1000);
});

promise.then((value) => {
  console.log('step--');
  console.log('value', value);
});

console.log('end');





