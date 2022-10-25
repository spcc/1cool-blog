# 数组的扩展

## 1. 扩展运算符

### 基础用法

1. 扩展运算符后面可以放置表达式

```js
const arr = [...(x > 0 ? ["a"] : [])];
```

2. 如果扩展运算符后面是一个空数组，则不产生任何效果。

```js
[...[], 1];
// [1]
```

3. 注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错

```js
(...[1, 2])
// Uncaught SyntaxError: Unexpected number

console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2])
// 1 2
```

上面三种情况，扩展运算符都放在圆括号里面，但是前两种情况会报错，因为扩展运算符所在的括号不是函数调用。

### 替代函数 apply() 方法

由于扩展运算符可以展开数组，所以不再需要 `apply()` 方法将数组转为函数的参数了。

::: details 点击查看代码

```js
// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6 的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);
```

:::

### 应用

1. 复制数组（浅拷贝）

```js
const a1 = [1, 2];
const a2 = [...a1];
a2[0] = 2;
a1; // [1, 2]
```

2. 合并数组（浅拷贝）

```js
const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

const a4 = [...a1, ...a2];
a4[0] === a1[0]; // true
// 都是对原数组成员的引用,如果修改了引用指向的值，会同步反映到新数组
```

3. 与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。

```js
const [first, ...rest] = [1, 2, 3, 4, 5];
first; // 1
rest; // [2, 3, 4, 5]

const [first, ...rest] = [];
first; // undefined
rest; // []

const [first, ...rest] = ["foo"];
first; // "foo"
rest; // []

// 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错
const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

4. 字符串

扩展运算符还可以将字符串转为真正的数组。

```js
[..."hello"];
// [ "h", "e", "l", "l", "o" ]
```

5. 实现了 Iterator 接口的对象

任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。

```js
let nodeList = document.querySelectorAll("div");
let array = [...nodeList];
```

上面代码中，`querySelectorAll()` 方法返回的是一个 `NodeList` 对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于 `NodeList` 对象实现了 `Iterator`。

```js
Number.prototype[Symbol.iterator] = function* () {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
};

console.log([...5]); // [0, 1, 2, 3, 4]
```

上面代码中，先定义了`Number`对象的遍历器接口，扩展运算符将 `5` 自动转成 `Number` 实例以后，就会调用这个接口，就会返回自定义的结果。

对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。

```js
let arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```

上面代码中，`arrayLike` 是一个类似数组的对象，但是没有部署 Iterator 接口，扩展运算符就会报错。这时，可以改为使用 `Array.from` 方法将 `arrayLike` 转为真正的数组。

6. Map 和 Set 结构，Generator 函数

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。

```js
let map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```

Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

```js
const go = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...go()]; // [1, 2, 3]
```

上面代码中，变量 `go` 是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。

```js
const obj = { a: 1, b: 2 };
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
```

## 2. Array.from()

[es6 array.from 无过多记载](https://es6.ruanyifeng.com/#docs/array)

`Array.from()` 方法用于将两类对象转为真正的数组

- 类似数组的对象（array-like object）
- 可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

::: details 类似数组的对象，Array.from()将它转为真正的数组

```js
let arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

// ES5 的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6 的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

:::

## 3. Array.of()

`Array.of()` 方法用于将一组值，转换为数组。

```js
Array.of(3, 11, 8); // [3,11,8]
Array.of(3); // [3]
Array.of(3).length; // 1
```

#### `Array.of()`主要目的，是弥补数组构造函数 Array()的不足。

```js
// 因为参数个数的不同，会导致 Array()的行为有差异。
Array(); // []
Array(3); // [, , ,] 参数只有一个正整数时，实际上是指定数组的长度。
Array(3, 11, 8); // [3, 11, 8] 参数个数不少于 2 个时，Array()才会返回由参数组成的新数组

// 总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
Array.of(); // []
Array.of(undefined); // [undefined]
Array.of(1); // [1]
Array.of(1, 2); // [1, 2]
```

#### Array.of()方法可以用下面的代码模拟实现。

```js
function ArrayOf() {
  return [].slice.call(arguments);
}
```

## 4. 实例方法：copyWithin()

数组实例的 `copyWithin()` 方法，在当前数组内部，将指定位置的成员剪切到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

```js
Array.prototype.copyWithin(target, (start = 0), (end = this.length));
```

它接受三个参数。

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

这三个参数都应该是数值，如果不是，会自动转为数值。

```js
// 将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2。
[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

## 5. 实例方法：find()，findIndex()，findLast()，findLastIndex()

### find()

用于找出第一个符合条件的数组成员。如果没有符合条件的成员，则返回 `undefined`。

`find()` 方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

```js
[1, 4, -5, 10].find((n) => n < 0);
// -5

