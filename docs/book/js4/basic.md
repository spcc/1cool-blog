# 第 3 章 语言基础

## 3.4 数据类型

一共有 8 种数据类型

7 种简单数据类型：`Undefined`、`Null`、`Boolean`、`Number`、`String`、`Symbol`(ES 6 新增，这种类型的对象永不相等，可以解决属性名冲突的问题)、`bigInt`(ES 10 新增,指安全存储、操作大整数)  
1 种复杂数据类型：`Object`

### 3.4.1 typeof 操作符

对一个值使用 typeof 操作符会返回下列字符串之一：

```js
"undefined"表示值未定义；
"boolean"表示值为布尔值；
"string"表示值为字符串；
"number"表示值为数值；
"object"表示值为对象（而不是函数）或 null；
"function"表示值为函数；
"symbol"表示值为符号。
```

### 3.4.2 Undefined 类型

Undefined 特殊值的目的就是为了正式明确空对象指针（null）和未初始化变量的区别。

即使未初始化的变量会被自动赋予 undefined 值，但我们仍然建议在声明变量的同时进行初始化。这样，当 typeof 返回"undefined"时，就会知道那是因为给定的变量尚未声明，而不是声明了但未初始化。

### 3.4.3 Null 类型

在定义将来要保存对象值的变量时，建议使用 null 来初始化，不要使用其他值。  
`这样就可以保持 null 是空对象指针的语义。`  
这样，只要检查这个变量的值是不是 null 就可以知道这个变量是否在后来被重新赋予了一个对象的引用，比如：

```js
if (car != null) {
  // car 是一个对象的引用
}
```

### 3.4.4 Boolean 类型

不同类型与布尔值之间的转换规则

| 数据类型  | 转换为 true 的值       | 转换为 false 的值            |
| :-------- | :--------------------- | :--------------------------- |
| Boolean   | true                   | false                        |
| String    | 非空字符串             | ""（空字符串）               |
| Number    | 非零数值（包括无穷值） | 0、NaN（参见后面的相关内容） |
| Object    | 任意对象               | null                         |
| Undefined | N/A（不存在）          | undefined                    |

### 3.4.5 Number 类型

##### 1. 浮点值

0.1 + 0.2 === 0.3 // false

之所以存在这种舍入错误，是因为使用了 IEEE 754 数值，这种错误并非 ECMAScript 所独有。其他使用相同格式的语言也有这个问题。

#### 4. 数值转换

- Number() 函数 : 一元加操作符与 Number()函数遵循相同的转换规则
- parseInt() 函数 : Number()函数转换字符串时相对复杂且有点反常规，通常在需要得到整数时优先使用 parseInt()函数,更专注于字符串是否包含数值模式
- parseFloat() 函数 : 工作方式跟 parseInt()函数类似，都是从位置 0 开始检测每个字符

##### Number()函数基于如下规则执行转换

- 布尔值，true 转换为 1，false 转换为 0。
- 数值，直接返回。
- null，返回 0。  undefined，返回 NaN。
- 字符串，应用以下规则。
  - 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值。  
    因此，Number("1")返回 1，Number("123")返回 123，Number("011")返回 11（忽略前面的零）。
  - 如果字符串包含有效的浮点值格式如"1.1"，则会转换为相应的浮点值（同样，忽略前面的零）。
  - 如果字符串包含有效的十六进制格式如"0xf"，则会转换为与该十六进制值对应的十进制整数值。
  - 如果是空字符串（不包含字符），则返回 0。
  - 如果字符串包含除上述情况之外的其他字符，则返回 NaN。
- 对象，调用 valueOf()方法，并按照上述规则转换返回的值。如果转换结果是 NaN，则调用 toString()方法，再按照转换字符串的规则转换。

从不同数据类型到数值的转换有时候会比较复杂，看一看 Number()的转换规则就知道了。下面是
几个具体的例子：

```js
let num1 = Number('Hello world!') // NaN
let num2 = Number('') // 0
let num3 = Number('000011') // 11
let num4 = Number(true) // 1
```

可以看到，字符串"Hello world"转换之后是 NaN，因为它找不到对应的数值。空字符串转换后
是 0。字符串 000011 转换后是 11，因为前面的零被忽略了。最后，true 转换为 1。

##### parseInt()

更专注于字符串是否包含数值模式。

字符串最前面的空格会被忽略，从第一个非空格字符开始转换。如果第一个字符不是数值字符、加号或减号，parseInt()立即返回 NaN。这意味着空字符串也会返回 NaN（这一点跟 Number()不一样，它返回 0）。如果第一个字符是数值字符、加号或减号，则继续依次检测每个字符，直到字符串末尾，或碰到非数值字符。比如，"1234blue"会被转换为 1234，因为"blue"会被完全忽略。类似地，"22.5"会被转换为 22，因为小数点不是有效的整数字符。

