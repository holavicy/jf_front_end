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
        // data: [],
        loading: false,
        pagination: {
          currentPage: 0,
          pageSize: 10,
          total: 0
        }
      }
    },

    methods: {
      handleSelectionChange (selection) {
        console.log(selection);
      },
      handleCustomEvent ({ index, row }) {
        console.log(index)
        console.log(row)
      },
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
