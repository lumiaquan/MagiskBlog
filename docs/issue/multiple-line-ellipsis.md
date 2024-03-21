# 最后一行ellipsis

&emsp; 我们在开发中遇到多行文本需要溢出隐藏时都会使用`overflow: hiddebn;`和`text-overflow: ellipsis;`来处理。   
&emsp; 但是如果需求是多行文本的最后一行只显示部分文本，要留出空间展示其他dom时，使用上述css样式并不能解决问题。:upside_down_face:

&emsp; 例如下面的案例：

![An image](/issue/ellipsis-bug-pic.png)

我们可以发现下面的盒子中的文本溢出了盒子，同时复制的icon并未正常显示。这是因为我们使用了`overflow: hidden;`和`text-overflow: ellipsis;`导致的。

## 思路一
- 利用绝对定位，将复制icon放在文本的末尾。
- 但是这样的话，复制icon会遮挡文本，会出现有的字母只显示一半的情况，并不美观。

## 思路二
- 通过js来直接截取容器可以显示的文本长度，然后加上省略号。

&emsp; 要省略最后一行文本，那么我们首先得知道div中的内容是否已经超出了显示的范围。这个时候我们可以使用`scrollHeight`和`clientHeight`来判断。  
&emsp;因为是直接操作dom，我们可以使用`vue`的自定义指令来实现。

```javascript
export const lastLineEllipsis = {
  inserted(el, binding) {
    if (el.scrollHeight > el.clientHeight) {
      console.log('文本溢出了')
    }
  }
}
```
- 接下来我们手动截取文本，然后加上省略号。  
&emsp;由于每个字母的宽度不一样，所以我们需要估算一个范围来截取文本（这里根据实际场景中的`div`宽度测试就可以得到）。  
&emsp;通过使用`for`循环，我们只要找到`scrollHeight` <= `clientHeight` 的情况，就可以满足文本+省略号+icon同时显示的需求了。  

```javascript
export const lastLineEllipsis = {
  inserted(el, binding) {
    if (el.scrollHeight > el.clientHeight) {
      const dom = el.getElementsByClassName('name-span')[0]
      if (dom) {
        for (let i = 102; i > 70; i--) {
          dom.innerText = dom.innerText.substring(0, i) + '...'
          if (el.scrollHeight <= el.clientHeight) {
            break
          }
        }
      }
    }
  }
}
```
&emsp;实现效果如下：

![An image](/issue/ellipsis-pic.png)

::: warning
值得注意的是，这里的指令用的是`inserted`，所以只有在页面加载的时候才会执行。如果需要在页面resize的时候也执行，可以使用`bind`和`update`。当然如果用的是虚拟表格，可以使用`componentUpdated`钩子。
:::



