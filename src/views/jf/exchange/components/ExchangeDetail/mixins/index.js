export default {
    data () {
      return {
        loading: false,
        pagination: {
          currentPage: 0,
          pageSize: 10,
          total: 0
        },
        data: [],
        goodsData: []
      }
    },

    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
        this.pagination.pageSize = val;
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
        this.pagination.currentPage = val-1;
      }
    }
  }
