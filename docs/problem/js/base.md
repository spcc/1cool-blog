# 常用方法

## 获取随机数

:::details 点击查看代码

```js
// 获取 0 - x 的随机数
var num = Math.floor(Math.random() * 10) + 1

// 获取 1 - x 的随机数
var num = Math.floor(Math.random() * 10) + 1

// 获取两个数之间的随机整数
function getRandomNumberByRange(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
getRandomNumberByRange(0, 100)
```

:::

## 等待函数

::: details 点击查看代码

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncFn = async () => {
  await wait(1000)
  console.log('等待异步函数执行结束')
}

asyncFn()
```

:::

## 获取链接参数

`window.location.search` 可以获取 url 中 ““?” 问号后面的参数：

:::details 点击查看代码

```js
const getParamByUrl = key => {
  const url = new URL(location.href)
  return url.searchParams.get(key)
}
```

:::

## 复制到剪切板

复制到剪切板是一项非常实用且能够提高用户便利性的功能。

:::details 点击查看代码

```js
const copyToClipboard = text =>
  navigator.clipboard &&
  navigator.clipboard.writeText &&
  navigator.clipboard.writeText(text)

copyToClipboard('Hello World!')
```

:::

## 生成随机颜色

:::details

```js
const generateRandomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

console.log(generateRandomHexColor())
```

:::

## 判断当前标签页是否为可视状态

浏览器可以打开很多标签页，下面 👇🏻 的代码段就是判断当前标签页是否是激活的标签页

```js
const isBrowserTabInView = () => document.hidden
isBrowserTabInView()
```

## 保留指定的小数位

```js
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed)
// Examples
toFixed(25.198726354, 1) // 25.1
toFixed(25.198726354, 2) // 25.19
toFixed(25.198726354, 3) // 25.198
toFixed(25.198726354, 4) // 25.1987
toFixed(25.198726354, 5) // 25.19872
toFixed(25.198726354, 6) // 25.198726
```

## 浮点数计算

::: details 点击查看代码

```js
import NP from 'number-precision'
NP.plus(0.1, 0.2) // 0.3
NP.minus(1, 0.9) // 0.1
```

:::

## 对象动态属性

声明对象时，如果属性是动态的，可以这样声明：

```js
const dynamic = 'color'
var item = {
  brand: 'Ford',
  [dynamic]: 'Blue'
}
console.log(item)
// { brand: "Ford", color: "Blue" }
```

## 精简 console.log

全局这样声明，后面再使用 console.log 打印值就方便多啦：

```js
const c = console.log.bind(document)

c(222) // 222
c('hello world') // hello world
```

## 类数组转数组

什么是类数组？

我们最常见的类数组比如函数的参数 arguments

```js
const fn = function () {
  console.log(arguments)
}

fn('a1', 'a2', 'a3')
```

类数组的属性为数字、并且还有 length 属性，主要是为了保证 arguments[i] 和 arguments.length 都能拿到值。

将类数组转化为数组我们通常用 call 方法：

```js
Array.prototype.slice.call(arguments)
```

其实也可以用 ... 扩展符实现类数组转数组：

```js
;[...arguments]
```

## 全局方法

### 判断设备(ipad,mobile,pc)

::: details 点击查看代码

```js
export const judgeDevice = (function () {
  const ua = navigator.userAgent.toLowerCase()
  if (/ipad|ipod/.test(ua)) {
    return 'ipad'
  } else if (/android|iphone/.test(ua)) {
    return 'mobile'
  }
  return 'pc'
})()
```

:::

### 判断是否是微信环境

::: details 点击查看代码

```js
// 判断是否是微信浏览器的函数
export const isWeiXin = () => {
  if (isClient) {
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    const ua = window.navigator.userAgent.toLowerCase()
    // alert(ua)
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
    return ua.includes('micromessenger')
  }
}
```

:::

### 判断是否是移动端

::: details 点击查看代码

```js
/**
 * 是否是移动端
 */
export const isMobile = () => {
  const ua = window.navigator.userAgent
  if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(ua)) {
    return true
  }
  return false
}
```

:::

### 对象转 queryString

:::details 点击查看代码

```js
function querystring(data = {}) {
  if (typeof data !== 'object') {
    throw new TypeError('param must be object')
  }
  return Object.entries(data)
    .reduce(
      (searchParams, [name, value]) =>
        value === undefined || value === null
          ? (searchParams, searchParams)
          : (searchParams.append(
              decodeURIComponent(name),
              decodeURIComponent(value)
            ),
            searchParams),
      new URLSearchParams()
    )
    .toString()
}
querystring({
  a: 1,
  b: 2,
  c: 3
})
// 'a=1&b=2&c=3'
```

:::
