
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    GET_ORDER_DETAIL_LIST (data) {
      /*
      *查询订单记录
      */
      return request({
        url: '/query_rewardPoint',
        method: 'post',
        data
      })
    },
  
      /*
      *导出积分明细
      */
    CREATE_PAY (data) {
      return request({
        url: '/create_order',
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
        url: 'delete_rewardPoint',
        method: 'post',
        data
      })
    }
  })
  