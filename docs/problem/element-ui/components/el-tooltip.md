# Tooltip 文字提示

## window.open 跳转新页面，原页面弹层不消失

实现原理：关闭 `manual` 属性，开启手动模式。通过事件开启显示隐藏功能

```html
<el-tooltip content="window跳转新页面">
  <el-button
    :value="visible"
    :manual="true"
    @mouseenter.native="visible = true"
    @mouseleave.native="visible = false"
    @click.native="handleOpen"
  >
    window跳转新页面
  </el-button>
</el-tooltip>

<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      handleOpen() {
        window.open("http:baidu.com", "_blank");
      },
    },
  };
</script>
```
