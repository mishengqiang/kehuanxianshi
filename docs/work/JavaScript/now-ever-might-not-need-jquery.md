---
display: home
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

自从 jQuery 在 2006 年发布以来，DOM 和原生浏览器 API 有了飞跃式的发展。自 2013
年以来，人们一直在写“**_你可能不需要 jQuery_**”的文章
（[经典网站](http://youmightnotneedjquery.com/)和[经典 repo](https://github.com/oneuijs/You-Dont-Need-jQuery)）
。我不想老调重弹，但是从最新的《你可能不需要 jQuery》文章中，你可能会偶然发现，
浏览器领域有一些好的改变。浏览器增加了新的 API，从而免于使用第三库开发带来的痛苦
，其中许多 API 直接从 jQuery 复制。

让我们一起看看有哪些新的原生方法可以替换掉 jQuery。

## [从页面移除元素](#remove)

还记得使用原生 DOM 从页面上移除一个元素的令人抓狂地迂回方式吗
？`el.parentNode.removeChild(el);`？这是 jQuery 方式和新原生方式的对比。

jQuery：

```js
var $elem = $('.someClass'); //选择元素
$elem.remove(); //移除元素
```

新原生：

```js
var elem = document.querySelector('.someClass'); //选择元素
elem.remove(); //移除元素
```

> 说明：**对于本文的以下部分，我们假设`$elem`是一组 jQuery 选择的元素集
> ，`elem`是一个原生 JavaScript 选择的 DOM 元素。**

## [前置插入元素（内部）](#prepend)

jQuery：

```js
$elem.prepend($someOtherElem);
```

新原生：

```js
elem.prepend(someOtherElem);
```

## [前置插入元素（外部）](#before)

jQuery：

```js
$elem.before($someOtherElem);
```

新原生：

```js
elem.before(someOtherElem);
```

## [替换元素](#replaceWith)

jQuery：

```js
$elem.replaceWith($someOtherElem);
```

新原生：

```js
elem.replaceWith(someOtherElem);
```

## [查找最近的祖先元素](#closest)

jQuery：

```js
$elem.closest('div');
```

新原生：

```js
elem.closest('div');
```

## [浏览器对 DOM 操作方法的支持](#supportdom)

这些方法现在具有良好的浏览器支持：

该浏览器支持数据来自[Caniuse](http://caniuse.com/#feat=dom-manip-convenience)，
它具有更多的细节。数字表示浏览器从  此版本及以上支持该功能。

### 桌面浏览器

| Chrome | Firefox | IE  | Edge | Safari |
| :----: | :-----: | :-: | :--: | :----: |
|   54   |   49    | No  |  17  |   10   |

### 手机、平板浏览器

| Android Chrome | Android Firefox | Android | iOS Safari |
| :------------: | :-------------: | :-----: | :--------: |
|       81       |       68        |   81    |  10-10.2   |

它们目前正在 Edge 中实现。

## [淡入元素](#fadein)

jQuery：

```js
$elem.fadeIn();
```

通过编写我们自己的 CSS，我们可以更好地控制元素的动画。在这里我会做一个简单的淡入
。

```css
.thingy {
  display: none;
  opacity: 0;
  transition: 0.8s;
}
```

```js
elem.style.display = 'block';
requestAnimationFrame(() => (elem.style.opacity = 1));
```

## [一次事件处理回调函数](#once)

jQuery：

```js
$elem.one('click', someFunc);
```

在以前编写原生 JavaScript 时，我们必须在回调函数内部调用 removeEventListener 方
法。

```js
function dostuff() {
  alert('some stuff happened');
  this.removeEventListener('click', dostuff);
}
var button = document.querySelector('button');
button.addEventListener('click', dostuff);
```

现在这件事情变得更加简单。你可能已经看到过有时会在`addEventListener`方法中传递第
三个可选参数。用来判断事件捕获或事件冒泡时，它是一个布尔类型的值。现在不仅如此
，[第三个参数](https://developers.google.com/web/updates/2016/10/addeventlistener-once)还
可以是一个配置对象。

```js
elem.addEventListener('click', someFunc, { once: true });
```

如果你仍然希望使用事件捕获中仅调用一次回调，那么你也可以在配置对象中设置：

```js
elem.addEventListener('click', myClickHandler, {
  once: true,
  capture: true,
});
```

## [动画](#animation)

jQuery 的`.animate()`方法是非常有限的。

```js
$elem.animate(
  {
    width: '70%',
    opacity: 0.4,
    marginLeft: '0.6in',
    fontSize: '3em',
    borderWidth: '10px',
  },
  1500
);
```

文档中说“所有动画属性应该设置为单个数值，除非另有说明;许多非数值属性都无法使用基
本的 jQuery 方法设置动画。”，你需要使用插件才能为 transform 和颜色设置动画。使用
新的
[Web Animations API](https://css-tricks.com/css-animations-vs-web-animations-api/)
会简单很多。

```js
var elem = document.querySelector('.animate-me');
elem.animate(
  [
    {
      transform: 'translateY(-1000px) scaleY(2.5) scaleX(.2)',
      transformOrigin: '50% 0',
      filter: 'blur(40px)',
      opacity: 0,
    },
    {
      transform: 'translateY(0) scaleY(1) scaleX(1)',
      transformOrigin: '50% 50%',
      filter: 'blur(0)',
      opacity: 1,
    },
  ],
  1000
);
```

## [Ajax](#ajax)

jQuery 以前的另一个招牌特性就是**Ajax**。 jQuery 消除了`XMLHttpRequest`的缺点：

```js
$.ajax('https://some.url', {
  success: (data) => {
    /* do stuff with the data */
  },
});
```

新的[fetch API](https://css-tricks.com/using-fetch/)是 XMLHttpRequest 非常棒的替
代品，现在所有现代浏览器都已支持。

```js
fetch('https://some.url')
  .then((response) => response.json())
  .then((data) => {
    // do stuff with the data
  });
```

当然，实际获取数据可能比这个代码示例更复杂一些。例如，在接收到错误的 HTTP 状态码
时`fetch()`返回的 Promise 并不会 reject 反而会被 resolve。但是，它比建立
在`XMLHttpRequest`之上的任何功能都更
加[通用](https://blogs.windows.com/msedgedev/2016/05/24/fetch-and-xhr-limitations/#wyZ8BREdhyRMFKmi.97)。

如果我们想要易于使用，有一个简单且流行的选择——但它不是浏览器原生的，这使我进入
...

## [微型库的兴起](#micro-library)

[Axios](https://github.com/mzabriskie/axios)是一个流行的 Ajax 库。这是一个很好的
微型库案例——只为一件事而设计的库。虽然大多数库不会像 jQuery 那样经过良好的测试，
但它们往往可以成为 jQuery 这个庞然大物的替代品。

## [（几乎）所有问题都可以解决](#polyfill)

现在你已经知道原生操作 DOM 很好用了！但是你可能看过这些发展成果后还是想说：“哦,
仍然需要支持 IE 9, 所以我还是最好还是使用 jQuery 吧”。大多数情况下，*Can I
Use*对你想要使用的某个特性的说法已经不那么重要了，你可以使用任何你喜欢的特性
，polyfills 可以为低版本浏览器提供兼容支持。在相当长的一段时间里，如果你想使用一
个新的浏览器特性，你必须找到一个 polyfill，然后把它放置到你的页面中。对于 IE9 中
缺少的所有功能，这样做将是一项艰巨的任务。而现在就简单多了

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
```

这个简单的脚本标签可以使低版本浏览器支持所有的最新 API。如果你还没有从英国《金融
时报》听说这种 polyfill 服务，你可以
到[polyfill.io](https://polyfill.io/v2/docs/)阅读相关信息。

## [2017 年迭代 NodeList](#iterating-a-nodelist)

jQuery 的大量采用并不仅仅是因为它能消除浏览器之间的漏洞和 IE 的不一致性。今天
jQuery 还有一个招牌特性：**迭代**。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Iterable NodeLists are so fundamentally important to the quality of the DOM. Unsurprisingly I now use React for most of my coding instead.</p>&mdash; John Resig (@jeresig) <a href="https://twitter.com/jeresig/status/726058698989277185?ref_src=twsrc%5Etfw">April 29, 2016</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

NodeList 是不可迭代。开发者不得不通过各种各样的方法使之可以迭代。经典的 for 循环
可能是性能最优的方法, 但肯定不是我喜欢的那一种类型。因此我们得到了最丑陋的方法:

```js
var myArrayFromNodeList = [].slice.call(document.querySelectorAll('li'));
```

或者：

```js
[].forEach.call(myNodeList, function (item) {...});
```

最近，我们已经能够使用`Array.from`，更简单更优雅地将 nodeList 转换为数组。

```js
Array.from(querySelectorAll('li')).forEach((li) => /* do something with li */);
```

但是最大的消息是，现在
NodeLists[默认是可迭代的](https://developer.mozilla.org/en/docs/Web/API/NodeList)。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">It&#39;s about time we have iterable NodeLists! <a href="https://t.co/nIT5uHALpW">https://t.co/nIT5uHALpW</a> 🎉🎉🎉 Been asking for this for years! <a href="https://t.co/edb0TTSdop">https://t.co/edb0TTSdop</a></p>&mdash; John Resig (@jeresig) <a href="https://twitter.com/jeresig/status/726058042903633922?ref_src=twsrc%5Etfw">April 29, 2016</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

现在只需简单地输入：

```js
document.querySelectorAll('li').forEach((li) => /* do some stuff */);
```

Edge 是最后一个不支持可迭代 NodeLists 的现代浏览器，但目
前[正在处理支持中](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/15898300-iterable-nodelists)。

## [jQuery 很慢吗？](#is-jquery-slow)

jQuery 可能比那些写的糟糕原生 JS 更快，但这只是一个让我们更好地学习 JavaScript
的理由！jQuery 项目的贡献者 Paul Irish 曾说过：

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Performance recommendation: Do not use jQuery&#39;s hide() method. Ever. <a href="https://t.co/zEQf6F54p6">https://t.co/zEQf6F54p6</a> <br>Classes are your friend.</p>&mdash; Paul Irish (@paul_irish) <a href="https://twitter.com/paul_irish/status/564443848613847040?ref_src=twsrc%5Etfw">February 8, 2015</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

jQuery 的作者在他的《JavaScript 忍者秘籍》一书中有关学习原生 DOM 操作这样写道：

> 既然类库已经帮我们做好了，为什么我们还要理解它的实现呢？最能让大家信服的原因就
> 是为了性能。了解类库中 DOM 操作的实现原理，既可以配合类库写出更高效的代码，也
> 可以将这些技术灵活运用在自己的代码中。

## [我不喜欢 jQuery 的地方](#what-i-dislike-about-jquery)

jQuery 不只是解决各个浏览器之间的 API 兼容性问题，还想要试图将它们全部替换掉。返
回 jQuery 对象而不是 NodeList，这意味着你做事情的方式要受限于 jQuery，而内置的浏
览器方法是不受限制的。对于初学者来说，曾经使前端 js 变得容易上手现在反而成为了障
碍，因为实际上这意味着有两种重复的方式来做这些事情。如果你想轻松阅读别人的代码，
并应用到原生 JS 和 jQuery 环境中，那么你需要学习的东西就会多一倍。然而，有些类库
使用了 jQuery，但是返回的是 NodeList 而不是 jQuery 对象……

## [没有\$就活不下了吗？](cant-live-without-$?)

也许你已经喜欢上了 jQuery 的`$`，有很多微型库试图去模仿 jQuery 的 API。

- W3C CSS 工作组的特邀专家 Lea Verou 撰写
  了[《jQuery Considered Harmful》](http://lea.verou.me/2015/04/jquery-considered-harmful/)一
  文，他还是[Bliss.js](http://blissfuljs.com/)的作者。Bliss 使用熟悉的\$语法，但
  返回 NodeList。
- 与此同时，Paul Irish 发布
  了[Bling.js](https://gist.github.com/paulirish/12fb951a8b893a454b32)，"因为你
  想要没有 jQuery 的`$`。"
- Remy Sharp 提供了一个类似的微型库，恰当地命名
  为[min.js](https://github.com/remy/min.js)。

我不是 jQuery 的反对者，一些优秀的开发者仍然选择使用 jQuery。如果你已经习惯使用
jQuery 并且对它的 API 非常熟悉，那就没必要放弃使用。有些人使用 jQuery 知道什么是
闭包，可以写出企业级的 Web 应用，而有些人使用原生 JS 却不知道这些。许多工作岗位
仍然将 jQuery 列为必备技能之一。值得庆幸的是，Internet Explorer 11 是 IE 浏览器
的最后一个版本，随着 IE 的消失 jQuery 也可能逐渐成为 DOM 操作的遗物。

- _本文章翻译
  自[(Now More Than Ever) You Might Not Need jQuery](https://css-tricks.com/now-ever-might-not-need-jquery/)。_
- _本人英文水平有限，翻译不正确不通顺的地方，敬请指出。_
