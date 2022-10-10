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
