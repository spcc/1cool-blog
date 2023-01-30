# 第 6 章 集合引用类型

## 6.1 Object

显式地创建 Object 的实例有两种方式

```js
// 使用 new 操作符和 Object 构造函数
let person = new Object()
person.name = 'Nicholas'
person.age = 29

// 是使用对象字面量表示法
// 目的是为了简化包含大量属性的对象的创建
let person = {
  name: 'Nicholas',
  age: 29
}

let person = {} // 与 new Object()相同
```

:::warning 注意
在使用对象字面量表示法定义对象时，并不会实际调用 Object 构造函数。
:::

## 6.2 Array

显式地创建 Array 的实例有两种方式

```js
// 构造函数
let colors = new Array()
// 初始 length 为 20 的数组
let colors = new Array(20)
// 包含 3 个字符串值的数组
let colors = new Array('red', 'blue', 'green')

// 使用 Array 构造函数时，也可以省略 new 操作符
let names = Array('Greg')

// 数组字面量
let colors = ['red', 'blue', 'green']
```

---

Array 构造函数还有两个 ES6 新增的用于创建数组的静态方法：

- from() 将类数组结构转换为数组实例
- of() 将一组参数转换为数组实例

Array.from()的第一个参数是一个类数组对象，即任何可迭代的结构，或者有一个 length 属性
和可索引元素的结构。这种方式可用于很多场合：

```js
// 字符串会被拆分为单字符数组
console.log(Array.from('Matt')) // ["M", "a", "t", "t"]

// 可以使用 from()将集合和映射转换为一个新数组
const m = new Map().set(1, 2).set(3, 4)
const s = new Set().add(1).add(2).add(3).add(4)
console.log(Array.from(m)) // [[1, 2], [3, 4]]
console.log(Array.from(s)) // [1, 2, 3, 4]

// Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4]
const a2 = Array.from(a1)
console.log(a1) // [1, 2, 3, 4]
alert(a1 === a2) // false

// 可以使用任何可迭代对象
const iter = {
  *[Symbol.iterator]() {
    yield 1
    yield 2
    yield 3
    yield 4
  }
}
console.log(Array.from(iter)) // [1, 2, 3, 4]

// arguments 对象可以被轻松地转换为数组
function getArgsArray() {
  return Array.from(arguments)
}
console.log(getArgsArray(1, 2, 3, 4)) // [1, 2, 3, 4]

// from()也能转换带有必要属性的自定义对象
const arrayLikeObject = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4
}
console.log(Array.from(arrayLikeObject)) // [1, 2, 3, 4]
```

Array.from()还接收第二个可选的映射函数参数。这个函数可以直接增强新数组的值，而无须像调用 Array.from().map()那样先创建一个中间数组。还可以接收第三个可选参数，用于指定映射函数中 this 的值。但这个重写的 this 值在箭头函数中不适用。

```js
const a1 = [1, 2, 3, 4]
const a2 = Array.from(a1, x => x ** 2)
const a3 = Array.from(
  a1,
  function (x) {
    return x ** this.exponent
  },
  { exponent: 2 }
)

console.log(a2) // [1, 4, 9, 16]
console.log(a3) // [1, 4, 9, 16]
```

Array.of()可以把一组参数转换为数组。这个方法用于替代在 ES6 之前常用的 Array.prototype.
slice.call(arguments)，一种异常笨拙的将 arguments 对象转换为数组的写法：

```js
console.log(Array.of(1, 2, 3, 4)) // [1, 2, 3, 4]
console.log(Array.of(undefined)) // [undefined]
```

### 6.2.2 数组空位

使用数组字面量初始化数组时，可以使用一串逗号来创建空位

```js
const options = [, , , , ,] // 创建包含 5 个元素的数组
console.log(options.length) // 5
console.log(options) // [,,,,,]
```

---

ES6 新增的方法和迭代器与早期 ECMAScript 版本中存在的方法行为不同。ES6 新增方法普遍将这
些空位当成存在的元素，只不过值为 undefined：

```js
const options = [1, , , , 5]
for (const option of options) {
  console.log(option === undefined)
}
// false
// true
// true
// true
// false

const a = Array.from([, , ,]) // 使用 ES6 的 Array.from()创建的包含 3 个空位的数组
for (const val of a) {
  alert(val === undefined)
}
// true
// true
// true
alert(Array.of(...[, , ,])) // [undefined, undefined, undefined]

for (const [index, value] of options.entries()) {
  alert(value)
}
// 1
// undefined
// undefined
// undefined
// 5

// ES6 之前的方法则会忽略这个空位，但具体的行为也会因方法而异：
const options = [1, , , , 5]
// map()会跳过空位置
console.log(options.map(() => 6)) // [6, undefined, undefined, undefined, 6]
// join()视空位置为空字符串
console.log(options.join('-')) // "1----5"
```

:::warning 注意
由于行为不一致和存在性能隐患，因此实践中要避免使用数组空位。如果确实需要空位，则可以显式地用 undefined 值代替。
:::

### 6.2.3 数组索引

::: warning 注意
数组最多可以包含 4 294 967 295 个元素，这对于大多数编程任务应该足够了。如果尝试添加更多项，则会导致抛出错误。以这个最大值作为初始值创建数组，可能导致脚本运行时间过长的错误。
:::

### 6.2.4 检测数组

判断一个对象是不是数组。在只有一个网页（因而只有一个全局作用域）的情况下，使用 instanceof 操作符就足矣：

```js
if (value instanceof Array) {
  // 操作数组
}
```

使用 instanceof 的问题是假定只有一个全局执行上下文。如果网页里有多个框架，则可能涉及两个不同的全局执行上下文，因此就会有两个不同版本的 Array 构造函数。如果要把数组从一个框架传给另一个框架，则这个数组的构造函数将有别于在第二个框架内本地创建的数组。

为解决这个问题，ECMAScript 提供了 Array.isArray()方法。这个方法的目的就是确定一个值是否为数组，而不用管它是在哪个全局执行上下文中创建的。来看下面的例子：

