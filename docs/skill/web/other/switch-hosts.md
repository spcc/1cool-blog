# SwitchHosts

[官网](https://swh.app/)

## 提示无权限

1. 打开 `C:\Windows\System32\drivers\etc文件夹`，找到 hosts, 然后给 User 分配所有权限(右键属性->安全)

<img src="https://img-blog.csdnimg.cn/20190726144738530.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2JlbnBhb2RlbHVsdV9ndWFqaWFu,size_16,color_FFFFFF,t_70" />

`然后 打开 hosts 文件， 随便加个空格就可以, 直接再保存原来路径下，这样文件的权限才是真正更改了`

SwitchHosts! 文件右击鼠标，点击管理员启动。

## 使用

<img src="https://img-blog.csdnimg.cn/20190316233713905.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTAwMTMxOTE=,size_16,color_FFFFFF,t_70">

## 修改 hosts 后不生效

一般是由于 DNS 缓存的原因导致的。

- 在 Windows 下命令行执行：ipconfig /flushdns
- 在 macOS 下执行命令：sudo killall -HUP mDNSResponder
- 如果你使用 Chrome 浏览器，那么可以访问：chrome://net-internals/#dns，然后点击「Clear host cache」按钮来清空浏览器里的 DNS 缓存。

如果这样还不生效，那么只能试试重启电脑
