export default {
    data () {
      return {
        typeOptions: [
         {
            label: '按业务单元分类',
            value: 1
          }, {
            label: '按加减分理由分类',
            value: 2
          }
        ],
        loading: false,

        data: []
      }
    },

    methods: {
    //   handleSizeChange (val) {
    //     this.pagination.pageSize = val;
    //     this.getList()
    //   },
    //   handleCurrentChange (val) {
    //     this.pagination.currentPage = val;
    //     this.getList()
    //   }
    }
  }