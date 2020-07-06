<template>
    <div class="exchange-detail">
        <div class="search-wrapper">
            <div class="search-item">
                <label>工号：</label><el-input placeholder="请输入工号" v-model="staffNo" size="mini"></el-input>
            </div>
            <div class="search-item">
                <label>订单状态：</label><el-select v-model="orderStatus" placeholder="请选择" size="mini">
                    <el-option v-for="item in orderStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <el-row class="button-wrapper">
                <el-button type="primary" plain size="mini" @click="getList">查询</el-button>
                <el-button type="primary" size="mini" @click="exportFile">导出</el-button>
            </el-row>
        </div>

        <div class="table-wrapper">
            <el-table :data="data" stripe height="400" style="margin-top: 20px" v-loading="loading" expand-row-keys="1" row-key="RewardPointsdetailID">
                <el-table-column prop="jobid" label="订单编号" width="100"></el-table-column>
                <el-table-column prop="name" label="工号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="DepartmentLv1" label="业务单元"></el-table-column>
                <el-table-column prop="DepartmentLv3" label="部门"></el-table-column>
                <el-table-column prop="IsAccounted" label="总价"></el-table-column>
                <el-table-column prop="BonusPoints" label="订单状态"></el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-popconfirm title="确定通过此订单吗？" @onConfirm="deleteDetail(scope.row)">
                            <el-button type="text" size="mini" slot="reference">确定</el-button>
                        </el-popconfirm>
                        <el-popconfirm title="确定退回此订单吗？" @onConfirm="deleteDetail(scope.row)">
                            <el-button type="text" size="mini" slot="reference">退回</el-button>
                        </el-popconfirm>
                        <el-button type="text" size="mini" slot="reference">查看详情</el-button>
                    </template>
                </el-table-column>
                 <el-table-column type="expand"><template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>
        </div>
    </div>
</template>


<script>
import js from './mixins/index'
import dayjs from 'dayjs'
import { orderStatusOptions } from '@/dataDic.js' 
export default {
    name: 'exchange-detail',
    mixins: [
        js
    ],
    data () {
        return {
            orderStatusOptions,
            staffNo: '',
            orderStatus: ''
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
              jobid: Number(this.staffNo),
              orderStatus: this.orderStatus,
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize
          }
          this.loading = true;
          this.$api.GET_ORDER_DETAIL_LIST(data).then(res => {
              this.loading = false
              this.data = res.detail
              this.pagination.total = res.total
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
              name: this.name,
              jobid: this.staffNo,
              isBonus: this.addOrMin,
              isAccounted: this.isEnd,
              beginDate: this.checkDate? dayjs(this.checkDate[0]).format('YYYY-M-D HH:mm:ss') :'',
              endDate: this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :'',
              rewardPointsType: 'A'
          }
          this.$api.EXPORT_DETAIL_LIST(data).then(res => {
              if (res.code === 0) {
                  this.$message.success('导出成功')
              } else {
                  this.$message.error(res.msg || '导出失败，请联系管理员')
              }
          }).catch(err => {
              console.log('err', err)
          })
        }

    }
}

</script>

<style scoped lang="scss">
.exchange-detail {
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