```js
if (Array.isArray(value)) {
  // 操作数组
}
```

### 6.2.5 迭代器方法

在 ES6 中，Array 的原型上暴露了 3 个用于检索数组内容的方法：keys()、values()和 entries()。keys()返回数组索引的迭代器，values()返回数组元素的迭代器，而 entries()返回索引/值对的迭代器：

```js
const a = ['foo', 'bar', 'baz', 'qux']

// 因为这些方法都返回迭代器，所以可以将它们的内容
// 通过 Array.from()直接转换为数组实例
const aKeys = Array.from(a.keys())
const aValues = Array.from(a.values())
const aEntries = Array.from(a.entries())
console.log(aKeys) // [0, 1, 2, 3]
console.log(aValues) // ["foo", "bar", "baz", "qux"]
console.log(aEntries) // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]
```

使用 ES6 的解构可以非常容易地在循环中拆分键/值对：

```js
const a = ['foo', 'bar', 'baz', 'qux']
for (const [idx, element] of a.entries()) {
  alert(idx)
  alert(element)
}
// 0
// foo
// 1
// bar
// 2
// baz
// 3
// qux
```

### 6.2.6 复制和填充方法

ES6 新增了两个方法：

- 批量复制方法 copyWithin()
- 以及填充数组方法 fill()

---

使用 fill()方法可以向一个已有的数组中插入全部或部分相同的值。开始索引用于指定开始填充的位置，它是可选的。如果不提供结束索引，则一直填充到数组末尾。负值索引从数组末尾开始计算。也可以将负索引想象成数组长度加上它得到的一个正索引：

```js
const zeroes = [0, 0, 0, 0, 0]

// 用 5 填充整个数组
zeroes.fill(5)
console.log(zeroes) // [5, 5, 5, 5, 5]
zeroes.fill(0) // 重置

// 用 6 填充索引大于等于 3 的元素
zeroes.fill(6, 3)
console.log(zeroes) // [0, 0, 0, 6, 6]
zeroes.fill(0) // 重置

// 用 7 填充索引大于等于 1 且小于 3 的元素
zeroes.fill(7, 1, 3)
console.log(zeroes) // [0, 7, 7, 0, 0];
zeroes.fill(0) // 重置

// 用 8 填充索引大于等于 1 且小于 4 的元素
// (-4 + zeroes.length = 1)
// (-1 + zeroes.length = 4)
zeroes.fill(8, -4, -1)
console.log(zeroes) // [0, 8, 8, 8, 0];
```

fill()静默忽略超出数组边界、零长度及方向相反的索引范围：

```js
const zeroes = [0, 0, 0, 0, 0]

// 索引过低，忽略
zeroes.fill(1, -10, -6)
console.log(zeroes) // [0, 0, 0, 0, 0]

// 索引过高，忽略
zeroes.fill(1, 10, 15)
console.log(zeroes) // [0, 0, 0, 0, 0]

// 索引反向，忽略
zeroes.fill(2, 4, 2)
console.log(zeroes) // [0, 0, 0, 0, 0]

// 索引部分可用，填充可用部分
zeroes.fill(4, 3, 10)
console.log(zeroes) // [0, 0, 0, 4, 4]
```

---

copyWithin()会按照指定范围浅复制数组中的部分内容，然后将它们插入到指定索引开始的位置。开始索引和结束索引则与 fill()使用同样的计算方法：

```js
let ints,
  reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

// 从 ints 中复制索引 0 开始的内容，插入到索引 5 开始的位置
// 在源索引或目标索引到达数组边界时停止
ints.copyWithin(5)
console.log(ints) // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
reset()

// 从 ints 中复制索引 5 开始的内容，插入到索引 0 开始的位置
ints.copyWithin(0, 5)
console.log(ints) // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
reset();

// 从 ints 中复制索引 0 开始到索引 3 结束的内容
// 插入到索引 4 开始的位置
ints.copyWithin(4, 0, 3);
alert(ints); // [0, 1, 2, 3, 0, 1, 2, 7, 8, 9]
reset();

// JavaScript 引擎在插值前会完整复制范围内的值
// 因此复制期间不存在重写的风险
ints.copyWithin(2, 0, 6);
alert(ints); // [0, 1, 0, 1, 2, 3, 4, 5, 8, 9]
reset();

// 支持负索引值，与 fill()相对于数组末尾计算正向索引的过程是一样的
ints.copyWithin(-4, -7, -3);
alert(ints); // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6]
copyWithin()静默忽略超出数组边界、零长度及方向相反的索引范围：
let ints,
reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

// 索引过低，忽略
ints.copyWithin(1, -15, -12);
alert(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset()

// 索引过高，忽略
ints.copyWithin(1, 12, 15);
alert(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

// 索引反向，忽略
ints.copyWithin(2, 4, 2);
alert(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

// 索引部分可用，复制、填充可用部分
ints.copyWithin(4, 7, 10)
alert(ints); // [0, 1, 2, 3, 7, 8, 9, 7, 8, 9];
```

### 6.2.7 转换方法

所有对象都有 toLocaleString()、toString()和 valueOf()方法

- valueOf() 返回的还是数组本身
- toString() 返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的字符串
- toLocaleString() 为了得到最终的字符串，会调用数组每个值的 toLocaleString()方法，而不是 toString()方法
- join() 使用不同的分隔符

```js
let colors = ['red', 'blue', 'green'] // 创建一个包含 3 个字符串的数组
console.log(colors.toString()) // 'red,blue,green'
console.log(colors.valueOf()) // ['red', 'blue', 'green']
console.log(colors) // ['red', 'blue', 'green']

// join示例
let colors = ['red', 'green', 'blue']
alert(colors.join(',')) // red,green,blue
alert(colors.join('||')) // red||green||blue

// toLocaleString() 示例
let person1 = {
  toLocaleString() {
    return 'Nikolaos'
  },
  toString() {
    return 'Nicholas'
  }
}
let person2 = {
  toLocaleString() {
    return 'Grigorios'
  },
  toString() {
    return 'Greg'
  }
}
let people = [person1, person2]
alert(people) // Nicholas,Greg
alert(people.toString()) // Nicholas,Greg
alert(people.toLocaleString()) // Nikolaos,Grigorios
```

