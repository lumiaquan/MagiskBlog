# 高亮代码块

## 开发内容：

将代码数据展示成高亮代码块，包括错误行个性化展示、行号显示等定制化需求；

## 选型一：codemirror

::: tip 符合条件:tada:
流行前端代码编辑器，自带行号，多种主题，多语言识别。
:::

### 实际落地代码：

- template
```vue
<codemirror
  v-if="detailData.correctCase"
  v-model="detailData.correctCase"
  class="code"
  :options="cmOptions(1, detailData.languageId)"
/>
```

- script
```vue
<script>
import { codemirror } from 'vue-codemirror'
import '@/utils/codeMirrorDep'

export default {
  method: {
    cmOptions(firstLineNumber = 1, languageId = 1) {
      return {
        tabSize: 2, // tab的空格个数
        lineSeparator: '\n',
        theme: 'eclipse', // 主题样式
        lineNumbers: true, // 是否显示行数
        lineWrapping: false, // 是否自动换行
        styleActiveLine: false, // line选择是是否加亮
        matchBrackets: false, // 括号匹配
        mode: languageIdMapReverse[languageId], // 语言
        readOnly: true, // 只读
        firstLineNumber
      }
    },
    // 标记错误行，滚动到对应位置
    markErrorLine(index) {
      setTimeout(() => {
        // 给问题行加波浪线
        const item = this.detailData.matterFileList[index]
        // const codeLines = blocks.childNodes
        const codeLines = document.querySelectorAll('.hljs-line')
        // 开始行数
        const start = ((item.line - 1) < 0) ? 0 : item.line - 1
        // 结束行数
        const end = ((item.endLine - 1) < 0) ? 0 : item.endLine - 1
        for (let i = start; i <= end; i++) {
          if (codeLines[i]) {
            codeLines[i].classList.add('error-line')
          }
        }
        const messageDom = document.createElement('div')
        messageDom.classList.add('message-block')
        messageDom.innerHTML = `<div class="inner-content">${item.message}</div>`
        codeLines[end].appendChild(messageDom)
        const container = document.querySelector('.problem-location')
        const startHeight = codeLines[start].offsetTop
        const containerHeight = container.offsetHeight
        if (startHeight > containerHeight / 2) {
          container.scrollTo({
            top: startHeight - containerHeight / 2,
            behavior: 'smooth'
          })
        }
        if (container.scrollTop > startHeight) {
          if (startHeight <= containerHeight / 2) {
            container.scrollTo({
              top: 0,
              behavior: 'smooth'
            })
          } else {
            container.scrollTo({
              top: startHeight - containerHeight / 2,
              behavior: 'smooth'
            })
          }
        }
      })
    }
  }
}
</script>
```

- 依赖 dep.js

```js
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/keymap/sublime' // sublime编辑器效果
import 'codemirror/mode/vue/vue.js' // 配置里面也需要mode设置为vue
import 'codemirror/addon/selection/active-line' // 光标行背景高亮，配置里面也需要styleActiveLine设置为true
require('codemirror/mode/python/python.js')
require('codemirror/mode/lua/lua.js')
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/xml-fold.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/comment-fold.js')
```  
  
::: danger 弃用原因 :cold_sweat:
编辑器有一层光标选择层，当自定义内部dom时，复制内容会错位。
:::

## 选型二：highlight.js

::: tip 自由度更高 :smiley:
由于codemirror的限制，所以选择高度自由的highlight.js
:::

### 方案1：

1. 先使用highlight方法将代码转换成html片段

```js
const highlightedCode = hljs.highlight('python', this.code).value
```

2. 将高亮的代码按行分割

```js
const lines = highlightedCode.split('\n')
```

3. 为每一行代码添加行号

```js
const highlightedLines = lines.map(function(line) {
  num++
  return `<div class="hljs-line"><div class="line-num">${num}</div>` + `<span class="code-content">${line}</span>` + '</div>'
})
```

4. 将高亮的代码html片段插入到dom中

```js
const dom = document.querySelector('.code-hljs')
hljs.highlightElement(dom)
document.querySelector('.code-hljs').innerHTML = '<div class="number-container"></div><code>' + highlightedLines.join('\n') + '</code>'
```

### 方案2：
1. 将代码数据用split('/n')方法分割成数组
2. 在错误行添加error属性
3. 用v-for渲染pre和code元素
4. 使用highlightElement方法高亮所有code元素