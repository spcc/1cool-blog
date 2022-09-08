# 数组 常见问题

## 一个数组过滤另一个数组的值

用途：前端权限菜单，只有满足当前角色的菜单

<br>

在 allInfoArr 里面 去除 名称等于 filterArr 的 name

```js
let filterArr = [
  {
    name: "a1",
  },
  {
    name: "a2",
  },
];
let allInfoArr = [
  {
    name: "a1",
    age: 18,
  },
  {
    name: "a2",
    age: 20,
  },
  {
    name: "a3",
    age: 27,
  },
];

// 获取到过滤的名称
let filterNameArr = filterArr.map((item) => item.name);
// 过滤
allInfoArr = allInfoArr.filter((item) => !filterNameArr.includes(item.name));
```
