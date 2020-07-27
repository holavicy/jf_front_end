
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
      /*
      *查询订单记录
      */
    GET_ORDER_LIST (data) {
      return request({
        url: '/query_order',
        method: 'post',
        data
      })
    },
  
      /*
      *创建订单
      */
    CREATE_PAY (data) {
      return request({
        url: '/create_order',
        method: 'post',
        data
      })
    },
  
        /*
      *确定订单
      */
     CONFIRM_ORDER (data) {
      return request({
        url: '/confirm_order',
        method: 'post',
        data
      })
    },
  
  
      /*
      *退回订单
      */
    REJECT_ORDER (data) {
      return request({
        url: 'reject_order',
        method: 'post',
        data
      })
    },

    /*
      *确认收货
      */
     FINISH_ORDER (data) {
      return request({
        url: 'finish_order',
        method: 'post',
        data
      })
    }
  })
  