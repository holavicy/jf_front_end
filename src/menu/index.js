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
    icon: 'file-text-o',
    roles: ['admin']
  },
  {
    path: '/jf/JFExchangeConfig',
    title: '兑换中心',
    icon: 'gear',
    roles: ['admin']
  },
  {
    path: '/jf/activity',
    title: '积分活动',
    icon: 'audio-description',
    roles: ['admin']
  },
  {
    path: '/jf/charts',
    title: '统计看板',
    icon: 'pie-chart',
    roles: ['leader', 'admin']
  }
])

// 菜单 顶栏
export const menuHeader = supplementPath([])
