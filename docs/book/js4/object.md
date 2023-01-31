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
