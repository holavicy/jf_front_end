
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    GET_ACTIVITY_LIST (data) {
      /*
      *查询活动列表
      */
      return request({
        url: '/query_activity',
        method: 'post',
        data
      })
    },
  
        /*
      *新增活动
      */
     ADD_ACTIVITY (data) {
      return request({
        url: '/add_activity',
        method: 'post',
        data
      })
    },

    /**
     * 编辑活动
     */
    EDIT_ACTIVITY (data) {
      return request({
        url: '/edit_activity',
        method: 'post',
        data
      })
    },
  
  
      /*
      *删除活动
      */
    DELETE_ACTIVITY_RECORD (data) {
      return request({
        url: '/delete_activity',
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
  