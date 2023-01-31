# 第 7 章 迭代器与生成器

迭代的英文“iteration”，意思是“重复”或“再来”。在软件开发领域，“迭代”的意思是按照顺序反复多次执行一段程序，通常会有明确的终止条件。ECMAScript 6 规范新增了两个高级特性：迭代器和生成器。使用这两个特性，能够更清晰、高效、方便地实现迭代。

## 7.1 理解迭代

在 JavaScript 中，计数循环就是一种最简单的迭代：

```js
for (let i = 1; i <= 10; ++i) {
  console.log(i)
}
```

通过这种循环来执行例程并不理想。

- **迭代之前需要事先知道如何使用数据结构**。数组中的每一项都只能先通过引用取得数组对象，然后再通过[]操作符取得特定索引位置上的项。这种情况并不适用于所有数据结构。

- **遍历顺序并不是数据结构固有的**。通过递增索引来访问数据是特定于数组类型的方式，并不适用于其他具有隐式顺序的数据结构。

ES5 新增了 Array.prototype.forEach()方法，向通用迭代需求迈进了一步（但仍然不够理想）：

```js
let collection = ['foo', 'bar', 'baz']
collection.forEach(item => console.log(item))
// foo
// bar
// baz
```

这个方法解决了单独记录索引和通过数组对象取得值的问题。不过，没有办法标识迭代何时终止。因此这个方法只适用于数组，而且回调结构也比较笨拙。

ECMAScript 较早的版本中，执行迭代必须使用循环或其他辅助结构。随着代码量增加，代码会变得越发混乱。很多语言都通过原生语言结构解决了这个问题，开发者无须事先知道如何迭代就能实现迭代操作。这个解决方案就是迭代器模式。Python、Java、C++，还有其他很多语言都对这个模式提供了完备的支持。JavaScript 在 ECMAScript 6 以后也支持了迭代器模式。

## 7.2 迭代器模式

**迭代器模式**（特别是在 ECMAScript 这个语境下）描述了一个方案，即可以把有些结构称为“可迭代对象”（iterable），因为它们实现了正式的 Iterable 接口，而且可以通过迭代器 Iterator 消费。  
可迭代对象是一种抽象的说法。基本上，可以把可迭代对象理解成数组或集合这样的集合类型的对象。它们包含的元素都是有限的，而且都具有无歧义的遍历顺序：

```js
// 数组的元素是有限的
// 递增索引可以按序访问每个元素
let arr = [3, 1, 4]

// 集合的元素是有限的
// 可以按插入顺序访问每个元素
let set = new Set().add(3).add(1).add(4)
```

不过，可迭代对象不一定是集合对象，也可以是仅仅具有类似数组行为的其他数据结构，比如本章开头提到的计数循环。该循环中生成的值是暂时性的，但循环本身是在执行迭代。计数循环和数组都具有可迭代对象的行为。  
任何实现 Iterable 接口的数据结构都可以被实现 Iterator 接口的结构“消费”（consume）。**迭代器**（iterator）是按需创建的一次性对象。每个迭代器都会关联一个**可迭代对象**，而迭代器会暴露迭代其关联可迭代对象的 API。迭代器无须了解与其关联的可迭代对象的结构，只需要知道如何取得连续的值。这种概念上的分离正是 Iterable 和 Iterator 的强大之处。

### 7.2.1 可迭代协议

实现 Iterable 接口（可迭代协议）要求同时具备两种能力：支持迭代的自我识别能力和创建实现 Iterator 接口的对象的能力。在 ECMAScript 中，这意味着必须暴露一个属性作为“默认迭代器”，而且这个属性必须使用特殊的 Symbol.iterator 作为键。这个默认迭代器属性必须引用一个迭代器工厂函数，调用这个工厂函数必须返回一个新迭代器。

很多内置类型都实现了 Iterable 接口：

- 字符串
- 数组
- 映射
- 集合
- arguments 对象
- NodeList 等 DOM 集合类型

检查是否存在默认迭代器属性可以暴露这个工厂函数：

```js
let num = 1
let obj = {}
// 这两种类型没有实现迭代器工厂函数
console.log(num[Symbol.iterator]) // undefined
console.log(obj[Symbol.iterator]) // undefined

let str = 'abc'
let arr = ['a', 'b', 'c']
let map = new Map().set('a', 1).set('b', 2).set('c', 3)
let set = new Set().add('a').add('b').add('c')
let els = document.querySelectorAll('div')
// 这些类型都实现了迭代器工厂函数
console.log(str[Symbol.iterator]) // f values() { [native code] }
console.log(arr[Symbol.iterator]) // f values() { [native code] }
console.log(map[Symbol.iterator]) // f values() { [native code] }
console.log(set[Symbol.iterator]) // f values() { [native code] }
console.log(els[Symbol.iterator]) // f values() { [native code] }

// 调用这个工厂函数会生成一个迭代器
console.log(str[Symbol.iterator]()) // StringIterator {}
console.log(arr[Symbol.iterator]()) // ArrayIterator {}
console.log(map[Symbol.iterator]()) // MapIterator {}
console.log(set[Symbol.iterator]()) // SetIterator {}
console.log(els[Symbol.iterator]()) // ArrayIterator {}
```

