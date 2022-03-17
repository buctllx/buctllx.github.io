---
title: Visual Studio 代码格式化工具
date: 2022-03-01 15:43:28
categories:
- [工具, VisualStudio]
tags:
- VisualStudio
- 工具
---

Visual Studio 设置 - > 选项 里面自身包含有部分代码格式化的功能，但是比较弱，面对复杂的项目代码，尤其是团队开发的时候，依然存在一些问题，不能够很好的规范，格式化项目代码；比如说 XAML 文件等。

本篇文章，结合 Visual Studio 的基础设置，同时配合 Visual Studio 扩展相关的代码格式化工具进行项目级别代码格式化规范的统一说明。

<!-- more --> 

# Visual Studio 代码格式化基础设置

vs 自带的文件格式化设置功能位于：工具 -> 选项 -> 文本编辑器

![image-20220303115418833](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/image-20220303115418833.png)

在这里，既可以按照编程语言设置，也可以在“所有语言”中进行统一设置；

这里的设置都是一些基本的设置，比如说：行号，自动补全，缩进等；

以C#为例，在写代码的过程中一般只有在 补全 {} 的时候才会进行自动格式化，如果实在 {} 内部写代码，比如说缩进不对，没有加空格等，那么在保存的时候就不会自动格式化（除非使用了手动/快捷键格式化或者高级插件）

还有，在进行 XAML 开发的时候，由于其标签语言的特性，属性有时候会比较多，尤其实在团队开发的过程中，每个人都有自己的习惯，有些人喜欢一行写下去不带换行，有些喜欢加换行（换行的时候属性的数量也不同，极端的一个属性就换行，或者三五个属性后再换行），而且相同标签的空间在一起，属性的顺序也可能不一样，这就给代码的可读性增加了困难；

如何解决这些问题，下面将会结合高级工具进行说明； 

# 1. Format Document On Save 扩展插件

主要用户解决，再保存代码的时候进行自动格式化；

保存操作支持

1. ctrl+s
2. vs ide 中保存按钮

## 1.1 安装设置

插件链接：[Format document on Save - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mynkow.FormatdocumentonSave)

