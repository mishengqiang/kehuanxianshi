---
display: 'home'
image: '/images/miniapp/prettier.png'
lang: zh-CN
title: 小程序开发系列之 Prettier 格式化
descripton:
date: 2020-06-11
tags:
  - 格式化
  - Prettier
categories:
  - 原创
  - 小程序
---

<!-- # 小程序开发系列之 Prettier 格式化 -->

这篇文章是对 Prettier 格式化整个事情的讲述可能比较啰嗦。你可以直接阅
读[纯技术简洁版](./miniapp-prettier-vscode-pithy.md)。

## 背景

今年因为疫情原因，很多公司都在裁员，但是我们公司操作就很秀了，年前就裁员了一大批
，然后今年复工后又开始招聘。刚开始复工前两个月因为疫情大家都不敢当面面试，因此也
没有招人。但是业务需要不能停啊，领导说今年我们要全力发展小程序，毕竟我们是做垂直
电商的。soga 领导说啥都是对的，这个项目目前就我一个人不用考虑太多，说干就干直接
使用微信小程序开发者工具搞起来。我自己一个人搞了两个月，第一阶段开发完了。

这时国内的疫情基本稳住了，大家都开始活跃起来，我就开始面试招人了，先后来了两个小
伙伴，第一个来的是一个年轻小伙儿 97 年的，过了一段时间又来了一位经验比较丰富的。
第一位来后我带着开发，对开发工具啊、Git 啊、格式化啊等也没什么要求，我们俩人各做
一块业务，也相安无事。第二位来了后，毕竟经验丰富，一来就问我有什么需要注意的点要
求等等，我回道哈哈哈（尴尬）没有太多要求，按需求开发就行。

几天过后问题就暴露出来了，比如各自用的系统不同换行符很乱、各自写法不同，各自编辑
器不同：我是小程序开发者工具，第一位是`PhpStorm`，第二位是`VSCode`，这就导致每个
人格式化后的代码是不一样的，每次`git pull`后看到成篇的更改，其实可能就只更改了一
个文字或加了一个分号。第二位经验丰富的就开始和我商量搞统一格式化，与此同时我也发
现了这个问题，并且已经有处理的想法了。我先询问了他有没有遇到过类似情况以及怎么处
理的，他告诉我：让大家都统一 VSCode 的配置文件，我想了想可行但不够好。然后我就把
我的想法和他的想法结合在一起搞。

## 想法

1. <div id="idea1">格式化配置要跟着项目走，这样无论是新来的还是现有的人员都可以共享同一个配置</div>
2. <div id="idea2">可以校验JavaScript和Style的规范，编写高质量的代码</div>
3. <div id="idea3">可以和Git相结合，比如使用git hook强制每一位人员提交的代码都是格式化后的</div>
4. <div id="idea4">编辑器可以自动或手动格式化，方便实时预览格式化后的代码。</div>

## 弯路

想法很美好，开始搞起来吧 😎。

因为做过 Vue 项目，因此对 ESLint、StyleLint、Prettier 也有所了解（注意仅仅是了解
），我心想这还不简单啊，npm 安装几个包配置一下就 ok 了。尼玛我错了 😭 我错了 😭
我错了 😭，我搞了一个星期才仅仅搞定 Prettier 格式化。其实这里面有三个事情要做：

1. ESLint：JS 规范校验
2. StyleLint：CSS 样式规范校验
3. Prettier：格式化代码

这三个事情每个单独拿出来在**已有的小程序项目**中处理都不是很容易：

1. ESLint：直接使用官方推荐的规范，基本得把项目中全部的 js 文件处理一遍，这个工
   作量太大了，最重要的是有些代码处理后可能出错，比如双等于`==`改为全等`===`得全
   部回归测试一遍，影响项目进度啊，这事儿暂缓了。
2. StyleLint：样式规范化相对 ESLint 来说要好很多，但是改动的文件也很多，很有可能
   影响到页面表现，因此这事儿也暂缓了。
3. Prettier：前面两个都暂缓了，这个不能暂缓了吧，不然这不白折腾吗，我咬咬牙狠狠
   心，仔细看官网文档和 Github 的 issue，终于在一个下午搞定了，详情请继续往下看
   。

做技术还是不能太浮躁，仅仅是了解就搞起来往往会掉坑里，对于新东西还是要静下心来，
认真阅读文档多次实践达到熟悉程度才能使用。

