import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

// 菜单 侧边栏
export const menuAside = supplementPath([
  {
    path: '/jf/myJF',
    title: '我的积分',
    icon: 'tachometer'
  },
  {
    path: '/jf/JFChange',
    title: '积分兑换',
    icon: 'credit-card'
  },
  {
    path: '/jf/JFSummary',
    title: '积分汇总',
    icon: 'file-text-o'
  },
  {
    path: '/jf/JFExchangeConfig',
    title: '兑换中心',
    icon: 'gear'
  },
  {
    path: '/jf/activity',
    title: '积分活动',
    icon: 'audio-description'
  },
  {
    path: '/jf/charts',
    title: '统计看板',
    icon: 'pie-chart'
  }
])

// 菜单 顶栏
export const menuHeader = supplementPath([
  {
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  {
    title: '功能',
    icon: 'puzzle-piece',
    children: [
      {
        title: '新窗口打开链接',
        icon: 'link',
        children: [
          { path: 'https://github.com/d2-projects/d2-admin', title: 'D2Admin Github', icon: 'github' },
          { path: 'https://juejin.im/user/57a48b632e958a006691b946/posts', title: '掘金', icon: 'globe' },
          { path: 'https://my.oschina.net/u/3871516', title: '开源中国', icon: 'globe' },
          { path: 'https://www.zhihu.com/people/fairy-ever/activities', title: '知乎', icon: 'globe' },
          { path: 'https://segmentfault.com/blog/liyang-note-book', title: 'segmentfault 专栏', icon: 'globe' },
          { path: 'http://www.fairyever.com/', title: 'www.fairyever.com', icon: 'globe' }
        ]
      }
    ]
  }
])
