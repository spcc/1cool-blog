# 常用方法

## 获取链接参数

`window.location.search` 可以获取 url 中 ““?” 问号后面的参数：

```js
window.location.search;
```

然后我们可以再通过 `new URLSearchParams(location.search).get('type')` 方法获取具体某一个参数的值

```js
let type = new URLSearchParams(location.search).get("type");
```

## 对象动态属性

声明对象时，如果属性是动态的，可以这样声明：

```js
const dynamic = "color";
var item = {
  brand: "Ford",
  [dynamic]: "Blue",
};
console.log(item);
// { brand: "Ford", color: "Blue" }
```

## 精简 console.log

全局这样声明，后面再使用 console.log 打印值就方便多啦：

```js
const c = console.log.bind(document);

c(222); // 222
c("hello world"); // hello world
```

## 类数组转数组

什么是类数组？

我们最常见的类数组比如函数的参数 arguments

```js
const fn = function () {
  console.log(arguments);
};

fn("a1", "a2", "a3");
```

类数组的属性为数字、并且还有 length 属性，主要是为了保证 arguments[i] 和 arguments.length 都能拿到值。

将类数组转化为数组我们通常用 call 方法：

```js
Array.prototype.slice.call(arguments);
```

其实也可以用 ... 扩展符实现类数组转数组：

```js
[...arguments];
```
