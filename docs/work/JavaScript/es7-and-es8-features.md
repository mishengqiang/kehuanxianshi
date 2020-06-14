---
display: "none"
image: "/images/javascript/es7-and-es8.png"
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
2. 求幂运算符`**`

截至本文撰写时（2017 年 1 月），ES8 标准尚未最终确定，但我们可以假设所有已完成的提案（第 4 阶段）和第 3 阶段的大部分（更多关于阶段的详细内容在[这里](https://tc39.github.io/process-document)和我的[课程](https://node.university/p/es6)中）。已完成的 2017 年（ES8）提案是：

1. `Object.values`/`Object.entries`
2. 字符串填充
3. `Object.getOwnPropertyDescriptors`
4. 函数的参数允许尾随逗号
5. 异步函数

在这篇文章中，我不会介绍第 3 阶段的提案，但是你可以在[这里](https://github.com/tc39/proposals/blob/master/README.md)查看第 1 到第 3 阶段的提案情况。

让我们深入了解提案及特性。

## `Array.prototype.includes`

使用`Array.prototype.includes`可以使一切变得容易简单。它是`indexOf`方法的替代者，过去开发者使用`indexOf`方法检查数组中是否存在某个值。`indexOf`方法使用起来有点笨拙，因为它返回值所在数组的索引，或者在找不到该值的情况下返回`-1`，这么看来它返回一个数字值，而不是布尔值。开发者还需要进行额外的判断。在 ES6 中，要检查值是否存在，你必须像下面显示的代码一样，因为当匹配不到时，`Array.prototype.indexOf`返回-1，-1 是真值（转化为布尔值是 true），但是当匹配的值的索引为 0 时，数组中确实包含该值，但是 0 转化为布尔值是`false`：

```js
let arr = ["react", "angular", "vue"];

// WRONG
if (arr.indexOf("react")) {
  // 0 -> evaluates to false, definitely as we expected
  console.log("Can use React"); // this line would never be executed
}

// Correct
if (arr.indexOf("react") !== -1) {
  console.log("Can use React");
}
```

或者使用一个小技巧，按位求反运算符`〜`会使代码更简洁紧凑，因为对任何数字的`〜`（按位求反）等于`-（a +1）`：

```js
let arr = ["react", "angular", "vue"];

// Correct
if (~arr.indexOf("react")) {
  console.log("Can use React");
}
```

使用 ES7 的`includes`方法的代码：

```js
let arr = ["react", "angular", "vue"];

// Correct
if (arr.includes("react")) {
  console.log("Can use React");
}
```

开发者还可以在字符串中使用`includes`方法：

```js
let str = "React Quickly";

// Correct
if (str.toLowerCase().includes("react")) {
  // true
  console.log('Found "react"');
}
```

有趣的是，许多 JavaScript 库已经有了`includes`方法或类似的`contains`方法（[由于 MooTools 库的原因](https://esdiscuss.org/topic/having-a-non-enumerable-array-prototype-contains-may-not-be-web-compatible)，TC39 决定不使用 contains 这个名称）：

- jQuery 的：`$.inArray`
- Underscore.js：`_.contains`。
- Lodash：`_.includes`（在版本 3 和更低版本中，`_.contains`方法跟 Underscore 中的一样）
- CoffeeScript：`in`运算符（[示例](https://bit.ly/2jGxfaL)）
- Dart：`list.contains`（[示例](https://gist.github.com/anonymous/b8e39109e5705a9a0ff7281c1af97195)）

除了更加具有说服力和实际为开发者提供布尔值（而不是匹配位置）之外，`include`方法还可以和`NaN`一起使用。最后，`include`方法具有第二个可选参数`fromIndex`，这有利于优化代码，因为它允许从指定的位置开始查找匹配项。

更多示例：

```js
console.log([1, 2, 3].includes(2)); // === true)
console.log([1, 2, 3].includes(4)); // === false)

console.log([1, 2, NaN].includes(NaN)); // === true)

console.log([1, 2, -0].includes(+0)); // === true)
console.log([1, 2, +0].includes(-0)); // === true)

console.log(["a", "b", "c"].includes("a")); // === true)
console.log(["a", "b", "c"].includes("a", 1)); // === false)
```

总而言之，`include`方法几乎为所有开发者在需要检查值是否在数组/列表中时提供了便利……。让我们一起欢呼吧 ✌️！

## 求幂运算符`**`

这个运算符主要是为开发人员做一些数学运算，在 3D、虚拟现实、SVG 或数据可视化的情况下很有用。在 ES6 及之前的版本中，您必须创建一个循环，创建一个递归函数或使用 `Math.pow`。如果您忘了什么是指数，那就是当你把同一个数字（底数）乘以自身多次（指数）。例如，7 的 3 次幂是 `7 * 7 * 7`。

- _本文章翻译自[ES7 and ES8 Features](https://node.university/blog/498412/es7-es8)。_
- _本人英文水平有限，翻译不正确不通顺的地方，敬请指出。_
