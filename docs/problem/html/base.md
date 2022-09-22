# 常用

## 点击链接自动下载

单击目标下载，可添加 `download` 属性

```html
<a href="image.png" download> </a>
```

## 指定要上传的文件类型

使用 `accept` 属性指定用户允许上载的文件类型

```html
<input type="file" accept=".jpeg,.png" />
```

## input 标签上传多个条目

适用于文件和电子邮件。对于电子邮件，用逗号分隔每封电子邮件。

```html
<input type="file" multiple />
```

## 为你的视频创建默认展示图

该图像在视频下载时显示，或者直到用户点击播放按钮前显示

```html
<video poster="picture.png"></video>
```

## 网站自动刷新

这个片段每 10 秒刷新一次网站

```html
<head>
  <meta http-equiv="refresh" content="10" />
</head>
```

## 防止翻译

将 translate 属性设置为 no，可防止翻译。这一点很重要，以防你不想翻译一个短语或单词，例如你的标志、公司或品牌名称。

```html
<p translate="no">Brand name</p>
```
