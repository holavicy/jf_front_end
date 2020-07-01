
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 错误日志示例 请求一个不存在的地址
   */
  GET_DETAIL_LIST () {
    // 接口请求
    return request({
      url: '/invalid-url',
      method: 'get'
    })
  },

  IMPORT_DETAIL (data) {
      return request({
          url: '/import_rewardPoint',
          method: 'post',
          data
      })
  }
})
