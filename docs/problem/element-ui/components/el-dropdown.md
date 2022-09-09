# Dropdown 下拉菜单

## 如何不插入到 body

`el-dropdown-menu` 是有 `append-to-body` 这个属性得，但是文档里没有写

不插入到 `body`

```html
<el-dropdown-menu :append-to-body="false" />
```
