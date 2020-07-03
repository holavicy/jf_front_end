<template>
    <div class="a-detail">
      <div class="search-wrapper">
        <div class="search-item">
          <label>考核日期</label>
          <el-date-picker
            size="mini"
            v-model="checkDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>

        <div class="search-item">
            <label>是否结算：</label><el-select v-model="isEnd" placeholder="请选择" size="mini">
                <el-option v-for="item in isEndOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>

        <el-button type="primary" size="mini" @click="getList">查询</el-button>
      </div>
      <d2-crud ref="d2Crud" index-row :columns="columns" :data="data"/>
    </div>
</template>

<script>
import {isEndOptions} from '@/dataDic.js' 
import {ADetailStaff} from '@/mockData.js'
import dayjs from 'dayjs'
export default {
  name: 'a-detail',
  props: {
    isEndVal: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      ADetailStaff,
      isEnd: this.isEndVal,
      isEndOptions,
      checkDate: '',
      columns: [
        {
          title: '积分类别',
          key: 'RewardPointsType',
          width: '100'
        },
        {
          title: '加分',
          key: 'BonusPoints',
          width: '100'
        },
        {
          title: '减分',
          key: 'MinusPoints',
          width: '100'
        },
        {
          title: '加减分理由',
          key: 'Reason',
          width: '280'
        },
        {
          title: '是否结算',
          key: 'isEnd',
          width: '100'
        },
        {
          title: '考核日期',
          key: 'checkDate',
          width: '120'
        }
      ],
      data: [],
      pagination: {
        currentPage: 0,
        pageSize: 10,
        total: 4
      }
    }
  },

  watch: {
    isEndVal: function(val) {
      this.isEnd = val;
      this.getList(val);
    }
  },

  mounted () {
      this.getList()
  },

  methods: {
    getList (isEndVal) {
      let data = {
            name: '陈明姣',
            jobid: 100297,
            isAccounted: isEndVal === '是'?1: isEndVal === ''?'':this.isEnd===''?'': Number(this.isEnd),
            beginDate: this.checkDate? dayjs(this.checkDate[0]).format('YYYY-M-D HH:mm:ss') :'',
            endDate: this.checkDate? dayjs(this.checkDate[1]).endOf('day').format('YYYY-M-D HH:mm:ss') :'',
            page: this.pagination.currentPage,
            pageSize: this.pagination.pageSize
          }
          this.loading = true;
          this.$api.GET_DETAIL_LIST(data).then(res => {
              this.loading = false
              res.detail.map((item) => {
                item.checkDate = dayjs(item.AssessmentDate).format('YYYY-M-D')
                item.isEnd = item.isAccounted === 0? '否': '是'
              })
              this.data = res.detail
              this.pagination.total = res.total.totalLength
          }).catch(err => {
              console.log('err', err);
              this.loading = false
          })
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
