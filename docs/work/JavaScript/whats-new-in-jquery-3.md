---
display: 'home'
image: '/images/javascript/jquery3.jpg'
lang: zh-CN
title: 【译】jQuery3新特性
descripton: 
date: 2016-03-28
tags:
    - jQuery
categories:
    - Javascript
    - 翻译
---

jQuery称霸web江湖已经有十年了，它屹立不倒是有原因的。jQuery提供了用户容易操作DOM的接口，执行Ajax请求，创建动画，以及更多。另外，与DOM API不同，jQuery实现了[复合模式](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#compositepatternjquery)。因此，你可以使用在一个无论包含多少（零个、一个或者更多）元素的jQuery集合上调用jQuery方法。

在未来几周内，jQuery随着第3个版本的发布将要达到一个重要的里程碑。jQuery3修复了很多bug，增加了一些新的功能，弃用并删除了一些功能，并更改了一些功能的行为。在这篇文章中，我将要突出介绍jQuery3最重要的变化。

## 新特性

以下各节中我将讨论在jQuery3中加入的重要特性。

### `for...of`循环

jQuery3可能将使用for...of循环来遍历jQuery集合中的DOM元素。这种新的迭代器是ECMAScript2015（又名ECMAScript 6）规范的一部分。这个新迭代器可以使你遍历迭代对象（包括Array，Map,Set,等等）。

当使用这个新的迭代器时，你在循环中接受到的值不是jQuery对象而是一个DOM元素。这个迭代器将会略微的提高你操作jQuery集合的方式。

为了理解这个迭代器是怎样工作的，假设你想为页面上每一个`input`元素分配一个ID。jQuery3之前你会这么写：
```javascript
var $inputs = $('input');

for(var i = 0; i < $inputs.length; i++ ){
    $inputs[i].id = 'input-' + i;    
}
```
在jQuery3中你可以这么写：
```javascript
var $inputs = $('input');
var i = 0;

for(input of $inputs){
    input.id = 'input-' + i++; 
}
```

### `$.get()`和`$.post()`增加了新的方法签名

为了`$.get()`和`$.post()`的实用功能和`$.ajax()`一样，jQuery3为其增加了新的方法签名。添加的新的方法签名是：
```javascript
$.get([settings])

$.post([settings])
```
`settings`是一个具有很多属性的对象。你可以提供给`$.ajax()`使用，它们是相同的对象。想要了解更多关于`$.ajax()`的，请参考[`$.ajax()`网页](http://api.jquery.com/jquery.ajax/)中的说明。

唯一的不同是，当settings对象传递给`$.get()`和`$.post()`而不是`$.ajax()`时，`method`属性总是被忽略的。其原因是`$.get()`和`$.post()`有一个预设的HTTP方法来执行Ajax请求（`$.get()`是GET，`$.post()`是POST）。基本上，你不能通过`$.get()`发送一个POST请求的。

思考下面的代码
```javascript
$.get({
    url: 'https://www.audero.it',
    method: 'POST' // 这个属性会被忽略
})
```
尽管设置了`method`属性，这段代码是不会发送一个POST请求，而是一个GET请求。

### 动画使用`requestAnimationFrame()`

所有的现在浏览器，包括IE10及以上，都[支持requestAnimationFrame](http://caniuse.com/#search=requestAnimationFrame)。jQuery3将会在内部使用这个API执行动画，使动画更加流畅并且减少对CPU资源的消耗。

### `unwrap()`

jQuery3给`unwrap()`添加了一个可选参数，这个新的方法签名是：
```javascript
unwrap([selector])
```
感谢这个变化，您将能够通过选择器表达式的字符串在已经选择的父元素中去匹配。如果存在匹配项，则匹配的子元素的父元素被移除；否则不执行操作。


## 改变的特性

jQuery3也修改了一些特性的行为。

### `:visible`和`:hidden`

新版本的jQuery修改了`:visible`和`:hidden`过滤器的释义。如果元素有任何的布局容器，即使宽度和（或）高度都为0，也将会视为`:visible`。举例说明，`br`元素和没有内容的行级元素（内联元素）现在都会被`:visible`过滤器选中。

因此，如果在一个页面中有以下标记语言：
```html
<div></div>
<br/>
```
然后你运行以下语句：
```javascript
console.log($('body :visible').length);
```
在jQuery1.x和jQuery2.x中你得到的结果为0，但是在jQuery3中你得到的结果是2。

### `data()`

另一个重要的变化是有关`data()`方法的行为。他已经变得和[Dataset API](https://www.w3.org/TR/html5/dom.html#dom-dataset)规范一样了。jQuery 3将所有属性的键都转换成驼峰式命名方式。要想理解这个变化，请思考下面的元素：
```html
<div id="container"></div>
```
如果你使用的jQuery3之前的版本你会这么写：
```javascript
var $elem = $('#container');
$elem.data({
    'my-property':'hello'
});
console.log($elem.data());
```
在控制台你将会得到如下的结果：
```shell
{my-property:"hello"}
```
而使用jQuery3你将得到如下的结果：
```shell
{myPropery:"hello"}
```
请注意，在jQuery3中属性名已经变成了驼峰式没有横杠（-），而在以前的版本中，属性名会保持全小写和保留横杠（-）。

### `Deferred`对象

jQuery3改变了`Deferred`对象的行为，`Deferred`对象是`Promise`对象的前身，这次改变提高了`Deferred`对象对[Promise/A+提案](https://promisesaplus.com/)的兼容性。`Deferred`这个对象及其它的历史都是很有趣的。想要了解更多，你可以去阅读[官方文档](https://api.jquery.com/category/deferred-object/)或者阅读我写的书[jQuery实战（第三版）](https://www.manning.com/books/jquery-in-action-third-edition)，这本书也包含了jQuery3。

在jQuery1.x和2.x中，传递给`Deferred`的回调函数内出现未捕获的异常会阻断程序的执行。不像原生`Promise`对象那样会抛出异常冒泡至`window.onerror`（通常冒泡到这里）。如果你没有定义一个函数处理错误事件（通常我们是会处理的），那么异常信息就会显示并且程序会终止执行。

jQuery3遵循原生`Promise`对象的模式。因此，抛出的异常被当作失败，接着失败回调函数执行。一旦失败回调函数执行完成，进程就会继续，下面的的成功回调函数将被执行。

为了帮助你理解两者不同，让我们看一个小例子。思考下面的代码：
```javascript
var deferred = $.Deferred();

deferred
    .then(function(){
      throw new Error('An error');  
    })
    .then(
        function(){
            console.log('Success 1');  
        },
        function(){
            console.log('Failure 1');
        }
    )
    .then(
        function(){
            console.log('Success 2');
        },
        function(){
            console.log('Failure 2');
        }
    );

deferred.resolve();
```
在jQuery1和jQuery2中，只有第一个函数（抛出错误的函数）被执行。另外，因为我没有为`window.onerror`定义任何处理函数，所以控制台将会输出“Uncaught Error: An error”并且程序执行将会终止。

在jQuery3中，行为是完全不同的。你将在控制台上看到“Failure 1”和“Success 2”两条信息。异常被第一个失败回调函数处理，并且一旦被处理，随后的成功回调函数也会被执行。

### SVG文档

没有任何版本的jQuery,包括jQuery3，官方正式支持SVG文档。然而，事实是很多方法是可以工作的，还有另外一些，比如类名操作在以前是不可正常使用的，但是它们在jQuery3中更新后也可以正常使用了。因此，在即将到来的jQuery版本中，你可以放心地在SVG文档上使用`addClass()`和`hasClass()`方法。


## 已废弃或者已移除的方法和属性

除目前所描述的改进外，jQuery还移除和废弃了一些特性。

### 废弃`bind()`、`unbind()`、`delegate()`和`undelegate()`

很久以前（jQuery1.7版本时）jQuery就引入了`on()`方法，它提供了统一的接口替换`bind()`、`delegate()`和`live()`方法。与此同时jQuery也提供了`off()`方法，同样提供了统一的接口替换`unbind()`、`undelegated()`和`die()`方法。从`on()`和`off()`方法引入时就不推荐使用`bind()`、`delegate()`、`unbind()`和`undelegate()`方法，但它们还是一直存在着。

jQuery3废弃了这些方法并且打算在未来的版本（可能是jQuery4）会移除它们。在你所有的项目中坚持使用`on()`和`off()`方法，这样你就不必担心未来的版本更新。

### 移除`load()`、`unload()`和`error()`方法

jQuery3抛弃了已经废弃的`load()`、`unload()`和`error()`方法。这些方法很久以前（在jQuery1.8时）就被废弃了，但是他们仍旧留在jQuery中。如果你使用的插件依赖其中的一个或多个方法，升级到jQuery3后你的代码将会崩溃。因此，在升级时注意。

### 移除`context`、`support`和`selector`属性

jQuery3抛弃了已经废弃的[context](https://api.jquery.com/context/)、[support](https://api.jquery.com/jQuery.support/)和[selector](https://api.jquery.com/selector/)属性。正如我在上一节讲到的，如果你仍旧在项目中使用这些属性或者使用的插件依赖这些属性，升级到jQuery3后你的代码将会崩溃。


## Bug修复

jQuery3修复了在以前版本中存在的重大bug。在下面章节中，我将介绍两点，这两点在你的工作中会有很大的不同。

### `width()`和`height()`的值不再四舍五入

jQuery3修复了`width()`和`height()`及所有其它相关方法的bug。这些方法将不再将结果像素值四舍五入到整数值，因为四舍五入后在某些情况下很难对元素进行定位。

为了理解这个问题，假设你有一个宽度为100px的容器元素，它里面包含三个宽度为三分之一（33.333333%）的元素：
```html
<div class="container">
    <div>My name</div>
    <div>is</div>
    <div>Aurelio De Rosa</div>
</div
```
在jQuery3之前，如果你尝试用以下代码来获取子元素的宽度……
```javascript
$('.container div').width();
```
……你得到的结果是33。原因是jQuery将33.33333四舍五入了。在jQuery3中，这个bug被修复了，因此你得到结果是更加精确的（即浮点数的结果）。

### `wrapAll()`

新版本jQuery修复了一个当传递函数给`wrapAll()`时发生的bug。在jQuery之前，当传递一个函数给`wrapAll()`时，jQuery集合中每一个元素都被包裹。换句话说，这种行为和传递一个函数给`wrap()`是一样的。

除了修复这个问题，还有一个变化：由于这个函数在jQuery3中只会被调用一次，因此jQuery集合每个元素的索引不能传入这个方法中。最终这个方法的上下文（`this`）将指向jQuery集合中的第一个元素。


## 下载jQuery3 beta1

如果你对这篇文章感兴趣，你可能想要尝试[jQuery3第一个beta版](https://blog.jquery.com/2016/01/14/jquery-3-0-beta-released/)。您可以通过访问下面两个url来获得。

* 未压缩版：[https://code.jquery.com/jquery-3.0.0-beta1.js](https://code.jquery.com/jquery-3.0.0-beta1.js)
* 压缩版：[https://code.jquery.com/jquery-3.0.0-beta1.min.js](https://code.jquery.com/jquery-3.0.0-beta1.min.js)

它在npm上也是可用的，你可以通过运行下面的命令来下载：
```shell
npm install jquery@3.0.0-beta1
```


## 总结

很多人认为jQuery将会死掉，认为在现代网页开发中已经没有一席之地。然而其仍在持续发展，jQuery使用统计（在排名前100万的网站中使用率为78.5%）反驳了这些说法。

在这篇文章中，我已经带着你介绍了jQuery3将会带来的重要特性变化。或许你可能已经注意到了，这个版本是不太会对你现有的项目造成崩溃，因为它没有引入一些重大的变化。尽管如此，在升级期间还是有一些事项需要注意得，如`Deferred`对象的改进。在更新第三方插件时也要注意，审查项目将帮助你发现异常行为或者崩溃的功能。


* *本文章翻译自[What’s New in jQuery 3](http://developer.telerik.com/featured/whats-new-in-jquery-3/)。*
* *本人英文水平有限，翻译不正确不通顺的地方，敬请指出。*
