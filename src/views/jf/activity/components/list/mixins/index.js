export default {
    data () {
      return {
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
