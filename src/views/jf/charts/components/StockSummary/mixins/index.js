export default {
  data () {
    return {
      typeOptions: [
       {
          label: '按职务级别分类',
          value: 1
        }, {
          label: '按公司/业务单元分类',
          value: 2
        },
        {
          label: '按一级部门分类',
          value: 3
        },
        {
          label: '个人排名',
          value: 4
        }
      ],
      loading: false
    }
  }
}