# 变量的解构赋值

## 数组的解构赋值

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
