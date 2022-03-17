---
title: WPF 窗口控件默认键盘焦点设置
date: 2022-03-14 14:10:52
categories:
- WPF
tags:
- WPF
---

大家经常能够看到 WPF 窗口加载显示后，用户按 Tab 键，就会有一个控价获得焦点，如果这个控件是 Button，那么表现为：在 Button 文本周围有个虚线框；如果是 TextBox，那么表现为：在 TextBox 内部会有光标在闪烁。那么如何在 View 加载后设置默认显示这个效果，本文将会说明。

![image-20220314142837858](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/image-20220314142837858.png)

<!-- more -->

# 一、关于 焦点 的 基本知识

[焦点概述 - WPF .NET Framework | Microsoft Docs](https://docs.microsoft.com/zh-cn/dotnet/desktop/wpf/advanced/focus-overview?view=netframeworkdesktop-4.8)

[为控件中的焦点设置样式以及 FocusVisualStyle - WPF .NET Framework | Microsoft Docs](https://docs.microsoft.com/zh-cn/dotnet/desktop/wpf/advanced/styling-for-focus-in-controls-and-focusvisualstyle?redirectedfrom=MSDN&view=netframeworkdesktop-4.8)

两种焦点：

1. 键盘焦点
2. 逻辑焦点



这里有一段话明确说明了虚线框是键盘焦点的由来

> *Focus visual styles act only when the focus action was initiated by the keyboard. Any mouse action or programmatic focus change disables the mode for focus visual styles.*

意思是：虚线框这种焦点效果，只能通过按 Tab 键进行触发



# 二、实现方案

明白了焦点效果产生的缘由，我们就可以思考如何实现

这里主要介绍如下实现方式；



## 2.1 模拟按键实现

既然只能通过按 Tab 键触发产生想要的效果，最直接的方法就是：

在 View 加载后，通过编码实现模拟用户按键到达想要的键盘焦点效果；

具体实现方式编码，可以通过 PInvoke SendInput 实现，

也可以使用封装好的第三方包，[NuGet Gallery | InputSimulator 1.0.4](https://www.nuget.org/packages/InputSimulator/)

缺点：

要提前计算好要按几次才能达到指定的控件；



## 2.2 重写键盘焦点样式

在第一章节中了解了：想要的样式是通过那种 Style 控制产生的，那么我们就可以重新实现一种新的样式，默认显示我们想要的效果。

确定：

复杂，需要重写想过控件的样式



## 2.3 辅助方法实现

通过反射的方法，调用 ShowFocusVisual Internal 方法实现。

笔者用的就是这种方法，因为我的需要没有复杂的样式要求，只需要显示默认的键盘焦点样式即可

```c#
public sealed class KeyboardHelper
{
    private static KeyboardHelper _Instance;

    private readonly PropertyInfo _AlwaysShowFocusVisual;
    private readonly MethodInfo _ShowFocusVisual;

    // Explicit static constructor to tell C# compiler
    // not to mark type as beforefieldinit
    static KeyboardHelper()
    {
    }

    private KeyboardHelper()
    {
        var type = typeof(KeyboardNavigation);

        _AlwaysShowFocusVisual = type.GetProperty("AlwaysShowFocusVisual", BindingFlags.NonPublic | BindingFlags.Static);
        _ShowFocusVisual = type.GetMethod("ShowFocusVisual", BindingFlags.NonPublic | BindingFlags.Static);
    }

    internal static KeyboardHelper Instance => _Instance ?? (_Instance = new KeyboardHelper());

    internal void ShowFocusVisualInternal()
    {
        _ShowFocusVisual.Invoke(null, null);
    }

    internal bool AlwaysShowFocusVisualInternal
    {
        get { return (bool)_AlwaysShowFocusVisual.GetValue(null, null); }
        set { _AlwaysShowFocusVisual.SetValue(null, value, null); }
    }

    public static void Focus(UIElement element)
    {
        element?.Dispatcher.BeginInvoke(DispatcherPriority.Background, new Action(() =>
        {
            var keybHack = KeyboardHelper.Instance;
            var oldValue = keybHack.AlwaysShowFocusVisualInternal;

            keybHack.AlwaysShowFocusVisualInternal = true;

            try
            {
                Keyboard.Focus(element);
                keybHack.ShowFocusVisualInternal();
            }
            finally
            {
               keybHack.AlwaysShowFocusVisualInternal = oldValue;
            }
        }));
    }
}
```

使用方法: 在构造方法中的 InitializeComponent 方法 或者 Loaded 后添加下方代码即可

```C#
KeyboardHelper.Focus(this.OkBtn); // Button Name
```

缺点：

需要使用控件 Name；



# 三、总结

这第二章节中介绍了三种方法，大家可以根据自己的需要，选择合适的方法

笔者采用的是 2.3 ，目前没有发现什么问题；



参考链接：

[WPF Button to have Keyboard focus (dotted border around) during the startup or activation of window - Stack Overflow](https://stackoverflow.com/questions/5468419/wpf-button-to-have-keyboard-focus-dotted-border-around-during-the-startup-or-a/54332878#54332878?newreg=1c1894efcf124154aece9df9df062740)

[wpf - How to make CheckBox focus border appear when calling CheckBox.Focus()? - Stack Overflow](https://stackoverflow.com/questions/5400570/how-to-make-checkbox-focus-border-appear-when-calling-checkbox-focus/5401707#5401707)
