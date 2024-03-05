module.exports = {
  title: 'Magsik Blog',
  description: 'First create a blog',
  markdown: {
    lineNumbers: true,
    toc: true,
    anchor: true,
  },
  themeConfig: {
    logo: 'https://s4.aconvert.com/convert/p3r68-cdx67/aqv6j-ss7ry.svg',
    // siteTitle: false
    nav: [
      { text: '笔记', link: '/notes/', activeMatch: '/notes/' },
      { text: '分类', link: '/category/', activeMatch: '/category/' },
      { text: 'Github', link: 'https://github.com/lumiaquan' }
    ],
    sidebar: {
      '/notes/': [
        {
          text: 'vue',
          link: '/notes/vue'
        }
      ],
      '/category/': [
        {
          text: '开发遇到的问题',
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: 'small issue',
              link: '/category/smallIssue'
            },
            {
              text: 'big issue',
              link: '/category/bigIssue'
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