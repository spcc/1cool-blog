# 过渡

学的是零碎的知识点，缺少真实的使用场景

## 场景一：父子组件数据传递

注意：`defineProps` 、`defineEmits` 、 `defineExpose` 和 `withDefaults` 这四个宏函数只能在 &lt;script setup&gt; 中使用。他们不需要导入，会随着 &lt;script setup&gt; 的处理过程中一起被编译。

### 父组件数据传递到子组件

props 需要使用 `defineProps()` 这个宏函数来进行声明

```js
const props = defineProps({
  someProp: {
    type: String,
    required: true,
  },
});

console.log(props.someProp); // parent message
```

### 子组件数据传递到父组件

emits 需要使用 `defineEmits()` 这个宏函数来进行声明

```js
const emit = defineEmits(["change"]);
const onClick = () => {
  emit("change", "child message");
};

console.log(props.someProp); // parent message
```

### 父组件使用子组件数据

子组件通过 `defineExpose` 显式的暴露出去  
在 `&gt;script setup&lt;` 中，组件的属性和方法默认都是私有的

:::details

子组件

```vue
<script setup>
import { ref } from "vue";

const msg = ref("hello vue3!");
const change = () => {
  msg.value = "hi vue3!";
  console.log(msg.value);
};

// 属性或方法必须暴露出去，父组件才能使用
defineExpose({ msg, change });
</script>
```

父组件

```vue
<!-- 父组件 -->
<script setup>
import ChildView from "./ChildView.vue";
import { ref, onMounted } from "vue";

const child = ref(null);
onMounted(() => {
  console.log(child.value.msg); // hello vue3!
  child.value.change(); // hi vue3!
});
</script>

<template>
  <ChildView ref="child"></ChildView>
</template>
```

:::

## 组件之间双向绑定

Vue2 中组件的双向绑定采用的是 `v-model` 或 `.snyc` 修饰符，两种写法多少有点重复。Vue3 中统一使用 `v-model` 进行处理，并且可以和多个数据进行绑定，如 `v-model:foo`、`v-model:bar` 。

`v-model` 等价于 `:model-value="someValue"` 和 `@update:model-value="someValue = $event"`

`v-model:foo` 等价于 `:foo="someValue"` 和 `@update:foo="someValue = $event"`

下面就是一个父子组件之间双向绑定的例子：

:::details
父组件

```vue
<!-- 父组件 -->
<script setup>
import ChildView from "./ChildView.vue";
import { ref } from "vue";

const msg = ref("hello vue3!");
</script>

<template>
  <ChildView v-model="msg" />
</template>
```

子组件

```vue
<!-- 子组件 -->
<script setup>
defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div @click="emit('update:modelValue', 'hi vue3！')">{{ modelValue }}</div>
</template>
```

:::

如果你觉得上面的模板比较繁琐，也可以结合 computed 一起使用：

:::details

```vue
<!-- 子组件 -->
<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const newValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <input v-model="newValue" />
</template>
```

:::

## 场景三：路由跳转，获取路由参数

router 需要使用 `useRouter` 方法来进行路由跳转

```vue
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const onClick = () => {
  router.push({
    path: "/about",
    query: {
      msg: "hello vue3!",
    },
  });
};
</script>
```

当我们要获取路由参数时，可以使用 `vue-router` 提供的 `useRoute` 方法：

```vue
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.query.msg); // hello vue3!
</script>
```

## 场景四：获取上下文对象

通过 `getCurrentInstance` 方法获取上下文对象  
虽然不推荐这样使用

注意：推荐使用`proxy` ，在开发环境和生产环境都可以使用。`ctx· 只能在开发环境使用，生成环境为 `undefined`。

```vue
<script setup>
import { getCurrentInstance } from "vue";

