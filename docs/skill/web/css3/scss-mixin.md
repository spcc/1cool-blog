# scss-mixin 混入

## 创建 mixin

超出一行显示省略号

::: details 点击查看代码

\_mixins.scss

```scss
@mixin singleline-ellipsis($width) {
  width: $width;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

main.scss

```scss
.text {
  @include singleline-ellipsis(600px);
}
```

编译成功的 css 代码：

```scss
.text {
  width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

:::
