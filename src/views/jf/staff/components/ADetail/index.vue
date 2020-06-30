<template>
    <div class="a-detail">
      <div class="search-wrapper">
        <div class="search-item">
          <label>考核日期</label>
          <el-date-picker
            size="small"
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>

        <el-button type="primary" size="small" @click="getList">查询</el-button>
      </div>
      <d2-crud ref="d2Crud" :columns="columns" :data="data"/>
    </div>
</template>

<script>
export default {
  name: 'a-detail',
  data () {
    return {
      value1: '',
      columns: [
        {
          title: '序号',
          key: 'index',
          width: '100'
        },
        {
          title: '积分类别',
          key: 'type',
          width: '100'
        },
        {
          title: '加分',
          key: 'plus',
          width: '100'
        },
        {
          title: '减分',
          key: 'minus',
          width: '100'
        },
        {
          title: '加减分理由',
          key: 'reason',
          width: '280'
        },
        {
          title: '是否结算',
          key: 'isEnd',
          width: '100',
          filters: [
            { text: '是', value: '是' },
            { text: '否', value: '否' }
          ],
          filterMethod (value, row) {
            return row.isEnd === value
          },
          filterPlacement: 'bottom-end'
        },
        {
          title: '考核日期',
          key: 'date',
          width: '120'
        }
      ],

      data: [{
        index: 1,
        type: 'A分',
        plus: '20',
        minus: '0',
        reason: '完成钉钉数字化管理专员认证',
        isEnd: '是',
        date: '2020-04-28'
      },
      {
        index: 1,
        type: 'A分',
        plus: '0',
        minus: '20',
        reason: '绩效扣除',
        isEnd: '否',
        date: '2020-04-28'
      },
      {
        index: 1,
        type: 'A分',
        plus: '100',
        minus: '0',
        reason: '年度十佳青年',
        isEnd: '是',
        date: '2020-04-28'
      }]
    }
  },

  methods: {
    getList () {
      console.log(this.value1)
    }
  }
}
</script>

<style scoped lang="scss">
.search-wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search-item{
    label{
      margin-right: 10px;
      font-size: 14px;
      color: #101010;
    }
  }
}
</style>
