export default {
    data () {
      return {
        
        options: [
          {
            label: '全部',
            value: ''
          }, {
            label: '已完成',
            value: 0 
          }, {
            label: '待确定',
            value: 1
          }, {
            label: '可领取',
            value: 2
          }, {
            label: '退回',
            value: 3
          }, {
            label: '取消',
            value: 4
          }
        ],
        loading: false,
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },

        data: []
      }
    }
  }
