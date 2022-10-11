# 语法分析

## setup

`setup` 函数会在 `beforeCreate` 、`created` 之前执行, vue3 也是取消了这两个钩子，统一用 `setup` 代替

```js
setup(props, context) {
  // Attribute (非响应式对象，等同于 $attrs)
  context.attrs
  // 插槽 (非响应式对象，等同于 $slots)
  context.slots
  // 触发事件 (方法，等同于 $emit)
  context.emit
  // 暴露公共 property (函数)
  context.expose

  return {}
}
```

- `props`: 用来接收 props 数据, props  是响应式的，当传入新的 props 时，它将被更新。
- `context` 用来定义上下文, 上下文对象中包含了一些有用的属性，这些属性在 vue 2.x 中需要通过 this 才能访问到, 在 setup() 函数中无法访问到 this，是个 undefined
- `context`  是一个普通的 JavaScript 对象，也就是说，它不是响应式的，这意味着你可以安全地对  context  使用 ES6 解构。
- `返回值`: return {}, 返回响应式数据, 模版中需要使用的函数

::: danger 注意
props  是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。不过你可以使用如下的方式去处理
:::

```js
<script lang="ts">
export default {
  setup(props) {
    const { title } = toRefs(props)
    console.log(title.value)
  }
};
</script>
```

如果 `title` 是可选的 `prop`，则传入的 `props` 中可能没有 `title` 。在这种情况下，`toRefs` 将不会为 `title` 创建一个 `ref` 。你需要使用 `toRef` 替代它：

```js
<script lang="ts">
export default {
  setup(props) {
    const { title } = toRef(props, 'title')
    console.log(title.value)
  }
};
</script>
```

## ref, reactive, shallowReactive, toRef 与 toRefs

### ref

只创建基础数据类型`String、Number、Boolean、Symbol、Undefined、Null`

### reactive

reactive 相当于 Vue2.x 的 Vue.observable () API，经过 reactive 处理后的函数能变成响应式的数据。注意：只能返回对象的响应式数据，不能创建基本类型。 语法

`const 代理对象 = reactive(源对象);接收一个引用类型的对象（或数组），返回一个代理对象（proxy 对象）`

const counter = reactive({count: 0})

## readonly()、isReadonly()、shallowReadonly()

### readonly()、isReadonly()

- `readonly`: 传入 ref 或 reactive 对象,并返回一个原始对象的只读代理,对象内部任何嵌套的属性也都是只读的、 并且是递归只读。

- `isReadonly`: 检查对象是否是由 readonly 创建的只读对象

```js
<script lang="ts">
import { readonly, reactive } from "vue";
export default defineComponent({
  setup() {
    const test = reactive({ num: 1 });

    const testOnly = readonly(test);

    console.log(test);
    console.log(testOnly);

    test.num = 110;

    // 此时运行会提示 Set operation on key "num" failed: target is readonly.
    // 而num 依然是原来的值，将无法修改成功
    testOnly.num = 120;

    // 使用isReadonly() 检查对象是否是只读对象
    console.log(isReadonly(testOnly)); // true
    console.log(isReadonly(test)); // false

    // 需要注意的是： testOnly 值会随着 test 值变化

    return {
      test,
      testOnly,
    };
  },
});
</script>

```

`const`定义的变量也是不能改的，那`readonly`和`const`有什么区别？

- `const`是赋值保护，使用`const`定义的变量，该变量不能重新赋值。但如果`const`赋值的是对象，那么对象里面的东西是可以改的。原因是`const`定义的变量不能改说的是，对象对应的那个地址不能改变
- 而`readonly`是属性保护，不能给属性重新赋值

### shallowReadonly()

`shallowReadonly` 作用只处理对象最外层属性的响应式（浅响应式）的只读，但不执行嵌套对象的深度只读转换 (暴露原始值)

::: details 点击查看代码

```js

<script lang="ts">
import { readonly, reactive } from "vue";
export default defineComponent({
 setup() {

   const test = shallowReadonly({ num: 1, creator: { name: "撒点了儿" } });
   console.log(test);

   // 依然会提示： Set operation on key "num" failed: target is readonly.
   // 而num 依然是原来的值，将无法修改成功
   test.num = 3;
   // 但是对于深层次的属性，依然可以修改
   test.creator.name = "掘金";

   return {
     test
   };
 },
});
</script>

```

:::

## shallowReactive

创建一个响应式代理，它跟踪其自身属性的响应性 `shallowReactive` 生成非递归响应数据，只监听第一层数据的变化，但不执行嵌套对象的深层响应式转换 (暴露原始值)。

```js

<script lang="ts">
import { shallowReactive } from "vue";
export default defineComponent({
  setup() {
    const test = shallowReactive({ num: 1, creator: { name: "撒点了儿" } });
    console.log(test);

    test.creator.name = "掘金";

    return {
      test
    };
  }
});
</script>

```

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
