# 字符串的新增方法

本章介绍字符串对象的新增方法。

## 1. 实例方法：includes(), startsWith(), endsWith()

传统上，JavaScript 只有 `indexOf` 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let s = "Hello world!";

s.startsWith("Hello"); // true
s.endsWith("!"); // true
s.includes("o"); // true
```

这三个方法都支持第二个参数，表示开始搜索的位置。

```js
let s = "Hello world!";

s.startsWith("world", 6); // true
s.endsWith("Hello", 5); // true
s.includes("Hello", 6); // false
```

面代码表示，使用第二个参数 `n` 时，`endsWith` 的行为与其他两个方法有所不同。它针对前 `n` 个字符，而其他两个方法针对从第 `n` 个位置直到字符串结束。

## 2. 实例方法：repeat()

`repeat` 方法返回一个新字符串，表示将原字符串重复 `n` 次。

```js
"x".repeat(3); // "xxx"
"hello".repeat(2); // "hellohello"
"na".repeat(0); // ""

// 小数，会被取整
"na".repeat(2.9); // "nana"

// 负数或者Infinity，会报错
"na".repeat(Infinity);
// RangeError
"na".repeat(-1);
// RangeError

// 0 到-1 之间的小数，则等同于 0，因为会先进行取整运算。
// 0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。
"na".repeat(-0.9); // ""

// 参数NaN等同于 0。
"na".repeat(NaN); // ""

// 字符串，则会先转换成数字
"na".repeat("na"); // ""
"na".repeat("3"); // "nanana"
```
