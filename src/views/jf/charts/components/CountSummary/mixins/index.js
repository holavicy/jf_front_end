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
          },
          {
            label: '按加分理由分类',
            value: 3
          },
          {
            label: '按减分理由分类',
            value: 4
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