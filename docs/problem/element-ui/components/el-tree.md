# Tree 树形控件

## 全选/反选

```vue
<template>
  <el-checkbox v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
  <el-tree :data="treeData" ref="tree"></el-tree>
</template>

<script>
export default {
  methods: {
    // 全选
    handleCheckAll() {
      checkAll ? this.$refs.tree.setCheckedNodes(this.treeData) : this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>
```

## 默认全选

```vue
<template>
  <el-checkbox v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
  <el-tree :data="treeData" ref="tree"></el-tree>
</template>

<script>
export default {
  watch: {
    // 在弹框打开时执行全选方法
    visible(newVal) {
      if (newVal) this.handleCheckAll()
    },
  },
  methods: {
    // 全选
    async handleCheckAll() {
      // 默认全选就必须加，否则会报错“setCheckedNodes”未定义
      await this.$nextTick(() => {})
      checkAll ? this.$refs.tree.setCheckedNodes(this.treeData) : this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>
```