实际写代码过程中，不需要显式调用这个工厂函数来生成迭代器。实现可迭代协议的所有类型都会自动兼容接收可迭代对象的任何语言特性。接收可迭代对象的原生语言特性包括：

- for-of 循环
- 数组解构
- 扩展操作符
- Array.from()
- 创建集合
- 创建映射
- Promise.all()接收由期约组成的可迭代对象
- Promise.race()接收由期约组成的可迭代对象
- yield\*操作符，在生成器中使用

这些原生语言结构会在后台调用提供的可迭代对象的这个工厂函数，从而创建一个迭代器：

```js
let arr = ['foo', 'bar', 'baz']

// for-of 循环
for (let el of arr) {
  console.log(el)
}
// foo
// bar
// baz

let [a, b, c] = arr
console.log(a, b, c) // foo, bar, baz

// 扩展操作符
let arr2 = [...arr]
console.log(arr2) // ['foo', 'bar', 'baz']

// Array.from()
let arr3 = Array.from(arr)
console.log(arr3) // ['foo', 'bar', 'baz']

// Set 构造函数
let set = new Set(arr)
console.log(set) // Set(3) {'foo', 'bar', 'baz'}

// Map 构造函数
let pairs = arr.map((x, i) => [x, i])
console.log(pairs) // [['foo', 0], ['bar', 1], ['baz', 2]]
let map = new Map(pairs)
console.log(map) // Map(3) { 'foo'=>0, 'bar'=>1, 'baz'=>2 }
```

如果对象原型链上的父类实现了 Iterable 接口，那这个对象也就实现了这个接口：

```js
let fooArr = new FooArray('foo', 'bar', 'baz')
for (let el of fooArr) {
  console.log(el)
}
// foo
// bar
// baz
```

### 7.2.2 迭代器协议

迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器 API 使用 next()方法在可迭代对象中遍历数据。每次成功调用 next()，都会返回一个 IteratorResult 对象，其中包含迭代器返回的下一个值。若不调用 next()，则无法知道迭代器的当前位置。  
next()方法返回的迭代器对象 IteratorResult 包含两个属性：done 和 value。done 是一个布尔值，表示是否还可以再次调用 next()取得下一个值；value 包含可迭代对象的下一个值（done 为 false），或者 undefined（done 为 true）。done: true 状态称为“耗尽”。可以通过以下简单的数
组来演示：

```js
// 可迭代对象
let arr = ['foo', 'bar']

// 迭代器工厂函数
console.log(arr[Symbol.iterator]) // f values() { [native code] }

// 迭代器
let iter = arr[Symbol.iterator]()
console.log(iter) // ArrayIterator {}

// 执行迭代
console.log(iter.next()) // { done: false, value: 'foo' }
console.log(iter.next()) // { done: false, value: 'bar' }
console.log(iter.next()) // { done: true, value: undefined }

// 这里通过创建迭代器并调用 next()方法按顺序迭代了数组，直至不再产生新值。迭代器并不知道怎么从可迭代对象中取得下一个值，也不知道可迭代对象有多大。只要迭代器到达 done: true 状态，后续调用 next()就一直返回同样的值了：
let arr = ['foo']
let iter = arr[Symbol.iterator]()
console.log(iter.next()) // { done: false, value: 'foo' }
console.log(iter.next()) // { done: true, value: undefined }
console.log(iter.next()) // { done: true, value: undefined }
console.log(iter.next()) // { done: true, value: undefined }
```

### 7.2.3 自定义迭代器

### 7.2.4 提前终止迭代器

可选的 return()方法用于指定在迭代器提前关闭时执行的逻辑。执行迭代的结构在想让迭代器知道它不想遍历到可迭代对象耗尽时，就可以“关闭”迭代器。可能的情况包括：

- for-of 循环通过 break、continue、return 或 throw 提前退出；
- 解构操作并未消费所有值。

## 7.3 生成器

生成器是 ECMAScript 6 新增的一个极为灵活的结构，拥有在一个函数块内暂停和恢复代码执行的能力。这种新能力具有深远的影响，比如，使用生成器可以自定义迭代器和实现协程。

### 7.3.1 生成器基础

生成器的形式是一个函数，函数名称前面加一个星号（\*）表示它是一个生成器。只要是可以定义函数的地方，就可以定义生成器。

