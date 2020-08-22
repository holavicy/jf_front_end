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
            <div class="search-item">
                <label>加减分：</label><el-select v-model="addOrMin" placeholder="请选择" size="mini">
                    <el-option v-for="item in addOrMinOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="search-item">
                <label>考核日期：</label>
                 <el-date-picker v-model="checkDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" size="mini"></el-date-picker>
            </div>
        </div>

        <el-row class="button-wrapper">
            <el-button type="primary" plain size="mini" @click="getList(1)">查询</el-button>
            <el-upload action="default" :before-upload="beforeUpload" :http-request="importFile" :show-file-list="false" style="margin: 0 10px">
                <el-button type="primary" plain size="mini">导入</el-button>
            </el-upload>

            <el-button type="primary" size="mini" @click="exportFile" v-loading.fullscreen.lock="fullscreenLoading">导出</el-button>
        </el-row>
        <div class="table-wrapper">
            <el-table :data="data" stripe height="400" style="margin-top: 20px" v-loading="loading" size="mini">
                <el-table-column prop="JobId" label="工号" width="70"></el-table-column>
                <el-table-column prop="Name" label="姓名" width="100"></el-table-column>
                <el-table-column prop="DepartmentLv1" label="一级部门" width="180"></el-table-column>
                <el-table-column prop="DepartmentLv2" label="二级部门"></el-table-column>
                <el-table-column prop="DepartmentLv3" label="三级部门"></el-table-column>
                <el-table-column prop="BonusPoints" label="加分" width="80"></el-table-column>
                <el-table-column prop="MinusPoints" label="减分" width="80"></el-table-column>
                <el-table-column prop="Reason" label="加减分理由" width="240"></el-table-column>
                <el-table-column prop="FunctionalDepartment" label="职能部门/所在部门" width="120"></el-table-column>
                <el-table-column prop="checkDate" label="考核日期" width="100"></el-table-column>
                <el-table-column prop="Submit" label="提交部门" width="100"></el-table-column>
                <el-table-column fixed="right" label="操作" width="60">
                    <template slot-scope="scope">
                        <el-popconfirm title="确定删除此条记录吗？" @onConfirm="deleteDetail(scope.row)">
                            <el-button type="text" size="mini" slot="reference">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import js from './mixins/index'
import dayjs from 'dayjs'
import util from '@/libs/util.js'
import { domain } from '@/dataDic.js' 
export default {
    name: 'a-detail',
    mixins: [
        js
    ],
    data () {
        return {
            fullscreenLoading:false,
            domain,
            staffNo: '',
            name: '',
            addOrMin: '',
            isEnd: '',
            checkDate: null,
            file: null,
            operator: util.cookies.get('uuid'),
        }
    },
    mounted () {
        this.getList()
    },
  methods: {
      /**
       * 获取列表数据
       */
      getList (page) {
          if(page){
            this.pagination.currentPage = page
          }
          let data = {
              name: this.name,
              jobid: this.staffNo? String(this.staffNo):'',
              isBonus: this.addOrMin,
              isAccounted: this.isEnd,
              beginDate: this.checkDate? dayjs(this.checkDate[0]).format('YYYY-M-D HH:mm:ss') :'',
              endDate: this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :'',
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize,
              rewardPointsType: '管理积分',
              onduty: 0
          }
          this.loading = true;
          this.$api.GET_DETAIL_LIST(data).then(res => {
              this.loading = false
              this.data = res.data.detail
              res.data.detail.map((item) => {
                item.checkDate = dayjs(item.AssessmentDate).format('YYYY-M-D')
              })
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

      beforeUpload (file) {
        this.file = file;
      },

        /**
         * 导出
         */
      exportFile () {
            let data = {
              name: this.name,
              jobid: this.staffNo? Number(this.staffNo):'',
              isBonus: this.addOrMin,
              isAccounted: this.isEnd,
              beginDate: this.checkDate? dayjs(this.checkDate[0]).format('YYYY-M-D HH:mm:ss') :'',
              endDate: this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :'',
              rewardPointsType: '管理积分',
              Operator: String(this.operator),
              onduty: 0
          }
          this.fullscreenLoading = true;
          this.$api.EXPORT_DETAIL_LIST(data).then(res => {
              this.fullscreenLoading = false;
              if (res.code === 0) {
                  window.location.href = this.domain + res.data;
                  this.$message.success('导出成功')
              } else {
                  this.$message.error(res.msg || '导出失败，请联系管理员')
              }
          }).catch(err => {
              this.fullscreenLoading = false;
              console.log('err', err)
          })
        },

          /**
         * 删除
         */
        deleteDetail (val) {
            console.log(val);
            let data = {
                RewardPointsdetailID: val.RewardPointsdetailID
            }

            this.$api.DELETE_DETAIL_RECORD(data).then(res => {
                if (res.code === 0) {
                    this.$message.success('删除成功')
                    this.getList()
                } else {
                    this.$$message.error(res.msg || '删除失败')
                }
            }).catch(err => {
                console.log(err)
            })
        },

      importFile () {
        const _this = this;
        _this.source = axios.CancelToken.source();
        let fileData = new FormData();
        fileData.append('file', _this.file)
        fileData.append('Operator', String(this.operator))
        let url = '/import_rewardPoint';
        this.uploadFile(url, fileData, _this.source.token, (res) => {
            let loaded = res.loaded
            let total = res.total
            _this.$nextTick(() => {
                _this.uploadPercent = Math.floor(loaded/total*100)>1? Math.floor(loaded/total*100):1;
                })
                }).then((res) => {
                    if (res.data.code === 0) {
                        _this.$message.success('导入成功')
                        _this.uploadPercent = 0
                        _this.getList()
                    } else {
                        _this.$message.error(res.msg || '导入失败，请联系管理员')
                    }
                }, (rej) => {
                    if (rej === -2) {
                        _this.$message.info('取消上传成功')
                    } else {
                        _this.$message.error('上传失败')
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
