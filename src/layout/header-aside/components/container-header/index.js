import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import { elMenuItem, elSubmenu } from '../libs/util.menu'

export default {
  name: 'd2-layout-container-menu-header',
  mixins: [
    menuMixin
  ],
  render (h) {
    return h('div', {
      attrs: { flex: 'cross:center', 'flex-box': '0' },
      class: { 'd2-theme-header-menu': true },
      ref: 'page'
    }, [
      h('div', {
        attrs: { class: 'd2-theme-header-menu__content', flex: '', 'flex-box': '1' },
        ref: 'content'
      }, [
        h('div', {
          attrs: { class: 'd2-theme-header-menu__scroll', 'flex-box': '1' },
          ref: 'scroll'
        }, [
          h('el-menu', {
            props: { mode: 'horizontal', defaultActive: this.active },
            on: { select: this.handleTabSelect }
          }, this.topTab.map(menu => (menu.children === undefined ? elMenuItem : elSubmenu).call(this, h, menu)))
        ])
      ])
    ])
  },
  data () {
    return {
      asideHeight: 300,
      BS: null
    }
  },  
  computed: {
    ...mapState('d2admin/menu', [
      'topTab'
    ])
  }
}