:::warning 注意
如果数组中某一项是 null 或 undefined，则在 join()、toLocaleString()、toString()和 valueOf()返回的结果中会以空字符串表示。
:::

### 6.2.8 栈方法

ECMAScript 数组提供了 push()和 pop()方法，以实现类似栈的行为。
栈是一种后进先出（LIFO，Last-In-First-Out）的结构，也就是最近添加的项先被删除。
数据项的插入（称为推入，push）和删除（称为弹出，pop）只在栈的一个地方发生，即栈顶。

- push() 方法返回数组的最新长度
- pop() 删除最后一个，并返回被删除的项

### 6.2.9 队列方法

就像栈是以 LIFO 形式限制访问的数据结构一样，队列以先进先出（FIFO，First-In-First-Out）形式限制访问。

队列在列表末尾添加数据，但从列表开头获取数据。因为有了在数据末尾添加数据的 push()
方法，所以要模拟队列就差一个从数组开头取得数据的方法了。这个数组方法叫 shift()，它会删除数
组的第一项并返回它，然后数组长度减 1。使用 shift()和 push()，可以把数组当成队列来使用：

- unshift() 从数组开头添加
- shift() 删除第一个，并返回删除项

### 6.2.10 排序方法

数组有两个方法可以用来对元素重新排序：

- reverse() 将数组元素反向排列
- sort() 会在每一项上调用 String()转型函数，然后比较字符串来决定顺序。即使数组的元素都是值，也会先把数组转换为字符串再比较、排序。

```js
// 将数组元素反向排列
let values = [1, 2, 3, 4, 5]
values.reverse()
alert(values) // 5,4,3,2,1

// 先把数组转换为字符串再比较、排序
let values = [0, 1, 5, 10, 15]
values.sort()
alert(values) // 0,1,10,15,5
```

sort()方法可以接收一个**比较函数**  
比较函数接收两个参数，如果第一个参数应该排在第二个参数前面，就返回负值；如果两个参数相等，就返回 0；如果第一个参数应该排在第二个参数后面，就返回正值。下面是使用简单比较函数的一个例子：

```js
// 正序
function compare(value1, value2) {
  if (value1 < value2) {
    return -1
  } else if (value1 > value2) {
    return 1
  } else {
    return 0
  }
}
let values = [0, 1, 5, 10, 15]
values.sort(compare)
alert(values) // 0,1,5,10,15

// 降序
function compare(value1, value2) {
  if (value1 < value2) {
    return 1
  } else if (value1 > value2) {
    return -1
  } else {
    return 0
  }
}
let values = [0, 1, 5, 10, 15]
values.sort(compare)
alert(values) // 15,10,5,1,0

// 简写为一个箭头函数
let values = [0, 1, 5, 10, 15]
values.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))
alert(values) // 15,10,5,1,0

// 果数组的元素是数值，或者是其 valueOf()方法返回数值的对象（如 Date 对象），这个比较函数还可以写得更简单，因为这时可以直接用第二个值减去第一个值：
function compare(value1, value2) {
  return value2 - value1
}
```

### 6.2.11 操作方法

- concat() 连接两个或更多的数组，并返回结果。
- slice() 返回该索引到数组末尾的所有元素
- splice() 主要目的是在数组中间插入元素，但可以实现**删除，插入，替换**

#### concat()

在现有基础上创建一个新数组 或 如果传入一个或多个数组，则 会把这些数组的每一项都添加到结果数组。如果参数不是数组，则直接把它们添加到结果数组末尾。来看下面的例子：

```js
let colors = ['red', 'green', 'blue']
let colors2 = colors.concat('yellow', ['black', 'brown'])
console.log(colors) // ["red", "green","blue"]
console.log(colors2) // ["red", "green", "blue", "yellow", "black", "brown"]
```

打平数组参数的行为可以重写，方法是在参数数组上指定一个特殊的符号：Symbol.isConcatSpreadable。相反，把这个值设置为 true 可以强制打平类数组对象：

```js
let colors = ['red', 'green', 'blue']
let newColors = ['black', 'brown']
let moreNewColors = {
  [Symbol.isConcatSpreadable]: true,
  length: 2,
  0: 'pink',
  1: 'cyan'
}
newColors[Symbol.isConcatSpreadable] = false
// 强制不打平数组
let colors2 = colors.concat('yellow', newColors)
// 强制打平类数组对象
let colors3 = colors.concat(moreNewColors)
console.log(colors) // ["red", "green", "blue"]
console.log(colors2) // ["red", "green", "blue", "yellow", ["black", "brown"]]
console.log(colors3) // ["red", "green", "blue", "pink", "cyan"]
```

### slice()

用于创建一个包含原有数组中一个或多个元素的新数组。
可以接收一个或两个参数：返回元素的开始索引和结束索引。

- 如果只有一个参数，则 slice()会返回该索引到数组末尾的所有元素。
- 如果有两个参数，则 slice()返回从开始索引到结束索引对应的所有元素，其中不包含结束索引对应的元素。
- 这个操作不影响原始数组。

```js
let colors = ['red', 'green', 'blue', 'yellow', 'purple']
let colors2 = colors.slice(1)
let colors3 = colors.slice(1, 4)

alert(colors2) // green,blue,yellow,purple
alert(colors3) // green,blue,yellow
```

:::warning 注意
如果 slice()的参数有负值，那么就以数值长度加上这个负值的结果确定位置。比如，在包含 5 个元素的数组上调用 slice(-2,-1)，就相当于调用 slice(3,4)。如果结束位置小于开始位置，则返回空数组。
:::

### splice()

主要目的是在数组中间插入元素，但有 3 种不同的方式使用这个方法。