// 以下两种方法都可以获取到上下文对象
const { proxy } = getCurrentInstance();
const { ctx } = getCurrentInstance();
</script>
```

这样我们就可以使用 $parent 、$refs 等，干自己想干的事情了，下面是我打印出来的 ctx 的完整属性。

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cb24dc592084014976392412dac0325~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?" />

## 插槽的使用

在 `Vue3` 中则是通过 `v-slot` 这个指令来指定模板的位置，同时获取作用域插槽的数据，如：

:::details 点击查看代码

父组件

```vue
<script setup>
import ChildView from "./ChildView.vue";
</script>

<template>
  <div>parent</div>
  <ChildView>
    <template v-slot:content="{ msg }">
      <div>{{ msg }}</div>
    </template>
  </ChildView>
</template>

<!-- ChildView 也可以简写为： -->
<ChildView>
  <template #content="{ msg }">
    <div>{{ msg }}</div>
  </template>
</ChildView>
```

子组件

```vue
<!-- 子组件 -->
<template>
  <div>child</div>
  <slot name="content" msg="hello vue3!"></slot>
</template>
```

:::

在 `Vue2` 的中一般是通过 `slot` 属性指定模板的位置，通过 `slot-scope` 获取作用域插槽的数据，如：

:::details 点击查看代码

父组件

```vue
<script setup>
import ChildView from './ChildView.vue'
</script>

<template>
  <div>parent<div>
  <ChildView>
    <template slot="content" slot-scope="{ msg }">
      <div>{{ msg }}</div>
    </template>
  </ChildView>
</template>
```

子组件

```vue
<template>
  <div>child</div>
  <slot name="content" msg="hello vue3!"></slot>
</template>
```

:::

注意：`v-slot` 在 Vue2 中也可以使用，但必须是 Vue2.6+ 的版本。

## 缓存路由组件

缓存一般的动态组件，Vue3 和 Vue2 的用法是一样的，都是使用 `KeepAlive` 包裹 `Component`。但缓存路由组件，Vue3 需要结合插槽一起使用：

Vue3 中缓存路由组件
:::details 点击查看代码

```js

<RouterView v-slot="{ Component }">
  <KeepAlive>
    <Component :is="Component"></Component>
  </KeepAlive>
</RouterView>
```

:::

一个持续存在的组件可以通过 `onActivated()` 和 `onDeactivated()` 两个生命周期钩子注入相应的逻辑：

:::details 点击查看代码

```vue
<script setup>
import { onActivated, onDeactivated } from "vue";

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
});

onDeactivated(() => {
  // 调用时机为从 DOM 上移除、进入缓存
  // 以及组件卸载时
});
</script>
```

:::

vue2 中缓存路由组件

:::details 点击查看代码

```vue
<KeepAlive>
  <RouterView />
</KeepAlive>
```

:::

## 逻辑复用

Vue2 中逻辑复用主要是采用 `mixin`，但 `mixin` 会使数据来源不明，同时会引起命名冲突

Vue3 更推荐的是全新的 `Composition Api`。

### 同步函数

下面是鼠标跟踪的例子，我们可以把逻辑提取出来：

:::details 点击查看代码

```js
// mouse.js
import { ref, onMounted, onUnmounted } from "vue";

// 按照惯例，组合式函数名以 use 开头
export function useMouse() {
  // 组合式函数管理的数据
  const x = ref(0);
  const y = ref(0);

  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // 组合式函数可以挂靠在所属组件的生命周期上，来启动和卸载副作用
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  // 通过返回值暴露所管理的数据
  return { x, y };
}
```

:::

这时候在组件中我们就可以直接使用 `mouse.js` 暴露的数据了。

:::details 点击查看代码

```vue
<script setup>
import { useMouse } from "./mouse.js";

const { x, y } = useMouse();
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

:::

### 异步函数

在做异步数据请求时，我们通常需要处理三个不同的状态：

`加载中`、`加载成功`和`加载失败`。  
获取这些状态的逻辑是通用的，我们可以把它提取出来：
