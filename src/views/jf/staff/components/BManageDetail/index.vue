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

        <!-- <div class="search-item">
            <label>是否兑换：</label><el-select v-model="isEnd" placeholder="请选择" size="mini">
                <el-option v-for="item in isEndOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div> -->

        <el-button type="primary" size="mini" @click="searchList">查询</el-button>
      </div>
        <el-table :data="data" size="mini" stripe height="400" style="margin-top: 20px" v-loading="loading">
                <el-table-column type="index" width="55"></el-table-column>
                <el-table-column prop="Name" label="姓名" width="80"></el-table-column>
                <el-table-column prop="Post" label="职务名称"></el-table-column>
                <!-- <el-table-column prop="isEnd" label="是否兑换" width="80"></el-table-column> -->
                <el-table-column prop="BonusPoints" label="加分" width="60"></el-table-column>
                <el-table-column prop="MinusPoints" label="减分" width="60"></el-table-column>
                <el-table-column prop="Reason" label="加减分理由" width="180"></el-table-column>
                <el-table-column prop="Proof" label="加减分依据" width="180"></el-table-column>
                <el-table-column prop="ReasonType" label="理由分类" width="120"></el-table-column>
                <el-table-column prop="FunctionalDepartment" label="职能部门/所在部门" width="180"></el-table-column>
                <el-table-column prop="checkDate" label="考核日期" width="120"></el-table-column>
                <el-table-column prop="Submit" label="提交部门" width="100"></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>
    </div>
</template>

<script>
import {isEndOptions} from '@/dataDic.js' 
import dayjs from 'dayjs'
import util from '@/libs/util.js'
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
      loading: false,
      isEnd: this.isEndVal,
      isEndOptions,
      checkDate: '',
      data: [],
      operator: util.cookies.get('uuid'),
      name: util.cookies.get('name'),
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },

  watch: {
    isEndVal: function(val) {
      this.isEnd = val;
      this.getList(val);
    }
  },

  // mounted () {
  //     this.getList()
  // },

  methods: {
    getList (isEndVal) {
      let data = {
            name: this.name,
            jobid: String(this.operator),
            beginDate: this.checkDate? dayjs(this.checkDate[0]).format('YYYY-M-D HH:mm:ss') :'',
            endDate: this.checkDate? dayjs(this.checkDate[1]).endOf('day').format('YYYY-M-D HH:mm:ss') :'',
            page: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            rewardPointsType: "管理积分"
          }
          this.loading = true;
          this.$api.GET_DETAIL_LIST(data).then(res => {
              this.loading = false
              res.data.detail.map((item) => {
                item.checkDate = dayjs(item.AssessmentDate).format('YYYY-M-D')
              })
              this.data = res.data.detail
              this.pagination.total = res.data.totalLength
          }).catch(err => {
              console.log('err', err);
              this.loading = false
          })
    },

    searchList(){
        this.pagination.currentPage = 1;
        this.getList()
      },

    handleSizeChange (val) {
        this.pagination.pageSize = val;
        this.getList()
      },
      handleCurrentChange (val) {
        this.pagination.currentPage = val;
        this.getList()
      }
  }
}
</script>

<style scoped lang="scss">
.search-wrapper{
  display: flex;
  align-items: center;

  .search-item{
    margin-right: 20px;
    label{
      margin-right: 10px;
      font-size: 14px;
      color: #101010;
    }
  }
}
</style>
