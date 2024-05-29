# 使用`style-resources-loader`优化less文件引入

## 前言

&emsp;&emsp;由于less和sass支持css变量，我们会把项目中常用到的样式声明为变量，然后在less或sass文件中引入，这样可以减少样式文件的重复代码，提高代码的可维护性。

&emsp;&emsp;但是在webpack中引入less或sass文件时，需要在每个文件中引入变量文件，这样会导致每个文件都引入一次变量文件，增加了文件的体积。:cry:
::: tip
`style-resources-loader`可以解决这个问题，它可以在webpack中配置，使得在每个less或sass文件中都可以引入变量文件，而不需要在每个文件中引入一次。
:::

## 安装
```bash
npm i style-resources-loader --save-dev
```

## 使用

### vue.config.js配置
```javascript
module.exports =  {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/styles/_variables.less'),
        path.resolve(__dirname, './src/styles/_mixins.less')
      ]
    }
  }
}
```

## 注意事项

需要提前安装好less-loader和less

