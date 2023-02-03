# 第 8 章 对象、类与面向对象编程

## 8.1 理解对象

创建自定义对象

::: details 点击查看代码

```js
let person = {
  name: 'Nicholas',
  age: 29,
  job: 'Software Engineer',
  sayName() {
    console.log(this.name)
  }
}
```

:::

### 8.1.1 属性的类型

ECMA-262 使用一些内部特性来描述属性的特征。这些特性是由为 JavaScript 实现引擎的规范定义的。因此，开发者不能在 JavaScript 中直接访问这些特性。为了将某个特性标识为内部特性，规范用两个中括号把特性的名称括起来，比如[[Enumerable]]。  
属性分两种：数据属性和访问器属性。

#### 1. 数据属性

数据属性包含一个保存数据值的位置。值会从这个位置读取，也会写入到这个位置。数据属性有 4 个特性描述它们的行为。

- [[Configurable]]：表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性。默认情况下，所有直接定义在对象上的属性的这个特性都是 true，如前面的例子所示。
- [[Enumerable]]：表示属性是否可以通过 for-in 循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是 true，如前面的例子所示。
- [[Writable]]：表示属性的值是否可以被修改。默认情况下，所有直接定义在对象上的属性的这个特性都是 true，如前面的例子所示。
- [[Value]]：包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性的默认值为 undefined。

初始化 [[Configurable]]、[[Enumerable]]和[[Writable]]都会被设置为 true，而[[Value]]特性会被设置为指定的值。

::: details 点击查看代码

```js
// 创建了一个名为 name 的属性并给它赋予了一个只读的值"Nicholas"。这个属性的值就不能再修改了
// 在非严格模式下尝试给这个属性重新赋值会被忽略。
// 在严格模式下，尝试修改只读属性的值会抛出错误。
let person = {}
Object.defineProperty(person, 'name', {
  writable: false,
  value: 'Nicholas'
})
console.log(person.name) // "Nicholas"
person.name = 'Greg'
console.log(person.name) // "Nicholas"

// 创建不可配置的属性
// 非严格模式下这个属性调用 delete 没有效果
// 严格模式下会抛出错误
let person = {}
Object.defineProperty(person, 'name', {
  configurable: false,
  value: 'Nicholas'
})
console.log(person.name) // "Nicholas"
delete person.name
console.log(person.name) // "Nicholas"

// 一个属性被定义为不可配置之后，就不能再变回可配置的了
// 再次调用 Object.defineProperty()并修改任何非 writable 属性会导致错误：
let person = {}
Object.defineProperty(person, 'name', {
  configurable: false,
  value: 'Nicholas'
})
// 抛出错误
Object.defineProperty(person, 'name', {
  configurable: true,
  value: 'Nicholas'
})
```

虽然可以对同一个属性多次调用 Object.defineProperty()，但在把 configurable 设置为 false 之后就会受限制了

在调用 Object.defineProperty()时，configurable、enumerable 和 writable 的值如果不指定，则都默认为 false

:::

#### 2. 访问器属性

访问器属性不包含数据值。相反，它们包含一个获取（getter）函数和一个设置（setter）函数，不过这两个函数不是必需的。在读取访问器属性时，会调用获取函数，这个函数的责任就是返回一个有效的值。在写入访问器属性时，会调用设置函数并传入新值，这个函数必须决定对数据做出什么修改。访问器属性有 4 个特性描述它们的行为。

- [[Configurable]]：表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特性，以及是否可以把它改为数据属性。默认情况下，所有直接定义在对象上的属性的这个特性都是 true。
- [[Enumerable]]：表示属性是否可以通过 for-in 循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是 true。
- [[Get]]：获取函数，在读取属性时调用。默认值为 undefined。
- [[Set]]：设置函数，在写入属性时调用。默认值为 undefined。

访问器属性是不能直接定义的，必须使用 Object.defineProperty()。下面是一个例子：

::: details 点击查看代码
在这个例子中，对象 book 有两个默认属性：year\_ 和 edition。year\_ 中的下划线常用来表示该属性并不希望在对象方法的外部被访问。另一个属性 year 被定义为一个访问器属性，其中获取函数简
单地返回 year\_ 的值，而设置函数会做一些计算以决定正确的版本（edition）。因此，把 year 属性修改为 2018 会导致 year\_ 变成 2018，edition 变成 2。这是访问器属性的典型使用场景，即设置一个属性值会导致一些其他变化发生。

