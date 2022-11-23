# 常见问题

## Vue 的优点? vue 的缺点?

**优点:** 渐进式，轻量级，响应式，虚拟 dom，组件化，数据与视图分开，单页面路由
**缺点:** 单页面不利于 seo，不支持 IE8 以下，首屏加载时间长

## Vue 跟 React 的异同点?

相同点:

- 虚拟 dom
- 组件化开发
- 单向数据流
- 服务端渲染

不同点

- React 的 JSx, Vue 的 template
- 数据变化，React 手动(setState),Vue 自动
- React 单向绑定，Vue 双向绑定

## MVVM 是什么?和 MVC 有何区别呢?

mvc 和 mvvm 都是一种设计思想  
mvvm 主要解决了 mvc 中大量 DOM 操作使页面渲染性能降低，加载速度变慢的问题 。

MVVM 与 MVC 最大的区别就是：它实现了 View 和 Model 的自动同步

## Vue 的生命周期，有哪些？

- `beforeCreate`：实例话 Vue，未初始化和响应式数据
- `created`：已初始化和响应式数据，可访问数据
- `beforeMount`：render 调用，虚拟 DOM 生成，未转真实 DOM
- `mounted`：真实 DOM 挂载完成
- `beforeUpdate`：数据更新，新虚拟 DOM 生成
- `updated`：新旧虚拟 DOM 进行对比，打补丁，然后进行真实 DOM 更新
- `beforeDestroy`：实例销毁前，仍可访问数据
- `destroy`：实例销毁，子实例销毁，指令解绑，解绑本实例的事件
- `activated`：keep-alive 所缓存组件激活时调用
- `deactivated`：keep-alive 所缓存组件停用时调用
- `errorCaptured`：子孙组件的错误捕获，此函数可返回 false 阻止继续向上传播

## . 使用过哪些 Vue 的修饰符呢?

- `.sync`：简化子修改父值的步骤
- `.stop`：阻止事件冒泡
- `.trim`：讲 v-model 绑定的值首位空格给去掉
- `.once`：事件只触发一次
- `.self`：点击事件绑定本身才触发
- `.native`：绑定事件在自定义组件上时，确保能执行
- `.prevent`：阻止默认事件
- `.left、.middle、.right`：鼠标左中右键的触发
- `.number`：将 v-medol 绑定的值转数字
- `.capture`：事件的捕获
- `.lazy`：输入框失焦时才会更新 v-model 的值
- `passive`：相当于给移动端滚动事件加一个`.lazy`
- `camel`：确保变量名会被识别成驼峰命名

## .使用过哪些 Vue 的内部指令呢？

- `v-text`：元素的 textContent
- `v-html`：元素的 innerHTML
- `v-show`：通过样式 display 改变显隐,控制的 css
- `v-if`：通过操作 DOM 改变显隐
- `v-else`：配合 v-if
- `v-else-id`：配合 v-else
- `v-for`：循环渲染
- `v-on`：绑定事件，缩写@
- `v-bind`：绑定变量，缩写:
- `v-model`：双向绑定
- `v-slot`：插槽
- `v-once`：只渲染一次
- `v-pre`：跳过元素编译
- `v-cloak`：隐藏双括号，有值显示

## v-if 和 v-show 有何区别？

- `v-if`：通过操作 DOM 来控制显隐
- `v-show`：通过改变 css 样式 display 属性控制显隐

**频繁或者大数量显隐使用 v-show ，否则使用 v-if**

## 为什么 v-if 和 v-for 不建议用在同一标签？

`v-for`优先级高于`v-if`，每项都通过`v-for`渲染出来后再去通过`v-if`判断显隐,过程中会增加无用的 dom 操作,渲染了无用的节点

## 组件之间的传值方式有哪些?

- 父传子： 组件使用`props`进行接收
- 子传父： 子组件使用`$emit`+事件对父组件进行传值
- 父子之间通过`$parent`和`$chidren`获取实例进而通信
- 使用`$refs`获取组件实例，进而获取数据。使用 vuex 进行状态管理
- 使用`eventBus`进行跨组件触发事件，进而传递数据
- 使用浏览器本地缓存，例如` localstorage``sessionStorage `

