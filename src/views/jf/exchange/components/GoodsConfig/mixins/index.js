export default {
    data () {
      return {
        goodsStatusOptions: [
          {
            label: '全部',
            value: ''
          }, {
            label: '上架',
            value: 0 
          }, {
            label: '下架',
            value: 1
          }
        ],
        loading: false,
        pagination: {
          currentPage: 0,
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
        this.pagination.currentPage = val-1;
        this.getList()
      }
    }
  }
