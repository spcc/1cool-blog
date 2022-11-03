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
  <div class="child">
    <slot />`
  </div>
</template>

<style scoped>
/* .red 选择器将作用于 <slot /> 渲染出来的内容 */
:slotted(.red) {
  color: red;
}
</style>
```

:::
