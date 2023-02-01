# Dropdown 下拉菜单

## 设置下拉框 class

`el-dropdown-menu` 是有 `popper-class` 这个属性得，但是文档里没有写

不插入到 `body`

```html
<el-dropdown-menu :popper-class="popperClassDropdown" />
```

### 设置下拉框最大高度

```html
<el-dropdown-menu :popper-class="popperClassDropdown" />

<style>
  .formulaFuncDropdown .el-scrollbar__wrap {
    max-height: 260px;
  }
  .formulaFuncDropdown .el-scrollbar .el-scrollbar__bar.is-vertical {
    z-index: 11;
  }
</style>
```

## 如何不插入到 body

`el-dropdown-menu` 是有 `append-to-body` 这个属性得，但是文档里没有写

不插入到 `body`

```html
<el-dropdown-menu :append-to-body="false" />
```
