# 代码整洁之道 - 命名篇

命名确实是我们写代码的第一步，**直接关系到整个代码的可读性以及后期的可维护性**

- 理论篇： 主要结合了【代码整洁之道】这本书里所讲到的命名思想（推荐大家可以完整的看一下）
- 命名规范：主要是结合了目前市场常见的第三方代码规范库，以及公司的代码规范。
- 命名实战：主要是根据实际开发经验，以及各种不同场景下的命名分别进行了总结。

## 理论篇

### 一. 使用具有明确含义的单词

`我们使用的名称要有其实际含义，其他程序员看了能够大概知道这个变量表示的是什么意思，而不是看了一脸懵逼。`

```js
// bad
let arr = ["user1", "user2", "user3", "user4"];

// good
let userList = ["user1", "user2", "user3", "user4"]; // 用户模块用user命名
let permissionList = ["user1", "user2", "user3", "user4"]; // 权限模块用permission命名
```

### 二. 做有意义的区分

一个用户模块就可以细分为：获取用户基本信息，获取用户列表等，相信我们在不同的项目下经常会看到下面这些命名：

```js
getUser();
getUserData();
getUserInfo();
getUserList();
getUsers();
```

其他程序员一看用户模块代码，有这么多个方法，但是能分辨清楚各个函数有什么区别吗？  
很显然不能，比如：getUser()和 getUserData()，光从命名上看其实并没有区别，但是我们却用它们写了不同的逻辑，这样就很容造成歧义。

这就是 要说的：`要做有意义的区分：即需要我们去区分两个子模块或者场景的时候，我们一定要采用两个有明确不同含义的命名去区分它们，而不是使用意思相近，很容易混淆在一起的`。

类似的常见错误还有:  
account 与 accountData, customer 与 customerInfo, money 与 moneyAmount 等都其实没有什么区别，在实际项目开发中，我们使用其中一种命名方式即可.  
一定要在整个项目中一以贯之，比如：获取用户信息，我们决定使用 getUserInfo()，那么其他地方统一用以 info 结尾的

### 三. 使用可以读得出来的单词

实际开发中尽量少使用缩写，如果使用，也是那些经常常见的一些缩写，例如：value 可以缩写为 val, document 可以缩写为 doc.

```js
addArt(); // bad case
addArticle(); // 推荐
```

### 四. 避免使用编码

我们要不要把一些关键字，类型 加到变量的命名中

因为在 js 中，类型之间可以随意赋值，即使我们定义了 phoneString，依然可能被赋值一个 number，所以也很容易一起歧义。

```js
const phoneString = "123"; // 后面的String没必要
const phoneNumber = 123132; // 这个还可以，因为电话号码本身就是phoneNumber
```

### 五. 使用常见的单词命名

尽可能用大家都熟知的一些单词或者语法去命名，不要去用那些不常见的，或者俗语，俚语的写法。

```js
kill(); // 别用 whack()，不知道什么意思的，可以理解为另外一种不常见的写法
abort(); // 别用 eatMyShorts(), 它是一种俚语的写法。
```

### 六. 每个场景对应一个词

平时开发中，可能固定也就那几种场景，获取数据，更新数据，删除数据等  
每个场景我们要给其约定一个固定的词，从而在整个项目中一以贯之  
而不是在项目中，此处添加用的是 add, 其他地方用的又是 create 等其他单词

```js
getUser(); // 获取
updateUser(); // 更新
deleteUser(); // 删除
addUser(); // 添加
```

注意：用词一定要适合，例如：添加，别什么地方都用 add, 很可能其他场景用的 insert，append 等，我们也要随机应变，不能为了保持一致，而忽略其并不适合当前场景。

### 七. 使用解决领域方案名词

程序员本身这个职业，可能会有其自身的一些专有名词，比如：队列用 queue, 栈用 stack， 我们在实际项目中，要尽可能多使用这些名词。

```js
jobQueue; // 任务队列
observer; // 观察者模式
```

这里要强调一点，`设计模式中有很多特有的名词，我们如果实际开发中有相关的场景，我们要尽可能去使用这些设计模式定义的名词`。例如：访问者模式中的 visitor， 发布订阅模式中的：publisher, subscriber 等。

