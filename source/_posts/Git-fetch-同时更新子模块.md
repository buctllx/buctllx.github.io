---
title: Git fetch 同时更新子模块
date: 2021-12-02 18:25:13
categories:
- Git 相关

tags:
- Git
---

## 1. 问题描述

默认情况，git checkout;     git fetch   如果子模块 submodule 的版本不一致， git 是不会自动更新子模块；

<!--more-->

## 2. 传统解决方法：

cd  submodules 文件夹；

git checkout / fetch；



## 3. 高级解决方法：

在全局进行 Git 设置：

| 1    | git config --global submodule.recurse true |
| :--- | :----------------------------------------- |

设置 submodule.recurse true 后，不仅仅 git checkout 会自动切换子模块，git fetch / pull 也会自动拉取子模块的更新



注意：这个设置对用户机器上安装的 git 版本有要求，详见下面说明

在发行说明中提到了这一点：https://github.com/git/git/commit/e1104a5ee539408b81566066aaa6963cb87d5cd6#diff-c24776ff22455a30fbb78e378b7df0b0R139

submodule.recurse 选项已添加到 git 2.14