```js
let num1 = parseInt('1234blue') // 1234
let num2 = parseInt('') // NaN
let num3 = parseInt('0xA') // 10，解释为十六进制整数
let num4 = parseInt(22.5) // 22
let num5 = parseInt('70') // 70，解释为十进制值
let num6 = parseInt('0xf') // 15，解释为十六进制整数
```

##### parseFloat()

不同之处在于

1. 它始终忽略字符串开头的零
2. 如果字符串表示整数（没有小数点或者小数点后面只有一个零），则 parseFloat()返回整数

```js
let num1 = parseFloat('1234blue') // 1234，按整数解析
let num2 = parseFloat('0xA') // 0
let num3 = parseFloat('22.5') // 22.5
let num4 = parseFloat('22.34.5') // 22.34
let num5 = parseFloat('0908.5') // 908.5
let num6 = parseFloat('3.125e7') // 31250000
```

### 3.4.6 String 类型

#### 1. 字符字面量

字符串数据类型包含一些字符字面量，用于表示非打印字符或有其他用途的字符，如下表所示：

| 字 面 量 | 含 义                  |
| :------- | :--------------------- |
| \n       | true                   |
| \t       | 非空字符串             |
| \b       | 非零数值（包括无穷值） |
| \r       | 任意对象               |
| \f       | N/A（不存在）          |
| \\       | N/A（不存在）          |
| \'       | N/A（不存在）          |
| \"       | N/A（不存在）          |
| \`       | N/A（不存在）          |
| \xnn     | N/A（不存在）          |
| \unnnn   | N/A（不存在）          |

如果字符串中包含双字节字符，那么 length 属性返回的值可能不是准确的字符数。第 5 章将具体讨论如何解决这个问题。

2. 字符串的特点

ECMAScript 中的字符串是不可变的（immutable），意思是一旦创建，它们的值就不能变了。要修改某个变量中的字符串值，必须先销毁原始的字符串。所有处理都是在后台发生的，而这也是一些早期的浏览器（如 Firefox 1.0 之前的版本和 IE6.0）在拼接字符串时非常慢的原因。这些浏览器在后来的版本中都有针对性地解决了这个问题。

3. 转换为字符串

- toString()
  - null 和 undefined 值没有 toString()方法
- String()
  - 确定一个值是不是 null 或 undefined，可以使用 String()转型函数

String()函数遵循如下规则:

- 如果值有 toString()方法，则调用该方法（不传参数）并返回结果。
- 如果值是 null，返回"null"。
- 如果值是 undefined，返回"undefined"。

5. 字符串插值

```js
// 将表达式转换为字符串时会调用 toString()：
let foo = { toString: () => 'World' }
console.log(`Hello, ${foo}!`) // Hello, World!

