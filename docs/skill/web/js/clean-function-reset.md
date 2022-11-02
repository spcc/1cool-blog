# 代码整洁之道 - 重构函数

代码中的很多问题都是由函数引起的，那如何对函数进行重新组织？或者叫函数重构呢？

其实大方向就两点：

1.  提炼函数（Extract Method）：也可以叫拆函数，即如何将一个大的函数合理的拆分或者提炼成多个子函数
2.  内联函数（Inline Method）：这里的合并函数的定义不一定是最准确的，总之就是与拆函数相反，因为有时候有些代码其实没必要拆成一个独立的函数，拆完之后反而不合理，这时就需要我们把这部分代码合到原来的函数体里。

那具体如何做呢，其实也是总结出了很多的技巧，可以帮助我们更好的组织函数。

## 提炼函数

开始之前，我们先知道下文中一直提到两个名词：

- 源函数：即将要被提炼的函数
- 目标函数：即提炼出来的函数，叫目标函数。

### 动机

首先，我们通过一个例子直观感受一下：

```js
// 打印欠款数据
function printOwing(amount) {
  printBanner();

  // print details
  console.log("name:", name);
  console.log("amount:", amount);
}
```

很明显，例子中 print details 这部分代码，可以单独提炼中一个函数。如下：

```js
function printOwing(amount) {
  printBanner();
  printDetails(ammount);
}
function printDetails(amount) {
  console.log("name:", name);
  console.log("amount:", amount);
}
```

很明显，优化之后，我们的代码更加优雅，而且更加清晰易懂。小型函数粒度小，而且容易复用，这是我们推荐的。

但是，但是，一个大型函数并不是拆成的小型函数粒度越小越好，这里面涉及到一个非常重要的点：**需要给小型函数有很好的命名，才能够让小型函数真正起作用，否则不如不拆。** 如何命名可以参考之前的文章

### 如何做？

接下来，我们就手把手一步一步的来看如何去提炼函数？

1.  创建一个新的函数，并且根据函数的用途来命名（即以这个函数做什么来命名），这里要注意，即使你要提炼的代码非常简单，只有一行，只要我们可以用一个明确的命名去描述它的意图，我们就可以拆成一个独立的函数，但是如果你想不出一个合适的命名，那就别动。
2.  将提炼出的代码复制到新建的目标函数。
3.  仔细检测被提炼出的代码，看看其中是否引用了 “作用域限与源函数" 的变量（包含源函数中的局部变量和参数）
4.  检测是否有 "仅用于被提炼代码片段"的变量，如果有，则在目标函数中将他们声明为临时变量。
5.  将被提炼代码中需要读取的局部变量，当作参数传给目标函数。
6.  处理完所有的变量引用之后，在源函数中完成对目标函数的调用。
7.  运行，测试。

以上步骤，初步有个印象即可，不需要记忆！

### 实践案例

接下来，我们再结合上面讲的步骤，对 printOwing 这个例子的代码复杂化一点，看又改如何去提炼函数。

首先，我们给出一段函数代码，看看到底如何一步步对其进行提炼：

```js
// 打印账单数据
function printOwing() {
  const orders = []; // 订单列表
  const outstanding = 0; // 余额

  // print banner
  console.log("-----");
  console.log("print banner");
  console.log("-----");

  // calculate outstanding
  orders.forEach((order) => {
    outstanding += order.amount;
  });

  // print details
  console.log("outstanding：", outstanding);
}
```

代码说明：其实就是一个打印账单数据的一个函数，内部有两个局部变量：orders 和 outstanding，同时还包含三部分代码，很明显，三部分代码相当于是实现了不同的子功能，因此，我们可以把这三部分都提炼成单独的函数。

同时，其实每部分被提炼的代码，复杂度又各不一样，这里，我们从以下几方面去分析：

#### 场景 1：无局部变量

例如：上面的代码中，print banner 这部分代码只有简单的打印代码，没有任何对 printOwing 函数中局部变量的引用，因此提炼函数也会非常简单，直接提取即可。提炼之后的代码如下：

