# vue3新特性 `defineModel()`

&emsp;&emsp;在传统的父子组件通信时，我们通常使用 `props` 和 `emit` 来实现，但是这种方式在一些场景下会显得不够优雅，比如在多层嵌套的组件中，我们需要将 `props` 一层层传递下去，这样会使得代码变得复杂，而 `defineModel` 就是为了解决这个问题而生的。

## `defineModel()`用法

这个宏可以用来声明一个双向绑定的prop，通过父组件v-model来使用。

在底层，这个宏声明了一个prop：`modelValue`，并声明了一个名为`update:modelValue`的事件。

- 由于他声明的是一个prop，所以我们可以给他设置类型和默认值。

```javascript
const model = defineModel({
    type: String,
    default: 'hello'
})
```

- v-model可以接受参数，相应的可以在defineModel中设置接收参数的名字。

```javascript
// 父组件
<Child v-model:msg="parentMsg" />

// 子组件
const msg = defineModel('msg')

```
## 与传统写法对比

- 传统写法

```vue
// 父组件
<template>
  <son v-model="msg" />
</template>

<script>
  const msg = ref('hello')
</script>
```

```vue
// 子组件
<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
  <grand-son v-model="modelValue"/>
</template>
<script>
  const props = defineProps({
    modelValue: String
  })
</script>
```

```vue
// 孙组件
<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
</template>
<script>
  const props = defineProps({
    modelValue: String
  })
</script>
```

::: warning 缺点
每传递一次都要复写modelValue参数接收和update事件，代码显得冗余。
:::

- 使用defineModel

```vue
// 父组件
<template>
  <son v-model="msg" />
</template>

<script>
  const msg = ref('hello')
</script>
```

```vue
// 子组件
<template>
  <input v-model="msg"/>
  <grand-son v-model="msg"/>
</template>
<script>
  const msg = defineProps()
</script>
```

```vue
// 孙组件
<template>
  <input v-model="msg"/>
</template>
<script>
  const msg = defineModel()
</script>
```
::: tip 效果
使用defineModel后，代码变得简洁，不需要重复写modelValue参数接收和update事件。
:::
