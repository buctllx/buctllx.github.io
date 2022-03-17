---
title: Microsoft.Toolkit.Mvvm 使用记录
date: 2022-03-16 10:22:18
categories:
- [工具, MVVM]
tags:
- MVVM
---

# 1. Microsoft.Toolkit.Mvvm 介绍

> 模型-视图-视图模型 (MVVM) 是用于解耦 UI 代码和非 UI 代码的 UI 体系结构设计模式。 借助 MVVM，可以在 XAML 中以声明方式定义 UI，并使用数据绑定标记将 UI 链接到包含数据和命令的其他层。

MVVM 最早是 Microsoft 提出来的，但是官方一直没有提供框架；很多人会说 Prism 框架，但是 Prism 已经出走了，而且比较臃肿；至于 MVVMLight 也很久没有更新了，直到 2020 年 Windows Community Toolkit  开源了一套 MVVM 框架 Microsoft.Toolkit.Mvvm。

<!-- more -->

Windows Community Toolkit  除了提供开源框架，也贴心的在文档中提供了，基本的使用案例，以及从其他 MVVM 框架迁移到  Microsoft.Toolkit.Mvvm 框架的说明文档。

官方文档：[Introduction to the MVVM Toolkit - Windows Community Toolkit | Microsoft Docs](https://docs.microsoft.com/zh-cn/windows/communitytoolkit/mvvm/introduction)

[[WPF\] 使用 MVVM Toolkit 构建 MVVM 程序 - dino.c - 博客园 (cnblogs.com)](https://www.cnblogs.com/dino623/p/building_MVVM_programs_using_MVVM_Toolkit.html)



MVVM Toolkit 延续了 MVVMLight 的风格，是一个轻量级的组件，而且它基于 .NET Standard 2.0，可用于UWP, WinForms, WPF, Xamarin, Uno 等多个平台。相比它的前身 MVVMLight，它有以下特点：

- 更高：版本号更高，一出手就是 7.0。
- 更快：速度更快，MVVM Toolkit 从一开始就以高性能为实现目标。
- 更强：后台更强，MVVM Toolkit 的全称是 'Microsoft.Toolkit.Mvvm'，根正苗红。



# 2. 各个组件说明

前面说到 MVVM Toolkit 延续了 MVVMLight 的风格，因此他们大部分的组件都是相同的

## 2.1 ObservableObject

ObservableObject 实现了 [`INotifyPropertyChanged`](https://docs.microsoft.com/dotnet/api/system.componentmodel.inotifypropertychanged) 和[`INotifyPropertyChanging`](https://docs.microsoft.com/dotnet/api/system.componentmodel.inotifypropertychanging)，并触发 `PropertyChanged` 和 `PropertyChanging` 事件。

```csharp
public class User : ObservableObject
{
    private string name;

    public string Name
    {
        get => name;
        set => SetProperty(ref name, value);
    }
}
```

在这段示例代码中，如果 name 和 value 的值不同，首先触发 `PropertyChanging` 事件，然后触发 `PropertyChanged`。

## 2.2 RelayCommand

`RelayCommand` 和 `RelayCommand<T>` 实现了 `ICommand` 接口，`INotifyPropertyChanged` 和 `ICommand` 是 MVVM 模式的基础。下面的代码使用 `ObservableObject` 和 `RelayCommand` 展示一个基本的 ViewModel：

```csharp
public class MyViewModel : ObservableObject
{
    public MyViewModel()
    {
        IncrementCounterCommand = new RelayCommand(IncrementCounter);
    }

    private int counter;

    public int Counter
    {
        get => counter;
        private set => SetProperty(ref counter, value);
    }

    public ICommand IncrementCounterCommand { get; }

    private void IncrementCounter() => Counter++;
}
```

```xml
<Page
    x:Class="MyApp.Views.MyPage"
    xmlns:viewModels="using:MyApp.ViewModels">
    <Page.DataContext>
        <viewModels:MyViewModel x:Name="ViewModel"/>
    </Page.DataContext>

    <StackPanel Spacing="8">
        <TextBlock Text="{x:Bind ViewModel.Counter, Mode=OneWay}"/>
        <Button
            Content="Click me!"
            Command="{x:Bind ViewModel.IncrementCounterCommand}"/>
    </StackPanel>
</Page>
```

在这段示例里 `IncrementCounterCommand` 包装了 `IncrementCounter` 函数提供给 Button 绑定。`IncrementCounter` 函数更改 `Counter` 的值并通过 `PropertyChanged` 事件通知绑定的 TextBlock。

## 2.3 AsyncRelayCommand

`AsyncRelayCommand` 和 `AsyncRelayCommand<T>` 也实现了 `ICommand`，不过它们支持异步操作，提供的 `ExecutionTask` 和 `IsRunning` 两个属性对监视任务运行状态十分有用。

例如这个 ViewModel：

```CS
public MyViewModel()
{
    DownloadTextCommand = new AsyncRelayCommand(DownloadTextAsync);
}

public IAsyncRelayCommand DownloadTextCommand { get; }

private async Task<string> DownloadTextAsync()
{
    await Task.Delay(3000); // Simulate a web request

    return "Hello world!";
}
```

使用相关的 UI 代码：

```XML
<Page.Resources>
    <converters:TaskResultConverter x:Key="TaskResultConverter"/>
</Page.Resources>
<StackPanel Spacing="8">
    <TextBlock>
        <Run Text="Task status:"/>
        <Run Text="{x:Bind ViewModel.DownloadTextCommand.ExecutionTask.Status, Mode=OneWay}"/>
        <LineBreak/>
        <Run Text="Result:"/>
        <Run Text="{x:Bind ViewModel.DownloadTextCommand.ExecutionTask, Converter={StaticResource TaskResultConverter}, Mode=OneWay}"/>
    </TextBlock>
    <Button
        Content="Click me!"
        Command="{x:Bind ViewModel.DownloadTextCommand}"/>
    <muxc:ProgressRing
        HorizontalAlignment="Left"
        IsActive="{x:Bind ViewModel.DownloadTextCommand.IsRunning, Mode=OneWay}"/>
</StackPanel>
```

点击 `Button` 后 `DownloadTextAsync` 开始运行，在 UI 上 TextBlock 和 ProgressRing 绑定到 `ExecutionTask` 和 `IsRunning` 并显示任务运行状态，最后通过 `TaskResultConverter` 显示任务结果。

[![img](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/38937-20210819221618229-510116488.gif)](https://img2020.cnblogs.com/blog/38937/202108/38937-20210819221618229-510116488.gif)

## 2.4 Messenger

对于主要目的是松耦合的 MVVM 框架，提供一个用于消息交换的系统十分有必要。MVVM Toolkit 中用于消息交换的核心是 `WeakReferenceMessenger` 类。

```csharp
// Create a message
public class LoggedInUserChangedMessage : ValueChangedMessage<User>
{
    public LoggedInUserChangedMessage(User user) : base(user)
    {        
    }
}

// Register a message in some module
WeakReferenceMessenger.Default.Register<LoggedInUserChangedMessage>(this, (r, m) =>
{
    // Handle the message here, with r being the recipient and m being the
    // input messenger. Using the recipient passed as input makes it so that
    // the lambda expression doesn't capture "this", improving performance.
});

// Send a message from some other module
WeakReferenceMessenger.Default.Send(new LoggedInUserChangedMessage(user));
```

正如这段代码所示，`WeakReferenceMessenger` 主要通过 `Register` 和 `Send` 进行信息交换，它的使用方式类似于 MVVMLight 的 messenger 类。MVVM Toolkit 另外还提供了一个 `StrongReferenceMessenger` 类，更多使用方法可以参考这篇 [文档](https://github.com/CommunityToolkit/MVVM-Samples/blob/master/docs/mvvm/Messenger.md)。`Messenger` 功能强大且简单易用，但也由于误用会带来风险而引发了一些争议，有必要更详细地理解它的原理和用法以避免它带来的其它风险，这篇文章只是简单地介绍一下它的用法。

## 2.5 ObservableRecipient

`ObservableRecipient` 继承了 `ObservableObject` 并支持从 `Messenger` 接收信息，可通过 `IsActive` 属性激活或停用。它可以用作 ViewModel 的基类，事实上它的作用基本上相遇于 MVVMLight 中的 [ViewModelBase](https://github.com/lbugnion/mvvmlight/blob/master/GalaSoft.MvvmLight/GalaSoft.MvvmLight (PCL)/ViewModelBase.cs) ：

```csharp
public class MyViewModel : ObservableRecipient, IRecipient<LoggedInUserRequestMessage>
{
    public void Receive(LoggedInUserRequestMessage message)
    {
        // Handle the message here
    }
}
```

## 2.6 ViewModelLocator

在 MVVMLight 中，很多人使用 ViewModelLocator，然后在 xaml 中 binding View 的 DataContext，但是到了 Microsoft.Toolkit.Mvvm 中，却没有默认提供，这里根据官方的 Ioc 迁移说明，给出一个 WPF 应用程序的 ViewModelLocator 的实现方式。

需要的 Package

```xml
<PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="6.0.0" />
<PackageReference Include="Microsoft.Toolkit.Mvvm" Version="7.1.2" />
```

ViewModelLocator.cs 代码文件如下

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Toolkit.Mvvm.DependencyInjection;
using System;

internal class ViewModelLocator
{
    public ViewModelLocator()
    {
        ConfigureServices();
    }

    /// <summary>
    /// Configures the services for the application.
    /// </summary>
    private IServiceProvider ConfigureServices()
    {
        var services = new ServiceCollection();

        // Services
        // services.AddSingleton<IContactsService, ContactsService>();
        // services.AddSingleton<IPhoneService, PhoneService>();

        // Viewmodels
        services.AddTransient<MainViewModel>();

        var serviceProvider = services.BuildServiceProvider();
        Ioc.Default.ConfigureServices(serviceProvider);

        return serviceProvider;
    }
    
    public MainViewModel? MainVM { get { return Ioc.Default.GetService<MainViewModel>(); } }

}    
```

App.xaml 添加以下资源

```xml
<Application.Resources>
    <local:ViewModelLocator x:Key="Locator" />
</Application.Resources>
```

在 View xaml 中的使用方法

```xml
<Window x:Class="Test.MainWindow"
		DataContext="{Binding Source={StaticResource Locator}, Path=MainVM}"
</Window>
```

这样即可实现 MVVMLight 中 Locator 的效果。



# 3. The 性能

[![img](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/38937-20210819221730002-1263673884.png)](https://img2020.cnblogs.com/blog/38937/202108/38937-20210819221730002-1263673884.png)

MVVM Toolkit 在开发过程中为了追求卓越的性能做了很多努力，例如提供一个 `StrongReferenceMessenger` 类，性能如上图所示地有了大幅提升。又例如下面这篇文章所介绍的：

[MVVM Toolkit Preview 3 & The Journey of an API](https://devblogs.microsoft.com/ifdef-windows/mvvm-toolkit-preview-3-the-journey-of-an-api/)

有兴趣的话可以通过源码详细了解一下。
