<template>
    <d2-container class="page">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="兑换商品" name="goods-list">
                <goods-list/>
            </el-tab-pane>
            <el-tab-pane label="购物车" name="shopping-cart">
                <shopping-cart/>
            </el-tab-pane>
            <el-tab-pane label="兑换记录" name="ex-records">
                <ex-records/>
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
  }
}
</script>

