# 版本检测及自动刷新

:::tip 
每次项目的测试阶段都会产生qa和pm与我电脑上的代码版本不一致的情况，大概率是他们没有刷新网页。为了避免这种频繁的无效沟通，我决定写一个版本检测的功能，如果版本不一致，就强制自动刷新页面。
:::
## 实现思路
每次打包时就以当前时间戳为版本号，将版本号写入到version.json文件中，然后在每次切换路由时去请求这个文件，拿到最新的版本号，与当前版本号进行比较，如果不一致就强制刷新页面。

## 实现步骤
1. 在package.json中添加写入版本号的脚本

考虑到方便请求version.json文件和不被压缩打包，所以将version.json文件放在public目录下。
````javascript
const fs = require('fs')

fs.writeFileSync('public/version.json', JSON.stringify({ version: Date.now() }))
````

2. 在src/utils目录下新建version.js文件

```javascript
import axios from 'axios'
import { getLocal, setLocal } from '@/utils/storage'
import { BASE_URL } from '@/api'
const key = 'PROJECT_VERSION'

// 获取版本号
export function getVersion() {
  const url = `${BASE_URL}/version.json`
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res.data?.version)
    }).catch(e => {
      resolve(false)
    })
  })
}

// 检查版本号
export function checkVersion(remoteVersion) {
  // console.log('remoteVersion', remoteVersion)
  const localVersion = getLocal(key)
  // 保存最新版本号
  setLocal(key, remoteVersion)
  // 没有本地版本号即为第一次访问，无需比较
  if (!localVersion) return
  // 有本地版本号，比较版本号
  if (remoteVersion !== localVersion) {
    // 版本号不一致，需要重新加载页面
    window.location.reload(true)
  }
}
```

3. 在路由守卫中调用checkVersion方法

```javascript
import { checkVersion, getVersion } from '@/utils/version'

router.afterEach((to, from) => {
  // 检查版本号，放在afterEach中，保证每次刷新页面时保持当前路由
  setTimeout(() => {
    getVersion().then(version => {
      if (version) {
        checkVersion(version)
      }
    })
  }, 100)
})
```
## 遇到的问题

- 最开始我将检查版本号的方法放在了beforeEach中，但是这样会在用户点击其他路由的时候退回到之前的路由进行页面刷新，感觉像是个bug，体验很差。所以我将检查版本号的方法放在了afterEach中，这样就不会出现这个问题了。


