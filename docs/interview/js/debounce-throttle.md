# 防抖节流

**防抖：防抖是让你多次触发，只生效最后一次。适用于只需要一次触发生效的场景。**  
**节流：节流是让你的操作，每隔一段时间触发一次。适用于多次触发要多次生效的场景。**

## 防抖

防抖是让你多次触发，只生效最后一次。适用于只需要一次触发生效的场景。

### 为什么要防抖

有的操作是高频触发的，但是其实触发一次就好了  
比如我们短时间内多次缩放页面，那么我们不应该每次缩放都去执行操作，应该只做一次就好  
再比如说监听输入框的输入，不应该每次都去触发监听，应该是用户完成一段输入后在进行触发

### 常用场景

- 浏览器视口大小改变
- 输入框远程查询事件
- 在线文档自动保存

### 代码实现

```html
<input type="text" id="searchElement" />

<script>
  const searchElement = document.getElementById('searchElement')
  const debounce = (fn, initial) => {
    let timer = null
    return () => {
      clearTimeout(timer)
      timer = setTimeout(fn, initial)
    }
  }

  searchElement.oninput = debounce(function (event) {
    const value = searchElement.value
    if (value) console.log(value, '请求值')
  }, 500)
</script>
```

## 节流

节流是让你的操作，每隔一段时间触发一次。适用于多次触发要多次生效的场景。

### 为什么要节流

防抖存在一个问题，事件会一直等到用户完成操作后一段时间在操作，如果一直操作，会一直不触发  
比如说是一个按钮，点击就发送请求，如果一直点，那么请求就会一直发不出去  
这里正确的思路应该是第一次点击就发送，然后上一个请求回来后，才能再发

### 常用场景

- 按钮提交事件（当然也可做成点击后就 loading）
- 页面滚动事件的触发
- 累计计算鼠标移动距离

### 代码实现

```js
function throttle2(fn, interval) {
  let init = false // 引入一个参数记录状态
  let timer
  return event => {
    if (init) return
    init = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      init = false
    }, interval)
    fn(event)
  }
}

var btnClick = document.getElementById('buttonElement')
btnClick.addEventListener(
  'click',
  throttle2(function (event) {
    console.log(event, '点击了')
  }, 2000)
)
```

## lodash 实现

[网址](https://www.lodashjs.com/)
[Github](https://github.com/lodash/lodash)

### 防抖

```js
import _ from 'lodash'
debounceHandle: _.debounce(
  function () {
    console.log('业务代码')
  },
  2000,
  {
    // 在n毫秒内触发
    leading: true, // 第一次点击立刻执行，默认为true
    trailing: true // 节流结束后立刻执行，默认为true
  }
)
```

### 节流

```js
import _ from 'lodash'
throttleHandle: _.throttle(function () {
  console.log('业务代码')
}, 2000)
```