- **删除**。需要给 splice()传 2 个参数：要删除的第一个元素的位置和要删除的元素数量。可以从数组中删除任意多个元素，比如 splice(0, 2)会删除前两个元素。
- **插入**。需要给 splice()传 3 个参数：开始位置、0（要删除的元素数量）和要插入的元素，可以在数组中指定的位置插入元素。第三个参数之后还可以传第四个、第五个参数，乃至任意多个要插入的元素。比如，splice(2, 0, "red", "green")会从数组位置 2 开始插入字符串"red"和"green"。
- **替换**。splice()在删除元素的同时可以在指定位置插入新元素，同样要传入 3 个参数：开始位置、要删除元素的数量和要插入的任意多个元素。要插入的元素数量不一定跟删除的元素数量一致。比如，splice(2, 1, "red", "green")会在位置 2 删除一个元素，然后从该位置开始向数组中插入"red"和"green"。

返回被数组中删除的元素（如果没有删除元素，则返回空数组）。  
以下示例展示了上述 3 种使用方式。

```js
let colors = ['red', 'green', 'blue']
let removed = colors.splice(0, 1) // 删除第一项
alert(colors) // green,blue
alert(removed) // red，只有一个元素的数组

removed = colors.splice(1, 0, 'yellow', 'orange') // 在位置 1 插入两个元素
alert(colors) // green,yellow,orange,blue
alert(removed) // 空数组

removed = colors.splice(1, 1, 'red', 'purple') // 插入两个值，删除一个元素
alert(colors) // green,red,purple,orange,blue
alert(removed) // yellow，只有一个元素的数组
```

### 6.2.12 搜索和位置方法

ECMAScript 提供两类搜索数组的方法：按严格相等搜索和按断言函数搜索。

#### 1. 严格相等

这些方法都接收两个参数：要查找的元素和一个可选的起始搜索位置  
indexOf()和 lastIndexOf()都返回要查找的元素在数组中的位置，如果没找到则返回 -1  
includes()返回布尔值，表示是否至少找到一个与指定元素匹配的项

- indexOf() 所有版本可用
- lastIndexOf() 所有版本可用
- includes() ECMAScript 7 新增

在比较第一个参数跟数组每一项时，会使用全等（===）比较，也就是说两项必须严格相等。下面来看一些例子：

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]

alert(numbers.indexOf(4)) // 3
alert(numbers.lastIndexOf(4)) // 5
alert(numbers.includes(4)) // true

alert(numbers.indexOf(4, 4)) // 5
alert(numbers.lastIndexOf(4, 4)) // 3
alert(numbers.includes(4, 7)) // false

let person = { name: 'Nicholas' }
let people = [{ name: 'Nicholas' }]
let morePeople = [person]

alert(people.indexOf(person)) // -1
alert(morePeople.indexOf(person)) // 0
alert(people.includes(person)) // false
alert(morePeople.includes(person)) // true
```

#### 2. 断言函数

- find() 返回第一个匹配的元素
- findIndex() 返回第一个匹配元素的索引

每个方法接收两个参数：  
第一个方法函数接收 3 个参数：元素、索引和数组本身  
第二个可选的参数，用于指定断言函数内部 this 的值。
找到匹配项后，这两个方法都不再继续搜索。

```js
const people = [
  {
    name: 'Matt',
    age: 27
  },
  {
    name: 'Nicholas',
    age: 29
  }
]

alert(people.find((element, index, array) => element.age < 28))
// {name: "Matt", age: 27}
alert(people.findIndex((element, index, array) => element.age < 28))
// 0
```

### 6.2.13 迭代方法

ECMAScript 为数组定义了 5 个迭代方法。

每个方法接收两个参数：

- 以每一项为参数运行的函数，函数接收 3 个参数（数组元素、元素索引和数组本身，因具体方法而异，这个函数的执行结果可能会也可能不会影响方法的返回值。）
- 以及可选的作为函数运行上下文的作用域对象（影响函数中 this 的值）。传给每个方法的函数接收 3

**这些方法都不改变调用它们的数组**

- every()：对数组每一项都运行传入的函数，如果对每一项函数都返回 true，则这个方法返回 true。
- some()：对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true。
- filter()：对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回。
- forEach()：对数组每一项都运行传入的函数，没有返回值。
- map()：对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。

---

every()和 some()是最相似的，都是从数组中搜索符合某个条件的元素。

- every() 每一项都返回 true，它才会返回 true
- 对 some()来说，只要有一项让传入的函数返回 true，它就会返回 true

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]

let everyResult = numbers.every((item, index, array) => item > 2)
alert(everyResult) // false

let someResult = numbers.some((item, index, array) => item > 2)
alert(someResult) // true
```

---

filter() 非常适合从数组中筛选满足给定条件的元素

```js
// 返回一个所有数值都大于 2 的数组
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]
let filterResult = numbers.filter((item, index, array) => item > 2)
alert(filterResult) // 3,4,5,4,3
```

---

map()方法也会返回一个数组。
这个方法非常适合创建一个与原始数组元素一一对应的新数组。

```js
// 将一个数组中的每一项都乘以 2，并返回包含所有结果的数组
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]
let mapResult = numbers.map((item, index, array) => item * 2)
alert(mapResult) // 2,4,6,8,10,8,6,4,2
```

---

