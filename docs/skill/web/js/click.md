# JS 事件

## 1. 有哪些事件？

### 1.1 鼠标事件

<table>
  <tr>
    <th>事件名</th>
    <th>解释</th>
  </tr>

  <tr>
    <td>onclick</td>
    <td>点击鼠标时触发此事件</td>
  </tr>
  <tr>
    <td>ondblclick</td>
    <td>双击鼠标时触发此事件</td>
  </tr>
  <tr>
    <td>onmousedown</td>
    <td>按下鼠标时触发此事件</td>
  </tr>
  <tr>
    <td>onmouseup</td>
    <td>鼠标按下后又松开时触发此事件</td>
  </tr>
  <tr>
    <td>onmouseover</td>
    <td>当鼠标移动到某个元素上方时触发此事件</td>
  </tr>
  <tr>
    <td>onmousemove</td>
    <td>移动鼠标时触发此事件</td>
  </tr>
  <tr>
    <td>onmouseout</td>
    <td>当鼠标离开某个元素范围时触发此事件</td>
  </tr>
</table>

### 1.2 键盘事件

<table>
  <tr>
    <th>事件名</th>
    <th>解释</th>
  </tr>

  <tr>
    <td>onkeypress</td>
    <td>当按下并松开键盘上的某个键时触发此事件</td>
  </tr>
  <tr>
    <td>onkeydown</td>
    <td>当按下键盘上的某个按键时触发此事件</td>
  </tr>
  <tr>
    <td>onkeyup</td>
    <td>当放开键盘上的某个按键时触发此事件</td>
  </tr>
</table>

### 1.3 窗口事件

<table>
  <tr>
    <th>事件名</th>
    <th>解释</th>
  </tr>

  <tr>
    <td>onabort</td>
    <td>图片在下载过程中被用户中断时触发此事件</td>
  </tr>
  <tr>
    <td>onbeforeunload</td>
    <td>当前页面的内容将要被改变时触发此事件</td>
  </tr>
  <tr>
    <td>onerror</td>
    <td>出现错误时触发此事件</td>
  </tr>
  <tr>
    <td>onload</td>
    <td>页面内容加载完成时触发此事件</td>
  </tr>
  <tr>
    <td>onmove</td>
    <td>当移动浏览器的窗口时触发此事件</td>
  </tr>
  <tr>
    <td>onresize</td>
    <td>当改变浏览器的窗口大小时触发此事件</td>
  </tr>
  <tr>
    <td>onscroll</td>
    <td>当滚动浏览器的滚动条时触发此事件</td>
  </tr>
  <tr>
    <td>onstop</td>
    <td>当按下浏览器的停止按钮或者正在下载的文件被中断时触发此事件</td>
  </tr>
  <tr>
    <td>oncontextmenu</td>
    <td>当弹出右键上下文菜单时触发此事件</td>
  </tr>
  <tr>
    <td>onunload</td>
    <td>改变当前页面时触发此事件</td>
  </tr>
</table>

### 1.4 表单事件

<table>
  <tr>
    <th>事件名</th>
    <th>解释</th>
  </tr>

  <tr>
    <td>onblur</td>
    <td>当前元素失去焦点时触发此事件</td>
  </tr>
  <tr>
    <td>onchange</td>
    <td>当前元素失去焦点并且元素的内容发生改变时触发此事件</td>
  </tr>
  <tr>
    <td>onfocus</td>
    <td>当某个元素获得焦点时触发此事件</td>
  </tr>
  <tr>
    <td>onreset</td>
    <td>当点击表单中的重置按钮时触发此事件</td>
  </tr>
  <tr>
    <td>onsubmit</td>
    <td>当提交表单时触发此事件</td>
  </tr>
</table>

## 2. 点击事件执行顺序

总结下来主要就三步：**事件捕获阶段->事件目标阶段->事件冒泡阶段**

点击事件的执行过程，这过程也被称作 **DOM 的事件模型**

一个点击事件被触发，主要会走以下流程：

