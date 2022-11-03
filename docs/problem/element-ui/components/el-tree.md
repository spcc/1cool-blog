# Tree 树形控件

## 获取当前点击的所有父节点

[网址](https://blog.csdn.net/weixin_44640323/article/details/124734171)

## 全选/反选 和 默认全选

### 全选/反选

::: details 点击查看代码

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
      checkAll
        ? this.$refs.tree.setCheckedNodes(this.treeData)
        : this.$refs.tree.setCheckedKeys([]);
    },
  },
};
</script>
```

:::

### 默认全选

:::details 点击查看代码

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
      if (newVal) this.handleCheckAll();
    },
  },
  methods: {
    // 全选
    async handleCheckAll() {
      // 默认全选就必须加，否则会报错“setCheckedNodes”未定义
      await this.$nextTick(() => {});
      checkAll
        ? this.$refs.tree.setCheckedNodes(this.treeData)
        : this.$refs.tree.setCheckedKeys([]);
    },
  },
};
</script>
```

:::

## 全选/反选，子集选中或取消，全选也联动

::: danger 警告
仅支持开启 `check-strictly` 属性的情况下  
[check-strictly](https://element-plus.org/zh-CN/component/tree.html#%E5%B1%9E%E6%80%A7): 父子不互相关联，默认为 false
:::

:::details 点击查看代码

```vue
<template>
  <div class="page">
    <el-checkbox v-model="treeSelectAllChecked" @change="handleSelectAll">
      全选
    </el-checkbox>
    <!-- 属性和方法都是必选项 -->
    <el-tree
      :data="treeData"
      show-checkbox
      check-strictly
      node-key="id"
      ref="tree"
      @check-change="handleCheckChange"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeSelectAllChecked: false, // 全选
      treeData: [
        {
          id: 1,
          label: "一级 1",
          disabled: true,
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
        },
      ],
    };
  },
  methods: {
    /**
     * 全选: 点击checkbox执行全选/反选
     * @param {Boolean} checked - true: 全选 false: 反选
     */
    handleSelectAll(checked) {
      checked
        ? this.$refs.tree.setCheckedKeys(this.getAllKeys(this.treeData))
        : this.$refs.tree.setCheckedKeys([]);
    },

    /**
     * 递归返回所有节点KEY
     * @param {Array} data - 所有节点
     * @param {Object} Props - 自定义参数默认值
     * @param {Object} Props.key - 指定节点唯一key
     * @param {Object} Props.disabled - 指定节点对象禁用的属性值
     * @param {Array} arr - arr参数是为了缓存上一次的值，不需要传
     */
    getAllKeys(
      data = [],
      props = { key: "id", disabled: "disabled" },
      arr = []
    ) {
      for (let item of data) {
        if (!item[props.disabled]) arr.push(item[props.key]);
        let parentArr = [];
        if (item.children) parentArr.push(...item.children);
        if (parentArr && parentArr.length)
          this.getAllKeys(
            parentArr,
            (props = { key: "id", disabled: "disabled" }),
            arr
          );
      }
      return arr;
    },

    /**
     * 树节点选中状态发生变化
     * @param {Object} node - 所有节点
     * @param {Boolean} checked - 唯一key名称
     * @param {Boolean} childrenChecked - arr参数是为了缓存上一次的值，不需要传
     */
    handleCheckChange(node, checked, childrenChecked) {
      if (checked) {
        // 树所有数据的条数 已过滤disabled
        let allTreeNodesLength = this.getAllKeys(this.treeData).length;
        // 树节点被选择的条数
        let checkedKeysLength = this.$refs.tree.getCheckedKeys().length;
        this.treeSelectAllChecked = allTreeNodesLength === checkedKeysLength;
      } else {
        this.treeSelectAllChecked = false;
      }
    },
  },
};
</script>
```

:::
