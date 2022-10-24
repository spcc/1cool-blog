# 函数的扩展

## 1. 函数默认值

### 惰性求值

参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo(); // 100

x = 100;
foo(); // 101
```

上面代码中，参数 `p` 的默认值是 `x + 1`。这时，每次调用函数 `foo()`，都会重新计算 `x + 1`，而不是默认 `p` 等于 `100`。

### 取默认值区别

```js
// 写法一
function m1({ x = 0, y = 0 } = {}) {
  return [x, y];
}

// 写法二
function m2({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}

// 函数没有参数的情况
m1(); // [0, 0]
m2(); // [0, 0]

// x 和 y 都有值的情况
m1({ x: 3, y: 8 }); // [3, 8]
m2({ x: 3, y: 8 }); // [3, 8]

// x 有值，y 无值的情况
m1({ x: 3 }); // [3, 0]
m2({ x: 3 }); // [3, undefined]

// x 和 y 都无值的情况
m1({}); // [0, 0];
m2({}); // [undefined, undefined]

m1({ z: 3 }); // [0, 0]
m2({ z: 3 }); // [undefined, undefined]
```

### 参数默认值的位置

通常情况下，定义了默认值的参数，应该是函数的尾参数。

否则就没有意义

```js
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

### 函数的 length 属性

指定了默认值以后，函数的 `length` 属性，将返回没有指定默认值的参数个数。

```sh
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

`rest` 参数也不会计入 `length` 属性。

```sh
(function(...args) {}).length // 0
```

如果设置了默认值的参数不是尾参数，那么 `length` 属性也不再计入后面的参数了。

```sh
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```

### 作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。

等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

```js
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2); // 2
```

上面代码中，参数 `y` 的默认值等于变量 `x`。调用函数 `f` 时，参数形成一个单独的作用域。在这个作用域里面，默认值变量 `x` 指向第一个参数 `x`，而不是全局变量 `x`，所以输出是 `2`。

再看下面的例子。

```js
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f(); // 1
```

上面代码中，函数 `f` 调用时，参数 `y = x` 形成一个单独的作用域。这个作用域里面，变量 `x` 本身没有定义，所以指向外层的全局变量 `x`。函数调用时，函数体内部的局部变量 `x` 影响不到默认值变量 `x`。

如果此时，全局变量 x 不存在，就会报错。

```js
function f(y = x) {
  let x = 2;
  console.log(y);
}

f(); // ReferenceError: x is not defined
```

下面这样写，也会报错。

```js
var x = 1;

function foo(x = x) {
  // ...
}

foo(); // ReferenceError: Cannot access 'x' before initialization
```

上面代码中，参数 `x = x` 形成一个单独作用域。实际执行的是 `let x = x`，由于暂时性死区的原因，这行代码会报错。

如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。请看下面的例子。

```js
let foo = "outer";

function bar(func = () => foo) {
  let foo = "inner";
  console.log(func());
}

bar(); // outer
```

上面代码中，函数 `bar` 的参数 `func` 的默认值是一个匿名函数，返回值为变量 `foo`。函数参数形成的单独作用域里面，并没有定义变量 `foo`，所以 `foo` 指向外层的全局变量 `foo`，因此输出 `outer`。

如果写成下面这样，就会报错。

```js
function bar(func = () => foo) {
  let foo = "inner";
  console.log(func());
}

