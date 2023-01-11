# 第 4 章 变量、作用域与内存

## 4.1 原始值与引用值

ECMAScript 变量可以包含两种不同类型的数据：

- **原始值**（primitive value）就是最简单的数据。变量是**按值**访问的
- **引用值**（reference value）则是由多个值构成的对象。变量是**按引用**访问的

### 4.1.1 动态属性(存储方式不同)

原始值不能有属性，尽管尝试给原始值添加属性不会报错.  
引用值，可以随时添加、修改和删除其属性和方法

```js
// 引用值
let person = new Object()
person.name = 'Nicholas'
console.log(person.name) // "Nicholas"

// 原始值
let name = 'Nicholas'
name.age = 27
console.log(name.age) // undefined

// 原始类型使用 new 关键字
//  JavaScript 会创建一个 Object 类型的实例，但其行为类似原始值
let name1 = 'Nicholas'
let name2 = new String('Matt')
name1.age = 27
name2.age = 26
console.log(name1.age) // undefined
console.log(name2.age) // 26
console.log(typeof name1) // string
console.log(typeof name2) // object
```

### 4.1.2 复制值(复制不用)

原始值赋值到另一个变量时，这两个变量可以独立使用，互不干扰  
引用值从一个变量赋给另一个变量时，区别在于，这里复制的值实际上是一个指针，它指向存储在堆内存中的对象。

### 4.1.3 传递参数

ECMAScript 中所有函数的参数都是按值传递的。

```js
// 变量中传递的是原始值
function addTen(num) {
  num += 10
  return num
}
let count = 20
let result = addTen(count)
console.log(count) // 20，没有变化
console.log(result) // 30

// 变量中传递的是对象
function setName(obj) {
  obj.name = 'Nicholas'
}
let person = new Object()
setName(person)
console.log(person.name) // "Nicholas"
// 即使对象是按值传进函数的，obj 也会通过引用访问对象。当函数内部给 obj 设置了 name 属性时，函数外部的对象也会反映这个变化，因为 obj 指向的对象保存在全局作用域的堆内存上。

// 很多开发者错误地认为，当在局部作用域中修改对象而变化反映到全局时，就意味着参数是按引用传递的。
function setName(obj) {
  obj.name = 'Nicholas'
  obj = new Object()
  obj.name = 'Greg'
}
let person = new Object()
setName(person)
console.log(person.name) // "Nicholas"
// 如果 person 是按引用传递的，那么 person 应该自动将指针改为指向 name 为"Greg"的对象。可是，当我们再次访问 person.name 时，它的值是"Nicholas"，这表明函数中参数的值改变之后，原始的引用仍然没变。当 obj 在函数内部被重写时，它变成了一个指向本地对象的指针。而那个本地对象在函数执行结束时就被销毁了。
```

:::warning 注意
ECMAScript 中函数的参数就是局部变量。
:::

### 4.1.4 确定类型

typeof 对原始值很有用，对引用值的用处不大,通常不关心一个值是不是对象，而是想知道它是什么类型的对象
instanceof 操作符

---

#### typeof

typeof 是判断一个变量是否为字符串、数值、布尔值或 undefined 的最好方式。

如果值是对象或 null，那么 typeof 返回"object"，如下面的例子所示：

```js
let s = 'Nicholas'
let b = true
let i = 22
let u
let n = null
let o = new Object()
console.log(typeof s) // string
console.log(typeof i) // number
console.log(typeof b) // boolean
console.log(typeof u) // undefined
console.log(typeof n) // object
console.log(typeof o) // object
```

---

typeof 虽然对原始值很有用，但它对引用值的用处不大。  
们通常不关心一个值是不是对象，而是想知道它是什么类型的对象。
为了解决这个问题，ECMAScript 提供了 instanceof 操作符  
语法如下：

```js
result = variable instanceof constructor
```

如果变量是给定引用类型（由其原型链决定，将在第 8 章详细介绍）的实例，则 instanceof 操作符返回 true。来看下面的例子：

```js
console.log(person instanceof Object) // 变量 person 是 Object 吗？
console.log(colors instanceof Array) // 变量 colors 是 Array 吗？
console.log(pattern instanceof RegExp) // 变量 pattern 是 RegExp 吗？
```

按照定义，所有引用值都是 Object 的实例，因此通过 instanceof 操作符检测任何引用值和 Object 构造函数都会返回 true。类似地，如果用 instanceof 检测原始值，则始终会返回 false，因为原始值不是对象。