1. 用户点击某个按钮，即触发点击事件。
2. 浏览器从顶层 document 元素发出一个事件流。
3. 事件流顺着 DOM 逐层向下查找触发事件的目标元素，这就是常说的事件捕获。
4. 如果在查找过程中遇到了相同的事件，比如其它元素也绑定点击事件，那么默认不执行，继续往下找。
5. 查找到目标元素后，就会执行目标元素所绑定的事件函数，这也就是常说的事件目标阶段 。
6. 到这儿整个点击事件还没有完，浏览器会逆向执行该操作，也就是我们所说的事件冒泡。
7. 事件冒泡阶段，默认会触发相同的事件，也就是我们刚刚在事件捕获阶段，遇到相同的事件未执行，因为默认在这个冒泡阶段执行。

## 3. 代码演示

### 3.1 正常事件流

执行子级点击事件，会执行所有的父级点击事件（冒泡）

:::details 点击查看代码

```html
<style>
  #box1 {
    width: 200px;
    height: 200px;
    background-color: #ccc;
  }

  #box2 {
    width: 100px;
    height: 100px;
    background-color: yellow;
  }

  #box3 {
    width: 50px;
    height: 50px;
    background-color: blue;
  }
</style>

<div id="box1">
  <div id="box2">
    <div id="box3"></div>
  </div>
</div>

<script>
  // 获取 3 个元素节点
  let box1 = document.getElementById('box1')
  let box2 = document.getElementById('box2')
  let box3 = document.getElementById('box3')
  // 绑定点击事件
  box1.addEventListener('click', box1Click)
  box2.addEventListener('click', box2Click)
  box3.addEventListener('click', box3Click)
  // 事件处理函数
  function box1Click() {
    console.log('box1 被点击了！')
  }
  function box2Click() {
    console.info('box2 被点击了！')
  }
  function box3Click() {
    console.info('box3 被点击了！')
  }
</script>
```

:::

点击 box1，输出结果：

- box1 被点击了！

点击 box2，输出结果：

- box2 被点击了！
- box1 被点击了！

点击 box3，输出结果：

- box3 被点击了！
- box2 被点击了！
- box1 被点击了！

### 3.2 阻止冒泡

函数会默认接收一个事件参数，可以调用 stopPropagation()阻止冒泡

```js
function box3Click(e) {
  console.info('e', e)
  e.stopPropagation()
  console.info('box3 被点击了！')
}
```

### 3.3 捕获阶段执行

在未阻止冒泡的前提下，我们点击 box3，执行顺序依次是：**box3->box2->box1**  
想要执行的顺序改为：**box1->box2->box3**

想要实现这种情况，我们得先了解 addEventListener 这个函数。

```js
element.addEventListener(event, function, useCapture)
```

第三个参数 useCapture 接收一个 Boolean 值，它得作用主要如下：

- true：事件在捕获阶段执行
- false：默认值，事件在冒泡阶段执行

只需要事件函数在捕获阶段执行即可

```js
box3.addEventListener('click', box3Click, true)

// 执行顺序就改变了
// box1->box2->box3
```

## 4. 事件委托

**例：**  
假如有 100 个 li 标签，我们要给每个 li 标签都添加一个点击事件。如果循环列表，然后分别添加点击事件。这种做法非常消耗内存的

**思考：**
这个时候思考一下事件模型：是不是可以利用事件模型中的冒泡来实现这个需求呢？  
将点击事件绑定在 li 标签的父级，当我们点击 li 标签是，在冒泡阶段就会触发 li 标签上一层的点击事件，这也算是变相给 li 标签添加了点击事件

```html
<body>
  <ul id="ul">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
</body>
<script>
  // 事件委托
  let ul = document.getElementById('ul')
  ul.addEventListener('click', ulClick)
  function ulClick(e) {
    // 兼容性处理
    let event = e || window.event
    let target = event.target || event.srcElement
    // 判断是否匹配目标元素
    if (target.nodeName.toLocaleLowerCase === 'li') {
      console.log('the content is: ', target.innerHTML)
    }
    console.log('li 标签被点击了：', e.target.innerHTML)
  }
</script>
```

#### 兼容性问题

event 兼容性：

- IE 下：event 对象有 srcElement 属性,但是没有 target 属性。
- 火狐或谷歌下：event 对象有 target 属性,但是没有 srcElement 属性。

event || window.event：

- 也是为了兼容 IE

阻止冒泡：

- e.stopPropagation()
- window.event.cancelBubble = true（兼容 IE）
