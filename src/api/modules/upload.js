export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    UPLOAD_TEST (data) {
      return request({
        url: '/test',
        method: 'post',
        data
      })
    }
  })
