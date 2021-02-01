import { domain } from '@/dataDic.js' 

export default ({ request }) => ({
  DING_LOGIN (data) {
    return request({
      url: '/getUserInfo',
      method: 'post',
      baseUrl:domain,
      data
    })
  }
})