# 深拷贝和浅拷贝

> 深拷贝和浅拷贝是只针对 Object 和 Array 这样的引用数据类型的

浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存

## 浅拷贝

### 什么是浅拷贝

浅拷贝是按位拷贝对象，它会创建一个新对象

如果属性是基本类型，拷贝的就是基本类型的值  
如果属性是引用类型，拷贝的就是内存地址

### 如何实现浅拷贝

#### 1. Object.assign()

`Object.assign({},obj,...)`可以接收无限个参数，`obj` 中的**基本类型属性会被深拷贝**。

```js
//原数据 { name: 'lucky', hobby: { like: 'running' } }
let person = {
  name: 'lucky',
  hobby: {
    like: 'running'
  }
}

let copyPerson = Object.assign({}, person)
copyPerson.name = 'mouse'         // name是基本数据类型
copyPerson.hobby.like = 'singing' // hobby是引用类型
​
// 对比原数据，对象copyPerson的改变影响了对象person的改变
console.log(person);     //{ name: 'lucky', hobby: { like: 'singing' } }
console.log(copyPerson); //{ name: 'mouse', hobby: { like: 'singing' } }
```

#### 2. 扩展运算符

> 扩展运算符（...）类似于 Object.assign()

##### A.拷贝对象

```js
// 扩展运算符
//原数据 { name: 'lucky', hobby: { like: 'running' } }
let person = {
  name: 'lucky',
  hobby: {
    like: 'running'
  }
}
​
let copyPerson = {...person}
copyPerson.name = 'mike'
copyPerson.hobby.like = 'swimming'

// 对比原数据，对象copyPerson的改变影响了对象person的改变
console.log(person)     // { name: 'lucky', hobby: { like: 'swimming' } }
console.log(copyPerson) // { name: 'mike', hobby: { like: 'swimming' } }
```

##### B.拷贝数组

```js
// 原数据[ 'name', 'hobby', 'person', { age: 19 } ]
let arr = ['name', 'hobby', 'person', { age: 19 } ]
​
let copyArr = [...arr];
copyArr[0] = 'nickname';
copyArr[copyArr.length - 1].age = 20;
​
// 对比原数据，数组copyArr的改变影响了数组arr的改变
console.log(arr)     // [ 'name', 'hobby', 'person', { age: 20 } ]
console.log(copyArr) // [ 'nickname', 'hobby', 'person', { age: 20 } ]
```

#### 3. Array.prototype.concat()

```js
// 原数据[ 'old', null, undefined, true, { hobby: 'undefined' } ]
let myArr = ['old', null, undefined, true, { hobby: undefined }];
let copyMyArr = myArr.concat();
​
copyMyArr[0] = 'nickname';
copyMyArr[copyMyArr.length - 1].hobby = 'books'
​
// 对比原数据，数组copyMyArr的改变影响了数组myArr的改变
console.log(myArr);     // [ 'old', null, undefined, true, { hobby: 'books' } ]
console.log(copyMyArr); // [ 'nickname', null, undefined, true, { hobby: 'books' } ]
```

#### 4. Array.prototype.slice()

```js
// 原数据 [ 'old', null, undefined, true, { hobby: 'undefined' } ]
let myArr = [
  'old',
  null,
  undefined,
  true,
  {
    hobby: undefined
  }
]

let copyMyArr = myArr.slice()
copyMyArr[0] = 'nickname'
copyMyArr[copyMyArr.length - 1].hobby = 'books'

// 对比原数据，数组copyMyArr的改变影响了数组myArr的改变
console.log(myArr) // [ 'old', null, undefined, true, { hobby: 'books' } ]
console.log(copyMyArr) // [ 'nickname', null, undefined, true, { hobby: 'books' } ]
```

## 深拷贝

深拷贝将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象

### 如何实现深拷贝？

#### JSON.parse(JSON.stringify(obj))

`JSON.stringify()` 将 JSON 格式的对象转为字符串  
`JSON.parse()` 将 JSON 格式的字符串转为对象

**缺点**

- 会忽略 `Symbol` 和 `undefined` 和 `function`
- 不能拷贝循环引用的对象，例如：
  ```js
  // 循环
  let b = {}
  let a = {
      b: b
  }
  ​
  b.a = a
  let c = JSON.parse(JSON.stringify(a)) // TypeError: Converting circular structure to JSON
  ```
