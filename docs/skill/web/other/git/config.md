# 常用配置

## 多邮箱设置

**默认邮箱用公司的**

因为出错的话，基本只会导致自己的私人仓库出错

```sh
# 设置全局
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com

# 单个覆盖
git config user.name 名字
git config user.email 邮箱
```
