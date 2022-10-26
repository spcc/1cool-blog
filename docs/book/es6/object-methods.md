# 对象的新增方法

## 1. Object.is()

用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

ES5 比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。  
它们都有缺点：

- 前者会自动转换数据类型
- 后者的 NaN 不等于自身，以及+0 等于-0。

所以出了 Object.is,在所有环境中，只要两个值是一样的，它们就应该相等。

```js
Object.is("foo", "foo");
// true
Object.is({}, {});
// false

// 不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
+0 === -0; //true
NaN === NaN; // false

Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
```

## 2. Object.assign()

`Object.assign()` 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

`Object.assign()` 方法的第一个参数是目标对象，后面的参数都是源对象。

```js
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target; // {a:1, b:2, c:3}

// 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
const target = { a: 1, b: 1 };
const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target; // {a:1, b:2, c:3}

// 该参数不是对象，则会先转成对象，然后返回。
typeof Object.assign(2); // "object"

// undefined和null无法转成对象，所以如果它们作为参数，就会报错。
Object.assign(undefined); // 报错
Object.assign(null); // 报错

// 非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。
// 首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。
let obj = { a: 1 };
Object.assign(obj, undefined) === obj; // true
Object.assign(obj, null) === obj; // true

// 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
const v1 = "abc";
const v2 = true;
const v3 = 10;
const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
// 这是因为只有字符串的包装对象，会产生可枚举属性。
```

### 注意点

#### 1. 浅拷贝

`Object.assign()`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

```js
const obj1 = { a: { b: 1 } };
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b; // 2
```

上面代码中，源对象 `obj1` 的 `a` 属性的值是一个对象，`Object.assign()`拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。

#### 2. 同名属性的替换

对于这种嵌套的对象，一旦遇到同名属性，`Object.assign()` 的处理方法是替换，而不是添加。

```js
const target = { a: { b: "c", d: "e" } };
const source = { a: { b: "hello" } };
Object.assign(target, source);
// { a: { b: 'hello' } }
```

一些函数库提供 `Object.assign()`的定制版本（比如 Lodash 的\_.defaultsDeep()方法），可以得到深拷贝的合并。

#### 3. 数组的处理

`Object.assign()` 可以用来处理数组，但是会把数组视为对象。

```js
Object.assign([1, 2, 3], [4, 5]);
// [4, 5, 3]
```

上面代码中，`Object.assign()` 把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性 `4` 覆盖了目标数组的 0 号属性 `1`。

#### 4. 取值函数的处理

`Object.assign()` 只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

```js
const source = {
  get foo() {
    return 1;
  },
};
const target = {};

Object.assign(target, source);
// { foo: 1 }
```

上面代码中，`source` 对象的 `foo` 属性是一个取值函数，`Object.assign()` 不会复制这个取值函数，只会拿到值以后，将这个值复制过去。

### 常见用途

#### 1. 为对象添加属性

```js
class Point {
  constructor(x, y) {
    Object.assign(this, { x, y });
  }
}
```

上面方法通过 `Object.assign()` 方法，将 `x` 属性和 `y` 属性添加到 `Point` 类的对象实例。

#### 2. 为对象添加方法

```js
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```

上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用 `assign()`方法添加到 `SomeClass.prototype` 之中。

#### 3. 克隆对象

```js
function clone(origin) {
  return Object.assign({}, origin);
}
```

上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。

#### 4. 合并多个对象

将多个对象合并到某个对象。

```js
const merge = (target, ...sources) => Object.assign(target, ...sources);
```

如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。

```js
const merge = (...sources) => Object.assign({}, ...sources);
```

#### 5. 为属性指定默认值

```js
const DEFAULTS = {
  logLevel: 0,
  outputFormat: "html",
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}
```

上面代码中，`DEFAULTS` 对象是默认值，`options` 对象是用户提供的参数。`Object.assign()`方法将 `DEFAULTS` 和 `options` 合并成一个新对象，如果两者有同名属性，则 `options` 的属性值会覆盖 `DEFAULTS` 的属性值。

