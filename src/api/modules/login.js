export default ({ request }) => ({
  DING_LOGIN (data) {
    return request({
      url: '/getUserInfo',
      method: 'post',
      baseUrl:'http://222.186.81.37:5000',
      data
    })
  }
})
