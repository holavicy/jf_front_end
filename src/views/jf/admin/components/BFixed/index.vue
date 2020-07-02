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
            <el-upload action="default" :before-upload="beforeUpload" :http-request="importFile" :show-file-list="false" style="margin: 0 10px">
                <el-button type="primary" plain size="mini">导入</el-button>
            </el-upload>
            <el-button type="primary" size="mini">导出</el-button>
        </el-row>
        </div>

        
        <div class="table-wrapper">
            <el-table :data="data" stripe height="400" style="margin-top: 20px" v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="jobid" label="工号" width="70"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="DepartmentLv1" label="业务单元"></el-table-column>
                <el-table-column prop="DepartmentLv3" label="部门"></el-table-column>
                <el-table-column prop="BonusPoints" label="加分"></el-table-column>
                <el-table-column prop="MinusPoints" label="减分"></el-table-column>
                <el-table-column prop="Reason" label="加减分理由" width="180"></el-table-column>
                <el-table-column prop="AssessmentDate" label="考核日期" width="100"></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import js from './mixins/index'
import dayjs from 'dayjs'
export default {
    name: 'a-detail',
    mixins: [
        js
    ],
    data () {
        return {
            staffNo: '',
            name: '',
            file: null
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
              jobid: this.staffNo,
              isBonus: this.addOrMin,
              isAccounted: this.isEnd,
              beginDate: this.checkDate? dayjs(this.checkDate[0]).format('YYYY-M-D HH:mm:ss') :'',
              endDate: this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :'',
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize
          }
          this.loading = true;
          this.$api.GET_DETAIL_LIST(data).then(res => {
              this.loading = false
            //   this.data = res.detail
            //   this.pagination.total = res.total
          }).catch(err => {
              console.log('err', err);
            //   this.$notify({
            //     title: '错误',
            //     message: '查询失败，请联系管理员',
            //     type: 'error'
            //     })
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

      beforeUpload (file) {
        this.file = file;
      },

      importFile () {
        const _this = this;
        _this.source = axios.CancelToken.source();
        let fileData = new FormData();
        //   fileData.append('file', _this.$refs.file.files[0])
        fileData.append('file', _this.file)
        fileData.append('Operator', '100297')
        let url = '/api/import_rewardPoint';
        // let url = '/api/test';
        this.uploadFile(url, fileData, _this.source.token, (res) => {
            let loaded = res.loaded
            let total = res.total
            _this.$nextTick(() => {
                _this.uploadPercent = Math.floor(loaded/total*100)>1? Math.floor(loaded/total*100):1;
                })
                }).then((res) => {
                    if (res.data.code === 0) {
                        alert('上传成功');
                        _this.uploadPercent = 0;
                    }
                }, (rej) => {
                    if (rej === -2) {
                        alert('取消上传成功')
                    } else {
                        alert('上传失败')
                    }
                })
            }
        }
      }

</script>

<style scoped lang="scss">
.a-detail {
    .search-wrapper{
        display: flex;
        justify-content: space-between;
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
