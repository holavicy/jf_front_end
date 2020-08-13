<template>
    <div class="shopping-cart">

        <div class="table-wrapper">
            <el-table :data="data" size="mini" stripe height="350" style="margin-top: 20px" v-loading="loading">
                <el-table-column type="index" width="55"></el-table-column>
                <el-table-column prop="JobId" label="商品图片">
                    <template slot-scope="scope">
                        <el-image style="width: 60px; height: 60px" :src="scope.row.PictureUrl"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="Name" label="商品名称"></el-table-column>
                <el-table-column prop="PointCost" label="所需积分"></el-table-column>
                <el-table-column fixed="right" label="数量" width="180">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.GoodsAmount" @change="handleChange(scope.row)" :min="0" :max="scope.row.TotalIn-scope.row.TotalOut-scope.row.TotalLock||0" label="描述文字" size="mini"></el-input-number>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="total-wrapper">
            <div>共计：<span class="special-info">{{totalNum}}</span>件，<span class="special-info">{{totalPrice}}</span>分</div>
            <el-button type="primary" @click="createPay">立即兑换</el-button>
        </div>
    </div>
</template>


<script>
import js from './mixins/index'
import util from '@/libs/util.js'
export default {
    name: 'a-detail',
    mixins: [
        js
    ],
    data(){
        return {
            operator: util.cookies.get('uuid')
        }
    },
    computed: {
      totalNum: function () {
        let totalNum = 0;
        this.data.map( (item) => {
          totalNum = totalNum+item.GoodsAmount
        })
        return totalNum
      },
      totalPrice: function () {
        let totalPrice = 0;
        this.data.map( (item) => {
          totalPrice = totalPrice+(item.GoodsAmount * item.PointCost)
        })
        return totalPrice
      }
    },

  methods: {
      /**
       * 获取列表数据
       */
      getList () {
          let data = {
              Operator: this.operator
          }
          this.loading = true;
          this.$api.GET_CART_LIST(data).then(res => {
              this.loading = false
              res.data.map((item) => {
                  item.PictureUrl = 'http://'+this.HOST+item.PictureUrl
                  item.TotalLock = item.TotalLock || 0
                  item.stock = item.TotalIn - item.TotalOut - item.TotalLock
              })
              this.data = res.data
          }).catch(err => {
              console.log('err', err);
              this.loading = false
          })
      },

      handleChange (e) {
          console.log(e);
          if (e.GoodsAmount == 0) {
               this.$confirm('确定将此商品从购物车移除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let data = {
                        ShoppingCartID: e.ShoppingCartID
                    }
                    this.deleteCartFc(data);
                
                }).catch(() => {
                    e.GoodsAmount = 1         
                });
          } else {
              let data = {
                  ShoppingCartID: e.ShoppingCartID,
                  num: e.GoodsAmount,
                  GoodsID: e.GoodsID
              }
              this.$api.EDIT_CART_NUM(data).then(res => {
                  console.log(res)

                  if (res.code == -1){
                      this.$message.error(res.msg || '修改购物车数量失败，请刷新后再试')
                      this.getList()
                  }
              })
          }
      },

      deleteCartFc(data){
          this.$api.DELETE_CART(data).then((res) => {
              if (res.code == 0){
                  this.getList();
                  this.$message({
                    type: 'success',
                    message: '移除成功!'
                });
              } else {
                  this.$message({
                    type: 'error',
                    message: res.msg || '操作失败'
                });
              }
          })
      },

      /**
       * 创建订单
       */
      createPay () {

          if(this.data.length<=0){
              return
          }

          this.$confirm('确定提交订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.getTotalBAmount().then((res) => {
              if(res>=this.totalPrice){
                  this.createPayFc()
              } else {
                  this.$message.error('当前可兑换积分不足')
              }
          })
        }).catch(() => {
                  
        });

         

          
      },

      createPayFc(){
          //获取用户当前可兑换积分，若小于购物车总金额，则提示积分不足
          let ShoppingCartIDList = []
          let GoodsIDList = []
          this.data.map((item) => {
              ShoppingCartIDList.push(item.ShoppingCartID)
              GoodsIDList.push(item.GoodsID)
          })
          let data = {
              ShoppingCartIDs: ShoppingCartIDList.join(','),
              GoodsIDs: GoodsIDList.join(','),
              Operator: this.operator
          }
          this.$api.CREATE_PAY(data).then(res => {
              console.log(res)
              if (res.code == 0){
                  this.$message.success("订单提交成功，等待管理员确认中")
                  this.getList()
              } else {
                  this.$message.error(res.msg || '提交订单失败，请刷新后再试')
              }
          })
      },

        //获取当前可兑换积分
      getTotalBAmount(){
          return new Promise((resolve, reject) => {
            let data = {
                jobid: String(this.operator)
            }
            this.$api.GET_SUMMARY_LIST(data).then((res)=>{
                let result = res.data.detail[0]
                console.log(result["现有管理积分"])
                resolve(result["现有管理积分"])
            })
          })
      }
    }
}

</script>

<style scoped lang="scss">
.shopping-cart {
    .total-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;

        .special-info{
            font-size: 40px;
            margin: 0 15px;
            color: $color-primary;
        }
    }
}
</style>
