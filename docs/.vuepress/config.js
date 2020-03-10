module.exports = {
  title: "科幻现实",
  description: "科幻工作的技术分享 现实生活的人生思考",
  theme: "ououe",
  themeConfig: {
    logo: "",
    cover: {
      base: "/images/cover.jpg",
      "/work/": "/images/work.jpg",
      "/life/": "/images/life.jpg"
    },
    nav: [
      { text: "主页", link: "/" },
      { text: "工作", link: "/work/" },
      { text: "生活", link: "/life/" },
      { text: "关于", link: "/about/" }
    ],
    footer: [
      { text: "京ICP备15040086号", link: "http://www.beian.miit.gov.cn" }
    ],
    locales: { "/": { lang: "zh-CN" } },
    postTime: {
      createTime: "创建时间",
      lastUpdated: "最后修改"
    },
    backgroundImage: false,
    // defaultTheme: { light: [6, 18], dark: [18, 6] },
    showThemeButton: false
  },
  // 当你使用 defaultTheme 时，你需要增加一个如下的 postcss 插件
  postcss: {
    plugins: [
      require("css-prefers-color-scheme/postcss"),
      require("autoprefixer")
    ]
  }
};
