# 通过路径修改对象的值

::: tip 问题前瞻
在 JavaScript 中，我们经常需要通过路径修改对象的值。这个问题是一个很常见的问题，但是在 JavaScript 中并没有一个内置的方法来解决这个问题。在这篇文章中，我们将会讨论如何通过路径修改对象的值。
:::

两种常见的方法是：
1. object.path1.path2 = newValue
2. object[path1][path2] = newValue 

::: warning 风险提示
当路径的长度不确定，而且路径是动态的时候，这两种方法就不适用了。在这种情况下，我们需要一个更通用的方法来解决这个问题。
:::

1. 如果需要被修改的对象是obj: {a:{b:{c:1}}},需要修改的是c的值，即我们拿到对象b就可以完成修改 
2. 沿着这个思路，我们可以通过使用reduce方法来实现这个功能

```javascript
/**
 * @function 通过路径修改对象的值
 * @param obj {Object} 需要修改的对象
 * @param path {Array,String} 路径
 * @param newValue {Any} 新的值
 *
 */
function setValueByPath(obj, path, newValue) {
  const paths = Array.isArray(path) ? path : path.split('.');
  paths.reduce((acc, key, index) => {
    if (index === paths.length - 1) {
      acc[key] = newValue;
    } else {
      if (!acc[key]) {
        acc[key] = {};
      }
    }
    return acc[key];
  }, obj);
}
```