[1, 5, 10, 15].find(function (value, index, arr) {
  return value > 9;
}); // 10
```

### findIndex()

返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

```js
[1, 5, 10, 15].findIndex(function (value, index, arr) {
  return value > 9;
}); // 2
```

### find() 和 findIndex()

这两个方法都可以接受第二个参数，用来绑定回调函数的 this 对象。

```js
// find()函数接收了第二个参数person对象，回调函数中的this对象指向person对象。
function f(v) {
  return v > this.age;
}
let person = { name: "John", age: 20 };
[10, 12, 26, 15].find(f, person); // 26
```

这两个方法都可以发现 `NaN`，弥补了数组的 `indexOf()`方法的不足。

```sh
[NaN].indexOf(NaN)
// -1

# indexOf()方法无法识别数组的NaN成员，但是findIndex()方法可以借助Object.is()方法做到
[NaN].findIndex(y => Object.is(NaN, y))
// 0
```

### findLast()和 findLastIndex()

ES2022 新增了两个方法 findLast()和 findLastIndex()

从数组的最后一个成员开始，依次向前检查，其他都保持不变。

```js
const array = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

array.findLast((n) => n.value % 2 === 1); // { value: 3 }
array.findLastIndex((n) => n.value % 2 === 1); // 2
```

`findLast()`和 `findLastIndex()`从数组结尾开始，寻找第一个 `value` 属性为奇数的成员。结果，该成员是`{ value: 3 }`，位置是 `2` 号位。

## 6. 实例方法：fill()

`fill` 方法使用给定值，填充一个数组。

`fill` 方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

```js
["a", "b", "c"].fill(7);
// [7, 7, 7]

// 从 1 号位开始，向原数组填充 7，到 2 号位之前结束
["a", "b", "c"].fill(7, 1, 2);
// ['a', 7, 'c']
```

注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。

```js
let arr = new Array(3).fill({ name: "Mike" });
arr[0].name = "Ben";
arr;
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr;
// [[5], [5], [5]]
```

## 7. 实例方法：entries()，keys() 和 values()

ES6 提供三个新的方法——`entries()`，`keys()`和 `values()`——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用 `for...of` 循环进行遍历，唯一的区别是 `keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。

```js
for (let index of ["a", "b"].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ["a", "b"].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ["a", "b"].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

如果不使用 `for...of` 循环，可以手动调用遍历器对象的 `next` 方法，进行遍历。

```js
let letter = ["a", "b", "c"];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

## 8. 实例方法：includes()

ES2016 引入该方法。

`Array.prototype.includes` 方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的 `includes` 方法类似。

```js
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, NaN].includes(NaN); // true

// 二个参数表示搜索的起始位置，默认为0
// 第二个参数为负数，则表示倒数的位置,如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
```

没有该方法之前，我们通常使用数组的 `indexOf` 方法，检查是否包含某个值。

```js
if (arr.indexOf(el) !== -1) {
  // ...
}
```

`indexOf` 方法有两个缺点

- 一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于`-1`，表达起来不够直观。
- 二是，它内部使用严格相等运算符（`===`）进行判断，这会导致对 `NaN` 的误判。

```js
[NaN].indexOf(NaN);
// -1

includes使用的是不一样的判断算法，就没有这个问题。
[NaN].includes(NaN);
// true
```

Map 和 Set 数据结构有一个 `has` 方法，需要注意与 `includes` 区分。

- Map 结构的 `has` 方法，是用来查找键名的，比如 `Map.prototype.has(key)`、`WeakMap.prototype.has(key)`、`Reflect.has(target, propertyKey)`。
- Set 结构的 `has` 方法，是用来查找值的，比如 `Set.prototype.has(value)`、`WeakSet.prototype.has(value)`。

## 9. 实例方法：flat()，flatMap()

### flat()

`Array.prototype.flat()`用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

```js
// 拉平的层数，默认为1
[1, 2, [3, 4]].flat();
// [1, 2, 3, 4]

// 想要拉平的层数
[1, 2, [3, [4, 5]]].flat(2);
// [1, 2, 3, 4, 5]

// 不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
[1, [2, [3]]].flat(Infinity);
// [1, 2, 3]

// 原数组有空位，flat()方法会跳过空位
[1, 2, , 4, 5].flat();
// [1, 2, 4, 5]
```

### flatMap()

`flatMap()` 方法对原数组的每个成员执行一个函数（相当于执行 `Array.prototype.map()`），然后对返回值组成的数组执行 `flat()`方法。该方法返回一个新数组，不改变原数组。

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2]);
// [2, 4, 3, 6, 4, 8]
```

`flatMap()` 只能展开一层数组。

```js
// 遍历函数返回的是一个双层的数组，但是默认只能展开一层，因此flatMap()返回的还是一个嵌套数组。
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap((x) => [[x * 2]]);
// [[2], [4], [6], [8]]
```

`flatMap()`方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。

```js
arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])
```

`flatMap()` 方法还可以有第二个参数，用来绑定遍历函数里面的 `this`。

## 实例方法：at()

ES2022 为数组实例增加了 `at()` 方法

接受一个整数作为参数，返回对应位置的成员，并支持负索引。

这个方法不仅可用于数组，也可用于字符串和类型数组（TypedArray）。

**为了解决**不支持数组的负索引(arr[-1])  
因为方括号运算符[]在 JavaScript 语言里面，不仅用于数组，还用于对象
比如 obj[-1]引用的是键名为字符串-1 的键  
由于数组是特殊的对象，所以方括号里面的负数无法再有其他语义了，也就是说，不可能添加新语法来支持负索引。

```js
const arr = [5, 12, 8, 130, 44];
arr.at(2); // 8
arr.at(-2); // 130