```js
// 定义一个对象，包含伪私有成员 year_和公共成员 edition
let book = {
  year_: 2017,
  edition: 1
}

Object.defineProperty(book, 'year', {
  get() {
    return this.year_
  },
  set(newValue) {
    if (newValue > 2017) {
      this.year_ = newValue
      this.edition += newValue - 2017
    }
  }
})
book.year = 2018
console.log(book.edition) // 2
```

获取函数和设置函数不一定都要定义。只定义获取函数意味着属性是只读的，尝试修改属性会被忽略。在严格模式下，尝试写入只定义了获取函数的属性会抛出错误。类似地，只有一个设置函数的属性是不能读取的，非严格模式下读取会返回 undefined，严格模式下会抛出错误。

在不支持 Object.defineProperty()的浏览器中没有办法修改[[Configurable]]或[[Enumerable]]。

:::

### 8.1.2 定义多个属性

在一个对象上同时定义多个属性的可能性是非常大的。为此，ECMAScript 提供了 Object.defineProperties()方法。这个方法可以通过多个描述符一次性定义多个属性。它接收两个参数：要为之添加或修改属性的对象和另一个描述符对象，其属性与要添加或修改的属性一一对应。比如：

::: details 点击查看代码

这段代码在 book 对象上定义了两个数据属性 year\_和 edition，还有一个访问器属性 year。最终的对象跟上一节示例中的一样。唯一的区别是所有属性都是同时定义的，并且数据属性的 configurable、enumerable 和 writable 特性值都是 false。

```js
let book = {}
Object.defineProperties(book, {
  year_: {
    value: 2017
  },
  edition: {
    value: 1
  },
  year: {
    get() {
      return this.year_
    },
    set(newValue) {
      if (newValue > 2017) {
        this.year_ = newValue
        this.edition += newValue - 2017
      }
    }
  }
})
```

:::

### 8.1.3 读取属性的特性

使用 Object.getOwnPropertyDescriptor()方法可以取得指定属性的属性描述符。这个方法接收两个参数：属性所在的对象和要取得其描述符的属性名。返回值是一个对象，对于访问器属性包含 configurable、enumerable、get 和 set 属性，对于数据属性包含 configurable、enumerable、writable 和 value 属性。比如：

::: details 点击查看代码
对于数据属性 year\_，value 等于原来的值，configurable 是 false，get 是 undefined。对于访问器属性 year，value 是 undefined，enumerable 是 false，get 是一个指向获取函数的指针。

```js
let book = {}
Object.defineProperties(book, {
  year_: {
    value: 2017
  },
  edition: {
    value: 1
  },
  year: {
    get: function () {
      return this.year_
    },
    set: function (newValue) {
      if (newValue > 2017) {
        this.year_ = newValue
        this.edition += newValue - 2017
      }
    }
  }
})

let descriptor = Object.getOwnPropertyDescriptor(book, 'year_')
console.log(descriptor.value) // 2017
console.log(descriptor.configurable) // false
console.log(typeof descriptor.get) // "undefined"
let descriptor = Object.getOwnPropertyDescriptor(book, 'year')
console.log(descriptor.value) // undefined
console.log(descriptor.enumerable) // false
console.log(typeof descriptor.get) // "function"
```

:::

ECMAScript 2017 新增了 Object.getOwnPropertyDescriptors()静态方法。这个方法实际上会在每个自有属性上调用 Object.getOwnPropertyDescriptor()并在一个新对象中返回它们。对于前面的例子，使用这个静态方法会返回如下对象：

::: details 点击查看代码

```js
let book = {}
Object.defineProperties(book, {
  year_: {
    value: 2017
  },
  edition: {
    value: 1
  },
  year: {
    get: function () {
      return this.year_
    },
    set: function (newValue) {
      if (newValue > 2017) {
        this.year_ = newValue
        this.edition += newValue - 2017
      }
    }
  }
})

console.log(Object.getOwnPropertyDescriptors(book))
// {
// edition: {
// configurable: false,
// enumerable: false,
// value: 1,
// writable: false
// },
// year: {
// configurable: false,
// enumerable: false,
// get: f(),
// set: f(newValue),
// },
// year_: {
// configurable: false,
// enumerable: false,
// value: 2017,
// writable: false
// }
// }
```

