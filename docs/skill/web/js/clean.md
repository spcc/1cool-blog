# 代码整洁

以下技巧可能在示例中看起来不值一提，但是在实际的项目中，当业务逻辑复杂起来、当代码量变得很大的时候，这些小技巧一定能给出正面的作用、帮助，甚至超乎想象。

## 用对象传参

把参数包装成一个对象再传，否则谁能读懂这种没头没尾的且要求顺序的参数的意义？

```js
function getItem(price, quantity, name, description) {}
getItem(15, undefined, "bananas", "fruit");
```

```js
function getItem(args) {
  const { price, quantity, name, description } = args;
}
getItem({
  name: "bananas",
  price: 10,
  quantity: 1,
  description: "fruit",
});
```

## 将数字定义为常量

我们常常会用到数字，比如以下代码：

```js
const isOldEnough = (person) => {
  return person.getAge() >= 100;
};
```

谁知道这个 100 具体指的是什么？我们通常需要结合函数上下文再推测、判断这个 100 它可能是具体代表一个什么值。

如果这样的数字有多个的话，一定会很容易造成更大的困惑。

`写出干净的 JavaScript：将数字定义为常量`

即可清晰的解决这个问题：

```js
const AGE = 100;
const isOldEnough = (person) => {
  return person.getAge() >= AGE;
};
```

或者直接作为形参

```js
const AGE = 100;
const isOldEnough = (person, AGE = 100) => {
  return person.getAge() >= AGE;
};
```

现在，我们通过声明常量的名字，即可立马读懂 100 是“年龄要求”的意思。修改时也能迅速定位、一处修改、多处生效。

## 避免将布尔值作为函数参数

将布尔值作为参数传入函数中是一种常见的容易造成代码混乱的写法。

```js
const validateCreature = (creature, isHuman) => {
  if (isHuman) {
    // ...
  } else {
    // ...
  }
};
```

布尔值作为参数传入函数不能表示出明确的意义，只能告诉读者，这个函数将会有判断发生，产生两种或多种情况。

然而，我们提倡函数的单一职责原则，所以：

`写出干净的 JavaScript：避免将布尔值作为函数参数`

```js
const validatePerson = (person) => {
  // ...
};
const validateCreature = (creature) => {
  // ...
};
```

## 将多个条件封装

我们经常会写出这样的代码：

```js
if (
  person.getAge() > 30 &&
  person.getName() === "simon" &&
  person.getOrigin() === "sweden"
) {
  // ...
}
```

不是不行，只是隔久了会一下子看不懂这些判断到底是要干嘛的，所以建议把这些条件用变量或函数进行封装。

`写出干净的 JavaScript：将多个条件封装`

```js
const isSimon =
  person.getAge() > 30 &&
  person.getName() === "simon" &&
  person.getOrigin() === "sweden";
if (isSimon) {
  // ...
}
```

或者

```js
const isSimon = (person) => {
  return (
    person.getAge() > 30 &&
    person.getName() === "simon" &&
    person.getOrigin() === "sweden"
  );
};
if (isSimon(person)) {
  // ...
}
```

噢，原来这些条件是为了判断这个人是不是 Simon ~

这样的代码是声明式风格的代码，更易读。

## 避免否定的判断条件

条件判断中，使用否定判断，会额外造成一种思考负担。

比如下面的代码，条件 !isCreatureNotHuman(creature) 双重否定，读起来就会觉得有点费劲。

```js
const isCreatureNotHuman = (creature) => {
  // ...
};

if (!isCreatureNotHuman(creature)) {
  // ...
}
```

`写出干净的 JavaScript：避免否定的判断条件`

改写成以下写法则读起来更轻松，虽然这只是一个很小的技巧，但是在大量的代码逻辑中，多处去遵循这个原则，肯定会很有帮助。

很多时候读代码就是读着读着，看到一个“很烂”的写法，就忍不了了，细节会叠加，千里之堤溃于蚁穴。

```js
const isCreatureHuman = (creature) => {
  // ...
};
if (isCreatureHuman(creature)) {
  // ...
}
```

## 避免大量 if...else...

[责任链](https://juejin.cn/post/6996811608756322334)
