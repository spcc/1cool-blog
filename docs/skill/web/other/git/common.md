# 常用操作

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
