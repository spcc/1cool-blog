# 对象 常见问题

## 判断对象是否是空

对象判空小技巧，使用 `Object.keys({})`

```js
Object.keys({}).length; // 0
Object.keys({ key: 1 }).length; // 1
```

## 对象操作

### 批量置空对象所有属性

```js
let person = {
  name: "张三",
  age: 18,
};

Object.values(person).forEach((item, index) => {
  person[Object.keys(person)[index]] = null;
});
```

### 批量置空对象所有属性，不改变原对象

```js
let person = {
  name: "张三",
  age: 18,
};

// 新对象，不对原对象处理
let dataObj = {};

Object.values(person).forEach((item, index) => {
  dataObj[Object.keys(person)[index]] = null;
});
```

### 批量去除对象里的所有假值

```js
let tempData = {
  address: "aa",
  afternoon_inspection: "dd",
  alert: "sdd",
  apply_back_comment: null,
  apply_back_time: "单独",
  audit_comment: "sdd",
  audit_time: "sss",
  back_audit_time: "ff",
  back_comment: "",
  back_time: null,
  build_area: "",
  build_type: null,
  charge_man: "",
  child_insurance: null,
  child_num: "",
};
//目的是将对象里的null全部替换成''，并返回改变之后的对象

let dataObj = {}; //用心对象去接收原来对象里的值
Object.values(tempData).filter((item, index) => {
  if (typeof item == "string" && item.indexOf("null") != -1) {
    item = item.replace("null", "");
    dataObj[Object.keys(tempData)[index]] = item;
  } else {
    dataObj[Object.keys(tempData)[index]] = item;
  }
});
```

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
