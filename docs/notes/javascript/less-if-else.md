# 在代码中使用更少的if-else语句

&emsp; &emsp; 在平时的业务代码中，我们经常会看到大量的`if-else`语句，这些语句会让代码变得难以阅读和维护:joy:。在这篇文章中，我将介绍一些技巧，帮助你在代码中使用更少的`if-else`语句。:smiley:

## 1. 使用三元运算符
如果是简单的条件判断，我们可以使用三元运算符来代替`if-else`语句。例如：
```javascript
// 改造前
let result;
if (condition) {
  result = value1;
} else {
  result = value2;
}

// 改造后
const result = condition ? value1 : value2;
```

## 2. 逻辑运算符
如果是单个条件判断，我们可以使用逻辑运算符来代替`if-else`语句。例如：
```javascript
// 改造前
if (condition1) {
  this.handleFn()
}

// 改造后
condition1 && this.handleFn()
```

## 3. 使用Map
如果是多个条件判断，我们还可以使用`Map`来代替`if-else`语句。例如：
```javascript
// 改造前
function getResult(params) {
  if (params===1) {
    return value1;
  } else if (params===2) {
    return value2;
  } else if (params===3) {
    return value3;
  }
}


// 改造后
function getResult(params) {
  const map = new Map([
    [1, value1],
    [2, value2],
    [3, value3]
  ]);
  return map.get(params);
}
```

## 4. 提前return
如果是同层级的`if-else`有且只有两种情况，我们可以使用提前`return`来代替`if-else`语句。例如：
```javascript
// 改造前
if(condition) {
  //...业务代码
} else {
  // ...业务代码
}

// 改造后
if(condition) {
  //...业务代码
  return;
}
// ...业务代码
```
::: tip
提前`return`的方式可以减少代码的嵌套，让代码更加清晰。建议将业务代码较少的部分放在`if`条件中，这样可读性更好。:tada:
:::