```js
function printOwing() {
  const orders = []; // 订单列表
  const outstanding = 0; // 余额

  printBanner();

  // calculate outstanding
  orders.forEach((order) => {
    outstanding += order.amount;
  });

  // print details
  console.log("outstanding：", outstanding);
}

function printBanner() {
  // 打印横幅
  console.log("-----");
  console.log("print banner");
  console.log("-----");
}
```

以上 case 是最简单的啦，没有任何局部变量之前的相互引用，直接提取即可，但是实际开发中，肯定不会这么简单，会涉及到很多局部变量的相互引用？具体怎么做，我们继续往下看。

#### 场景 2：有局部变量

对函数进行提炼的时候，最困难的点在哪儿？就是包含局部变量。这里的局部变量包含传入源函数的参数，以及在源函数内部所声明的临时变量（例如此处的 orders 和 outstanding）。由于局部变量的作用域一般仅限源函数内部，所以当我们提炼目标函数，同时又涉及到源函数中局部变量的引用时，就需要额外谨慎处理。

局部变量最简单的情况是：**被提炼代码只是读取这些局部变量的值，并不修改它们，这种情况下，我们可以简单的将这些局部变量当作参数传给目标函数即可。**

例如当前 case 中 print details 这部分代码，只是简单的引用了局部变量 outstanding，因此，我们提炼的时候，也相对简单，只需要把它当作参数传给目标函数即可。代码如下：

```js
function printOwing() {
  const orders = []; // 订单列表
  const outstanding = 0; // 余额

  printBanner();

  // calculate outstanding
  orders.forEach((order) => {
    outstanding += order.amount;
  });

  // print details
  printDetails(outstanding);
}

function printBanner() {
  // 打印横幅
  console.log("-----");
  console.log("print banner");
  console.log("-----");
}
function printDetails(outstanding) {
  console.log("outstanding：", outstanding);
}
```

当然，如果被提炼代码引用了多个局部变量，或者引用了一个对象，我们都可以采用这种方式，把其当作参数传给目标函数即可。

#### 场景 3：对局部变量再赋值

如果被提炼代码还要对局部变量进行赋值，那情况就更复杂啦。这里在具体分为两种情况：

1.  这个局部变量只在被提炼代码中使用。如果是这种情况，直接把这个局部变量直接移到被提炼代码中，一块提炼到目标函数中。
2.  被提炼代码之外的代码也使用了这个局部变量，
    1.  如果这个局部变量在被提炼代码之后未被使用，那只需要在目标函数中修改它即可。
    2.  如果这个局部变量在被提炼代码之后还被使用，那就需要让目标函数返回该局部变量返回之后的值。

看完上面的结论，我们再来看之前的这个 case，我们会发现，outstanding 这个局部变量不仅在第二部分代码中被修改，同时在第三部分代码中也被使用，因此 很明显属于我们上面提到的 2 - 2 这个结论，因此，我们采用如下的方式去提炼第二部分的代码：

```js
function printOwing() {
  const outstanding = 0; // 余额

  printBanner();
  outstanding = getOutstanding(outstanding);
  printDetails(outstanding);
}

function printBanner() {
  // 打印横幅
  console.log("-----");
  console.log("print banner");
  console.log("-----");
}

function getOutstanding(initValue) {
  const orders = []; // 注意点：由于orders 只在被提炼代码中使用了，所以也符合1-1的结论，直接一块被提炼到目标函数中
  let result = initValue;
  orders.forEach((order) => {
    outstanding += order.amount;
  });
  return result;
}

function printDetails(outstanding) {
  console.log("outstanding：", outstanding);
}
```

至此，我们就从 printOwing 这个源函数提炼出了三个目标函数，很显然，提炼之后的代码逻辑更加清晰，也更加优雅。

再次强调一下：**提炼函数的困难点在于如何处理对于源函数局部变量的引用，那具体如何处理，我们上面已经做出了解答，大家一定要实际去写代码体会体会，才会有更深刻的理解。**

## 内联函数

