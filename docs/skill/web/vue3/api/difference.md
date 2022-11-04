# 区别

Vue3 中有哪些小细节是和 Vue2 不同的？

## 作用域样式 style

### 深度选择器

:::details 点击查看代码

```vue
<template>
  <div class="parent">
    <ChildView />
  </div>
</template>

<style scoped>
/* .red 选择器将作用于 <ChildView /> 组件 */
.parent :deep(.red) {
  color: red;
}
</style>
```

:::

### 全局选择器

:::details 点击查看代码

在 Vue3 中，可以在作用域样式中使用 `:global` 这个伪类：

```vue
<style scoped>
/* .red 选择器将作用于全局 */
:global(.red) {
  color: red;
}
</style>
```

在 Vue2 组件中

```vue
<style>
.red {
  color: red;
}
</style>
```

:::

### 插槽选择器

默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。而使用 `:slotted` 伪类可以打破这种情况

:::details 点击查看代码

在 Vue3 中，可以在作用域样式中使用 `:global` 这个伪类：

```vue
<template>
  <div class="child"><slot />`</div>
</template>

<style scoped>
/* .red 选择器将作用于 <slot /> 渲染出来的内容 */
:slotted(.red) {
  color: red;
}
</style>
```

:::

## style 中的 v-bind

组件的 &lt;style&gt; 内支持使用 v-bind 绑定动态的组件状态：

```vue
<script setup>
import { ref } from "vue";

const color = ref("red");
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind("color");
}
</style>
```

既然可以绑定动态的组件状态，那么切换主题就变得非常简单了：

::: details 点击查看代码

```vue
<script setup>
import { reactive } from "vue";

const theme = reactive({});
setWhiteTheme();
function setWhiteTheme() {
  theme.fontColor = "#000";
  theme.backgroundColor = "#fff";
}
function setBlackTheme() {
  theme.fontColor = "#fff";
  theme.backgroundColor = "#000";
}
</script>

<template>
  <div class="main">
    <button @click="setWhiteTheme">白色主题</button>
    <button @click="setBlackTheme">黑色主题</button>
    <div class="content">
      <div>Hello Vue3!</div>
    </div>
  </div>
</template>

<style scoped>
.content {
  color: v-bind("theme.fontColor");
  background-color: v-bind("theme.backgroundColor");
}
</style>
```

:::

## &lt;script setup&gt; 与 &lt;script&gt; 一起使用

虽然尤大大推荐使用 &lt;script setup&gt; ，但有时候还得用到普通的 &lt;script&gt; ，这时候我们可以混合起来使用

## v-model

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

## v-memo

`v-memo` 用来缓存一个模板的子树，在元素和组件上都可以使用。

`v-memo` 仅用于性能至上场景中的微小优化，最常见的情况可能是有助于渲染海量 `v-for` 列表 (长度超过 1000 的情况)：

注意：当搭配 `v-for` 使用 `v-memo`，确保两者都绑定在同一个元素上。`v-memo` 不能用在 `v-for` 内部使用

```html
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```
