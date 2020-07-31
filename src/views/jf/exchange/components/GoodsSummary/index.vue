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
                <el-button type="primary" size="mini" @click="exportFile">导出</el-button>
                <!-- <el-button type="primary" plain size="mini" @click="settleAccounts">结算</el-button> -->
            </el-row>
        </div>

        <div class="table-wrapper">
            <el-table :data="data" size="mini" stripe height="400" style="margin-top: 20px" v-loading="loading">
                 <el-table-column type="index" width="55"></el-table-column>
                <el-table-column prop="JobId" label="商品图片" width="70">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.PictureUrl" class="avatar" style="width:60px; height:60px"/>
                    </template>
                </el-table-column>
                <el-table-column prop="Name" label="商品名称"></el-table-column>
                <el-table-column prop="PointCost" label="所需积分" width="120"></el-table-column>
                <el-table-column prop="goodsStatus" label="商品状态" width="120"></el-table-column>
                <el-table-column prop="TotalIn" label="总入库" width="100"></el-table-column>
                <el-table-column prop="TotalOut" label="总出库" width="100"></el-table-column>
                <el-table-column prop="TotalLock" label="已锁定" width="100"></el-table-column>
                <el-table-column prop="stock" label="商品库存" width="100"></el-table-column>
                
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[5, 10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import js from './mixins/index'
import util from '@/libs/util.js'
import { goodsStatusDic } from '@/dataDic.js' 
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
              Status: this.goodsStatus,
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize,
          }
          this.loading = true;
          this.$api.GET_GOODS_LIST(data).then(res => {
              this.loading = false
               res.data.detail.map((item) => {
                  item.goodsStatus = goodsStatusDic[item.Status]
                  item.stock = item.TotalIn - item.TotalOut - item.TotalLock
                  item.PictureUrl = 'http://'+this.HOST+item.PictureUrl
              })
              this.data = res.data.detail
              this.pagination.total = res.data.total
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
         * 导出
         */
        exportFile () {
            let data = {
              Name: this.name,
              Status: this.goodsStatus,
              Operator: Number(this.operator)
          }
          this.$api.EXPORT_GOODS(data).then(res => {
              if (res.code === 0) {
                  this.$message.success('导出成功')
                  window.location.href = res.data
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
