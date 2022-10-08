# String 对象

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
  <tr>
    <td><a href="#endsWith-判断当前字符串是否是以指定的字符串结尾">endsWith()</a></th>
    <td>查看字符串是否以指定的子字符串开头</td>
    <td>ECMAScript 6</td>
  </tr>
</table>

## 查找类

### startsWith() 判断当前字符串是否以指定的字符串开头

- 简介：  
  检测字符串是否以指定的子字符串开始  
  如果是以指定的子字符串开头返回 true，否则 false  
  startsWith() 方法对大小写敏感
- 语法：string.startsWith(searchvalue, start)
- 参数：
  - 参数 1：**searchvalue**  
    必需，要查找的字符串
  - 参数 2：**start**  
    可选，查找的开始位置，默认为 0
- 返回值
  - **Boolean**  
    如果字符串是以指定的子字符串开头返回 true，否则 false。
- 注意：  
  区分大小写
- JavaScript 版本: ECMAScript 6

```js
// 查看字符串是否为 "Hello" 开头:
let str = "Hello world, welcome to the Runoob.";
let n = str.startsWith("Hello");
// true

// 查看从第 6 个索引位置是否以 "world" 开头
let str = "Hello world, welcome to the Runoob.";
let n = str.startsWith("world", 6);
// true
```

### endsWith() 判断当前字符串是否是以指定的字符串结尾

- 简介：  
  判断当前字符串是否是以指定的子字符串结尾的（区分大小写）
- 语法：string.endsWith(searchvalue, length)
- 参数：
  - 参数 1：**searchvalue**  
    必需，要搜索的子字符串。
  - 参数 2：**length**  
    设置字符串的长度。默认值为原始字符串长度 string.length。
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

### search() 查找与正则表达式相匹配的值

- 简介：  
  用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。  
  如果没有找到任何匹配的子串，则返回 -1。
- 语法：string.search(searchvalue)
- 参数：
  - 参数 1：**searchvalue**  
    必须。查找的字符串或者正则表达式。
- 返回值

  - **Number**  
    与指定查找的字符串或者正则表达式相匹配的 String 对象起始位置。

- 注意：
- JavaScript 版本: 1.2

```js
// 执行一次对大小写敏感的查找
let str = "Mr. Blue has a blue house";
document.write(str.search("blue"));
// 15

// 执行一次忽略大小写的检索
let str = "Mr. Blue has a blue house";
document.write(str.search(/blue/i));
// 4
```

### slice() 提取字符串的片断，并在新的字符串中返回被提取的部分

- 简介：  
  slice(start, end) 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。  
  使用 start（包含） 和 end（不包含） 参数来指定字符串提取的部分。  
  start 参数字符串中第一个字符位置为 0, 第二个字符位置为 1, 以此类推，如果是负数表示从尾部截取多少个字符串，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。  
  end 参数如果为负数，-1 指字符串的最后一个字符的位置，-2 指倒数第二个字符，以此类推。
- 语法：string.slice(start,end)
- 参数：
  - 参数 1：**start**  
    必须。 要抽取的片断的起始下标，第一个字符位置为 0。如果为负数，则从尾部开始截取。
  - 参数 2：**end**  
    可选。 紧接着要截取的片段结尾的下标。若未指定此参数，则要提取的子串包括 start 到原字符串结尾的字符串。如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
- 返回值

  - **String**  
    提取的字符串

- 注意：
- JavaScript 版本: 1.0

```js
// 提取字符串的片断
let str = "Hello world!";
let n = str.slice(1, 5);
// ello

// 第3个位置提取字符串片段
let str = "Hello world!";
let n = str.slice(3);
// lo world!

// 提取最后一个字符和最后两个字符
let str = "Hello world!";
let n = str.slice(-1);
let n2 = str.slice(-2);
// !
// d!
```

### split() 把字符串分割为字符串数组

- 简介：  
  把一个字符串分割成字符串数组  
   如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割
- 语法：string.split(separator,limit)
- 参数：
  - 参数 1：**separator**  
    可选。字符串或正则表达式，从该参数指定的地方分割 string Object。
  - 参数 2：**limit**  
    可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
- 返回值

  - **Array**  
    一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 string Object 分割成子串创建的。返回的数组中的字串不包括 separator 自身。

- 注意：
- JavaScript 版本: 1.1

```js
// 省略分割参数
let str = "How are you doing today?";
let n = str.split();
// ['How are you doing today?']

let str = "How,are,you,doing,today?";
let n = str.split(",", 3);
// ['How', 'are', 'you']
```

### split() 把字符串分割为字符串数组

- 简介：  
  把一个字符串分割成字符串数组  
   如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割
- 语法：string.split(separator,limit)
- 参数：
  - 参数 1：**separator**  
    可选。字符串或正则表达式，从该参数指定的地方分割 string Object。
  - 参数 2：**limit**  
    可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