## Prettier 格式化

ESLint 和 StyleLint 都放弃了，Prettier 格式化不需要改动逻辑和样式，这可以直接搞
起来。我读了一下 Prettier 的[官网](https://prettier.io/)文档，有几个要点：

- [配置文件](https://prettier.io/docs/en/configuration.html)和[规则](https://prettier.io/docs/en/options.html)（
  能实现[第 1 个想法](#idea1)）
- [忽略代码与忽略文件](https://prettier.io/docs/en/ignore.html)
- [插件](https://prettier.io/docs/en/plugins.html)
- [与 Linter 集成](https://prettier.io/docs/en/integrating-with-linters.html)（
  能实现[第 2 个想法](#idea2)）
- [与 Git Hook 集成](https://prettier.io/docs/en/precommit.html)（能实
  现[第 3 个想法](#idea3)）
- [与编辑器集成](https://prettier.io/docs/en/editors.html#visual-studio-code)（
  能实现[第 4 个想法](#idea4)）

插件看了一下没有和小程序相关的，直接放弃。与 Linter 集成这一项可以先不用考虑。与
编辑器集成就是 VSCode 的扩展程序了，该扩展程序会优先读取项目中的 Prettier 配置文
件，因此基本也不需要设置，直接安装就行（此时我就是这么想的）。

### 实现[第 1 个想法](#idea1)

首先要安装 Prettier 的依赖包：

```shell
npm install --save-dev --save-exact prettier

# 或者

yarn add prettier --dev --exact
```

配置文件和规则以及忽略代码与忽略文件相结合可以完美处理代码格式化的问题。配置文件
可以有多种格式，原本想着将 Prettier 的配置写到`package.json`文件中，这样项目目录
会更简洁一些，但是 Prettier 的忽略文件不支持在`package.json`文件配置，因此就都写
到了单独的文件中，为了后续保持和 ESLint 及 StyleLint 配置文件的命名格式一致性，
就使用了`.prettierrc.js`格式。同时为了防止配置被覆盖（Prettier 扩展程序和下面提
到的 minapp 扩展程序都可以单独进行 Prettier 的配置），我把几乎全部的配置项（即使
值为默认值的）全都写到了配置文件中如下：

```javascript
module.exports = {
  // 换行的宽度，默认80
  printWidth: 120,
  // Tab字符的空格数量，默认值2
  tabWidth: 2,
  // 使用tab替代空格缩进，默认值false
  useTabs: false,
  // 语句结尾添加分号，默认值true
  semi: true,
  // 使用单引号替代双引号，默认值false
  singleQuote: true,
  // 对象的属性（键）是否需要引号包裹，默认值as-needed
  quoteProps: 'as-needed',
  // 多行时是否添加尾随逗号，默认值从2.0版本开始使用es5
  trailingComma: 'es5',
  // 对象字面量的括号之间是否需要空格，默认值true
  bracketSpacing: true,
  // 箭头函数单独的参数是否需要括号包裹，默认值从2.0版本开始使用always
  arrowParens: 'always',
  // HTML文件的空格敏感度，默认值css
  htmlWhitespaceSensitivity: 'css',
  // 换行符，默认值从2.0版本开始使用lf
  endOfLine: 'lf',
  // 重写配置
  overrides: [
    {
      files: '*.wxml',
      options: { parser: 'html' },
    },
    {
      files: '*.wxss',
      options: { parser: 'css' },
    },
    {
      files: '*.wxs',
      options: { parser: 'babel' },
    },
  ],
};
```

在`package.json`中设置脚本命令，这样项目人员即使不选择使用 VSCode 编辑器也可以在
终端中运行命令`npm run prettier`进行格式化，配置如下：

```json
{
  //
  // .......省略的配置........
  //
  "scripts": {
    "prettier": "prettier --write ./**/*.{js,wxs,wxml,wxss,json}"
  },
  "devDependencies": {
    "prettier": "^2.0.5"
  }
}
```

这里面有几个特殊的配置需要注意：

#### 换行符设置为`lf`

这在 macOS 和 liunx 系统都没有问题，因为现在 macOS 和 liunx 系统的换行符默认都
是`lf`，但是在 Windows 系统上就有问题。Windows 系统默认的换行符是`crlf`，git 为
了保持兼容性，在 windows 系统上的 git 默认在 git checkout 后会将文件的换行符自动
转换为`crlf`，当提交时又将换行符自动转换为`lf`（详情
看[这里](https://help.github.com/cn/github/using-git/configuring-git-to-handle-line-endings)）
。这看起来好像没什么问题，问题关键就在于 git checkout 时将换行符转换为`crlf`，这
与 Prettier 配置是冲突的，因此打开检出的文件后你将看到满屏的 Prettier 扩展程序错
误提示，显然这不是我们想要看到的结果。

我们需要更改 windows 系统上 git 的配置。我们不能更改全局的 git 配置，因为其它的
项目可能需要自动转换。更改本地的 git 配置作用不大，因为这样仅仅解决了自己的问题
，其他使用 windows 系统的项目人员依然存在这个问题。这个配置需要跟随项目设置，这
样就可以统一处理
。[git 帮助文档](https://help.github.com/cn/github/using-git/configuring-git-to-handle-line-endings#per-repository-settings)和[Prettier 的 End of Line](https://prettier.io/docs/en/options.html#end-of-line)都
给出了具体的做法：创建一个`.gitattributes`文件，然后添加`* text=auto eol=lf`内容
即可。这样 git checkout 后文件的换行符即使在 windows 系统上也是`lf`，不会和
Prettier 配置冲突了。

#### 解析器

Prettier 的解析可以根据文件格式自动选择，常见的`.html`、`.css`、`.js`和`.vue`等
文件格式都可以处理，或者使用第三方提供的插件也能解析。可惜微信小程序是个特殊的存
在，既没有相应的处理器也没有第三方的插件，这可难为我了。我在 Prettier 的 Github
Issues 上找了很久才找到相应
的[解决方法](https://github.com/wx-minapp/minapp-vscode/issues/50)，其实文档里面
都有说明只是我没有认真看。在重写配置里面可以根据文件格式指定已有的解析器或者自定
义解析器，比如：

```js
module.exports = {
  //
  // .......省略的配置........
  //
  // 重写配置
  overrides: [
    {
      files: '*.wxml',
      options: { parser: 'html' },
    },
    {
      files: '*.wxss',
      options: { parser: 'css' },
    },
    {
      files: '*.wxs',
      options: { parser: 'babel' },
    },
  ],
};
```

#### 忽略代码与忽略文件

现在小程序的`.wxml`文件中还可以使用`<wxs>`标签编写 js 脚本。因为我们使用的 html
解析器去解析的`.wxml`文件，这样就导致`<wxs>`标签中的 js 脚本被当作字符串来格式化
处理，格式化后会被压缩为一行，没有了换行符 js 就会解释错误，导致不能运行或运行错
误，这显然不是我们想要的结果。 Prettier 的解析器可
以[自定义](https://prettier.io/docs/en/api.html#custom-parser-api)，本想自己写一
个`.wxml`文件的解析器，结果搞了半天没搞出来放弃了。只能使用忽略代码解决，HTML 的
忽略代码有三种：

```html
<!-- prettier-ignore -->
<div         class="x"       >hello world</div            >

<!-- prettier-ignore-attribute -->
<div
  (mousedown)="       onStart    (    )         "
  (mouseup)="         onEnd      (    )         "
></div>

<!-- prettier-ignore-attribute (mouseup) -->
<div
  (mousedown)="onStart()"
  (mouseup)="         onEnd      (    )         "
></div>
```

在`.wxml`中有些元素的**属性值**太长也会换行处理
（[Prettier 2.0 对 html 的格式化](https://prettier.io/blog/2020/03/21/2.0.0.html#html)）
，比如`style`属性，这个属性值换行后小程序开发者工具会编译出错，因此也需要我们做
忽略处理。

对于小程序中一些文件或文件夹也要忽略，比如下载的第三方包阿拉丁统计相关的 js 文件
、`md5.js`、`crypto.js`、`.vscode`文件夹和`node_modules`文件等等，这些都可以放
到`.prettierignore`文件中忽略：

```shell
.vscode
node_modules
miniprogram_npm
utils/ald-*.js
utils/base64.js
utils/crypto.js
utils/md5.js
package-lock.json
package.json
project.config.json
sitemap.json
```

### 实现[第 3 个想法](#idea3)

Prettier 提供了多个与 Git Hook 集成的选择，第一个可以与 ESLint 和 StyleLint 一起
配合使用，因此我选择了第一个。

安装`lint-staged`和`husky`：

```shell
npm install -D lint-staged husky

# 或

npx mrm lint-staged
```

在`package.json`中配置：

```json
{
  //
  // .......省略的配置........
  //
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,wxs,wxml,wxss,json}": ["prettier --write", "git add"]
  },
  "devDependencies": {
    "husky": "^4.2.5",
    "lint-staged": "^10.2.9",
    "prettier": "^2.0.5"
  }
}
```

这样在 git commit 时就会预先进行格式化再 commit，保证代码仓库里面的代码都是格式
化后的。

### 实现[第 4 个想法](#idea4)

已经实现了两个想法，好开心好厉害 ✌，第三个想法先略过，让我康康第四个想法怎么搞
。哎呀这很简单吗，打开 VSCode，点击侧边栏扩展按钮，搜索关键字`prettier`，选择第
一个安装（一定要看清楚选择官方
的[Prettier 扩展程序](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)）
，打开`.json`文件右键格式化，漂亮！打开`.js`文件右键格式化，完美！打开`.wxss`文
件右键格式化，好像不太行啊。打开`.wxs`文件右键格式化，好像没反应耶。打
开`.wxml`文件右键格式化，没变化呐，小朋友你是否有很多问号？？？

先来处理`.wxss`文件。哦，原来关联为`.css`文件格式就可以了，右键格式化，哦耶！

照葫芦画瓢，把`.wxs`文件关联为`.js`文件格式就行了，右键格式化，可以！

一招吃遍天下，把`.wxml`文件关联为`.html`文件，这样 Prettier 就可以直接格式化，我
真是太聪明了。但是我发现这会导致 minapp 扩展程序为`.wxml`文件提供的很多功能失效
，具体详情我会在[另一篇文章]()讨论。经过我一番研究后，发现是因为 minapp 扩展程序
，安装 minapp 扩展程序后，minapp 会全面接管`.wxml`格式文件的各种操作（包括格式化
），minapp 扩展程序的作者大大已经为我们想到了，只需要设置格式化工具为 prettier
就行了。

现在`.json`、`.js`、`.wxss`、`.wxs`和`.wxml`格式的文件都可以在 VSCode 中格式化了
。但是在实际使用中仍发现了一些问题：

- 需要跟随项目设置文件的关联格式
- 需要跟随项目设置新建的文件换行符为`lf`
- 需要跟随项目设置默认的格式化工具为 Prettier
- 被 Prettier 忽略的代码在编辑器中超过 120 列需要自动换行
- 有些扩展程序会影响`.wxml`文件的默认格式化工具，需要特殊设置一下。

为了解决这些问题，需要配置 VSCode 的工作区：

```json
{
  "files.associations": {
    "*.wxml": "wxml",
    "*.wxss": "css",
    "*.wxs": "js"
  },
  "files.eol": "\n", // 文件换行符默认lf
  "editor.formatOnSave": true, // 保存文件自动格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 设置编辑默认的格式化工具为prettier
  "editor.wordWrap": "wordWrapColumn", // 设置编辑器根据设置的列宽换行，有利于prettier忽略的
  "editor.wordWrapColumn": 120, // 设置编辑器最大列为120
  "editor.rulers": [120], // 在编辑器中120列处显示标尺线
  "minapp-vscode.wxmlFormatter": "prettier", // 设置扩展程序minapp格式化使用prettier
  "minapp-vscode.formatMaxLineCharacters": 120,
  "[wxml]": {
    "editor.defaultFormatter": "qiu8310.minapp-vscode"
  }
}
```

## 结语

经过以上配置基本就可以在 VSCode 中完美格式化了。我还需要测试以下看看是否在每个环
境中都能完美格式化，让另外两个小伙伴拉取分支也都测试了一下，经过我们几轮的测试反
馈修改后，终于可以在 macOS 和 windows 系统上的 VSCode 编辑器中完美格式化了，再也
不用担心 git diff 时满屏的更改懵逼了。付出总有回报，感谢付出！

经过一番的折腾，终于搞定了代码格式化。新的问题又来了，请看一下篇文
章[小程序开发系列之迁移到 VSCode 开发]()。
