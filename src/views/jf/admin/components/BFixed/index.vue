<template>
    <div class="a-detail">
        <div class="search-wrapper">
            <div class="search-item">
                <label>工号：</label><el-input placeholder="请输入工号" v-model="staffNo" size="mini"></el-input>
            </div>
            <!-- <div class="search-item">
                一级部门：<el-input placeholder="请选择部门" v-model="depFirst"></el-input>
            </div>
            <div class="search-item">
                二级部门：<el-input placeholder="请选择部门" v-model="depSecond"></el-input>
            </div>
            <div class="search-item">
                三级部门：<el-input placeholder="请选择部门" v-model="depThird"></el-input>
            </div> -->
            <div class="search-item">
                <label>姓名：</label><el-input placeholder="请输入姓名" v-model="name" size="mini"></el-input>
            </div>
            <el-row class="button-wrapper">
                <el-button type="primary" plain size="mini" @click="getList">查询</el-button>
                <el-button type="primary" size="mini" @click="exportFile">导出</el-button>
            </el-row>
        </div>

        
        <div class="table-wrapper">
            <el-table :data="data" stripe height="400" style="margin-top: 20px" v-loading="loading" size="mini">
                <el-table-column prop="工号" label="工号" width="70" fixed></el-table-column>
                <el-table-column prop="姓名" label="姓名" width="70" fixed></el-table-column>
                <el-table-column prop="组织" label="业务单元" width="200"></el-table-column>
                <el-table-column prop="部门" label="部门" width="140"></el-table-column>
                <el-table-column prop="职务" label="职务" width="120"></el-table-column>
                <el-table-column prop="MinusPoints" label="职称"></el-table-column>
                <el-table-column prop="Reason" label="学历"></el-table-column>
                <el-table-column prop="AssessmentDate" label="入职时间" width="180"></el-table-column>
                <el-table-column prop="职务积分" label="职务积分" width="80"></el-table-column>
                <el-table-column prop="职称积分" label="职称积分" width="80"></el-table-column>
                <el-table-column prop="学历积分" label="学历积分" width="80"></el-table-column>
                <el-table-column prop="工龄积分" label="工龄积分" width="80"></el-table-column>
                <el-table-column prop="totalFix" label="合计" fixed="right"></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>

        </div>
    </div>
</template>


<script>
import js from './mixins/index'
import dayjs from 'dayjs'
import util from '@/libs/util.js'
export default {
    name: 'b-fixed',
    mixins: [
        js
    ],
    data () {
        return {
            staffNo: '',
            name: '',
            operator: util.cookies.get('uuid')
        }
    },
    mounted () {
        this.getList()
    },
  methods: {
      /**
       * 获取列表数据
       */
      getList () {
          let data = {
              name: this.name,
              jobid: this.staffNo?Number(this.staffNo):'',
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize,
          }
          this.loading = true;
          this.$api.FIX_TOTAL(data).then(res => {
              this.loading = false
              res.data.detail.map(item => {
                  item.totalFix = item["职务积分"]+item["职称积分"]+item["学历积分"]+item["工龄积分"]
              })
              this.data = res.data.detail
              this.pagination.total = res.data.totalLength
          }).catch(err => {
              console.log('err', err);
              this.loading = false
          })
      },

      /**
       * 分页
       */
      paginationCurrentChange (currentPage) {
        this.pagination.currentPage = currentPage
        this.getList()
      },

      exportFile () {
            let data = {
              name: this.name,
              jobid: this.staffNo?Number(this.staffNo):'',
              Operator: Number(this.operator)
          }
          this.$api.EXPORT_FIX_TOTAL(data).then(res => {
              if (res.code === 0) {
                  this.$message.success('导出成功')
              } else {
                  this.$message.error(res.msg || '导出失败，请联系管理员')
              }
          }).catch(err => {
              console.log('err', err)
          })
        },
    }
}

</script>

<style scoped lang="scss">
.a-detail {
    .search-wrapper{
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .search-item{
            display: flex;
            align-items: center;
            margin-right: 10px;

            label{
                flex-shrink: 0;
                font-size: 14px;
                color: #101010;
            }
        }
    }

    .button-wrapper{
        display: flex;
        align-items: center;
    }
}
</style>