:::

### 8.1.4 合并对象

源对象所有的本地属性一起复制到目标对象上。  
ECMAScript 6 专门为合并对象提供了 **Object.assign()** 方法。  
这个方法接收一个目标对象和一个或多个源对象作为参数，然后将每个源对象中可枚举（Object.propertyIsEnumerable()返回 true）和自有（Object.hasOwnProperty()返回 true）属性复制到目标对象。以字符串和符号为键的属性会被复制。对每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标对象上的[[Set]]设置属性的值。

```js
let dest, src, result

/**
 * 简单复制
 */
dest = {}
src = { id: 'src' }
result = Object.assign(dest, src)
// Object.assign 修改目标对象
// 也会返回修改后的目标对象
console.log(dest === result) // true
console.log(dest !== src) // true
console.log(result) // { id: src }
console.log(dest) // { id: src }

/**
 * 多个源对象
 */
dest = {}
result = Object.assign(dest, { a: 'foo' }, { b: 'bar' })
console.log(result) // { a: foo, b: bar }

/**
 * 获取函数与设置函数
 */
dest = {
  set a(val) {
    console.log(`Invoked dest setter with param ${val}`)
  }
}
src = {
  get a() {
    console.log('Invoked src getter')
    return 'foo'
  }
}
Object.assign(dest, src)
// 调用 src 的获取方法
// 调用 dest 的设置方法并传入参数"foo"
// 因为这里的设置函数不执行赋值操作
// 所以实际上并没有把值转移过来
console.log(dest) // { set a(val) {...} }
```

---

Object.assign()实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使用最后一个复制的值。此外，从源对象访问器属性取得的值，比如获取函数，会作为一个静态值赋给目标对象。换句话说，不能在两个对象间转移获取函数和设置函数。

```js
let dest, src, result

/**
 * 覆盖属性
 */
dest = { id: 'dest' }
result = Object.assign(dest, { id: 'src1', a: 'foo' }, { id: 'src2', b: 'bar' })
// Object.assign 会覆盖重复的属性
console.log(result) // { id: src2, a: foo, b: bar }
// 可以通过目标对象上的设置函数观察到覆盖的过程：
dest = {
  set id(x) {
    console.log(x)
  }
}
Object.assign(dest, { id: 'first' }, { id: 'second' }, { id: 'third' })
// first
// second
// third

/**
 * 对象引用
 */
dest = {}
src = { a: {} }
Object.assign(dest, src)
// 浅复制意味着只会复制对象的引用
console.log(dest) // { a :{} }
console.log(dest.a === src.a) // true
```

---

如果赋值期间出错，则操作会中止并退出，同时抛出错误。Object.assign()没有“回滚”之前赋值的概念，因此它是一个尽力而为、可能只会完成部分复制的方法。

```js
let dest, src, result
/**
 * 错误处理
 */
dest = {}
src = {
  a: 'foo',
  get b() {
    // Object.assign()在调用这个获取函数时会抛出错误
    throw new Error()
  },
  c: 'bar'
}
try {
  Object.assign(dest, src)
} catch (e) {}
// Object.assign()没办法回滚已经完成的修改
// 因此在抛出错误之前，目标对象上已经完成的修改会继续存在：
console.log(dest) // { a: foo }
```

### 8.1.5 对象标识及相等判定

在 ECMAScript 6 之前，有些特殊情况即使是===操作符也无能为力：

```js
// 这些是===符合预期的情况
console.log(true === 1) // false
console.log({} === {}) // false
console.log('2' === 2) // false

// 这些情况在不同 JavaScript 引擎中表现不同，但仍被认为相等
console.log(+0 === -0) // true
console.log(+0 === 0) // true
console.log(-0 === 0) // true

// 要确定 NaN 的相等性，必须使用极为讨厌的 isNaN()
console.log(NaN === NaN) // false
console.log(isNaN(NaN)) // true
```

为改善这类情况，ECMAScript 6 规范新增了 Object.is()，这个方法与===很像，但同时也考虑到了上述边界情形。这个方法必须接收两个参数：

