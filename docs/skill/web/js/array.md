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
var fruits = ["Banana", "Orange", "Apple", "Mango"];

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
