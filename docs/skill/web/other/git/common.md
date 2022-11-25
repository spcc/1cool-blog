# 常用操作

- [【讲真!】Git 进阶精选看这篇就够了](https://juejin.cn/post/7133045617877581831)
- [工作中使用 Git 解决问题的场景](https://juejin.cn/post/7117174240012402701)
- [git 知识点自我总结](https://juejin.cn/post/7136896920840044558)
- [企业级 GIT 分支管控方案](https://juejin.cn/post/7129001195548622861)
- [Git 不要只会 pull 和 push，试试这 5 条提高效率的命令](https://juejin.cn/post/7071780876501123085)
- [我是怎么在公共分支上使用 git 的](https://juejin.cn/post/7038822817483194398)

## 修改源

```sh
git remote set-url origin 新源地址
```

## 删除分支

```sh
# 删除本地分支
git branch -d 分支名称

# 删除远程分支
git push -d origin 分支名称
```

## stash 缓存

```sh
// 缓存
git stash

// 查看本地缓存列表 !: 同时不会删除恢复的缓存条目
git stash list

// 恢复指定ID的stash内容
git stash apply stash@{id}

// 恢复最近的缓存文件 !:同时删除恢复的缓存条目
git stash pop
```