## 路由有哪些模式呢?又有什么不同呢?

- hash 模式:通过#号后面的内容的更改，触发 hashchange 事件，实现路由切换，而不刷新页面
- history 模式:通过 pushState 和 replaceState 切换 url，触发 popstate 事件，实现路由切换，需要后端配合

## 路由的钩子函数？

- beforeEach：跳转路由前
- - to：将要跳转进入的路由对象
  - from：将要离开的路由对象
  - next：执行跳转的方法
- afterEach：路由跳转后
- - to：将要跳转进入的路由对象 **组件内路由钩子**
- beforeRouteEnter(to, from, next)：跳转到路由渲染组件时触发
- beforeRouteUpdate(to, from, next)：跳转到路由且组件被复用时触发
- beforeRouteLeave(to, from, next)：跳转到路由且离开组件时触发

## 如何设置动态 class，动态 style？

- 动态 class 对象：`<div :class="{ 'is-active': true, 'red': isRed }"></div>`
- 动态 class 数组：`<div :class="['is-active', isRed ? 'red' : '' ]"></div>`
- 动态 style 对象：`<div :style="{ color: textColor, fontSize: '18px' }"></div>`

##  vuex 的有哪些属性？用处是什么？

- `state`：定义初始状态
- `getter`：从 store 从取数据
- `mutation`：更改 store 中状态，只能同步操作
- `action`：用于提交 mutation，而不直接更改状态，可异步操作
- `module`：store 的模块拆分

## watch 有哪些属性，分别有什么用？

- `immediate`：初次加载时立即执行
- `deep`：是否进行深度监听
- `handler`：监听的回调函数

## 一般在哪个生命周期请求异步数据

- 可以啊钩子函数中的 `created`、`beforeMount`、`mounted` 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。
- 在 created 中最好
- - 能更快获取到服务端数据，减少页面加载时间，用户体验更好；
- - SSR 不支持 beforeMount 、mounted 钩子函数，放在 created 中有助于一致性。

## 父子组件生命周期顺序？

父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

## 为什么不建议用 index 做 key，为什么不建议用随机数做 key？

- 用 index 和用随机数都是同理，随机数每次都在变，做不到专一性，也很消耗性能

## 使用过那些插槽的使用,原理是什么

- 默认插槽 \- 又名匿名查抄，当 slot 没有指定 name 属性值的时候一个默认显示插槽，一个组件内只有有一个匿名插槽
- 具名插槽：带有具体名字的插槽，也就是带有 name 属性的 slot，一个组件可以出现多个具名插槽。
- 作用域插槽：默认插槽、具名插槽的一个变体，可以是匿名插槽，也可以是具名插槽，该插槽的不同点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽。 实现原理：当子组件 vm 实例化时，获取到父组件传入的 slot 标签的内容，存放在`vm.$slot`中，默认插槽为`vm.$slot.default`，具名插槽为`vm.$slot.xxx`，xxx 为插槽名，当组件执行渲染函数时候，遇到 slot 标签，使用`$slot`中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。 。

### 是否使用过滤器，过滤器的作用,怎么使用

- 顾名思义,过滤器就是用来过滤的数据的,在 Vue 中使用`filters`来过滤数据，`filters`不会修改数据，而是过滤数据，改变用户看到的输出（计算属性  `computed` ，方法  `methods`  都是通过修改数据来处理数据格式的输出显示）。 **使用场景：**
- 需要格式化数据的情况，比如需要处理时间、价格等数据格式的输出 / 显示。
- 比如后端返回一个  **年月日的日期字符串**，前端需要展示为  **多少天前**  的数据格式，此时就可以用`fliters`过滤器来处理数据。

**使用**

- 在**插值表达式   **`{{ }}`  和  `v-bind`**  表达式**  中，然后放在操作符“ `|` ”后面进行指示。

### 自定义指令的钩子函数？

