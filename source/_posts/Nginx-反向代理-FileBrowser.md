---
title: Nginx 反向代理 FileBrowser
date: 2022-03-23 18:47:42
categories:
- [工具, Nginx]
tags:
- Nginx
- FileBrowsern
---

本文主要说明如果使用 Nginx 方向代理已经启动的 FileBrowser 服务。

<!-- more -->

# 1. 准备工作

开始本文的主要内容前，默认已经做好了以下准备工作

1. 使用 linux 系统，比如 centos；
2. 已安装并启动 nginx 服务
3. 已安装并启动 filebrowser 服务



# 2. 有关 FileBrowser 的配置

如果不知道已经启动的 filebrowser 服务的相关配置，可以通过以下命令查看

```shell
# 1. 查看 filebrowser 服务的进程 (可以看到启动命令的相关参数，比如说配置文件，数据库文件等)
ps -ef |grep filebrowser
pstree -ap |grep filebrowser
```

![image-20220323190406153](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/image-20220323190406153.png)

```shell
# 2. 导出 filebrowser 的配置信息
cd /etc/filebrowser  # 首先进入包含 filebrowser 可执行文件的目录
filebrowser config cat # 临时查看
filebrowser config export config.json # 导出 filebrowser 配置信息到 config.json 文件

# 如果存在多个 db 可以通过 -d 参数导出指定数据库中存储的配置信息(其他命令也是如此，后面不在重复说明举例)
filebrowser -d /etc/filebrowser/filebrowser.db config export config.json

# 可能用到的其他命令
filebrowser users update admin -p admin # 更新 admin 用户的密码为 admin
filebrowser config set --port 18080  # 重新设置端口信息

```

以下 json 信息是我用到的配置

```json
{
    "port": 18080,
    "root":"/data/file",
    "database":"/etc/filebrowser/filebrowser.db",
    "log":"/etc/filebrowser/log.log",
    "plugin": "",
    "baseURL": "/files",
    "allowCommands": true,
    "allowEdit": true,
    "allowNew": true,
    "commands": [
        "ls",
        "df"
    ]
}
```

{% note info %}

需要注意的问题：

1. **baseURL** 配置项的值在后面 nginx 的配置中要使用到，一定要记录下来；如果没有设置，默认值是 files， 强烈建议设置一下；
2. 使用 vi 或者 vim 写 json 配置文件的时候一定要注意，缩进符号是 空格，而且不能和 tab 混合用；尤其是从网页上面复制 json 文本的时候一定要确保是空格（有些网页上的缩进是 tab，但是默认空白看不到）
3. 如果在 filebrowser 启动后通过 ui 设置了一些操作，或者添加了一些用户，那么通过上面的命名可能获取不到最新的配置信息，或者出现 timeout 的问题，这时候需要关闭 filebrowser 服务，然后通过 -d 参数执行 db 就可以了；

{% endnote %}



# 3. 在 Nginx 中配置 FileBrowser 服务

核心配置如下：

```nginx
server {
    listen       80;
    server_name  ai.cbim.com 10.80.253.133;
    access_log  /var/logs/nginx/filebrowser.access.log;

    # file browser url
    location ^~ /files/ {
        proxy_pass  http://127.0.0.1:18080/;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

新增或者修改完 nginx 的配置文件后，可以使用下面的命令测试 / 重新载入配置

```shell
# 测试 配置文件的语法是否正确
nginx -t

# 重新载入修改后的 配置文件
nginx -s reload
```

最后就可以通过设定的域名或者 IP 访问 filebrowser 了

![image-20220323195000831](https://cdn.jsdelivr.net/gh/buctllx/picture_bed/img/image-20220323195000831.png)



{% note info %}

需要注意的问题：

1. server_name 不要和 nginx/conf.d 中其他的配置文件中的 server_name 重复，否则可能被忽略；
2. **location** 后面的匹配项，一定要和 前面 filebrowser 配置文件中的 **baseURL** 配置项保持一致，否则无法代理成功；
3. **location** 的具体匹配规则视情况而定，我这里通过 ^~ 匹配以 files 开头的所有 api；^~ 如果删除，而又没有其他 location 匹配规则，同样会导致代理失败，无法访问 filebrowser
4. 最后访问的时候，如果是局域网域名，访问前最好关掉 vpn 或者其他一类的代理软件，否则也可能会访问失败；

{% endnote %}




# 4. 相关参考资料：

[nginx documentation](http://nginx.org/en/docs/)

[filebrowser/filebrowser: 📂 Web File Browser (github.com)](https://github.com/filebrowser/filebrowser)

[Welcome - File Browser](https://filebrowser.org/)

[file browser介绍 - shanyu20 - 博客园 (cnblogs.com)](https://www.cnblogs.com/shanyu20/p/15477202.html)

[timeout on commands that connect to a locked database · Issue #627 · filebrowser/filebrowser (github.com)](https://github.com/filebrowser/filebrowser/issues/627)

[Usable configuration for executing command behind NGINX. · Issue #549 · filebrowser/filebrowser (github.com)](https://github.com/filebrowser/filebrowser/issues/549)

