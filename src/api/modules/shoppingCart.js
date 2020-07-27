
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    ADD_CART (data) {
      /*
      *加入购物车
      */
      return request({
        url: '/add_cart',
        method: 'post',
        data
      })
    },
  
        /*
      *获取购物车列表
      */
     GET_CART_LIST (data) {
      return request({
        url: '/query_cart',
        method: 'post',
        data
      })
    },

    /**
     * 修改购物车数量
     */
    EDIT_CART_NUM (data) {
      return request({
        url: '/edit_cart_num',
        method: 'post',
        data
      })
    },
  
  
      /*
      *删除活动
      */
    DELETE_ACTIVITY_RECORD (data) {
      return request({
        url: 'delete_activity',
        method: 'post',
        data
      })
    },

    /**
     * 查询单条活动详情
     */
    GET_ACTIVITY_INFO (data) {
        return request({
            url: 'get_activity_info',
            method: 'post',
            data
          })
    }
  })
  