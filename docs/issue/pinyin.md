# 拼音模糊搜索组件pinyinmatch

## 安装
```bash
npm i pinyinmatch --save
```

## 引入
```js
import PinyinMatch from 'pinyin-match'
```

## 封装模糊查询函数
```js
export const fuzzySearch = (query, allOptions) => {
  if (query) {
    return allOptions.filter(item => {
      const match = PinyinMatch.match(item.name, query)
      return !!match
    })
  } else {
    return allOptions
  }
}
```
