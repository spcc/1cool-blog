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

## 3.实例方法：padStart()，padEnd()

ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()` 用于头部补全，`padEnd()` 用于尾部补全。

不会改变原字符串

### 基础用法

- 参数 1：是字符串补全生效的最大长度
- 参数 2：是用来补全的字符串。

```js
"x".padStart(5, "ab"); // 'ababx'
"x".padStart(4, "ab"); // 'abax'

"x".padEnd(5, "ab"); // 'xabab'
"x".padEnd(4, "ab"); // 'xaba'
```

### 特殊情况

```js
// 原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串
"xxx".padStart(2, "ab"); // 'xxx'
"xxx".padEnd(2, "ab"); // 'xxx'

// 补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
"abc".padStart(10, "0123456789"); // '0123456abc'

// 如果省略第二个参数，默认使用空格补全长度。
"x".padStart(4); // '   x'
"x".padEnd(4); // 'x   '
```

### 常见用途

`padStart()` 的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。

```js
"1".padStart(10, "0"); // "0000000001"
"12".padStart(10, "0"); // "0000000012"
"123456".padStart(10, "0"); // "0000123456"
```

另一个用途是提示字符串格式。

```js
"12".padStart(10, "YYYY-MM-DD"); // "YYYY-MM-12"
"09-12".padStart(10, "YYYY-MM-DD"); // "YYYY-09-12"
```

## 4. 实例方法：trimStart()，trimEnd()

ES2019 对字符串新增这两个方法。它们的行为与 `trim()` 一致。

`trimStart()` 消除字符串头部的空格 `trimEnd()` 消除尾部的空格。

除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。

它们返回的都是新字符串，不会修改原始字符串。

```js
const s = "  abc  ";

s.trim(); // "abc"
s.trimStart(); // "abc  "
s.trimEnd(); // "  abc"
```

## 5. 实例方法：matchAll()

matchAll()方法返回一个正则表达式在当前字符串的所有匹配，详见《正则的扩展》的一章。

## 6. 实例方法：replaceAll()

### replace

历史上，字符串的实例方法 `replace()` 只能替换第一个匹配。

```js
"aabbcc".replace("b", "_");
// 'aa_bcc'
```

如果要替换所有的匹配，不得不使用正则表达式的 `g` 修饰符。

```js
"aabbcc".replace(/b/g, "_");
// 'aa__cc'
```

### replaceAll

#### 语法

`String.prototype.replaceAll(searchValue, replacement)`

- searchValue 是搜索模式，可以是一个字符串，也可以是一个全局的正则表达式（带有 g 修饰符）。
- replaceAll()的第二个参数 replacement 是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。

#### 基础用法

正则表达式毕竟不是那么方便和直观。

ES2021 引入了 `replaceAll()` 方法，可以一次性替换所有匹配。

返回一个新字符串，不会改变原字符串。

```js
"aabbcc".replaceAll("b", "_");
// 'aa__cc'
```

#### 如果用正则匹配，必须要带有 g 修饰符

```js
// 不报错
"aabbcc".replace(/b/, "_");

// 报错
"aabbcc".replaceAll(/b/, "_");
```

## 7. 实例方法：at()

`at()` 方法接受一个整数作为参数，返回参数指定位置的字符，支持负索引（即倒数的位置）。

```js
const str = "hello";
str.at(1); // "e"
str.at(-1); // "o"
```

如果参数位置超出了字符串范围，`at()` 返回 `undefined`。

该方法来自数组添加的 `at()` 方法，目前还是一个第三阶段的提案，可以参考《数组》一章的介绍。
