<template>
    <div class="a-detail">
        <div class="search-wrapper">
            <div class="search-item">
                <label>商品名称：</label><el-input placeholder="请输入商品名称" v-model="goodsName" size="mini"></el-input>
            </div>

            <el-row class="button-wrapper">
                <el-button type="primary" plain size="mini" @click="getList(1)">查询</el-button>
            </el-row>
        </div>

        <div class="table-wrapper">
            <el-table :data="list" size="mini" stripe height="400" style="margin-top: 20px" v-loading="loading">
                <el-table-column type="index" width="55"></el-table-column>
                <el-table-column prop="PictureUrl" label="商品图片" width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 60px; height: 60px" :src="scope.row.PictureUrl"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="Name" label="商品名称"></el-table-column>
                <el-table-column prop="PointCost" label="所需积分" width="120"></el-table-column>
                <el-table-column prop="stock" label="商品库存" width="120"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
   
                        <el-button type="text" size="mini" slot="reference" @click="addToCart(scope.row)">加入购物车</el-button>
                   
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
      getList (page) {
          if(page){
            this.pagination.currentPage = page
          }
          let data = {
              Status:0,
              Name: this.goodsName,
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize,
          }
          this.loading = true;
          this.$api.GET_GOODS_LIST(data).then(res => {
              this.loading = false
              res.data.detail.map((item) => {
                  item.stock = item.TotalIn - item.TotalOut-item.TotalLock
                  item.PictureUrl = 'http://'+this.HOST+item.PictureUrl
              })
              this.list = res.data.detail
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
       *加入购物车
       */
       addToCart (row) {
           let data = {
               GoodsID: row.GoodsID,
               num: 1,
               Operator: this.operator
           }
           this.$api.ADD_CART(data).then((res) => {
               if (res.code == 0) {
                   this.$message.success('成功加入购物车')
               } else {
                   this.$message.error(res.msg || '加入购物车失败，请刷新后再试')
               }
           }).catch((err) => {
               console.log(err)
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
