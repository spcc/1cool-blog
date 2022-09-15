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

### lastIndexOf() 从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。

- 简介：  
  返回一个指定的字符串值最后出现的位置，如果指定第二个参数 start，则在一个字符串中的指定位置从后向前搜索。
  如果没有找到匹配的字符串则返回 -1。
- 语法：string.lastIndexOf(searchvalue,start)
- 参数：
  - 参数 1：**searchvalue**  
    必需。规定需检索的字符串值。
  - 参数 2：**start**  
    可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 string Object.length - 1。如省略该参数，则将从字符串的首字符开始检索。
- 返回值
  - **Number**  
    查找指定字符串第一次出现的位置，如果没找到匹配的字符串则返回 -1。
- 注意：

  - 区分大小写
  - 该方法将从后向前检索字符串，但返回是从起始位置 (0) 开始计算子字符串最后出现的位置。 看它是否含有字符串。开始检索的位置在字符串的 start 处或字符串的结尾（没有指定 start 时）。

- JavaScript 版本: 1.0

```js
// 查找字符串 "runoob" 最后出现的位置:
let str = "I am from runoob，welcome to runoob site.";
let n = str.lastIndexOf("runoob");
// 28

// 从第 20 个字符开始查找字符串 "runoob" 最后出现的位置,：
let str = "I am from runoob，welcome to runoob site.";
let n = str.lastIndexOf("runoob", 20);
// 10

// 从第 10 个字符开始从后向前查找字符串 "runoob" 最后出现的位置：
let str = "I am from runoob，welcome to runoob site.";
let n = str.lastIndexOf("runoob", 9);
// -1
```

### includes() 查找字符串中是否包含指定的子字符串。

- 简介：  
  判断字符串是否包含指定的子字符串  
  如果找到匹配的字符串则返回 true，否则返回 false
- 语法：string.includes(searchvalue, start)
- 参数：
  - 参数 1：**searchvalue**  
    必需，要查找的字符串。
  - 参数 2：**start**  
    可选，设置从那个位置开始查找，默认为 0。
- 返回值
  - **Boolean**  
    如果找到匹配的字符串返回 true，否则返回 false。
- 注意：  
  字符串 和 数组 通用这个方法
- JavaScript 版本: ECMAScript 6

```js
let str = "Hello world, welcome to the Runoob。";

let n1 = str.includes("Runoob");
// true
let n2 = str.includes("world", 12);
// false
```

### match() 查找找到一个或多个正则表达式的匹配

- 简介：  
  在字符串内检索指定的值，或找到一个或多个正则表达式的匹配  
  如果想了解更多正则表达式教程请查看： [RegExp](https://www.runoob.com/js/js-obj-regexp.html) 教程 和 [RegExp](https://www.runoob.com/jsref/jsref-obj-regexp.html) 对象参考手册。
- 语法：string.match(regexp)
- 参数：
  - 参数 1：**regexp**  
     必需。规定要匹配的模式的 RegExp 对象。如果该参数不是 RegExp 对象，则需要首先把它传递给 RegExp 构造函数，将其转换为 RegExp 对象。
- 返回值
  - **Array**  
    存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。 如果没找到匹配结果返回 null 。
- 注意：  
  match() 方法将检索字符串 String Object，以找到一个或多个与 regexp 匹配的文本。这个方法的行为在很大程度上有赖于 regexp 是否具有标志 g。如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。
- JavaScript 版本: 1.2

```js
// 在字符串中查找 "ain":
let str = "The rain in SPAIN stays mainly in the plain";
let n = str.match(/ain/g);
// 数组：ain,ain,ain

// 全局查找字符串 "ain"，且不区分大小写:
let str = "The rain in SPAIN stays mainly in the plain";
let n = str.match(/ain/gi);
// 数组：ain,AIN,ain,ain

// 判断是否微信浏览器:
function is_weixn() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}
```

### repeat() 复制字符串指定次数，并将它们连接在一起返回

- 简介：  
  字符串复制指定次数
- 语法：string.repeat(count)
- 参数：
  - 参数 1：**count**  
    必需，设置要复制的次数。
- 返回值

  - **String**  
    返回复制指定次数并连接在一起的字符串。

- 注意：不会改变原字符串
- JavaScript 版本: ECMAScript 6

```js
// 复制字符串 "Runoob" 两次:
let str = "Runoob";
let n = str.repeat(2);
// n：RunoobRunoob
```

### replace() 在字符串中查找匹配的子串，并替换与正则表达式匹配的子串

- 简介：  
  在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串  
  该方法不会改变原始字符串
- 语法：string.replace(searchvalue,newvalue)
- 参数：
  - 参数 1：**searchvalue**  
    必须。规定子字符串或要替换的模式的 RegExp 对象。
    请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。
  - 参数 2：**newvalue**
    必需。一个字符串值。规定了替换文本或生成替换文本的函数。
- 返回值

  - **String**  
    一个新的字符串，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的

- 注意：不会改变原字符串
- JavaScript 版本: 1.2

```js
// 默认只替换首次出现的
let str = "Visit Microsoft! Visit Microsoft!";
let n = str.replace("Microsoft", "Runoob");
// Visit Runoob!Visit Microsoft!

// 全局替换
let str = "Mr Blue has a blue house and a blue car";
let n = str.replace(/blue/g, "red");
// Mr Blue has a red house and a red car

// 全局替换, 忽略大小写
let str = "Mr Blue has a blue house and a blue car";
let n = str.replace(/blue/gi, "red");
// Mr red has a red house and a red car
```

### replaceAll() 在字符串中查找匹配的子串，并替换与正则表达式匹配的所有子串

- 简介：  
  replaceAll() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串，该函数会替换所有匹配到的子字符串  
  该方法不会改变原始字符串
- 语法：const newStr = str.replaceAll(regexp|substr, newSubstr|function)
- 参数：
  - 参数 1：**regexp|substr**  
    请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。当使用一个 regex 时，您必须设置全局（"g"）标志， 否则，它将引发 TypeError："必须使用全局 RegExp 调用 replaceAll"。
  - 参数 2：**newvalue**
    必需。一个字符串值。规定了替换文本或生成替换文本的函数。
- 返回值

  - **String**  
    一个新的字符串，是用 newSubstr 替换了 regexp 的所有匹配之后得到的

- 注意：
  1. 不会改变原字符串
  2. 不支持 IE 浏览器
- JavaScript 版本: 1.2

```js
// 将所有 "Microsoft" 替换为 "Runoob"
let str = "Visit Microsoft! Visit Microsoft!";
let n = str.replaceAll("Microsoft", "Runoob");
// Visit Runoob!Visit Runoob!

// 全局替换
let str = "Mr Blue has a blue house and a blue car";
let n = str.replaceAll(/blue/gi, "red");
// Mr red has a red house and a red car.
```
