# 基础

## ?? 与 || 的区别

一般用来赋默认值

`??` 更加适合在不知道变量是否有值时使用

#### 相同点

根据前面的值来判断最终是返回前面的值还是后面的值

- One ?? Two
- One || Two

#### 不同点

判断方式不同：
使用 `??` 时，只有当 **值 1** 为 `null` 或 `undefined` 时才返回 **值 2**  
使用 `||` 时，**值 1** 会转换为[布尔值](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)判断，为 `true` 返回**值 1**，`false` 返回**值 2**

```js
// ??
undefined ?? 2; // 2
null ?? 2; // 2
0 ?? 2; // 0
"" ?? 2; // ""
true ?? 2; // true
false ?? 2; // false

// ||
undefined || 2; // 2
null || 2; // 2
0 || 2; // 2
"" || 2; // 2
true || 2; // true
false || 2; // 2
```
