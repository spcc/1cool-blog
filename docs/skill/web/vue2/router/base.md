# 路由

## 路由守卫

### 全局守卫

```js
// 全局前置守卫：初始化时执行丶每次路由切换前执行
router.beforeEach((to, from, next) => {});

// 全局后置守卫：初始化时执行丶每次路由切换后执行
router.afterEach((to, from) => {});
```

### 独享守卫

```js
beforeEnter(to, from, next){

}
```

### 组件内守卫

::: details 点击查看代码

```js
// 进入守卫: 通过路由规则，进入该组件时被调用
beforeRouteEnter(to, from, next) {

},
// 离开守卫: 通过路由规则，离开该组件时被调用
beforeRouteLeave(to, from, next) {

}
```

:::