- 对象中含有 `NaN`，`Infinity` 会变成 `null`
- 拷贝 `Date` 对象，得到的是字符串；拷贝 `RegExp` 对象，得到的是{}
- 不能序列化函数，拷贝出来的对象的属性顺序可能会和源对象不一致

```js
let student = {
    name: 'lucky',
    hobby: {
      like: 'dancing'
    },
    birth: undefined,
    title: Symbol('Banana'),
    date: new Date(),
    regexp: /^A/
}
let myStudent = JSON.parse(JSON.stringify(student));

//会忽略Symbol,undefined和函数
console.log(myStudent);
// {
//   name: 'lucky',
//   hobby: { like: 'dancing' },
//   date: '2022-10-11T10:45:21.484Z',
//   regexp: {}
// }
myStudent.name = 'duck';
myStudent.hobby.like = 'reading'
​
console.log(myStudent);
// {
//   name: 'duck',
//   hobby: { like: 'reading' },
//   date: '2022-10-11T10:45:21.484Z',
//   regexp: {}
// }
// myStudent的改变不会影响student
console.log(student);
// {
//  name: 'lucky',
//  hobby: {
//      like: 'dancing'
//  },
//  birth: undefined,
//  title: Symbol(Banana),
//  date: 2022 - 10 - 11 T10: 49: 10.521 Z,
//  regexp: /^A/
// }
```

## 手写浅拷贝

实现浅拷贝核心思想：如果属性是基本数据类型，则拷贝基本类型的值；如果属性是引用类型，拷贝的就是内存地址 ，会受拷贝对象（本体）的影响。

```js
function shallowCopy(obj) {
    if (typeof obj !== 'object') return;
​
    let newObj = Array.isArray(obj) ? [] : {};
    // let newObj=obj instanceof Array ?[]:{};
    // let newObj=obj instanceof Object ?[]:{};//这个不能判断
​
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { //自己本身具有的属性
            newObj[key] = obj[key];
        }
    }
    return newObj;
    // console.log(newObj);
}
// 测试对象
let obj = {
    name: 'lucky',
    like: {
        life: 'running'
    }
}
let myObj = shallowCopy(obj)
myObj.name = 'dunny'
myObj.like.life = 'singing'
console.log(myObj); //{ name: 'dunny', like: { life: 'singing' } }
console.log(obj); //{ name: 'lucky', like: { life: 'singing' } }
​
​
// 测试数组
let arr = ['hello', 'world', {
    name: 'cat'
}]
let myArr = shallowCopy(arr)
myArr[1] = 'moon'
myArr[myArr.length - 1].name = 'dog'
console.log(myArr); //[ 'hello', 'moon', { name: 'dog' } ]
console.log(arr); //[ 'hello', 'world', { name: 'dog' } ]
```

## 手写深拷贝

实现深拷贝核心思想：原始类型直接拷贝，引用类型递归。

```js
// 深拷贝
function deepCopy(obj) {
  // 过滤原始类型
  if (typeof obj !== 'object') return obj;
​
  // 过滤null类型 因为typeof null==object，使用不能使用typeof判断null数据类型
  if (obj == null) return obj;
​
  let newObj = Array.isArray(obj) ? [] : {};
  // let newObj=obj instanceof Array ?[]:{};
​
  // 拷贝Date对象
  if (obj instanceof Date) {
    newObj = new Date(obj)
  }
  // 拷贝RegExp对象
  if (obj instanceof RegExp) {
    newObj = new RegExp(obj)
  }
​
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) { //自己本身具有的属性
      newObj[key] = typeof obj[key] == 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}
​
// 测试对象
let obj = {
  name: 'lucky',
  like: {
    life: 'running'
  }
}
let myObj = deepCopy(obj)
myObj.name = 'dunny'
myObj.like.life = 'singing'
console.log(myObj); // { name: 'dunny', like: { life: 'singing' } }
console.log(obj); // { name: 'lucky', like: { life: 'running' } }
​
// 测试数组
let arr = ['hello', 'world', {
  name: 'cat'
}]
let myArr = deepCopy(arr)
myArr[1] = 'moon'
myArr[myArr.length - 1].name = 'dog'
console.log(myArr); // [ 'hello', 'moon', { name: 'dog' } ]
console.log(arr); // [ 'hello', 'world', { name: 'cat' } ]
```