bar(); // ReferenceError: foo is not defined
```

上面代码中，匿名函数里面的 `foo` 指向函数外层，但是函数外层并没有声明变量 `foo`，所以就报错了。

下面是一个更复杂的例子。

```JS
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
```

上面代码中，函数 `foo` 的参数形成一个单独作用域。这个作用域里面，首先声明了变量 `x`，然后声明了变量 `y`，`y` 的默认值是一个匿名函数。这个匿名函数内部的变量 `x`，指向同一个作用域的第一个参数 `x`。函数 `foo` 内部又声明了一个内部变量 `x`，该变量与第一个参数 `x` 由于不是同一个作用域，所以不是同一个变量，因此执行 `y` 后，内部变量 `x` 和外部全局变量 `x` 的值都没变。

如果将 `var x = 3` 的 `var` 去除，函数 `foo` 的内部变量 `x` 就指向第一个参数 `x`，与匿名函数内部的 `x` 是一致的，所以最后输出的就是 `2`，而外层的全局变量 `x` 依然不受影响。

```JS
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
```

### 应用

1. 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。

```js
function throwIfMissing() {
  throw new Error("Missing parameter");
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo();
// Error: Missing parameter
```

2. 可以将参数默认值设为 `undefined`，表明这个参数是可以省略的。

```js
function foo(optional = undefined) { ··· }
```

## 2. rest 参数

ES6 引入 `rest` 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用 `arguments` 对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

### 基础用法

`add` 函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。

```js
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3); // 10
```

### rest 参数代替 arguments 变量例子

rest 参数的写法更自然也更简洁。

`arguments` 对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用 `Array.from` 先将其转为数组。

rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。

```js
// arguments变量的写法
function sortNumbers() {
  return Array.from(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

### 注意 1: rest 参数之后不能再有其他参数

rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

```js
// 报错
function f(a, ...b, c) {
  // ...
}
```

### 注意 2: 函数的 length 属性，不包括 rest 参数。

```JS
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```

## 3. 箭头函数

### 基本用法

```js
let f = (v) => v;
// 等同于
let f = function (v) {
  return v;
};

// 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
let getTempItem = id => { id: id, name: "Temp" }; // 报错
let getTempItem = id => ({ id: id, name: "Temp" }); // 不报错
// 下面是一种特殊情况，虽然可以运行，但会得到错误的结果。
let foo = () => { a: 1 };
foo() // undefined
// 上面代码中，原始意图是返回一个对象{ a: 1 }，但是由于引擎认为大括号是代码块，所以执行了一行语句a: 1。这时，a可以被解释为语句的标签，因此实际执行的语句是1;，然后函数就结束了，没有返回值。

// 箭头函数使得表达更加简洁
const isEven = n => n % 2 === 0;
const square = n => n * n;
```

### 用途

#### 1. 简化回调函数

```js
// 普通函数写法
[1, 2, 3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1, 2, 3].map((x) => x * x);
```

#### 2. rest 参数与箭头函数结合的例子

```js
const numbers = (...nums) => nums;
numbers(1, 2, 3, 4, 5);
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1, 2, 3, 4, 5);
// [1,[2,3,4,5]]
```

### 使用注意点

- 1. 箭头函数没有自己的 `this` 对象

  - 箭头函数的 `this` 就是定义时上层作用域中的 `this`
  - 普通函数的 `this` 指向是可变的  
     ::: details 点击查看代码
    ```js
    // 箭头函数this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以打印出来的是42。
    function foo() {
      setTimeout(() => {
        console.log("id:", this.id);
      }, 100);
    }
    var id = 21;
    foo.call({ id: 42 });
    // id: 42
    ```
    :::

- 2. 不可以当作构造函数，也就是说，不可以对箭头函数使用 `new` 命令，否则会抛出一个错误
- 3. 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。
- 4. 不可以使用 `yield` 命令，因此箭头函数不能用作 `Generator` 函数。

### 不适用场合

1. 定义对象的方法，且该方法内部包括 `this`

对象不构成单独的作用域，导致 `jumps` 箭头函数定义时的作用域就是`全局作用域`.

如果是普通函数，该方法内部的 `this` 指向 `cat`

```js
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  },
};

// 对象里的箭头函数，this指向的是全局作用域
globalThis.s = 21;
const obj = {
  s: 42,
  m: () => console.log(this.s),
};
obj.m(); // 21
```

2. 需要动态 this 的时候，也不应使用箭头函数

击按钮会报错，因为 `button` 的监听函数是一个箭头函数，导致里面的 `this` 就是全局对象。如果改成普通函数，`this` 就会动态指向被点击的按钮对象。

```js
var button = document.getElementById("press");
button.addEventListener("click", () => {
  this.classList.toggle("on");
});
```

## 4. 尾递归

## 5. Function.prototype.toString()

ES2019 对函数实例的 `toString()` 方法做出了修改。

`toString()` 方法返回函数代码本身，以前会省略注释和空格。

```js
function /* foo comment */ foo() {}

// es5
foo.toString();
// function foo() {}

// es2019
foo.toString();
// "function /* foo comment */ foo () {}"
```

## 6. catch 命令的参数省略

ES2019 做出了改变，允许 `catch` 语句省略参数。

但是，为了保证语法正确，还是必须要写 `catch`。

```js
// es5
try {
  // ...
} catch (err) {
  // 处理错误
}

// es2019 可省略catch参数
try {
  // ...
} catch {
  // ...
}
```
