# 常见问题

## 父组件监听事件增加额外参数

例子：子组件 **$emit** 方法，父组件想增加额外参数

```js
// $event 是子组件传递参数，index是父组件额外参数
<el-input v-for="(item, index) in list" @change="changeInput($event, index)"></el-input>
```
