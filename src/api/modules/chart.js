
export default ({ request}) => ({
    GET_COUNT_SUMMARY (data) {
      /*
      *统计积分各种分类查询
      */
      return request({
        url: '/count_summary',
        method: 'post',
        data
      })
    },

    GET_TENDENCY_DATA(data){
      // 统计积分趋势
      return request({
        url: '/tendency_data',
        method: 'post',
        data
      })
    },

    GET_FUNC_REASON_DATA(data){
      // 获取职能部门加减分理由分类数据
      return request({
        url: '/func_reason_data',
        method: 'post',
        data
      })
    },

    GET_RANKING_DATA(data){
      // 获取排名数据
      return request({
        url: '/ranking',
        method: 'post',
        data
      })
    }
  })
  