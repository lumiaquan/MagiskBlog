import { notesRoutes } from './router/notes.js'
import { issueRoutes } from './router/issue'

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
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present MagiskQ'
    },
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
      '/notes/': notesRoutes,
      '/issue/': issueRoutes
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
