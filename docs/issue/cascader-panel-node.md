# 记一次 el-cascader-panel 组件的使用问题

## 问题描述
当el-cascader-panel中绑定的options数据长度较大时，会导致页面卡顿，从而影响用户体验。

## 问题分析
::: tip
前端遇到数据量大产生的卡顿问题，我们一般通过懒加载的方式来解决。
:::
于是我就着手将el-cascader-panel组件的options数据改为懒加载的方式。

在实际开发中，我发现el-cascader-panel组件并没有提供懒加载的方法，而且提供的方法和事件也不够灵活，无法满足我的需求。

于是我便将整个el-cascader-panel组件的源码拷贝到项目中，进行修改。

![An image](/issue/cascader-panel.jpg)

## 1、懒加载改造

在cascader-menu中，监听滚动事件，当滚动到底部时，加载更多数据。
```javascript
function  initEvent() {
  if (this.index === 1) {
    const wrap = this.$refs['menu-scrollbar'].wrap
    wrap.addEventListener('scroll', () => {
      const list = wrap.querySelector('.el-cascader-menu__list')
      const scrollTop = _.cloneDeep(this.scrollTop)
      scrollTop[this.rootIndex] = wrap.scrollTop
      this.$emit('update:scrollTop', scrollTop)
      if (list.clientHeight - wrap.clientHeight - wrap.scrollTop < 1) {
        if (this.nodes.length > 0) {
          const temp = _.cloneDeep(this.showCount)
          temp[this.rootIndex] += 10
          this.$emit('update:showCount', temp)
        }
      }
    })
  } else {
    const wrap = this.$refs['menu-scrollbar'].wrap
    const lis = wrap.querySelectorAll('li')
    if (lis) {
      lis.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
          this.$emit('update:rootIndex', index)
          if (this.hoverIndex !== index && !this.scrollTop[index]) {
            this.$parent.scrollIntoView()
          }
          this.hoverIndex = index
        })
      })
    }
  }
}
```

在修改源码过程中，我发现，每次hover到一个menu时，都会将滚动条滚动到顶部，这样会导致用户体验不好。
![An image](/issue/scrollMethod.jpg)

于是我将滚动条滚动到顶部的方法注释掉，这样就不会出现滚动条滚动到顶部的情况了。
![An image](/issue/panel-disabled-scroll.png)

::: danger 缺陷
完成懒加载改造之后，确实提升了滚动时的用户体验，但是在数据量较大时，还是会有初次渲染卡顿的情况。
经过排查，发现是因为节点处理函数的问题。
:::

## 2、节点处理函数优化

使用console.time()和console.timeEnd()来查看节点处理函数的耗时。发现最耗时的函数是
```javascript
node.syncCheckState(this.checkedValue)
```

这个函数是判断节点是否选中的函数，当数据量较大时，会导致页面卡顿。

因为需要检查到每个节点，所以我将节点分批处理，同时使用requestIdleCallback()来优化。

![An image](/issue/chunk-nodes.png)

## 3、完结撒花 :tada:
大概从7秒优化到了200ms，用户体验得到了很大的提升~~~

