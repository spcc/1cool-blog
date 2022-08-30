# 数组

[数组对象方法](https://www.runoob.com/jsref/jsref-obj-array.html)

## 操作类

### splice() - 从数组中添加或删除元素

- 简介：  
  用于把数组的第一个元素从其中删除，并返回已删除第一个元素的值。
- 语法：array.splice(index, howmany, item1, ....., itemX)
- 参数：
  - 参数 1：**index**  
    必需。规定从数组元素的下标添加/删除元素。必须是数字。
  - 参数 2：**howmany**  
    可选。规定应该删除多少元素。必须是数字，但可以是 "0"。如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。
  - 参数 3：**item1, ..., itemX**  
    可选。要添加到数组的新元素
- 返回值
  - **Array**  
    返回含有被删除的元素
- 注意：  
  会改变原数组
- JavaScript 版本: 1.2

```js
// 从第二个index删除一个元素，并增加两个元素
let fruits = ["Banana", "Orange", "Apple", "Mango"];

let returnValue = fruits.splice(2, 1, "Lemon", "Kiwi");
// returnValue：["Apple"]
// fruits：["Banana", "Orange", "Lemon", "Kiwi", "Mango"]
```

### push() - 向数组的开头添加一个或多个元素，并返回新的长度

- 简介：  
  向数组的开头添加一个或多个元素，并返回新的长度
- 语法：array.unshift(item1, item2, ..., itemX)
- 参数：
  - 参数 1：**item1, item2, ..., itemX**  
    可选。要添加到数组的元素(可以是字符串，对象等)。
- 返回值
  - **Number**  
    数组新长度
- 注意：  
  会改变原数组
- JavaScript 版本: 1.2

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
let fruitsLength = fruits.push("Kiwi", "Mike");

// fruits：["Orange", "Apple", "Mango", "Kiwi", "Mike"]
// fruitsLength：6
```

### push() - 向数组的末尾添加一个或多个元素，并返回新的长度

- 简介：  
  向数组的末尾添加一个或多个元素，并返回新的长度
- 语法：array.push(item1, item2, ..., itemX)
- 参数：
  - 参数 1：**item1, item2, ..., itemX**  
    可选。要添加到数组的元素(可以是字符串，对象等)。
- 返回值
  - **Number**  
    数组新长度
- 注意：  
  会改变原数组
- JavaScript 版本: 1.2

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
let fruitsLength = fruits.push("Kiwi", "Mike");

// fruits：["Orange", "Apple", "Mango", "Kiwi", "Mike"]
// fruitsLength：6
```

### shift() - 删除数组的第一个元素并返回删除的元素

- 简介：  
  用于把数组的第一个元素从其中删除，并返回已删除第一个元素的值。
- 语法：array.shift()
- 返回值
  - **任何类型（\*）**  
    已删除第一个元素
- 注意：  
  会改变原数组

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
let result = fruits.shift();

// fruits：["Orange", "Apple", "Mango"]
// result：["Banana"]
```

### pop() - 删除数组的最后一个元素并返回删除的元素

- 简介：  
  array.pop()
- 语法：array.push(item1, item2, ..., itemX)
- 返回值
  - **任何类型（\*）**  
    已删除最后一个元素
- 注意：  
  会改变原数组
- JavaScript 版本: 1.2

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
let result = fruits.pop();

// fruits：["Banana", "Orange", "Apple"]
// result：["Mango"]
```

## 查找类

### find() - 返回符合传入测试条件的第一个数组元素

- 简介：  
  返回符合传入测试条件的第一个数组元素
- 语法：array.find((currentValue, index, arr) => {},thisValue)
- 参数：
  - 参数 1：**function(currentValue, index,arr)**  
    必需。数组每个元素需要执行的函数。  
    函数参数:
    - currentValue：必需。当前元素
    - index：可选。当前元素的索引值
    - arr：可选。当前元素所属的数组对象
  - 参数 2：**thisValue**  
    可选。 传递给函数的值一般用 "this" 值。
    如果这个参数为空， "undefined" 会传递给 "this" 值
- 返回值
  - 返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回 undefined。
- 注意：
  1. 不会改变原数组
  2. 对于空数组，函数是不会执行的
  3. 当数组中的元素在测试条件时返回 true 时，之后的值不会再调用执行函数。
- JavaScript 版本: ECMAScript 6

```js
// 从第二个index删除一个元素，并增加两个元素
let fruits = ["Banana", "Orange", "Apple", "Mango"];

let returnValue = fruits.find((item, index) => item === "Apple");
// returnValue：["Apple"]
// fruits：["Banana", "Orange", "Apple","Mango"]
```
