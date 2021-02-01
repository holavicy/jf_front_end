export default {
    data () {
      return {
        typeOptions: [
         {
            label: '加减分合计排名-职务级别',
            value: 1
          }, {
            label: '加减分合计排名-公司/业务单元',
            value: 2
          },
          {
            label: '加减分合计排名-一级部门',
            value: 3
          },
          {
            label: '人均统计排名-职务级别',
            value: 4
          },
          {
            label: '人均统计排名-公司/业务单元',
            value: 5
          },
          {
            label: '人均统计排名-一级部门',
            value: 6
          },
          {
            label: '个人管理积分排名',
            value: 7
          },
          {
            label: '个人合计排名',
            value: 8
          }
        ],
        exportTableColums: [[
          { label: '职务级别', prop: 'groupType' },
          { label: '加分', prop: 'totalBonus' },
          { label: '减分', prop: 'totalMinus' },
          { label: '累计管理积分', prop: 'totalScore' },
        ],[
          { label: '公司/业务单元', prop: 'groupType' },
          { label: '加分', prop: 'totalBonus' },
          { label: '减分', prop: 'totalMinus' },
          { label: '累计管理积分', prop: 'totalScore' }
        ],[
          { label: '公司', prop: 'DepartmentLv1' },
          { label: '一级部门', prop: 'DepartmentLv2' },
          { label: '加分', prop: 'totalBonus' },
          { label: '减分', prop: 'totalMinus' },
          { label: '累计管理积分', prop: 'totalScore' }
        ],[
          { label: '职务级别', prop: 'groupType' },
          { label: '加分', prop: 'totalBonus' },
          { label: '减分', prop: 'totalMinus' },
          { label: '累计管理积分', prop: 'totalScore' },
          { label: '总人数', prop: 'NUM' },
          { label: '人均加分', prop: 'avg' },
          { label: '人均加分率', prop: 'percent' }
        ],[
          { label: '公司/业务单元', prop: 'groupType' },
          { label: '加分', prop: 'totalBonus' },
          { label: '减分', prop: 'totalMinus' },
          { label: '累计管理积分', prop: 'totalScore' },
          { label: '总人数', prop: 'NUM' },
          { label: '人均加分', prop: 'avg' },
          { label: '人均加分率', prop: 'percent' }
        ],[
          { label: '公司', prop: 'DepartmentLv1' },
          { label: '一级部门', prop: 'DepartmentLv2' },
          { label: '加分', prop: 'totalBonus' },
          { label: '减分', prop: 'totalMinus' },
          { label: '累计管理积分', prop: 'totalScore' },
          { label: '总人数', prop: 'NUM' },
          { label: '人均加分', prop: 'avg' },
          { label: '人均加分率', prop: 'percent' }
        ],[
          { label: '工号', prop: 'JobId' },
          { label: '姓名', prop: 'Name' },
          { label: '总获得B管理积分加分', prop: 'totalBonus' },
          { label: '总获得B管理积分加分', prop: 'totalMinus' },
          { label: '总获得B管理积分', prop: 'totalScore' }
        ],[
          { label: '工号', prop: '工号' },
          { label: '姓名', prop: '姓名' },
          { label: '年度管理积分', prop: '年度管理积分' },
          { label: '总获得管理积分', prop: '总获得管理积分' },
          { label: '总累计积分', prop: '总累计积分' }
        ]],
        loading: false
      }
    }
  }