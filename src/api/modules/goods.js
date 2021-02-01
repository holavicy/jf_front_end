
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    GET_GOODS_LIST (data) {
      /*
      *查询商品记录
      */
      return request({
        url: '/query_goods',
        method: 'post',
        data
      })
    },
  
      /*
      *导出商品
      */
    EXPORT_GOODS (data) {
      return request({
        url: '/export_goods',
        method: 'post',
        data
      })
    },

    // 商品上下架 /set_goods_status
    CHANGE_GOODS_STATUS(data){
      return request({
        url: '/set_goods_status',
        method: 'post',
        data
      })
    }
  })
  