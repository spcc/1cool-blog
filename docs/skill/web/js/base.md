# 基础

## ?? 与 || 的区别

一般用来赋默认值

`??` 更加适合在不知道变量是否有值时使用

#### 相同点

根据前面的值来判断最终是返回前面的值还是后面的值

- One ?? Two
- One || Two

#### 不同点

判断方式不同：
使用 `??` 时，只有当 **值 1** 为 `null` 或 `undefined` 时才返回 **值 2**  
使用 `||` 时，**值 1** 会转换为[布尔值](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)判断，为 `true` 返回**值 1**，`false` 返回**值 2**

::: details 点击查看代码

```js
// ??
undefined ?? 2; // 2
null ?? 2; // 2
0 ?? 2; // 0
"" ?? 2; // ""
true ?? 2; // true
false ?? 2; // false

// ||
undefined || 2; // 2
null || 2; // 2
0 || 2; // 2
"" || 2; // 2
true || 2; // true
false || 2; // 2
```

:::

## 嵌套多层的解构

::: details 点击查看代码

```js
const people = {
  girl: {
    age: 18,
    weight: 100,
  },
  boy: {
    age: 18,
    weight: 150,
  },
};

const {
  girl: { age, weight },
  girl,
  boy,
} = people;
console.log(age, weight); // 18  100
console.log(girl); // {age: 18, weight: 100}
```

:::

## 随机获取字符串

::: details 点击查看代码

```js
console.log(Math.random().toString(36).substr(2, 6)); // a6vasu
```

解释：  
`toString`有个参数 radix, w3c 上描述是：`可选。规定表示数字的基数，使 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。但是要注意，如果该参数是 10 以外的其他值，则 ECMAScript 标准允许实现返回任意值。`  
也就是说当 radix 等于 36 的时候，就会把数字表示为由 `0-9, a-z` 组成的的 36 进制字符串

:::

## 等待多个异步函数

::: details 点击查看代码

日常开发过程中，需要调用多个接口去获取选择项，正常写法是：

```js
async fun1() {
  const res = await http(url1, query2)
}

async fun2() {
  const res = await http(url2, query2)
}

fun1()
fun2()
```

可以用 promise.all 去 await 多个 async 函数，例如：

```js
async fun() {
  await promise.all([fun1, fun2])
}
```

:::

## Object.prototype.toString.call 代替 typeOf 判断类型

::: details 点击查看代码

使用：

```js
const realTypeOf = (context) => {
  return Object.prototype.toString
    .call(context)
    .match(/(\w+)\]$/)[1]
    .toLowerCase();
};

console.log(realTypeOf({ a: 1 })); // object
console.log(realTypeOf([1, 2, 3])); // array
```

typeOf 能否准确的判断类型呢？答案是否定的，例如：

```js
console.log(typeof { a: 1 }); // object
console.log(typeof [1, 2]); // object
```

所以需要 `Object.prototype.toString.call` 判断

```js
console.log(Object.prototype.toString.call({ a: 1 })); // [object object]
console.log(Object.prototype.toString.call([1, 2, 3])); // [object Array]
```

可以查看`使用`，简写获取类型

:::
