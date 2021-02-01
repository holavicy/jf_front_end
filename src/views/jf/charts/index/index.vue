<template>
    <d2-container class="page">
        <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="分类统计" name="count-summary">
                <count-summary ref="count"/>
            </el-tab-pane>
            <el-tab-pane label="趋势统计" name="score-summary">
                <score-summary ref="tendency"/>
            </el-tab-pane>
            <el-tab-pane label="排名统计" name="rank-summary">
                <rank-summary ref="rank"/>
            </el-tab-pane>
            <!-- <el-tab-pane label="库存统计" name="stock-summary">
                <stock-summary ref="stock"/>
            </el-tab-pane> -->
        </el-tabs>
    </d2-container>
</template>

<script>
import CountSummary from '../components/CountSummary'
import RankSummary from '../components/RankSummary'
import ScoreSummary from '../components/ScoreSummary'
import StockSummary from '../components/StockSummary'
export default {
  components: {
    CountSummary,
    RankSummary,
    ScoreSummary,
    StockSummary  },
  data () {
      return {
          activeTab: 'count-summary'
      }
  },
  methods:{
      tabClick (e) {
          if (e.name == "count-summary") {
              this.$refs.count.getData()
          }
          if (e.name == "score-summary") {
              this.$refs.tendency.getData()
          }
          if (e.name == "rank-summary") {
              this.$refs.rank.getData()
          }
          if (e.name == "stock-summary") {
              this.$refs.stock.getData()
          }
      }
  }
}
</script>