[Elders/VSE-FormatDocumentOnSave: Visual Studio - Format Document on Save (github.com)](https://github.com/Elders/VSE-FormatDocumentOnSave)



安装后，可以在 工具 -> 选项 -> Format Document On Save 中进行格式化的一些设置，操作；

![image-20220303120914539](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/image-20220303120914539.png)

设置项比较简单，也有注释，这里就不在一一说明了；

## 1.2 项目级使用

上面介绍的使用方法，可以满足一般个人的使用，但是在团队开发的过程中，每个人的设置可能不一样，如何解决这个问题能，这里就要使用到项目级的文件格式化配置 EditConfig。

项目级的文件格式化配置 EditConfig，不是针对某个人的；具有以下特点：

1. 一个项目（sln）一个配置文件；
2. 项目配置的优先级高于 工具 -> 选项 -> Format Document On Save 插件中的配置；

这样，有了[EditorConfig](https://editorconfig.org/) 即便团队中的人员插件设置不一样，也能使用相同的格式化配置；



有关 [EditorConfig](https://editorconfig.org/) 的详细信息可以查看链接，这里不详细说明了。

有了这个插件，可以很好的解决 99% 的代码格式问题，唯一例外的就是 xaml 文件不能格式化，这个会在下面单独说明。



# 2. XAML Styler 扩展插件

在 .Net 开发中，有一种特殊的代码文件：XAML，是前面讲的代码格式化插件所不能格式的；

而 XAML Styler 就是专门针对 xaml 文件进行格式化，这一点从名字上就能看出来。

参考链接：[使用 XAML 格式化工具：XAML Styler - dino.c - 博客园 (cnblogs.com)](https://www.cnblogs.com/dino623/p/XAML_Styler.html)

## 2.1 XAML 的问题

XAML 格式化主要的难题是下面几个：

- 如果所有属性都写在同一行，它太宽了很难看到后面的属性
- 如果每个属性单独一行，它又太长了很难看清楚它的结构
- 属性之间没有排序，重要属性的属性找起来很困难
- 团队没有统一的标准，不小心格式化一下代码的话全部都会变，CodeReview 烦死人

如果不想得过且过忍受上述这些问题的话，可以试试用 XAML Styler 这个工具，它正好解决了这些问题。

## 2.2 安装使用

XAML Styler 是一个 VisualStudio插件（也可用于其它 IDE），这是它在  Visual Studio Marketplace 和 Github 上的地址：

[XAML Styler - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=NicoVermeir.XAMLStyler)

[Xavalon/XamlStyler: Visual Studio extension to help format your XAML source code (github.com)](https://github.com/Xavalon/XamlStyler)

[Home · Xavalon/XamlStyler Wiki (github.com)](https://github.com/Xavalon/XamlStyler/wiki)

在 VisualStudio 的管理扩展窗口中，输入 XamlStyle 搜索，点击“下载”然后关闭 VisualStudio 即可完成安装。

具体安装步骤不在这里说明了。

安装完成后重启 Visual Studio，可以在“选项”窗口中看到它的配置：

[![img](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/38937-20210120232810578-324783095.png)](https://img2020.cnblogs.com/blog/38937/202101/38937-20210120232810578-324783095.png)

之后，每次在 XAML 编辑器中执行保存都会自动进行格式化操作。你也可以在 XAML 编辑器的右键菜单选择 Format XAML 或使用快捷键进行格式化。

## 2.3 关键格式化设置项说明

XAML 的格式主要有两种方式：所有属性放一行和每个属性单独一行。

如果选择所有属性放一行的时候，XAML 结构清晰，结构严谨，段落分明，而且文件也很短。

可是万一很多属性问题就出来了，一行 XAML 会变得很长。而且看看下面两个 ContentPresenter，同样都有 Margin 属性、HorizontalAlignment 属性，VerticalAlignment 属性，RecognizesAccessKey 属性，SnapsToDevicePixels 顺序ing，但你能看到第二个 ContentPresenter 后面偷偷塞了个 Margin 吗：

```XML
Copy<ContentPresenter Margin="{TemplateBinding Padding}" HorizontalAlignment="{TemplateBinding HorizontalContentAlignment}" VerticalAlignment="{TemplateBinding VerticalContentAlignment}" RecognizesAccessKey="True" SnapsToDevicePixels="{TemplateBinding SnapsToDevicePixels}"/>
<ContentPresenter Margin="{TemplateBinding Padding}" HorizontalAlignment="{TemplateBinding HorizontalContentAlignment}" VerticalAlignment="{TemplateBinding VerticalContentAlignment}" RecognizesAccessKey="True" SnapsToDevicePixels="{TemplateBinding SnapsToDevicePixels}" Margin="40"/>
```

如果在 VisualStudio 中“文本编辑器->XAML->格式化->间距->特性间距”这个选项中选择了“将各个属性分别放置”：

[![img](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/38937-20210120232837859-1653416211.png)](https://img2020.cnblogs.com/blog/38937/202101/38937-20210120232837859-1653416211.png)

格式化文档后上面的 XAML 就会变成这样：

```XML
<ContentPresenter Margin="{TemplateBinding Padding}"
                  HorizontalAlignment="{TemplateBinding HorizontalContentAlignment}"
                  VerticalAlignment="{TemplateBinding VerticalContentAlignment}"
                  RecognizesAccessKey="True"
                  SnapsToDevicePixels="{TemplateBinding SnapsToDevicePixels}" />
<ContentPresenter Margin="{TemplateBinding Padding}"
                  HorizontalAlignment="{TemplateBinding HorizontalContentAlignment}"
                  VerticalAlignment="{TemplateBinding VerticalContentAlignment}"
                  RecognizesAccessKey="True"
                  SnapsToDevicePixels="{TemplateBinding SnapsToDevicePixels}"
                  Margin="40" />
```

每个属性单独一行不仅不会看漏属性，而且编辑器本身也不会有横向和纵向两种方向的移动，只有从上到下的移动，这就舒服多了。

可是大部分情况下每个属性分行放置会破坏原本清晰的 XAML 层次结构，例如下面这种本来好好的 XAML:

```XML
<Setter Property="FontWeight" Value="Normal" />
<Setter Property="UseSystemFocusVisuals" Value="True" />
<Setter Property="FocusVisualMargin" Value="-3" />
<Setter Property="Height" Value="50" />
<Setter Property="Width" Value="50" />
<Setter Property="Maximum" Value="1" />
```

变成这样：

```XML
<Setter Property="FontWeight"
        Value="Normal" />
<Setter Property="UseSystemFocusVisuals"
        Value="True" />
<Setter Property="FocusVisualMargin"
        Value="-3" />
<Setter Property="Height"
        Value="50" />
<Setter Property="Width"
        Value="50" />
<Setter Property="Maximum"
        Value="1" />
```

这种风格优雅得像诗歌
我偶尔称为豆瓣风
一行变两行
两行变四行
本来
一页看得完
的代码
变成
两页才看得完
也是够
麻烦的。

XAML Styler 很好地解决了这个问题，它通过 “Attribute tolerance” 属性控制每一行的容许的最多的属性数量，如果一个元素的属性数量少于设定值，那就放在一行，如果超过就所有属性单独一行。通常我将这个属性设置为 `2`，再配合 “Keep first attribute on same line = true” 的设置，可以做到下面这种格式化效果：

```XML
<SolidColorBrush x:Key="NormalTextColor" Color="#2E2F33" />
<SolidColorBrush x:Key="PrimaryColor" Color="#FFED5B8C" />
<SolidColorBrush x:Key="LineColor" Color="#E1E1E1" />
<SolidColorBrush x:Key="TransparentBackground" Color="Transparent" />

<ControlTemplate x:Key="CompletedTemplate" TargetType="ContentControl">
    <Grid x:Name="CompletedElement" Margin="-2">
        <control:DropShadowPanel HorizontalContentAlignment="Stretch"
                                 VerticalContentAlignment="Stretch"
                                 BlurRadius="8"
                                 OffsetX="0"
                                 OffsetY="0"
                                 Color="#FFED5B8C">
            <Ellipse x:Name="CompletedRectangle" Fill="{StaticResource PrimaryColor}" />
        </control:DropShadowPanel>
    </Grid>
</ControlTemplate>
```

这样就可以兼顾两种格式化的优点。

## 2.4 排序

如果元素有多个属性，要找到它的主要属性（通常是 Name 和 Grid.Row）需要颇费一番功夫。XAML Styler 根据一个可设定的规则自动将元素的各个属性排序，这个规则如下：

```JSON
"AttributeOrderingRuleGroups": [
    "x:Class",
    "xmlns, xmlns:x",
    "xmlns:*",
    "x:Key, Key, x:Name, Name, x:Uid, Uid, Title",
    "Grid.Row, Grid.RowSpan, Grid.Column, Grid.ColumnSpan, Canvas.Left, Canvas.Top, Canvas.Right, Canvas.Bottom",
    "Width, Height, MinWidth, MinHeight, MaxWidth, MaxHeight",
    "Margin, Padding, HorizontalAlignment, VerticalAlignment, HorizontalContentAlignment, VerticalContentAlignment, Panel.ZIndex",
    "*:*, *",
    "PageSource, PageIndex, Offset, Color, TargetName, Property, Value, StartPoint, EndPoint",
    "mc:Ignorable, d:IsDataSource, d:LayoutOverrides, d:IsStaticText",
    "Storyboard.*, From, To, Duration"
],
```

排序结果大致如下：

```XML
<Button x:Name="Show"
        Grid.Row="1"
        Padding="40,20"
        HorizontalAlignment="Center"
        VerticalAlignment="Center"
        Background="#00aef1"
        Content="Show"
        Foreground="White"
        Style="{StaticResource BubbleButtonStyle}" />
```

## 2.5 项目级使用

最后，就算自己做好了格式化，团队中的其它成员使用了不同的格式化标准也会引起很多问题。针对这个问题 Xaml Styler 也提供了解决方案。

在项目的根目录创建一个名为“Settings.XamlStyler”的文件，内容参考这个网址：https://github.com/Xavalon/XamlStyler/wiki/External-Configurations 中的 **Default Configuration**。有了这个配置文件，XAML Styler 就会根据它而不是全局配置进行格式化，作为项目的统一格式化标准。



## 2.6 ctrl+s 保存时的冲突问题解决

设置完这两个插件后，在实际使用的过程中可能会发现：在使用 ctrl + s 保存的时候会达不到效果

### 现象分析

在 xaml 中按 ctrl + s 保存的时候，仔细查看画面，会发现 xaml 文件被保存了两次，而且第一一闪而过的结果好像还是正确的，最初呈现的第二次保存解决却不对了，

### 原因分析

根据现象可以分析出来，不止一个插件触发了xaml 的保存操作，那个捣乱者是谁，很容易想到是 Format Document On Save

### 解决方法

从现象中我们看到，保存了两次导致解结果不对；

那么就有两个解决方案：

1. 让 xaml styler 最后保存，
2. 不然 Format Document On Save 保存 xaml；

方案 1 我们无法控制保存顺序，暂时无解；

方案 2 如果我们在设置中可以设置 不存在 xaml 文件就可以了，或许可行

打开 Format Document On Save  设置信息，我们仔细查看，有一个叫 **Denied Extensions** 的设置项，我们可以通过它设置不格式化 xaml 文件，设置后试了一些，依然达不到效果，查看那里除了问题，仔细看 **Denied Extensions** 设置项的说明发现：

 **Denied Extensions** 设置项，只有在  **Allowed Extensions** 设置项为空的情况下才能生效，于是赶紧删除试一下，果然成功了。