前面我们提到了如何去提炼函数，但是实际开发中，并不是提炼的越多越好，因为每提炼一个函数，就会增加一层源函数和目标函数的调用关系，这样的调用关系并不是越多越好，相反，有些时候没有必要进行提炼，将代码直接写在源函数就已经非常清晰易懂了，这个时候就没有必要再提炼函数啦，我们把这种处理方式叫做：**内联函数**。

我们通过一个例子来体会一下：

```js
function getLevel() {
  return isMoreThanFive() ? 1 : 2;
}
function isMoreThanFive() {
  return count > 5;
}
```

看完以上代码，很显然，count > 5 这段代码，其实没有必要再单独提炼成一个函数，而是直接写在 getResult 函数体中反而更清晰，因此我们就可以通过 **内联函数** 的方法去进行代码优化。

```js
function getResult() {
  return count > 5 ? 1 : 2;
}
```

在实际开发中，这种**过度提炼函数**的问题其实也是经常会发现的，我们要学会用内联函数的方法去对代码进行优化。

## 内联临时变量

和内联函数类似，如果一个临时变量，只被一个**简单的表达式**赋值了**一次**，那其实我们就没有必要创建这个临时变量啦，直接使用这个简单表达式即可。

我们通过一个例子体会一下：

```js
function fn() {
  let temp = order.basePrice();
  return temp > 50;
}
```

这时，我们就可以采用**内联临时变量**的手法去进行优化。

```js
function fn() {
  return order.basePrice() > 50;
}
```

当然，我们也注意到了，采用这种手法的有两个前提：

- 只被赋值了一次：也就是说如果某个表达式被使用了多次，很显然我们可以使用一个临时变量记录下表达式的结果，从而减少计算。
- 简单的表达式：也就是说如果表达式比较复杂，按我们最好还是用一个临时变量存储一下。而不是直接耦合到其他表达式中。

## 引入解释性变量

当表达式比较复杂，难以阅读时，我们就可以考虑将这个复杂表达式的结果用一个临时变量存储起来，并且用这个临时变量来解释表达式的含义或者用途。

我们通过一个例子实际体会一下：

```js
if (
  platform.toUpperCase().indexOf("MAC") > -1 &&
  brower.toUpperCase().indexOf("IE") > -1
) {
  // ...
}
```

很显然，if 条件中的表达式有点长啦，那么我们这个时候，就需要考虑用一个临时变量来存储这些复杂表达式的值。

```js
const isMacOs = platform.toUpperCase().indexOf("MAC") > -1;
const isIEBrowser = brower.toUpperCase().indexOf("IE") > -1;
if (isMacOs && isIEBrowser) {
  // ....
}
```

这里有一个细节要注意：**我们声明临时变量时，最好是使用 const，因为这个临时变量仅仅是为了存储当前这个复杂表达式的结果，是不可以修改的**，如果实际开发中，如果有修改，那我们就要考虑是否适合用临时变量去处理对应的代码逻辑啦

写到这儿，难道上面的代码就是最优的代码方案了吗？不是，因为**临时变量本身就有自己的作用域限制，也就是说它是临时的，而且临时变量过多时，又回带来新的问题，**那如何进一步优化呢？答案就是 提炼函数。代码如下：

```js
function isMacOs() {
  return platform.toUpperCase().indexOf("MAC") > -1;
}
function isIEBrowser() {
  return brower.toUpperCase().indexOf("IE") > -1;
}

if (isMacOs && isIEBrowser) {
  // ....
}
```

相对于临时变量，通过提炼函数的方式有什么好处呢？**函数本身，不像临时变量那样是有作用域限制的，在其他模块或者函数中依然可以使用。**

`那在实际开发中，如何去权衡到底是使用临时变量还是使用提炼函数呢？主要看其是否可以复用，例如我们例子中提到的isMacOs等方法，很显然是可以全局复用的，那我们这时就可以使用提炼函数，但是如果确实只是某个函数内部临时的逻辑，那我们就用临时变量来存储即可，`

## 分解临时变量

