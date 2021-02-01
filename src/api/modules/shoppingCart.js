
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
    // 移除购物车
    DELETE_CART(data){
      return request({
        url: '/delete_cart',
        method: 'post',
        data
      })
    }
  })
  