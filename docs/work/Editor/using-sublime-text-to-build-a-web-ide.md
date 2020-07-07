---
display: 'home'
image: '/images/editor/sublime_text.jpg'
lang: zh-CN
title: 使用Sublime Text打造Web集成开发环境
descripton:
date: 2015-05-06
tags:
  - 编辑器
  - Sublime
categories:
  - 编辑器
  - 原创
---

俗话说：“工欲善其事，必先利其器”，俗话还说了：“砍柴不误磨刀工”，当今又说了：“生
产力中最活跃的因素是生产工具” 可见工具是有多么的重要，因此为自己打造一款顺手的开
发工具是很有必要的。我们都知道 sublime 是非常棒的编辑器，插件非常的丰富，今天我
就介绍几个 sublime 插件来打造一个 web 集成开发环境。

近几年 web 前端开发非常活跃，前端技术也基本不再依赖后端的模板引擎了，比如
jsp/asp/php 等后端语言模板引擎。web 前端也开始从蛮荒时代走向了工程化的时代。以前
来看前端就是“性功能障碍（这词是某个前端行业老总说的）”，确实如此，性能低，工具差
，能力有限（调用硬件底层 api 不行）。如今随着 HTML5/CSS3/ES6 及其相关技术的发展
，web 这些问题基本都得到了解决。

今天我们就来谈谈工具，你看 java 有 Eclipse，.net 有宇宙级 IDE——VS，oc 和 swift
有 Xcode，都是强有力的开发工具。再看看我们前端，基本开发都是编辑器了比如
Vim/Emacs/Notepad++/Dreamweaver/Atom/Sublime Text/WebStorm/VS Code 以及记事本等
等。放在以前这些编辑器都是能应对 web 项目的，可是现在的 web 项目越来越庞大越来越
复杂，单纯使用编辑器已经无法应对了，我们需要不断强化编辑器，Atom/Sublime Text 和
VS Code 都支持丰富的插件，尤其是 Sublime Text 编辑器的插件相当丰富，Sublime Text
还是跨平台的，你可以在你喜欢的系统上使用它，Sublime Text 是我目前最喜欢的编辑器
没有之一。

## 下载 Sublime Text

首先我们得安装一个 Sublime Text 编辑器（如果你没有安装的话），Sublime Text 是一
个商业的编辑器也就是需要收费的，但是你可以长期免费试用。