forEach() 方法相当于使用 for 循环遍历数组

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]
numbers.forEach((item, index, array) => {
  // 执行某些操作
})
```

### 6.2.14 归并方法

ECMAScript 为数组提供了两个归并方法：

都接收两个参数：

- 对每一项都会运行的归并函数，函数接收 4 个参数：上一个归并值、当前项、当前项的索引和数组本身。这个函数返回的任何值都会作为下一次调用同一个函数的第一个参数。如果没有给这两个方法传入可选的第二个参数（作为归并起点值），则第一次迭代将从数组的第二项开始，因此传给归并函数的第一个参数是数组的第一项，第二个参数是数组的第二项。
- 可选的以之为归并起点的初始值

---

- reduce()
- reduceRight()

这两个方法都会迭代数组的所有项，并在此基础上构建一个最终返回值。reduce()方法从数组第一项开始遍历到最后一项。而 reduceRight()从最后一项开始遍历至第一项。

```js
// 累加
// 第一次执行归并函数时，prev 是 1，cur 是 2。第二次执行时，prev 是 3（1 + 2），cur 是 3（数组第三项）。如此递进，直到把所有项都遍历一次
let values = [1, 2, 3, 4, 5]
let sum = values.reduce((prev, cur, index, array) => prev + cur)
alert(sum) // 15

// reduceRight()方法与之类似，只是方向相反。来看下面的例子：
let values = [1, 2, 3, 4, 5]
let sum = values.reduceRight(function (prev, cur, index, array) {
  return prev + cur
})
alert(sum) // 15
```

究竟是使用 reduce()还是 reduceRight()，只取决于遍历数组元素的方向。除此之外，这两个方法没什么区别。

## 6.3 定型数组

定型数组（typed array）是 ECMAScript 新增的结构，目的是提升向原生库传输数据的效率。实际上，JavaScript 并没有“TypedArray”类型，它所指的其实是一种特殊的包含数值类型的数组。为理解如何使用定型数组，有必要先了解一下它的用途。

## 6.4 Map

ECMAScript 6 以前，实现“键/值”式存储使用 Object 来完成。但这种实现并非没有问题，为此 TC39 委员会专门为“键/值”存储定义了一个规范。

作为 ECMAScript 6 的新增特性，Map 是一种新的集合类型，为这门语言带来了真正的键/值存储机制。Map 的大多数特性都可以通过 Object 类型实现，但二者之间还是存在一些细微的差异。具体实践
中使用哪一个，还是值得细细甄别。

### 6.4.1 基本 API

```js
// 使用 new 关键字和 Map 构造函数可以创建一个空映射：
const m = new Map()

// 如果想在创建的同时初始化实例，可以给 Map 构造函数传入一个可迭代对象，需要包含键/值对数组。可迭代对象中的每个键/值对都会按照迭代顺序插入到新映射实例中：
// 使用嵌套数组初始化映射
const m1 = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3']
])
alert(m1.size) // 3

// 使用自定义迭代器初始化映射
const m2 = new Map({
  [Symbol.iterator]: function* () {
    yield ['key1', 'val1']
    yield ['key2', 'val2']
    yield ['key3', 'val3']
  }
})
alert(m2.size) // 3

// 映射期待的键/值对，无论是否提供
const m3 = new Map([[]])
alert(m3.has(undefined)) // true
alert(m3.get(undefined)) // undefined
```

初始化之后，可以使用 set()方法再添加键/值对。另外，可以使用 get()和 has()进行查询，可以通过 size 属性获取映射中的键/值对的数量，还可以使用 delete()和 clear()删除值。

```js
const m = new Map()

alert(m.has('firstName')) // false
alert(m.get('firstName')) // undefined
alert(m.size) // 0

m.set('firstName', 'Matt').set('lastName', 'Frisbie')
alert(m.has('firstName')) // true
alert(m.get('firstName')) // Matt
alert(m.size) // 2

m.delete('firstName') // 只删除这一个键/值对
alert(m.has('firstName')) // false
alert(m.has('lastName')) // true
alert(m.size) // 1

m.clear() // 清除这个映射实例中的所有键/值对
alert(m.has('firstName')) // false
alert(m.has('lastName')) // false
alert(m.size) // 0

// set()方法返回映射实例，因此可以把多个操作连缀起来，包括初始化声明：
const m = new Map().set('key1', 'val1')
m.set('key2', 'val2').set('key3', 'val3')
alert(m.size) // 3
```

与 Object 只能使用数值、字符串或符号作为键不同，Map 可以使用任何 JavaScript 数据类型作为键。Map 内部使用 SameValueZero 比较操作（ECMAScript 规范内部定义，语言中不能使用），基本上相当于使用严格对象相等的标准来检查键的匹配性。与 Object 类似，映射的值是没有限制的。

```js
const m = new Map()

const functionKey = function () {}
const symbolKey = Symbol()
const objectKey = new Object()

m.set(functionKey, 'functionValue')
m.set(symbolKey, 'symbolValue')
m.set(objectKey, 'objectValue')

alert(m.get(functionKey)) // functionValue
alert(m.get(symbolKey)) // symbolValue
alert(m.get(objectKey)) // objectValue

// SameValueZero 比较意味着独立实例不冲突
alert(m.get(function () {})) // undefined
```

与严格相等一样，在映射中用作键和值的对象及其他“集合”类型，在自己的内容或属性被修改时
仍然保持不变：

```js
const m = new Map()
const objKey = {},
  objVal = {},
  arrKey = [],
  arrVal = []

m.set(objKey, objVal)
m.set(arrKey, arrVal)

objKey.foo = 'foo'
objVal.bar = 'bar'
arrKey.push('foo')
arrVal.push('bar')

console.log(m.get(objKey)) // {bar: "bar"}
console.log(m.get(arrKey)) // ["bar"]
```

SameValueZero 比较也可能导致意想不到的冲突：

```js
const m = new Map()

const a = 0 / '', // NaN
  b = 0 / '', // NaN
  pz = +0,
  nz = -0

alert(a === b) // false
alert(pz === nz) // true

m.set(a, 'foo')
m.set(pz, 'bar')

alert(m.get(b)) // foo
alert(m.get(nz)) // bar
```

:::warning 注意
SameValueZero 是 ECMAScript 规范新增的相等性比较算法。关于 ECMAScript 的相等性比较，可以参考 MDN 文档中的文章“Equality Comparisons and Sameness”。
:::

### 6.4.2 顺序与迭代

与 Object 类型的一个主要差异是，Map 实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作。

映射实例可以提供一个迭代器（Iterator），能以插入顺序生成[key, value]形式的数组。可以通过 entries()方法（或者 Symbol.iterator 属性，它引用 entries()）取得这个迭代器：

```js
const m = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3']
])

