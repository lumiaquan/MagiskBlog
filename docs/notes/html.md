# HTML相关笔记

## html反转义查询表
```js
const HTML_DECODE = {
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
  '&nbsp;': ' ',
  '&quot;': '"',
  '&copy;': '©'
}
```

## 如何防止网页自动翻译更改中文

在一些项目中我们希望网页的中文内容不被浏览器自动翻译，可以在`<html>`标签中添加`lang`属性，如下：

```html
<html lang="zh-CN">
 ...
</html>
```
