---
image: '/images/javascript/You-Dont-Need-jQuery.jpeg'
lang: zh-CN
title: 【译】（从今以后）你可能不需要jQuery
descripton: 
date: 2017-11-06
tags:
    - jQuery
categories:
    - Javascript
    - 翻译
---

自从jQuery在2006年发布以来，DOM和原生浏览器API有了飞跃式的发展。自2013年以来，人们一直在写“***你可能不需要jQuery***”的文章（[经典网站](http://youmightnotneedjquery.com/)和[经典repo](https://github.com/oneuijs/You-Dont-Need-jQuery)）。我不想老调重弹，但是从最新的***你可能不需要jQuery***文章中，你可能会偶然发现，浏览器领域有一些好的改变。浏览器继续增加新的API，从而免于使用第三库开发带来的痛苦，其中许多API直接从jQuery复制。

## [从页面移除元素](#remove)
还记得使用原生DOM从页面上移除一个元素的令人抓狂地迂回方式吗？`el.parentNode.removeChild(el);`？这是jQuery方式和新的原生方式的对比。

jQuery：
```js
var $elem = $(".someClass") //选择元素 
$elem.remove(); //移除元素
```
非jQuery：
```js
var elem = document.querySelector(".someClass"); //选择元素
elem.remove() //移除元素
```

说明：
对于本文的其余部分，我们假设`$elem`是一组jQuery选择的元素集，elem是一个原生JavaScript选择的DOM元素。

## [内部前置元素](#prepend)
jQuery：
```js
$elem.prepend($someOtherElem);
```
非jQuery：
```js
elem.prepend(someOtherElem);
```

## [外部前置元素](#before)
jQuery：
```js
$elem.before($someOtherElem);
```
非jQuery：
```js
elem.before(someOtherElem);
```

## [替换元素](#replaceWith)
jQuery：
```js
$elem.replaceWith($someOtherElem);
```
非jQuery：
```js
elem.replaceWith(someOtherElem);
```

## [查找最近的指定祖先元素](#closest)
jQuery：
```js
$elem.closest("div");
```
非jQuery：
```js
elem.closest("div");
```

## [浏览器对DOM操作方法的支持](#supportdom)

这些方法现在具有良好的浏览器支持水平：

这个浏览器支持的数据来自[Caniuse](http://caniuse.com/#feat=dom-manip-convenience)，它具有更多的细节。数字表示浏览器从此版本及以上支持该功能。

### 桌面浏览器
| Chrome | Opeara | Firefox | IE  | Edge | Safari |
| ------ | ------ | ------- | --- | ---- | ------ |
| 54     | 41     | 49      | No  | No   | 10     |
### 手机、平板浏览器
| iOS Safari | Opeara Mobile | Opera Mini | Android | Android Chrome | Android Firefox |
| ---------- | ------------- | ---------- | ------- | -------------- | --------------- |
| 10-10.2    | No            | No         | 56      | 59             | 54              |

它们目前正在Edge中实现。

## [淡入元素](#fadein)
jQuery：
```js
$elem.fadeIn();
```

通过编写我们自己的CSS，我们可以对如何为元素动画化做更多的控制。在这里我会做一个简单的淡入。

```css
.thingy {
  display: none;
  opacity: 0;
  transition: .8s;
}
```

```js
elem.style.display = "block";
requestAnimationFrame(() => elem.style.opacity = 1);
```

## [仅调用一次事件处理回调函数](#once)
jQuery：
```js
$elem.one("click", someFunc);
```
在以前编写普通的JavaScript时，我们必须在回调函数内部调用removeEventListener。

```js
function dostuff() {
  alert("some stuff happened");
  this.removeEventListener("click", dostuff);
}
var button = document.querySelector("button");
button.addEventListener("click", dostuff);
```

现在事情要好很多。你可能已经看到第三个可选参数有时被传递到`addEventListener`中。它是是一个布尔值，用来判断事件捕获或事件冒泡。
然而，现在[第三个参数](https://developers.google.com/web/updates/2016/10/addeventlistener-once)可以替换为一个配置对象。

```js
elem.addEventListener('click', someFunc, { once: true, });
```

如果你仍然希望使用事件捕获以及仅调用一次回调，那么你也可以在配置对象中指定它：

```js
elem.addEventListener('click', myClickHandler, {
  once: true,
  capture: true
});
```

## [动画](#animation)
jQuery的`.animate()`方法是非常有限的。

```js
$elem.animate({
  width: "70%",
  opacity: 0.4,
  marginLeft: "0.6in",
  fontSize: "3em",
  borderWidth: "10px"
}, 1500);
```

文档中说“所有动画属性应该被动画化为单个数值，除非如下所述;大多数非数字属性不能使用基本的jQuery功能进行动画。”该规则排除了转换（transforms），你需要一个插件来使颜色动画化。使用新的[Web Animations API](https://css-tricks.com/css-animations-vs-web-animations-api/)你将会感觉好很多。

```js
var elem = document.querySelector('.animate-me');
elem.animate([
  { 
    transform: 'translateY(-1000px) scaleY(2.5) scaleX(.2)', 
    transformOrigin: '50% 0', 
    filter: 'blur(40px)', 
    opacity: 0 
  },
  { 
    transform: 'translateY(0) scaleY(1) scaleX(1)',
    transformOrigin: '50% 50%',
    filter: 'blur(0)',
    opacity: 1 
  }
], 1000);
```

## [Ajax](#ajax)
以前jQuery的另一个关键的卖点就是**Ajax**。 jQuery抽象出去了`XMLHttpRequest`的丑陋：

```js
$.ajax('https://some.url', {
  success: (data) => { /* do stuff with the data */ }
});
```

新的[fetch API](https://css-tricks.com/using-fetch/)是XMLHttpRequest的替代品，现在已被所有现代浏览器支持。

```js
fetch('https://some.url')
  .then(response => response.json())
  .then(data => {
    // do stuff with the data
  });
```

固然，fetch可能比这个小代码示例更复杂一点。例如，从`fetch()`返回的Promise将不会拒绝HTTP错误状态。但是，它比`XMLHttpRequest`之上建立的任何功能都更加[通用](https://blogs.windows.com/msedgedev/2016/05/24/fetch-and-xhr-limitations/#wyZ8BREdhyRMFKmi.97)。

如果我们想要易于使用，这里有一个更简单的已受到欢迎的选择 - 但它不是浏览器原生的，这使我进入...

## [微型库的兴起](#micro-library)
[Axios](https://github.com/mzabriskie/axios)是一个流行的Ajax库。
这是一个很好的微型库案例 - 一个库只​​做一件事。虽然大多数库不会像jQuery一样被测试，但它们通常可以成为jQuery庞然大物的替代品。

## [（几乎）所有问题都可以解决](#polyfill)

现在你已经知道DOM很好用了！但是你可能看过这些发展后还是想说：“哦, 仍然需要支持 IE 9, 所以我还是更好地使用 jQuery 吧”。大多数情况下，*Can I Use*对你想要使用的某个特性的说法并不重要。你可以使用任何你喜欢的特性，polyfills可以为低版本浏览器提供兼容支持。在相当长的一段时间里，如果你想使用一个牛逼的新浏览器特性，你必须找到一个polyfill，然后把它放置在你的页面上。对于IE9中缺少的所有功能，这将是一项艰巨的任务。现在就这么简单

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
```

这个简单的脚本标签可以使低版本浏览器支持所有的最新API。如果你还没有从英国《金融时报》获悉这polyfill服务，你可以到[polyfill.io](https://polyfill.io/v2/docs/)阅读。

## [2017年迭代NodeList](#iterating-a-nodelist)

jQuery的大量采用并不仅仅是因为它能消除浏览器之间的漏洞和IE的不一致性。今天jQuery还有一个卖点：**迭代**。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Iterable NodeLists are so fundamentally important to the quality of the DOM. Unsurprisingly I now use React for most of my coding instead.</p>&mdash; John Resig (@jeresig) <a href="https://twitter.com/jeresig/status/726058698989277185?ref_src=twsrc%5Etfw">April 29, 2016</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

NodeList不可迭代是不合理的。开发者不得不通过各种各样的方法使之可以迭代。经典的 for 循环可能是最好的性能优化方法, 但肯定不是我喜欢的那一种类型。因此让我们结束了这些丑陋的方法:

```js
var myArrayFromNodeList = [].slice.call(document.querySelectorAll('li'));
```

或者：

```js
[].forEach.call(myNodeList, function (item) {...}
```

最近，我们已经能够使用`Array.from`，更简单，更优雅地将nodeList转换为数组。

```js
Array.from(querySelectorAll('li')).forEach((li) => /* do something with li */);
```

但是最大的消息是，现在NodeLists[默认是可迭代的](https://developer.mozilla.org/en/docs/Web/API/NodeList)。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">It&#39;s about time we have iterable NodeLists! <a href="https://t.co/nIT5uHALpW">https://t.co/nIT5uHALpW</a> 🎉🎉🎉 Been asking for this for years! <a href="https://t.co/edb0TTSdop">https://t.co/edb0TTSdop</a></p>&mdash; John Resig (@jeresig) <a href="https://twitter.com/jeresig/status/726058042903633922?ref_src=twsrc%5Etfw">April 29, 2016</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

现在只需简单地输入：

```js
document.querySelectorAll('li').forEach((li) => /* do some stuff */);
```

Edge是最后一个不支持可迭代的NodeLists的现代浏览器，但目前[正在处理它](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/15898300-iterable-nodelists)。

## [jQuery慢吗？](#is-jquery-slow)

jQuery可能比草率写成的原生JS更快，但这只是更好地学习JavaScript的好理由！ Paul Irish是jQuery项目的贡献者，并得出结论：

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Performance recommendation: Do not use jQuery&#39;s hide() method. Ever. <a href="https://t.co/zEQf6F54p6">https://t.co/zEQf6F54p6</a> <br>Classes are your friend.</p>&mdash; Paul Irish (@paul_irish) <a href="https://twitter.com/paul_irish/status/564443848613847040?ref_src=twsrc%5Etfw">February 8, 2015</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


* *本文章翻译自[(Now More Than Ever) You Might Not Need jQuery](https://css-tricks.com/now-ever-might-not-need-jquery/)。*
* *本人英文水平有限，翻译不正确不通顺的地方，敬请指出。*
