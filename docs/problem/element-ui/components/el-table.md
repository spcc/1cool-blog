# Table 表格

[Table 网址](https://element.eleme.cn/#/zh-CN/component/table)

## 修改行悬停颜色

```css
<style lang="scss" scoped>
.el-table {
  ::v-deep tbody tr:hover>td {
    background-color:#90c0f1；
  }
}
</style>
```

## 如何在 **@row-click 单击行** 获取 当前 index

总结：`:row-class-name=“tableRowClassName”` 属性给每一行数据对象里添加 index 属性

```vue
<el-table
  :row-class-name="tableRowClassName"
  :data="tableList"
  border
  stripe
  fit
  highlight-current-row
  @row-click="clickRow"
>
```


