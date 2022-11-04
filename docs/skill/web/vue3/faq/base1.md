# 基础

## 生命周期

Vue3 的生命周期和 Vue2 相比，有以下改动：

1. Vue3 生命周期钩子都以 `on` 开头，并且需要在组件中手动导入。

```vue
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("onMounted");
});
</script>
```

2. Vue3 取消了  `beforeCreate`  和  `created`  钩子。如果需要在组件创建前注入逻辑，直接在 `<script setup>` 中编写同步代码就可以了。如果这几个钩子同时存在，setup 的执行顺序要优先于 beforeCreate  和  created。
3. Vue3 中组件卸载的钩子名称有变化，`beforeDestroy` 改为 `onBeforeUnmount`，`destroyed` 改为 `onUnmounted`。
