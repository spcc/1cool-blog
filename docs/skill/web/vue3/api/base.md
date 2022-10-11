# 语法

## computed()

该函数用来创造计算属性，和过去一样，它返回的值是一个 ref 对象。 里面可以传方法，或者一个对象，对象中包含 `set()`、`get()`方法

### 只读的计算属性

```js
import { ref, computed } from "vue";
export default {
  setup(props, context) {
    const age = ref(18);

    // 根据 age 的值，创建一个响应式的计算属性 readOnlyAge,它会根据依赖的 ref 自动计算并返回一个新的 ref
    const readOnlyAge = computed(() => age.value++); // 19

    return {
      age,
      readOnlyAge,
    };
  },
};
```

### 通过 set()、get()方法创建一个可读可写的计算属性

```js
import { ref, computed } from "vue";
export default {
  setup(props, context) {
    const age = ref(18);

    const computedAge = computed({
      get: () => age.value + 1,
      set: (value) => age.value + value,
    });
    // 为计算属性赋值的操作，会触发 set 函数, 触发 set 函数后，age 的值会被更新
    age.value = 100;

    return {
      age,
      computedAge,
    };
  },
};
```

## watch()

### 监听 reactive 声明的数据源

```js
export default {
  setup(props, context) {
    const state = reactive({ name: "vue", age: 10 });

    watch(
      () => state.age,
      (val, oldVal) => {
        console.log(val); // 100
        console.log(oldVal); // 10
      }
    );
    // 修改age 时会触发watch 的回调, 打印变更前后的值
    state.age = 100;
    return {
      ...toRefs(state),
    };
  },
};
```

### 监听用 ref 声明的数据源

```js
export default {
  setup(props, context) {
    const age = ref(10);

    watch(age, (val, oldVal) => {
      console.log(val); // 100
      console.log(oldVal); // 10
    });
    // 修改age 时会触发watch 的回调, 打印变更前后的值
    age.value = 100;
    return {
      age,
    };
  },
};
```

### 同时监听多个值

```js
export default {
  setup(props, context) {
    const state = reactive({ name: "vue", age: 10 });

    watch(
      [() => state.name, () => state.age],
      ([name, age], [oldName, oldAge]) => {
        console.log(newName);
        console.log(newAge);

        console.log(oldName);
        console.log(oldAge);
      }
    );
    // 修改age 时会触发watch 的回调, 打印变更前后的值, 此时需要注意, 更改其中一个值, 都会执行watch的回调
    state.age = 100;
    state.name = "vue3";
    return {
      ...toRefs(state),
    };
  },
};
```

### stop 停止监听

在 `setup()` 函数内创建的 `watch` 监视，会在当前组件被销毁的时候自动停止。如果想要明确地停止某个监视，可以调用 `watch() `函数的返回值即可，语法如下：

```js
export default {
  setup(props, context) {
    const state = reactive({ name: "vue", age: 10 });

    const stop = watch(
      [() => state.name, () => state.age],
      ([name, age], [oldName, oldAge]) => {
        console.log(newName);
        console.log(newAge);

        console.log(oldName);
        console.log(oldAge);
      }
    );
    // 修改age 时会触发watch 的回调, 打印变更前后的值, 此时需要注意, 更改其中一个值, 都会执行watch的回调
    state.age = 100;
    state.name = "vue3";

    setTimeout(() => {
      stop();
      // 此时修改时, 不会触发watch 回调
      state.age = 1000;
      state.name = "vue3-";
    }, 1000); // 1秒之后讲取消watch的监听

    return {
      ...toRefs(state),
    };
  },
};
```

## refs 获取 dom

1. 在 `html` 中写入 `ref` 的名称
2. 在 `setup` 中定义一个 `ref`
3. 在 `setup` 中返回 `ref` 的实例
4. `onMounted` 中得到 `ref` 的 `RefImpl` 的对象, 通过 `.value` 获取真实 `dom`

::: details 点击查看代码

```vue
<template>
  <!-- 1. 在 html 中写入 ref 的名称 -->
  <div ref="elmRefs" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  setup(props, context) {
    // 2. 在 setup 中定义一个 `ref`
    const elmRefs = ref<null | HTMLElement>(null);

    // 4. onMounted 中得到 ref 的 RefImpl 的对象, 通过 .value 访问到数据
    onMounted(() => {
      console.log(elmRefs.value);
    });

    return {
      // 3. 在 setup 中返回 ref 的实例
      elmRefs,
    };
  },
});
</script>
```

:::

## 全局配置

通过 `vue` 实例上 `config` 来配置

### 配置全局属性

::: details 点击查看代码