## 命名规范

上面讲到的都是我们平时命名的一些理论知识，总结起来就是：`命名一定要明确的意义，其他程序员看了能看懂！` ，接下来，我们看一下具体有哪些明确的命名规范。

命名规范也很不同的等级，这里我们分为：`【必须】【推荐】【可选】`三个等级。

### 【必须】使用小驼峰命名

说明：`实际开发中，所有的变量命名，函数命名等全部遵循小驼峰的写法`。对应 eslint 规则是：camelcase

```js
// bad case
const user_list = [];
const userlist = [];
​
// good
const userList = [];
```

### 【必须】 只有命名类或者构造器函数时，才使用大驼峰命名

```js
// bad case
function user(name){
  this.name = name;
}
const u = new user('kobe');
​
// good case
function User(name){
  this.name = name;
}
const u = new User('kobe');
```

### 【必须】当导出类/构造器/函数库/对象时，使用大驼峰

`首先，类和构造器函数，不管是单独命名还是导出的时候，都统一大驼峰即可，这里要注意的是当导出一个对象的时候，我们也要使用大驼峰。`

```js
const User = {
  name: "kobe",
  age: 41,
};
export default User;
```

### 【必须】当导出默认函数时，必须使用驼峰命名法。

```js
function formatNumber () {
​
}
export default formatNumber;
```

**注意：推荐文件名尽量和默认导出的名称保持一致，当然文件名建议是 kebab-case**，例如：上面这个 case，文件名应该为 format-number.js 。

### 【推荐】不要以下划线开头或者结尾命名变量

```js
// bad case
const _username = "kobe";
const user_name = "kobe";
const username_ = "kobe";
```

注意：  
在 js 中，可能会以下划线开头来命名私有属性  
但其实这个变量依然是公开的，调用方依然可以调用到  
所以，反而可能会引起歧义

### 【推荐】不要保存 this 的引用，推荐使用箭头函数

```js
// bad case
function foo() {
  const self = this;
  return function () {
     console.log(self);
  };
}
​
// bad case
function foo() {
  const that = this;
  return function () {
     console.log(that);
  };
}
​
// good case
function foo() {
  return () => {
     console.log(this);
  };
}
```

### 【推荐】文件名推荐使用 kebab-case，即用-隔开

命名文件的时候，推荐使用 短横线 隔开来命名。

```sh
// good case
task-list.vue
task-detail.vue
```

当然，实际项目开发中，也经常会遇到小驼峰命名，这个大家随时切换，尽量可以保证一个项目中所有文件的命名规范是统一的。

### 【推荐】缩略词和缩写都必须全部大写或者全部小写

```js
// bad case
const HttpRequests = [];
​
// good case
const httpRequests = [];
const HTTPRequests = [];
```

### 【推荐】export 导出的常量，统一全部大写命名，多个单词用\_隔开。

这块，有几点要注意：

1.  export 导出的常量，推荐用大写命名，但是模块内部的常量不需要全大写，正常按照小驼峰即可。
2.  export 导出的常量，推荐大写命名，但是其内部属性不必大写。

```js
// bad case
const NAME = 'kobe';
export const userConfig = {};
// good case
const name = 'kobe';
export const USER_CONFIG = {};
​
// bad case
export const MAPPING = {
  KEY: 'value'
}
// good case
export const MAPPING = {
  key: 'value'
};
```

## 命名实战

面对各种不同的业务场景的命名，如何去使用准确的单词，并且如何把这些单词组合起来，以及单词谁前谁后等问题，都需要我们有一个比较清晰的认知和命名习惯。

### 多个单词如何组合？

在实际的业务场景中，如果是单个单词的模块，那我们直接使用该单词即可.

多个单词之间的顺序是什么样呢？如何去组合呢？这里面其实也有很多细节的。

1. 我们首先想到是根据文件去拆分不同的子模块

```sh

| - user
  | - list.js
  | - detail.js

```

2. 如果在实际项目中，目录嵌套结构已经比较深，不想再嵌套一层，这时可以直接根据文件名进行区分。

```sh
userList // 用户列表
userDetail // 用户详情
```