alert(m.entries === m[Symbol.iterator]) // true

for (let pair of m.entries()) {
  alert(pair)
}
// [key1,val1]
// [key2,val2]
// [key3,val3]

for (let pair of m[Symbol.iterator]()) {
  alert(pair)
}
// [key1,val1]
// [key2,val2]
// [key3,val3]
```

因为 entries()是默认迭代器，所以可以直接对映射实例使用扩展操作，把映射转换为数组：

```js
const m = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3']
])
console.log([...m]) // [[key1,val1],[key2,val2],[key3,val3]]
```

如果不使用迭代器，而是使用回调方式，则可以调用映射的 forEach(callback, opt_thisArg)方法并传入回调，依次迭代每个键/值对。传入的回调接收可选的第二个参数，这个参数用于重写回调内部 this 的值：

```js
const m = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3']
])
m.forEach((val, key) => alert(`${key} -> ${val}`))
// key1 -> val1
// key2 -> val2
// key3 -> val3
```

keys()和 values()分别返回以插入顺序生成键和值的迭代器：

```js
const m = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3']
])

for (let key of m.keys()) {
  alert(key)
}
// key1
// key2
// key3

for (let key of m.values()) {
  alert(key)
}
// value1
// value2
// value3
```

键和值在迭代器遍历时是可以修改的，但映射内部的引用则无法修改。当然，这并不妨碍修改作为
键或值的对象内部的属性，因为这样并不影响它们在映射实例中的身份：

```js
const m1 = new Map([['key1', 'val1']])

// 作为键的字符串原始值是不能修改的
for (let key of m1.keys()) {
  key = 'newKey'
  alert(key) // newKey
  alert(m1.get('key1')) // val1
}

const keyObj = { id: 1 }
const m = new Map([[keyObj, 'val1']])

// 修改了作为键的对象的属性，但对象在映射内部仍然引用相同的值
for (let key of m.keys()) {
  key.id = 'newKey'
  alert(key) // {id: "newKey"}
  alert(m.get(keyObj)) // val1
}
alert(keyObj) // {id: "newKey"}
```

### 6.4.3 选择 Object 还是 Map

总结：

- 如果代码涉及大量查找操作，那么某些情况下可能选择 Object 更好一些
- 如果代码涉及大量删除操作，那么毫无疑问应该选择 Map

对于多数 Web 开发任务来说，选择 Object 还是 Map 只是个人偏好问题，影响不大。不过，对于
在乎内存和性能的开发者来说，对象和映射之间确实存在显著的差别。

1. 内存占用

Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量都会随键的数量线性增加。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。不同浏览器的情况不同，但给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对。

2. 插入性能

向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。如果代码涉及大量插入操作，那么显然 Map 的性能更佳。

3. 查找速度

与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对，则 Object 有时候速度更快。在把 Object 当成数组使用的情况下（比如使用连续整数作为属性），浏览器引擎可以进行优化，在内存中使用更高效的布局。这对 Map 来说是不可能的。对这两个类型而言，查找速度不会随着键/值对数量增加而线性增加。如果代码涉及大量查找操作，那么某些情况下可能选择 Object 更好一些。

4. 删除性能

使用 delete 删除 Object 属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此，出现了一些伪删除对象属性的操作，包括把属性值设置为 undefined 或 null。但很多时候，这都是一种讨厌的或不适宜的折中。而对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。如果代码涉及大量删除操作，那么毫无疑问应该选择 Map。

### 6.5 WeakMap

ECMAScript 6 新增的“弱映射”（WeakMap）是一种新的集合类型，为这门语言带来了增强的键/值对存储机制。WeakMap 是 Map 的“兄弟”类型，其 API 也是 Map 的子集。WeakMap 中的“weak”（弱），描述的是 JavaScript 垃圾回收程序对待“弱映射”中键的方式。

初始化之后可以使用 set()再添加键/值对，可以使用 get()和 has()查询，还可以使用 delete()
删除。

---

DOM 节点元数据

因为 WeakMap 实例不会妨碍垃圾回收，所以非常适合保存关联元数据。来看下面这个例子，其中使用了常规的 Map：

```js
const m = new Map()
const loginButton = document.querySelector('#login')
// 给这个节点关联一些元数据
m.set(loginButton, { disabled: true })
```

假设在上面的代码执行后，页面被 JavaScript 改变了，原来的登录按钮从 DOM 树中被删掉了。但由于映射中还保存着按钮的引用，所以对应的 DOM 节点仍然会逗留在内存中，除非明确将其从映射中删除或者等到映射本身被销毁。

如果这里使用的是弱映射，如以下代码所示，那么当节点从 DOM 树中被删除后，垃圾回收程序就可以立即释放其内存（假设没有其他地方引用这个对象）：

```js
const wm = new WeakMap()

const loginButton = document.querySelector('#login')

// 给这个节点关联一些元数据
wm.set(loginButton, { disabled: true })
```

## 6.6 Set

ECMAScript 6 新增的 Set 是一种新集合类型，为这门语言带来集合数据结构。Set 在很多方面都像是加强的 Map，这是因为它们的大多数 API 和行为都是共有的。

### 6.6.1 基本 API

```js
// 使用 new 关键字和 Set 构造函数可以创建一个空集合：
const m = new Set()

// 如果想在创建的同时初始化实例，则可以给 Set 构造函数传入一个可迭代对象，其中需要包含插入到新集合实例中的元素：
// 使用数组初始化集合
const s1 = new Set(['val1', 'val2', 'val3'])
alert(s1.size) // 3

// 使用自定义迭代器初始化集合
const s2 = new Set({
  [Symbol.iterator]: function* () {
    yield 'val1'
    yield 'val2'
    yield 'val3'
  }
})
alert(s2.size) // 3
```

初始化之后，可以使用 add()增加值，使用 has()查询，通过 size 取得元素数量，以及使用 delete()和 clear()删除元素：

```js
const s = new Set()
alert(s.has('Matt')) // false
alert(s.size) // 0

