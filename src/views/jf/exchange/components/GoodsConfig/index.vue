<template>
    <div class="a-detail">
        <div class="search-wrapper">
            <div class="search-item">
                <label>商品名称：</label><el-input placeholder="请输入商品名称" v-model="goodsName" size="mini"></el-input>
            </div>
  
            <div class="search-item">
                <label>商品状态：</label><el-select v-model="goodsStatus" placeholder="请选择" size="mini">
                    <el-option v-for="item in goodsStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <el-row class="button-wrapper">
                <el-button type="primary" plain size="mini" @click="getList">查询</el-button>
                <el-upload action="default" :before-upload="beforeUpload" :http-request="importFile" :show-file-list="false" style="margin: 0 10px">
                    <el-button type="primary" plain size="mini">导入</el-button>
                </el-upload>

                <!-- <el-button type="primary" size="mini" @click="exportFile">导出</el-button>
                <el-button type="primary" plain size="mini" @click="settleAccounts">结算</el-button> -->
            </el-row>
        </div>

        <div class="table-wrapper">
            <el-table :data="data" size="mini" stripe height="400" style="margin-top: 20px" v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="index" width="55"></el-table-column>
                <el-table-column prop="JobId" label="商品图片" width="70">
                    <template slot-scope="scope">
                        <el-upload class="avatar-uploader" action="default" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!-- <el-image style="width: 60px; height: 60px" :src="scope.row.imageUrl"></el-image> -->
                    </template>
                </el-table-column>
                <el-table-column prop="Name" label="商品名称"></el-table-column>
                <el-table-column prop="DepartmentLv1" label="单价" width="100"></el-table-column>
                <el-table-column prop="DepartmentLv3" label="商品状态" width="100"></el-table-column>
                <el-table-column prop="isEnd" label="商品库存" width="80"></el-table-column>
                <el-table-column fixed="right" label="操作" width="60">
                    <template slot-scope="scope">
                        <el-popconfirm title="确定删除此条记录吗？" @onConfirm="deleteDetail(scope.row)">
                            <el-button type="text" size="mini" slot="reference">下架</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[5, 10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import js from './mixins/index'
import util from '@/libs/util.js'
export default {
    name: 'a-detail',
    mixins: [
        js
    ],
    data () {
        return {
            goodsName: '',
            goodsStatus: '',
            file: null,
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
              Name: this.name,
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize,
          }
          this.loading = true;
          this.$api.GET_GOODS_LIST(data).then(res => {
              this.loading = false
              this.data = res.data.detail
              this.pagination.total = res.data.total
          }).catch(err => {
              console.log('err', err);
              this.loading = false
          })
      },

    handleSelectionChange (selection) {

        let selectedRewards = [];
        selection.map((item) => {
            selectedRewards.push(item.RewardPointsdetailID)
        })

        this.rewards = selectedRewards.join(',')
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
                    this.$message.error(res.msg || '删除失败')
                }
            }).catch(err => {
                console.log(err)
            })
        },

        /**
         * 导出
         */
        exportFile () {
            let data = {
              goodsName: this.goodsName,
              isBonus: this.addOrMin,
              isAccounted: this.isEnd,
              beginDate: this.checkDate? dayjs(this.checkDate[0]).format('YYYY-M-D HH:mm:ss') :'',
              endDate: this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :'',
              rewardPointsType: 'A分',
              Operator: this.operator
          }
          this.$api.EXPORT_DETAIL_LIST(data).then(res => {
              if (res.code === 0) {
                  window.location.href = res.data
              } else {
                  this.$message.error(res.msg || '导出失败，请联系管理员')
              }
              
          }).catch(err => {
              console.log('err', err)
          })
        },

        /**
         * 结算
         */
        settleAccounts () {
            if (!this.jobids) {
                this.$message.warning('请选择要结算的记录')
                return
            }
            let data = {
              RewardPointsdetailID: this.rewards
          }
          this.$api.ACCOUNT_DETAIL_LIST(data).then(res => {
              if (res.code === 0) {
                  this.$message.success('结算成功');
                  this.getList()
              } else {
                  this.$message.error(res.msg || '结算失败，请联系管理员')
              }
          }).catch(err => {
              console.log('err', err)
          })
        },

      importFile () {
        const _this = this;
        _this.source = axios.CancelToken.source();
        let fileData = new FormData();
        fileData.append('file', _this.file)
        fileData.append('Operator', this.operator)
        let url = '/api/import_goods';
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
