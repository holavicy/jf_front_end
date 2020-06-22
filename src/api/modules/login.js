export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  DING_LOGIN (code, corpId) {
    return request({
      url: '/user/getUserInfo',
      method: 'get',
      params: {
        code,
        corpId
      }
    })
  }
})
