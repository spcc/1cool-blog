# Array 对象

[数组对象方法](https://www.runoob.com/jsref/jsref-obj-array.html)

查找类

<table>
  <tr>
    <th>方法</th>
    <th>描述</th>
    <th>版本</th>
  </tr>

  <tr>
    <td><a href="#startsWith() 判断当前字符串是否以指定的字符串开头">startsWith()</a></th>
    <td>判断当前字符串是否以指定的字符串开头</td>
    <td>ECMAScript 6</td>
  </tr>
</table>

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

### slice() - 选取数组的一部分，并返回一个新数组

- 简介：  
  取数组的一部分，并返回一个新数组
- 语法：array.slice(start, end)
- 参数：
  - 参数 1：**start**  
    必需。规定从何处开始选取。必须是数字。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
  - 参数 2：**end**  
    可选。规定从何处结束选取。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果该参数为负数，则它表示在原数组中的倒数第几个元素结束抽取。
- 返回值
  - **Array**  
    返回一个新的数组，包含从 start（包括该元素） 到 end （不包括该元素）的 arrayObject 中的元素。
- 注意：
  不会改变原数组
- JavaScript 版本: 1.2

```js
// 从第二个index删除一个元素，并增加两个元素
let fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];

let myBest1 = fruits.slice(-3, -1); // 截取倒数第三个（包含）到倒数第一个（不包含）的两个元素
// Lemon,Apple
let myBest2 = fruits.slice(1, 2); // 截取第一个（包含）到第二个（不包含）元素
// Banana
```

### unshift() - 向数组的开头添加一个或多个元素，并返回新的长度

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

## 循环类

### forEach() - 数组每个元素都执行一次回调函数

- 简介：  
  调用数组的每个元素，并将元素传递给回调函数
  如果纯粹只是遍历数组，那么，可以用 forEach() 方法  
  如果是遍历数组的同时，去改变数组里的元素内容，最好是用 map() 方法来做
- 语法：array.forEach((currentValue, index, arr) => {}, thisValue)
- 参数：
  - 参数 1：**(currentValue,index,arr)**  
    必须。函数，数组中的每个元素都会执行这个函数
    函数参数:
    - currentValue 必须。当前元素的值
    - index 可选。当前元素的索引值
    - arr 可选。当前元素属于的数组对象
  - 参数 2：**thisValue**  
    可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。  
    如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。
- 返回值
  - **undefined**
- 注意：
  1. 对于空数组，函数是不会执行的
- JavaScript 版本: ECMAScript 3

#### 不能改变原数组 和 能改变的场景

```js
/**
 * 场景：
 * 最后：item 会新开辟的一个内存，直接改变栈内存是不会有效果的，改变堆内存有效果
 * 使用场景：如果纯粹只是遍历数组，那么，可以用 forEach() 方法
 *       如果是遍历数组的同时，去改变数组里的元素内容，最好是用 map() 方法来做
 */
// 1、数组的元素是基本数据类型（无法改变原数组）
let numArr = [1, 2, 3];
numArr.forEach((item) => (item = item * 2));
console.log(numArr); // 打印结果：[1, 2, 3]

// 2、数组的元素是引用数据类型：（直接修改整个元素对象时，无法改变原数组）
let objArr = [
  { name: "云牧", age: 20 },
  { name: "许嵩", age: 30 },
];
objArr.forEach((item) => {
  item = {
    name: "邓紫棋",
    age: "29",
  };
});
console.log(JSON.stringify(objArr));
// 打印结果：[{"name": "云牧","age": 20},{"name": "许嵩","age": 30}]

// 3.数组的元素是引用数据类型：（修改元素对象里的某个属性时，可以改变原数组）
let objArr = [
  { name: "云牧", age: 28 },
  { name: "许嵩", age: 30 },
];
objArr.forEach((item) => (item.name = "邓紫棋"));
console.log(JSON.stringify(objArr));
// 打印结果：[{"name":"邓紫棋","age":28},{"name":"邓紫棋","age":30}]

/**
 * 如果想更改，可以通过原数组更改，但建议用map
 */
let numArr = [1, 2, 3];
numArr.forEach((item, index, arr) => (arr[index] = arr[index] * 2));
console.log(numArr); // 打印结果：[1, 2, 3]
```

#### continue 与 break

forEach() 本身是不支持的 continue 与 break 语句的，我们可以通过 some 和 every 来实现。

使用 return 语句实现 continue 关键字的效果：

##### continue 实现

```js
let arr = [1, 2, 3, 4, 5];
arr.forEach(function (item) {
  if (item === 3) return;
  console.log(item);
});
// 1 2 4 5

// 不能为return false
let arr = [1, 2, 3, 4, 5];
arr.forEach(function (item) {
  if (item === 3) return false;
  console.log(item);
});
// 1 2 4 5 false
```

##### break 实现

```js
let arr = [1, 2, 3, 4, 5];
arr.every(function (item) {
  console.log(item);
  return item !== 3;
});
// 1 2 3 false
```

### map() - 处理数组的每个元素，并返回处理后的数组

- 简介：  
  处理数组的每个元素，并返回处理后的数组
- 语法：array.map((currentValue,index,arr) => {}, thisValue)
- 参数：
  - 参数 1：**(currentValue,index,arr)**  
    必须。函数，数组中的每个元素都会执行这个函数
    函数参数:
    - currentValue 必须。当前元素的值
    - index 可选。当前元素的索引值
    - arr 可选。当前元素属于的数组对象
  - 参数 2：**thisValue**  
    可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。  
    如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。
- 返回值
  - **Array**  
    返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
- 注意：
  1. 不会改变原数组
  2. 对于空数组，函数是不会执行的
- JavaScript 版本: 1.6

```js
// 获取数组元素的2倍
let numbers = [4, 9, 16, 25];
let multiple = numbers.map((item) => item * 2);
// [8, 18, 32, 50]
```

## 查找类

### filter() - 返回符合条件所有元素的数组

- 简介：  
  返回符合条件 **的所有元素** 的**数组**
- 语法：array.filter((currentValue, index, arr) => {},thisValue)
- 参数：
  - 参数 1：**function(currentValue, index,arr)**  
    必需。函数，数组中的每个元素都会执行这个函数
    函数参数:
    - currentValue：必需。当前元素
    - index：可选。当前元素的索引值
    - arr：可选。当前元素所属的数组对象
  - 参数 2：**thisValue**  
    可选。 传递给函数的值一般用 "this" 值。
    如果这个参数为空， "undefined" 会传递给 "this" 值
- 返回值
  - 返回数组，包含了符合条件的所有元素。如果没有符合条件的元素则返回空数组
- 注意：
  1. 不会改变原数组
  2. 对于空数组，函数是不会执行的
  3. 如果没有符合条件的元素返回 **[] 空数组**
- JavaScript 版本: 1.6

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
let returnValue = fruits.filters((item, index) => item === "Apple");
// returnValue：["Apple"]
// fruits：["Banana", "Orange", "Apple","Mango"]
```

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
  4. 如果没有符合条件的元素返回 undefined
- JavaScript 版本: ECMAScript 6

```js
// 从第二个index删除一个元素，并增加两个元素
let fruits = ["Banana", "Orange", "Apple", "Mango"];

let returnValue = fruits.find((item, index) => item === "Apple");
// returnValue：["Apple"]
// fruits：["Banana", "Orange", "Apple","Mango"]
```

### findIndex() - 返回符合传入测试条件的第一个数组元素索引

- 简介：  
  返回符合传入测试条件的第一个数组元素索引
- 语法：array.findIndex((currentValue, index, arr) => {},thisValue)
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
  - **Number**  
    返回符合测试条件的第一个数组元素索引，如果没有符合条件的则返回 -1
- 注意：
  1. 不会改变原数组
  2. 对于空数组，函数是不会执行的
  3. 当数组中的元素在测试条件时返回 true 时，之后的值不会再调用执行函数。
  4. 如果没有符合条件的元素返回 -1
- JavaScript 版本: ECMAScript 6

```js
// 从第二个index删除一个元素，并增加两个元素
let fruits = ["Banana", "Orange", "Apple", "Mango"];
let returnValue = fruits.findIndex((item, index) => item === "Apple");
// returnValue：2
```

### indexOf() - 搜索数组中的元素，并返回它第一次出现的位置

- 简介：  
  搜索数组中的元素，并返回它第一次出现的位置  
  如果要检索的元素没有出现，则该方法返回 -1  
  数组索引从 0 开始
- 语法：array.indexOf(item,start)
- 参数：
  - 参数 1：**item**  
    必需。规定需检索的字符串值
  - 参数 2：**start**  
    可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的最后一个字符处开始检索。  
    从第几个往前检索
- 返回值
  - **Number**  
    返回第一次出现的位置，如果没有搜索到则返回 -1
- JavaScript 版本: 1.6

```js
// 显示Apple第一次出现的位置
let fruits = ["Banana", "Orange", "Apple", "Apple", "Mango"];
let appleIndex = fruits.indexOf("Apple");
// 2

// 显示Apple在index 4 以后的Apple最后一次出现位置
let fruits = [
  "Banana",
  "Orange",
  "Apple",
  "Mango",
  "Banana",
  "Orange",
  "Apple",
  "Mango",
];
var a = fruits.indexOf("Apple", 4);
// 6
```

### lastIndexOf() - 搜索数组中的元素，并返回它最后出现的位置

- 简介：  
  返回一个指定的元素在数组中最后出现的位置，从该字符串的后面向前查找  
  如果要检索的元素没有出现，则该方法返回 -1  
  数组索引从 0 开始
- 语法：array.lastIndexOf(item,start)
- 参数：
  - 参数 1：**item**  
    必需。规定需检索的字符串值
  - 参数 2：**start**  
    可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的最后一个字符处开始检索。  
    从第几个往前检索
- 返回值
  - **Number**  
    返回最后出现的位置，如果没有搜索到则返回 -1
- JavaScript 版本: 1.6

```js
// 显示Apple最后一次出现的位置
let fruits = ["Banana", "Orange", "Apple", "Apple", "Mango"];
let appleIndex = fruits.lastIndexOf("Apple");
// 3

// 显示Apple在index 4 以前的Apple最后一次出现位置
let fruits = ["Banana", "Orange", "Apple", "Apple", "Mango"];
var a = fruits.lastIndexOf("Apple", 4);
// 3
```

### includes() - 判断一个数组是否包含一个指定的值

- 简介：  
  判断一个数组是否包含一个指定的值
- 语法：arr.includes(searchElement, fromIndex)
- 参数：
  - 参数 1：**searchElement**  
    必须。需要查找的元素值
  - 参数 2：**fromIndex**  
    可选。从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。
- 返回值
  - **Boolean**  
    如果找到指定值返回 true，否则返回 false。
- JavaScript 版本: ECMAScript 6

```js
[1, 2, 3].includes(2);
// true

// 从第index 2开始进行查找
[1, 2, 3].includes(2, 2);
// false

// 从第index 2开始进行查找
// 数组长度4，fromIndex 计算后等于
/// 4 + (-2) = 2
[1, 2, 3, 4].includes(2, -2);
// true

[1, 2, NaN].includes(NaN);
// true
```

### some() - 检测数组中的元素是否满足指定条件

- 简介：  
  检测数组中的元素是否满足指定条件
- 语法：array.some((currentValue, index, arr) => {},thisValue)
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
  - **Boolean**
  - 如果数组中有元素满足条件返回 true，否则返回 false
- 注意：
  1. 不会改变原数组
  2. 对于空数组，函数是不会执行的
  3. 当数组中的元素在测试条件时返回 true 时，之后的值不会再调用执行函数。
  4. 如果没有符合条件的元素返回 false
- JavaScript 版本: ECMAScript 6

```js
// 检测数组中是否有元素大于 18
let ages = [3, 10, 18, 20];
let returnValue = ages.some((item) => item >= 18);

// returnValue
true;
```

### every() - 检测数组的每个元素是否都符合条件

- 简介：  
  检测数组所有元素是否都符合指定条件  
  如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
  如果所有元素都满足条件，则返回 true。
- 语法：array.every((currentValue, index, arr) => {},thisValue)
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
  - **Boolean**
  - 如果所有元素都通过检测返回 true，否则返回 false
- 注意：
  1. 不会改变原数组
  2. 对于空数组，函数是不会执行的
  3. 如果数组中检测到有一个元素不满足，剩余的元素不会再进行检测。
- JavaScript 版本: 1.6

```js
// 检测数组中是否有元素大于 18
let ages = [3, 10, 18, 20];
let returnValue = ages.every((item) => item > 18);

// returnValue
false;
```

## 通用

### sort() 对数组的元素进行排序

- 简介：  
  对数组的元素进行排序  
  排序顺序可以是字母或数字，并按升序或降序  
  默认排序顺序为按字母升序，按字母顺序排列时数字"40"将排在数字"5"前面
- 语法：array.sort(sortfunction)
- 参数：
  - 参数 1：**sortfunction**  
    可选。规定排序顺序。必须是函数。
- 返回值
  - **Array**  
    对数组的引用。请注意，数组在原数组上进行排序，不生成副本。
- 注意：
  1. 会改变原数组
  2. 当数字是按字母顺序排列时"40"将排在"5"前面。
- JavaScript 版本: 1.1

```js
// 数字排序升序
let ages = [40, 100, 1, 5, 25, 10];
ages.sort((a, b) => a - b);

// 数字排序降序
let ages = [40, 100, 1, 5, 25, 10];
ages.sort((a, b) => b - a);

// 字母升序
let fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort();

// 字母降序 （先升序，在反转就是降序）
fruits.sort();
fruits.reverse();
```

### reverse() 反转数组的元素顺序

- 简介：  
  反转数组的元素顺序
- 语法：array.reverse()
- 返回值
  - **Array**  
    颠倒顺序后的数组
- 注意：
  会改变原数组
- JavaScript 版本: 1.1

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.reverse();
// Mango,Apple,Orange,Banana
```

### join() 把数组中的所有元素转换一个字符串

- 简介：  
  把数组中的所有元素转换一个字符串
- 语法：array.join(separator)
- 返回值
  - **String**  
    返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，然后把这些字符串连接起来，在两个元素之间插入 separator 字符串而生成的。
- 注意：
  不会改变原数组
- JavaScript 版本: 1.1

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
let fruitsString = fruits.join();
// 'Banana,Orange,Apple,Mango'

let fruits = ["Banana", "Orange", "Apple", "Mango"];
let fruitsString = fruits.join(" and ");
// 'Banana and Orange and Apple and Mango'
```

### isArray() 判断对象是否为数组

- 简介：  
  判断对象是否为数组
  如果对象是数组返回 true，否则返回 false。
- 语法：Array.isArray(obj)
- 返回值
  - **obj**  
    必需，要判断的对象
- JavaScript 版本: ECMAScript 5

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
let fruitsString = fruits.join();
// 'Banana,Orange,Apple,Mango'

let fruits = ["Banana", "Orange", "Apple", "Mango"];
let fruitsString = fruits.join(" and ");
// 'Banana and Orange and Apple and Mango'
```

### from() 通过给定的对象中创建一个数组

- 简介：  
  用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组
- 语法：Array.from(object, mapFunction, thisValue)
- 参数：
  - 参数 1：**object**  
    必需，要转换为数组的对象。
  - 参数 2：**mapFunction**  
    可选，数组中每个元素要调用的函数。
  - 参数 3：**thisValue**  
    可选，映射函数(mapFunction)中的 this 对象。
- 返回值
  - **Array**
- JavaScript 版本: ECMAScript 6

```js
// 字符串转数组
let str = "abc";
let arr = Array.from(str);
// ['a', 'b', 'c']

// 数组去重
let arr = Array.from(new Set([1, 2, 1, 2]));
// [1, 2]

// 伪数组转换为数组，伪数组必须要有length
let obj = {
  0: 1, //'0':1中的'0'将转换为下标0,下面的key同理
  1: 2,
  2: 3,
  length: 4, // length规定了转换的数组有多长
};
let newObj = Array.from(obj, (item) => item);
// [1, 2, 3, undefined]

// 填充空值
let nullObject = Array.from({ length: 3 }, () => ({}));
// [{},{},{}]
let nullNumber = Array.from({ length: 3 }, () => 1);
// [1,1,1]
const data = Array.from({ length: 1000 }, (item, index) => ({
  name: `name${index + 1}`,
}));
// 批量制造一组假数据

// 生成数字范围
let numberRange = Array.from({ length: 3 }, (_, index) => index);
// [0, 1, 2]

// 浅拷贝一个数组
const a = [1, 2, 3];
const b = Array.from(a);
b[1] = "cc";
// a [1, 2, 3]
// b [1, 'cc', 3]
```

### fill() 使用一个固定值来填充数组

- 简介：  
  用于将一个固定值替换数组的元素
- 语法：array.fill(value, start, end)
- 参数：
  - 参数 1：**value**  
    必需。填充的值。
  - 参数 2：**start**  
    可选。开始填充位置。
  - 参数 3：**end**  
    可选。停止填充位置 (默认为 array.length)
- 返回值
  - **Array**
- 注意：
  1. IE 11 及更早版本不支持 fill() 方法
  2. 会改变原数组
- JavaScript 版本: ECMAScript 6

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("Runoob");
// fruits：['Runoob', 'Runoob', 'Runoob', 'Runoob']

let fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("Runoob", 2, 4);
// fruits：['Banana', 'Orange', 'Runoob', 'Runoob']
```

### copyWithin() 从数组的指定位置拷贝元素到数组的另一个指定位置中

- 简介：  
  从数组的指定位置拷贝元素到数组的另一个指定位置中
- 语法：array.copyWithin(target, start, end)
- 参数：
  - 参数 1：**target**  
    必需。复制到指定目标索引位置。
  - 参数 2：**start**  
    可选。元素复制的起始位置。
  - 参数 3：**end**  
    可选。停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数
- 返回值
  - **Array**
- 注意：
- JavaScript 版本: ECMAScript 6

```js
// 复制数组的前面两个元素到第三和第四个位置上：
let fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi", "Papaya"];
fruits.copyWithin(2, 0, 2);
// Banana,Orange,Banana,Orange,Kiwi,Papaya
```

### concat() 连接两个或更多的数组，并返回结果

- 简介：  
  连接两个或更多的数组，并返回结果  
  该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
- 语法：array1.concat(array2,array3,...,arrayX)
- 参数：
  - 参数 1：**array2, array3, ..., arrayX**  
    必需。该参数可以是具体的值，也可以是数组对象。可以是任意多个。
- 返回值
  - **Array**
    返回一个新的数组。该数组是通过把所有 arrayX 参数添加到 arrayObject 中生成的。如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
- 注意：
- JavaScript 版本: 1.2

```js
let hege = ["Cecilie", "Lone"];
let stale = ["Emil", "Tobias", "Linus"];
let children = hege.concat(stale);
// children： Cecilie,Lone,Emil,Tobias,Linus
```
