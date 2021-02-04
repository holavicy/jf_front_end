
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /*
  *查询某个商品的库存明细
  */
  GET_GOODS_STOCK_DETAIL (data) {
    return request({
      url: '/get_goods_stock_detail',
      method: 'post',
      data
    })
  },

  /*
  *修改某个商品的库存
  */
 CHANGE_GOODS_STOCK_DETAIL (data) {
  return request({
    url: '/change_stock_detail',
    method: 'post',
    data
  })
}
})
