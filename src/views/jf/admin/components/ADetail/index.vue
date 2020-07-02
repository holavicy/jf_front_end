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
                <label>是否结算：</label><el-select v-model="isEnd" placeholder="请选择" size="mini">
                    <el-option v-for="item in isEndOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>

            <div class="search-item">
                <label>考核日期：</label>
                 <el-date-picker v-model="checkDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" size="mini"></el-date-picker>
            </div>
        </div>

        <el-row class="button-wrapper">
            <el-button type="primary" plain size="mini" @click="getList">查询</el-button>
            <el-upload action="default" :before-upload="beforeUpload" :http-request="importFile" :show-file-list="false" style="margin: 0 10px">
                <el-button type="primary" plain size="mini">导入</el-button>
            </el-upload>

            <el-button type="primary" size="mini">导出</el-button>
            <el-button type="primary" plain size="mini">结算</el-button>
        </el-row>
        <div class="table-wrapper">
            <!-- <d2-crud :columns="columns" :data="data" :loading="loading" :pagination="pagination" @pagination-current-change="paginationCurrentChange" selection-row
      @selection-change="handleSelectionChange" :rowHandle="rowHandle" @custom-emit-1="handleCustomEvent"/> -->
            <el-table :data="data" stripe height="400" style="margin-top: 20px" v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="jobid" label="工号" width="70"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="DepartmentLv1" label="业务单元"></el-table-column>
                <el-table-column prop="DepartmentLv3" label="部门"></el-table-column>
                <el-table-column prop="IsAccounted" label="是否结算"></el-table-column>
                <el-table-column prop="BonusPoints" label="加分"></el-table-column>
                <el-table-column prop="MinusPoints" label="减分"></el-table-column>
                <el-table-column prop="Reason" label="加减分理由" width="180"></el-table-column>
                <el-table-column prop="AssessmentDate" label="考核日期" width="100"></el-table-column>
                <el-table-column fixed="right" label="操作" width="60">
                    <template slot-scope="scope">
                        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button> -->
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
export default {
    name: 'a-detail',
    mixins: [
        js
    ],
    data () {
        return {
            staffNo: '',
            name: '',
            addOrMin: '',
            isEnd: '',
            checkDate: null,
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
