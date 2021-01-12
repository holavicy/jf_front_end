export default {
    data () {
      return {
        typeOptions: [
         {
            label: '加减分合计排名-职务级别',
            value: 1
          }, {
            label: '加减分合计排名-公司/业务单元',
            value: 2
          },
          {
            label: '加减分合计排名-一级部门',
            value: 3
          },
          {
            label: '人均统计排名-职务级别',
            value: 4
          },
          {
            label: '人均统计排名-公司/业务单元',
            value: 5
          },
          {
            label: '人均统计排名-一级部门',
            value: 6
          },
          {
            label: '个人排名',
            value: 7
          }
        ],
        loading: false
      }
    }
  }