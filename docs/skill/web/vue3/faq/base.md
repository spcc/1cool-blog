# 语法分析

## setup

::: danger 注意
props  是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。
content 是一个普通的对象,context 中就提供了中三个属性：attrs、slot  和 emit，分别对应 Vue2.x 中的  $attr属性、slot插槽 和$emit 发射事件。
:::

```js
<script>
export default {
  name: "HelloWorld",
  setup(props, content) {

  }
};
</script>
```

## reactive, ref, toRef 与 toRefs

### ref

只创建基础数据类型`String、Number、Boolean、Symbol、Undefined、Null`

### reactive

reactive 相当于 Vue2.x 的 Vue.observable () API，经过 reactive 处理后的函数能变成响应式的数据。注意：只能返回对象的响应式数据，不能创建基本类型。 语法

`const 代理对象 = reactive(源对象);接收一个引用类型的对象（或数组），返回一个代理对象（proxy 对象）`

const counter = reactive({count: 0})

### toRef

官网是这么解释的,可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。就是要将响应式对象中的某个属性单独给外部使用时候。

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8e7b1d8da5d41e3ae79808c9769409b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?">

toRef()函数用来把一个响应式对象的某个 key 值转换成 ref,是这么实现的。

```js
function toRef(target, key) {
  return {
    isRef: true,
    get value() {
      return target[key];
    },
    set value(newVal) {
      target[key] = newVal;
    },
  };
}
```

### toRefs

toRefs 和 toRef 功能是一致的，但是可以批量创建多个 ref 对象。

语法：

```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2,
  });

  // ...基于状态的操作逻辑

  // 在返回时都转为 ref
  return toRefs(state);
}

// 可以解构而不会失去响应性
const { foo, bar } = useFeatureX();
```

toRefs()的实现

```js
function toRefs(target) {
  const ret = {};
  for (const key in target) {
    ret[key] = toRef(target, key);
  }
  return ret;
}
```
