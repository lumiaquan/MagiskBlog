# 埋点

## 埋点类型：

根据埋点的数据获取方式，分为以下几种：
- 页面埋点：统计用户每个页面浏览次数（PV），用户浏览量（UV），停留时间等数据；  
- 交互埋点：统计用户点击按钮、滚动、hover等行为；  
- 曝光埋点：统计某个元素进入在可视区域的次数、时长、停留时间等数据。  

## 页面埋点：

:::tip
由于记录的数据与页面绑定，可将埋点逻辑写在beforeRouterEnter生命周期函数中；
:::

```js
beforeRouteEnter(to, from, next) {
    // 从review url进入进行数据埋点
    const { projectId, taskId, taskIdList, svnPath } = to.query
    if (projectId && ((taskId && svnPath) || taskIdList)) {
      console.log('开始埋点')
    }
    next()
}
```

## 交互埋点：

::: tip 
由于交互需要监听具体的事件来触发，可以采用自定义指令的形式，在dom初次渲染的时候绑定交互事件；
:::

bury.js
```js
// 埋点指令
export const bury = {
  bind: (el, binding, vNode) => {
    const { value, arg, modifiers } = binding
    const modifiersList = Object.keys(modifiers)

    el.__clickEvent__ = buryHandler(modifiersList, value, arg, vNode)
    el.addEventListener('click', el.__clickEvent__)
  },
  // 销毁前解绑监听事件
  unbind: (el, binding) => {
    if (el.__clickEvent__) {
      el.removeEventListener('click', el.__clickEvent__)
      delete el.__clickEvent__
    }
  }
}

const buryHandler = (modifiersList, value, arg, vNode) => {
  return (e) => {
    let breakFlag = false
    modifiersList.length && modifiersList.forEach((key) => {
      switch (key) {
        case 'stop':
          e.stopPropagation()
          break
        case 'prevent':
          e.preventDefault()
          break
        case 'native':
          // 针对部分elementUI组件点击事件触发两次，传递触发的标签名保证只触发一次点击埋点事件
          if (!modifiersList.includes(e.target.tagName.toLowerCase())) {
            breakFlag = true
          }
          break
        default:
          break
      }
    })
    if (breakFlag || !Object.keys(value).length) return
    const { trigger, current } = value
    // trigger 触发类型
    if (trigger === 'click') {
      // 点击埋点上传
    } else if (trigger === 'view') {
      // 浏览埋点上传
    }
  }
}
```

## 曝光埋点：

::: tip
通过IntersectionObserver监听dom进入可视区域，回调函数进行数据上报
:::

exposure.js
```js
export const exposure = {
  bind: (el, binding, vNode) => {
    const options = {
      root: document.querySelector('body'),
      rootMargin: '0px', 
      threshold: 1
    }
    const observer = new IntersectionObserver(() => {
      // 上报数据
    }, options)
    el.__io__ = observer
    observer.observe(el)
  },
  unbind: (el) => {
    el.__io__ && el.__io__.unobserve(el)
  }
}
```