# Form 表单

## 监听是否更新变化：变化提示是否保存，没变直接离开

### 新增页面的表单是否发生变化

新增页面比较特殊

只需要判断，**变化前** 和 **变化后**的 `form 表单` 的值是否不为空即可

:::details 点击查看代码

```vue
<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model.trim="form.age"></el-input>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model.trim="form.home"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="leave">离开</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 因为是新增页面，初始值定义为空即可（一般用空字符串或者是null）
      // 后面判断新值和旧值 是否不为空即可
      form: {
        name: null,
        age: '',
        home: null
      }
    }
  },
  methods: {
    // 一般写在beforeRouterLeave
    leave() {
      // 定义初始标识0，遍历form对象，如果值为null或空字符串则累加
      // 如果大于0，说明用户输入内容了，就需要询问用户是否离开
      // 如果等于0，说明用户未输入，就允许用户直接离开
      let num = 0
      for (const key in this.form) {
        if (this.form[key] == '' || this.form[key] == null) {
          num = num + 0
        } else {
          num = num + 1
        }
      }

      // 根据标识num的最终值，去做流程逻辑控制判断
      if (num > 0) {
        alert('询问是否保存当前数据')
      } else {
        alert('允许路由跳转')
      }
    }
  }
}
</script>
```

:::

### 判断编辑页面的表单是否发生变化

编辑页面的 html 部分同新增页的 html 部分一样

:::details 点击查看代码

```vue
<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model.trim="form.age"></el-input>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model.trim="form.home"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="leave">离开</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    }
  },
  mounted() {
    // 编辑页：进入页面发送请求，获取对应的数据，一般会是一部分有值，另外一部分为空
    // 思路：初始值存一份（存到data用于页面显示），本地存一份。判断data数据合本地数据是否一致

    // 假设 后台返回数据
    let apiForm = {
      name: '孙悟空',
      age: 500,
      home: '' // 小细节：如果有空值，让后端传空字符串（若用户输入内容后又删除掉，这里的null就会变成空字符串）
    }

    this.form = apiForm

    sessionStorage.setItem('initForm', JSON.stringify(apiForm)) // 因为是对象，所以要转成字符串存储
  },
  methods: {
    leave() {
      // this.form和initForm都是对象，对象和对象是永远不相等.所以要把对象转成字符串，看是否相等
      if (JSON.stringify(this.form) == sessionStorage.getItem('initForm')) {
        console.log('表单没变化，允许离开')
      } else {
        console.log('表单变化，询问是否保存')
      }
    }
  }
}
</script>
```

:::

### 使用 this.$options.data()判断

`this.$options.data()` 会存放组件最初的 data 值，所以用这个判断初始值，和后续值是否一致也是可以的

> this.$options.data()也可以重置data中的所有数据，有种页面初始化的感觉。如：Object.assign(this.$data, this.$options.data())。切记，不能直接赋值哦，不能这样写：this.$data = this.$options.data();
单独某一个form数据，就是：this.form = this.$options.data().form;

:::details 点击查看代码

```vue
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: ''
      }
    }
  },
  methods: {
    leave() {
      let initForm = JSON.stringify(this.$options.data().form)
      let afterForm = JSON.stringify(this.form)
      if (initForm == afterForm) {
        console.log('表格没变化，直接退出')
      } else {
        console.log('表格变化了，询问是否要保存？')
      }
    }
  }
}
</script>
```

:::
