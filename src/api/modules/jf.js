
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  GET_DETAIL_LIST (data) {
    /*
    *查询积分明细
    */
    return request({
      url: '/query_rewardPoint',
      // url: '/test',
      method: 'post',
      data
    })
  },

    /*
    *导出积分明细
    */
  EXPORT_DETAIL_LIST (data) {
    return request({
      url: '/export_rewardPoint',
      method: 'post',
      data
    })
  },

      /*
    *结算积分明细
    */
   ACCOUNT_DETAIL_LIST (data) {
    return request({
      url: '/account_rewardPoint',
      method: 'post',
      data
    })
  },


    /*
    *删除积分明细
    */
  DELETE_DETAIL_RECORD (data) {
    return request({
      url: '/delete_rewardPoint',
      method: 'post',
      data
    })
  },

  /**
   * 获取汇总
   */
  GET_SUMMARY_LIST (data) {
    return request({
      url: '/query_RewardPointSummary',
      method: 'post',
      data
    })
  },

  // 获取固定积分详情
  GET_FIX_DETAIL (data) {
    return request({
      url: '/query_B_RewardPoint',
      method: 'post',
      data
    })
  },
  /**
   * 导出汇总
   */
  EXPORT_SUMMARY_LIST (data) {
    return request({
      url: '/export_RewardPointSummary',
      method: 'post',
      data
    })
  },

  // 查询固定积分汇总
  FIX_TOTAL(data){
    return request({
      url: '/query_FixedPoints',
      method: 'post',
      data
    })
  },

  // 导出固定积分汇总 /export_FixedPoints
  EXPORT_FIX_TOTAL(data){
    return request({
      url: '/export_FixedPoints',
      method: 'post',
      data
    })
  },

  // 修改单个积分
  EDIT_RECORD(data){
    return request({
      url: '/edit_record',
      method: 'post',
      data
    })

  }
})
