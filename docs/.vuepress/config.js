module.exports = {
  // base: "/kehuanxianshi/",
  title: '科幻现实',
  description: '科幻工作的技术分享 现实生活的人生思考',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    ['link', { rel: 'apple-touch-icon', href: '/homescreen144.png' }],
    [
      'meta',
      { name: 'msapplication-TileImage', content: '/homescreen144.png' },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }],
    ['meta', { name: 'renderer', content: 'webkit' }],
    ['meta', { name: 'force-rendering', content: 'webkit' }],
    ['meta', { name: 'applicable-device', content: 'pc,mobile' }],
  ],
  locales: { '/': { lang: 'zh-CN' } },
  theme: 'ououe',
  themeConfig: {
    logo: '',
    cover: {
      base: '/images/cover.jpg',
      '/work/': '/images/work.jpg',
      '/life/': '/images/life.jpg',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '工作', link: '/work/' },
      { text: '生活', link: '/life/' },
      { text: '关于', link: '/about/' },
    ],
    footer: [
      { text: '京ICP备15040086号', link: 'http://www.beian.miit.gov.cn' },
    ],
    postTime: {
      createTime: '创建时间',
      lastUpdated: '最后修改',
    },
    backgroundImage: false,
    // defaultTheme: { light: [6, 18], dark: [18, 6] },
    showThemeButton: false,
    useVssue: true,
  },
  // 当你使用 defaultTheme 时，你需要增加一个如下的 postcss 插件
  postcss: {
    plugins: [
      require('css-prefers-color-scheme/postcss'),
      require('postcss-propro'),
      require('postcss-flex-alias'),
      require('autoprefixer'),
    ],
  },
  plugins: [
    [
      '@vssue/vuepress-plugin-vssue',
      {
        platform: 'github',
        owner: 'mishengqiang',
        repo: 'kehuanxianshi',
        clientId: 'd730c138b9e5aba08351',
        clientSecret: '284228b35f01a6f81923651522312fa969d685b6',
      },
    ],
    [
      'sitemap',
      {
        hostname: 'http://www.kehuanxianshi.com/',
        changefreq: 'weekly',
      },
    ],
    [
      '@vuepress/pwa',
      {
        updatePopup: {
          message: '有新的文章发布',
          buttonText: '刷新',
        },
      },
    ],
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-162290321-2',
      },
    ],
  ],
};
