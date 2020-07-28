export default {
    data () {
      return {
        loading: false,
        pagination: {
          currentPage: 1,
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
        this.getList();
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
        this.pagination.currentPage = val;
        this.getList();
      }
    }
  }
