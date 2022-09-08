# 对象 常见问题

## 黑名单（忽略传入属性的对象）

- 参数
  - **object** (Object): 来源对象。
  - **[props]** (...(string|string[])): 要被忽略的属性。（注：单独指定或指定在数组中。）
- 返回值
  - (Object): 返回新对象。
- 地址：[lodash](https://www.lodashjs.com/docs/lodash.pick#_pickobject-props)
- 例子

```js
var object = { a: 1, b: "2", c: 3 };

_.omit(object, ["a", "c"]);
// => { 'b': '2' }
```

## 白名单（选中传入属性的对象）

- 参数
  - **object** (Object): 来源对象。
  - **[props]** (...(string|string[])): 要被忽略的属性。（注：单独指定或指定在数组中。）
- 返回值
  - (Object): 返回新对象。
- 地址：[lodash](https://www.lodashjs.com/docs/lodash.pick#_pickobject-props)
- 例子

```js
var object = { a: 1, b: "2", c: 3 };

_.pick(object, ["a", "c"]);
// => { 'a': 1, 'c': 3 }
```

Object 删除 key
https://m.php.cn/article/477700.html
