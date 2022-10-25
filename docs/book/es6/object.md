# 对象的扩展

## 1. 属性的简洁表示法

### 方法简写

```js
const o = {
  method() {
    return "Hello!";
  },
};

// 等同于

const o = {
  method: function () {
    return "Hello!";
  },
};
```

### 打印对象

```js
let user = {
  name: "test",
};

let foo = {
  bar: "baz",
};

// console.log直接输出user和foo两个对象时，就是两组键值对，可能会混淆
console.log(user, foo);
// {name: "test"} {bar: "baz"}

// 每组键值对前面会打印对象名，这样就比较清晰
console.log({ user, foo });
// {user: {name: "test"}, foo: {bar: "baz"}}
```

### 注意

简写的对象方法不能用作构造函数，会报错。

```js
const obj = {
  f() {
    this.foo = "bar";
  },
};

new obj.f(); // 报错
```

上面代码中，`f` 是一个简写的对象方法，所以 `obj.f` 不能当作构造函数使用。

## 2. 属性名表达式

### 表属性名表达式

ES6 允许字面量定义对象时，用（表达式）作为对象的属性名，即把表达式放在方括号内。

```js
let propKey = "foo";

let obj = {
  [propKey]: true,
  ["a" + "bc"]: 123,
};
```

另一个例子

```js
let lastWord = "last word";

const a = {
  "first word": "hello",
  [lastWord]: "world",
};

a["first word"]; // "hello"
a[lastWord]; // "world"
a["last word"]; // "world"
```

表达式与简洁表示法，不能同时使用，会报错。

```js
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};
```

注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`，这一点要特别小心。

```js
const keyA = { a: 1 };
const keyB = { b: 2 };

const myObject = {
  [keyA]: "valueA",
  [keyB]: "valueB",
};

myObject; // Object {[object Object]: "valueB"}
```

### 表达式定义方法名

表达式还可以用于定义方法名

```js
let obj = {
  ["h" + "ello"]() {
    return "hi";
  },
};

obj.hello(); // hi
```

## 3. super 关键字

`this` 关键字总是指向函数所在的当前对象，`ES6` 又新增了另一个类似的关键字 `super`，指向当前对象的原型对象。

```js
const proto = {
  foo: "hello",
};

const obj = {
  foo: "world",
  find() {
    return super.foo;
  },
};

Object.setPrototypeOf(obj, proto);
obj.find(); // "hello"
```

对象 `obj.find()`方法之中，通过 `super.foo` 引用了原型对象 `proto` 的 `foo` 属性。

## 4. 对象的扩展运算符

ES2018 将这个运算符引入了对象。

### 解构赋值的拷贝是浅拷贝

```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b; // 2
// x是解构赋值所在的对象，拷贝了对象obj的a属性。a属性引用了一个对象，修改这个对象的值，会影响到解构赋值对它的引用。
```

### 等于 Object.assign()方法。

对象的扩展运算符等同于使用 `Object.assign()`方法。

```js
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```
