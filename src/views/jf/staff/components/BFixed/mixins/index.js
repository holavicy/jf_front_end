export default {
    data () {
      return {
        zwRules: [{
            title: '一般科员、一般员工',
            num: 0,
            id: 1
          },
          {
            title: '经理助理',
            num: 200,
            id: 2
          },
          {
            title: '副经理',
            num: 300,
            id: 3
          },
          {
            title: '经理',
            num: 400,
            id: 4
          },
          {
            title: '中心总经理助理',
            num: 500,
            id: 5
          },
          {
            title: '中心副总监',
            num: 600,
            id: 6
          },
          {
            title: '高级副总裁、副总裁',
            num: 700,
            id: 7
          },
          {
            title: '总裁助理、中心总监',
            num: 800,
            id: 8
          },
          {
            title: '总裁',
            num: 1000,
            id: 9
          }],
        titleCountryLevels: [{
          title: '无',
          num: 0,
          id: 1
        }, {
          title: '助理职称',
          num: 300,
          id: 2
        }, {
          title: '经理助理',
          num: 1000,
          id: 3
        }, {
          title: '高级职称',
          num: 2000,
          id: 4
        }, {
          title: '教授级高工',
          num: 3000,
          id: 5
        }],
        titleCompanyLevels: [{
          title: '无',
          num: 0,
          id: 1
        }, {
          title: '技师',
          num: 500,
          id: 2
        }, {
          title: '高级技师',
          num: 1000,
          id: 3
        }, {
          title: '资深技师',
          num: 1500,
          id: 4
        }, {
          title: '威腾工匠',
          num: 2000,
          id: 5
        }
        ],
        educationLevels: [{
          title: '大专以下',
          num: 0,
          id: 1
        }, {
          title: '大专',
          num: 300,
          id: 2
        }, {
          title: '本科（普通）',
          num: 1000,
          id: 3
        }, {
          title: '本科（985、211）',
          num: 1500,
          id: 4
        }, {
          title: '硕士研究生',
          num: 2000,
          id: 5
        }, {
          title: '博士生',
          num: 3000,
          id: 6
        }
        ]
      }
    },
    methods: {
      // [业务逻辑] 重置表单
      resetFormData () {
        this.form = {
          name: '',
          address: ''
        }
      },
      // [业务逻辑] 根据 id 获取数据
      async getFormData (id) {
        // 重置表单
        this.resetFormData()
        // 请求数据
        try {
          const res = await this.$api.DEMO_BUSINESS_ISSUE_142_DETAIL(id)
          const { name, address } = res
          this.form = { name, address }
          this.$message.success('getFormData')
        } catch (error) {
          console.log('error', error)
        }
      },
      // [业务逻辑] 提交
      handleSubmit () {
        this.$notify({
          title: 'Submit',
          message: '提交了表单',
          type: 'info'
        })
      }
    }
  }