```js
console.log(Object.is(true, 1)) // false
console.log(Object.is({}, {})) // false
console.log(Object.is('2', 2)) // false

// 正确的 0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0)) // false
console.log(Object.is(+0, 0)) // true
console.log(Object.is(-0, 0)) // false

// 正确的 NaN 相等判定
console.log(Object.is(NaN, NaN)) // true

function recursivelyCheckEqual(x, ...rest) {
  return (
    Object.is(x, rest[0]) && (rest.length < 2 || recursivelyCheckEqual(...rest))
  )
}
```

检查多个值是否相等，递归地利用相等性传递即可

```js
function recursivelyCheckEqual(x, ...rest) {
  return (
    Object.is(x, rest[0]) && (rest.length < 2 || recursivelyCheckEqual(...rest))
  )
}
const a = [1, 1, 1]
const b = [1, 1, 2]
recursivelyCheckEqual(...a)
// true
recursivelyCheckEqual(...b)
// false
```

### 8.1.6 增强的对象语法

ECMAScript 6 为定义和操作对象新增了很多极其有用的语法糖特性。同样适用于 ECMAScript 6 的类。

#### 1. 属性值简写

```js
// 属性值简写
// 如果没有找到同名变量，则会抛出 ReferenceError
let name = 'Matt'
let person = {
  name
}
console.log(person) // { name: 'Matt' }

// 代码压缩程序会在不同作用域间保留属性名，以防止找不到引用
function makePerson(name) {
  return {
    name
  }
}
let person = makePerson('Matt')
console.log(person.name) // Matt

// 在这里，即使参数标识符只限定于函数作用域，编译器也会保留初始的 name 标识符。如果使用Google Closure 编译器压缩，那么函数参数会被缩短，而属性名不变：
function makePerson(a) {
  return {
    name: a
  }
}
var person = makePerson('Matt')
console.log(person.name) // Matt
```

#### 2. 可计算属性

```js
// 中括号包围的对象属性键告诉运行时将其作为 JavaScript 表达式而不是字符串来求值
const nameKey = 'name'
let person = {
  [nameKey]: 'Matt'
}
console.log(person) // { name: 'Matt' }

// 因为被当作 JavaScript 表达式求值，所以可计算属性本身可以是复杂的表达式，在实例化时再求值：
const nameKey = 'name'
const ageKey = 'age'
const jobKey = 'job'
let uniqueToken = 0
function getUniqueKey(key) {
  return `${key}_${uniqueToken++}`
}
let person = {
  [getUniqueKey(nameKey)]: 'Matt',
  [getUniqueKey(ageKey)]: 27,
  [getUniqueKey(jobKey)]: 'Software engineer'
}
console.log(person) // { name_0: 'Matt', age_1: 27, job_2: 'Software engineer' }
// 或者直接写在中括号内
let person = {
  [1 + 1]: '30',
  [true ? 'mike' : 'cc']: 27
}
```

::: warning 注意
可计算属性表达式中抛出任何错误都会中断对象创建。如果计算属性的表达式有副作用，那就要小心了，因为如果表达式抛出错误，那么之前完成的计算是不能回滚的。
:::

#### 3. 简写方法名

旧：  
在给对象定义方法时，通常都要写一个方法名、冒号，然后再引用一个匿名函数表达式，如下所示：

```js
let person = {
  sayName: function (name) {
    console.log(`My name is ${name}`)
  }
}
person.sayName('Matt') // My name is Matt
```

新：  
新的简写方法的语法遵循同样的模式，但开发者要放弃给函数表达式命名（不过给作为方法的函数命名通常没什么用）。相应地，这样也可以明显缩短方法声明。

```js
// 等价上面的写法
let person = {
  sayName(name) {
    console.log(`My name is ${name}`)
  }
}
person.sayName('Matt') // My name is Matt

// 简写方法名对获取函数和设置函数也是适用的：
let person = {
  name_: '',
  get name() {
    return this.name_
  },
  set name(name) {
    this.name_ = name
  },
  sayName() {
    console.log(`My name is ${this.name_}`)
  }
}
person.name = 'Matt'
person.sayName() // My name is Matt

// 简写方法名与可计算属性键相互兼容：
const methodKey = 'sayName'
let person = {
  [methodKey](name) {
    console.log(`My name is ${name}`)
  }
}
person.sayName('Matt') // My name is Mat
```

