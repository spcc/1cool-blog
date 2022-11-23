# 常用

## 超出显示省略号

```scss
width: 100px; // 必须要设置一个宽度

// 强制超出不换行
// 超出隐藏
// 文本超出显示成...
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

## 自定义插入光标颜色（caret-color）

通过 `caret-color`属性可以改变光标颜色  
如果不想要展示这个插入光标，可以将 `caret-color` 设置为 `transparent`

<img src="/caret.png" />

```scss
input {
  caret-color: red;
}
```

## 自定义 placeholder 样式（::placeholder）

### 修改 input 的 placeholder 样式

<img src="/placeholder.png" />

::: details 点击查看代码

```scss
input::placeholder {
  color: red;
}
```

:::

### 禁用时 不显示 `placeholder`

::: details 点击查看代码

```scss
input:disabled::placeholder {
  color: transparent;
}
```

:::

## 自定义选中样式（::selection）

只有以下这些 CSS 属性可以用于`::selection 选择器`

- [color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color)
- [background-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color)
- [cursor](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)
- [caret-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/caret-color)
- [outline](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline)
- [text-decoration](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration)
- [text-emphasis-color (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-color)
- [text-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)

<img src="/selection.png" />

::: details 点击查看代码

```scss
::selection {
  background: rgb(91, 60, 146);
  color: #fff;
}
```

:::

## 扩大点击区域

::: details 点击查看代码

```scss
.btn {
  position: relative;
}
.btn::before {
  content: '';
  position: absolute;
  top: -20px;
  right: -20px;
  bottom: -20px;
  left: -20px;
}
```

:::

## 媒介查询

### 大于等于

::: details 点击查看代码

`用 min-width 时，小的放上面大的在下面`

```scss
// >=1024的设备
@media (min-width: 1024px) {
  body {
    font-size: 18px;
  }
}

// >=1280的设备
@media (min-width: 1280px) {
  body {
    font-size: 20px;
  }
}
```

:::

### 小于等于

::: details 点击查看代码

`用max-width那么就是大的在上面，小的在下面`

```scss
// <=1280的设备
@media (max-width: 1280px) {
  body {
    background-color: yellow;
  }
}

// <=740的设备
@media (max-width: 740px) {
  body {
    background-color: red;
  }
}
```

:::

### 区间

::: details 点击查看代码

```scss
// 小于等于1280的屏幕
@media (max-width: 1280px) {
  body {
    background: pink;
  }
}

// 大于等于1281 并且 小于等于 1366的屏幕
@media (min-width: 1281px) and (max-width: 1366px) {
  body {
    background: red;
  }
}

// 大于等于1367 并且 小于等于 1440的屏幕
@media (min-width: 1367px) and (max-width: 1440px) {
  body {
    background: yellow;
  }
}

// 大于等于1441的屏幕
@media (min-width: 1441px) {
  body {
    background: green;
  }
}
```

:::

## 禁止用户选择 & 可以整段选择（user-select）

禁止用户选中内容进行复制，在 CSS 层面可以通过 `user-select: none` 来实现

`user-select` 属性用来控制用户能否选中文本。它可以接收的参数还有 `auto`、`text`、`contain`、`all` 等  
当为 `all` 时，当点击子元素或者上下文时，会全选所有元素

:::details 点击查看代码

```scss
// 可以选择(text)
.text {
  user-select: text;
}

// 不可以选择(none)
.none {
  user-select: none;
}

// 单击其中任意一个元素就会选中所有(all)
.all {
  user-select: all;
}
```

:::

## 让网站变灰（filter:grayscale）

公祭日的时候，浏览网站通常都会把网站整体风格变成灰色的

<img src="/grayscale.png" />

```scss
.grayscale {
  filter: grayscale();
}
```
