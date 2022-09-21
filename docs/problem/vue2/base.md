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

## Slot

### 将子组件数据暴漏给父组件使用

子组件传值

```html
<ul>
  <li v-for="( item, index ) in items">
    <!-- 传值给父组件 -->
    <slot :item="item"></slot>
  </li>
</ul>
```

父组件取值

```html
<!-- 父组件取值 -->
<todo-list>
  <!-- prop 的对象命名为 slotProps，可以改成任意喜欢的名字 -->
  <template v-slot:default="slotProps">
    <span class="green">{{ slotProps.item }}</span>
  </template>
</todo-list>
```

扩展：父组件取值 解构`Prop` 和 避免 `重命名` 和 处理 `undefined`

```html
<!-- 父组件取值 -->
<todo-list>
  <!-- 解构 -->
  <template v-slot:default="{ item }">
    <span class="green">{{ item }}</span>
  </template>
</todo-list>

<!-- 父组件取值 -->
<todo-list>
  <!-- 重命名，避免重名和清晰 -->
  <template v-slot:default="{ item: todo }">
    <span class="green">{{ todo }}</span>
  </template>
</todo-list>

<!-- 父组件取值 -->
<todo-list>
  <!-- 定义备用内容，用于插槽 prop 是 undefined 的情形 -->
  <template v-slot:default="{ item = 'Placeholder' }">
    <span class="green">{{ item }}</span>
  </template>
</todo-list>
```

### 动态插槽

[动态指令参数](https://v2.cn.vuejs.org/v2/guide/syntax.html#%E5%8A%A8%E6%80%81%E5%8F%82%E6%95%B0) 也可以用在 v-slot 上，来定义动态的插槽名：

```html
<base-layout>
  <template v-slot:[dynamicSlotName]> ... </template>
</base-layout>
```

### 具名插槽的缩写

跟 v-on 和 v-bind 一样，v-slot 也有缩写  
即把参数之前的所有内容 (`v-slot:`) 替换为字符 `#`

```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```