main.js 声明

```js
const app = Vue.createApp({});
app.config.globalProperties.$http = "xxxxxxxxs";
```

在组件用通过 `getCurrentInstance()` 来获取全局 `globalProperties` 中配置的信息,`getCurrentInstance` 方法获取当前组件的实例，然后通过 `ctx` 属性获得当前上下文，这样我们就能在 `setup` 中使用 `router` 和 `vuex`, 通过这个属性我们就可以操作变量、全局属性、组件属性等等

```js
setup( ) {
  const { ctx } = getCurrentInstance();
  ctx.$http
}
```

:::

## 生命周期

新版的生命周期函数，可以按需导入到组件中，且只能在 `setup()` 函数中使用, 但是也可以在 `setup` 外定义, 在 `setup` 中使用

::: details 点击查看代码

```js
<script lang="ts">
import { set } from 'lodash';
import { defineComponent, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onErrorCaptured, onMounted, onUnmounted, onUpdated } from 'vue';
export default defineComponent({
  setup(props, context) {
    onBeforeMount(()=> {
      console.log('beformounted!')
    })
    onMounted(() => {
      console.log('mounted!')
    })

    onBeforeUpdate(()=> {
      console.log('beforupdated!')
    })
    onUpdated(() => {
      console.log('updated!')
    })

    onBeforeUnmount(()=> {
      console.log('beforunmounted!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })

    onErrorCaptured(()=> {
      console.log('errorCaptured!')
    })

    return {}
  }
});
</script>
```

:::

## Provide / Inject

### 基础使用

:::details 点击查看代码

父组件

```js
import { defineComponent } from "vue";
export default defineComponent({
  provide: {
    provideData: { name: "撒点了儿" },
  },
});
```

子组件

```js
import { defineComponent } from "vue";
export default defineComponent({
  inject: ["provideData"],
});
```

:::

### setup()中使用

在 `setup()` 中使用, 需要从 `vue` 显式导入 `provide`、`inject` 方法

:::details 点击查看代码

父组件

```js
import { provide } from "vue";
export default {
  setup() {
    provide("provideData", { name: "撒点了儿" });
  },
};
```

子组件

```js
import { inject } from "vue";
export default {
  setup() {
    const provideData = inject("provideData");
    console.log(provideData); // { name: "撒点了儿"  }
  },
};
```

:::

### 传递响应数据

为了增加 `provide` 值和 `inject` 值之间的响应性，我们可以在 `provide` 值时使用 `ref` 或 `reactive`

::: warning 警告
如果要确保通过 provide 传递的数据不会被 inject 的组件更改，我们建议对提供者的 property 使用 `readonly`。
:::

::: details 点击查看代码
父组件

```js
import { provide, ref, reactive } from "vue";
export default {
  setup() {
    const age = ref(18);

    provide("provideData", {
      age,
      name: "撒点了儿",
    });
  },
};
```

子组件

```js
import { inject } from "vue";
export default {
  setup() {
    const provideData = inject("provideData");
    console.log(provideData);
  },
};
```

:::

## 完整组件模版结构

一个完成的 vue 3.x 完整组件模版结构包含了:`组件名称`、 `props`、`components`、`setup(hooks、computed、watch、methods 等)`

::: details 点击查看代码

```js
<template>
  <div class="mine" ref="elmRefs">
    <span>{{name}}</span>
    <br>
    <span>{{count}}</span>
    <div>
      <button @click="handleClick">测试按钮</button>
    </div>

    <ul>
      <li v-for="item in list" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, PropType, reactive, ref, toRefs } from 'vue';

interface IState {
  count: number
  name: string
  list: Array<object>
}

export default defineComponent({
  name: 'demo',
  // 父组件传子组件参数
  props: {
    name: {
      type: String as PropType<null | ''>,
      default: 'vue3.x'
    },
    list: {
      type: Array as PropType<object[]>,
      default: () => []
    }
  },
  components: {
    /// TODO 组件注册
  },
  emits: ["emits-name"], // 为了提示作用
  setup (props, context) {
    console.log(props.name)
    console.log(props.list)
1

    const state = reactive<IState>({
      name: 'vue 3.0 组件',
      count: 0,
      list: [
        {
          name: 'vue',
          id: 1
        },
        {
          name: 'vuex',
          id: 2
        }
      ]
    })

    const a = computed(() => state.name)

    onMounted(() => {

    })

    function handleClick () {
      state.count ++
      // 调用父组件的方法
      context.emit('emits-name', state.count)
    }

    return {
      ...toRefs(state),
      handleClick
    }
  }
});
</script>
```

:::
