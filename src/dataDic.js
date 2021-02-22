const isEndOptions = [
    {
      label: '全部',
      value: ''
    }, {
      label: '是',
      value: '1'
    }, {
      label: '否',
      value: '0'
    }
  ]

  //0:交易完成 1:待确定 2:可领取 3:退回 4:取消
const orderStatusOptions = [{
    label: '全部',
    value: ''
  }, {
    label: '交易完成',
    value: 0
  },  {
    label: '待确定',
    value: 1
  },  {
    label: '可领取',
    value: 2
  },  {
    label: '退回',
    value: 3
  },  {
    label: '取消',
    value: 4
  }]

  const orderStatusDic = {

    0: "交易完成",
    1: "待确定",
    2: "可领取",
    3: "已退回",
    4: "已取消"
  }

  const goodsStatusDic = {

    0: "已上架",
    1: "已下架"
  }

  const domain = 'http://222.186.81.37:5000'
  // const domain = 'http://127.0.0.1:5000'

export { isEndOptions, orderStatusOptions, orderStatusDic, goodsStatusDic, domain }