:::warning 注意
typeof 操作符在用于检测函数时也会返回"function"。当在 Safari（直到 Safari 5） 和 Chrome（直到 Chrome 7）中用于检测正则表达式时，由于实现细节的原因，typeof 也会返回"function"。ECMA-262 规定，任何实现内部[[Call]]方法的对象都应该在 typeof 检测时返回"function"。因为上述浏览器中的正则表达式实现了这个方法，所以 typeof 对正则表达式也返回"function"。在 IE 和 Firefox 中，typeof 对正则表达式返回"object
:::

## 4.2 执行上下文与作用域

执行上下文主要有全局上下文和函数上下文两种（eval()调用内部存在第三种上下文），

变量或函数的上下文决定了它们可以访问哪些数据，以及它们的行为。  
每个上下文都有一个关联的**变量对象**（variable object），而这个上下文中定义的所有变量和函数都存在于这个对象上。虽然无法通过代码访问变量对象，但后台处理数据会用到它。

全局上下文是最外层的上下文。根据 ECMAScript 实现的宿主环境，表示全局上下文的对象可能不一样。在浏览器中，全局上下文就是我们常说的 window 对象（第 12 章会详细介绍），因此所有通过 var 定义的全局变量和函数都会成为 window 对象的属性和方法。

上下文中的代码在执行的时候，会创建变量对象的一个**作用域链**（scope chain）。这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序。代码正在执行的上下文的变量对象始终位于作用域链的最前端。如果上下文是函数，则其**活动对象**（activation object）用作变量对象。活动对象最初只有一个定义变量：arguments。（全局上下文中没有这个变量。）作用域链中的下一个变量对象来自包含上下文，再下一个对象来自再下一个包含上下文。以此类推直至全局上下文；全局上下文的变量对象始终是作用域链的最后一个变量对象。

:::warning 注意
函数参数被认为是当前上下文中的变量，因此也跟上下文中的其他变量遵循相同的访问规则。
:::

#### 4.2.1 作用域链增强

有其他方式来增强作用域链

- try/catch 语句的 catch 块 [IE9 纠正了这个问题]
- with 语句

```js
function buildUrl() {
  let qs = '?debug=true'
  with (location) {
    let url = href + qs
  }
  return url
}
```

with 语句将 location 对象作为上下文，因此 location 会被添加到作用域链前端。

### 4.2.2 变量声明

#### 1. 使用 var 的函数作用域声明

```js
var name = 'Jake'
// 等价于：
name = 'Jake'
var name

//下面是两个等价的函数：
function fn1() {
  var name = 'Jake'
}
// 等价于：
function fn2() {
  var name
  name = 'Jake'
}
```

#### 2. 使用 let 的块级作用域声明

块级作用域由最近的一对包含花括号{}界定。换句话说，if 块、while 块、function 块，甚至连单独
的块也是 let 声明变量的作用域。

let 与 var 的另一个不同之处是在同一作用域内不能声明两次。重复的 var 声明会被忽略，而重
复的 let 声明会抛出 SyntaxError

let 的行为非常适合在循环中声明迭代变量。使用 var 声明的迭代变量会泄漏到循环外部，这种情
况应该避免。来看下面两个例子：

```js
for (var i = 0; i < 10; ++i) {}
console.log(i) // 10
for (let j = 0; j < 10; ++j) {}
console.log(j) // ReferenceError: j 没有定义
```

严格来讲，let 在 JavaScript 运行时中也会被提升，但由于“暂时性死区”（temporal dead zone）的
缘故，实际上不能在声明之前使用 let 变量。因此，从写 JavaScript 代码的角度说，let 的提升跟 var
是不一样的

#### 3. 使用 const 的常量声明

使用 const 声明的变量必须同时初始化为某个值。一经声明，在其生命周期的任何时候都不能再重新赋予新值。

```js
const a // SyntaxError: 常量声明时没有初始化

const b = 3
console.log(b) // 3
b = 4 // TypeError: 给常量赋值
```

---

const 声明只应用到顶级原语或者对象。换句话说，赋值为对象的 const 变量不能再被重新赋值为其他引用值，但对象的键则不受限制

```js
const o1 = {}
o1 = {} // TypeError: 给常量赋值

const o2 = {}
o2.name = 'Jake'
console.log(o2.name) // 'Jake'
```

