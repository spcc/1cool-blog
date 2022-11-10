# 闭包

- [一文颠覆大众对闭包的认知](https://juejin.cn/post/7079995358624874509#heading-1)

## 什么是闭包

### 基本概念

- 闭包是指有权访问另一个函数作用域中变量的函数。（或者直接说闭包是个内嵌函数也可以。）
- 因为通常情况下，函数内部变量是无法在外部访问的。（因此使用闭包的作用，就具备实现了能在外部访问某个函数内部变量的功能，让这些内部变量的值始终可以保存在内存中。）

```js
function fun1() {
  var a = 1
  return function () {
    console.log(a)
  }
}
fun1()
var result = fun1()
result() // 1
```

### 闭包产生原因

> 当访问一个变量时，代码解释器会首先在当前的作用域查找，如果没找到，就去父级作用域去查找，直到找到该变量或者不存在父级作用域中，这样的链路就是作用域链

**闭包产生的本质：当前环境中存在指向父级作用域的引用（内部函数变量是否在外部能使用）**

```js
function fun1() {
  var a = 2
  function fun2() {
    console.log(a) // 2
  }
  return fun2
}
var result = fun1()
result()
// 那是不是只有返回函数才算是产生了闭包呢？其实也不是，闭包的本质，**我们只需要让父级作用域的引用存在即可**

var fun3
function fun1() {
  var a = 2
  fun3 = function () {
    console.log(a)
  }
}
fun1()
fun3()
```

### 闭包的表现形式

1. 返回一个函数

2. 定时器、事件监听、Ajax 请求、Web Workers 或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。

```js
// 2.1定时器
setTimeout(function handler() {
  console.log('1')
}, 1000)
// 2.2事件监听
$('app').click(function () {
  console.log('Event Listener')
})
```

3. 作为函数参数传递的形式，比如下面的例子

```js
// 3.作为函数参数传递的形式
var a = 1
function foo() {
  var a = 2
  function baz() {
    console.log(a)
  }
  bar(baz)
}
function bar(fn) {
  // 这就是闭包
  fn()
}
foo() // 输出2，而不是1
```
