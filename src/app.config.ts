export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/works/index',
    'pages/copywriting/index',
    'pages/mine/index',
    'pages/import/index',
    'pages/editor/index',
    'pages/gallery/index',
    'pages/preview/index',
    'pages/batch/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTitleText: '房产海报设计',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#86909C',
    selectedColor: '#FF6B35',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '模板'
      },
      {
        pagePath: 'pages/works/index',
        text: '作品'
      },
      {
        pagePath: 'pages/copywriting/index',
        text: '文案'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
