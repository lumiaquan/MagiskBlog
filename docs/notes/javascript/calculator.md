# 手写一个简易计算器

需求：支持初值输入，支持加减乘除，支持链式调用。

代码实现:
```typescript
type calType = {type:String, value:number}
type calArray = calType[]
class Calculator {
  public initValue;
  constructor(initValue : number) {
    this.initValue = initValue || 0
  }
  optArr:calArray = []

  addOpt = (type:String, value:number) => {
    const opt:calType = {type, value}
    this.optArr.push(opt)
  }

  increase = (num:number) => {
    this.addOpt('increase', num)
    return this
  }

  decrease = (num:number) => {
    this.addOpt('decrease', num)
    return this
  }

  multiple = (num:number) => {
    this.addOpt('multiple', num)
    return this
  }

  division = (num:number) => {
    this.addOpt('division', num)
    return this
  }

  calculate = () => {
    this.initValue = this.optArr.reduce((pre, cur:calType) => {
      switch (cur.type) {
        case 'increase':
          pre = pre + cur.value
          break
        case 'decrease':
          pre = pre - cur.value
          break
        case 'multiple':
          pre = pre * cur.value
          break
        case 'division':
          pre = pre / cur.value
          break
        default:
          break
      }
      return pre
    }, this.initValue)
    return this
  }
}

const myCalculator = new Calculator(1)
console.log(myCalculator.increase(5).multiple(8).decrease(8).division(3).calculate().initValue)
```
