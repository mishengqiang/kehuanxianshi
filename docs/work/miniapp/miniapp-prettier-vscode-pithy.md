---
display: 'home'
image: '/images/miniapp/prettier.png'
lang: zh-CN
title: （纯技术简洁版）小程序开发系列之 Prettier 格式化
descripton:
date: 2020-06-12
tags:
  - 格式化
  - Prettier
categories:
  - 原创
  - 小程序
---

<!-- # 小程序开发系列之 Prettier 格式化（纯技术简洁版） -->

## 目标

1. 共享格式化配置文件
2. 与 Git Hook 集成
3. 集成编辑器格式化

## Prettier 格式化

官方文档要点：

- [配置文件](https://prettier.io/docs/en/configuration.html)和[配置项](https://prettier.io/docs/en/options.html)
- [忽略代码与忽略文件](https://prettier.io/docs/en/ignore.html)
- [与 Git Hook 集成](https://prettier.io/docs/en/precommit.html)
- [与编辑器集成](https://prettier.io/docs/en/editors.html#visual-studio-code)

### 实现共享格式化配置文件

首先安装 Prettier 的依赖包：

```shell
npm install --save-dev --save-exact prettier

# 或者

yarn add prettier --dev --exact
```

在项目中创建`.prettierrc.js`配置文件，防止被其它格式化配置影响，我几乎将全部的配置项（即使值为默认值的）全都写到了配置文件中，具体如下：

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

在`package.json`中设置脚本命令，这样项目人员无论使用哪个编辑器，都可以通过在终端中运行命令`npm run prettier`进行格式化，配置如下：

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

1. 换行符设置为`lf`：windows 系统 git checkout 时会将换行符转换为`crlf`，处理方法[git 帮助文档](https://help.github.com/cn/github/using-git/configuring-git-to-handle-line-endings#per-repository-settings)和[Prettier 的 End of Line](https://prettier.io/docs/en/options.html#end-of-line)都给出了具体的做法：创建一个`.gitattributes`文件，然后添加`* text=auto eol=lf`内容即可。

2. 解析器：微信小程序自定义的文件格式 Prettier 无法识别，因此需要在重写配置里面指定解析器处理。

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

3. 忽略代码与忽略文件：

   - Prettier 对于 HTML 文件有三种忽略代码如下：

     ```html
     <!-- prettier-ignore -->
     <div         class="x"       >hello world</div            >

     <!-- prettier-ignore-attribute -->
     <div (mousedown)="       onStart    (    )         " (mouseup)="         onEnd      (    )         "></div>

     <!-- prettier-ignore-attribute (mouseup) -->
     <div (mousedown)="onStart()" (mouseup)="         onEnd      (    )         "></div>
     ```

     `.wxml`文件中的`<wxs>...</wxs>`脚本代码需要使用`<!-- prettier-ignore -->`忽略，否则会被格式化为一行，小程序开发者工具报错：

     ```html
     <view>
       <!-- ... -->
     </view>
     <!-- prettier-ignore -->
     <wxs>
       <!-- js代码 -->
     </wxs>
     ```

     `.wxml`文件中的有些元素属性太长会被格式化为多行，小程序开发者工具也会报错。比如`style`属性，使用`<!-- prettier-ignore-attribute style -->`即可。

     ```html
     <view>
       <!-- prettier-ignore-attribute style -->
       <view
         style="width: 500rpx;height: 80rpx;margin-bottom: 40rpx;background-color: #04be01;border-radius: 80rpx;color: #fff;"
       >
       </view>
     </view>
     ```

   - 对于项目中需要忽略的文件或文件夹，都可以放到`.prettierignore`文件中：

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

### 实现与 Git Hook 集成

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

### 实现与编辑器集成

在 VSCode 中安装官方的[Prettier 扩展程序](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)。

将`.wxss`文件关联为`.css`文件格式，将`.wxs`文件关联为`.js`文件格式，`.wxml`文件需要安装 minapp 扩展程序并设置格式化工具为 prettier 。 VSCode 工作区的配置：

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

经过以上配置小程序项目就可以在 VSCode 中完美格式化了。但是新的问题又来了，请看一下篇文章[小程序开发系列之迁移到 VSCode 开发]()。
