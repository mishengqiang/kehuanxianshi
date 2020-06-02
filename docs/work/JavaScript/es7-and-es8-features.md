---
display: 'none'
image: '/images/javascript/es7-and-es8.png'
lang: zh-CN
title: 【译】ES7和ES8新特性
descripton:
date: 2017-03-28
tags:
  - ES2016
  - ES2017
  - ES7
  - ES8
  - Async Functions
categories:
  - Javascript
  - 翻译
---

最近，我写了一篇[博客文章](https://webapplog.com/es6)，甚至还创建了一个关于 ES6 / ES2015 的[在线课程](https://node.university/p/es6)。你猜怎么着？TC39（强大的 JavaScript 监督者）正在向着 ES8 发展，因此让我们聊聊 ES7 和 ES8（或按官方正式叫法应该叫 ES2016 和 ES2017）。幸运的是，它们比 ES6 这个最佳标准的特性要少得多。这是真的！你看 ES7 只有两个新特性！

ES7 新增特性：

1. `Array.prototype.includes`
2. 求幂运算符

截至本文撰写时（2017 年 1 月），ES8 标准尚未最终确定，但我们可以假设所有已完成的提案（第 4 阶段）和第 3 阶段的大部分（更多关于阶段的内容在[这里](https://tc39.github.io/process-document)和我的[课程](https://node.university/p/es6)中）。已完成的 2017 年（ES8）提案是：

1. `Object.values`/`Object.entries`
2. 字符串填充
3. `Object.getOwnPropertyDescriptors`
4. 函数的参数允许尾随逗号
5. 异步函数

在这篇文章中，我不会介绍第3阶段的提案，但是你可以在[这里](https://github.com/tc39/proposals/blob/master/README.md)查看第1到第3阶段的提案情况。

让我们深入了解提案及特性。

## <a name=L-code-array.prototype.includes--code->`Array.prototype.includes`</a>

使用`Array.prototype.includes`可以使一切变得容易简单。它是`indexOf`方法的替代者，过去开发人员使用`indexOf`方法检查数组中是否存在某个元素。`indexOf`方法使用起来有点笨拙，因为它返回元素所在数组的索引值，或者在找不到该元素的情况下返回`-1`。因此它返回一个数字，而不是布尔值。开发人员还需要进行额外的判断。在ES6中，要检查元素是否存在，你必须像下面显示的代码一样进行一些跳舞，因为当匹配不到时，`Array.prototype.indexOf`返回-1，-1是真值（转化为布尔值是true），但是当匹配的元素的索引为0时，数组中确实包含该元素，但是0转化为布尔值是`false`：
```js
let arr = ['react', 'angular', 'vue']

// WRONG
if (arr.indexOf('react')) { // 0 -> evaluates to false, definitely as we expected
  console.log('Can use React') // this line would never be executed
}

// Correct
if (arr.indexOf('react') !== -1) {
  console.log('Can use React')
}
```


- _本文章翻译自[ES7 and ES8 Features](https://node.university/blog/498412/es7-es8)。_
- _本人英文水平有限，翻译不正确不通顺的地方，敬请指出。_
