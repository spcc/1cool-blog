# 常用操作

## 删除分支

```sh
# 删除本地分支
git branch -d 分支名称

# 删除远程分支
git push -d origin 分支名称
```

## 分支重命名

### 已上传到远程

1. 先重命名本地分支

```sh
git branch -m 旧分支名称  新分支名称
```

2. 删除远程分支

```sh
git push --d origin 旧分支名称
```

3.上传新修改名称的本地分支

```sh
git push origin 新分支名称
```

4.修改后的本地分支关联远程分支

```sh
git branch --set-upstream-to origin/新分支名称
```

### 未上传到远程

```sh
git branch -m 原始名称 新名称
```