```js
// 生成器函数声明
function* generatorFn() {}

// 生成器函数表达式
let generatorFn = function* () {}

// 作为对象字面量方法的生成器函数
let foo = {
  *generatorFn() {}
}

// 作为类实例方法的生成器函数
class Foo {
  *generatorFn() {}
}

// 作为类静态方法的生成器函数
class Bar {
  static *generatorFn() {}
}
```

:::warning 注意
箭头函数不能用来定义生成器函数。
:::

标识生成器函数的星号不受两侧空格的影响：

```js
// 等价的生成器函数：
function* generatorFnA() {}
function* generatorFnB() {}
function* generatorFnC() {}

// 等价的生成器方法：
class Foo {
  *generatorFnD() {}
  *generatorFnE() {}
}
```

调用生成器函数会产生一个**生成器对象**。生成器对象一开始处于暂停执行（suspended）的状态。与
迭代器相似，生成器对象也实现了 Iterator 接口，因此具有 next()方法。调用这个方法会让生成器
开始或恢复执行。

```js
function* generatorFn() {}

const g = generatorFn()

console.log(g) // generatorFn {<suspended>}
console.log(g.next) // f next() { [native code] }
```

next()方法的返回值类似于迭代器，有一个 done 属性和一个 value 属性。函数体为空的生成器
函数中间不会停留，调用一次 next()就会让生成器到达 done: true 状态。

```js
function* generatorFn() {}
let generatorObject = generatorFn()
console.log(generatorObject) // generatorFn {<suspended>}
console.log(generatorObject.next()) // { done: true, value: undefined }
```

value 属性是生成器函数的返回值，默认值为 undefined，可以通过生成器函数的返回值指定：

```js
function* generatorFn() {
  return 'foo'
}

let generatorObject = generatorFn()

console.log(generatorObject) // generatorFn {<suspended>}
console.log(generatorObject.next()) // { done: true, value: 'foo' }
```

生成器函数只会在初次调用 next()方法后开始执行，如下所示：

```js
function* generatorFn() {
  console.log('foobar')
}
// 初次调用生成器函数并不会打印日志
let generatorObject = generatorFn()
generatorObject.next() // foobar
```

生成器对象实现了 Iterable 接口，它们默认的迭代器是自引用的：

```js
function* generatorFn() {}

console.log(generatorFn)
// f* generatorFn() {}
console.log(generatorFn()[Symbol.iterator])
// f [Symbol.iterator]() {native code}
console.log(generatorFn())
// generatorFn {<suspended>}
console.log(generatorFn()[Symbol.iterator]())
// generatorFn {<suspended>}

// 重要
const g = generatorFn()
console.log(g === g[Symbol.iterator]())
// true
```

### 7.3.2 通过 yield 中断执行

yield 关键字可以让生成器停止和开始执行，也是生成器最有用的地方。生成器函数在遇到 yield 关键字之前会正常执行。遇到这个关键字后，执行会停止，函数作用域的状态会被保留。停止执行的生成器函数只能通过在生成器对象上调用 next()方法来恢复执行：

```js
function* generatorFn() {
  yield
}
let generatorObject = generatorFn()
console.log(generatorObject.next()) // { done: false, value: undefined }
console.log(generatorObject.next()) // { done: true, value: undefined }
```

此时的 yield 关键字有点像函数的中间返回语句，它生成的值会出现在 next()方法返回的对象里。通过 yield 关键字退出的生成器函数会处在 done: false 状态；通过 return 关键字退出的生成器函数会处于 done: true 状态。

```js
function* generatorFn() {
  yield 'foo'
  yield 'bar'
  return 'baz'
}
let generatorObject = generatorFn()
console.log(generatorObject.next()) // { done: false, value: 'foo' }
console.log(generatorObject.next()) // { done: false, value: 'bar' }
console.log(generatorObject.next()) // { done: true, value: 'baz' }
```

生成器函数内部的执行流程会针对每个生成器对象区分作用域。在一个生成器对象上调用 next()不会影响其他生成器：

```js
function* generatorFn() {
  yield 'foo'
  yield 'bar'
  return 'baz'
}
let generatorObject1 = generatorFn()
let generatorObject2 = generatorFn()
console.log(generatorObject1.next()) // { done: false, value: 'foo' }
console.log(generatorObject2.next()) // { done: false, value: 'foo' }
console.log(generatorObject2.next()) // { done: false, value: 'bar' }
console.log(generatorObject1.next()) // { done: false, value: 'bar' }
```

yield 关键字只能在生成器函数内部使用，用在其他地方会抛出错误。类似函数的 return 关键字，yield 关键字必须直接位于生成器函数定义中，出现在嵌套的非生成器函数中会抛出语法错误：

