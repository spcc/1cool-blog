# 对象的新增方法

## 1. Object.is()

用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

ES5 比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。  
它们都有缺点：

- 前者会自动转换数据类型
- 后者的 NaN 不等于自身，以及+0 等于-0。

所以出了 Object.is,在所有环境中，只要两个值是一样的，它们就应该相等。

```js
Object.is("foo", "foo");
// true
Object.is({}, {});
// false

// 不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
+0 === -0; //true
NaN === NaN; // false

Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
```

## 2. Object.assign()

`Object.assign()` 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

`Object.assign()` 方法的第一个参数是目标对象，后面的参数都是源对象。

```js
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target; // {a:1, b:2, c:3}
```
