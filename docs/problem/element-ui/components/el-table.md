# Table 表格

[Table 网址](https://element.eleme.cn/#/zh-CN/component/table)

## 如何在 **@row-click 单击行** 获取 当前index
总结：`:row-class-name=“tableRowClassName”` 属性给每一行数据对象里添加index属性

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

https://blog.csdn.net/weixin_43258184/article/details/124154501