### 8.1.7 对象解构

```js
// 不使用对象解构
let person = {
  name: 'Matt',
  age: 27
}
let personName = person.name,
  personAge = person.age
console.log(personName) // Matt
console.log(personAge) // 27

// 使用对象解构
let person = {
  name: 'Matt',
  age: 27
}
let { name: personName, age: personAge } = person
console.log(personName) // Matt
console.log(personAge) // 27

// 赋值的时候可以忽略某些属性，而如果引用的属性不存在，则该变量的值就是 undefined，并不会报错：
let person = {
  name: 'Matt',
  age: 27
}
let { name, job } = person
console.log(name) // Matt
console.log(job) // undefined

// 也可以在解构赋值的同时定义默认值，这适用于前面刚提到的引用的属性不存在于源对象中的情况：
let person = {
  name: 'Matt',
  age: 27
}
let { name, job = 'Software engineer' } = person
console.log(name) // Matt
console.log(job) // Software engineer
```

解构在内部使用函数 ToObject()（不能在运行时环境中直接访问）把源数据结构转换为对象。这
意味着在对象解构的上下文中，原始值会被当成对象。这也意味着（根据 ToObject()的定义），null
和 undefined 不能被解构，否则会抛出错误。

```js
let { length } = 'foobar'
console.log(length) // 6

let { constructor: c } = 4
console.log(c === Number) // true

let { _ } = null // TypeError
let { _ } = undefined // TypeError
```

解构并不要求变量必须在解构表达式中声明。不过，如果是给事先声明的变量赋值，则赋值表达式
必须包含在一对括号中：

```js
let personName, personAge
let person = {
  name: 'Matt',
  age: 27
}(({ name: personName, age: personAge } = person))
console.log(personName, personAge) // Matt, 27
```

#### 1. 嵌套解构

解构对于引用嵌套的属性或赋值目标没有限制。为此，可以通过解构来复制对象属性：

```js
let person = {
  name: 'Matt',
  age: 27,
  job: {
    title: 'Software engineer'
  }
}
let personCopy = {}

;({ name: personCopy.name, age: personCopy.age, job: personCopy.job } = person)

// 因为一个对象的引用被赋值给 personCopy，所以修改
// person.job 对象的属性也会影响 personCopy
person.job.title = 'Hacker'
console.log(person)
// { name: 'Matt', age: 27, job: { title: 'Hacker' } }
console.log(personCopy)
// { name: 'Matt', age: 27, job: { title: 'Hacker' } }
```

解构赋值可以使用嵌套结构，以匹配嵌套的属性：

```js
let person = {
  name: 'Matt',
  age: 27,
  job: {
    title: 'Software engineer'
  }
}

// 声明 title 变量并将 person.job.title 的值赋给它
let {
  job: { title }
} = person
console.log(title) // Software engineer
```

在外层属性没有定义的情况下不能使用嵌套解构。无论源对象还是目标对象都一样：

```js
let person = {
  job: {
    title: 'Software engineer'
  }
}
let personCopy = {}

// foo 在源对象上是 undefined
;({
  foo: { bar: personCopy.bar }
} = person)
// TypeError: Cannot destructure property 'bar' of 'undefined' or 'null'.

// job 在目标对象上是 undefined
;({
  job: { title: personCopy.job.title }
} = person)
// TypeError: Cannot set property 'title' of undefined
```

#### 2. 部分解构

需要注意的是，涉及多个属性的解构赋值是一个输出无关的顺序化操作。  
如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分：

```js
let person = {
  name: 'Matt',
  age: 27
}
let personName, personBar, personAge
try {
  // person.foo 是 undefined，因此会抛出错误
  ;({
    name: personName,
    foo: { bar: personBar },
    age: personAge
  } = person)
} catch (e) {}
console.log(personName, personBar, personAge)
// Matt, undefined, undefined
```

#### 3. 参数上下文匹配

在函数参数列表中也可以进行解构赋值。对参数的解构赋值不会影响 arguments 对象，但可以在函数签名中声明在函数体内使用局部变量：

