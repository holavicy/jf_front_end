import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import { elMenuItem, elSubmenu } from '../libs/util.menu'
import BScroll from 'better-scroll'

export default {
  name: 'd2-layout-header-aside-menu-side',
  mixins: [
    menuMixin
  ],
  render (h) {
    return h('div', { attrs: { class: 'd2-layout-header-aside-menu-side' } }, [
      h('el-menu', {
        props: { collapse: this.asideCollapse, collapseTransition: this.asideTransition, uniqueOpened: true, defaultActive: this.$route.fullPath },
        ref: 'menu',
        on: { select: this.handleMenuSelect }
      }, this.aside.map(menu => (menu.children === undefined ? elMenuItem : elSubmenu).call(this, h, menu))),
      ...this.aside.length === 0 && !this.asideCollapse ? [
        h('div', { attrs: { class: 'd2-layout-header-aside-menu-empty', flex: 'dir:top main:center cross:center' } }, [
          h('d2-icon', { props: { name: 'inbox' } }),
          h('span', {}, '没有侧栏菜单')
        ])
      ] : []
    ])
  },
  data () {
    return {
      asideHeight: 200,
      BS: null
    }
  },
  computed: {
    ...mapState('d2admin/menu', [
      'aside',
      'asideCollapse',
      'asideTransition'
    ]),
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    asideCollapse (val) {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    }
  },
  mounted () {
    this.scrollInit()
    this.setAsideByRole()
  },
  beforeDestroy () {
    this.scrollDestroy()
  },
  methods: {
    scrollInit () {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true,
        click: true
        // 如果你愿意可以打开显示滚动条
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      })
    },
    scrollDestroy () {
      // https://github.com/d2-projects/d2-admin/issues/75
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    },
    setAsideByRole () {
      let roles = this.info ?this.info.roles:[]
      let actualAside = []
      this.aside.map((item) => {
        if (!item.roles){
          actualAside.push(item)
        } else if (item.roles.length>0 && roles.length>0){
          item.roles.map((role) => {
            roles.map((userRole) => {
              if (role === userRole) {
                actualAside.push(item)
              }
            })
          })
        }
        this.$store.commit('d2admin/menu/asideSet', actualAside)
        this.actualAside = actualAside
      })
    }
  }
}