3. 以上这些都是比较简单的，除此之外，我们主要是想说一下，同一个模块下，不同的子模块，或者类似的模块在一起的时候，如何去更好的命名，从而区分它们。

例如：任务模块，可能包含以下内容：

- 任务 A 列表
- 任务 B 列表
- 任务详情
- 添加任务 A - 弹框
- 天际任务 B - 弹框

此时，我们很可能会写出下面这样的命名:

```sh
taskListA
taskBList
taskModalA
taskBModal
taskDetail
```

尤其是当我们没有明确自己的习惯的时候，可能这个模块 形容词（如这里的 A,B）放在了中间，另外一个模块又放到了结尾， 导致整个项目的代码看着很乱，因此，我们需要尽量整个项目都保持一致的命名习惯。

这里，**我个人推荐使用：前缀 \+ 形容词或名词 \+ 后缀 的模式**。当然，这里只是我个人的命名习惯，不是标准。

我们来具体解释一下：

- 前缀：一般是公共的模块名称：例如：上面讲到的 task
- 形容词或名词：一般模块的两个不同的子模块，或者子内容。例如：上面讲到的 A，B
- 后缀：一般是表示这个模块具体是哪种类型，例如：List 一般表示一个列表或者表格。Detail 表示详情，Modal 表示弹框等。

我们来实际用一个例子体会一下，例如：一个任务模块，包含：任务列表，任务列表筛选栏目，创建单任务，创建多任务，任务详情等模块，我们使用 vue 或者 react 开发的时候，一般都会把它们拆分成独立的文件。

```sh
taskFilter.vue
taskList.vue
taskDetail.vue
taskSingleModal.vue
taskMultipleModal.vue
```

说明：这里说这一点，主要看到很多代码，其实是因为开发者并没有一个自己的一套习惯，导致不同模块之间的命名都不一致。很随机。因此，我们要培养属于自己的一套命名习惯。

### 项目命名

`推荐：统一采用小写，多个单词之间用短斜杠-隔开即可。` 例如：

```sh
shop-demo
cms-platform
```

### 模块命名

不同的模块主要体现在两方面：

1.  根据实际业务场景拆分的模块
2.  项目架构本身拆分的模块

根据实际业务场景拆分的模块，命名很简单，直接根据其实际业务含义翻译一下即可，实在不知道用啥单词，直接用词典翻译一下。

这里，我们主要说一下前端项目架构本身拆分的模块，其实也就是项目目录结构的划分：

这里把常见的一些功能模块的命名罗列一下：

```sh
views // 存放所有页面，子目录按具体业务模块划分即可
assets // 存放所有资源，例如：图片等
components // 公共组件
router // 路由
store // 状态
utils // 各种自定义工具函数
services // 存放ajax请求相关
```

`注意：模块命名，本质上也是文件命名，其实推荐的是统一小写，多个单词之间使用短斜杠隔开。`

### 变量命名

`推荐：采用小驼峰去命名变量`， 实际开发过程中，根据具体变量的含义，采用有明确意义的单词去命名即可，多个单词组合时，采用我们第一点提到的技巧即可。

### 常量命名

常量命名主要分为两种：

1.  **需要导出的常量：统一全部采用大写，多个词之间用下划线隔开。**
2.  **不需要导出，只在文件模块内部使用的常量： 统一小驼峰命名**

### 方法命名

#### 返回布尔类型的方法

<table>
  <tr>
    <td>前缀-prefix</td>
    <td>含义</td>
    <td>例如</td>
  </tr>

  <tr>
    <td>is</td>
    <td>表示是否符合某种状态</td>
    <td>isValid() isLoaded()</td>
  </tr>
  <tr>
    <td>can</td>
    <td>表示是否可以执行某种操作</td>
    <td>canRemove()</td>
  </tr>
  <tr>
    <td>has</td>
    <td>表示是否持有某种特性</td>
    <td>hasOwnProperty()</td>
  </tr>
  <tr>
    <td>needs</td>
    <td>表示是否需要进行某种操作</td>
    <td>needsUpdate()</td>
  </tr>
</table>

#### 回调方法