```js
let person = {
  name: 'Matt',
  age: 27
}

function printPerson(foo, { name, age }, bar) {
  console.log(arguments)
  console.log(name, age)
}
function printPerson2(foo, { name: personName, age: personAge }, bar) {
  console.log(arguments)
  console.log(personName, personAge)
}

printPerson('1st', person, '2nd')
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27

printPerson2('1st', person, '2nd')
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
```

## 8.2 创建对象

虽然使用 Object 构造函数或对象字面量可以方便地创建对象，但这些方式也有明显不足：创建具有同样接口的多个对象需要重复编写很多代码。

### 8.2.1 概述

综观 ECMAScript 规范的历次发布，每个版本的特性似乎都出人意料。ECMAScript 5.1 并没有正式支持面向对象的结构，比如类或继承。但是，正如接下来几节会介绍的，巧妙地运用原型式继承可以成功地模拟同样的行为。

ECMAScript 6 开始正式支持类和继承。ES6 的类旨在完全涵盖之前规范设计的基于原型的继承模式。不过，无论从哪方面看，ES6 的类都仅仅是封装了 ES5.1 构造函数加原型继承的语法糖而已。

### 8.2.2 工厂模式

工厂模式是一种众所周知的设计模式，广泛应用于软件工程领域，用于抽象创建特定对象的过程。（本书后面还会讨论其他设计模式及其在 JavaScript 中的实现。）下面的例子展示了一种按照特定接口创建对象的方式：

```js
function createPerson(name, age, job) {
  let o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function () {
    console.log(this.name)
  }
  return o
}
let person1 = createPerson('Nicholas', 29, 'Software Engineer')
let person2 = createPerson('Greg', 27, 'Doctor')
```

这里，函数 createPerson()接收 3 个参数，根据这几个参数构建了一个包含 Person 信息的对象。可以用不同的参数多次调用这个函数，每次都会返回包含 3 个属性和 1 个方法的对象。这种工厂模式虽然可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型）。

### 8.2.3 构造函数模式

也可以自定义构造函数，以函数的形式为自己的对象类型定义属性和方法  
比如，前面的例子使用构造函数模式可以这样写：

```js
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name)
  }
}
let person1 = new Person('Nicholas', 29, 'Software Engineer')
let person2 = new Person('Greg', 27, 'Doctor')
person1.sayName() // Nicholas
person2.sayName() // Greg
```

Person()构造函数代替了 createPerson()工厂函数。实际上，Person()内部的代码跟 createPerson()基本是一样的，只是有如下区别。

- 没有显式地创建对象。
- 属性和方法直接赋值给了 this。
- 没有 return。

要注意函数名 Person 的首字母大写了。**按照惯例，构造函数名称的首字母都是要大写的**，
非构造函数则以小写字母开头。这是从面向对象编程语言那里借鉴的，有助于在 ECMAScript 中区分构造函数和普通函数。毕竟 ECMAScript 的构造函数就是能创建对象的函数。

要创建 Person 的实例，应使用 new 操作符。以这种方式调用构造函数会执行如下操作。

1. 在内存中创建一个新对象。
2. 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
4. 执行构造函数内部的代码（给新对象添加属性）。
5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

上一个例子的最后，person1 和 person2 分别保存着 Person 的不同实例。这两个对象都有一个 constructor 属性指向 Person，如下所示：

```js
console.log(person1.constructor == Person) // true
console.log(person2.constructor == Person) // true
```

constructor 本来是用于标识对象类型的。不过，一般认为 instanceof 操作符是确定对象类型更可靠的方式。前面例子中的每个对象都是 Object 的实例，同时也是 Person 的实例，如下面调用 instanceof 操作符的结果所示：

```js
console.log(person1 instanceof Object) // true
console.log(person1 instanceof Person) // true
console.log(person2 instanceof Object) // true
console.log(person2 instanceof Person) // true
```

**定义自定义构造函数可以确保实例被标识为特定类型，相比于工厂模式，这是一个很大的好处。**在
这个例子中，person1 和 person2 之所以也被认为是 Object 的实例，是因为所有自定义对象都继承
自 Object

---

构造函数不一定要写成函数声明的形式。赋值给变量的函数表达式也可以表示构造函数：

