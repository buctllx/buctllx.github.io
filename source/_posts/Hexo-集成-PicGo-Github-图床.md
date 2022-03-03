---
title: Hexo 集成 PicGo Github 图床
date: 2022-01-20 18:15:23
categories:
- Hexo
- PicGo
tags:
- Hexo
- PicGo
---



# 0、背景说明

博主原来使用七牛云图床，好处：10G 免费空间；坏处：域名有效期一个月；超出一个月就没法使用了；

因而转向了其他图床，发现 PicGo 中支持的图床有 Github，觉得是一个不错的选择

使用 Github 图床的好处：

1. 没有域名限制；
2. 仓库虽然空间有限（1G），但是满了可以再新建一个仓库，因此相当于无限
3. 有人说慢，但是可以设置加速
4. 稳定，不用担心挂了或者失效

<!--more-->

参考：

[MarkDown、Hexo博客、Coding托管、GitHub做图床、CDN加速 - 段十三 - 博客园 (cnblogs.com)](https://www.cnblogs.com/52duan/p/12551393.html)



# 1、新建一个仓库

1. 名字自定义，例如：pic_bed
2. 选择 Public
3. 勾选初始化复选框： Initialize this repository with a README
4. 点击 Create repository 创建成功
5.  [New personal access token (github.com)](https://github.com/settings/tokens/new) 配置图床的时候要用：
   1. Note下面的文本框内容自定义
   2. 下面很多复选框，只需要勾选 repo 也就是第一个复选框
   3. 最下面点击Generate token即可生成
   4. 下面要用，如果忘记了可以在重新生成



# 2、安装配置 [PicGo](https://molunerfinn.com/PicGo/)

下载安装，这里不再说明，

安装后启动 PicGo，找到 Github 图床，如下图所示：

![image-20220120182829709](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/image-20220120182829709.png)

填写第一步中创建的 仓库名，分支名，以及 Token 

然后“确定”，并设置为默认图床即可



# 3、配置 JsDeliv，给图片镶上加速器

- 比如在GitHub的图片路径是：https://github.com/user/pic_bed/img/test_image.png
- 拼接链接方法1：https://cdn.jsdelivr.net/gh/user/pic_bed@latest/img/test_image.png
- 拼接链接方法2：https://cdn.jsdelivr.net/gh/user/pic_bed/img/test_image.png

**将方法1和方法2拼接起来的链接前缀输入到上图第5步的自定义域名中即可**

- 拼接链接方法1：https://cdn.jsdelivr.net/gh/user/pic_bed@latest/
- 拼接链接方法2：https://cdn.jsdelivr.net/gh/user/pic_bed/



# 4、再 Typora 中选择 PicGo app 作为图片上传服务

[Typora 设置关联七牛云图床 | ConorLuo 博客 (buctllx.github.io)](https://buctllx.github.io/2021/12/06/Typora-设置关联七牛云图床/#3-Typora-图片存储设置)

