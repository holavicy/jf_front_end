export default ({ request }) => ({
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
