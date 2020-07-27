<template>
    <d2-container class="page">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="兑换记录" name="exchange-detail">
                <exchange-detail/>
            </el-tab-pane>
            <el-tab-pane label="兑换商品维护" name="goods-config">
                <goods-config/>
            </el-tab-pane>
            <el-tab-pane label="商品出入库统计" name="goods-summary">
                <goods-summary/>
            </el-tab-pane>
        </el-tabs>
    </d2-container>
</template>

<script>
import ExchangeDetail from '../components/ExchangeDetail'
import GoodsConfig from '../components/GoodsConfig'
import GoodsSummary from '../components/GoodsSummary'
export default {
  components: {
    ExchangeDetail,
    GoodsConfig,
    GoodsSummary
  },
  data () {
      return {
          activeTab: 'exchange-detail'
      }
  }
}
</script>

