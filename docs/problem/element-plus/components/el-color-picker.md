# ColorPicker 颜色选择器

[网址](https://element-plus.org/zh-CN/component/color-picker.html)

## 默认显示调色板，点击其他位置不失焦关闭

场景：点击 dialog 默认显示调色板（不需要点击按钮显示），点击周边区域，会自动失焦隐藏，应该是一直显示的

<img src="/color-picker-hide.png" style="width: 400px;" />

:::details 点击查看代码

**只能用于 vue3，未改成 vue3 写法**

```vue
<template>
  <el-dialog v-model="visible">
    <!-- 隐藏事件 hide -->
    <el-color-picker
      v-model="defaultColorValue"
      popper-class="custom-color-picker-panel"
      @hide="hide"
    >
    </el-color-picker>
  </el-dialog>
</template>

<script>
export default {
  async mounted() {
    await nextTick()
    // 初始化默认展开
    this.visible &&
      this.$refs.colorPicker.querySelector('.el-color-picker__trigger').click()
  },
  methods: {
    hide() {
      this.$refs.colorPicker
        .querySelector('.custom-color-picker-panel')
        ?.click()
    }
  }
}
</script>
```

:::
