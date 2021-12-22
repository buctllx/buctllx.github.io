---
title: wpf control window 范围内默认样式对第一个控件无效
date: 2021-12-02 15:12:32

categories:
- WPF

tags:
- .Net
- C#
- WPF
- Style
---

## 1、问题描述

wpf 页面设计中，有时候在 xaml 文件 Resource 中指定 window 范围的默认 control style，但是却发现对第一个控件不起作用，具体如下：

<!--more-->

```xaml
<Window x:Class="TestApp.TestWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="TestWindow" Height="400" Width="500"
        WindowStyle="None" WindowState="Maximized">
    <Window.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary Source="Resources/AllResources.xaml"/>
                <ResourceDictionary>
                    <Style TargetType="{x:Type Button}">
                        <Setter Property="FontSize" Value="100"/>
                    </Style>
                </ResourceDictionary>
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
    </Window.Resources>
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition/>
            <ColumnDefinition/>
        </Grid.ColumnDefinitions>
        <Button Grid.Column="0" Content="1" Name="Button1"/>
        <Button Grid.Column="1" Content="2" Name="Button2"/>
    </Grid>
</Window>
```

button1 的 FontSize 并不是 100；但是 button2 却没问题；

通常我们使用下面的代码是没问题的；

```xaml
<Window x:Class="TestApp.TestWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="TestWindow" Height="400" Width="500"
        WindowStyle="None" WindowState="Maximized">
    <Window.Resources>
        <Style TargetType="{x:Type Button}">
            <Setter Property="FontSize" Value="100"/>
        </Style>
    </Window.Resources>
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition/>
            <ColumnDefinition/>
        </Grid.ColumnDefinitions>
        <Button Grid.Column="0" Content="1" Name="Button1"/>
        <Button Grid.Column="1" Content="2" Name="Button2"/>
    </Grid>
</Window>
```



## 2、原因和解决方法



### 2.1 原因

因为把 Button 默认样式放在了 ResourceDictionary.MergedDictionaries 内部的ResourceDictionary 内了，这样在解析引用样式的时候会跳过第一个元素；



### 2.2 解决方案

将 style 提到 ResourceDictionary.MergedDictionaries 之外

```xaml
<Window.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary Source="Resources/AllResources.xaml"/>
        </ResourceDictionary.MergedDictionaries>
        <Style TargetType="{x:Type Button}">
            <Setter Property="FontSize" Value="100"/>
        </Style>
    </ResourceDictionary>
</Window.Resources>
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition/>
        <ColumnDefinition/>
    </Grid.ColumnDefinitions>
    <Button Grid.Column="0" Content="1" Name="Button1"/>
    <Button Grid.Column="1" Content="2" Name="Button2"/>
</Grid>
```



参考链接：[resources - WPF doesn't apply style to first element - Stack Overflow](https://stackoverflow.com/questions/4811884/wpf-doesnt-apply-style-to-first-element)

