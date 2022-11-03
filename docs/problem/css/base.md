# 常用

## 扩大点击区域

::: details 点击查看代码

```scss
.btn {
  position: relative;
}
.btn::before {
  content: "";
  position: absolute;
  top: -20px;
  right: -20px;
  bottom: -20px;
  left: -20px;
}
```

:::

## Input 的 placeholder

### 修改 input 的 placeholder 样式

::: details 点击查看代码

```scss
input::placeholder {
  color: red;
}
```

:::

### 禁用时 不显示 `placeholder`

::: details 点击查看代码

```scss
input:disabled::placeholder {
  color: transparent;
}
```

:::

## 媒介查询

### 大于等于

::: details 点击查看代码

`用 min-width 时，小的放上面大的在下面`

```scss
// >=1024的设备
@media (min-width: 1024px) {
  body {
    font-size: 18px;
  }
}

// >=1280的设备
@media (min-width: 1280px) {
  body {
    font-size: 20px;
  }
}
```

:::

### 小于等于

::: details 点击查看代码

`用max-width那么就是大的在上面，小的在下面`

```scss
// <=1280的设备
@media (max-width: 1280px) {
  body {
    background-color: yellow;
  }
}

// <=740的设备
@media (max-width: 740px) {
  body {
    background-color: red;
  }
}
```

:::

### 区间

::: details 点击查看代码

```scss
// 小于等于1280的屏幕
@media (max-width: 1280px) {
  body {
    background: pink;
  }
}

// 大于等于1281 并且 小于等于 1366的屏幕
@media (min-width: 1281px) and (max-width: 1366px) {
  body {
    background: red;
  }
}

// 大于等于1367 并且 小于等于 1440的屏幕
@media (min-width: 1367px) and (max-width: 1440px) {
  body {
    background: yellow;
  }
}

// 大于等于1441的屏幕
@media (min-width: 1441px) {
  body {
    background: green;
  }
}
```

:::