如果想让整个对象都不能修改，可以使用 Object.freeze()，这样再给属性赋值时虽然不会报错，但会静默失败：

```js
const o3 = Object.freeze({})
o3.name = 'Jake'
console.log(o3.name) // undefined
```

::: warning 注意
开发实践表明，如果开发流程并不会因此而受很大影响，就应该尽可能地多使用
const 声明，除非确实需要一个将来会重新赋值的变量。这样可以从根本上保证提前发现
重新赋值导致的 bug。
:::

#### 4. 标识符查找

搜索开始于作用域链前端，以给定的名称搜索对应的标识符。如果在局部上下文中找到该标识符，则搜索停止，变量确定；如果没有找到变量名，则继续沿作用域链搜索。（注意，作用域链中的对象也有一个原型链，因此搜索可能涉及每个对象的原型链。）这个过程一直持续到搜索至全局上下文的变量对象。如果仍然没有找到标识符，则说明其未声明。

## 4.3 垃圾回收

JavaScript 是使用垃圾回收的语言，也就是说执行环境负责在代码执行时管理内存。在 C 和 C++等语言中，跟踪内存使用对开发者来说是个很大的负担，也是很多问题的来源。JavaScript 为开发者卸下了这个负担，通过自动内存管理实现内存分配和闲置资源回收。基本思路很简单：确定哪个变量不会再使用，然后释放它占用的内存。这个过程是周期性的，即垃圾回收程序每隔一定时间（或者说在代码执行过程中某个预定的收集时间）就会自动运行。垃圾回收过程是一个近似且不完美的方案，因为某块内存是否还有用，属于“不可判定的”问题，意味着靠算法是解决不了的。
我们以函数中局部变量的正常生命周期为例。函数中的局部变量会在函数执行时存在。此时，栈（或堆）内存会分配空间以保存相应的值。函数在内部使用了变量，然后退出。此时，就不再需要那个局部变量了，它占用的内存可以释放，供后面使用。这种情况下显然不再需要局部变量了，但并不是所有时候都会这么明显。垃圾回收程序必须跟踪记录哪个变量还会使用，以及哪个变量不会再使用，以便回收内存。如何标记未使用的变量也许有不同的实现方式。不过，在浏览器的发展史上，用到过两种主要的标记策略：标记清理和引用计数。

### 4.3.1 标记清理

JavaScript 最常用的垃圾回收策略是**标记清理**（mark-and-sweep）。当变量进入上下文，比如在函数内部声明一个变量时，这个变量会被加上存在于上下文中的标记。而在上下文中的变量，逻辑上讲，永远不应该释放它们的内存，因为只要上下文中的代码在运行，就有可能用到它们。当变量离开上下文时，也会被加上离开上下文的标记。  
给变量加标记的方式有很多种。比如，当变量进入上下文时，反转某一位；或者可以维护“在上下文中”和“不在上下文中”两个变量列表，可以把变量从一个列表转移到另一个列表。标记过程的实现并不重要，关键是策略。  
垃圾回收程序运行的时候，会标记内存中存储的所有变量（记住，标记方法有很多种）。然后，它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉。在此之后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了。随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回它们的内存。  
到了 2008 年，IE、Firefox、Opera、Chrome 和 Safari 都在自己的 JavaScript 实现中采用标记清理（或
其变体），只是在运行垃圾回收的频率上有所差异。

### 4.3.2 引用计数(已废弃)

另一种没那么常用的垃圾回收策略是**引用计数**（reference counting）。其思路是对每个值都记录它被引用的次数。声明变量并给它赋一个引用值时，这个值的引用数为 1。如果同一个值又被赋给另一个变量，那么引用数加 1。类似地，如果保存对该值引用的变量被其他值给覆盖了，那么引用数减 1。当一个值的引用数为 0 时，就说明没办法再访问到这个值了，因此可以安全地收回其内存了。垃圾回收程序下次运行的时候就会释放引用数为 0 的值的内存。  
引用计数最早由 Netscape Navigator 3.0 采用，但很快就遇到了严重的问题：循环引用。所谓循环引用，就是对象 A 有一个指针指向对象 B，而对象 B 也引用了对象 A。比如：

```js
function problem() {
  let objectA = new Object()
  let objectB = new Object()
  objectA.someOtherObject = objectB
  objectB.anotherObject = objectA
}
```

