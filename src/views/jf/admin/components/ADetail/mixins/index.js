export default {
    data () {
      return {
        addOrMinOptions: [
          {
            label: '全部',
            value: ''
          }, {
            label: '加分',
            value: 0 
          }, {
            label: '减分',
            value: 1
          }
        ],
        isEndOptions: [
          {
            label: '全部',
            value: ''
          }, {
            label: '是',
            value: 1 
          }, {
            label: '否',
            value: 0
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
    },

    methods: {
      handleSizeChange (val) {
        this.pagination.pageSize = val;
        this.getList()
      },
      handleCurrentChange (val) {
        this.pagination.currentPage = val;
        this.getList()
      }
    }
  }
