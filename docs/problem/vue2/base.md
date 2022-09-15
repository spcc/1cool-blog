# 常见问题

## watch 常用语法

```vue
<script>
export default {
  watch: {
    // 常用方法
    a(val, oldVal) {
      console.log(val, oldVal);
    },

    // 方法名
    b: "watchB",

    // 深度监听
    c: {
      handler(val, oldVal) {
        /* ... */
      },
      deep: true,
    },

    // 立即调用
    d: {
      handler: "watchD",
      immediate: true,
    },

    // 你可以传入回调数组，它们会被逐一调用
    e: [
      "handle1",
      function handle2(val, oldVal) {},
      {
        handler: function handle3(val, oldVal) {},
      },
    ],

    // 深度监听 某个属性
    "e.f": {
      handler(val, oldVal) {
        /* ... */
      },
      deep: true,
    },
  },
  methods: {
    watchB(val, oldVal) {
      console.log(val, oldVal);
    },
  },
};
</script>
```

## 父组件监听事件增加额外参数

例子：子组件 **$emit** 方法，父组件想增加额外参数

```js
// $event 是子组件传递参数，index是父组件额外参数
<el-input v-for="(item, index) in list" @change="changeInput($event, index)"></el-input>
```