在这个例子中，objectA 和 objectB 通过各自的属性相互引用，意味着它们的引用数都是 2。在标记清理策略下，这不是问题，因为在函数结束后，这两个对象都不在作用域中。而在引用计数策略下，objectA 和 objectB 在函数结还会存在，因为它们的引用数永远不会变成 0。如果函数被多次调用，则会导致大量内存永远不会被释放。为此，Netscape 在 4.0 版放弃了引用计数，转而采用标记清理。事实上，引用计数策略的问题还不止于此。

IE8 及更早版本的 IE 中，并非所有对象都是原生 JavaScript 对象。BOM 和 DOM 中的对象是 C++实现的组件对象模型（COM，Component Object Model）对象，而 COM 对象使用引用计数实现垃圾回收。因此，即使这些版本 IE 的 JavaScript 引擎使用标记清理，JavaScript 存取的 COM 对象依旧使用引用计数。换句话说，只要涉及 COM 对象，就无法避开循环引用问题。下面这个简单的例子展示了涉及 COM 对象的循环引用问题：

```js
let element = document.getElementById('some_element')
let myObject = new Object()
myObject.element = element
element.someObject = myObject
```

这个例子在一个 DOM 对象（element）和一个原生 JavaScript 对象（myObject）之间制造了循环引用。myObject 变量有一个名为 element 的属性指向 DOM 对象 element，而 element 对象有一个 someObject 属性指回 myObject 对象。由于存在循环引用，因此 DOM 元素的内存永远不会被回收，即使它已经被从页面上删除了也是如此。

为避免类似的循环引用问题，应该在确保不使用的情况下切断原生 JavaScript 对象与 DOM 元素之间的连接。比如，通过以下代码可以清除前面的例子中建立的循环引用：

```js
myObject.element = null
element.someObject = null
```

把变量设置为 null 实际上会切断变量与其之前引用值之间的关系。当下次垃圾回收程序运行时，这些值就会被删除，内存也会被回收。

为了补救这一点，IE9 把 BOM 和 DOM 对象都改成了 JavaScript 对象，这同时也避免了由于存在两套垃圾回收算法而导致的问题，还消除了常见的内存泄漏现象。

### 4.3.3 性能

垃圾回收程序会周期性运行，如果内存中分配了很多变量，则可能造成性能损失，因此垃圾回收的时间调度很重要。尤其是在内存有限的移动设备上，垃圾回收有可能会明显拖慢渲染的速度和帧速率。开发者不知道什么时候运行时会收集垃圾，因此最好的办法是在写代码时就要做到：无论什么时候开始收集垃圾，都能让它尽快结束工作。

现代垃圾回收程序会基于对 JavaScript 运行时环境的探测来决定何时运行。探测机制因引擎而异，但基本上都是根据已分配对象的大小和数量来判断的。比如，根据 V8 团队 2016 年的一篇博文的说法：“在一次完整的垃圾回收之后，V8 的堆增长策略会根据活跃对象的数量外加一些余量来确定何时再次垃圾回收。”

由于调度垃圾回收程序方面的问题会导致性能下降，IE 曾饱受诟病。它的策略是根据分配数，比如分配了 256 个变量、4096 个对象/数组字面量和数组槽位（slot），或者 64KB 字符串。只要满足其中某个条件，垃圾回收程序就会运行。这样实现的问题在于，分配那么多变量的脚本，很可能在其整个生命周期内始终需要那么多变量，结果就会导致垃圾回收程序过于频繁地运行。由于对性能的严重影响，IE7 最终更新了垃圾回收程序。

IE7 发布后，JavaScript 引擎的垃圾回收程序被调优为动态改变分配变量、字面量或数组槽位等会触发垃圾回收的阈值。IE7 的起始阈值都与 IE6 的相同。如果垃圾回收程序回收的内存不到已分配的 15%，这些变量、字面量或数组槽位的阈值就会翻倍。如果有一次回收的内存达到已分配的 85%，则阈值重置为默认值。这么一个简单的修改，极大地提升了重度依赖 JavaScript 的网页在浏览器中的性能。

:::danger 警告
在某些浏览器中是有可能（但不推荐）主动触发垃圾回收的。在 IE 中，window.CollectGarbage()方法会立即触发垃圾回收。在 Opera 7 及更高版本中，调用 window.opera.collect()也会启动垃圾回收程序。
:::

### 4.3.4 内存管理
