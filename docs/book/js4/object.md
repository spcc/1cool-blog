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
