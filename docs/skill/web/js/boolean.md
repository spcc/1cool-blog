# 布尔值

## Boolean 对象方法

### toString() 把布尔值转换为字符串，并返回结果

- 简介：  
  可把一个逻辑值转换为字符串，并返回结果
- 语法：boolean.toString()
- 参数：无
- 返回值
  - **String**  
    "true" 或者 "false"
- JavaScript 版本: 1.1

```js
let bool = new Boolean(1);
let n = bool.toString();
// 'true'
```

### valueOf() 返回 Boolean 对象的原始值

- 简介：  
  返回 Boolean 对象的原始值
- 语法：boolean.valueOf()
- 参数：无
- 返回值
  - **Boolean**  
    true 或者 false

```js
let bool = new Boolean(0);
let n = bool.valueOf();
// false
```
