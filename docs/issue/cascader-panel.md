# el-cascader-panel 通过js手动选中、取消选中节点

```js
// 选中
this.$refs.myCascader.getNodeByValue(value).doCheck(true)
// 取消选中 
this.$refs.myCascader.getNodeByValue(value).doCheck(false)

这里需要重新计算当前选中节点，不然样式不会改变
this.$refs.myCascader.calculateMultiCheckedValue()
```