```js
// 有效
function* validGeneratorFn() {
  yield
}
// 无效
function* invalidGeneratorFnA() {
  function a() {
    yield
  }
}
// 无效
function* invalidGeneratorFnB() {
  const b = () => {
    yield
  }
}
// 无效
function* invalidGeneratorFnC() {
  ;(() => {
    yield
  })()
}
```

### 7.3.4 提前终止生成器

与迭代器类似，生成器也支持“可关闭”的概念。一个实现 Iterator 接口的对象一定有 next()方法，还有一个可选的 return()方法用于提前终止迭代器。生成器对象除了有这两个方法，还有第三个方法：throw()。

```js
function* generatorFn() {}
const g = generatorFn()
console.log(g) // generatorFn {<suspended>}
console.log(g.next) // f next() { [native code] }
console.log(g.return) // f return() { [native code] }
console.log(g.throw) // f throw() { [native code] }
```

return()和 throw()方法都可以用于强制生成器进入关闭状态。

#### 1. return()

return()方法会强制生成器进入关闭状态。提供给 return()方法的值，就是终止迭代器对象的值：

```js
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x
  }
}
const g = generatorFn()
console.log(g) // generatorFn {<suspended>}
console.log(g.return(4)) // { done: true, value: 4 }
console.log(g) // generatorFn {<closed>}
```

与迭代器不同，所有生成器对象都有 return()方法，只要通过它进入关闭状态，就无法恢复了。后续调用 next()会显示 done: true 状态，而提供的任何返回值都不会被存储或传播：

```js
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x
  }
}
const g = generatorFn()
console.log(g.next()) // { done: false, value: 1 }
console.log(g.return(4)) // { done: true, value: 4 }
console.log(g.next()) // { done: true, value: undefined }
console.log(g.next()) // { done: true, value: undefined }
console.log(g.next()) // { done: true, value: undefined }
```

for-of 循环等内置语言结构会忽略状态为 done: true 的 IteratorObject 内部返回的值。

```js
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x
  }
}
const g = generatorFn()
for (const x of g) {
  if (x > 1) {
    g.return(4)
  }
  console.log(x)
}
// 1
// 2
```

#### 2. throw()

throw()方法会在暂停的时候将一个提供的错误注入到生成器对象中。如果错误未被处理，生成器就会关闭：

```js
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x
  }
}

const g = generatorFn()
console.log(g) // generatorFn {<suspended>}
try {
  g.throw('foo')
} catch (e) {
  console.log(e) // foo
}
console.log(g) // generatorFn {<closed>}
```

不过，假如生成器函数内部处理了这个错误，那么生成器就不会关闭，而且还可以恢复执行。错误处理会跳过对应的 yield，因此在这个例子中会跳过一个值。比如：

```js
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    try {
      yield x
    } catch (e) {}
  }
}
const g = generatorFn()
console.log(g.next()) // { done: false, value: 1}
g.throw('foo')
console.log(g.next()) // { done: false, value: 3}
```

在这个例子中，生成器在 try/catch 块中的 yield 关键字处暂停执行。在暂停期间，throw()方法向生成器对象内部注入了一个错误：字符串"foo"。这个错误会被 yield 关键字抛出。因为错误是在生成器的 try/catch 块中抛出的，所以仍然在生成器内部被捕获。可是，由于 yield 抛出了那个错误，生成器就不会再产出值 2。此时，生成器函数继续执行，在下一次迭代再次遇到 yield 关键字时产出了值 3。

:::warning 注意
如果生成器对象还没有开始执行，那么调用 throw()抛出的错误不会在函数内部被捕获，因为这相当于在函数块外部抛出了错误。
:::

## 7.4 小结

迭代是一种所有编程语言中都可以看到的模式。ECMAScript 6 正式支持迭代模式并引入了两个新的语言特性：迭代器和生成器。

迭代器是一个可以由任意对象实现的接口，支持连续获取对象产出的每一个值。任何实现 Iterable 接口的对象都有一个 Symbol.iterator 属性，这个属性引用默认迭代器。默认迭代器就像一个迭代器工厂，也就是一个函数，调用之后会产生一个实现 Iterator 接口的对象。

迭代器必须通过连续调用 next()方法才能连续取得值，这个方法返回一个 IteratorObject。这个对象包含一个 done 属性和一个 value 属性。前者是一个布尔值，表示是否还有更多值可以访问；后者包含迭代器返回的当前值。这个接口可以通过手动反复调用 next()方法来消费，也可以通过原生消费者，比如 for-of 循环来自动消费。

生成器是一种特殊的函数，调用之后会返回一个生成器对象。生成器对象实现了 Iterable 接口，因此可用在任何消费可迭代对象的地方。生成器的独特之处在于支持 yield 关键字，这个关键字能够暂停执行生成器函数。使用 yield 关键字还可以通过 next()方法接收输入和产生输出。在加上星号之后，yield 关键字可以将跟在它后面的可迭代对象序列化为一连串值。
