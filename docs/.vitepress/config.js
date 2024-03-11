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
    logo: 'https://s4.aconvert.com/convert/p3r68-cdx67/aqv6j-ss7ry.svg',
    // siteTitle: false
    nav: [
      { text: '笔记', link: '/notes/', activeMatch: '/notes/' },
      { text: '业务相关', link: '/issue/', activeMatch: '/issue/' },
      { text: 'Github', link: 'https://github.com/lumiaquan' }
    ],
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebar: {
      '/notes/': [
        {
          text: 'html',
          link: '/notes/html'
        },
        {
          text: 'vue',
          link: '/notes/vue'
        },
        {
          text: 'javascript',
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: '通过路径修改对象的值',
              link: '/notes/javascript/set-value-by-path'
            }
          ]
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
