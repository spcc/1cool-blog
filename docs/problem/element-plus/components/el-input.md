# Input 输入框

## 密码框默认有内容，有个白色背景

<img src="/el-input-password.png" alt="设置中" />

```scss
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  -webkit-text-fill-color: #ffffff;
  transition: background-color 5000s ease-in-out 0s;
}
input:-internal-autofill-selected {
  transition: background-color 5000s ease-in-out 0s;
  background-color: transparent;
}
```
