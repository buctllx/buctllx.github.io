---
title: Maven 使用方法
date: 2022-03-29 13:29:13
categories:
- [工具, Maven]
tags:
- Maven
---

Maven是一个 Java 项目管理和构建的工具，它可以定义项目结构、项目依赖，并使用统一的方式进行自动化构建，是 Java 项目不可缺少的工具。

本文主要介绍 Java 包管理工具 Maven 的一些使用方法，主要参考了下面的一些资料。

[Maven基础 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/1252599548343744/1255945359327200)

<!-- more -->

在 Java 开发过程中，很多时候我们会用到第三方封装好了的功能模块，这些功能都是以 jar 包的形式存在的，首先，我们需要确定引入哪些依赖包。例如，如果我们需要用到 [commons logging](https://commons.apache.org/proper/commons-logging/)，我们就必须把 commons logging 的 jar 包放入classpath。如果我们还需要 [log4j](https://logging.apache.org/log4j/)，就需要把 [log4j](https://logging.apache.org/log4j/) 相关的 jar 包都放到 classpath 中。这些就是最简单的依赖包的管理。现实使用过程中远比这要复杂，因为  [log4j](https://logging.apache.org/log4j/) 可能有依赖了其他的 jar 包，或者有多个 jar 包都依赖某个 jar 包，甚至有不同的版本的要求；

因此仅仅靠人为管理这些 jar 包，在项目开发中也是一件复杂、繁琐、耗时的事情，这时候就需要有一个工具，帮我们管理这些 jar 包，因此 Maven 就出现了。

Maven就是是专门为Java项目打造的管理和构建工具，它的主要功能有：

- 提供了一套标准化的项目结构；
- 提供了一套标准化的构建流程（编译，测试，打包，发布……）；
- 提供了一套依赖管理机制。

从上面可以看出来：Maven 不仅仅是包管理的那么简单，他还可以定义我们 Java 项目的文件结构，甚至干预自动化构建的过程。下面我们会一一展开来讲。



# 1. Maven 安装

要安装 Maven，可以从 [Maven 官网](https://maven.apache.org/) 下载最新的Maven 3.6.x，然后在本地解压，设置几个环境变量：

```
M2_HOME=/path/to/maven-3.6.x
PATH=$PATH:$M2_HOME/bin
```

Windows可以把`%M2_HOME%\bin`添加到系统Path变量中。

然后，打开命令行窗口，输入`mvn -version`，应该看到Maven的版本信息：

```ascii
┌────────────────────────────────────────────────────────┐
│Command Prompt                                    - □ x │
├────────────────────────────────────────────────────────┤
│Microsoft Windows [Version 10.0.0]                      │
│(c) 2015 Microsoft Corporation. All rights reserved.    │
│                                                        │
│C:\> mvn -version                                       │
│Apache Maven 3.6.0 (97c98ec64a1fdfee7767ce5ffb20918...) │
│Maven home: C:\Users\liaoxuefeng\maven                  │
│Java version: ...                                       │
│...                                                     │
│C:\> _                                                  │
│                                                        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

如果提示命令未找到，说明系统PATH路径有误，需要修复后再运行。

## 1.1 IDEA 中的 Maven

在 IDEA 的设置中搜索 Maven 可以看到以下设置信息：

![image-20220329140137485](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/image-20220329140137485.png)

这里我们看出来，新版的 IDEA 默认包含了 Maven 工具，具体路径和用户的安装路径有关，这里列出来我的安装路径：

```
D:\Program Files\JetBrains\IntelliJ IDEA 2021.3.3\plugins\maven\lib\maven3\bin
D:\Program Files\JetBrains\IntelliJ IDEA 2021.3.3\plugins\maven\lib\maven3\conf\settings.xml
```



# 2. Maven 项目结构

一个使用 Maven 管理的普通的 Java 项目，它的目录结构默认如下：

```ascii
a-maven-project
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   └── resources
│   └── test
│       ├── java
│       └── resources
└── target
```

`a-maven-project`是项目名（项目的根目录），

`pom.xml`是项目描述文件

`src/main/java`是存放Java源码的目录，

`src/main/resources`是存放资源文件的目录，

`src/test/java`是存放测试源码的目录，

`src/test/resources`是存放测试资源的目录，

`target`目录里存放的是最后，所有编译、打包生成的文件

这些就是一个Maven项目的标准目录结构。<font color="red">所有的目录结构都是约定好的标准结构，我们千万不要随意修改目录结构。</font>使用标准结构不需要做任何配置，Maven就可以正常使用。

这里先说明，最重要的是 pom.xml 文件，后面我们会重点介绍。

# 3. pom.xml 文件说明

POM 全称是 Project Object Model，即项目对象模型。

pom.xml 文件以 xml 的形式描述项目的信息，包括项目名称、版本、项目id、项目的依赖关系、编译环境、持续集成、项目团队、贡献管理、生成报表等等。总之，它包含了所有的项目 信息。

我们再来看一个最简单的项目描述`pom.xml`文件，它的内容长得像下面：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.example</groupId>
        <artifactId>parent</artifactId>
        <version>0.0.1-SNAPSHOT</version>

        <!-- lookup parent from repository -->
        <relativePath>../parent/pom.xml</relativePath>
    </parent>


    <groupId>com.example</groupId>
    <artifactId>ifc_file_parser</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>ifc_file_parser</name>
    <description>ifc_file_parser</description>

    <properties>
        <java.version>11</java.version>
    </properties>


    <dependencies>
<!--        <dependency>-->
<!--            <groupId>org.springframework.boot</groupId>-->
<!--            <artifactId>spring-boot-starter-data-mongodb</artifactId>-->
<!--        </dependency>-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>

<!--        <dependency>-->
<!--            <groupId>mysql</groupId>-->
<!--            <artifactId>mysql-connector-java</artifactId>-->
<!--            <scope>runtime</scope>-->
<!--        </dependency>-->
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>

        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                    <include>**/*.properties</include>
                </includes>
            </resource>

            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.xml</include>
                    <include>**/*.properties</include>
                </includes>
            </resource>
        </resources>
    </build>

</project>

```

**modelVersion** 描述这个POM文件是遵从哪个版本的项目描述符。
**groupId** 针对一个项目的普遍唯一识别符。通常用一个完全正确的包的名字来与其他项目的类似名字来进行区分（比如：org.apache.maven)。
**artifactId** 在给定groupID 的group里面为artifact 指定的标识符是唯一的 ， artifact 代表的是被制作或者被一个project应用的组件(产出物)。
**version** 当前项目产生的 artifact 的版本

<font color="red">**以上4个元素缺一不可，其中 groupId、artifactId、version 是描述依赖的项目唯一标志。**</font>

## 3.1 基本信息

在 project 节点内部，一般用于描述项目的名称，id，版本，等基础信息，如下:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
         
    <groupId>com.example</groupId>
    <artifactId>ifc_file_parser</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>ifc_file_parser</name>
    <description>ifc_file_parser</description
        
    <name>...</name>  
    <description>...</description>  
    <url>...</url>  
    <inceptionYear>...</inceptionYear>  
    <licenses>...</licenses>  
    <organization>...</organization>  
    <developers>...</developers>  
    <contributors>...</contributors>  
</project>
```

## 3.2 继承信息（模块管理）

在软件开发中，把一个大项目分拆为多个模块是降低软件复杂度的有效方法：

在 pom 文件中，可以通过 <parent> 标签描述项目的继承信息，这样可以把多个项目相同部分的描述信息放在一起作为公共基础描述 pom 文件；然后在其他子项目的 pom 文件中通过 <parent> 标签继承 公共通用的项目设置信息。

具体操作如下：

```ascii
                        ┌ ─ ─ ─ ─ ─ ─ ┐
                          ┌─────────┐
                        │ │Module A │ │
                          └─────────┘
┌──────────────┐ split  │ ┌─────────┐ │
│Single Project│───────>  │Module B │
└──────────────┘        │ └─────────┘ │
                          ┌─────────┐
                        │ │Module C │ │
                          └─────────┘
                        └ ─ ─ ─ ─ ─ ─ ┘
```

对于Maven工程来说，原来是一个大项目：

```ascii
single-project
├── pom.xml
└── src
```

现在可以分拆成3个模块：

```ascii
mutiple-project
├── module-a
│   ├── pom.xml
│   └── src
├── module-b
│   ├── pom.xml
│   └── src
└── module-c
    ├── pom.xml
    └── src
```

Maven可以有效地管理多个模块，我们只需要把每个模块当作一个独立的Maven项目，它们有各自独立的`pom.xml`。例如，模块A的`pom.xml`：

{% tabs multi_pom_def %}
<!-- tab 模块A`pom.xml`文件 -->

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itranswarp.learnjava</groupId>
    <artifactId>module-a</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>

    <name>module-a</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.28</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.5.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

<!-- endtab -->
<!-- tab 模块B`pom.xml`文件 -->

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itranswarp.learnjava</groupId>
    <artifactId>module-b</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>

    <name>module-b</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.28</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.5.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

<!-- endtab -->

{% endtabs %}

可以看出来，模块A和模块B的`pom.xml`高度相似，因此，我们可以提取出共同部分作为`parent`：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itranswarp.learnjava</groupId>
    <artifactId>parent</artifactId>
    <version>1.0</version>
    <packaging>pom</packaging>

    <name>parent</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.28</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.5.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

注意到 parent pom.xml 中的`<packaging>`是`pom`而不是`jar`，因为`parent`本身不含任何Java代码。编写`parent`的`pom.xml`只是为了在各个模块中减少重复的配置。现在我们的整个工程结构如下：

```ascii
multiple-project
├── pom.xml
├── parent
│   └── pom.xml
├── module-a
│   ├── pom.xml
│   └── src
├── module-b
│   ├── pom.xml
│   └── src
└── module-c
    ├── pom.xml
    └── src
```

这样模块A就可以简化为：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.itranswarp.learnjava</groupId>
        <artifactId>parent</artifactId>
        <version>1.0</version>
        <relativePath>../parent/pom.xml</relativePath>
    </parent>

    <artifactId>module-a</artifactId>
    <packaging>jar</packaging>
    <name>module-a</name>
</project>
```

如果想看项目(父或子)的完全的pom结构，可以运行：

```shell
mvn help:effective-pom
```

模块B、模块C都可以直接从`parent`继承，大幅简化了`pom.xml`的编写。

如果模块A依赖模块B，则模块A需要模块B的jar包才能正常编译，我们需要在模块A中引入模块B：

```xml
    ...
    <dependencies>
        <dependency>
            <groupId>com.itranswarp.learnjava</groupId>
            <artifactId>module-b</artifactId>
            <version>1.0</version>
        </dependency>
    </dependencies>
```

最后，在编译的时候，需要在根目录创建一个`pom.xml`统一编译：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.itranswarp.learnjava</groupId>
    <artifactId>build</artifactId>
    <version>1.0</version>
    <packaging>pom</packaging>
    <name>build</name>

    <modules>
        <module>parent</module>
        <module>module-a</module>
        <module>module-b</module>
        <module>module-c</module>
    </modules>
</project>
```

这样，在根目录执行`mvn clean package`时，Maven 根据项目根目录的`pom.xml`找到包括`parent`在内的共4个`<module>`，一次性全部编译。

## 3.3 依赖管理

如果我们的项目依赖第三方的jar包，例如commons logging，

那么问题来了：commons logging发布的jar包在哪下载？

如果我们还希望依赖log4j，那么使用log4j需要哪些jar包？

类似的依赖还包括：JUnit，JavaMail，MySQL驱动等等，

一个可行的方法是通过搜索引擎搜索到项目的官网，然后手动下载zip包，解压，放入classpath。

但是，这个过程非常繁琐。

Maven 通过 pom 文件的  <dependencies> 标签，解决了依赖管理问题。

例如，我们的项目依赖`abc`这个jar包，而`abc`又依赖`xyz`这个jar包：

```ascii
┌──────────────┐
│Sample Project│
└──────────────┘
        │
        ▼
┌──────────────┐
│     abc      │
└──────────────┘
        │
        ▼
┌──────────────┐
│     xyz      │
└──────────────┘
```

当我们声明了`abc`的依赖时，Maven 自动把`abc`和`xyz`都加入了我们的项目依赖，不需要我们自己去研究`abc`是否需要依赖`xyz`。

因此，Maven 的第一个作用就是解决依赖管理。我们声明了自己的项目需要`abc`，Maven会自动导入`abc`的 jar 包，再判断出`abc`需要`xyz`，又会自动导入`xyz`的jar包，这样，最终我们的项目会依赖`abc`和`xyz`两个jar包。

我们来看一个复杂依赖示例：

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>1.4.2.RELEASE</version>
</dependency>
```

当我们声明一个`spring-boot-starter-web`依赖时，Maven会自动解析并判断最终需要大概二三十个其他依赖：

```ascii
spring-boot-starter-web
  spring-boot-starter
    spring-boot
    sprint-boot-autoconfigure
    spring-boot-starter-logging
      logback-classic
        logback-core
        slf4j-api
      jcl-over-slf4j
        slf4j-api
      jul-to-slf4j
        slf4j-api
      log4j-over-slf4j
        slf4j-api
    spring-core
    snakeyaml
  spring-boot-starter-tomcat
    tomcat-embed-core
    tomcat-embed-el
    tomcat-embed-websocket
      tomcat-embed-core
  jackson-databind
  ...
```

如果我们自己去手动管理这些依赖是非常费时费力的，而且出错的概率很大。

### 3.3.1 依赖关系

Maven 定义了几种依赖关系，通过 <scope> 标签描述，分别是

1. `compile`
2. `test`
3. `runtime`
4. `provided`

| scope    | 说明                                            | 示例            |
| :------- | :---------------------------------------------- | :-------------- |
| compile  | 编译时需要用到该jar包（默认）                   | commons-logging |
| test     | 编译 Test 时需要用到该jar包                     | junit           |
| runtime  | 编译时不需要，但运行时需要用到                  | mysql           |
| provided | 编译时需要用到，但运行时由 JDK 或某个服务器提供 | servlet-api     |



#### 3.3.1.1  compile 依赖

最常用的一致依赖，Maven会把这种类型的依赖直接放入 classpath。

#### 3.3.1.2 test 依赖

表示仅在测试时使用，正常运行时并不需要。最常用的`test`依赖就是 JUnit：

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.3.2</version>
    <scope>test</scope>
</dependency>
```

#### 3.3.1.3 runtime 依赖

表示编译时不需要，但运行时需要。最典型的`runtime`依赖是 JDBC 驱动，例如 MySQL 驱动：

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.48</version>
    <scope>runtime</scope>
</dependency>
```

#### 3.3.1.4 provided 依赖

表示编译时需要，但运行时不需要。最典型的`provided`依赖是 Servlet API，编译的时候需要，但是运行时，Servlet 服务器内置了相关的 jar，所以运行期不需要：

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.0</version>
    <scope>provided</scope>
</dependency>
```

### 3.3.2 从何处下载所需的依赖

最后一个问题是，Maven如何知道从何处下载所需的依赖？也就是相关的 jar包？

答案是Maven维护了一个中央仓库（[repo1.maven.org](https://repo1.maven.org/)）

所有第三方库将自身的jar以及相关信息上传至中央仓库，Maven就可以从中央仓库把所需依赖下载到本地。

Maven并不会每次都从中央仓库下载 jar 包。一个 jar 包一旦被下载过，就会被 Maven 自动缓存在本地目录（用户主目录的`.m2`目录），所以，除了第一次编译时因为下载需要时间会比较慢，后续过程因为有本地缓存，并不会重复下载相同的jar包。

### 3.3.3 唯一ID

对于某个依赖，Maven只需要3个变量即可唯一确定某个jar包：

- groupId：属于组织的名称，类似Java的包名；
- artifactId：该jar包自身的名称，类似Java的类名；
- version：该jar包的版本。

通过上述3个变量，即可唯一确定某个 jar 包。Maven 通过对jar包进行 PGP 签名确保任何一个 jar 包一经发布就无法修改。修改已发布jar包的唯一方法是发布一个新版本。

因此，某个 jar 包一旦被 Maven 下载过，即可永久地安全缓存在本地。



**注：只有以`-SNAPSHOT`结尾的版本号会被Maven视为开发版本，开发版本每次都会重复下载，这种SNAPSHOT版本只能用于内部私有的 Maven repo，公开发布的版本不允许出现SNAPSHOT。**

### 3.3.4 Maven 依赖镜像

除了可以从 Maven 的中央仓库下载外，还可以从 Maven 的镜像仓库下载。如果访问 Maven 的中央仓库非常慢，我们可以选择一个速度较快的 Maven 的镜像仓库。Maven 镜像仓库定期从中央仓库同步：

```ascii
           slow    ┌───────────────────┐
    ┌─────────────>│Maven Central Repo.│
    │              └───────────────────┘
    │                        │
    │                        │sync
    │                        ▼
┌───────┐  fast    ┌───────────────────┐
│ User  │─────────>│Maven Mirror Repo. │
└───────┘          └───────────────────┘
```

中国区用户可以使用阿里云提供的 Maven 镜像仓库。使用 Maven 镜像仓库需要一个配置，在用户主目录下进入`.m2`目录，创建一个`settings.xml`配置文件，内容如下：

```
<settings>
    <mirrors>
        <mirror>
            <id>aliyun</id>
            <name>aliyun</name>
            <mirrorOf>central</mirrorOf>
            <!-- 国内推荐阿里云的Maven镜像 -->
            <url>https://maven.aliyun.com/repository/central</url>
        </mirror>
    </mirrors>
</settings>
```

配置镜像仓库后，Maven的下载速度就会非常快。

### 3.3.5 搜索第三方组件

最后一个问题：如果我们要引用一个第三方组件，比如`okhttp`，如何确切地获得它的`groupId`、`artifactId`和`version`？方法是通过 [search.maven.org](https://search.maven.org/) 搜索关键字，找到对应的组件后，直接复制：

![copy-maven](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/l)

### 3.3.6 包依赖相关命令行

在命令中，进入到`pom.xml`所在目录，输入以下命令：

```
$ mvn clean package
```

如果一切顺利，即可在`target`目录下获得编译后自动打包的 jar。

### 3.3.7 在 IDE 中使用 Maven

几乎所有的 IDE 都内置了对 Maven 的支持。在 IDEA，Eclipse 中，可以直接创建或导入Maven 项目。如果导入后的 Maven 项目有错误，可以尝试选择项目后点击右键，选择 Maven - Update Project... 更新：

![update-maven-project](https://www.liaoxuefeng.com/files/attachments/1335694802812993/l)

### 3.3.7 Maven 包依赖仓库分类

#### 3.3.7.1 中央仓库

其实我们使用的大多数第三方模块都是这个用法，例如，我们使用 commons logging、log4j 这些第三方模块，就是第三方模块的开发者自己把编译好的 jar 包发布到Maven的中央仓库中。

#### 3.3.7.2 私有仓库

私有仓库是指公司内部如果不希望把源码和 jar 包放到公网上，那么可以搭建私有仓库。私有仓库总是在公司内部使用，它只需要在本地的`~/.m2/settings.xml`中配置好，使用方式和中央仓位没有任何区别。

#### 3.3.7.3 本地仓库

本地仓库是指把本地开发的项目“发布”在本地，这样其他项目可以通过本地仓库引用它。

但是我们不推荐把自己的模块安装到 Maven 的本地仓库，因为每次修改某个模块的源码，都需要重新安装，非常容易出现版本不一致的情况。

更好的方法是使用模块化编译，在编译的时候，告诉 Maven 几个模块之间存在依赖关系，需要一块编译，Maven 就会自动按依赖顺序编译这些模块。



## 3.4 Build 构建流程

使用 maven 构建的项目均可以直接使用 maven build 完成项目的编译测试打包，无需额外配置

Maven 是通过 pom.xml 来描述执行任务的，其中的 <build> 标签描述了如何来编译及打包项目，而具体的编译和打包工作是通过在 <build> 标签中配置的 <plugin> 标签来完成。当然 <plugin> 标签配置不是必须的，默认情况下，Maven 会绑定以下几个插件来完成基本操作。

要想了解 build 的执行过程，先得了解构建流程和插件

### 3.4.1 构建流程

Maven 的 pom.xml 文件同时定义了一套标准化的构建流程，可以自动化实现编译，打包，发布，等等。

使用 Maven 时，我们首先要了解什么是 Maven 的生命周期（lifecycle）。

Maven 的生命周期由一系列阶段（phase）构成;

Maven 通过 lifecycle、phase 和 goal 来提供标准的构建流程。

最常用的构建命令是指定 phase，然后让 Maven 执行到指定的 phase：

- mvn clean
- mvn clean compile
- mvn clean test
- mvn clean package

通常情况，我们总是执行 phase 默认绑定的 goal，因此不必指定 goal。

#### 3.4.1.1 内置的生命周期 default

为例，它包含以下 phase：

```
- validate
- initialize
- generate-sources
- process-sources
- generate-resources
- process-resources
- compile
- process-classes
- generate-test-sources
- process-test-sources
- generate-test-resources
- process-test-resources
- test-compile
- process-test-classes
- test
- prepare-package
- package
- pre-integration-test
- integration-test
- post-integration-test
- verify
- install
- deploy
```

如果我们运行`mvn package`，Maven 就会执行`default`生命周期，它会从开始一直运行到`package`这个phase为止：

- validate
- ...
- package

如果我们运行`mvn compile`，Maven也会执行`default`生命周期，但这次它只会运行到`compile`，即以下几个phase：

- validate
- ...
- compile

#### 3.4.1.2 常用的生命周期是 clean

Maven 另一个常用的生命周期是 `clean`，它会包含3个 phase：

```
- pre-clean
- clean （注意这个clean不是 lifecycle 而是 phase）
- post-clean
```

所以，我们使用`mvn`这个命令时，后面的参数是phase，Maven自动根据生命周期运行到指定的phase。

#### 3.4.1.3 指定多个 phase

更复杂的例子是指定多个phase，例如，运行`mvn clean package`，Maven先执行`clean`生命周期并运行到`clean`这个phase，然后执行`default`生命周期并运行到`package`这个phase，实际执行的phase如下：

```
- 1. clean lifecycle
	- pre-clean
    - clean （注意这个clean是phase）
    
- 2. default lifecycle
    - validate
    - ...
    - package
```

#### 3.4.1.4 常用的命令

在实际开发过程中，经常使用的命令有：

```shell
# 清理所有生成的class和jar；
mvn clean

# 先清理，再执行到`compile`；
mvn clean compile

# 先清理，再执行到`test`，因为执行`test`前必须执行`compile`，所以这里不必指定`compile`；
mvn clean test

# 先清理，再执行到`package`
mvn clean package
```

大多数 phase 在执行过程中，因为我们通常没有在 `pom.xml` 中配置相关的设置，所以这些 phase 什么事情都不做。

经常用到的phase其实只有几个：

- clean：清理
- compile：编译
- test：运行测试
- package：打包

#### 3.4.1.4  Goal

执行一个 phase 又会触发一个或多个 goal：

| 执行的 Phase | 对应执行的 Goal                      |
| :----------- | :----------------------------------- |
| compile      | compiler: compile                    |
| test         | compiler: testCompile surefire: test |

goal 的命名总是`abc:xyz`这种形式。

看到这里，相信大家对 lifecycle、phase 和 goal 已经明白了吧？

其实我们类比一下就明白了：

- lifecycle 相当于 Java 的 package，它包含一个或多个 phase；
- phase 相当于 Java 的 class，它包含一个或多个 goal；
- goal 相当于 class 的 method，它其实才是真正干活的。

大多数情况，我们只要指定phase，就默认执行这些 phase 默认绑定的 goal，只有少数情况，我们可以直接指定运行一个 goal，例如，启动 Tomcat 服务器：

```shell
mvn tomcat:run
```



### 3.4.2 plugin 插件使用

我们在前面介绍了 Maven 的 lifecycle，phase 和 goal

使用Maven构建项目就是执行 lifecycle，执行到指定的 phase 为止。每个 phase 会执行自己默认的一个或多个 goal。goal 是最小任务单元。

我们以`compile`这个phase为例，如果执行：

```
mvn compile
```

Maven 将执行`compile`这个 phase，这个phase会调用`compiler`插件执行关联的`compiler:compile`这个 goal。

实际上：<font color="red">执行每个 phase，都是通过某个插件（plugin）来执行的。</font>

Maven 本身其实并不知道如何执行`compile`，它只是负责找到对应的`compiler`插件，然后执行默认的`compiler:compile`这个 goal 来完成编译。

所以，使用 Maven，实际上就是配置好需要使用的插件，然后通过 phase 调用它们。

Maven已经内置了一些常用的标准插件：

| plugin 插件名称 | 对应执行的 phase |
| :-------------- | :--------------- |
| clean           | clean            |
| compiler        | compile          |
| surefire        | test             |
| jar             | package          |

如果标准插件无法满足需求，我们还可以使用自定义插件。使用自定义插件的时候，需要声明。

例如，使用`maven-shade-plugin`可以创建一个可执行的 jar，要使用这个插件，需要在`pom.xml`中声明它，如下：

```xml
<project>
    ...
	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-shade-plugin</artifactId>
                <version>3.2.1</version>
				<executions>
					<execution>
						<phase>package</phase>
						<goals>
							<goal>shade</goal>
						</goals>
						<configuration>
                            ...
						</configuration>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>
</project>
```

自定义插件往往需要一些配置，例如，`maven-shade-plugin`需要指定 Java 程序的入口，它的配置是：

```xml
<configuration>
    <transformers>
        <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
            <mainClass>com.itranswarp.learnjava.Main</mainClass>
        </transformer>
    </transformers>
</configuration>
```

**注意，Maven 自带的标准插件例如`compiler`是无需声明的，只有引入其它的插件才需要声明。**

下面列举了一些常用的插件：

- maven-shade-plugin：打包所有依赖包并生成可执行jar；
- cobertura-maven-plugin：生成单元测试覆盖率报告；
- findbugs-maven-plugin：对Java源码进行静态分析以找出潜在问题。



# 4. 使用 mvnw

`mvnw`是 Maven Wrapper 的缩写。

因为我们安装 Maven 时，默认情况下，系统所有项目都会使用全局安装的这个 Maven 版本。

但是，对于某些项目来说，它可能必须使用某个特定的 Maven 版本，这个时候，就可以使用 Maven Wrapper，它可以负责给这个特定的项目安装指定版本的 Maven，而其他项目不受影响。

简单地说，Maven Wrapper 就是给一个项目提供一个独立的，指定版本的 Maven 给它使用。

这有点类似于 Python 的虚拟环境

## 4.1 安装 Maven Wrapper

安装Maven Wrapper最简单的方式是在项目的根目录（即`pom.xml`所在的目录）下运行安装命令：

```
mvn -N io.takari:maven:0.7.6:wrapper
```

它会自动使用最新版本的Maven。注意`0.7.6`是Maven Wrapper的版本。最新的Maven Wrapper版本可以去[官方网站](https://github.com/takari/maven-wrapper)查看。

如果要指定使用的Maven版本，使用下面的安装命令指定版本，例如`3.3.3`：

```
mvn -N io.takari:maven:0.7.6:wrapper -Dmaven=3.3.3
```

安装后，查看项目结构：

```ascii
my-project
├── .mvn
│   └── wrapper
│       ├── MavenWrapperDownloader.java
│       ├── maven-wrapper.jar
│       └── maven-wrapper.properties
├── mvnw
├── mvnw.cmd
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   └── resources
    └── test
        ├── java
        └── resources
```

发现多了`mvnw`、`mvnw.cmd`和`.mvn`目录，我们只需要把`mvn`命令改成`mvnw`就可以使用跟项目关联的Maven。例如：

```
mvnw clean package
```

在Linux或macOS下运行时需要加上`./`：

```
./mvnw clean package
```

Maven Wrapper 的另一个作用是把项目的`mvnw`、`mvnw.cmd`和`.mvn`提交到版本库中，可以使所有开发人员使用统一的Maven版本。



# 5. 发布 Artifact

当我们使用`commons-logging`这些第三方开源库的时候，我们实际上是通过 Maven 自动下载它的 jar包，并根据其`pom.xml`解析依赖，自动把相关依赖包都下载后加入到 classpath。

那么问题来了：当我们自己写了一个牛逼的开源库时，非常希望别人也能使用，总不能直接放个 jar 包的链接让别人下载吧？

如果我们把自己的开源库放到Maven的repo中，那么，别人只需按标准引用`groupId:artifactId:version`，即可自动下载 jar 包以及相关依赖。

因此，本节我们介绍如何发布一个库到Maven的repo中。

把自己的库发布到 Maven 的 repo 中有好几种方法，我们介绍3种最常用的方法。

## 5.1 以静态文件发布

如果我们观察一个中央仓库的Artifact结构，例如[Commons Math](https://commons.apache.org/proper/commons-math/)，它的groupId是`org.apache.commons`，artifactId 是`commons-math3`，以版本`3.6.1`为例，发布在中央仓库的文件夹路径就是https://repo1.maven.org/maven2/org/apache/commons/commons-math3/3.6.1/，在此文件夹下，`commons-math3-3.6.1.jar`就是发布的jar包，`commons-math3-3.6.1.pom`就是它的`pom.xml`描述文件，`commons-math3-3.6.1-sources.jar`是源代码，`commons-math3-3.6.1-javadoc.jar`是文档。其它以`.asc`、`.md5`、`.sha1`结尾的文件分别是 GPG 签名、MD5 摘要和SHA-1 摘要。

我们只要按照这种目录结构组织文件，它就是一个有效的 Maven 仓库。

我们以广受好评的开源项目 [how-to-become-rich](https://github.com/michaelliao/how-to-become-rich) 为例，先创建 Maven 工程目录结构如下：

```ascii
how-to-become-rich
├── maven-repo        <-- Maven本地文件仓库
├── pom.xml           <-- 项目文件
├── src
│   ├── main
│   │   ├── java      <-- 源码目录
│   │   └── resources <-- 资源目录
│   └── test
│       ├── java      <-- 测试源码目录
│       └── resources <-- 测试资源目录
└── target            <-- 编译输出目录
```

在`pom.xml`中添加如下内容：

```xml
<project ...>
    ...
    <distributionManagement>
        <repository>
            <id>local-repo-release</id>
            <name>GitHub Release</name>
            <url>file://${project.basedir}/maven-repo</url>
        </repository>
    </distributionManagement>

    <build>
        <plugins>
            <plugin>
                <artifactId>maven-source-plugin</artifactId>
                <executions>
                    <execution>
                        <id>attach-sources</id>
                        <phase>package</phase>
                        <goals>
                            <goal>jar-no-fork</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <artifactId>maven-javadoc-plugin</artifactId>
                <executions>
                    <execution>
                        <id>attach-javadocs</id>
                        <phase>package</phase>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

注意到`<distributionManagement>`，它指示了发布的软件包的位置，这里的`<url>`是项目根目录下的`maven-repo`目录，在`<build>`中定义的两个插件`maven-source-plugin`和`maven-javadoc-plugin`分别用来创建源码和 javadoc，如果不想发布源码，可以把对应的插件去掉。

我们直接在项目根目录下运行Maven命令`mvn clean package deploy`，如果一切顺利，我们就可以在`maven-repo`目录下找到部署后的所有文件如下：

```ascii
maven-repo
└── com
    └── itranswarp
        └── rich
            └── how-to-become-rich
                ├── 1.0.0
                │   ├── how-to-become-rich-1.0.0-javadoc.jar
                │   ├── how-to-become-rich-1.0.0-javadoc.jar.md5
                │   ├── how-to-become-rich-1.0.0-javadoc.jar.sha1
                │   ├── how-to-become-rich-1.0.0-sources.jar
                │   ├── how-to-become-rich-1.0.0-sources.jar.md5
                │   ├── how-to-become-rich-1.0.0-sources.jar.sha1
                │   ├── how-to-become-rich-1.0.0.jar
                │   ├── how-to-become-rich-1.0.0.jar.md5
                │   ├── how-to-become-rich-1.0.0.jar.sha1
                │   ├── how-to-become-rich-1.0.0.pom
                │   ├── how-to-become-rich-1.0.0.pom.md5
                │   └── how-to-become-rich-1.0.0.pom.sha1
                ├── maven-metadata.xml
                ├── maven-metadata.xml.md5
                └── maven-metadata.xml.sha1
```

最后一步，是把这个工程推到 GitHub上，并选择`Settings`-`GitHub Pages`，选择`master branch`启用Pages服务：

![enable-github-pages](https://www.liaoxuefeng.com/files/attachments/1347989708734529/l)

这样，把全部内容推送至 GitHub 后，即可作为静态网站访问 Maven 的 repo，它的地址是https://michaelliao.github.io/how-to-become-rich/maven-repo/。版本`1.0.0`对应的jar包地址是：

```
https://michaelliao.github.io/how-to-become-rich/maven-repo/com/itranswarp/rich/how-to-become-rich/1.0.0/how-to-become-rich-1.0.0.jar
```

现在，如果其他人希望引用这个Maven包，我们可以告知如下依赖即可：

```
<dependency>
    <groupId>com.itranswarp.rich</groupId>
    <artifactId>how-to-become-rich</artifactId>
    <version>1.0.0</version>
</dependency>
```

但是，除了正常导入依赖外，对方还需要再添加一个`<repository>`的声明，即使用方完整的`pom.xml`如下：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>example</groupId>
    <artifactId>how-to-become-rich-usage</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <java.version>11</java.version>
    </properties>

    <repositories>
        <repository>
            <id>github-rich-repo</id>
            <name>The Maven Repository on Github</name>
            <url>https://michaelliao.github.io/how-to-become-rich/maven-repo/</url>
        </repository>
    </repositories>

    <dependencies>
        <dependency>
            <groupId>com.itranswarp.rich</groupId>
            <artifactId>how-to-become-rich</artifactId>
            <version>1.0.0</version>
        </dependency>
    </dependencies>
</project>
```

在`<repository>`中，我们必须声明发布的Maven的repo地址，其中`<id>`和`<name>`可以任意填写，`<url>`填入GitHub Pages提供的地址+`/maven-repo/`后缀。现在，即可正常引用这个库并编写代码如下：

```java
Millionaire millionaire = new Millionaire();
System.out.println(millionaire.howToBecomeRich());
```

有的童鞋会问，为什么使用`commons-logging`等第三方库时，并不需要声明repo地址？这是因为这些库都是发布到Maven中央仓库的，发布到中央仓库后，不需要告诉Maven仓库地址，因为它知道中央仓库的地址默认是 https://repo1.maven.org/maven2/，也可以通过`~/.m2/settings.xml`指定一个代理仓库地址以替代中央仓库来提高速度（参考[依赖管理](https://www.liaoxuefeng.com/wiki/1252599548343744/1309301178105890)的Maven镜像）。

因为 GitHub Pages 并不会把我们发布的 Maven 包同步到中央仓库，所以自然使用方必须手动添加一个我们提供的仓库地址。

此外，通过 GitHub Pages 发布 Maven repo 时需要注意一点，即不要改动已发布的版本。因为Maven的仓库是不允许修改任何版本的，对一个库进行修改的唯一方法是发布一个新版本。但是通过静态文件的方式发布 repo，实际上我们是可以修改 jar 文件的，但最好遵守规范，不要修改已发布版本。

## 5.2 通过 Nexus 发布到中央仓库

有的童鞋会问，能不能把自己的开源库发布到 Maven 的中央仓库，这样用户就不需要声明 repo 地址，可以直接引用，显得更专业。

当然可以，但我们不能直接发布到Maven中央仓库，而是通过曲线救国的方式，发布到[central.sonatype.org](https://central.sonatype.org/)，它会定期自动同步到 Maven 的中央仓库。[Nexus](https://www.sonatype.com/nexus-repository-oss) 是一个支持 Maven 仓库的软件，由 Sonatype 开发，有免费版和专业版两个版本，很多大公司内部都使用 Nexus 作为自己的私有Maven仓库，而这个 [central.sonatype.org](https://central.sonatype.org/) 相当于面向开源的一个Nexus公共服务。

所以，第一步是在 [central.sonatype.org](https://central.sonatype.org/) 上注册一个账号，注册链接非常隐蔽，可以自己先找找，找半小时没找到点 [这里](javascript:showSonatypeSignUpLink()) 查看攻略。

如果注册顺利并审核通过，会得到一个登录账号，然后，通过[这个页面](https://central.sonatype.org/pages/apache-maven.html)一步一步操作就可以成功地将自己的 Artifact 发布到 Nexus 上，再耐心等待几个小时后，你的 Artifact 就会出现在Maven的中央仓库中。

这里简单提一下发布重点与难点：

- 必须正确创建 GPG 签名，Linux 和 Mac 下推荐使用 gnupg2；
- 必须在`~/.m2/settings.xml`中配置好登录用户名和口令，以及 GPG 口令：

```
<settings ...>
    ...
    <servers>
        <server>
            <id>ossrh</id>
            <username>OSSRH-USERNAME</username>
            <password>OSSRH-PASSWORD</password>
        </server>
    </servers>
    <profiles>
        <profile>
            <id>ossrh</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <gpg.executable>gpg2</gpg.executable>
                <gpg.passphrase>GPG-PASSWORD</gpg.passphrase>
            </properties>
        </profile>
    </profiles>
</settings>
```

在待发布的 Artifact 的`pom.xml`中添加 OSS 的 Maven repo 地址，以及`maven-jar-plugin`、`maven-source-plugin`、`maven-javadoc-plugin`、`maven-gpg-plugin`、`nexus-staging-maven-plugin`：

```xml
<project ...>
    ...
    <distributionManagement>
        <snapshotRepository>
            <id>ossrh</id>
            <url>https://oss.sonatype.org/content/repositories/snapshots</url>
        </snapshotRepository>

        <repository>
            <id>ossrh</id>
            <name>Nexus Release Repository</name>
            <url>http://oss.sonatype.org/service/local/staging/deploy/maven2/</url>
        </repository>
    </distributionManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <executions>
                    <execution>
                        <goals>
                            <goal>jar</goal>
                            <goal>test-jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-source-plugin</artifactId>
                <executions>
                    <execution>
                        <id>attach-sources</id>
                        <goals>
                            <goal>jar-no-fork</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-javadoc-plugin</artifactId>
                <executions>
                    <execution>
                        <id>attach-javadocs</id>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                        <configuration>
                            <additionalOption>
                                <additionalOption>-Xdoclint:none</additionalOption>
                            </additionalOption>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-gpg-plugin</artifactId>
                <executions>
                    <execution>
                        <id>sign-artifacts</id>
                        <phase>verify</phase>
                        <goals>
                            <goal>sign</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.sonatype.plugins</groupId>
                <artifactId>nexus-staging-maven-plugin</artifactId>
                <version>1.6.3</version>
                <extensions>true</extensions>
                <configuration>
                    <serverId>ossrh</serverId>
                    <nexusUrl>https://oss.sonatype.org/</nexusUrl>
                    <autoReleaseAfterClose>true</autoReleaseAfterClose>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

最后执行命令`mvn clean package deploy`即可发布至 [central.sonatype.org](https://central.sonatype.org/)。

此方法前期需要复杂的申请账号和项目的流程，后期需要安装调试GPG，但只要跑通流程，后续发布都只需要一行命令。

## 5.3 发布到私有仓库

通过`nexus-staging-maven-plugin`除了可以发布到 [central.sonatype.org](https://central.sonatype.org/) 外，也可以发布到私有仓库，例如，公司内部自己搭建的Nexus服务器。

如果没有私有 Nexus 服务器，还可以发布到 [GitHub Packages](https://github.com/features/packages)。GitHub Packages是 GitHub 提供的仓库服务，支持 Maven、NPM、Docker 等。使用 GitHub Packages 时，无论是发布Artifact，还是引用已发布的 Artifact，都需要明确的授权 Token，因此，GitHub Packages 只能作为私有仓库使用。

在发布前，我们必须首先登录后在用户的`Settings`-`Developer settings`-`Personal access tokens`中创建两个Token，一个用于发布，一个用于使用。发布Artifact的Token必须有`repo`、`write:packages`和`read:packages`权限：

![token-scopes](https://www.liaoxuefeng.com/files/attachments/1347999282233410/l)

使用 Artifact 的Token只需要`read:packages`权限。

在发布端，把 GitHub 的用户名和发布Token写入`~/.m2/settings.xml`配置中：

```xml
<settings ...>
    ...
    <servers>
        <server>
            <id>github-release</id>
            <username>GITHUB-USERNAME</username>
            <password>f052...c21f</password>
        </server>
    </servers>
</settings>
```

然后，在需要发布的 Artifact 的`pom.xml`中，添加一个`<repository>`声明：

```xml
<project ...>
    ...
    <distributionManagement>
        <repository>
            <id>github-release</id>
            <name>GitHub Release</name>
            <url>https://maven.pkg.github.com/michaelliao/complex</url>
        </repository>
    </distributionManagement>
</project>
```

注意到`<id>`和`~/.m2/settings.xml`配置中的`<id>`要保持一致，因为发布时Maven根据id找到用于登录的用户名和Token，才能成功上传文件到GitHub。我们直接通过命令`mvn clean package deploy`部署，成功后，在GitHub用户页面可以看到该Artifact：

![github-packages](https://www.liaoxuefeng.com/files/attachments/1348000710393922/l)

完整的配置请参考 [complex](https://github.com/michaelliao/complex/) 项目，这是一个非常简单的支持复数运算的库。

使用该Artifact时，因为GitHub的Package只能作为私有仓库使用，所以除了在使用方的`pom.xml`中声明`<repository>`外：

```xml
<project ...>
    ...
    <repositories>
        <repository>
            <id>github-release</id>
            <name>GitHub Release</name>
            <url>https://maven.pkg.github.com/michaelliao/complex</url>
        </repository>
    </repositories>

    <dependencies>
        <dependency>
            <groupId>com.itranswarp</groupId>
            <artifactId>complex</artifactId>
            <version>1.0.0</version>
        </dependency>
    </dependencies>
    ...
</project>
```

还需要把有读权限的Token配置到`~/.m2/settings.xml`文件中。
