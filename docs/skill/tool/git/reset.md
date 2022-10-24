# 重置

## 修复 commit 信息

### 修改远程

```sh
# 1. 回撤到上一次提交
git reset --soft HEAD~1

# 2. 重新提交
git commit -m "重新提交commit信息"

# 3. 强推本地分支到远程仓库
git push -f
```

### 修改本地

```sh
# 1. 进入vim操作界面
git commit --amend

# 2. 输入 i 进入INSERT模式，对commit信息进行修改，然后ESC, 最后 :wq 保存退出
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
