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