注意，由于存在浅拷贝的问题，`DEFAULTS` 对象和 `options` 对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，`DEFAULTS` 对象的该属性很可能不起作用。

```js
const DEFAULTS = {
  url: {
    host: "example.com",
    port: 7070,
  },
};

processContent({ url: { port: 8000 } });
// {
//   url: {port: 8000}
// }
```

上面代码的原意是将 `url.port` 改成 `8000`，`url.host` 不变。实际结果却是 `options.url` 覆盖掉 `DEFAULTS.url`，所以 `url.host` 就不存在了。

## 3. **proto**属性，Object.setPrototypeOf()，Object.getPrototypeOf()

JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。

## 4. Object.keys()，Object.values()，Object.entries()

### Object.keys()

ES5 引入了 `Object.keys` 方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

```js
var obj = { foo: "bar", baz: 42 };
Object.keys(obj);
// ["foo", "baz"]
```

### Object.values 和 Object.entries

ES2017 引入了跟 Object.keys 配套的 Object.values 和 Object.entries，作为遍历一个对象的补充手段，供 for...of 循环使用。

```js
let { keys, values, entries } = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

### Object.values()

`Object.values` 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

```js
const obj = { foo: "bar", baz: 42 };
Object.values(obj);
// ["bar", 42]
```

返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。

```js
// 属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。
const obj = { 100: "a", 2: "b", 7: "c" };
Object.values(obj);
// ["b", "c", "a"]

// 参数是一个字符串，会返回各个字符组成的一个数组。
Object.values("foo");
// ['f', 'o', 'o']

// Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。
Object.values(42); // []
Object.values(true); // []
```

### Object.entries()

`Object.entries()` 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

```js
const obj = { foo: "bar", baz: 42 };
Object.entries(obj);
// [ ["foo", "bar"], ["baz", 42] ]
```

除了返回值不一样，该方法的行为与 `Object.values` 基本一致。

`Object.entries` 的基本用途是遍历对象的属性

```js
let obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
  console.log(`${JSON.stringify(k)}: ${JSON.stringify(v)}`);
}
// "one": 1
// "two": 2
```

4. Object.fromEntries()

`Object.fromEntries()`方法是`Object.entries()`的逆操作，用于将一个键值对数组转为对象。

```js
Object.fromEntries([
  ["foo", "bar"],
  ["baz", 42],
]);
// { foo: "bar", baz: 42 }
```

该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。

```js
// 例一
const entries = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);

Object.fromEntries(entries);
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set("foo", true).set("bar", false);
Object.fromEntries(map);
// { foo: true, bar: false }
```

该方法的一个用处是配合 `URLSearchParams` 对象，将查询字符串转为对象。

```js
Object.fromEntries(new URLSearchParams("foo=bar&baz=qux"));
// { foo: "bar", baz: "qux" }
```

## 5. Object.hasOwn()

JavaScript 对象的属性分成两种：自身的属性和继承的属性。对象实例有一个 `hasOwnProperty()`方法，可以判断某个属性是否为原生属性。ES2022 在 `Object` 对象上面新增了一个静态方法 `Object.hasOwn()`，也可以判断是否为自身的属性。

`Object.hasOwn()`可以接受两个参数，第一个是所要判断的对象，第二个是属性名。

```js
const foo = Object.create({ a: 123 });
foo.b = 456;

Object.hasOwn(foo, "a"); // false
Object.hasOwn(foo, "b"); // true
```

上面示例中，对象 `foo` 的属性 `a` 是继承属性，属性 `b` 是原生属性。`Object.hasOwn()`对属性 `a` 返回 `false`，对属性 `b` 返回 `true`。

`Object.hasOwn()`的一个好处是，对于不继承 `Object.prototype` 的对象不会报错，而 `hasOwnProperty()`是会报错的。

```js
const obj = Object.create(null);

obj.hasOwnProperty("foo"); // 报错
Object.hasOwn(obj, "foo"); // false
```

上面示例中，`Object.create(null)`返回的对象 `obj` 是没有原型的，不继承任何属性，这导致调用 `obj.hasOwnProperty()`会报错，但是 `Object.hasOwn()`就能正确处理这种情况。