<table>
  <tr>
    <td>前缀-prefix</td>
    <td>含义</td>
    <td>例如</td>
  </tr>

  <tr>
    <td>on</td>
    <td>表示当事件发生时</td>
    <td>onCompleted() onFinished()</td>
  </tr>
  <tr>
    <td>before/after</td>
    <td>表示事件发生前后</td>
    <td>beforeUpdate() afterUpdate()</td>
  </tr>
  <tr>
    <td>pre/post</td>
    <td>同上</td>
    <td>preUpdate() postUpdate()</td>
  </tr>
  <tr>
    <td>Did/will</td>
    <td>同上</td>
    <td>didUpdate() willUpdate()</td>
  </tr>
</table>

#### 与操作相关，即增删改查

<table>
  <tr>
    <td>单词</td>
    <td>意义</td>
    <td>例如</td>
  </tr>

  <tr>
    <td>初始化：init/reset/clear	</td>
    <td>Init: 初始化数据 reset: 重置数据，恢复到初始化状态 clear: 清除数据，恢复到初始化状态</td>
    <td>initData() resetData(); clearData();</td>
  </tr>
  <tr>
    <td>读取：get/fetch/load</td>
    <td>get: 获取某数据，可以是本地数据，也可以是远程数据 fetch: 获取远程数据 load: 加载某数据</td>
    <td>getUserList(); fetchUserList(); loadUserList();</td>
  </tr>
  <tr>
    <td>添加：add/append/insert/create</td>
    <td>add/create: 在一个list添加一个子项 append/insert: 常见于dom操作</td>
    <td>addUser() appendChild() removeChild()</td>
  </tr>
  <tr>
    <td>删除：delete/remove/destroy</td>
    <td>delete: 在一个list删除某个子项 remove: 常见于dom操作</td>
    <td>deleteUser()</td>
  </tr>
  <tr>
    <td>更新：update</td>
    <td>update: 更新数据</td>
    <td>updateUser()</td>
  </tr>
  <tr>
    <td>保存：save/apply/commit</td>
    <td>save: 保存数据 apply: 应用 commit: 提交</td>
    <td>saveData() applyChange() commitData();</td>
  </tr>
  <tr>
    <td>队列相关：enqueue/dequeue</td>
    <td>enqueue: 对尾添加一个元素 dequeue: 对首移除一个元素	</td>
    <td></td>
  </tr>
  <tr>
    <td>栈/数组相关：push/pop/peek/find等</td>
    <td>即数组的常见操作</td>
    <td></td>
  </tr>
</table>

#### 成对出现的动词

