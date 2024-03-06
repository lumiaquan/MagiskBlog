# 使用 Fuse.js 实现前端模糊搜索

## 安装

```bash
npm install fuse.js
# 或者
yarn add fuse.js
```

## 局部引入

```js

import Fuse from 'fuse.js'
```

## 初始化fuse实例

```js
// list为被搜索的数组
this.fuse = new Fuse(list, {
  keys: ['name'] // keys数组是需要搜索的字段，可以配置权重
})
```

## 实现模糊搜索

```js
const searchFuse = (query) => {
  return this.fuse.search(query)
}
```
