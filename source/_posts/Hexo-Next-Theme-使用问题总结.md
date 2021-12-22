---
title: Hexo Next Theme 使用问题总结
date: 2021-12-21 17:36:03
categories:
- Hexo
- Hexo Theme
tags:
- Hexo
- Theme
---



{% note info %}

两个路径说明：

site root directory：博客站点根目录

theme root directory：博客主题根目录

后面说明问题会一直沿用这中叫法；

{% endnote %}

# 1. 部署后“搜索”功能无法使用

**原因**

使用了最新的 master 版本，master 分支是主题作者的开发分支，每周都会更新，当时不稳定

<!--more-->

**解决方法**

拉去稳定版本的分支，主要看最新的 Tag



参考 Issues 链接：https://github.com/hexojs/hexo/issues/4654



# 2. 替换图片资源路径

主题涉及到的，各种图片资源都是可以替换的，

**替换路径：theme root directory\theme\next\source\images**

为了显示效果，注意替换的图片最好是对应像素的，而且不易过大，图片类型可以自己修改

可替换图片说明：

| 图片名称              | 含义                |
| --------------------- | ------------------- |
| avatar                | 博主图像            |
| favicon-16x16-next    | 网站图标 16x16 像素 |
| favicon-32x32-next    | 网站图标 32x32 像素 |
| logo                  | log                 |
| apple-touch-icon-next | 触摸图标            |
| alipay                | 支付宝收款二维码    |
| weixin                | 微信收款二维码      |



# 3. 增加自定义的“标签”，“分类”页面

默认安装好的 next 主题，是没有“标签”，“分类”页面的；

需要使用者自己新增页面：

新增方法：以“标签”也为例说明：

1. 使用 hexo 命令新建 tags.md页面

   ```shell
   # cd site root directory
   hexo new page tags
   ```

2. 打开 tags.md 并修改页面类型 type 信息

   ```
   title: Tags
   date: 2021-12-22 12:00:00
   type: tags
   ```

3. 修改主题配置文件

   ```yaml
   # cd next/_config.yml
   menu:
     home: / || fa fa-home
     archives: /archives/ || fa fa-archive
     tags: /tags/ || fa fa-tags
   ```

# 4. 开启首页文章部分显示

next 主题默认的是将你的文章全篇显示在自己的首页上，这就会导致一个问题，首页各个文章太长了不利于翻阅

想要让文章部分显示，并出现“阅读全文的按钮”，只需要在个人的文章 Markdown 源文件中添加一行代码就行

```xml
<!--more-->
```

具体位置，自己确定，在自己想要显示的文章部分下面加上即可只在首页显示所需的文章部分。



参考文档：

[Custom Pages | NexT (theme-next.js.org)](https://theme-next.js.org/docs/theme-settings/custom-pages.html?highlight=categories#Adding-«Tags»-Page)

[创建分类页面 · iissnan/hexo-theme-next Wiki (github.com)](https://github.com/iissnan/hexo-theme-next/wiki/创建分类页面)

[Hexo + Theme Next -- 写作 | Knner.Wang's Blog](https://knner.wang/2019/11/03/Hexo-ThemeNext-Writing.html)

