# 数值的扩展

## 1. 数值分隔符

### 基础用法

ES2021，允许 JavaScript 的数值使用下划线（\_）作为分隔符。增加数值的可读性。

```js
let budget = 1_000_000_000_000;

// 对于内部数值的存储和输出，并没有影响。
let num = 12_345;
num; // 12345
num.toString(); // 12345

// 规范没有指定间隔的位数，可以每三位添加一个分隔符，也可以每一位、每两位、每四位添加一个。
123_00 === 12_300; // true
12345_00 === 123_4500; // true
12345_00 === 1_234_500; // true
```

### 数值分隔符使用注意点

数值分隔符有几个使用注意点。

- 不能放在数值的最前面（leading）或最后面（trailing）。
- 不能两个或两个以上的分隔符连在一起。

```js
// 全部报错
3_.141
3._141
123__456
_1464301
1464301_
```

### 字符串转成数值的函数，不支持数值分隔符

下面三个将字符串转成数值的函数，不支持数值分隔符。

主要原因是语言的设计者认为，数值分隔符主要是为了编码时书写数值的方便，而不是为了处理外部输入的数据。

- Number()
- parseInt()
- parseFloat()

```js
Number("123_456"); // NaN
parseInt("123_456"); // 123
```

## 2. Number.isFinite(), Number.isNaN() § ⇧

ES6 在 `Number` 对象上，新提供了 `Number.isFinite()` 和 `Number.isNaN()` 两个方法。

### Number.isFinite() 用来检查一个数值是否为有限的

`Number.isFinite()` 用来检查一个数值是否为有限的（finite），即不是 `Infinity`。

如果参数类型不是数值，`Number.isFinite` 一律返回 `false`。

```js
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(-15); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite("foo"); // false
Number.isFinite("15"); // false
Number.isFinite(true); // false
```

### Number.isNaN() 用来检查一个值是否为 NaN

`Number.isNaN()` 用来检查一个值是否为 `NaN`

如果参数类型不是 `NaN`，`Number.isNaN `一律返回 `false`。

```js
Number.isNaN(NaN); // true
Number.isNaN(15); // false
Number.isNaN("15"); // false
Number.isNaN(true); // false
Number.isNaN(9 / NaN); // true
Number.isNaN("true" / 0); // true
Number.isNaN("true" / "true"); // true
```

### 与全局方法 isFinite() 和 isNaN() 的区别

- 传统方法先调用 `Number()` 将非数值的值转为数值，再进行判断
- 新方法只对数值有效，`Number.isFinite()` 对于非数值一律返回 `false`, `Number.isNaN()`只有对于 NaN 才返回 `true`，非 `NaN` 一律返回 `false`。

```js
isFinite(25); // true
isFinite("25"); // true
Number.isFinite(25); // true
Number.isFinite("25"); // false

isNaN(NaN); // true
isNaN("NaN"); // true
Number.isNaN(NaN); // true
Number.isNaN("NaN"); // false
Number.isNaN(1); // false
```

## 3. Number.parseInt(), Number.parseFloat()

ES6 将全局方法 `parseInt()` 和 `parseFloat()`，移植到`Number` 对象上面，行为完全保持不变。

这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

```js
// ES5的写法
parseInt("12.34"); // 12
parseFloat("123.45#"); // 123.45

// ES6的写法
Number.parseInt("12.34"); // 12
Number.parseFloat("123.45#"); // 123.45

Number.parseInt === parseInt; // true
Number.parseFloat === parseFloat; // true
```

## 4. Number.isInteger()

### 基础用法

`Number.isInteger()` 用来判断一个数值是否为整数。

```js
Number.isInteger(25); // true
Number.isInteger(25.1); // false

// 整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
Number.isInteger(25); // true
Number.isInteger(25.0); // true

// 如果参数不是数值，Number.isInteger返回false。
Number.isInteger(); // false
Number.isInteger(null); // false
Number.isInteger("15"); // false
Number.isInteger(true); // false
```

### 精度问题

> 如果对数据精度的要求较高，不建议使用 `Number.isInteger()` 判断一个数值是否为整数。

```js
Number.isInteger(3.0000000000000002); // true
Number.isInteger(5e-324); // false
Number.isInteger(5e-325); // true
```

## 5. Math 对象的扩展

ES6 在 Math 对象上新增了与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。

### Math.trunc()

`Math.trunc` 方法用于去除一个数的小数部分，返回整数部分。

```js
Math.trunc(4.0); // 4
Math.trunc(4.1); // 4
Math.trunc(4.9); // 4
Math.trunc(-4.1); // -4
Math.trunc(-4.9); // -4
Math.trunc(-0.1234); // -0

// 非数值，Math.trunc内部使用Number方法将其先转为数值。
Math.trunc("123.456"); // 123
Math.trunc(true); // 1
Math.trunc(false); // 0
Math.trunc(null); // 0

// 对于空值和无法截取整数的值，返回NaN。
Math.trunc(NaN); // NaN
Math.trunc("foo"); // NaN
Math.trunc(); // NaN
Math.trunc(undefined); // NaN
```

### Math.sign()

`Math.sign` 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

它会返回五种值。

- 参数为正数，返回+1；
- 参数为负数，返回-1；
- 参数为 0，返回 0；
- 参数为-0，返回-0;
- 其他值，返回 NaN。

```js
Math.sign(-5); // -1
Math.sign(5); // +1
Math.sign(0); // +0
Math.sign(-0); // -0
Math.sign(NaN); // NaN
```

如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回 `NaN`。

```js
Math.sign(""); // 0
Math.sign(true); // +1
Math.sign(false); // 0
Math.sign(null); // 0
Math.sign("9"); // +1
Math.sign("foo"); // NaN
Math.sign(); // NaN
Math.sign(undefined); // NaN
```

## BigInt 数据类型

ES2020 引入了一种新的数据类型 `BigInt`（大整数）

来解决数值的精度只能到 53 个二进制位和超过 2 的 1024 次方的数值，无法表示

这是 ECMAScript 的第八种数据类型。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

BigInt 类型的数据必须添加后缀 n

```js
// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1; // true
// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024); // Infinity

const a = 2172141653n;
const b = 15346349309n;
// BigInt 可以保持精度
a * b; // 33334444555566667777n
// 普通整数无法保持精度
Number(a) * Number(b); // 33334444555566670000

// BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。
-42n; // 正确
+42n; // 报错
```