// 在插值表达式中可以调用函数和方法：
function capitalize(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`
}
console.log(`${capitalize('hello')}, ${capitalize('world')}!`) // Hello, World!

// 模板也可以插入自己之前的值：
let value = ''
function append() {
  value = `${value}abc`
  console.log(value)
}
append() // abc
append() // abcabc
append() // abcabcabc
```

6. 模板字面量标签函数

表达式参数的数量是可变的，所以通常应该使用剩余操作符（rest operator）将它们收集到一个数组中：

```js
let a = 6
let b = 9
function simpleTag(strings, ...expressions) {
  console.log(strings)
  for (const expression of expressions) {
    console.log(expression)
  }
}
let taggedResult = simpleTag`${a} + ${b} = ${a + b}`
// ["", " + ", " = ", ""]
// 6
// 9
// 15
```

7. 原始字符串

使用模板字面量也可以直接获取原始的模板字面量内容（如换行符或 Unicode 字符），而不是被转换后的字符表示。为此，可以使用默认的 String.raw 标签函数：

```js
// Unicode 示例
// \u00A9 是版权符号
console.log(`\u00A9`) // ©
console.log(String.raw`\u00A9`) // \u00A9
```

### 3.4.7 Symbol 类型

Symbol（符号）是 ECMAScript 6 新增的数据类型。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

尽管听起来跟私有属性有点类似，但符号并不是为了提供私有属性的行为才增加的（尤其是因为
Object API 提供了方法，可以更方便地发现符号属性）。相反，符号就是用来创建唯一记号，进而用作非
字符串形式的对象属性。

### 3.4.8 Object 类型

ECMAScript 中的对象其实就是一组数据和功能的集合。对象通过 new 操作符后跟对象类型的名称
来创建。开发者可以通过创建 Object 类型的实例来创建自己的对象，然后再给对象添加属性和方法：

```js
// 给构造函数提供参数时使用括号
let o = new Object()
```

## 3.5 操作符

ECMAScript 中的操作符是独特的，因为它们可用于各种值，包括字符串、
数值、布尔值，甚至还有对象。在应用给对象时，操作符通常会调用 valueOf()和/或 toString()方
法来取得可以计算的值。

### 3.5.1 一元操作符

只操作一个值的操作符叫**一元操作符（unary operator）**。一元操作符是 ECMAScript 中最简单的操作符。

#### 1. 递增/递减操作符

前缀版和后缀版

```js
// 前缀
let age = 29
++age // 等于 age = age + 1;

let num1 = 2
let num2 = 20
let num3 = --num1 + num2
let num4 = num1 + num2
console.log(num3) // 21
console.log(num4) // 21
```

```js
// 后缀
// 后缀版与前缀版的主要区别在于，后缀版递增和递减在语句被求值后才发生
// 在跟其他操作混合时，差异就会变明显，比如：
let num1 = 2
let num2 = 20
let num3 = num1-- + num2
let num4 = num1 + num2

console.log(num3) // 22
console.log(num4) // 21
// 计算 num3 时使用的是 num1 的原始值（2），而计算 num4 时使用的是 num1 递减后的值（1）。
```

---

无论使用前缀递增还是前缀递减操作符，变量的值都会在语句被求值之前改变。（在计算机科学中，
这通常被称为具有**副作用**）

```js
let age = 29
let anotherAge = --age + 2
console.log(age) // 28
console.log(anotherAge) // 30
```

---

这 4 个操作符可以作用于任何值，意思是不限于整数——字符串、布尔值、浮点值，甚至对象都可
以。递增和递减操作符遵循如下规则。

- 对于字符串，如果是有效的数值形式，则转换为数值再应用改变。变量类型从字符串变成数值。
- 对于字符串，如果不是有效的数值形式，则将变量的值设置为 NaN 。变量类型从字符串变成数值。
- 对于布尔值，如果是 false，则转换为 0 再应用改变。变量类型从布尔值变成数值。
- 对于布尔值，如果是 true，则转换为 1 再应用改变。变量类型从布尔值变成数值。
- 对于浮点值，加 1 或减 1。
- 如果是对象，则调用其（第 5 章会详细介绍的）valueOf()方法取得可以操作的值。对得到的值应用上述规则。如果是 NaN，则调用 toString()并再次应用其他规则。变量类型从对象变成数值。

```js
let s1 = '2'
let s2 = 'z'
let b = false
let f = 1.1
let o = {
  valueOf() {
    return -1
  }
}
s1++ // 值变成数值 3
s2++ // 值变成 NaN
b++ // 值变成数值 1
f-- // 值变成 0.10000000000000009（因为浮点数不精确）
o-- // 值变成-2
```

#### 2. 一元加和减

如果将一元加应用到非数值，则会执行与使用 Number()转型函数一样的类型转换：布尔值 false
和 true 转换为 0 和 1，字符串根据特殊规则进行解析，对象会调用它们的 valueOf()和/或 toString()
方法以得到可以转换的值。

一元减会遵循与一元加同样的规则，先对它们进行转换，然后再取负值：

```js
let s1 = '01'
let s2 = '1.1'
let s3 = 'z'
let b = false
let f = 1.1
let o = {
  valueOf() {
    return -1
  }
}
s1 = +s1 // 值变成数值 1
s2 = +s2 // 值变成数值 1.1
s3 = +s3 // 值变成 NaN
b = +b // 值变成数值 0
f = +f // 不变，还是 1.1
o = +o // 值变成数值-1

let s1 = '01'
let s2 = '1.1'
let s3 = 'z'
let b = false
let f = 1.1
let o = {
  valueOf() {
    return -1
  }
}
s1 = -s1 // 值变成数值-1
s2 = -s2 // 值变成数值-1.1
s3 = -s3 // 值变成 NaN
b = -b // 值变成数值 0
f = -f // 变成-1.1
o = -o // 值变成数值 1
```

一元加和减操作符主要用于基本的算术，但也可以像上面的例子那样，用于数据类型转换。

---

一元加由一个加号（+）表示，放在变量前头，对数值没有任何影响
一元减由一个减号（-）表示，放在变量前头，主要用于把数值变成负值

```js
let num = 25
num = +num
console.log(num) // 25

let num = 25
num = -num
console.log(num) // -25
```

### 3.5.2 位操作符

用于数值的底层操作，也就是操作内存中表示数据的比特（位）。ECMAScript 中的所有数值都以 IEEE 754 64 位格式存储，但位操作并不直接应用到 64 位表示，而是先把值转换为 32 位整数，再进行位操作，之后再把结果转换为 64 位。对开发者而言，就好像只有 32 位整数一样，因为 64 位整数存储格式是不可见的。既然知道了这些，就只需要考虑 32 位整数即可。

### 3.5.3 布尔操作符

布尔操作符一共有 3 个：逻辑非、逻辑与和逻辑或。

#### 1. 逻辑非

逻辑非操作符由一个叹号（!）表示

逻辑非操作符会遵循如下规则:

- 如果操作数是对象，则返回 false。
- 如果操作数是空字符串，则返回 true。
- 如果操作数是非空字符串，则返回 false。
- 如果操作数是数值 0，则返回 true。
- 如果操作数是非 0 数值（包括 Infinity），则返回 false。
- 如果操作数是 null，则返回 true。
- 如果操作数是 NaN，则返回 true。
- 如果操作数是 undefined，则返回 true。

```js
console.log(!false) // true
console.log(!'blue') // false
console.log(!0) // true
console.log(!NaN) // true
console.log(!'') // true
console.log(!12345) // false
```

同时使用两个叹号（!!），相当于调用了转型函数 Boolean()。给出变量真正对应的布尔值。

```js
console.log(!!'blue') // true
console.log(!!0) // false
console.log(!!NaN) // false
console.log(!!'') // false
console.log(!!12345) // true
```

#### 2. 逻辑与

逻辑与操作符由两个和号（&&）表示

逻辑与操作符遵循如下真值表：

| 第一个操作数 | 第二个操作数 | 结 果 |
| :----------- | :----------- | ----- |
| true         | true         | true  |
| true         | false        | false |
| false        | true         | false |
| false        | false        | false |

逻辑与操作符可用于任何类型的操作数，不限于布尔值。如果有操作数不是布尔值，则逻辑与并不
一定会返回布尔值，而是遵循如下规则。

- 如果第一个操作数是对象，则返回第二个操作数。
- 如果第二个操作数是对象，则只有第一个操作数求值为 true 才会返回该对象。
- 如果两个操作数都是对象，则返回第二个操作数。
- 如果有一个操作数是 null，则返回 null。
- 如果有一个操作数是 NaN，则返回 NaN。
- 如果有一个操作数是 undefined，则返回 undefined。

---

**逻辑与操作符是一种短路操作符**，意思就是如果第一个操作数决定了结果，那么永远不会对第二个
操作数求值。

```js
let found = true
let result = found && someUndeclaredVariable // 这里会出错
console.log(result) // 不会执行这一行

let found = false
let result = found && someUndeclaredVariable // 不会出错
console.log(result) // 会执行
```

#### 3. 逻辑或

逻辑或操作符由两个管道符（||）表示

逻辑或操作符遵循如下真值表：

| 第一个操作数 | 第二个操作数 | 结 果 |
| :----------- | :----------- | ----- |
| true         | true         | true  |
| true         | false        | true  |
| false        | true         | true  |
| false        | false        | false |

与逻辑与类似，如果有一个操作数不是布尔值，那么逻辑或操作符也不一定返回布尔值。它遵循如
下规则。

- 如果第一个操作数是对象，则返回第一个操作数。
- 如果第一个操作数求值为 false，则返回第二个操作数。
- 如果两个操作数都是对象，则返回第一个操作数。
- 如果两个操作数都是 null，则返回 null。
- 如果两个操作数都是 NaN，则返回 NaN。
- 如果两个操作数都是 undefined，则返回 undefined。

---

同样与逻辑与类似，**逻辑或操作符也具有短路的特性**。只不过对逻辑或而言，第一个操作数求值为 true，第二个操作数就不会再被求值了。

```js
let found = true
let result = found || someUndeclaredVariable // 不会出错
console.log(result) // 会执行

let found = false
let result = found || someUndeclaredVariable // 这里会出错
console.log(result) // 不会执行这一行

// 利用这个行为，可以避免给变量赋值 null 或 undefined。
let myObject = preferredObject || backupObject
```

### 3.5.4 乘性操作符

ECMAScript 定义了 3 个乘性操作符：乘法、除法和取模。但在处理非数值时，它们也会包含一些自动的类型转换。

#### 1. 乘法操作符

乘法操作符在处理特殊值时也有一些特殊的行为。

- 如果操作数都是数值，则执行常规的乘法运算，即两个正值相乘是正值，两个负值相乘也是正值，正负符号不同的值相乘得到负值。如果 ECMAScript 不能表示乘积，则返回 Infinity 或 -Infinity。
- 如果有任一操作数是 NaN，则返回 NaN。
- 如果是 Infinity 乘以 0，则返回 NaN。
- 如果是 Infinity 乘以非 0 的有限数值，则根据第二个操作数的符号返回 Infinity 或-Infinity。
- 如果是 Infinity 乘以 Infinity，则返回 Infinity。
- 如果有不是数值的操作数，则先在后台用 Number()将其转换为数值，然后再应用上述规则。

#### 2. 除法操作符

除法操作符针对特殊值也有一些特殊的行为。

- 如果操作数都是数值，则执行常规的除法运算，即两个正值相除是正值，两个负值相除也是正
  值，符号不同的值相除得到负值。如果 ECMAScript 不能表示商，则返回 Infinity 或-Infinity。
- 如果有任一操作数是 NaN，则返回 NaN。
- 如果是 Infinity 除以 Infinity，则返回 NaN。
- 如果是 0 除以 0，则返回 NaN。
- 如果是非 0 的有限值除以 0，则根据第一个操作数的符号返回 Infinity 或-Infinity。
- 如果是 Infinity 除以任何数值，则根据第二个操作数的符号返回 Infinity 或-Infinity。
- 如果有不是数值的操作数，则先在后台用 Number()函数将其转换为数值，然后再应用上述规则。

#### 3. 取模操作符

取模（余数）操作符由一个百分比符号（%）表示  
let result = 26 % 5 // 等于 1

取模操作符对特殊值也有一些特殊的行为:

- 如果操作数是数值，则执行常规除法运算，返回余数。
- 如果被除数是无限值，除数是有限值，则返回 NaN。
- 如果被除数是有限值，除数是 0，则返回 NaN。
- 如果是 Infinity 除以 Infinity，则返回 NaN。
- 如果被除数是有限值，除数是无限值，则返回被除数。
- 如果被除数是 0，除数不是 0，则返回 0。
- 如果有不是数值的操作数，则先在后台用 Number()函数将其转换为数值，然后再应用上述规则。

### 3.5.5 指数操作符

ECMAScript 7 新增了指数操作符，Math.pow()现在有了自己的操作符\*\*，结果是一样的：

```js
console.log(Math.pow(3, 2)) // 9
console.log(3 ** 2) // 9
console.log(Math.pow(16, 0.5)) // 4
console.log(16 ** 0.5) // 4
```

指数操作符也有自己的指数赋值操作符\*\*=，该操作符执行指数运算和结果的赋值操作：

```js
let squared = 3
squared **= 2
console.log(squared) // 9

let sqrt = 16
sqrt **= 0.5
console.log(sqrt) // 4
```

### 3.5.6 加性操作符

#### 1. 加法操作符

如果两个操作数都是数值，加法操作符执行加法运算并根据如下规则返回结果：

- 如果有任一操作数是 NaN，则返回 NaN；
- 如果是 Infinity 加 Infinity，则返回 Infinity；
- 如果是-Infinity 加-Infinity，则返回-Infinity；
- 如果是 Infinity 加-Infinity，则返回 NaN；
- 如果是+0 加+0，则返回+0；
- 如果是-0 加+0，则返回+0；
- 如果是-0 加-0，则返回-0。

不过，如果有一个操作数是字符串，则要应用如下规则：

- 如果两个操作数都是字符串，则将第二个字符串拼接到第一个字符串后面；
- 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，再将两个字符串拼接在一起。

如果有任一操作数是对象、数值或布尔值，则调用它们的 toString()方法以获取字符串，然后再应用前面的关于字符串的规则。对于 undefined 和 null，则调用 String()函数，分别获取"undefined"和"null"。

---

ECMAScript 中最常犯的一个错误，就是忽略加法操作中涉及的数据类型。比如下面这个例子：

```js
let num1 = 5
let num2 = 10
let message = 'The sum of 5 and 10 is ' + num1 + num2
console.log(message) // "The sum of 5 and 10 is 510"
// 这是因为每次加法运算都是独立完成的。第一次加法的操作数是一个字符串和一个数值（5），结果还是一个字符串。第二次加法仍然是用一个字符串去加一个数值（10），同样也会得到一个字符串。

// 如果想真正执行数学计算，然后把结果追加到字符串末尾，只要使用一对括号即可：
let message = 'The sum of 5 and 10 is ' + (num1 + num2)
console.log(message) // "The sum of 5 and 10 is 15"
```

#### 2. 减法操作符

减法操作符（-）也是使用很频繁的一种操作符

与加法操作符一样，减法操作符也有一组规则用于处理 ECMAScript 中不同类型之间的转换：

- 如果两个操作数都是数值，则执行数学减法运算并返回结果。
- 如果有任一操作数是 NaN，则返回 NaN。
- 如果是 Infinity 减 Infinity，则返回 NaN。
- 如果是-Infinity 减-Infinity，则返回 NaN。
- 如果是 Infinity 减-Infinity，则返回 Infinity。
- 如果是-Infinity 减 Infinity，则返回-Infinity。
- 如果是+0 减+0，则返回+0。
- 如果是+0 减-0，则返回-0。
- 如果是-0 减-0，则返回+0。
- 如果有任一操作数是字符串、布尔值、null 或 undefined，则先在后台使用 Number()将其转换为数值，然后再根据前面的规则执行数学运算。如果转换结果是 NaN，则减法计算的结果是 NaN。
- 如果有任一操作数是对象，则调用其 valueOf()方法取得表示它的数值。如果该值是 NaN，则减法计算的结果是 NaN。如果对象没有 valueOf()方法，则调用其 toString()方法，然后再将得到的字符串转换为数值。

```js
let result1 = 5 - true // true 被转换为 1，所以结果是 4
let result2 = NaN - 1 // NaN
let result3 = 5 - 3 // 2
let result4 = 5 - '' // ""被转换为 0，所以结果是 5
let result5 = 5 - '2' // "2"被转换为 2，所以结果是 3
let result6 = 5 - null // null 被转换为 0，所以结果是 5
```

### 3.5.7 关系操作符

关系操作符执行比较两个值的操作，包括小于（<）、大于（>）、小于等于（<=）和大于等于（>=），用法跟数学课上学的一样。

与 ECMAScript 中的其他操作符一样，在将它们应用到不同数据类型时也会发生类型转换和其他行为:

- 如果操作数都是数值，则执行数值比较。
- 如果操作数都是字符串，则逐个比较字符串中对应字符的编码。
- 如果有任一操作数是数值，则将另一个操作数转换为数值，执行数值比较。(如果字符串不能转换成数值,会转换为 NaN，任何关系操作符在涉及比较 NaN 时都返回 false)
- 如果有任一操作数是对象，则调用其 valueOf()方法，取得结果后再根据前面的规则执行比较。  
  如果没有 valueOf()操作符，则调用 toString()方法，取得结果后再根据前面的规则执行比较。
- 如果有任一操作数是布尔值，则将其转换为数值再执行比较。

### 3.5.8 相等操作符

由于相等和不相等操作符存在类型转换问题，因此推荐使用全等和不全等操作符。这样有助于在代码中保持数据类型的完整性。

#### 1. 等于和不等于

这两个操作符都会先进行类型转换（通常称为**强制类型转换**）再确定操作数是否相等。

在转换操作数的类型时，相等和不相等操作符遵循如下规则:

- 如果任一操作数是布尔值，则将其转换为数值再比较是否相等。false 转换为 0，true 转换为 1。
- 如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等。
- 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法取得其原始值，再根据前面的规则进行比较。在进行比较时，这两个操作符会遵循如下规则。
- null 和 undefined 相等。
- null 和 undefined 不能转换为其他类型的值再进行比较。
- 如果有任一操作数是 NaN，则相等操作符返回 false，不相等操作符返回 true。记住：即使两个操作数都是 NaN，相等操作符也返回 false，因为按照规则，NaN 不等于 NaN。  如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true。否则，两者不相等。

下表总结了一些特殊情况及比较的结果

| 表 达 式          | 结 果 |
| :---------------- | :---- |
| null == undefined | true  |
| "NaN" == NaN      | false |
| 5 == NaN          | false |
| NaN == NaN        | false |
| NaN != NaN        | true  |
| false == 0        | true  |
| true == 1         | false |
| true == 2         | false |
| undefined == 0    | false |
| null == 0         | false |
| "5" == 5          | true  |

#### 2. 全等和不全等

null === undefined 是 false，因为它们不是相同的数据类型

### 3.5.9 条件操作符

条件操作符用等于号（?）表示

```js
let variable = boolean_expression ? true_value : false_value
```

### 3.5.10 赋值操作符

简单赋值用等于号（=）表示，将右手边的值赋给左手边的变量

---

复合赋值使用乘性、加性或位操作符后跟等于号（=）表示

```js
// 常见赋值操作的简写形式
let num = 10
num = num + 10

// 可以通过复合赋值来完成
num += 10
```

每个数学操作符以及其他一些操作符都有对应的复合赋值操作符：

- 乘后赋值（\*=）
- 除后赋值（/=）
- 取模后赋值（%=）
- 加后赋值（+=）
- 减后赋值（-=）
- 左移后赋值（<<=）
- 右移后赋值（>>=）
- 无符号右移后赋值（>>>=）

**这些操作符仅仅是简写语法，使用它们不会提升性能**

### 3.5.11 逗号操作符

逗号操作符可以用来在一条语句中执行多个操作，如下所示：

```js
let num1 = 1,
  num2 = 2,
  num3 = 3
```

---

也可以使用逗号操作符来辅助赋值。在赋值时使用逗号操作符分隔值，最终会返回表达式中最后一个值：

```js
let num = (5, 1, 4, 8, 0) // num 的值为 0
```

在这个例子中，num 将被赋值为 0，因为 0 是表达式中最后一项。逗号操作符的这种使用场景并不多见，但这种行为的确存在。

## 3.6 语句

ECMA-262 描述了一些语句（**也称为流控制语句**）

### 3.6.1 if 语句

### 3.6.2 do-while 语句

do-while 语句是一种后测试循环语句，即循环体中的代码执行后才会对退出条件进行求值。换句
话说，循环体内的代码至少执行一次。do-while 的语法如下：

```js
do {
  statement
} while (expression)
```

下面是一个例子：

```js
let i = 0
do {
  i += 2
} while (i < 10)
// 在这个例子中，只要 i 小于 10，循环就会重复执行。i 从 0 开始，每次循环递增 2。
```

:::warning 注意
后测试循环经常用于这种情形：循环体内代码在退出前至少要执行一次。
:::

### 3.6.3 while 语句

while 语句是一种先测试循环语句，即先检测退出条件，再执行循环体内的代码。因此，while 循
环体内的代码有可能不会执行。下面是 while 循环的语法：

```js
while (expression) statement
```

这是一个例子：

```js
let i = 0
while (i < 10) {
  i += 2
}
```

在这个例子中，变量 i 从 0 开始，每次循环递增 2。只要 i 小于 10，循环就会继续。

### 3.6.4 for 语句

for 语句也是先测试语句，只不过增加了进入循环之前的初始化代码，以及循环执行后要执行的表
达式，语法如下：

```js
for (initialization; expression; post - loop - expression) statement
```

无法通过 while 循环实现的逻辑，同样也无法使用 for 循环实现。因此 for 循环只是将循环相关
的代码封装在了一起而已。

初始化、条件表达式和循环后表达式都不是必需的。因此，下面这种写法可以创建一个无穷循环：

```js
for (;;) {
  // 无穷循环
  doSomething()
}
```

如果只包含条件表达式，那么 for 循环实际上就变成了 while 循环：

```js
let count = 10
let i = 0
for (; i < count; ) {
  console.log(i)
  i++
}
```

这种多功能性使得 for 语句在这门语言中使用非常广泛。

### 3.6.5 for-in 语句

（个人见解：循环返回 Key）

ECMAScript 中对象的属性是无序的，因此 for-in 语句不能保证返回对象属性的顺序。换句话说，所有可枚举的属性都会返回一次，但返回的顺序可能会因浏览器而异。

如果 for-in 循环要迭代的变量是 null 或 undefined，则不执行循环体。

---

for-in 语句是一种严格的迭代语句，用于枚举对象中的非符号键属性，语法如下：

```js
for (property in expression) statement
```

```js
const obj = {
  a: 'a',
  b: 'b',
  c: 'c'
}

for (let key in obj) {
  console.log('obj.' + key + ' = 我是' + obj[key])
}
// obj.a = 我是a
// obj.b = 我是b
// obj.c = 我是c
```

### 3.6.6 for-of 语句

（个人见解：循环返回 value）

for-of 语句是一种严格的迭代语句，用于遍历可迭代对象的元素，语法如下：

:::warning 注意
ES2018 对 for-of 语句进行了扩展，增加了 for-await-of 循环，以支持生成期约（promise）的异步可迭代对象。相关内容将在附录 A 介绍。
:::

下面是示例：

```js
for (const el of [2, 4, 6, 8]) {
  document.write(el)
}

// 与 for 和 for-in一样，这里控制语句中的 const 也不是必需的。但为了确保这个局部变量不被修改，推荐使用 const。
for (el of [2, 4, 6, 8]) {
  document.write(el)
}
```

### 3.6.7 标签语句

配合 break 或 continue 语句使用。

标签语句用于给语句加标签，语法如下：

```js
label: statement
```

---

标签语句，就是把两个循环当作一个代码块，如果 break 则跳出整个代码块，而不用代码块，则只是跳出第一个循环。

```js
block: for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        console.log(i, "------------", j)
        if(i === 1 && j === 1) {
            break block
        }
    }
}
0 '------------' 0
0 '------------' 1
0 '------------' 2
1 '------------' 0
1 '------------' 1


for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        console.log(i, "------------", j)
        if(i === 1 && j === 1) {
            break
        }
    }
}
0 '------------' 0
0 '------------' 1
0 '------------' 2
1 '------------' 0
1 '------------' 1
2 '------------' 0
2 '------------' 1
2 '------------' 2
```

continue 语句也用于立即退出循环，但会再次从循环顶部开始执行。

```js
block: for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        console.log(i, "------------", j)
        if(i === 1 && j === 1) {
            continue block
        }
    }
}
0 '------------' 0
0 '------------' 1
0 '------------' 2
1 '------------' 0
1 '------------' 1
2 '------------' 0
2 '------------' 1
2 '------------' 2

for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        console.log(i, "------------", j)
        if(i === 1 && j === 1) {
            continue
        }
    }
}
0 '------------' 0
0 '------------' 1
0 '------------' 2
1 '------------' 0
1 '------------' 1
1 '------------' 2
2 '------------' 0
2 '------------' 1
2 '------------' 2
```

### 3.6.8 break 和 continue 语句

break：**结束所有循环**，本次循环体不再执行，跨出循环体以内的内容。
continue：**结束本轮循环**，开启下一轮循环，本轮循环剩下的内容不在执行。

---

break 语句用于立即退出循环，强制执行循环后的下一条语句。

```js
let num = 0
for (let i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    break
  }
  num++
}

console.log(num) // 4

// for 循环会将变量 i 由 1 递增到 10。而在循环体内，有一个 if 语句用于检查 i 能否被 5 整除（使用取模操作符）。如果是，则执行 break 语句，退出循环。变量 num 的初始值为 0，表示循环在退出前执行了多少次。当 break 语句执行后，下一行执行的代码是 console.log(num)，显示 4。之所以循环执行了 4 次，是因为当 i 等于 5 时，break 语句会导致循环退出，该次循环不会执行递增 num 的代码
```

continue 语句也用于立即退出循环，但会再次从循环顶部开始执行。

```js
let num = 0
for (let i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    continue
  }
  num++
}
console.log(num) // 8

// console.log 显示 8，即循环被完整执行了 8 次。当 i 等于 5 时，循环会在递增 num 之前退出，但会执行下一次迭代，此时 i 是 6。然后，循环会一直执行到自然结束，即 i 等于 10。最终num 的值是 8 而不是 9，是因为 continue 语句导致它少递增了一次
```

### 3.6.9 with 语句

with 语句的用途是将代码作用域设置为特定的对象，其语法是：  
`with (expression) statement`
使用 with 语句的主要场景是针对一个对象反复操作，这时候将代码作用域设置为该对象能提供便利，如下面的例子所示：

```js
let qs = location.search.substring(1)
let hostName = location.hostname
let url = location.href
```

上面代码中的每一行都用到了 location 对象。如果使用 with 语句，就可以少写一些代码：

```js
with (location) {
  let qs = search.substring(1)
  let hostName = hostname
  let url = href
}
```

这里，with 语句用于连接 location 对象。这意味着在这个语句内部，每个变量首先会被认为是一个局部变量。如果没有找到该局部变量，则会搜索 location 对象，看它是否有一个同名的属性。如果有，则该变量会被求值为 location 对象的属性。  
严格模式不允许使用 with 语句，否则会抛出错误。

:::danger 警告
由于 with 语句影响性能且难于调试其中的代码，通常不推荐在产品代码中使用 with 语句。
:::

### 3.6.10 switch 语句

语法：

条件的值不需要是常量，也可以是变量或表达式

```js
// break关键字会导致代码执行跳出 switch 语句。如果没有 break，则代码会继续匹配下一个条件。default关键字用于在任何条件都没有满足时指定默认执行的语句（相当于 else 语句）
switch (expression) {
  case value1:
    statement
    break
  case value2:
    statement
    break
  default:
    statement
}

// 为避免不必要的条件判断，最好给每个条件后面都加上 break 语句。如果确实需要连续匹配几个条件，那么推荐写个注释表明是故意忽略了 break，如下所示：
switch (i) {
  case 25:
  /*跳过*/
  case 35:
    console.log('25 or 35')
    break
  case 45:
    console.log('45')
    break
  default:
    console.log('Other')
}
```

---

有了 switch 语句，开发者就用不着写类似这样的代码了：

```js
if (i == 25) {
  console.log('25')
} else if (i == 35) {
  console.log('35')
} else if (i == 45) {
  console.log('45')
} else {
  console.log('Other')
}

// 而是可以这样写：
switch (i) {
  case 25:
    console.log('25')
    break
  case 35:
    console.log('35')
    break
  case 45:
    console.log('45')
    break
  default:
    console.log('Other')
}
```

:::warning 注意
switch 语句在比较每个条件的值时会使用全等操作符，因此不会强制转换数据类型（比如，字符串"10"不等于数值 10）
:::

## 3.7 函数

函数对任何语言来说都是核心组件，因为它们可以封装语句，然后在任何地方、任何时间执行。ECMAScript 中的函数使用 function 关键字声明，后跟一组参数，然后是函数体。
