# nrm

## 什么是 nrm

nrm 是一个 npm 源管理器，允许你快速地在 npm 源间切换

## 安装

```sh
npm install -g nrm
```

## nrm 使用

### 查看可选源

```sh
nrm ls
```

### 切换源

```js
nrm use taobao
```

## 添加源

```sh
nrm add cpm http://192.168.22.11:8888/repository/npm-public/
```

## 删除源

```sh
nrm del cpm
```

## 测试源速度

```sh
nrm test npm
```

npm -> 819ms
