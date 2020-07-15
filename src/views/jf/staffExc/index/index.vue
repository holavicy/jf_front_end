<template>
    <d2-container class="page">
        <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="兑换商品" name="goods-list">
                <goods-list ref="goods"/>
            </el-tab-pane>
            <el-tab-pane label="购物车" name="shopping-cart">
                <shopping-cart ref="cart"/>
            </el-tab-pane>
            <el-tab-pane label="兑换记录" name="ex-records">
                <ex-records ref="records"/>
            </el-tab-pane>
        </el-tabs>
    </d2-container>
</template>

<script>
import GoodsList from '../components/goodsList'
import ShoppingCart from '../components/shoppingCart'
import ExRecords from '../components/exRecords'
export default {
  components: {
    GoodsList,
    ShoppingCart,
    ExRecords
  },
  data () {
      return {
          activeTab: 'goods-list'
      }
  },

  methods: {
      tabClick (e) {
          if (e.name == "goods-list") {
              this.$refs.goods.getList()
          }
          if (e.name == "shopping-cart") {
              this.$refs.cart.getList()
          }
          if (e.name == "ex-records") {
              this.$refs.records.getList()
          }
      }
  }
}
</script>

