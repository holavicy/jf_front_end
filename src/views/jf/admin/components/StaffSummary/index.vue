<template>
    <div class="staff-summary">
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
                <el-table-column prop="姓名" label="姓名" fixed></el-table-column>
                <el-table-column prop="DepartmentLv1" label="业务单元"></el-table-column>
                <el-table-column prop="DepartmentLv3" label="部门"></el-table-column>
                <el-table-column prop="现有A分" label="现有A分"></el-table-column>
                <el-table-column prop="现有管理积分" label="现有B管理积分" width="120"></el-table-column>
                <el-table-column prop="固定积分" label="固定积分"></el-table-column>
                <el-table-column prop="年度管理积分" label="年度管理积分" width="120"></el-table-column>
                <el-table-column prop="年度累计积分" label="年度累计积分" width="120"></el-table-column>
                <el-table-column prop="总获得A分" label="总获得A分" width="80"></el-table-column>
                <el-table-column prop="总获得管理积分" label="总获得B管理积分" width="120"></el-table-column>
                <el-table-column prop="总累计积分" label="总累计积分" width="80"></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>
        </div>
    </div>
</template>

<script>
import js from './mixins/index'
import util from '@/libs/util.js'
export default {
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
    created(){
        this.getList();
    },

    methods: {
        /**
       * 获取列表数据
       */
      getList () {
          let data = {
              name: this.name,
              jobid: this.staffNo? Number(this.staffNo):'',
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize
          }
          this.loading = true;
          this.$api.GET_SUMMARY_LIST(data).then(res => {
              this.loading = false
              res.data.detail.map((item) => {
                  item["现有A分"]=item["现有A分"] || 0
                  item["现有管理积分"]=item["现有管理积分"] || 0
                  item["固定积分"]=item["固定积分"] || 0
                  item["年度管理积分"]=item["年度管理积分"] || 0
                  item["年度累计积分"]=item["年度累计积分"] || 0
                  item["总获得A分"]=item["总获得A分"] || 0
                  item["总获得管理积分"]=item["总获得管理积分"] || 0
                  item["总累计积分"]=item["总累计积分"] || 0
              })
              this.data = res.data.detail
              this.pagination.total = res.data.totalLength
          }).catch(err => {
              console.log('err', err);
              this.loading = false
          })
      },

      
        /**
         * 导出
         */
        exportFile () {
            let data = {
              name: this.name,
              jobid: this.staffNo? Number(this.staffNo):'',
              Operator: Number(this.operator)
          }
          this.$api.EXPORT_SUMMARY_LIST(data).then(res => {
              if (res.code === 0) {
                  window.location.href = res.data
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
.staff-summary {
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