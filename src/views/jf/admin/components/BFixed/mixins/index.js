export default {
    data () {
      return {
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
      /**
       * 每页多少条变化
       * @param {*} val 
       */
      handleSizeChange (val) {
        this.pagination.pageSize = val;
        this.getList();
      },
      
      /**
       * 页数变化
       * @param {*} val 
       */
      handleCurrentChange (val) {
        this.pagination.currentPage = val;
        this.getList();
      }
    }
  }
