# 运算符的扩展

## 1. 链判断运算符

ES2020 引入了“链判断运算符”（optional chaining operator）`?.`

### 三种写法

- obj?.prop // 对象属性是否存在
- obj?.[expr] // 同上
- func?.(...args) // 函数或对象方法是否存在

`?.`运算符常见形式，以及不使用该运算符时的等价形式。

```js
a?.b;
// 等同于
a == null ? undefined : a.b;

a?.[x];
// 等同于
a == null ? undefined : a[x];

a?.b();
// 等同于
a == null ? undefined : a.b();

a?.();
// 等同于
a == null ? undefined : a();
```

上面代码中，特别注意后两种形式，如果 `a?.b()`和 `a?.()`。如果 `a?.b()`里面的 `a.b` 有值，但不是函数，不可调用，那么 `a?.b()`是会报错的。`a?.()`也是如此，如果 `a` 不是 `null` 或 `undefined`，但也不是函数，那么 `a?.()`会报错。

### 注意点

使用这个运算符，有几个注意点。

1. 短路机制

本质上，`?.`运算符相当于一种短路机制，只要不满足条件，就不再往下执行。

```js
a?.[++x];
// 等同于
a == null ? undefined : a[++x];
```

上面代码中，如果 `a` 是 `undefined` 或 `null`，那么 `x` 不会进行递增运算。也就是说，链判断运算符一旦为真，右侧的表达式就不再求值。

2. 括号的影响

如果属性链有圆括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响。

```js
(a?.b).c(
  // 等价于
  a == null ? undefined : a.b
).c;
```

上面代码中，`?.`对圆括号外部没有影响，不管 `a` 对象是否存在，圆括号后面的`.c` 总是会执行。

一般来说，使用`?.`运算符的场合，不应该使用圆括号。

3. 报错场合

以下写法是禁止的，会报错。

```js
// 构造函数
new a?.()
new a?.b()

// 链判断运算符的右侧有模板字符串
a?.`{b}`
a?.b`{c}`

// 链判断运算符的左侧是 super
super?.()
super?.foo

// 链运算符用于赋值运算符左侧
a?.b = c
```

#### 对象方法是否存在，如果存在就立即执行

`iterator.return` 如果有定义，就会调用该方法，否则 `iterator.return` 直接返回 `undefined`，不再执行`?.`后面的部分

```js
iterator.return?.();
```

## 3. Null 判断运算符

如果某个属性的值是 `null` 或 `undefined`，有时候需要为它们指定默认值。

- 常见做法是通过||运算符指定默认值。
  - 但是这样写是错的。开发者的原意是，只要属性的值为 `null` 或 `undefined`，默认值就会生效
  - 但是属性的值如果为`空字符串` 或 `false` 或 `0`，默认值也会生效。
- 为了避免这种情况，ES2020 引入了一个新的 Null 判断运算符??。
  - 为了避免这种情况，ES2020 引入了一个新的 Null 判断运算符??。
  - 它的行为类似||，但是只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值。

这个运算符的一个目的，就是跟链判断运算符`?.`配合使用，为 `null` 或 `undefined` 的值设置默认值。

```js
const animationDuration = response.settings?.animationDuration ?? 300;
```

### 优先级问题 || && ??

现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。

```js
// 报错
lhs && middle ?? rhs
lhs ?? middle && rhs
lhs || middle ?? rhs
lhs ?? middle || rhs
```

上面四个表达式都会报错，必须加入表明优先级的括号。

```js
(lhs && middle) ?? rhs;
lhs && (middle ?? rhs);

(lhs ?? middle) && rhs;
lhs ?? (middle && rhs);

(lhs || middle) ?? rhs;
lhs || (middle ?? rhs);

(lhs ?? middle) || rhs;
lhs ?? (middle || rhs);
```

## 4. 逻辑赋值运算符

ES2021 引入了三个新的`逻辑赋值运算符`（logical assignment operators），将逻辑运算符与赋值运算符进行结合。

```js
// 或赋值运算符
x ||= y;
// 等同于
x || (x = y);

// 与赋值运算符
x &&= y;
// 等同于
x && (x = y);

// Null 赋值运算符
x ??= y;
// 等同于
x ?? (x = y);
```

这三个运算符`||=`、`&&=`、`??=`相当于先进行逻辑运算，然后根据运算结果，再视情况进行赋值运算。

它们的一个用途是，为变量或属性设置默认值。

```js
// 老的写法
user.id = user.id || 1;

// 新的写法
user.id ||= 1;
```

上面示例中，`user.id` 属性如果不存在，则设为 `1`，新的写法比老的写法更紧凑一些。

下面是另一个例子。

```js
function example(opts) {
  opts.foo = opts.foo ?? "bar";
  opts.baz ?? (opts.baz = "qux");
}
```

上面示例中，参数对象 `opts` 如果不存在属性 `foo` 和属性 `baz`，则为这两个属性设置默认值。有了“Null 赋值运算符”以后，就可以统一写成下面这样。

```js
function example(opts) {
  opts.foo ??= "bar";
  opts.baz ??= "qux";
}
```
