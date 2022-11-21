# Dialog 对话框

## 子组件内容过多，加载卡顿

`el-dialog` 内容包含的子组件加载太慢，所以要等子组件加载完，才会打开

解决方案：先打开弹框，loading 加载内容

```vue
<template>
  <!-- opened 打开弹框动画后，在渲染里面的内容 -->
  <el-dialog v-model="dialogVisible" @opened="opened = true">
    <el-scrollbar v-loading="!opened">
      <div v-if="opened">内容</div>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const opened = ref(false)
</script>
```
