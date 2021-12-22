---
title: WPF 在 Trigger 中修改 Button Content 注意事项
date: 2021-12-02 16:52:58
categories:
- WPF

tags:
- .Net
- C#
- WPF
- Style
---

## 1. 问题描述

xaml 代码块如下：

```xaml
<Button Content="333">
                <Button.Style>
                    <Style TargetType="Button">
                        <Setter Property="Width" Value="70"/>
                        <Setter Property="Height" Value="27"/>
                        <Style.Triggers>
                            <DataTrigger Binding="{Binding ElementName=listBox, Path=SelectedIndex}" Value="2">
                                <Setter Property="Content" Value="three" />
                            </DataTrigger>
                        </Style.Triggers>
                    </Style>
                </Button.Style>
            </Button>
```

运行后，触发 DataTrigger 发现 Button 的 Content 没有变化

<!--more-->

## 2. 原因和解决方法

原因：定义 Button 的时候直接指定 Content 相当于定死了 Button 的 Content ，所以在 Style 的 Trigger 中就无法修改了；

注意： 这个时候如果指定有默认的 Button Style，默认样式也会失效；原因是重写了 Style；



解决方案：将 Content 的默认值，写进 Button.Style，如下所示：



```xaml
           <Button>
                <Button.Style>
                    <Style TargetType="Button">
                        <Setter Property="Content" Value="333"/>
                        <Setter Property="Width" Value="70"/>
                        <Setter Property="Height" Value="27"/>
                        <Style.Triggers>
                            <DataTrigger Binding="{Binding ElementName=listBox, Path=SelectedIndex}" Value="2">
                                <Setter Property="Content" Value="three" />
                            </DataTrigger>
                        </Style.Triggers>
                    </Style>
                </Button.Style>
            </Button>
```