我们打开[Sublime Text 官网](http://www.sublimetext.com/)就可以一个非常明显的下载
按钮，现在默认下载 Sublime Text 3，点击下载按钮下载即可，如果你想下载 Sublime
Text 2，可以[点击这里](http://www.sublimetext.com/2)，建议使用最新版本的 Sublime
Text。

## 给 Sublime Text 安装包管理器

安装完毕后，我们需要给 sublime 安装包管理，包管理就是管理 sublime 插件的，比如安
装插件、卸载插件和禁用插件等功能。

首先我们打开 sublime 的控制台，你可以在菜单中依次点击`View > Show Console`或者快
捷键`ctrl+(这个就是数字1左边那个键)`，然后复制下面相对应版本的代码到光标处粘贴并
且回车即可，安装完毕后你可以在菜单中依次点击`Preferences > Package Control`或者
快捷键`ctrl(cmd)+shift+p`输入`cip`看看有没有`Package Control: Install Package`,
如果有那说明安装成功了，如果没有你可以重启 sublime 再次查看，重启后还没有那可能
安装失败，请按照步骤再次安装。

### Sublime Text2 包管理器

```
import urllib2,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')
```

### Sublime Text3 包管理

```
import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

包管理器官方网站安装说明，请点击[这里](https://packagecontrol.io/installation)。

### 包管理器常用命令

1. `Package Control：Install Package` 安装包
1. `Package Control：Remove Package` 移除包
1. `Package Control：Upgrade Package` 升级包
1. `Package Control：Disabled Package` 禁用包
1. `Package Control：Enable Package` 使用包
1. `Package Control：List Packages` 列出所有包

## 安装 Nodejs

现在前端很多项目都需要 Nodejs 或者 npm 来做一些处理，建议大家都安装一下 Nodejs，
首先去[Nodejs 官网](https://nodejs.org/)下载安装最新版的 Nodejs，最新版的 Nodejs
已经自带了 npm。

npm 是 Nodejs 的包管理器，你可以把它看做和刚才 sublime 里的包管理一样的都是下载
工具，有了 npm 我们就可以方便的下载项目中需要的包。npm 同样也有安装包、卸载包和
查看过时包等等功能。

### 修改 npm 的 register

由于我们在中国是吧你们都懂的，因此我们得用淘宝的 npm 镜像，你可以打
开[淘宝 NPM 镜像官网](http://npm.taobao.org/)看看，我们使用下面命令来修改 npm 的
config 中的 registry:

```shell
npm config set registry https://registry.npm.taobao.org
```

设置完毕可以使用这行命令来检测一下

```shell
npm info underscore
```

如果配置正确会输出字符串。

### npm 常用命令

1. `npm -v` 查看 npm 版本
1. `npm help` 查看帮助
1. `npm init` 引导创建 package.json 文件。
1. `npm install` 安装 package.json 文件已保存的包
1. `npm install <包名称>` 在本地安装包
1. `npm install <包名称> -g` 在全局安装包
1. `npm install <包名称> --save` 安装的同时将信息写入 package.json 文件中的
   dependencies
1. `npm install <包名称> --save-dev` 安装的同时将信息写入 package.json 文件的
   devDependencies
1. `npm uninstall <包名称>` 卸载本地包
1. `npm uninstall <包名称> -g` 卸载全局包
1. `npm uninstall <包名称> -save` 卸载的同时将信息从 package.json 文件中的
   dependencies 移除
1. `npm uninstall <包名称> -save-dev` 卸载的同时将信息从 package.json 文件中的
   devDependencies 移除
1. `npm list` 查看本地所有包
1. `npm list -g` 查看全局所有包
1. `npm root` 查看本地包安装路径
1. `npm root -g` 查看全局包安装路径
1. `npm outdated` 查看本地过期包
1. `npm outdated -g` 查看全局过期包
1. `npm update` 升级本地所有过期包
1. `npm update -g` 升级全局所有过期包
1. `npm update <包名称>` 升级本地包
1. `npm update <包名称> -g` 升级全局包

说明：`-g`代表`global`全局，有时候你也可能看到这样的命令`npm i <包名称>`，其
中`i`代表`install`安装。

安装好了 npm 前端开发就如虎添翼，想要什么就来什么，建议多学习一些 npm 的命令。

## npm 插件

npm 安装后以后，我们需要在项目中安装依赖或者安装 gulp 插件都需要切换到命令行（终
端）中去执行相关命令，很是不舒服，如果能在 sublime 中完成就好了，这个早就有前辈
想到了。

sublime 有 npm 插件，我们使用 sublime 包管理很容易就安装成功 npm 插件，安装完成
后就可以在 sublime 的命令中看到 npm，这样我们在 sublime 中就可以使用 npm 的操作
命令，但是 npm 执行的某些操作会导致 sublime 崩溃掉，因此我个人不太建议使用 npm
插件。

安装步骤：`ctrl(cmd)+shift+p`，然后输入`npm`，选中`npm`回车即可安装。

## gulp 插件

现在很多 web 项目都是用了 gulp 来构建，一般我们可能都是在命令行（终端）工具中去
执行 gulp 命令，我觉得这是很麻烦的一件事情，因此我想在 sublime 中集成 gulp 的一
些，我们使用 sublime 的包管理器去搜索 gulp 关键字发现有 gulp 插件，选中安装即可
。

安装完成后，你就可以使用 gulp 的一些命令操作了，我们先来看一下 sublime gulp 插件
的[github 说明文档](https://github.com/NicoSantangelo/sublime-gulp)，文档已经很
详细的介绍了 gulp 插件的用法。有了 gulp 插件我们就不需要再切换到命令行（终端）中
执行 gulp 任务了，简单方便。

常用的操作命令：

1. `Run Default Task` 执行默认的 gulp 任务。
1. `Run Arbitrary Task` 执行指定的 gulp 任务。
1. `List Tasks to Run` 列出所有的 gulp 任务选择其中一个去执行。
1. `Delete Cache` 删除 gulp 缓存。
1. `Kill All Gulp Tasks` 终止所有的任务。
1. `List Gulp Plugins` 列出 gulp 插件

说明：

- 如果你的项目中只有一个 gulpfile.js 可以直接在 sublime 命令中使用
- 如果你的项目中有多个 gulpfile.js 可以在 gulpfile.js 文件右击执行任务

安装步骤：`ctrl(cmd)+shift+p`，然后输入`gulp`，选中`gulp`回车即可安装。

## svn 插件

项目开发基本都会用到版本管理工具，而我用到最多的就是 svn，在 windows 上有非常棒
的小乌龟 svn 客户端，但是 mac 上就没有这么棒的客户端了，相对而言我更喜欢在 mac
上使用 svn 的命令来执行版本的操作。无论是在小乌龟的客户端操作还是在命令行（终端
）中使用命令操作都需要切换，我个人很喜欢在一个环境中去完成这些操作，不想一会儿调
到文件夹中一会儿调到命令行（终端）中，一会儿又调回编辑器，很凌乱容易造成一些非技
术的问题浪费时间，因此我在 sublime 中装了 svn 插件。

同样我们使用包管理器安装 svn 插件，安装完毕后，就可以在 sublime 中使用 svn 操作
了，相当简单，如果你只是用到了更新、提交、查看日志等基础操作都是没有任何问题。如
果用到了分支合并等一些高级的操作，这个插件也是可以轻松搞定的。此外有些要注意的情
况，比如第一次检出的时候大量的 IO 操作很容易卡死 sublime，建议涉及到大量 IO 操作
时使用客户端或者命令来执行，以防卡死 sublime。

常用的操作命令：

1. `svn update` 更新
1. `svn commit` 提交
1. `svn log` 查看日志
1. `svn info` 查看当前仓库信息
1. `svn status` 查看当前工作副本状态
1. `svn revert` 撤销更改

说明：

- 直接在 sublime 的命令中操作是操作整个项目
- 在文件夹（文件）右击选择 svn 操作是操作当前文件夹（文件）

安装步骤：`ctrl(cmd)+shift+p`，然后输入`svn`，选中`svn`回车即可安装。

## 总结

我们的项目中没有使用到 yeoman 和 bower，因此也并没有安装相关插件，如果你的项目使
用到了可以安装相应插件，更多插件可以访问 sublime
的[插件网站](https://packagecontrol.io/)。经过上面的一番折腾，sublime 就变成了一
个强有力的 web 开发环境，可以说是一个轻量级的 IDE 了，并且是跨平台的。安装需要的
包依赖 npm 插件可以轻松搞定，执行 gulp 任务 gulp 插件可以轻松搞定，版本管理 svn
插件同样轻松搞定，我们可以在一个稳定的环境中完成所有与项目相关的操作，不必跳来跳
去影响工作效率。

最后推荐一款主题[Seti_UI](https://packagecontrol.io/packages/Seti_UI),这个主题提
供很多文件图标，非常友爱。
