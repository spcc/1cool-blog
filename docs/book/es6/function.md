# 函数的扩展

## 1. 函数默认值

### 惰性求值

参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo(); // 100

x = 100;
foo(); // 101
```

上面代码中，参数 `p` 的默认值是 `x + 1`。这时，每次调用函数 `foo()`，都会重新计算 `x + 1`，而不是默认 `p` 等于 `100`。

### 取默认值区别

```js
// 写法一
function m1({ x = 0, y = 0 } = {}) {
  return [x, y];
}

// 写法二
function m2({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}

// 函数没有参数的情况
m1(); // [0, 0]
m2(); // [0, 0]

// x 和 y 都有值的情况
m1({ x: 3, y: 8 }); // [3, 8]
m2({ x: 3, y: 8 }); // [3, 8]

// x 有值，y 无值的情况
m1({ x: 3 }); // [3, 0]
m2({ x: 3 }); // [3, undefined]

// x 和 y 都无值的情况
m1({}); // [0, 0];
m2({}); // [undefined, undefined]

m1({ z: 3 }); // [0, 0]
m2({ z: 3 }); // [undefined, undefined]
```

### 参数默认值的位置

通常情况下，定义了默认值的参数，应该是函数的尾参数。

否则就没有意义

```js
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

### 函数的 length 属性

指定了默认值以后，函数的 `length` 属性，将返回没有指定默认值的参数个数。

```sh
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

`rest` 参数也不会计入 `length` 属性。

```sh
(function(...args) {}).length // 0
```

如果设置了默认值的参数不是尾参数，那么 `length` 属性也不再计入后面的参数了。

```sh
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```