// 如果参数位置超出了数组范围，at()返回undefined。
const sentence = "This is a sample sentence";
sentence.at(0); // 'T'
sentence.at(-1); // 'e'
sentence.at(-100); // undefined
sentence.at(100); // undefined
```

## 11. 实例方法：toReversed()，toSorted()，toSpliced()，with()

很多数组的传统方法会改变原数组，比如 `push()`、`pop()`、`shift()`、`unshift()`等等。数组只要调用了这些方法，它的值就变了。现在有一个提案，允许对数组进行操作时，不改变原数组，而返回一个原数组的拷贝。

这样的方法一共有四个。

- Array.prototype.toReversed() -> Array
- Array.prototype.toSorted(compareFn) -> Array
- Array.prototype.toSpliced(start, deleteCount, ...items) -> Array
- Array.prototype.with(index, value) -> Array

它们分别对应数组的原有方法。

- toReversed()对应 reverse()，用来颠倒数组成员的位置。
- toSorted()对应 sort()，用来对数组成员排序。
- toSpliced()对应 splice()，用来在指定位置，删除指定数量的成员，并插入新成员。
- with(index, value)对应 splice(index, 1, value)，用来将指定位置的成员替换为新的值。

上面是这四个新方法对应的原有方法，含义和用法完全一样，唯一不同的是不会改变原数组，而是返回原数组操作后的拷贝。

下面是示例。

```js
const sequence = [1, 2, 3];
sequence.toReversed(); // [3, 2, 1]
sequence; // [1, 2, 3]

const outOfOrder = [3, 1, 2];
outOfOrder.toSorted(); // [1, 2, 3]
outOfOrder; // [3, 1, 2]

const array = [1, 2, 3, 4];
array.toSpliced(1, 2, 5, 6, 7); // [1, 5, 6, 7, 4]
array; // [1, 2, 3, 4]

const correctionNeeded = [1, 1, 3];
correctionNeeded.with(1, 2); // [1, 2, 3]
correctionNeeded; // [1, 1, 3]
```

## 12. 实例方法：group()，groupToMap()

分组函数

按照字符串分组就使用 `group()`，按照对象分组就使用 `groupToMap()`

### group()

`group()` 的参数是一个分组函数，原数组的每个成员都会依次执行这个函数，确定自己是哪一个组。

```js
const array = [1, 2, 3, 4, 5];

array.group((num, index, array) => {
  return num % 2 === 0 ? "even" : "odd";
});
// { odd: [1, 3, 5], even: [2, 4] }
```

`group()` 的分组函数可以接受三个参数，依次是数组的当前成员、该成员的位置序号、原数组（上例是 `num`、`index` 和 `array`）。分组函数的返回值应该是字符串（或者可以自动转为字符串），以作为分组后的组名。

`group()` 的返回值是一个对象，该对象的键名就是每一组的组名，即分组函数返回的每一个字符串（上例是 `even` 和 `odd`）；该对象的键值是一个数组，包括所有产生当前键名的原数组成员。

下面是另一个例子。

```js
[6.1, 4.2, 6.3].groupBy(Math.floor);
// { '4': [4.2], '6': [6.1, 6.3] }
```

上面示例中，`Math.floor` 作为分组函数，对原数组进行分组。它的返回值原本是数值，这时会自动转为字符串，作为分组的组名。原数组的成员根据分组函数的运行结果，进入对应的组。

`group()`还可以接受一个对象，作为第二个参数。该对象会绑定分组函数（第一个参数）里面的 this，不过如果分组函数是一个箭头函数，该对象无效，因为箭头函数内部的 this 是固化的。

### groupToMap()

`groupToMap()`的作用和用法与 `group()`完全一致，唯一的区别是返回值是一个 Map 结构，而不是对象。Map 结构的键名可以是各种值，所以不管分组函数返回什么值，都会直接作为组名（Map 结构的键名），不会强制转为字符串。这对于分组函数返回值是对象的情况，尤其有用。

```js
const array = [1, 2, 3, 4, 5];

const odd = { odd: true };
const even = { even: true };
array.groupToMap((num, index, array) => {
  return num % 2 === 0 ? even : odd;
});
//  Map { {odd: true}: [1, 3, 5], {even: true}: [2, 4] }
```

上面示例返回的是一个 Map 结构，它的键名就是分组函数返回的两个对象 `odd` 和 `even`。
