# 字符串的扩展

本章介绍 ES6 对字符串的`改造和增强`，下一章介绍字符串对象的`新增方法`。

## 字符串的遍历器接口

ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被 `for...of` 循环遍历。

```js
for (let codePoint of "foo") {
  console.log(codePoint);
}
// "f"
// "o"
// "o"
```

## 模板字符串

### 基础使用

```sh
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`;
// 多行字符串
console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob",
  time = "today";
`Hello ${name}, how are you ${time}?`;
```

### 字符串中使用反引号

在模板字符串中需要使用反引号，则前面要用反斜杠转义。

```js
let greeting = `\`Yo\` World!`;
```

### 取消空格和换行

所有模板字符串的空格和换行，都是被保留的。如果不想要这个换行，可以使用 `trim` 方法消除它

```js
$("#list").html(
  `
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim()
);
```

### 可以放入任意表达式

```js
let x = 1;
let y = 2;

`${x} + ${y} = ${
  x + y
}` // "1 + 2 = 3"
`${x} + ${y * 2} = ${x + y * 2}`;
// "1 + 4 = 5"

let obj = { x: 1, y: 2 };
`${obj.x + obj.y}`;
// "3"
```

### 可以调用函数

```js
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`;
// foo Hello World bar
```

### 模板字符串嵌套

```sh
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```

上面代码中，模板字符串的变量之中，又嵌入了另一个模板字符串，使用方法如下。

```js
const data = [
  { first: "<Jane>", last: "Bond" },
  { first: "Lars", last: "<Croft>" },
];

console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>
```

如果需要引用模板字符串本身，在需要时执行，可以写成函数。

```js
let func = (name) => `Hello ${name}!`;
func("Jack"); // "Hello Jack!"
```
