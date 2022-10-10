# 常见问题

## 1. Vue3.0 里为什么要用 Proxy API 替代 defineProperty API？

Object.defineProperty 只能通过遍历对象属性的方式进行数据劫持，而 Proxy 则直接可以劫持整个对象，相当于我们直接操作这个对象就可以达到相应式目的；除此之外，除此之外 Object.defineProperty API，只能劫持 getter 和 setter，Proxy 除 getter 和 setter 外还可以劫持 `apply`、`has` 等 13 种劫持方法

## 2. Vue3 响应式实现原理

通过 Proxy(代理)：拦截对象中任意属性的变化，包括属性值的填写,属性值的添加，删除操作。
通过 Reflect(反射)：对源对象的属性进行操作

## 3. ref 和 reative 到底有什么区别？

vue3 利用 proxy 实现响应式，而 proxy 不能代理基础类型，vue3 就只能给他包装成一个对象再进行代理，所以大家可以看到基础类型变成响应式读取值的时候需要.value 啦