```js
let Person = function (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name)
  }
}
let person1 = new Person('Nicholas', 29, 'Software Engineer')
let person2 = new Person('Greg', 27, 'Doctor')
person1.sayName() // Nicholas
person2.sayName() // Greg
console.log(person1 instanceof Object) // true
console.log(person1 instanceof Person) // true
console.log(person2 instanceof Object) // true
console.log(person2 instanceof Person) // true
```

在实例化时，如果不想传参数，那么构造函数后面的括号可加可不加。只要有 new 操作符，就可以调用相应的构造函数：`let person = new Person`

#### 1. 构造函数也是函数

构造函数与普通函数唯一的区别就是调用方式不同。除此之外，构造函数也是函数。并没有把某个函数定义为构造函数的特殊语法。任何函数只要使用 new 操作符调用就是构造函数，而不使用 new 操作符调用的函数就是普通函数。比如，前面的例子中定义的 Person()可以像下面这样调用：

```js
// 作为构造函数
let person = new Person('Nicholas', 29, 'Software Engineer')
person.sayName() // "Nicholas"

// 作为函数调用
Person('Greg', 27, 'Doctor') // 添加到 window 对象
window.sayName() // "Greg"

// 在另一个对象的作用域中调用
let o = new Object()
Person.call(o, 'Kristen', 25, 'Nurse')
o.sayName() // "Kristen"
```

这个例子一开始展示了典型的构造函数调用方式，即使用 new 操作符创建一个新对象。

然后是普通函数的调用方式，这时候没有使用 new 操作符调用 Person()，结果会将属性和方法添加到 window 对象。这里要记住，在调用一个函数而没有明确设置 this 值的情况下（即没有作为对象的方法调用，或者没有使用 call()/apply()调用），this 始终指向 Global 对象（在浏览器中就是 window 对象）。因此在上面的调用之后，window 对象上就有了一个 sayName()方法，调用它会返回"Greg"。

最后展示的调用方式是通过 call()（或 apply()）调用函数，同时将特定对象指定为作用域。这里的调用将
对象 o 指定为 Person()内部的 this 值，因此执行完函数代码后，所有属性和 sayName()方法都会添加到对象 o 上面。

#### 2. 构造函数的问题

构造函数虽然有用，但也不是没有问题。构造函数的主要问题在于，其定义的方法会在每个实例上都创建一遍。因此对前面的例子而言，person1 和 person2 都有名为 sayName()的方法，但这两个方法不是同一个 Function 实例。我们知道，ECMAScript 中的函数是对象，因此每次定义函数时，都会初始化一个对象。逻辑上讲，这个构造函数实际上是这样的：

```js
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = new Function('console.log(this.name)') // 逻辑等价
}
```

这样理解这个构造函数可以更清楚地知道，每个 Person 实例都会有自己的 Function 实例用于显示 name 属性。当然了，以这种方式创建函数会带来不同的作用域链和标识符解析。但创建新 Function 实例的机制是一样的。因此不同实例上的函数虽然同名却不相等，如下所示：

```js
console.log(person1.sayName == person2.sayName) // false
```

因为都是做一样的事，所以没必要定义两个不同的 Function 实例。况且，this 对象可以把函数与对象的绑定推迟到运行时。

要解决这个问题，可以把函数定义转移到构造函数外部：

```js
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = sayName
}
function sayName() {
  console.log(this.name)
}
let person1 = new Person('Nicholas', 29, 'Software Engineer')
let person2 = new Person('Greg', 27, 'Doctor')
person1.sayName() // Nicholas
person2.sayName() // Greg
```

在这里，sayName()被定义在了构造函数外部。在构造函数内部，sayName 属性等于全局 sayName()函数。因为这一次 sayName 属性中包含的只是一个指向外部函数的指针，所以 person1 和 person2 共享了定义在全局作用域上的 sayName()函数。这样虽然解决了相同逻辑的函数重复定义的问题，但全局作用域也因此被搞乱了，因为那个函数实际上只能在一个对象上调用。如果这个对象需要多个方法，那么就要在全局作用域中定义多个函数。这会导致自定义类型引用的代码不能很好地聚集一起。这个新问题可以通过原型模式来解决。

### 8.2.4 原型模式

