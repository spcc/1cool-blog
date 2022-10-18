# let 和 const 命令

## 0. let 和 const

不同点

- const 声明只读常量
- const 声明变量必须初始化赋值

相同点

- 都不存在变量提升
- 都存在暂时性死区
- 都不可重复声明
- 声明的变量不属于顶层对象

## 1. let 命令

### 基本用法

#### 声明的变量只在当前代码块内有用

```js
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}

console.log(i);
// ReferenceError: i is not defined

a[6](); // 10
```

#### <mark>注意：</mark>`for`循环有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域

```js
for (let i = 0; i < 3; i++) {
  let i = "abc";
  console.log(i);
}
// abc
// abc
// abc
```

上面代码正确运行，输出了 3 次 `abc`。这表明函数内部的变量 i 与循环变量 i 不在同一个作用域，有各自单独的作用域（同一个作用域不可使用 let 重复声明同一个变量）。

### 特性

#### 不存在变量提升

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

#### 暂时性死区

> `暂时性死区`的本质就是，只要一进入当前作用域，所要使用的变量就已经存在

- 块级作用域内存在`let`命令,声明的变量就“绑定”这个区域,不受外部的影响

```js
var tmp = 123;

if (true) {
  tmp = "abc"; // ReferenceError
  let tmp;
}
```

- `ES6` 明确规定，如果区块中存在 `let` 和 `const` 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。  
  总之，在代码块内，使用 `let` 命令声明变量之前，该变量都是不可用的。这在语法上，称为`“暂时性死区”`（temporal dead zone，简称 TDZ）。

```js
var tmp = 123;

if (true) {
  // TDZ开始
  tmp = "abc"; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

#### 不允许重复声明

`let` 不允许在相同作用域内，重复声明同一个变量

```js
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
```

因此，不能在函数内部重新声明参数。

```js
function func(arg) {
  let arg;
}
func(); // 报错

function func(arg) {
  {
    let arg;
  }
}
func(); // 不报错
```

## 2. 块级作用域

### 为什么需要块级作用域？

1. 内层变量可能会覆盖外层变量
2. 用来计数的循环变量泄露为全局变量

### 块级作用域使匿名函数不在必要了

块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。

```js
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

### 块级作用域与函数声明

`let` 和 `函数声明` 只能声明在当前作用域顶层

```js
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}

// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}
```

## 3. const 命令

声明一个只读的常量，且必须初始化值

### 本质

`const` 实际上保证的，并不是变量的值不得改动，而是变量指向的那个`内存地址`所保存的数据不得改动。  
对于简单类型的数据（`数值`、`字符串`、`布尔值`），值就保存在变量指向的那个`内存地址`，因此等同于`常量`。  
对于`复合类型`的数据（主要是对象和数组），变量指向的`内存地址`，保存的只是一个`指向实际数据的指针`，const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

```js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop; // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

如果真的想将对象冻结，应该使用 `Object.freeze` 方法。

```js
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

上面代码中，常量 foo 指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === "object") {
      constantize(obj[key]);
    }
  });
};
```

## 4. ES6 声明变量 6 种方法

ES5: `var` 和 `function`  
ES6: `let`、`const`、`import`、`class`

## 5. 顶层对象的属性

let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性

```js
var a = 1;
window.a; // 1

let b = 1;
window.b; // undefined
```
