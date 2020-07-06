export default {
    data () {
      return {
        // data: [],
        loading: false,
        pagination: {
          currentPage: 0,
          pageSize: 10,
          total: 0
        },

        data: [{
          RewardPointsdetailID: 1,
          jobid:100297,
          name: '陈明姣'
      }, {
          RewardPointsdetailID: 2,
          jobid:100297,
          name: '陈明姣'
      }, {
          RewardPointsdetailID: 3,
          jobid:100297,
          name: '陈明姣'
      },
      {
          jobid:100297,
          name: '陈明姣'
      },
      {
          jobid:100297,
          name: '陈明姣'
      },
      {
          jobid:100297,
          name: '陈明姣'
      },
      {
          jobid:100297,
          name: '陈明姣'
      },
      {
          jobid:100297,
          name: '陈明姣'
      },
      {
          jobid:100297,
          name: '陈明姣'
      },
      {
          jobid:100297,
          name: '陈明姣'
      }]
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
