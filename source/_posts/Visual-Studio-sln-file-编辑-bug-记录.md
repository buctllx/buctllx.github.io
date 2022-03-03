---
title: Visual Studio *.sln file 编辑 bug 记录
date: 2022-03-03 13:47:03
categories:
- VisualStudio
tags:
- VisualStudio
---



sln 是 Visual Studio 20xx 自动创建的解决方案文件，里面存放了有关解决方案的设置信息，以及有关解决方案下项目文件的组织、结构、配置信息；

一般情况下，我们都是通过 Visual Studio 的可视化操作 对 sln 文件间接进行编辑修改的，但是有时候为了提高效果，需要手动进行编辑操作；

这里主要记录手动编辑 sln 文件遇到的问题：

<!-- more -->

# 0. 有关 sln 文件的介绍

这里假设读者对 sln 文件有一定了解，因此不在详细说明，主要用来说明遇到的问题

有关 sln 文件可以参考官方文档：[解决方案 (。Sln) 文件 - Visual Studio (Windows) | Microsoft Docs](https://docs.microsoft.com/zh-cn/visualstudio/extensibility/internals/solution-dot-sln-file?view=vs-2022)

[理解 Visual Studio 解决方案文件格式（.sln） - walterlv](https://blog.walterlv.com/post/understand-the-sln-file)



# 1. sln 修改后不起效的 bug

软件环境：visual studio 2022，sublime 3

## 1.1 问题描述

使用 sublime 打开 sln 文件，然后编辑 GlobalSection(SolutionConfigurationPlatforms) = preSolution 信息，如下图所示：

![image-20220303141026555](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/image-20220303141026555.png)

红框里面是新增的内容；

修改后保存，然后再 visual studio 中重新载入，发现：新增的解决方案配置项，并没有出现，如下图所示：

![image-20220303141324034](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/image-20220303141324034.png)

注：一开始编辑，全部没有出现，这里为了说明问题，故意显示 出 Release R21 Store，便于后面分析问题



## 1.2 问题分析

根据 1.1 中的现象发现，已经显示的配置项是 Release R21 Store，对应 sln 文件中的是 31 行，没有显示的是 32~40 行，这其中有什么区别不难发现。

唯一的区别是：31 行使用的 缩进是 tab 键，32~40 行使用的是空格 space；

注释：截图中的 ——  代表 Tab 键，……  代表 Space 空格键 

难道竟然是缩进符号的问题？？？

通过验证发现：果然是缩进符号导致的



## 1.3 问题总结

产生问题的原因：

笔者再根据 githu 上一篇技术文档的介绍，进行 sln 文件的编辑修改，文档中建议使用编辑器打开手动修改，而且附加上了修改的内容，于是我便很轻易的点击 copy 按钮，进行复制、粘贴，发现没有任何效果。

浪费了半天的事件才发现是 缩进符号导致的，

而且还是在 Sublime 中选中状态下才能发现的

复制粘贴代码害死人，一定要注意。