s.add('Matt').add('Frisbie')
alert(s.has('Matt')) // true
alert(s.size) // 2

s.delete('Matt')
alert(s.has('Matt')) // false
alert(s.has('Frisbie')) // true
alert(s.size) // 1

s.clear() // 销毁集合实例中的所有值
alert(s.has('Matt')) // false
alert(s.has('Frisbie')) // false
alert(s.size) // 0
```

add()返回集合的实例，所以可以将多个添加操作连缀起来，包括初始化：

```js
const s = new Set().add('val1')
s.add('val2').add('val3')
alert(s.size) // 3
```

与 Map 类似，Set 可以包含任何 JavaScript 数据类型作为值。集合也使用 SameValueZero 操作
（ECMAScript 内部定义，无法在语言中使用），基本上相当于使用严格对象相等的标准来检查值的匹配性。

```js
const s = new Set()

const functionVal = function () {}
const symbolVal = Symbol()
const objectVal = new Object()

s.add(functionVal)
s.add(symbolVal)
s.add(objectVal)

alert(s.has(functionVal)) // true
alert(s.has(symbolVal)) // true
alert(s.has(objectVal)) // true

// SameValueZero 检查意味着独立的实例不会冲突
alert(s.has(function () {})) // false
```

与严格相等一样，用作值的对象和其他“集合”类型在自己的内容或属性被修改时也不会改变：

```js
const s = new Set()

const objVal = {},
  arrVal = []

s.add(objVal)
s.add(arrVal)

objVal.bar = 'bar'
arrVal.push('bar')

alert(s.has(objVal)) // true
alert(s.has(arrVal)) // true
```

add()和 delete()操作是幂等的。delete()返回一个布尔值，表示集合中是否存在要删除的值：

```js
const s = new Set()

s.add('foo')
alert(s.size) // 1
s.add('foo')
alert(s.size) // 1

// 集合里有这个值
alert(s.delete('foo')) // true

// 集合里没有这个值
alert(s.delete('foo')) // false
```

### 6.6.2 顺序与迭代

Set 会维护值插入时的顺序，因此支持按顺序迭代。

集合实例可以提供一个迭代器（Iterator），能以插入顺序生成集合内容。可以通过 values()方法及其别名方法 keys()（或者 Symbol.iterator 属性，它引用 values()）取得这个迭代器：

```js
const s = new Set(['val1', 'val2', 'val3'])

alert(s.values === s[Symbol.iterator]) // true
alert(s.keys === s[Symbol.iterator]) // true

for (let value of s.values()) {
  alert(value)
}
// val1
// val2
// val3

for (let value of s[Symbol.iterator]()) {
  alert(value)
}
// val1
// val2
// val3
```

因为 values()是默认迭代器，所以可以直接对集合实例使用扩展操作，把集合转换为数组：

```js
const s = new Set(['val1', 'val2', 'val3'])
console.log([...s]) // ["val1", "val2", "val3"]
```

集合的 entries()方法返回一个迭代器，可以按照插入顺序产生包含两个元素的数组，这两个元素是集合中每个值的重复出现：

```js
const s = new Set(['val1', 'val2', 'val3'])
for (let pair of s.entries()) {
  console.log(pair)
}
// ["val1", "val1"]
// ["val2", "val2"]
// ["val3", "val3"]
```

如果不使用迭代器，而是使用回调方式，则可以调用集合的 forEach()方法并传入回调，依次迭代每个键/值对。传入的回调接收可选的第二个参数，这个参数用于重写回调内部 this 的值：

```js
const s = new Set(['val1', 'val2', 'val3'])
s.forEach((val, dupVal) => alert(`${val} -> ${dupVal}`))
// val1 -> val1
// val2 -> val2
// val3 -> val3
```

修改集合中值的属性不会影响其作为集合值的身份：

```js
const s1 = new Set(['val1'])

// 字符串原始值作为值不会被修改
for (let value of s1.values()) {
  value = 'newVal'
  alert(value) // newVal
  alert(s1.has('val1')) // true
}

const valObj = { id: 1 }
const s2 = new Set([valObj])
// 修改值对象的属性，但对象仍然存在于集合中
for (let value of s2.values()) {
  value.id = 'newVal'
  alert(value) // {id: "newVal"}
  alert(s2.has(valObj)) // true
}
alert(valObj) // {id: "newVal"}
```

### 6.6.3 定义正式集合操作

## 6.7 WeakSet

```js
// 可以使用 new 关键字实例化一个空的 WeakSet：
const ws = new WeakSet()

const val1 = { id: 1 },
  val2 = { id: 2 },
  val3 = { id: 3 }
// 使用数组初始化弱集合
const ws1 = new WeakSet([val1, val2, val3])
alert(ws1.has(val1)) // true
alert(ws1.has(val2)) // true
alert(ws1.has(val3)) // true

// 初始化是全有或全无的操作
// 只要有一个值无效就会抛出错误，导致整个初始化失败
const ws2 = new WeakSet([val1, 'BADVAL', val3])
// TypeError: Invalid value used in WeakSet
typeof ws2
// ReferenceError: ws2 is not defined

// 原始值可以先包装成对象再用作值
const stringVal = new String('val1')
const ws3 = new WeakSet([stringVal])
alert(ws3.has(stringVal)) // true
```

初始化之后可以使用 add()再添加新值，可以使用 has()查询，还可以使用 delete()删除：

```js
const ws = new WeakSet()
const val1 = { id: 1 },
  val2 = { id: 2 }