- 返回值

  - **Array**  
    一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 string Object 分割成子串创建的。返回的数组中的字串不包括 separator 自身。

- 注意：
- JavaScript 版本: 1.1

```js
// 省略分割参数
let str = "How are you doing today?";
let n = str.split();
// ['How are you doing today?']

let str = "How,are,you,doing,today?";
let n = str.split(",", 3);
// ['How', 'are', 'you']
```

### substr() 从起始索引号提取字符串中指定数目的字符

- 简介：  
  从起始索引号提取字符串中指定数目的字符  
  substr() 的参数指定的是子串的开始位置和长度，因此它可以替代 substring() 和 slice() 来使用  
  ECMAscript 没有对该方法进行标准化，因此反对使用它
- 语法：string.substr(start,length)
- 参数：

  - 参数 1：**start**  
    必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
  - 参数 2：**length**  
    可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。

- 返回值

  - **String**  
    一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 string Object 分割成子串创建的。返回的数组中的字串不包括 separator 自身。

- 注意：substr() 方法不会改变源字符串
- JavaScript 版本: 1.1

```js
// 省略分割参数
let str = "How are you doing today?";
let n = str.split();
// ['How are you doing today?']

let str = "How,are,you,doing,today?";
let n = str.split(",", 3);
// ['How', 'are', 'you']
```

### substring() 提取字符串中两个指定的索引号之间的字符

- 简介：  
  用于提取字符串中介于两个指定下标之间的字符  
  返回的子串包括 开始 处的字符，但不包括 结束 处的字符
- 语法：string.substring(from, to)
- 参数：

  - 参数 1：**from**  
    必需。一个非负的整数，规定要提取的子串的第一个字符在 string Object 中的位置
  - 参数 2：**to**  
     可选。一个非负的整数，比要提取的子串的最后一个字符在 string Object 中的位置多 1。  
     如果省略该参数，那么返回的子串会一直到字符串的结尾

- 返回值

  - **String**

- 注意：substr() 方法不会改变源字符串
- JavaScript 版本:

```js
let str = "Hello world!";

let n = str.substring(3);
// lo world!
let n1 = str.substring(3, 7);
// lo w
```

### toLowerCase() 把字符串转换为小写

- 简介：  
  把字符串转换为小写
- 语法：string.toLowerCase()
- 返回值

  - **String**

- 注意：  
  不会改变原字符串
- JavaScript 版本:

```js
let str = "NIKE";
let n = str.toLowerCase();
// nike
```

### toUpperCase() 把字符串转换为大写

- 简介：  
  把字符串转换为大写
- 语法：string.toUpperCase()
- 返回值

  - **String**

- 注意：  
  不会改变原字符串
- JavaScript 版本:

```js
let str = "nike";
let n = str.toUpperCase();
// NIKE
```

### toLocaleLowerCase() 根据本地主机的语言环境把字符串转换为小写

- 简介：  
  根据本地主机的语言环境把字符串转换为小写  
  本地是根据浏览器的语言设置来判断的  
  通常，该方法与 toLowerCase() 方法返回的结果相同，只有几种语言（如土耳其语）具有地方特有的大小写映射
- 语法：string.toLocaleLowerCase()
- 返回值

  - **String**
    根据本地语言转换为小写。

- 注意：  
  不会改变原字符串
- JavaScript 版本: ECMAScript 1

### toLocaleUpperCase() 根据本地主机的语言环境把字符串转换为大写

- 简介：  
  根据本地主机的语言环境把字符串转换为大写  
  本地是根据浏览器的语言设置来判断的  
  通常，该方法与 toLowerCase() 方法返回的结果相同，只有几种语言（如土耳其语）具有地方特有的大小写映射
- 语法：string.toLocaleUpperCase()
- 返回值

  - **String**
    根据本地语言转换为大写

- 注意：  
  不会改变原字符串
- JavaScript 版本: ECMAScript 1

### trim() 去除字符串两边的空白

- 简介：  
  删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等  
  不会改变原始字符串  
  不适用于 null, undefined, Number 类型
- 语法：string.trim()
- 返回值

  - **String**
    返回移除头尾空格的字符串

- 注意：  
  不会改变原字符串
- JavaScript 版本:  
  ECMAScript 5

```js
let str = " nike      ";
let n = str.trim();
// nike
```

### toString() 返回一个字符串

- 简介：  
  返回一个表示 String 对象的值
- 语法：string.toString()
- 返回值

  - **String**
    一个字符串

- 注意：  
  不会改变原字符串
- JavaScript 版本:  
  ECMAScript 1

```js
let str = "Runoob";
let res = str.toString();
// Runoob
```

### valueOf() 返回某个字符串对象的原始值

- 简介：  
  返回 String 对象的原始值
  通常由 JavaScript 在后台自动进行调用，而不是显式地处于代码中
- 语法：string.valueOf()
- 注意：  
  通常由 JavaScript 在后台自动进行调用，而不是显式地处于代码中