每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。实际上，这个对象就是通过调用构造函数创建的对象的原型。使用原型对象的好处是，在它上面定义的属性和方法可以被对象实例共享。原来在构造函数中直接赋给对象实例的值，可以直接赋值给它们的原型，如下所示：

```js
function Person() {}

Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.job = 'Software Engineer'
Person.prototype.sayName = function () {
  console.log(this.name)
}

let person1 = new Person()
person1.sayName() // "Nicholas"

let person2 = new Person()
person2.sayName() // "Nicholas"

console.log(person1.sayName == person2.sayName) // true
```

使用函数表达式也可以：

```js
let Person = function () {}
```

这里，所有属性和 sayName()方法都直接添加到了 Person 的 prototype 属性上，构造函数体中什么也没有。但这样定义之后，调用构造函数创建的新对象仍然拥有相应的属性和方法。与构造函数模式不同，使用这种原型模式定义的属性和方法是由所有实例共享的。因此 person1 和 person2 访问的都是相同的属性和相同的 sayName()函数。要理解这个过程，就必须理解 ECMAScript 中原型的本质。

#### 1. 理解原型

无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 prototype 属性（指向
原型对象）。默认情况下，所有原型对象自动获得一个名为 constructor 的属性，指回与之关联的构
造函数。对前面的例子而言，Person.prototype.constructor 指向 Person。然后，因构造函数而
异，可能会给原型对象添加其他属性和方法。

在自定义构造函数时，原型对象默认只会获得 constructor 属性，其他的所有方法都继承自
Object。每次调用构造函数创建一个新实例，这个实例的内部[[Prototype]]指针就会被赋值为构
造函数的原型对象。脚本中没有访问这个[[Prototype]]特性的标准方式，但 Firefox、Safari 和 Chrome
会在每个对象上暴露**proto**属性，通过这个属性可以访问对象的原型。在其他实现中，这个特性
完全被隐藏了。关键在于理解这一点：实例与构造函数原型之间有直接的联系，但实例与构造函数之
间没有。

这种关系不好可视化，但可以通过下面的代码来理解原型的行为：

```js
/**
 * 构造函数可以是函数表达式
 * 也可以是函数声明，因此以下两种形式都可以：
 * function Person() {}
 * let Person = function() {}
 */
function Person() {}
/**
 * 声明之后，构造函数就有了一个
 * 与之关联的原型对象：
 */
console.log(typeof Person.prototype)
console.log(Person.prototype)
// {
// constructor: f Person(),
// __proto__: Object
// }
/**
 * 如前所述，构造函数有一个 prototype 属性
 * 引用其原型对象，而这个原型对象也有一个
 * constructor 属性，引用这个构造函数
 * 换句话说，两者循环引用：
 */
console.log(Person.prototype.constructor === Person) // true
/**
 * 正常的原型链都会终止于 Object 的原型对象
 * Object 原型的原型是 null
 */
console.log(Person.prototype.__proto__ === Object.prototype) // true
console.log(Person.prototype.__proto__.constructor === Object) // true
console.log(Person.prototype.__proto__.__proto__ === null) // true
console.log(Person.prototype.__proto__)
// {
// constructor: f Object(),
// toString: ...
// hasOwnProperty: ...
// isPrototypeOf: ...
// ...
// }
let person1 = new Person(),
  person2 = new Person()
/**
 * 构造函数、原型对象和实例
 * 是 3 个完全不同的对象：
 */
console.log(person1 !== Person) // true
console.log(person1 !== Person.prototype) // true
console.log(Person.prototype !== Person) // true
/**
 * 实例通过__proto__链接到原型对象，
 * 它实际上指向隐藏特性[[Prototype]]
 *
 * 构造函数通过 prototype 属性链接到原型对象
 *
 * 实例与构造函数没有直接联系，与原型对象有直接联系
 */
console.log(person1.__proto__ === Person.prototype) // true
conosle.log(person1.__proto__.constructor === Person) // true
/**
 * 同一个构造函数创建的两个实例
 * 共享同一个原型对象：
 */
console.log(person1.__proto__ === person2.__proto__) // true
/**
 * instanceof 检查实例的原型链中
 * 是否包含指定构造函数的原型：
 */
console.log(person1 instanceof Person) // true
console.log(person1 instanceof Object) // true
console.log(Person.prototype instanceof Object) // true
```
