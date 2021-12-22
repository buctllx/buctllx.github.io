---
title: Typora 设置关联七牛云图床
date: 2021-12-06 14:46:25
categories:
- Markdown
tags:
- Typora
- PicGo
---

# 1. 七牛云存储环境准备

## 1.1 注册

七牛云官网：[七牛云 - 国内领先的企业级云服务商 (qiniu.com)](https://www.qiniu.com/)

注册流程不在这里详细说明；

说一下注意事项：

1. 注册后，需要实名认证
2. 个人认证 即可

<!--more-->

## 1.2 新建图床存储空间

1. 登录后，通过“管理控制台”进入管理页面；
2. 点击“对象存储 Kodo”；
3. 点击“空间管理” -> “新建空间” 进行图床空间创建；
4. 如下图所示，设置完相关参数，即可创建一个图床存储空间；

![image-20211207135828755](http://r3oaewll2.hb-bkt.clouddn.com/image-20211207135828755.png)

注意事项：

1. 访问权限选择“公开”
2. 存储区域一般选择“距离自己比较近的”，并且不同区域有不同的代号，后面会用到



# 2. PicGo 安装

PicGo  有两种类型；

1. PicGo App（应用程序）
2. PicGo-Core（命令行版本）



## 2.1 安装

### 2.1.1 图形界面版本

[PicGo图形](https://github.com/Molunerfinn/PicGo/releases)

选择对应系统的安装包安装即可

### 2.1.2 命令行版本

[PicGo-core](https://github.com/PicGo/PicGo-Core)

- 没有nodejs环境，使用typora一键安装即可
- 本机有nodjs环境，直接npm全局安装

```shell
npm install picgo -g
# or
yarn global add picgo
```



插件安装

[picgo-plugin-web-uploader](https://github.com/yuki-xin/picgo-plugin-web-uploader)

这是一款可以上传自定义图床的插件

```shell
picgo install web-uploader
```



## 2.2 配置

关于存储区域的填写跟在七牛云上新建空间的地理位置有关；

具体参考：[存储区域_产品简介_对象存储 - 七牛开发者中心 (qiniu.com)](https://developer.qiniu.com/kodo/1671/region-endpoint-fq)

![image-20211206144124515](http://r3oaewll2.hb-bkt.clouddn.com/image-20211206144124515.png)

### 2.2.1 图形版直接图形界面配置

参考配置

![image-20211208133520184](http://r3oaewll2.hb-bkt.clouddn.com/image-20211208133520184.png)

### 2.2.2 图形版直接图形界面配置

参考配置文件

```json
{
  "picBed": {
    "uploader": "qi_niu",
    "current": "qi_niu",
    "qi_niu": {
      "accessKey": "you-access-key",
      "secretKey": "you-secret-key",
      "bucket": "blog-pic-resp",
      "url": "http://you-url",
      "area": "z1",
      "options": "",
      "path": ""
    }
  },
  "picgoPlugins": {
    "picgo-plugin-web-uploader": true
  }
}
```

## 

# 3. Typora 图片存储设置

设置入口：设置 - 偏好设置 - 图像；

如下图所示：

![image-20211207102745086](http://r3oaewll2.hb-bkt.clouddn.com/image-20211207102745086.png)

![image-20211207102901759](http://r3oaewll2.hb-bkt.clouddn.com/image-20211207102901759.png)



1. 插入图片时：选择：上传图片；
2. 上传服务设定
   1. 上传服务：选择：PicGo（app）
   2. PicGo 路径：选择：自己安装时候的路径

当上述两大项设置完毕后，点击：“验证图片上传选项”

设置成功后，会出现“验证成功”的提示，如下图：

如果你的主题设置是 Onedark 一类的黑色主题，这个提示可能会不明显，需要仔细查看才能看到；

![image-20211207103956991](http://r3oaewll2.hb-bkt.clouddn.com/image-20211207103956991.png)

![image-20211207104327148](http://r3oaewll2.hb-bkt.clouddn.com/image-20211207104327148.png)
