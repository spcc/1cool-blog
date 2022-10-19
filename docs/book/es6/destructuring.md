# 变量的解构赋值

## 1. 数组的解构赋值

### 基本用法

`模式匹配`，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo; // 1
bar; // 2
baz; // 3

let [, , third] = ["foo", "bar", "baz"];
third; // "baz"

let [head, ...tail] = [1, 2, 3, 4];
head; // 1
tail; // [2, 3, 4]

// 如果解构不成功，变量的值就等于undefined
let [x, y, ...z] = ["a"];
x; // "a"
y; // undefined
z; // []

// 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
let [a, [b], d] = [1, [2, 3], 4];
a; // 1
b; // 2
d; // 4

// Set 结构，也可以使用数组的解构赋值
let [x, y, z] = new Set(["a", "b", "c"]);
x; // "a"
```

### 默认值

#### 解构赋值允许指定默认值。

```js
let [foo = true] = [];
foo; // true

let [x, y = "b"] = ["a"]; // x='a', y='b'
let [x, y = "b"] = ["a", undefined]; // x='a', y='b'

// 注意：ES6 内部使用严格相等运算符（===），只有当一个数组成员严格等于undefined，默认值才会生效
let [x = 1] = [null]; // null
```

#### 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```js
let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError: y is not defined
```

## 2. 对象解构赋值

### 基本用法

数组的解构取值由它的位置决定；  
对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
let { bar, baz } = { foo: "aaa", bar: "bbb" };
foo; // "aaa"
baz; // "undefined" 如果解构失败，变量的值等于undefined。

// 重命名
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz; // "aaa"
foo; // error: foo is not defined

// 解构对象
const node = {
  loc: {
    start: {
      line: 1,
      column: 5,
    },
  },
};
let {
  loc,
  loc: { start },
  loc: {
    start: { line },
  },
} = node;
// 只有line是变量，loc和start都是模式，不是变量。
line; // 1
loc; // Object {start: Object}
start; // Object {line: 1, column: 5}

// 嵌套赋值
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj; // {prop:123}
arr; // [true]

// 可以取到继承的属性
// 对象obj1的原型对象是obj2。foo属性不是obj1自身的属性，而是继承自obj2的属性，解构赋值可以取到这个属性。
const obj1 = {};
const obj2 = { foo: "bar" };
Object.setPrototypeOf(obj1, obj2);
const { foo } = obj1;
foo; // "bar"

// 可以很方便地将现有对象的方法，赋值到某个变量
const { log } = console;
log("hello"); // hello
```

### 默认值

对象的解构也可以指定默认值。

```js
var { x = 3 } = {};
x; // 3

// 初始化
var { x, y = 5 } = { x: 1 };
x; // 1
y; // 5

// 重命名并初始化
var { x: y = 3 } = {};
y; // 3

// 重命名初始化且有值
var { x: y = 3 } = { x: 5 };
y; // 5

var { message: msg = "Something went wrong" } = {};
msg; // "Something went wrong"
```

默认值生效的条件是，对象的属性值严格等于 `undefined`。

```js
var { x = 3 } = { x: undefined };
x; // 3

var { x = 3 } = { x: null };
x; // null
```

### 注意点

#### 1. 将一个已经声明的变量用于解构赋值，必须非常小心

因为 JavaScript 引擎会将`{x}`理解成一个代码块，从而发生语法错误。

只有不将大括号写在行首，避免 JavaScript 将其解释为代码块。

```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error

// 正确的写法
let x;
({x} = {x: 1});
```

#### 2. 解构赋值允许等号左边的模式之中，允许不放置任何变量名。

表达式虽然毫无意义，但是语法是合法的，可以执行。

```js
({} = [true, false]);
({} = "abc");
({} = []);
```

#### 3. 数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

```js
let arr = [1, 2, 3];
let { 0: first, [arr.length - 1]: last } = arr;
first; // 1
last; // 3
```

## 3. 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = "hello";
a; // "h"
b; // "e"
c; // "l"
d; // "l"
e; // "o"
```

类似数组的对象都有一个 length 属性，因此还可以对这个属性解构赋值。

```js
let { length: len } = "hello";
len; // 5
```

## 4. 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```js
let { toString: s } = 123;
s === Number.prototype.toString; // true

let { toString: s } = true;
s === Boolean.prototype.toString; // true
```

上面代码中，数值和布尔值的包装对象都有 `toString` 属性，因此变量 s 都能取到值。

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于 `undefined` 和 `null` 无法转为对象，所以对它们进行解构赋值，都会报错。

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

## 5. 函数参数的解构赋值

### 基本用法

函数的参数也可以使用解构赋值。

```js
function add([x, y]) {
  return x + y;
}
add([1, 2]); // 3

[
  [1, 2],
  [3, 4],
].map(([a, b]) => a + b);
// [ 3, 7 ]
```

### 默认值

函数参数的解构也可以使用默认值。

```js
function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

注意，下面的写法会得到不一样的结果。

```js
function move({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

上面代码是为函数 `move` 的参数指定默认值，而不是为变量 `x` 和 `y` 指定默认值，所以会得到与前一种写法不同的结果。

`undefined` 就会触发函数参数的默认值。

```js
[1, undefined, 3].map((x = "yes") => x);
// [ 1, 'yes', 3 ]
```

## 6. 圆括号问题

解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，`一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。`

由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

### 不能使用圆括号的情况

以下三种解构赋值不得使用圆括号。

#### 1. 变量声明语句

```js
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
```

上面 6 个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。

#### 2. 函数参数

函数参数也属于变量声明，因此不能带有圆括号。

```js
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
```

#### 3. 赋值语句的模式

```js
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```

上面代码将整个模式放在圆括号之中，导致报错。

```js
// 报错
[({ p: a }), { x: c }] = [{}, {}];
```

上面代码将一部分模式放在圆括号之中，导致报错。

### 可以使用圆括号的情况

可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

```sh
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是 `p`，而不是 `d`；第三行语句与第一行语句的性质一致。

## 7. 用途

变量的解构赋值用途很多。

### 1. 交换变量的值，业务场景字段重命名

```js
let x = 1;
let y = 2;

[x, y] = [y, x];
```

### 2. 业务场景字段重命名

```js
let data = {
  name: "cc",
  children: [
    {
      age: 18,
    },
    {
      age: 17,
    },
  ],
};

let { name: xingMing, children: ziJi } = data;
```

### 3. 函数返回多个值

```js
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2,
  };
}
let { foo, bar } = example();
```

### 4. 函数参数的定义

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

### 5. 函数参数的默认值

```js
jQuery.ajax = function (
  url,
  {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ... more config
  } = {}
) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写 `var foo = config.foo || 'default foo';`这样的语句。

### 6. 提取 JSON 数据

解构赋值对提取 JSON 对象中的数据，尤其有用。

```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309],
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

### 7. 遍历 Map 结构

任何部署了 Iterator（迭代器） 接口的对象，都可以用 `for...of` 循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```js
const map = new Map();
map.set("first", "hello");
map.set("second", "world");

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```js
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [, value] of map) {
  // ...
}
```

### 8. 输入模块的指定方法

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```
