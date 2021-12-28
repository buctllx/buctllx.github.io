---
title: ElasticSearch 操作异常总结
date: 2021-12-15 17:41:01
categories:
- ElasticSearch
tags:
- ElasticSearch
- ES
---

# 1. Index 写入数据 FORBIDDEN 问题

## 1.1 问题描述

在使用七牛云的 Logkit 往 ElasticSearch 发送数据的时候出现了以下异常信息；

```json
# SendError: bulk failed with last error
{
    "_index":"dev_cbim_tool_log",
    "_type":"cbim_tool_log",
    "_id":"UhoDvX0B7FSmwLI_OPym",
    "status":403,
    "error":{
        "type":"cluster_block_exception",
        "reason":"blocked by: [FORBIDDEN/12/index read-only / allow delete (api)];"
    }
}
# failDatas size : 33	
```

其核心异常提示是：[FORBIDDEN/12/index read-only / allow delete (api)]

<!--more-->

## 1.2 原因分析

从字面意思看，ES 禁止数据写入；

联想到最近服务器发生的一系列问题，一切都能解释的通了；

最近发现：ES 集群的一个节点挂了（主要是因为服务器的磁盘坏了）；

在这样的情况下，触发了 ES 的保护机制，因此出现了上面的情况；



## 1.3 解决方法

```shell
curl -XPUT -H "Content-Type: application/json" http://localhost:9200/_all/_settings -d '{"index.blocks.read_only_allow_delete": null}'
```

 参考链接：[如何修复 ElasticSearch [FORBIDDEN/12/index read-only / allow delete （api）\] – TechOverflow](https://techoverflow.net/2019/04/17/how-to-fix-elasticsearch-forbidden-12-index-read-only-allow-delete-api/)



# 2. ElasticSearch 启动参数问题

通过 docker 启动 es 的时候，相关参数设置跟 es 的镜像版本有关；

这里主要说明常见的各种 es 设置问题

## 2.1 unknown setting [discovery.seed_hosts] 

### 产生背景

使用2019年的老脚本启动 es 的 docker 实例；

注：笔者是 2021.12.15 pull 最新的 es 镜像启动实例的，启动实例使用的参数是 2019 年底时的；

### 原因

2019 年底的 es 镜像和 2021 年的镜像文件参数设置不一致，

可以通过 dock inspect elasticsearch 查看

### 解决方法

使用下面的配置替代

```yml
discovery.zen.ping.unicast.hosts: ["192.168.10.11:9300","192.168.10.12:9300","192.168.10.13:9300"]
```

<font color="red">注意：启动脚本，最好跟 docker 镜像配套使用</font>

### 类似的问题

unknown setting [cluster.initial_master_nodes] 



## 2.2 ES 缓存设置

默认设置：ES_JAVA_OPTS="-Xms256m -Xmx256m"

启动的时候可以加 -e 指定参数

```shell
-e ES_JAVA_OPTS="-Xms1g -Xmx1g"
```

设置过大可能导致本机缓存不够，启动时有如下错误提示：

> max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]

解决方法：修改 centos 系统的缓存设置

```shell
# 1. open and edit conf
vi /etc/sysctl.conf

# 2. add at last vm.max_map_count=262144

# 3. apply
/sbin/sysctl -p
```



# 3. ElasticSearch 集群状态排查

[Elasticsearch 集群故障排查及修复指南_铭毅天下（公众号同名）-CSDN博客](https://blog.csdn.net/laoyang360/article/details/109699085)



# 4. ES 索引 primary shard is unassigned 解决方法

```apl
POST /_cluster/reroute
{
  "commands" : [
  {
    "allocate_stale_primary" : {
    "index" : ".monitoring-kibana-6-2021.12.17", 
    "shard" : 0,
    "node" : "es-node-2",
    "accept_data_loss" : true
    }
  }
  ]
}
```

[ES 遇到 unassigned shard如何处理？_weixin_34050519的博客-CSDN博客](https://blog.csdn.net/weixin_34050519/article/details/85936609)

[解决elasticsearch分片unassigned的3个方法_dlm_bk的博客-CSDN博客_es分片unassigned](https://blog.csdn.net/dlm_bk/article/details/102840031)



