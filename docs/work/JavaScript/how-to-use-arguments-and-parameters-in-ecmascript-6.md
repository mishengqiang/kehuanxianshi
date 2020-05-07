---
display: 'home'
image: '/images/javascript/es6-arguments-and-parameters.png'
lang: zh-CN
title: 【译】ECMAScript 6中的参数使用
descripton: 
date: 2016-10-05
tags:
    - ECMAScript2015
    - Arguments
    - Parameters
    - Function
categories:
    - Javascript
    - 翻译
---

**ECMAScript 6(又名ECMAScript2015)是ECMAScript标准的最新版本，在JavaScript中明显提升了参数的使用。现在我们可以使用rest参数、默认值和解构等其它特性。**

在本教程中，我们将探讨实参和形参的详情，看看ECMAScript 6对其升级了哪些特性。

## [Arguments与Parameters](#arguments-versus-parameters)
Arguments和parameters通常是相互使用。然而在本教程中我们将做一个区分。通常，parameters（形参）是在函数声明时指定的，而arguments（实参）是调用函数时传入的。思考下面这个函数：
```javascript
function foo(param1, param2){
    // do something
}
foo(10, 20);
```
在这个函数中，`param1`和`param2`是函数的形参，传入函数的值（`10`和`20`）是实参。

## [扩展运算符(...)](#spread-operator)
在ECMAScript 5中，`apply()`方法传递一个数组作为函数的参数是方便的。例如，常用`Math.max()`方法去查找一个数组中的最大值，思考这段代码：
```javascript
var myArray = [5, 10, 50];
Math.max(myArray); // Error: NaN
Math.max.apply(Math, myArray); //50
```
`Math.max()`方法不支持数组，它仅仅接受数字。当一个数组传入到`Math.max()`函数中时，它抛出一个错误。但是当使用`apply()`方法后，数组作为单独的数字传入,所以Math.max()方法可以处理它。

