<template>
    <div class="a-detail">
        <div class="search-wrapper">
            <div class="search-item">
                <label>商品名称：</label><el-input placeholder="请输入商品名称" v-model="goodsName" size="mini"></el-input>
            </div>

            <el-row class="button-wrapper">
                <el-button type="primary" plain size="mini" @click="getList">查询</el-button>
            </el-row>
        </div>

        <div class="table-wrapper">
            <el-table :data="data" size="mini" stripe height="400" style="margin-top: 20px" v-loading="loading">
                <el-table-column type="index" width="55"></el-table-column>
                <el-table-column prop="JobId" label="商品图片">
                    <template slot-scope="scope">
                        <el-upload class="avatar-uploader" action="default" :show-file-list="false">
                            <img v-if="scope.row.imageUrl" :src="scope.row.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!-- <el-image style="width: 100px; height: 100px" :src="scope.row.imageUrl" :fit="fit"></el-image> -->
                    </template>
                </el-table-column>
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column prop="price" label="单价"></el-table-column>
                <el-table-column prop="stock" label="商品库存"></el-table-column>
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
export default {
    name: 'a-detail',
    mixins: [
        js
    ],
    data () {
        return {
            goodsName: ''
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
              res.data.detail.map((item) => {
                  item.checkDate = dayjs(item.AssessmentDate).format('YYYY-M-D')
                  console.log(item.checkDate)
                  item.isEnd = item.IsAccounted == 0?'否':'是'
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
       *加入购物车
       */
       addToCart (row) {
           console.log(row)
           let data = {
               GoodsID: row.GoodsID,
               num: 1,
               Operator: '100297'
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
