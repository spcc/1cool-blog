# 过渡

学的是零碎的知识点，缺少真实的使用场景

## 场景一：父子组件数据传递

注意：`defineProps` 、`defineEmits` 、 `defineExpose` 和 `withDefaults` 这四个宏函数只能在 &lt;script setup&gt; 中使用。他们不需要导入，会随着 &lt;script setup&gt; 的处理过程中一起被编译。

### 父组件数据传递到子组件

props 需要使用 `defineProps()` 这个宏函数来进行声明

```js
const props = defineProps({
  someProp: {
    type: String,
    required: true,
  },
});

console.log(props.someProp); // parent message
```

### 子组件数据传递到父组件

emits 需要使用 `defineEmits()` 这个宏函数来进行声明

```js
const emit = defineEmits(["change"]);
const onClick = () => {
  emit("change", "child message");
};

console.log(props.someProp); // parent message
```

### 父组件使用子组件数据