**如果一个函数中一个临时变量被不同的表达式赋值超过了一次（不包含循环变量），那说明这个临时变量大概率承担了一个以上的责任，那么这时，我们就需要将其分解成多个临时变量，保证每个变量只承担一个责任，同一个临时变量承担多个责任，会让代码阅读者糊涂。**

我们通过一个例子体会一下：

```js
let temp = (height + width) * 2;
console.log(temp);
temp = height * width;
console.log(temp);
```

很显然，上面这种代码我们平时开发中也是经常看得到的，不管是出于没找到合适的变量名，还是本身就觉得这样写也没啥问题，确实运行上不会有问题，但是从代码整洁性的角度来考虑，或者从变量命名的角度来考虑，这都是不合格的，我们要尽可能使用有明确意义的命名。

基于此，我们进一步优化一下：

```js
let premitter = (height + width) * 2;
console.log(premitter);
let area = height * width;
console.log(area);
```

因此，如果遇到了临时变量被赋值了多次的代码，我们就需要考虑是否要分解该临时变量。

## 移除对参数的赋值

首先，这里要明确一下**对参数赋值**的含义：

1.  如果传入的参数是基本数据类型，那我们对其进行任何修改，也不会对调用端造成影响。
2.  如果传入的参数是引用数据类型，比如一个对象 foo，并且对 foo 的某些属性进行了修改，这是 OK 的。
3.  但是如果传入的参数是引用数据类型，比如一个对象 foo，我们直接在函数内部修改了 foo 的引用，也就是说把它指向了一个新的对象，那么这就出问题啦，因为这样很可能对 foo 其他调用端造成影响，比如：foo 刚开始指向 a 对象，其他调用的地方都是针对 a 对象中的属性来处理的，现在你直接把 foo 指向了对象 b，很明显这样会出问题。

因此，我们这里所说的不要对参数赋值，主要指的是第三点，因为它不仅会使代码出问题，而且降低了代码的可读性，而且相当于混用了按值传递和按引用传递。这是不合理的。

```js
function fn(foo) {
  foo.modifyInSomeWay(); // 没问题
  foo = anthorObject; // 有问题
}
```

以上是从代码是否能够正常运行，是否能够避免一些意想不到的错误的角度来考虑的，在实际开发中，第二种情况经常需要的。

另外一方面，从代码可读性的角度来考虑，不管是参数是值类型，还是引用类型，我们都要避免对参数进行修改，如果遇到这种情况，该怎么办呢？**将参数的值赋值临时变量，之后统一对临时变量进行操作**。

接下来，我们结合一个实际例子体会一下：

```js
function calculate(val, level) {
  if (level > 10) val -= 1;
  if (level > 20) val -= 2;
  return val;
}
```

以上代码，我们直接对参数 val 进行了修改，虽然 val 是一个值类型，直接修改以后也不会报错，但是从代码可读性的角度来说，我们更推荐使用下面的方式进行实现。

```js
function calculate(val, level) {
  let result = val;
  if (level > 10) result -= 1;
  if (level > 20) result -= 2;
  return result;
}
```

## 总结

如何去重新组织函数，我们本文提到了很多的方法，其实总结下来也比较简单：

1.  我们要学会什么时候可以提炼函数，什么时候内联函数函数。
2.  在提炼或者内联函数的过程中，最重要的就是对局部变量的处理，那具体有又分为很多情况
    1.  是否有局部变量，如果没有最简单，如果有，这时就要考虑是否可以通过参数传给子函数。
    2.  是否对局部变量进行了赋值。如果有，那我们就需要考虑是否要在子函数中返回修改之后的值。
    3.  是否局部临时变量过多，这时可以考虑内联局部变量，以及分解临时变量
    4.  是否局部变量过少，这时应考虑是否需要引入解释性临时变量。

以上这些方法，不需要大家去背诵，理解其场景即可，然后在实际开发中，写完一个函数的时候，我们要养成习惯去对其进行重构，重构无时无刻进行着，从而保证我们的代码处于一个比较好的状态。
