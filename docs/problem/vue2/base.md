# 常见问题

## watch 常用语法

::: details 点击查看代码

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

:::

## 监听路由变化

::: details 点击查看代码

1. 通过 watch

```js
watch: {
  $route(to, from) {
    console.log(to) // 从哪里来
    console.log(from) // 到哪里去
  }
}
```

2. 通过钩子函数

```js
// 进入守卫
// 在这里不能使用this，进入路由之前，那会组件还没创建
beforeRouteEnter (to, from, next) {
  next(()=>{
    // 所有我们只能使用过vm异步语句来让节点上树
  })
},
// 在当前路由改变，但是该组件被复用时调用
// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
// 可以访问组件实例 `this`
beforeRouteUpdate (to, from, next) {

},
// 导航离开该组件的对应路由时调用
// 可以访问组件实例 `this`
beforeRouteLeave (to, from, next) {

}
```

:::

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

## render

共三个参数 `h('标签', {相关配置}, 内容)`

```js
const h = this.$createElement;

h("el-button", {
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  class: {
    foo: true,
    bar: false,
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: "red",
    fontSize: "14px",
  },
  // 普通的 HTML attribute
  attrs: {
    id: "foo",
  },
  // 组件 prop
  props: {
    myProp: "bar",
  },
  // DOM property
  domProps: {
    innerHTML: "baz",
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler,
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler,
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: "my-custom-directive",
      value: "2",
      expression: "1 + 1",
      arg: "foo",
      modifiers: {
        bar: true,
      },
    },
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: (props) => createElement("span", props.text),
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: "name-of-slot",
  // 其它特殊顶层 property
  key: "myKey",
  ref: "myRef",
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true,
});
```
