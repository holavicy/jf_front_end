export default {
    data () {
      return {
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
      handleSelectionChange (selection) {
        console.log(selection);
      },

      /**
       * 每页多少条变化
       * @param {*} val 
       */
      handleSizeChange (val) {
        this.pagination.pageSize = val;
      },
      
      /**
       * 页数变化
       * @param {*} val 
       */
      handleCurrentChange (val) {
        this.pagination.currentPage = val-1;
      }
    }
  }