<table>
  <tr>
    <td>单词</td>
    <td>与之对应的</td>
  </tr>

  <tr>
    <td>get ：获取</td>
    <td>set ：设置</td>
  </tr>
  <tr>
    <td>add: 添加</td>
    <td>delete：删除</td>
  </tr>
  <tr>
    <td>create: 创建</td>
    <td>destroy：销毁</td>
  </tr>
  <tr>
    <td>start 启动</td>
    <td>stop 停止</td>
  </tr>
  <tr>
    <td>open 打开</td>
    <td>close 关闭</td>
  </tr>
  <tr>
    <td>read 读取</td>
    <td>write 写入</td>
  </tr>
  <tr>
    <td>load 载入</td>
    <td>save 保存</td>
  </tr>
  <tr>
    <td>backup 备份</td>
    <td>restore 恢复</td>
  </tr>
  <tr>
    <td>import 导入</td>
    <td>export 导出</td>
  </tr>
  <tr>
    <td>split 分割</td>
    <td>merge 合并</td>
  </tr>
  <tr>
    <td>inject 注入</td>
    <td>extract 提取</td>
  </tr>
  <tr>
    <td>attach 附着</td>
    <td>detach 脱离</td>
  </tr>
  <tr>
    <td>bind 绑定</td>
    <td>separate 分离</td>
  </tr>
  <tr>
    <td>view 查看</td>
    <td>browse 浏览</td>
  </tr>
  <tr>
    <td>edit 编辑</td>
    <td>modify 修改</td>
  </tr>
  <tr>
    <td>select 选取</td>
    <td>mark 标记</td>
  </tr>
  <tr>
    <td>copy 复制</td>
    <td>paste 粘贴</td>
  </tr>
  <tr>
    <td>undo 撤销</td>
    <td>redo 重做</td>
  </tr>
  <tr>
    <td>insert 插入</td>
    <td>delete 移除</td>
  </tr>
  <tr>
    <td>add 加入</td>
    <td>append 添加</td>
  </tr>
  <tr>
    <td>clean 清理</td>
    <td>clear 清除</td>
  </tr>
  <tr>
    <td>index 索引</td>
    <td>sort 排序</td>
  </tr>
  <tr>
    <td>find 查找</td>
    <td>search 搜索</td>
  </tr>
  <tr>
    <td>increase 增加</td>
    <td>decrease 减少</td>
  </tr>
  <tr>
    <td>play 播放</td>
    <td>pause 暂停</td>
  </tr>
  <tr>
    <td>launch 启动</td>
    <td>run 运行</td>
  </tr>
  <tr>
    <td>compile 编译</td>
    <td>execute 执行</td>
  </tr>
  <tr>
    <td>debug 调试</td>
    <td>trace 跟踪</td>
  </tr>
  <tr>
    <td>observe 观察</td>
    <td>listen 监听</td>
  </tr>
  <tr>
    <td>build 构建</td>
    <td>publish 发布</td>
  </tr>
  <tr>
    <td>input 输入</td>
    <td>output 输出</td>
  </tr>
  <tr>
    <td>encode 编码</td>
    <td>decode 解码</td>
  </tr>
  <tr>
    <td>encrypt 加密</td>
    <td>decrypt 解密</td>
  </tr>
  <tr>
    <td>compress 压缩</td>
    <td>decompress 解压缩</td>
  </tr>
  <tr>
    <td>pack 打包</td>
    <td>unpack 解包</td>
  </tr>
  <tr>
    <td>parse 解析</td>
    <td>emit 生成</td>
  </tr>
  <tr>
    <td>connect 连接</td>
    <td>disconnect 断开</td>
  </tr>
  <tr>
    <td>send 发送</td>
    <td>receive 接收</td>
  </tr>
  <tr>
    <td>download 下载</td>
    <td>upload 上传</td>
  </tr>
  <tr>
    <td>refresh 刷新</td>
    <td>synchronize 同步</td>
  </tr>
  <tr>
    <td>update 更新</td>
    <td>revert 复原</td>
  </tr>
  <tr>
    <td>lock 锁定</td>
    <td>unlock 解锁</td>
  </tr>
  <tr>
    <td>check out 签出</td>
    <td>check in 签入</td>
  </tr>
  <tr>
    <td>submit 提交</td>
    <td>commit 交付</td>
  </tr>
  <tr>
    <td>push 推</td>
    <td>pull 拉</td>
  </tr>
  <tr>
    <td>expand 展开</td>
    <td>collapse 折叠</td>
  </tr>
  <tr>
    <td>begin 起始</td>
    <td>end 结束</td>
  </tr>
  <tr>
    <td>start 开始</td>
    <td>finish 完成</td>
  </tr>
  <tr>
    <td>enter 进入</td>
    <td>exit 退出</td>
  </tr>
  <tr>
    <td>abort 放弃</td>
    <td>quit 离开</td>
  </tr>
  <tr>
    <td>obsolete 废弃</td>
    <td>depreciate 废旧</td>
  </tr>
  <tr>
    <td>collect 收集</td>
    <td>aggregate 聚集</td>
  </tr>
</table>

#### 路由相关

<table>
  <tr>
    <td>前缀</td>
    <td>后缀</td>
    <td>例如</td>
  </tr>

  <tr>
    <td>to</td>
    <td>page</td>
    <td>toUserPage()</td>
  </tr>
  <tr>
    <td>go</td>
    <td>page</td>
    <td>goUserPage()</td>
  </tr>
  <tr>
    <td>redirect</td>
    <td>page</td>
    <td>redirectUserPage()</td>
  </tr>
  <tr>
    <td>back</td>
    <td>page</td>
    <td>backHomePage() backUserPage()</td>
  </tr>
</table>

`推荐：toXxxPage 或者 goXxxPage 或者 backXxxPage 格式。`

跳转到指定页面：toXxxPage()
重定向到指定页面：redirectXxxPage()
返回上一页： backPrePage();
返回首页：backHomePage();
