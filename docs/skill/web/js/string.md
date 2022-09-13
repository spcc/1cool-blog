# 字符串对象

## 通用

### chatAt() 返回指定位置的字符

- 简介：  
  返回指定位置的字符
- 语法：string.charAt(index)
- 参数：
  - 参数 1：**index**  
    必需。字符在字符串中的下标
- 返回值
  - **String**  
    返回指定位置的字符
- 注意：
- JavaScript 版本: 1.0

```js
// 返回字符串中的最后一个字符
let str = "HELLO WORLD";
let n = str.charAt(str.length - 1);

// D
```

### charCodeAt() 返回指定的位置的字符的 Unicode 编码

- 简介：  
  charCodeAt() 方法可返回指定位置的字符的 Unicode 编码，返回值是 0 - 65535 之间的整数，表示给定索引处的 UTF-16 代码单元。
- 语法：string.charCodeAt(index)
- 参数：
  - 参数 1：**index**  
    必需。字符在字符串中的下标
- 返回值
  - **Number**  
    返回指定的位置的字符的 Unicode 编码
- 注意：
- JavaScript 版本: 1.2

```js
// 返回字符串中的最后一个字符
let str = "HELLO WORLD";
let n = str.charCodeAt(str.length - 1);

// 68
```

### fromCharCode() 将 Unicode 编码转为字符

- 简介：  
  将 Unicode 编码转为字符。
- 语法：String.fromCharCode(n1, n2, ..., nX)
- 参数：
  - 参数 1：**n1, n2, ..., nX**  
    必需。一个或多个 Unicode 值，即要创建的字符串中的字符的 Unicode 编码。
- 返回值
  - **String**  
    返回代表 Unicode 编码的字符
- 注意：
- JavaScript 版本: 1.2

```js
// 将 Unicode 编码转换为一个字符串:
let n = String.fromCharCode(72, 69, 76, 76, 79);

// HELLO
```

### concat() 连接两个或多个字符串

- 简介：  
  连接两个或更多字符串，并返回新的字符串。该方法没有改变原有字符串。
- 语法：string.concat(string1, string2, ..., stringX)
- 参数：
  - 参数 1：**string1, string2, ..., stringX**  
    必需。将被连接为一个字符串的一个或多个字符串
- 返回值
  - **String**  
     两个或多个字符串连接后生成的新字符串
- 注意：  
  不改变原有字符串
- JavaScript 版本: 1.2

```js
// 连接3个字符串:
let str1 = "Hello ";
let str2 = "world!";
let str3 = " Have a nice day!";
let n = str1.concat(str2, str3);

// Hello world! Have a nice day!
```

### endsWith() 判断当前字符串是否是以指定的子字符串结尾的（区分大小写）

- 简介：  
  判断当前字符串是否是以指定的子字符串结尾的（区分大小写）
- 语法：string.endsWith(searchvalue, length)
- 参数：
  - 参数 1：**searchvalue**  
    必需，要搜索的子字符串。
- 返回值
  - **Boolean**  
    如果字符串以指定的值结尾返回 true，否则返回 false。
- 注意：  
  区分大小写
- JavaScript 版本: ECMAScript 6

```js
// 设置不同字符串长度来判断
let str = "To be, or not to be, that is the question.";
str.endsWith("question."); // true
str.endsWith("to be"); // false
str.endsWith("to be", 19); // true
```

### indexOf() 返回某个指定的字符串值在字符串中首次出现的位置

- 简介：  
  返回某个指定的字符串值在字符串中首次出现的位置。  
  如果没有找到匹配的字符串则返回 -1。
- 语法：string.indexOf(searchvalue,start)
- 参数：
  - 参数 1：**searchvalue**  
    必需。规定需检索的字符串值。
  - 参数 2：**start**  
    可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 string Object.length - 1。如省略该参数，则将从字符串的首字符开始检索。
- 返回值
  - **Number**  
    查找指定字符串第一次出现的位置，如果没找到匹配的字符串则返回 -1。
- 注意：  
  区分大小写
- JavaScript 版本: 1.0

```js
// 在字符串查找字符 "e" 第一次出现的位置:
let str = "Hello world, welcome to the universe.";
let n = str.indexOf("e");

// 1
```

### lastIndexOf() 返回某个指定的字符串值在字符串中首次出现的位置

- 简介：  
  返回某个指定的字符串值在字符串中首次出现的位置。  
  如果没有找到匹配的字符串则返回 -1。
- 语法：string.indexOf(searchvalue,start)
- 参数：
  - 参数 1：**searchvalue**  
    必需。规定需检索的字符串值。
  - 参数 2：**start**  
    可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 string Object.length - 1。如省略该参数，则将从字符串的首字符开始检索。
- 返回值
  - **Number**  
    查找指定字符串第一次出现的位置，如果没找到匹配的字符串则返回 -1。
- 注意：  
  区分大小写
- JavaScript 版本: 1.0

```js
// 在字符串查找字符 "e" 第一次出现的位置:
let str = "Hello world, welcome to the universe.";
let n = str.indexOf("e");

// 1
```