alert(ws.has(val1)) // false
ws.add(val1).add(val2)
alert(ws.has(val1)) // true
alert(ws.has(val2)) // true
ws.delete(val1) // 只删除这一个值
alert(ws.has(val1)) // false
alert(ws.has(val2)) // true
```

### 6.7.3 不可迭代值

因为 WeakSet 中的值任何时候都可能被销毁，所以没必要提供迭代其值的能力。

像 clear()这样一次性销毁所有值的方法。WeakSet 确实没有这个方法。

### 6.7.4 使用弱集合

相比于 WeakMap 实例，WeakSet 实例的用处没有那么大。不过，弱集合在给对象打标签时还是有价值的。

来看下面的例子，这里使用了一个普通 Set：

```js
const disabledElements = new Set()
const loginButton = document.querySelector('#login')
// 通过加入对应集合，给这个节点打上“禁用”标签
disabledElements.add(loginButton)
```

这样，通过查询元素在不在 disabledElements 中，就可以知道它是不是被禁用了。不过，假如元素从 DOM 树中被删除了，它的引用却仍然保存在 Set 中，因此垃圾回收程序也不能回收它。  
为了让垃圾回收程序回收元素的内存，可以在这里使用 WeakSet：  
这样，只要 WeakSet 中任何元素从 DOM 树中被删除，垃圾回收程序就可以忽略其存在，而立即释放其内存（假设没有其他地方引用这个对象）。

```js
const disabledElements = new WeakSet()
const loginButton = document.querySelector('#login')
// 通过加入对应集合，给这个节点打上“禁用”标签
disabledElements.add(loginButton)
```

## 6.8 迭代与扩展操作

ECMAScript 6 新增的迭代器和扩展操作符对集合引用类型特别有用。这些新特性让集合类型之间相互操作、复制和修改变得异常方便。

有 4 种原生集合类型定义了默认迭代器：

- Array
- 所有定型数组
- Map
- Set

这意味着上述所有类型都支持顺序迭代，都可以传入 for-of 循环：

```js
let iterableThings = [
  Array.of(1, 2),
  (typedArr = Int16Array.of(3, 4)),
  new Map([
    [5, 6],
    [7, 8]
  ]),
  new Set([9, 10])
]

for (const iterableThing of iterableThings) {
  for (const x of iterableThing) {
    console.log(x)
  }
}

// 1
// 2
// 3
// 4
// [5, 6]
// [7, 8]
// 9
// 10
```

这也意味着所有这些类型都兼容扩展操作符。扩展操作符在对可迭代对象执行浅复制时特别有用，只需简单的语法就可以复制整个对象：

```js
let arr1 = [1, 2, 3]
let arr2 = [...arr1]
console.log(arr1) // [1, 2, 3]
console.log(arr2) // [1, 2, 3]
console.log(arr1 === arr2) // false
```

对于期待可迭代对象的构造函数，只要传入一个可迭代对象就可以实现复制：

```js
let map1 = new Map([
  [1, 2],
  [3, 4]
])
let map2 = new Map(map1)

console.log(map1) // Map {1 => 2, 3 => 4}
console.log(map2) // Map {1 => 2, 3 => 4}
```

当然，也可以构建数组的部分元素：

```js
let arr1 = [1, 2, 3]
let arr2 = [0, ...arr1, 4, 5]
console.log(arr2) // [0, 1, 2, 3, 4, 5]
```

浅复制意味着只会复制对象引用：

```js
let arr1 = [{}]
let arr2 = [...arr1]

arr1[0].foo = 'bar'
console.log(arr2[0]) // { foo: 'bar' }
```

上面的这些类型都支持多种构建方法，比如 Array.of()和 Array.from()静态方法。在与扩展操作符一起使用时，可以非常方便地实现互操作：

```js
let arr1 = [1, 2, 3]

// 把数组复制到定型数组
let typedArr1 = Int16Array.of(...arr1)
let typedArr2 = Int16Array.from(arr1)
console.log(typedArr1) // Int16Array [1, 2, 3]
console.log(typedArr2) // Int16Array [1, 2, 3]

// 把数组复制到映射
let map = new Map(arr1.map(x => [x, 'val' + x]))
console.log(map) // Map {1 => 'val 1', 2 => 'val 2', 3 => 'val 3'}

// 把数组复制到集合
let set = new Set(typedArr2)
console.log(set) // Set {1, 2, 3}

// 把集合复制回数组
let arr2 = [...set]
console.log(arr2) // [1, 2, 3]
```

## 6.9 小结

JavaScript 中的对象是引用值，可以通过几种内置引用类型创建特定类型的对象。

- 引用类型与传统面向对象编程语言中的类相似，但实现不同。
- Object 类型是一个基础类型，所有引用类型都从它继承了基本的行为。
- Array 类型表示一组有序的值，并提供了操作和转换值的能力。
- 定型数组包含一套不同的引用类型，用于管理数值在内存中的类型。
- Date 类型提供了关于日期和时间的信息，包括当前日期和时间以及计算。
- RegExp 类型是 ECMAScript 支持的正则表达式的接口，提供了大多数基本正则表达式以及一些
  高级正则表达式的能力。

JavaScript 比较独特的一点是，函数其实是 Function 类型的实例，这意味着函数也是对象。由于函数是对象，因此也就具有能够增强自身行为的方法。  
因为原始值包装类型的存在，所以 JavaScript 中的原始值可以拥有类似对象的行为。有 3 种原始值
包装类型：Boolean、Number 和 String。它们都具有如下特点。

- 每种包装类型都映射到同名的原始类型。
- 在以读模式访问原始值时，后台会实例化一个原始值包装对象，通过这个对象可以操作数据。
- 涉及原始值的语句只要一执行完毕，包装对象就会立即销毁。

JavaScript 还有两个在一开始执行代码时就存在的内置对象：Global 和 Math。其中，Global 对
象在大多数 ECMAScript 实现中无法直接访问。不过浏览器将 Global 实现为 window 对象。所有全局

变量和函数都是 Global 对象的属性。Math 对象包含辅助完成复杂数学计算的属性和方法。
ECMAScript 6 新增了一批引用类型：Map、WeakMap、Set 和 WeakSet。这些类型为组织应用程序
数据和简化内存管理提供了新能力。