幸运的是，随着在ECMAScript 6扩展操作符的引入，我们不再需要使用`apply()`方法。使用扩展操作符，我们可以轻易地将一个表达式扩展为多个参数：
```javascript
var myArray = [5, 10, 50];
Math.max(...myArray);  // 50
```
在这里，扩展运算符将`myArray`展开为函数的一个个单独的参数。在ECMAScript 5中使用`apply()`模拟扩展运算符是可行的，但是语法是混乱的，并且缺乏扩展运算符的灵活性。扩展运算符不但使用简单而且还具有特性。例如，在函数调用时，它可以多次使用并且可以和其它参数混合使用：
```javascript
function myFunction() {
    for(var i in arguments){
        console.log(arguments[i]);
    }
}
var params = [10, 15];
myFunction(5, ...params, 20, ...[25]); // 5 10 15 20 25
```
扩展操作符的另一个优点是，它可以很容易地与构造函数一起使用：
```javascript
new Date(...[2016, 5, 6]); // Mon Jun 06 2016 00:00:00 GMT-0700 (Pacific Daylight Time)
```
当然，我们可以在ECMAScript 5中重写上面的代码，但我们需要使用复杂的模式来避免类型错误：
```javascript
new Date.apply(null, [2016, 4, 24]);    // TypeError: Date.apply is not a constructor
new (Function.prototype.bind.apply(Date, [null].concat([2016, 5, 6])));   // Mon Jun 06 2016 00:00:00 GMT-0700 (Pacific Daylight Time)

```
### [浏览器对扩展操作符的支持](#spread-operator-browser-support-in-function-calls)
桌面浏览器
| CHROME   |  FIREFOX | INTERNET EXPLORER  | MICROSOFT EDGE  | OPERA    | SAFARI   |
|----------|----------|--------------------|-----------------|----------|----------|
|  46      |  27      | -                  |  Supported      |  -       |   7.1    |
移动浏览器
| CHROME FOR ANDROID   |  FIREFOX MOBILE | IE MOBILE  | OPERA MOBILE    | SAFARI MOBILE   |
|----------------------|-----------------|------------|-----------------|-----------------|
|  46                  |  27             | -          |  -              |  -              |
浏览器支持详情[点我查看](http://kangax.github.io/compat-table/es6/#test-spread_(...)_operator)。
## [Rest参数](#rest-parameters)
rest参数的语法与扩展运算符一样，但是它不是展开一个数组到参数中，相反它是将参数收拢为一个数组：
```javascript
function myFunction(...options){
    return options;
}
myFunction('a', 'b', 'c'); //["a", "b", "c"]
```
如果没有实参，rest参数将被设置为一个空数组：
```javascript
function myFunction(...options){
    return options
}
myFunction(); // []
```
当创建一个参数可变的函数（即接受的参数数量是有变化的函数）时，rest参数是非常有用的。得益于数组的好处，reset参数可以容易地替换掉`arguments`对象（我们将在本教程后面解释）。思考这个使用ECMAScript 5写的函数：
```javascript
function checkSubstring(string) {
    for(var i = 1; i < arguments.length; i++) {
        if(string.indexOf(arguments[i]) === -1) {
            return false;
        }
    }
    return true;
}
checkSubstring('this is a string', 'is', 'this'); // true
```
这个函数检查一个字符串是否包含一些子字符串。这个函数的第一个问题是，我们必须得看函数的内部才知道它需要多个参数。第二个问题是循环迭代必须从索引`1`而不是`0`开始，因为`arguments[0]`指向第一个参数。如果我们以后决定在`string`之前或者之后添加另一个参数，我们可能会忘记更新for循环的逻辑处理。使用rest参数，我们就很容易地避免这些问题：
```javascript
function checkSubstrings(string, ...keys) {
  for (var key of keys) {
    if (string.indexOf(key) === -1) {
      return false;
    }
  }
  return true;
}
checkSubstrings('this is a string', 'is', 'this');   // true
```
此函数的输出和前一个函数相同。在这里，`string`参数是传入的第一个参数，其它的参数放进一个数组中，并赋值给了变量`keys`。

使用rest参数代替`arguments`对象，提高了代码的可读性，避免了JavaScript中的[优化问题](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments)。然而，rest参数也不是没有它的局限性。例如，它必须是最后一个参数，否则，将出现语法错误。
```javascript
function logArguments(a, ...params, b) {
        console.log(a, params, b);
}
logArguments(5, 10, 15);    // SyntaxError: parameter after rest parameter
```
另一个限制是，在函数声明中只允许存在一个rest参数：
```javascript
function logArguments(...param1, ...param2) {
}
logArguments(5, 10, 15);    // SyntaxError: parameter after rest parameter
```
### [浏览器对rest参数的支持](#rest-parameters-browser-support)
桌面浏览器
| CHROME   |  FIREFOX | INTERNET EXPLORER  | MICROSOFT EDGE  | OPERA    | SAFARI   |
|----------|----------|--------------------|-----------------|----------|----------|
|  47      |  15      | -                  |  Supported      |  34      |   -    |
移动浏览器
| CHROME FOR ANDROID   |  FIREFOX MOBILE | IE MOBILE  | OPERA MOBILE    | SAFARI MOBILE   |
|----------------------|-----------------|------------|-----------------|-----------------|
|  47                  |  15             | -          |  -              |  -              |
浏览器支持详情[点我查看](http://caniuse.com/#search=rest)。
## [默认参数](#default-parameters)
### [ECMAScript 5中的默认参数](#default-parameters-in-ecmascript-5)
在ECMAScript 5中JavaScript不支持默认参数，但有一个简单的解决方法。在函数内使用逻辑`or`操作符(`||`)，我们很容易在ECMAScript 5中模拟默认参数。思考这个函数：
```javascript
function foo(param1, param2) {
   param1 = param1 || 10;
   param2 = param2 || 10;
   console.log(param1, param2);
}
foo(5, 5);  // 5 5
foo(5);    // 5 10
foo();    // 10 10
```
这个函数预计需要有两个参数，但是当它被不带参数调用时，它将使用默认值。在函数内部，缺少的参数会自动设置为undefined。因此，我们可以检测到这些参数，并为它们声明为默认值。检测缺失的参数和设置默认值，我们使用逻辑`or`操作符（`||`）。这个操作符检查表达式的第一个值：如果它是[true](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)，操作符返回它。如果它是假，操作符返回第二个值。

我们经常在函数中使用这种方式来设置参数的默认值，但是它是有缺陷的。向函数传入`0`和`null`也会触发默认值，因为这些参数的值会被转换为[false](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)。因此，如果我们真的需要给函数传入`0`和`null`，我们需要另一种方法来检查参数是否缺少：
```javascript
function foo(param1, param2) {
  if(param1 === undefined){
    param1 = 10;
  }
  if(param2 === undefined){
    param2 = 10;
  }
  console.log(param1, param2);
}
foo(0, null);    // 0, null
foo();    // 10, 10
```
在这个函数中，对传入的参数进行类型检查，以确保在赋默认值之前，它们是undefined。这种方式需要多写一点的代码，但它是一个更安全的选择，并且允许我们向函数传入参数`0`和`null`。
### [ECMAScript 6中的默认参数](#default-parameters-in-ecmascript-6)
使用ECMAScript 6，我们不再需要检查undefined值来模拟默认参数了，现在我们可以将默认值放在函数声明中：
```javascript
function foo(a = 10, b = 10) {
  console.log(a, b);
}
foo(5);    // 5 10
foo(0, null);    // 0 null
```
正如你所看到的，调用函数时，省略参数会触发默认值，但是传入`0`和`null`并不会触发默认值。
我们甚至可以使用函数返回值作为参数的默认值：
```javascript
function getParam() {
    alert("getParam was called");
    return 3;
}
function multiply(param1, param2 = getParam()) {
    return param1 * param2;
}
multiply(2, 5);     // 10
multiply(2);     // 6 (also displays an alert dialog)
```
注意，函数`getParam`仅仅在第二个参数缺省时才会被调用。因此当我们传入两个参数调用函数`multiply()`时，alert并不会显示。

默认参数另一个有趣的特性是，在函数声明中我们可以引用其他参数和变量：
```javascript
function myFunction(a=10, b=a) {
     console.log('a = ' + a + '; b = '  + b);
}
myFunction();     // a=10; b=10
myFunction(22);    // a=22; b=22
myFunction(2, 4);    // a=2; b=4
```
你甚至可以在函数声明中执行操作：
```javascript
function myFunction(a, b = ++a, c = a*b) {
     console.log(c);
}
myFunction(5);    // 36
```
注意，与其它语言不同，JavaScript是在调用函数时计算默认值。
```javascript
function add(value, array = []) {
  array.push(value);
  return array;
}
add(5);    // [5]
add(6);    // [6], not [5, 6]
```
### [浏览器对默认参数的支持](#default-parameter-browser-support)
桌面浏览器
|  特性                    | CHROME   |  FIREFOX | INTERNET EXPLORER  | MICROSOFT EDGE  | OPERA    | SAFARI   |
|-------------------------|----------|----------|--------------------|-----------------|----------|----------|
|  基本支持                 |  49      |  15      | -                  |  14             |  -       |   -     |
|  在默认参数后,无默认值的参数 |  49      |  26      | -                  |  14             |  -       |   -     |
移动浏览器
|  特性                    | CHROME FOR ANDROID   |  FIREFOX MOBILE | IE MOBILE  | OPERA MOBILE    | SAFARI MOBILE   |
|-------------------------|----------------------|-----------------|------------|-----------------|-----------------|
|  基本支持                 |  49                  |  15             | -          |  -              |  -              |
|  在默认参数后,无默认值的参数 |  46                  |  26             | -          |  -              |  -              |
浏览器支持详情[点我查看](http://kangax.github.io/compat-table/es6/#test-default_function_params)。
## [解构](#destructuring)
解构是ECMAScript 6中的新特性，解构能够使我们从数组和对象中提取值并且把这些值赋到一些变量上，这些变量的组成语法类似于数组和对象。这种语法是清晰明确和易于理解，并且当传递参数给函数时特别有用。

在ECMAScript 5中，配置对象经常被用来处理大量的可选参数，特别是当属性的顺序并不重要时。思考这个函数：
```javascript
function initiateTransfer(options) {
    var  protocol = options.protocol,
        port = options.port,
        delay = options.delay,
        retries = options.retries,
        timeout = options.timeout,
        log = options.log;
    // code to initiate transfer
}
options = {
  protocol: 'http',
  port: 800,
  delay: 150,
  retries: 10,
  timeout: 500,
  log: true
};
initiateTransfer(options);
```
这种模式JavaScript的开发者经常使用，并且效果非常好，但是我们必须得看函数的内部才知道它需要哪些参数。使用解构参数，在函数声明时，我们可以清晰地表明需要哪些参数：
```javascript
function initiateTransfer({protocol, port, delay, retries, timeout, log}) {
     // code to initiate transfer
};
var options = {
  protocol: 'http',
  port: 800,
  delay: 150,
  retries: 10,
  timeout: 500,
  log: true
}
initiateTransfer(options);
```
在这个函数中，我们使用了对象解构模式替代了配置对象。这使得我们的函数不仅更简洁，而且易读性更强。

我们可以结合使用解构参数和常规参数：
```javascript
function initiateTransfer(param1, {protocol, port, delay, retries, timeout, log}) {
     // code to initiate transfer
}
initiateTransfer('some value', options);
```
注意，在参数调用时省略参数将会抛出类型错误：
```javascript
function initiateTransfer({protocol, port, delay, retries, timeout, log}) {
     // code to initiate transfer
}
initiateTransfer();  // TypeError: Cannot match against 'undefined' or 'null'
```
当我们需要参数需要时，这是预期的行为，但如果我们希望他们是可选的呢？为了防止缺省参数时出现这个错误，我们需要给解构参数赋一个默认值：
```javascript
function initiateTransfer({protocol, port, delay, retries, timeout, log} = {}) {
     // code to initiate transfer
}
initiateTransfer();    // no error
```
在这个函数中，一个空对象作为默认值赋值给了解构参数。现在，如果这个函数不带任何参数被调用，并不会报错。

我们也可以给每个解构参数赋默认值：
```javascript
function initiateTransfer({
    protocol = 'http',
    port = 800,
    delay = 150,
    retries = 10,
    timeout = 500,
    log = true
}) {
     // code to initiate transfer
}
```
在这个示例中，每一个属性都有一个默认值参数，省去了需要我们手动检查未定义的参数和在函数内部赋默认值。
### [浏览器对默认解构的支持](#destructuring-browser-support)
桌面浏览器
|                  | CHROME   |  FIREFOX | INTERNET EXPLORER  | MICROSOFT EDGE  | OPERA    | SAFARI   |
|------------------|----------|----------|--------------------|-----------------|----------|----------|
|  基本支持         |  49      |  2.0     | -                  |  14             |  -       |   7.1   |
|  解构参数带有默认值 |  49      |  26      | -                  |  14             |  -       |   -     |
移动浏览器
|  特性            | CHROME FOR ANDROID   |  FIREFOX MOBILE | IE MOBILE  | OPERA MOBILE    | SAFARI MOBILE   |
|------------------|----------------------|-----------------|------------|-----------------|-----------------|
|  基本支持         |  49                  |  1              | -          |  -              |  8              |
|  解构参数带有默认值 |  46                  |  47             | -          |  -              |  -              |
浏览器支持详情[点我查看](http://kangax.github.io/compat-table/es6/#test-destructuring)。
## [参数传递](#passing-arguments)
有两种方法可以将参数传递给函数：通过引用或者值。修改引用参数具有全局的体现，但是修改值参数仅仅在函数内部有所体现。

在某些编程语言中，比如Visual Basic和Powershell，我们有指定通过引用还是值来传递参数的选项，但JavaScript并没有。
### [值参数](#passing-arguments-by-value)
从技术上讲，JavaScript只能通过值传递。当我们传递一个值参数给函数时，该值会在函数的作用域内创建一个副本。因此，对值的任何更改只会在函数内部有所体现。思考这个示例：
```javascript
var a = 5;
function increment(a) {
    a = ++a;
    console.log(a);
}
increment(a);   // 6
console.log(a);    // 5
```
在这里，修改函数内部的参数对原始值没有影响。因此，在函数外部变量被记录时，打印的值仍然是`5`。
### [引用参数](#passing-arguments-by-reference)
在JavaScript中，一切都是通过值传递的，但是当我们传递一个对象（包含数组）变量时，“值”是对象的引用，更改变量引用对象的属性会更改底层对象。

思考这个函数：
```javascript
function foo(param){
    param.bar = 'new value';
}
obj = {
    bar : 'value'
}
console.log(obj.bar);   // value
foo(obj);
console.log(obj.bar);   // new value
```
正如你所看到的，函数内部的对象属性被修改，但修改后的值在函数外部是可见的。

当我们传递一个非基本值时，如数组或对象，在背后就会创建一个变量并指向内存中的原始对象的位置。然后这个变量传递给函数，并且修改它就会影响到原始对象。
## [类型检查和缺省或额外的参数](#type-checking-and-missing-or-extra-parameters)
在强类型语言中，我们必须在函数声明中指定参数的类型，但是JavaScript缺乏此特性。在JavaScript中，我们传递给函数的参数类型或参数数量都无关紧要。

假设我们有一个只接受一个参数的函数。当我们调用这个函数时，我们无法限制只能传入一个参数，我们可以传递一个，两个或更多参数！我们甚至可以不传入任何参数，并且函数不会报错。

实参和形参的数量有两种不同：
* **实参的数量少于形参**

  缺少的参数将等于`undefined`。
* **实参的数量大于形参**

  额外的参数将被忽略，但是可以通过特殊数组比如变量arguments来检索（稍后讨论）。
## [必要参数](#mandatory-arguments)
如果函数调用时缺省一个参数，那么这个参数将被设置为`undefined`。我们可以利用这种行为，如果省略参数抛出一个错误：
```javascript
function foo(mandatory, optional) {
    if (mandatory === undefined) {
        throw new Error('Missing parameter: mandatory');
    }
}
```
在ECMAScript 6中，我们可以更进一步，使用默认参数来设置必要参数：
```javascript
function throwError() {
    throw new Error('Missing parameter');
}
function foo(param1 = throwError(), param2 = throwError()) {
    // do something
}
foo(10, 20);    // ok
foo(10);   // Error: missing parameter
```
## [参数对象](#arguments-object)
rest参数被添加到ECMAScript 4用来替换`arguments`对象，但是ECMAScript 4没有实现。随着ECMAScript 6的发布，JavaScript现在正式支持rest参数。它还否决了删除`arguments`对象的计划。

`arguments`对象是一个数组对象，可以在所有函数中使用。它允许参数的值通过索引而不是名称传递给函数。该对象允许我们将任何数量的参数传递给函数。思考下面的代码：
```javascript
function checkParams(param1) {
    console.log(param1);    // 2
    console.log(arguments[0], arguments[1]);    // 2 3
    console.log(param1 + arguments[0]);    // 2 + 2
}
checkParams(2, 3);
```
这个函数预计只接受一个参数。当我们使用两个参数调用它时，第一个参数通过参数名称`param1`或者参数对象`arguments[0]`在函数中是可以访问的，但是第二个参数只能通过`arguments[1]`来访问。此外注意，`arguments`对象可以和参数名称一起使用。

`arguments`对象包含传递给函数每个参数的入口，并第一个入口的索引从0开始。如果我们想在上面的示例中访问更多的参数，我们会写`arguments[2]`和`arguments[3]`等。

我们甚至可以完全跳过设置命名参数，仅仅使用`arguments`对象：
```javascript
function checkParams() {
    console.log(arguments[1], arguments[0], arguments[2]);
}
checkParams(2, 4, 6);  // 4 2 6
```
事实上，命名参数是为了方便，而不是必要的。类似地，rest参数也可以用来体现所传递的参数：
```javascript
function checkParams(...params) {
    console.log(params[1], params[0], params[2]);    // 4 2 6
    console.log(arguments[1], arguments[0], arguments[2]);    // 4 2 6
}
checkParams(2, 4, 6);
```
`arguments`对象是一个数组对象，但是它缺少数组的方法，比如`slice()`和`foreach()`。为了在`arguments`对象上使用数组的方法，该对象首先需要转换为一个真正的数组：
```javascript
function sort() {
    var a = Array.prototype.slice.call(arguments);
    return a.sort();
}
sort(40, 20, 50, 30);    // [20, 30, 40, 50]
```
在这个函数中，`Array.prototype.slice.call()`作为一个快速方法将`arguments`对象转换为一个数组。接下来，`sort()`方法排序数组中的项并返回了它。

ECMAScript 6有一个更简单的方法。`Array.from()`是ECMAScript 6中新增的，它可以把一个数组对象创建成一个数组：
```javascript
function sort() {
    var a = Array.from(arguments);
    return a.sort();
}
sort(40, 20, 50, 30);    // [20, 30, 40, 50]
```
## [length属性](#the-length-property)
虽然参数对象不是数组，但是它拥有`length`属性，这可以用来检查传入函数中的参数数量：
```javascript
function countArguments() {
    console.log(arguments.length);
}
countArguments();    // 0
countArguments(10, null, "string");    // 3
```
通过使用`length`属性，我们可以更好的控制传递给函数的参数数量。例如，如果函数需要两个参数工作，我们可以使用`length`属性来检查传入的参数的数量，如果传入的参数数量比预期要少，则抛出错误：
```javascript
function foo(param1, param2) {
    if (arguments.length < 2) {
        throw new Error("This function expects at least two arguments");
    } else if (arguments.length === 2) {
        // do something
    }
}
```
rest参数是数组，所以他们有一个`length`属性。在ECMAScript中6中，前面的代码可以使用rest参数这么来改写：
```javascript
function foo(...params) {
  if (params.length < 2) {
        throw new Error("This function expects at least two arguments");
    } else if (params.length === 2) {
        // do something
    }
}
```
## [callee和caller属性](#the-callee-and-caller-properties)
`callee`属性是指当前正在运行的函数，`caller`是指调用了当前函数的执行函数。在ECMAScript 5严格模式下，这些属性已被废弃，如果尝试访问这些属性会导致类型错误。

`arguments.callee`属性在递归函数（递归函数是指有规律的自己调用自己的函数）中是有用的，尤其是当函数名称不可用（即匿名函数）时。因为匿名函数没有名称，只能通过`arguments.callee`属性调用自己。
```javascript
var result = (function(n) {
  if (n <= 1) {
    return 1;
  } else {
    return n * arguments.callee(n - 1);
  }
})(4);   // 24
```
## [严格模式和非严格模式中的参数对象](#arguments-object-in-strict-and-non-strict-modes)
在ECMAScript 5非严格模式下，`arguments`对象有一个不同寻常特性：它可以与相应的命名参数的值保持同步。

思考下面的代码：
```javascript
function foo(param) {
   console.log(param === arguments[0]);    // true
   arguments[0] = 500;
   console.log(param === arguments[0]);    // true
   return param
}
foo(200);    // 500
```
在这个函数中，一个新值赋给了`arguments[0]`。因为`arguments`的值始终和相应的命名参数保持同步，改变`arguments[0]`的值也将改变`param`的值。事实上，他们像两个不同名称的相同变量。在ECMAScript 5严格模式下，这个令人困惑的`arguments`对象的行为已被删除：
```javascript
"use strict";
function foo(param) {
   console.log(param === arguments[0]);    // true
   arguments[0] = 500;
   console.log(param === arguments[0]);    // false
   return param
}
foo(200);   // 200
```
此时，改变`arguments[0]`并不会影响`param`,并且输出结果和预期的一样。该函数的输出结果在ECMAScript 6中和ECMAScript 5严格模式下是相同的，但是记住，当函数声明中使用默认值时，`arguments`对象并不受影响：
```javascript
function foo(param1, param2 = 10, param3 = 20) {
   console.log(param1 === arguments[0]);    // true
   console.log(param2 === arguments[1]);    // true
   console.log(param3 === arguments[2]);    // false
   console.log(arguments[2]);    // undefined
   console.log(param3);    // 20
}
foo('string1', 'string2');
```
在这个函数中，即使`param3`有默认值，它也和`arguments[2]`不相等，因为只有两个参数传递给了函数。换句话说，设置默认值并不影响`arguments`对象。
## [总结](#conclusion)
ECMAScript 6给JavaScript带来了大大小数以百计的的改进。越来越多的开发者使用ECMAScript 6的特性，很快这些特性不可避免会被使用到。在本教程中，我们已经学会了ECMAScript 6是如何升级JavaScript中的参数应用，但我们仅只是触及了ECMAScript 6的皮毛。语言中其它新的和有趣的特性是值得一看。
### [链接]()
* [ECMAScript 6兼容性表格](https://kangax.github.io/compat-table/es6/), Juriy Zaytsev
* “[ECMAScript 2015语言规范](http://www.ecma-international.org/ecma-262/6.0/),” ECMA International

*封面图片来源：[JS Arguments & Parameters](https://codeburst.io/parameters-arguments-in-javascript-eb1d8bd0ef04)*

* *本文章翻译自[How To Use Arguments And Parameters In ECMAScript 6](https://www.smashingmagazine.com/2016/07/how-to-use-arguments-and-parameters-in-ecmascript-6/)。*
* *本人英文水平有限，翻译不正确不通顺的地方，敬请指出。*
