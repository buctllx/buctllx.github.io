---
title: Windows Terminal 集成 Oh My Posh
date: 2021-12-29 11:52:56
categories:
- [Termianl, PowerShell]
tags:
- [Termianl, PowerShell, Oh-My-Posh]
---

# 1. 准备安装环境

Windows Termianl, PowerShell 都可以从 Microsoft Store 中下载

- [Windows Terminal](https://www.microsoft.com/store/productId/9N0DX20HK701) (Windows 自带)
-  [PowerShell](https://www.microsoft.com/store/productId/9MZ1SNWT0N5D)

具体安装这里不做详细说明

<!--more-->

# 2. 安装 Oh My Posh

{% note info %}

这里推荐去 Oh My Posh 官方网站查看最新的安装方法；

网上的大部分教程，存在时效性问题，因为  Oh My Posh 是不断更新的，不同时间不同版本的安装方法可能不一样

因此搜索到的二手安装教程不一定使用目前安装的你

{% endnote %}

[Home | Oh My Posh](https://ohmyposh.dev/)

[Introduction | Oh My Posh](https://ohmyposh.dev/docs/)



## 2.1 参考文档：

[将美化进行到底，使用 Oh My Posh 把 PowerShell 做成 oh-my-zsh 的样子 - walterlv](https://blog.walterlv.com/post/beautify-powershell-like-zsh.html)

[Making Windows Terminal look awesome with oh-my-posh and new fonts. (zimmergren.net)](https://zimmergren.net/making-windows-terminal-look-awesome-with-oh-my-posh/)



## 2.2 可能使用到的命令

```shell
# 查看已经安装的模块
Get-InstalledModule

# 当前用户安装一个模块 （-Verbose 参数显示细节）全局使用 AllUsers 
Install-Module oh-my-posh -Scope CurrentUser -Verbose

# 导入加载一个模块 （-Verbose 参数显示细节）
Import-Module oh-my-posh -Verbose

# 卸载一个模块
Uninstall-Module -Name  oh-my-posh

# 查看 PowerShell 安装源 Gallery
Get-PSRepository
```

参考链接：

[Install-Module (PowerShellGet) - PowerShell | Microsoft Docs](https://docs.microsoft.com/zh-cn/powershell/module/powershellget/install-module?view=powershell-7)

[Get-PSRepository (PowerShellGet) - PowerShell | Microsoft Docs](https://docs.microsoft.com/zh-cn/powershell/module/powershellget/get-psrepository?view=powershell-7)

[PowerShell Gallery | Home](https://www.powershellgallery.com/)

## 2.3 字体选择

官方推荐 [Nerd Fonts - Iconic font aggregator, glyphs/icons collection, & fonts patcher](https://www.nerdfonts.com/font-downloads) 

下载自定后安装方法：

解压、进入字体目录、全选、右键、安装 即可



# 3. Posh-Git 安装

[dahlbyk/posh-git: A PowerShell environment for Git (github.com)](https://github.com/dahlbyk/posh-git)

Posh-Git 提供了强大的 tab 补全功能， 并针对提示符进行了增强；可以在 Terminal 中使用

官方文档安装方法： [Git - Git 在 PowerShell 中使用 Git (git-scm.com)](https://git-scm.com/book/zh/v2/附录-A%3A-在其它环境中使用-Git-Git-在-PowerShell-中使用-Git)

```powershell
 Install-Module posh-git -Scope CurrentUser -Force
```

这里不做详细说明
