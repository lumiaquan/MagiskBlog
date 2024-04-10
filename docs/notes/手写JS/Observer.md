# 发布订阅与观察者模式

## 发布订阅模式

```javascript
class useEventbus {
  // 事件池
  constructor() {
    this.events = {}
  }

  // 订阅函数
  $on = (name, callback) => {
    if (this.events[name]) {
      this.events[name].push(callback)
    } else {
      this.events[name] = [callback]
    }
  }

  // 只订阅一次的事件
  $once = (name, callback) => {
    const fn = (...args) => {
      callback(...args)
      this.$off(name, callback)
    }
    this.$on(name, callback)
  }

  // 发布函数
  $emit = (name, ...args) => {
    this.events[name] && this.events[name].forEach(callback => {
      callback(...args)
    })
  }

  // 取消订阅
  $off = (name, callback) => {
    if (!this.events[name]) return
    this.events[name] = this.events[name].filter(cb => cb !== callback)
  }
}

export const eventbus = new useEventbus()
```


## 观察者模式

```javascript
class Observer {
  // 收到主题更新时的操作
  update(...args) {
    console.log('Received update: ' + args)
  }
}

class Subject {
  constructor() {
    this.observers = []
  }

  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer)
  }

  // 通知所有观察者
  notify(...args) {
    this.observers.forEach(ob => {
      ob.update(...args)
    })
  }
}
```
