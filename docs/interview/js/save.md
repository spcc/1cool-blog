# 客户端存储

前端存储数据的方式有四种：

- cookie
- localStorage
- sessionStorage
- indexDB(存储容量大，可以存几百兆)。

## 客户端存储概念

- 客户端存储遵守“同源策略”，不同的站点页面之间不能相互读取彼此的数据
- 在同一个站点的不同页面之间，存储的数据是共享的
- 在使用数据存储是需要考虑安全问题，比如银行卡账号密码

## cookie

cookie 是存储在浏览器中的纯文本，浏览器的安装目录下会专门有一个 cookie 文件夹来存放各个域下设置的 cookie。