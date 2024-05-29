# externals

## 1. 什么是externals

externals 是 webpack 的一个配置项，用于指定不需要打包的模块，同时需要在外部环境中引入。这样可以大大减少打包后文件的体积，加快打包速度。

## 2. 使用场景
当项目中存在一些体积较大的第三方库时，可以使用 externals 将这些库从打包文件中剔除，通过 CDN 引入的方式加载。从而减少打包体积，加快打包速度。

## 3. 配置方式

vue.config.js
```javascript
module.exports = {
  configureWebpack: {
    externals: {
      'vue': 'Vue'
    }
  }
}
```

index.html加入相应的script标签
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
```

## 4.效果

配置前：
![An image](/notes/no-externals.png)

配置后：
![An image](/notes/after-externals.png)

## 5. 注意事项

尽量使用官方的 CDN 地址，以保证版本的稳定性。
