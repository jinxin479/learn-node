## Promise 解决过程

> Promise 解决过程是一个抽象的操作，其需输入一个 promise 和一个值，我们表示为 [[Resolve]](promise, x)，如果 x 有 then 方法且看上去像一个 Promise ，解决程序即尝试使 promise 接受 x 的状态；否则其用 x 的值来执行 promise 。

这种 thenable 的特性使得 Promise 的实现更具有通用性：只要其暴露出一个遵循 Promise/A+ 协议的 then 方法即可；


运行 [[Resolve]](promise, x) 需遵循以下步骤：


- x 与 promise 相等
如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise


- x 为 Promise
如果 x 为 Promise ，则使 promise 接受 x 的状态:

- 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
如果 x 处于执行态，用相同的值执行 promise
如果 x 处于拒绝态，用相同的据因拒绝 promise



- x 为对象或函数
如果 x 为对象或者函数：

把 x.then 赋值给 then
- 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:

- 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
如果调用 then 方法抛出了异常 e：

- 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
否则以 e 为据因拒绝 promise


- 如果 then 不是函数，以 x 为参数执行 promise


- 如果 x 不为对象或者函数，以 x 为参数执行 promise



- 如果一个 promise 被一个循环的 thenable 链中的对象解决，而 [[Resolve]](promise, thenable) 的递归性质又使得其被再次调用，根据上述的算法将会陷入无限递归之中。算法虽不强制要求，但也鼓励施者检测这样的递归是否存在，若检测到存在则以一个可识别的 TypeError 为据因来拒绝 promise。

