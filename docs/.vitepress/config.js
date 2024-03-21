module.exports = {
  title: 'Magsik Blog',
  description: 'dq的个人博客',
  markdown: {
    lineNumbers: true,
    toc: true,
    anchor: true,
  },
  base: '/MagiskBlog/',
  themeConfig: {
    logo: '/logo.png',
    siteTitle: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lumiaquan' },
    ],
    nav: [
      { text: '笔记', link: '/notes/', activeMatch: '/notes/' },
      { text: '业务相关', link: '/issue/', activeMatch: '/issue/' }
    ],
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebar: {
      '/notes/': [
        {
          text: 'javascript',
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: '通过路径修改对象的值',
              link: '/notes/javascript/set-value-by-path'
            },
            {
              text: 'js实用技巧',
              link: '/notes/javascript/js技巧'
            },
            {
              text: '在代码如何减少if-else的使用',
              link: '/notes/javascript/less-if-else'
            }
          ]
        },
        {
          text: 'html',
          link: '/notes/html'
        },
        {
          text: 'vue',
          link: '/notes/vue'
        }
      ],
      '/issue/': [
        {
          text: '开发遇到的问题',
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: 'el-cascader-panel 通过js手动选中、取消选中节点',
              link: '/issue/cascader-panel'
            },
            {
              text: '使用 Fuse.js 实现前端模糊搜索',
              link: '/issue/fuse'
            },
            {
              text: '拼音模糊搜索组件pinyinmatch',
              link: '/issue/pinyin'
            },
            {
              text: '高亮代码块',
              link: '/issue/highlight'
            },
            {
              text: '埋点',
              link: '/issue/buried-point'
            }
          ]
        }
      ]
    },
    lastUpdated: {
      text: '最后更新于：',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
}
