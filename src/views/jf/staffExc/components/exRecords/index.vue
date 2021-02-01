<template>
    <div class="a-detail">
        <div class="search-wrapper">
            <div class="search-item">
                <label>订单状态：</label>
                <el-select v-model="status" placeholder="请选择" size="mini">
                    <el-option
                    v-for="(item) in orderStatusOptions"
                     :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <el-row class="button-wrapper">
                <el-button type="primary" plain size="mini" @click="getList(1)">查询</el-button>
            </el-row>
        </div>

        <div class="table-wrapper">
            <el-table :data="data" size="mini" stripe height="400" style="margin-top: 20px" v-loading="loading"
            :expand-row-keys="expands" 
            :row-key="getRowKeys">
                <!-- <el-table-column type="index" width="55"></el-table-column> -->
                <el-table-column prop="PointOrderID" label="订单编号"></el-table-column>
                <el-table-column prop="TotalPrice" label="总价"></el-table-column>
                <el-table-column prop="orderStatusTxt" label="订单状态"></el-table-column>
                <el-table-column prop="CreationDate" label="兑换日期"></el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" slot="reference"  @click="showDetail(scope.row)">查看详情</el-button>
                        <!-- <el-button type="text" size="mini" slot="reference" @click="finishOrder(scope.row)" v-if="scope.row.OrderStatus == 2">确认领取</el-button> -->

                        <el-popconfirm title="确定已领取？" @onConfirm="finishOrder(scope.row)">
                            <el-button type="text" size="mini" slot="reference" v-if="scope.row.OrderStatus == 2">确认领取</el-button>
                        </el-popconfirm>
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
                                    label="所需积分">
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
import util from '@/libs/util.js'
import { orderStatusOptions, orderStatusDic } from '@/dataDic.js' 
import dayjs from 'dayjs'
export default {
    name: 'a-detail',
    mixins: [
        js
    ],
    data () {
        return {
            dayjs,
            goodsData: [],
            orderStatusOptions,
            orderStatusDic,
            status: '',
            operator: util.cookies.get('uuid'),
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
      getList (page) {
          if(page){
            this.pagination.currentPage = page
          }
          let data = {
              OrderStatus: String(this.status),
              Operator: this.operator,
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize
          }
          this.loading = true;
          this.$api.GET_ORDER_LIST(data).then(res => {
              console.log(res)
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

        // 确认领取
        finishOrder (param) {
            console.log(param)
            let data = {
                Operator: this.operator,
                PointOrderID: param.PointOrderID,
                time: dayjs().format('YYYY-M-D HH:mm:ss')
            }
            console.log(data)
            this.$api.FINISH_ORDER(data).then(res => {
                if (res.code == 0) {
                    this.$message.success('操作成功')
                    this.getList()
                } else {
                    this.$message.error( res.msg || '操作失败，请联系管理员')
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
