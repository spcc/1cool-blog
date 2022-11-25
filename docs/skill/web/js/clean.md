# 代码整洁

- [一定要优雅，高端前端程序员都应该具备的基本素养](https://juejin.cn/post/7107119166989336583)
  [代码整洁](https://juejin.cn/column/7055643524095541261)

以下技巧可能在示例中看起来不值一提，但是在实际的项目中，当业务逻辑复杂起来、当代码量变得很大的时候，这些小技巧一定能给出正面的作用、帮助，甚至超乎想象。

## 移除对象属性（简写）

```js
let obj = { x: 45, y: 72, z: 68, p: 98 }

// Longhand
delete obj.x
delete obj.p
console.log(obj) // {y: 72, z: 68}

// Shorthand
let { x, p, ...newObj } = obj
console.log(newObj) // {y: 72, z: 68}
```

## 用 for in 和 for of 来简化普通 for 循环

```js
let arr = [10, 20, 30, 40]

// Longhand
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

// Shorthand
// for of loop
for (const val of arr) {
  console.log(val)
}

// for in loop
for (const index in arr) {
  console.log(arr[index])
}
```

## 多值匹配，可将所有值放在数组中，通过数组方法来简写

```js
// bad
if (value === 1 || value === 'one' || value === 2 || value === 'two') {
  // Execute some code
}

// good 1
if ([1, 'one', 2, 'two'].indexOf(value) > -1) {
  // Execute some code
}

// good 2
if ([1, 'one', 2, 'two'].includes(value)) {
  // Execute some code
}
```

## 解构，可为多个变量同时赋值

```js
// bad
let a, b, c
a = 5
b = 8
c = 12

// good
let [a, b, c] = [5, 8, 12]
```

## 使用&&运算符简化 if 语句

例如某个函数在某个条件为真时才调用，可简写

```js
if (isLoggedin) {
  goToHomepage()
}
```

可以改成

```js
isLoggedin && goToHomepage()
```

## 用对象传参

把参数包装成一个对象再传，否则谁能读懂这种没头没尾的且要求顺序的参数的意义？

```js
function getItem(price, quantity, name, description) {}
getItem(15, undefined, 'bananas', 'fruit')
```

```js
function getItem(args) {
  const { price, quantity, name, description } = args
}
getItem({
  name: 'bananas',
  price: 10,
  quantity: 1,
  description: 'fruit'
})
```

## 将数字定义为常量

我们常常会用到数字，比如以下代码：

```js
const isOldEnough = person => {
  return person.getAge() >= 100
}
```

谁知道这个 100 具体指的是什么？我们通常需要结合函数上下文再推测、判断这个 100 它可能是具体代表一个什么值。

如果这样的数字有多个的话，一定会很容易造成更大的困惑。

`写出干净的 JavaScript：将数字定义为常量`

即可清晰的解决这个问题：

```js
const AGE = 100
const isOldEnough = person => {
  return person.getAge() >= AGE
}
```

或者直接作为形参

```js
const isOldEnough = (person, AGE = 100) => {
  return person.getAge() >= AGE
}
```

现在，我们通过声明常量的名字，即可立马读懂 100 是“年龄要求”的意思。修改时也能迅速定位、一处修改、多处生效。

## 避免将布尔值作为函数参数

将布尔值作为参数传入函数中是一种常见的容易造成代码混乱的写法。

```js
const validateCreature = (creature, isHuman) => {
  if (isHuman) {
    // ...
  } else {
    // ...
  }
}
```

布尔值作为参数传入函数不能表示出明确的意义，只能告诉读者，这个函数将会有判断发生，产生两种或多种情况。

然而，我们提倡函数的单一职责原则，所以：

`写出干净的 JavaScript：避免将布尔值作为函数参数`

```js
const validatePerson = person => {
  // ...
}
const validateCreature = creature => {
  // ...
}
```

## 将多个条件封装

我们经常会写出这样的代码：

```js
if (
  person.getAge() > 30 &&
  person.getName() === 'simon' &&
  person.getOrigin() === 'sweden'
) {
  // ...
}
```

不是不行，只是隔久了会一下子看不懂这些判断到底是要干嘛的，所以建议把这些条件用变量或函数进行封装。

`写出干净的 JavaScript：将多个条件封装`

```js
const isSimon =
  person.getAge() > 30 &&
  person.getName() === 'simon' &&
  person.getOrigin() === 'sweden'
if (isSimon) {
  // ...
}
```

或者

```js
const isSimon = person => {
  return (
    person.getAge() > 30 &&
    person.getName() === 'simon' &&
    person.getOrigin() === 'sweden'
  )
}
if (isSimon(person)) {
  // ...
}
```

噢，原来这些条件是为了判断这个人是不是 Simon ~

这样的代码是声明式风格的代码，更易读。

## 避免否定的判断条件

条件判断中，使用否定判断，会额外造成一种思考负担。

比如下面的代码，条件 !isCreatureNotHuman(creature) 双重否定，读起来就会觉得有点费劲。

```js
const isCreatureNotHuman = creature => {
  // ...
}

if (!isCreatureNotHuman(creature)) {
  // ...
}
```

`写出干净的 JavaScript：避免否定的判断条件`

改写成以下写法则读起来更轻松，虽然这只是一个很小的技巧，但是在大量的代码逻辑中，多处去遵循这个原则，肯定会很有帮助。

很多时候读代码就是读着读着，看到一个“很烂”的写法，就忍不了了，细节会叠加，千里之堤溃于蚁穴。

```js
const isCreatureHuman = creature => {
  // ...
}
if (isCreatureHuman(creature)) {
  // ...
}
```

## 避免大量 if...else...

[责任链](https://juejin.cn/post/6996811608756322334)

## 数字分隔符

有时候数字有很多位，例如 `const money = 9999999999999`

一眼看上去，自己都不知道这是几位，这个时候我们可以这样操作：

```js
const money = 9_999_999_999_999
console.log(money) // 9999999999999
```

## 一定要错误处理

特别是网络请求或者其他异步操作中，`await` 记得包裹 `try catch`，可以给用户一个友好提示，同时可以考虑 `catch` 中需要做什么兜底处理，必要时进行上传日志。

```js
try {
  this.loading = this.$loading({
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const info = await resDistributeService({ taskTicketId: this.id })
  ...
} catch (e) {
  this.$message({
    type: 'error',
    message: e.msg || e.message || '失败',
  });
} finally {
  this.loading.close()
}
```

## 数字 0 的校验

前端经常使用 `!v` ，来判断 `v` 是不是有值。  
但如果 `0` 是 `v` 的有效值 ，此时本该处理，但会提前结束，最终引发错误。此时需要显示的判断是否是 `null` 或者 `undefined `

```js
// 失败
if (!v) {
  return
}
doSomething()

// 正常
if (v === null || v === undefined) {
  return
}
doSomething()
```

## 默认对象采用函数返回

由于 `js` 中的对象是引用，因此赋默认值的时候最好通过函数，每次都返回一个新对象。

::: details 点击查看代码

```js
// bad
const defaultCondition = {
  name: '',
  conditionList: [
    {
      conditionCode: '',
      conditionValue: null
    }
  ]
}
export default {
  data() {
    return {
      condition: { ...defaultCondition }
    }
  },
  methods: {
    closeDialog() {
      this.condition = { ...defaultCondition }
      this.configId = null
      this.$refs.form.resetFields()
    }
  }
}
```

```js
// good
const getDefaultCondition = () => ({
  name: '',
  conditionList: [
    {
      conditionCode: '',
      conditionValue: null
    }
  ]
})
export default {
  data() {
    return {
      condition: getDefaultCondition()
    }
  },
  methods: {
    closeDialog() {
      this.condition = getDefaultCondition()
      this.configId = null
      this.$refs.form.resetFields()
    }
  }
}
```

:::
