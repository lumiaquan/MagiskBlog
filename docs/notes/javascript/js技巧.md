# js实用技巧

## 1.认识`flatMap`

数组扁平化一般使用`map` + `flat`的方式，但是`flatMap`可以一次性完成这两个操作。

- 先看 `map` + `flat`的方式

```javascript
const arr = [1, [2,3], [4,5,6], 7];
const res = arr.map(item => Array.isArray(item) ? item : [item]).flat();
```

- 再看`flatMap`的方式

```javascript
const arr = [1, [2,3], [4,5,6], 7];
const res = arr.flatMap(item => item);
```

## 2. 充分利用`reduce`方法   

`reduce`方法是一个非常强大的方法，可以用来实现很多功能，比如**数组去重**、**数组扁平化**、**数组分组**等。   

- `reduce`实现数组去重：

```javascript
const arr = [1, 2, 3, 4, 4, 5, 5, 6, 6, 7];
const res = arr.reduce((acc, cur) => {
  if (!acc.includes(cur)) {
    acc.push(cur);
  }
  return acc;
}, []);
```
- `reduce`实现数组扁平化：

```javascript
const arr = [1, [2,3], [4,5,6], 7];
const res = arr.reduce((acc, cur) => {
  if(Array.isArray(cur)) {
    acc = acc.concat(cur);
  } else {
    acc.push(cur);
  }
  return acc;
}, [])
```
- `reduce`实现数组分组：

```javascript
const arr = [
  {name: 'a', age: 20},
  {name: 'b', age: 20},
  {name: 'c', age: 30},
  {name: 'd', age: 30},
  {name: 'e', age: 40},
];
const res = arr.reduce((acc, cur) => {
  const key = cur.age;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(cur);
  return acc;
}, {});
```

## 3. `console`的不同方法

```javascript
// 一般我们只会使用console.log方法，但是console还有很多其他方法

// 1. 当我们需要测量一段代码的执行时间时，可以使用console.time和console.timeEnd方法
console.time('test');
for (let i = 0; i < 100000; i++) {
  // do something
}
console.timeEnd('test');

// 2. 当我们需要输出一条警告信息时，可以使用console.warn方法
console.warn('This is a warning message');

// 3. 当我们需要输出dom元素的属性时，可以使用console.dir方法
const div = document.querySelector('div');
console.dir(div);

// 4. 当我们需要输出一个对象的详细信息时，可以使用console.table方法
const obj = {a: 1}
console.table(obj);

// 5. 当我们需要记录特定的代码执行次数时，可以使用console.count方法
for (let i = 0; i < 10; i++) {
  if(i % 2 === 0) {
    console.count('偶数');
  } else {
    console.count('奇数');
  }
}

// 6. 测试代码的性能
console.profile('profileTest');
for (let i = 0; i < 100000; i++) {
  // do something
}
console.profileEnd('profileTest');
```
## 4. `structuredClone`深拷贝

一般我们在需要深拷贝一个对象时会有以下几种方法：`JSON.parse(JSON.stringify(obj))`、`lodash.cloneDeep(obj)`、**手写递归函数**等。

::: danger 缺点
使用`JSON`进行深拷贝时，会有以下几个问题：无法拷贝函数、正则表达式、undefined等。:cry:
:::

现在有一个新的方法`structuredClone`可以解决这个问题，而且是浏览器的全局方法，使用起来非常方便。

:rotating_light:**注意**：从2022年3月开始，`structuredClone`方法已经被标准化，可以用来进行深拷贝，但**老版本的浏览器可能不支持**。:clown_face:

```javascript
const obj = {a: 1, b: {c: 2}};
const a = structuredClone(obj)
obj.b.c = 3
console.log(a.b.c) // 2
```

## 5. 空合并运算符 ??

`??`是一个新的运算符，用来判断一个值是否为`null`或者`undefined`，如果是的话就返回右侧操作数。

```javascript
const a = null
const b = undefined
const c = ''
const d = false
console.log(a??c) // ''
console.log(b??c) // ''
console.log(a??d) // false
console.log(b??d) // false
```
:pilot:  
相比较于`||`，`??`只有在左侧的值为`null`或者`undefined`时才会返回右侧的值，而`||`只要左侧的值隐式转换后为`false`就会返回右侧的值。

```javascript
const a = 0
const b= ''
const c = null
console.log(a||c) // null
console.log(a??c) // 0
console.log(b||c) // null
console.log(b??c) // ''
```




