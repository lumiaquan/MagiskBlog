# hard source webpack plugin

## 简述

::: warning worry
本地开发时，每次冷启动项目总是需要等待很长的编译时间，而且这个时间和项目的体积成正比。
:::
`hard source webpack plugin`就可以很好地解决这个烦恼。:tada:

## 安装

```bash
npm i hard source webpack plugin --save
```

## 配置

vue.config.js
```javascript
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new HardSourceWebpackPlugin()
    ]
  }
}
```
## 效果

第一次编译之后，就会生成本地缓存
![An image](/notes/hardsource.png)

之后运行`npm run dev`则会优先获取本地缓存，提升构建速度90%以上！
