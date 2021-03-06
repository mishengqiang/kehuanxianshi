---
display: 'home'
image: '/images/apache/apache.png'
lang: zh-CN
title: Mac电脑Apache虚拟机配置
descripton: Mac OS X 10.10 Yosemite 及以上版本 Apache 虚拟机配置
date: 2016-12-06
tags:
  - Apache
  - Web服务器
categories:
  - 原创
---

mac 自带 Apache 服务器，使用起来非常方便，可是自从我把系统升级到了 OS10.10
Yosemite 后，我的网站就不能访问了，后来用了 nginx 服务器我就没有不管 Apache 了，
最近把系统升级到了 macOS sierra，由于微信项目开发又得用到了 Apache 服务器，然后
就在网上找了一下配置 Apache 虚拟机的方法。

## 简单了解 Apache 服务器

- 查看 Apache 的版本，打开终端，输入`sudo apachectl -v`
- 启动 Apache 服务器，在终端中，输入`sudo apachectl start`
- 验证 Apache 服务器，在浏览器地址栏输入`http://localhost`，可以看到一个写
  着`It works!`简单的页面（该页面位于目录`/Library/WebServer/Documents/`下），表
  示 Apache 服务器已经正常工作了。

Mac 中 Apache 的安装目录是`/etc/apache2/`，打开该目录的方式：

- 在 Finder 的菜单【前往】》【前往文件夹...】输入`/etc/apache2/`即可
- 在终端中输入`open /etc/apache2/`

## 配置虚拟主机

1. 打开 Apache 目录下的`httpd.conf`文件，在终端中运
   行`sudo vi /etc/apache2/httpd.conf`，或者使用编辑器打开。
1. 在`httpd.conf`文件找
   到`#Include /private/etc/apache2/extra/httpd-vhosts.conf`。
1. 在`httpd-vhosts.conf`文件中配置虚拟主机，在终端中运
   行`sudo vi /etc/apache2/extra/httpd-vhosts.conf`，或者使用编辑器打开。
1. 默认给了两个示例，这两个示例只作参考，我们使用`#`注释掉这两个示例，然后增加自
   己的虚拟主机，假设 Documents 文件下有个 helloworld 的 web 项目：

```text
helloworld/
    └─index.html
```

```xml
<VirtualHost *:80>
    DocumentRoot "/Users/你的用户名/Documents/helloworld"
    ServerName helloworld.com
    ErrorLog "/private/var/log/apache2/sites-error_log"
    CustomLog "/private/var/log/apache2/sites-access_log" common
    <Directory />
                Options Indexes FollowSymLinks MultiViews
                AllowOverride None
                Order deny,allow
                Allow from all
                Require all granted
      </Directory>
</VirtualHost>
```

1. 在终端中输入`sudo apachectl restart`重启 Apache 服务器。
2. 在 hosts 中加入虚拟主机，在终端中输入`sudo vi /etc/hosts`，打开 hosts 文件追
   加`127.0.0.1 helloworld.com`。
3. 完成上述步骤后，就可以在浏览器地址栏输入`http://helloworld.com/`访问你的站点
   了。
