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
        isEndOptions: [
          {
            label: '全部',
            value: ''
          }, {
            label: '是',
            value: 1 
          }, {
            label: '否',
            value: 0
          }
        ],
        columns: [
          {
            title: '工号',
            key: 'jobid'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '业务单元',
            key: 'admin'
          },
          {
            title: '部门',
            key: 'dateTimeCreat'
          },
          {
            title: '是否结算',
            key: 'isAccounted'
          },
          {
            title: '加分',
            key: 'plus'
          },
          {
            title: '减分',
            key: 'minus'
          },
          {
            title: '加减分理由',
            key: 'reason'
          },
          {
            title: '考核日期',
            key: 'date'
          }
        ],
        rowHandle: {
          custom: [
            {
              text: '删除',
              type: 'text',
              size: 'mini',
              emit: 'custom-emit-1'
            }
          ]
        },
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
        RewardPointsdetailID: 4,
          jobid:100297,
          name: '陈明姣'
      }],
      goodsData: [{
        goodsName: '小方巾',
        price: '10',
        num: '2',
        total: '20'
      },
      {
        goodsName: '杯子',
        price: '100',
        num: '1',
        total: '100'
      }
    ]
      }
    },

    methods: {
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
