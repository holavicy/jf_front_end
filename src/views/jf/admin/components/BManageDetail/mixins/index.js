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
        data: [],
        loading: false,
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
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
