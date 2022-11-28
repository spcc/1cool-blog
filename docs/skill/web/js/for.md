# JS 循环中使用 async、await 的正确姿势

::: danger 总结
异步支持支持 for。
循环不能处理回调的循环，如 forEach、map、filter 等。
:::

## 声明遍历的数组和异步方法

声明一个数组：

```js
const skills = ['js', 'vue', 'node', 'react']
```

再声明一个 `promise` 的异步代码:

```js
function getSkillPromise(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value)
    }, 1000)
  })
}
```

## for 循环中使用

> 由于 `for` 循环并非函数，而 `async`、`await` 需要在函数中使用，因此需要在 `for` 循环外套一层 `function`

```js
async function test() {
  for (let i = 0; i < skills.length; i++) {
    const skill = skills[i]
    const res = await getSkillPromise(skill)
    console.log(res)
  }
}

test() // 调用
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95da6c412be14354bce9aeb907dadcdf~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

`for` 循环中有异步代码，是可以等到 `for` 循环中异步代码完全跑完之后再执行 `for` 循环后面的代码。

但是它不能处理回调的循环，如 forEach、map、filter 等，下面具体分析

## map 中使用

在`map`中使用`await`, `map`  的返回值始是`promise`数组，这是因为异步函数总是返回`promise`。

```js
async function test() {
  console.log('start')
  const res = skills.map(async item => {
    return await getSkillPromise(item)
  })
  console.log(res)
  console.log('end')
}

test()
```

结果：始终为`promise`数组

```js
start
[
  Promise { <pending> },
  Promise { <pending> },
  Promise { <pending> },
  Promise { <pending> }
]
end
```

如果想要等到`promise`的返回结果，可以使用`promise.all()`处理一下

```js
async function test() {
  console.log('start')
  const res = skills.map(async item => {
    return await getSkillPromise(item)
  })
  const resPromise = await Promise.all(res)
  console.log(resPromise)
  console.log('end')
}

test()

// 结果
start[('js', 'vue', 'node', 'react')]
end
```

## forEach 中使用

先上代码和结果

```js
async function test() {
  console.log('start')
  skills.forEach(async item => {
    const res = await getSkillPromise(item)
    console.log(res)
  })
  console.log('end')
}

test()
```

预期结果

```js
'Start'
'js'
'vue'
'node'
'react'
'End'
```

实际结果 在`forEach`循环等待异步结果返回之前就执行了`console.log('end')`

```js
'Start'
'End'
'js'
'vue'
'node'
'react'
```

JavaScript 中的  `forEach`不支持 promise 感知，也支持  `async`  和`await`，所以不能在  `forEach`  使用  `await` 。

# filter 中使用

使用`filter`过滤`item`为`vue`或者`react`的选项

正常使用 `filter`：

```js
async function test() {
  console.log('start')
  const res = skills.filter(item => {
    return ['vue', 'react'].includes(item)
  })
  console.log(res)
  console.log('end')
}

test() // 调用

// 结果
start[('vue', 'react')]
end
```

使用 `await`后：

```js
async function test() {
  console.log('start')
  const res = skills.filter(async item => {
    const skill = await getSkillPromise(item)
    return ['vue', 'react'].includes(item)
  })
  console.log(res)
  console.log('end')
}

test()
```

预期结果：

```sh
start
[ 'vue', 'react' ]
end
```

实际结果:

```sh
['js', 'vue', 'node', 'react']
end
```

结论：因为异步函数`getSkillPromise`返回结果返回的`promise`总是真的，所以所有选项都通过了过滤