- `bind`：指令绑定到指定元素时调用，只调用一次
- `inserted`：指定元素插入父节点时调用
- `update`：所在组件的 VNode 更新时调用
- `componnetUpdated`：所在组件以及其子组件 VNode 全部更新后调用
- `unbind`：只调用一次，指令与元素解绑时调用

### 说说 nextTick 的用处？

修改数据时不能马上得到最新的 DOM 信息，所以需要使用 nextTick，在 nectTick 回调中可以获取最新 DOM 信息

### 为什么 nextTick 优先是微任务？

优先是`Promise.then`方法，是个微任务，这样可以避免多一次队列，进而少一次 UI 渲染，节省性能

### Vue 的 SSR 是什么？有什么好处？

SSR 全称`Server Side Render`

- 有利于 SEO：由于是在服务端，将数据填充进 HTML 之后再推送到浏览器，所以有利于 SEO 的爬取
- 首屏渲染快 SSR 的缺点：
- 开发条件会受到限制，服务器端渲染只支持 beforeCreate 和 created 两个钩子；
- 当需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 Node.js 的运行环境；
- 更多的服务端负载。

### Vue 响应式是怎么实现的？

- 1、劫持：通过`Object.defineProperty`对对象进行递归劫持属性的`get、set`
- 2、观察者模式：使用`watcher`进行观察数据使用的地方
- 3、发布订阅模式：使用`dep`收集`watcher`，数据更改时，通过`notify`方法通知`dep`里的`watcher`去进行相应的更新
- 4、数组：数组没有使用劫持的模式，而是通过重写数组原型上的方法，来实现数组的响应式

### 为什么只对对象劫持，而要对数组进行方法重写？

数组的元素大概率是成百上千的，所以对数组下标进行劫持的话会非常消耗性能。Vue 通过对数组原型上方法的重写，实现数组的响应式

### router.push、router.replace、router.go 的区别？

- `router.push`：跳转，并向 history 栈中加一个记录，可以后退到上一个页面
- `router.replace`：跳转，不会向 history 栈中加一个记录，不可以后退到上一个页面
- `router.go`：传正数向前跳转，传负数向后跳转

### Vue 中封装的数组方法有哪些，如何实现页面更新

- 在 Vue 中，对响应式处理利用的是 Object.defineProperty 对数据进行拦截，而这个方法并不能监听到数组内部变化，数组长度变化，数组的截取变化等，所以需要对这些操作进行 hack，让 Vue 能监听到其中的变化
- push()
- pop()
- shift()
- unshift()
- solice()
- sort()
- reverse()

### 请问子组件可以直接改变父组件的数据吗？怎么解决

- 肯定是不可以的,在 vue 里面为了维护父子组件的单向数据流,每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值,如果你去修改,在控制台发出警告
- 可以**通过   **`$emit`**  派发一个自定义事件，父组件接收到后，由父组件去修改。**

### vue 如何监听对象或者数组某个属性的变化

- this.$set(你要改变的数组/对象，你要改变的位置/key，你要改成什么 value)
- 调用以下几个数组的方法

  splice()、 push()、pop()、shift()、unshift()、sort()、reverse()
  复制代码

### Vue 有那些性能优化

**（1）编码阶段**

- 尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter，会收集对应的 watcher
- v-if 和 v-for 不能连用
- 如果需要使用 v-for 给每项元素绑定事件时使用事件代理
- SPA 页面采用 keep-alive 缓存组件
- 在更多的情况下，使用 v-if 替代 v-show
- key 保证唯一
- 使用路由懒加载、异步组件
- 防抖、节流
- 第三方模块按需导入
- 长列表滚动到可视区域动态加载
- 图片懒加载

**（2）SEO 优化**

- 预渲染
- 服务端渲染 SSR

**（3）打包优化**

- 压缩代码
- Tree Shaking/Scope Hoisting
- 使用 cdn 加载第三方模块
- 多线程打包 happypack
- splitChunks 抽离公共文件
- sourceMap 优化

**（4）用户体验**

- 骨架屏
- PWA
- 还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启 gzip 压缩等。
