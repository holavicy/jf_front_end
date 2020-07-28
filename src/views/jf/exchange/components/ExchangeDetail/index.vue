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
            <el-table :data="data" stripe height="400" style="margin-top: 20px" v-loading="loading" 
            size="mini"
            :expand-row-keys="expands" 
            :row-key="getRowKeys">
                <el-table-column prop="PointOrderID" label="订单编号" width="100"></el-table-column>
                <el-table-column prop="JobId" label="工号"></el-table-column>
                <el-table-column prop="NAME" label="姓名"></el-table-column>
                <el-table-column prop="TotalPrice" label="总价"></el-table-column>
                <el-table-column prop="orderStatusTxt" label="订单状态"></el-table-column>
                <el-table-column prop="CreationDate" label="兑换日期"></el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-popconfirm title="确定通过此订单吗？" @onConfirm="confirmOrder(scope.row)">
                            <el-button type="text" size="mini" slot="reference" v-if="scope.row.OrderStatus == 1">确定</el-button>
                        </el-popconfirm>
                        <el-popconfirm title="确定退回此订单吗？" @onConfirm="rejectOrder(scope.row)">
                            <el-button type="text" size="mini" slot="reference" class="bt-error" v-if="scope.row.OrderStatus == 1">退回</el-button>
                        </el-popconfirm>
                        <el-button type="text" size="mini" slot="reference" @click="showDetail(scope.row)" class="show-detail">查看详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column type="expand" width="1">
                    <template>
                       <div class="inner-table" style="width: 100%">
                         
                                <el-table
                                    :data="goodsData" size="mini"
                                    show-summary
                                    :summary-method="getSummaries"
                                    style="width: 100%">
                                    <el-table-column
                                  type="index">
                                    </el-table-column>
                                    <el-table-column
                                    prop="Name"
                                    label="商品名称">
                                    </el-table-column>
                                    <el-table-column
                                    prop="PointCost"
                                    label="单价">
                                    </el-table-column>
                                    <el-table-column
                                    prop="OrderGoodsAmount"
                                    label="数量">
                                    </el-table-column>
                                    <el-table-column
                                    prop="total"
                                    label="总价">
                                    </el-table-column>
                                </el-table>
                       </div>
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
import { orderStatusOptions, orderStatusDic } from '@/dataDic.js' 
export default {
    name: 'exchange-detail',
    mixins: [
        js
    ],
    data () {
        return {
            orderStatusOptions,
            orderStatusDic,
            staffNo: '',
            orderStatus: '',
            getRowKeys (row) {
                return row.PointOrderID
            },
            expands: []
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
              Operator: String(this.staffNo),
              OrderStatus: String(this.orderStatus),
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize
          }
          this.loading = true;
          this.$api.GET_ORDER_LIST(data).then(res => {
              this.loading = false
              res.data.detail.map((item)=>{
                  item.orderStatusTxt = this.orderStatusDic[item.OrderStatus]
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

        showDetail (data) {
           console.log(data.PointOrderID)
            if (this.expands.length>0) {
                this.expands = []
            } else {
                console.log(data)
                let id = data.PointOrderID;
                let d = {
                    PointOrderID: String(id)
                }
                this.$api.GET_ORDER_GOODS_LIST(d).then((res) => {
                    console.log(res)
                    res.data.map((item) => {
                        item.total = item.PointCost * item.OrderGoodsAmount
                    })
                    this.goodsData = res.data
                    this.expands.push(data.PointOrderID);
                });
            }
        },

        getSummaries (param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '';
                return;
            }
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
            } else {
                sums[index] = '';
            }
            })
            sums[2]='合计'
            return sums;
        },

        confirmOrder (param) {
            console.log(param)
            let data = {
                PointOrderID: param.PointOrderID
            }
            this.$api.CONFIRM_ORDER(data).then(res=>{
                console.log(res)
                if(res.code == 0){
                    this.$message.success("确定成功")
                    this.getList()
                }
            })
        },

        rejectOrder (param) {
            let data = {
                PointOrderID: param.PointOrderID
            }

            this.$api.REJECT_ORDER(data).then(res => {
                if (res.code == 0){
                    this.$message.success("退回成功")
                    this.getList()
                } else {
                    this.$message.error(res.msg || '退回失败，请联系管理员')
                }
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

<style lang="scss">
.el-button--text.bt-error{
    color: #E51C23;
    margin-left: 20px;
    &:hover{
        color: #E51C23;
        opacity: .8;
    }
}

.el-button--text.show-detail{
    margin-left: 20px;
}
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
.inner-table th, .inner-table td{
    border-bottom: none !important;
    font-size: 10px !important;
}

.inner-table th{
    color: #101010 !important;
}
</style>
