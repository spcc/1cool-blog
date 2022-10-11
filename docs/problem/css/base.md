# 常用

## 修改 input 的 placeholder 样式

::: details 点击查看代码

```scss
input::placeholder {
  color: red;
}
```

禁用时 不显示 `placeholder`

```scss
input:disabled::placeholder {
  color: transparent;
}
```

:::
