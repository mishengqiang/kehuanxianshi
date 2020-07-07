---
display: ''
image: '/images/javascript/es6-fetch-api.jpeg'
lang: zh-CN
title: 【译】为什么我不在开发应用程序时使用Fetch API
descripton:
date: 2016-12-28
tags:
  - Fetch API
categories:
  - Javascript
  - 翻译
---

![To fetch or not to fetch?](https://cdn-images-1.medium.com/max/2000/1*VaSi63rQ1kYqFkAEhX_4YQ.jpeg)

当[Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)成为标准时
，我兴奋不已。我想以后可能不再需要在应用程序中使用 http 工具库来进行 http 请求了
。[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)是
如此低级笨拙（恶心
的[矛盾驼峰式命名](https://twitter.com/jaffathecake/status/401643673022001152)的
首字母缩写）。可是你别无选择，只能封装成更好用的方法或选择大量的开源替代方案之一
，比如 jQuery 的[\$.ajax()](http://api.jquery.com/jquery.ajax/)、Angular
的[\$http](https://docs.angularjs.org/api/ng/service/$http)、[superagent](http://visionmedia.github.io/superagent/)、
和我最喜欢的[axios](https://github.com/mzabriskie/axios)。我们真的能摆脱 http 工
具包的束缚吗？！

我想有了`fetch`API，不再需要在一系列的工具库中选择了，不需要再和同事们争论哪一个
更好了。在我要使用的时候，只需要引
入[fetch polyfill](https://github.com/github/fetch)就可以使用标准的 Fetch API 了
，Fetch API 是根据现代用例和经验教训而设计的。

悲催的是，在查看了一些非常基本的实用用例时，我们发现 http 工具包仍然存在。虽
然`fetch`是一个受欢迎的补充，它可以帮助我们轻松地进行底层操作，但是这就是它。它
只是底层的 API，在很多应用程序中无法直接使用，需要做一些抽象化处理才能使用。

## 错误处理

当你查看`fetch`基本示例时，它看起来非常有吸引力，并且和我们用过的其它 http 类库
非常相似。让我们看一个小示例。

其它方式：

```js
axios
  .get(url)
  .then((result) => console.log('success:', result))
  .catch((error) => console.log('error:', error));
```

Fetch 方式：

```js
fetch(url)
  .then((response) => response.json())
  .then((result) => console.log('success:', result))
  .catch((error) => console.log('error:', error));
```

看起来很简单，对吧？我们需要在中间添加`response.json()`做一下处理。如果要支
持[响应流](https://jakearchibald.com/2015/thats-so-fetch/#streams)，需要付出一点
代价。在我看来响应流是很少用到的特殊处理情况，通常我不会让特殊的处理影响到通用的
逻辑处理。如果用户需要使用响应流，我更愿意让用户传递标志参数来处理，而不是全都返
回响应流，这都不是什么大问题。

最重要的是，我相信很多读者在上面的例子中没有注意到（就像我第一次使用 fetch 时）
，实际上面的两段代码执行的结果是**不同的**。我在上面提到的所有 http 工具包（注意
，是所有的）都将服务器响应的错误状态（如 404，500 等）作为错误处理。但是 fetch
API（和 XMLHttpRequest 类似）只有
在[网络错误](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful)（
如无法解析地址、服务器无法访问或不能跨域等）时才会返回 reject 的 Promise。

这就意味着，当服务器返回 404 时，控制台上将打印“success”。如果我们想要为应用程序
开发者展现更直观的结果，并在服务器返回错误时返回 reject 的 Promise，则需要执行以
下操作：

```js
etch(url)
  .then((response) => {
    return response.json().then((data) => {
      if (response.ok) {
        return data;
      } else {
        return Promise.reject({ status: response.status, data });
      }
    });
  })
  .then((result) => console.log('success:', result))
  .catch((error) => console.log('error:', error));
```

我相信有很多人可能会说："这难道不对吗？你请求数据然后服务器响应，虽然服务器响应
了 404，但同样也是来自服务器的响应啊"，从另一个角度来说，这种想法是正确的。但是
作为一名开发者来说，服务器响应的错误几乎都应该被认为是异常，应该和网络错误做同样
的处理。为了修复这种行为，我们不能只改变`fetch`的标准行为。我们需要一个更好的适
合应用程序开发者的抽象化。

## POST 请求

对于应用程序开发者来说，另一个非常常见的情况是向服务器发送 POST 请求。使用 http
工具包（如 axios）时，您可以执行如下操作：

```js
axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone',
});
```

当我第一次开始使用 Fetch API 时，我非常乐观。我心想：哈哈，这个全新的 API 看来起
和我之前用过几乎一样啊，这还不易如反掌啊。悲催的是，我浪费了几乎整整一个小时的时
间，才成功的向服务器发送了一个 POST 请求，因为像下面这样做是不行的：

```js
fetch('/user', {
  method: 'POST',
  body: {
    firstName: 'Fred',
    lastName: 'Flintstone',
  },
});
```

我相信有很多开发者和我一样，都需要明白`fetch`是只是底层 API，并不会提供解决像这
样的常见情况的捷径。Fetch API 是非常明确的
。JSON[必须被转换为字符串](https://github.github.io/fetch/#request-body)，"Content-Type"
头必须表明响应内容类型是 JSON 格式，否则服务器会当作字符串来处理。实际上我们应该
这么做:

```js
fetch('/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'Fred',
    lastName: 'Flintstone',
  }),
});
```

好吧，这看起来需要在我写的每个 API 请求中都要重复一遍参数配置。下面还会介绍更多
！

## 默认值

到目前为止你可以看到，`fetch`是一个非常明确的 API，如果没有正确必需的参数传递
，`fetch`不会返回任何值。因此，上面所有的`fetch`代码向我的服务器上发起请求都不起
作用，因为:

1. 我的服务器使用的是基于 cookie 的身份验证，而 fetch 默认不会发送 cookie。
2. 我的服务器需要知道客户端能够处理 JSON 编码的响应。
3. 我的服务器是在不同的子域上，但`fetch`默认是禁用跨域访问（CORS）的。
4. 为了阻止 XSRF 攻击，我的服务器要求每次请求都必须带有一个自定义的 X-XSRF-TOKEN
   头，以证明该请求是从我的应用程序页面发起的。

因此，我实际应该这么做：

```js
fetch(url, {
  credentials: 'include',
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'X-XSRF-TOKEN': getCookieValue('XSRF-TOKEN'),
  },
});
```

默认情况下`fetch`不处理这些情况的，是完全没有问题的。但是如果我想要在整个应用程
序中使用`fetch` 发起 API 请求，则需要一种方法来修改这些默认值，使之在我的应用程
序中成为有意义的东西。悲催的是`fetch`并没有提供任何机制来覆盖默认值。或许你已经
猜到了谁会这么做：

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
```

但这只是为了展示，因为实际上上面提到的所有内容（包括 XSRF 保护） axios 默认都已
经提供了。axios 的目的是提供一个易于使用的工具来对服务器进行 API 调用。`fetch`的
目的比我使用的目的要广泛得多，这就是为什么它不是最佳的工作工具。

## 结论

不使用 http 工具包，则意味着一行代码是不够的：

```js
function addUser(details) {
  return axios.post('https://api.example.com/user', details);
}
```

实际要写的代码：

```js
function addUser(details) {
  return fetch('https://api.example.com/user', {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(details),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': getCookieValue('XSRF-TOKEN'),
    },
  }).then((response) => {
    return response.json().then((data) => {
      if (response.ok) {
        return data;
      } else {
        return Promise.reject({ status: response.status, data });
      }
    });
  });
}
```

显然，你不会在每个 API 请求中都重复此操作。你可能会将其封装成一个函数，并要求参
与项目的开发人员禁止直接使用`fetch`，而都改为使用该函数。

然后当下一个项目出现时，你会把该函数封装到一个库中。然后，当遇到更多的需求时，你
会简化 API，你会让 API 更加可定制，修复所有的 bug，并想办法让你的 API 保持一致。
然后你甚至会加入一些功能，比如取消请求、处理进度和自定义超时等。

你可能会做得相当不错。但是，你所做的一切只是又创建了一个轮子（http 工具包），最
终你在项目中使用的是新轮子，而不是使用最新的最火的**Fetch API**。省点精力吧头发
重要，直接使用 `npm install --save axios` (或选择类似的工具包)不香吗。

说真的，你觉得这个 http 工具包内部使用`fetch` 还是`XMLHttpRequest`重要吗？

## P.S.

我只想再次强调：我并不是反对 fetch ! 我不认为上述所提出的观点是设计缺陷，所有这
些观点对于一个底层 API 来说都是非常合理的。我只是想说，我不建议你在应用程序中直
接使用这样的底层 API。我只是认为大家应该使用底层封装并且提供更多高级 API 的工具
，这样更符合我们的目的。

- _本文章翻译
  自[Why I won’t be using Fetch API in my apps](https://medium.com/@shahata/why-i-wont-be-using-fetch-api-in-my-apps-6900e6c6fe78)。_
- _本人英文水平有限，翻译不正确不通顺的地方，敬请指出。_
