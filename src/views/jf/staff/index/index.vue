<template>
    <d2-container class="page">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="积分看板" name="summary">
               <summary-index/>
            </el-tab-pane>
            <el-tab-pane label="A分明细" name="a-detail">
                <a-detail/>
            </el-tab-pane>
            <el-tab-pane label="B管理积分明细" name="b-manage-detail">
                <b-manage-detail/>
            </el-tab-pane>
            <el-tab-pane label="B固定积分" name="b-fixed">
                <b-fixed/>
            </el-tab-pane>
            <el-tab-pane label="积分活动" name="activity">
                <activity-index/>
            </el-tab-pane>
        </el-tabs>
    </d2-container>
</template>

<script>
import ADetail from '../components/ADetail'
import SummaryIndex from '../components/summary'
import BManageDetail from '../components/BManageDetail'
import BFixed from '../components/BFixed'
import ActivityIndex from '../components/activity'
export default {
  components: {
    ADetail,
    SummaryIndex,
    BManageDetail,
    BFixed,
    ActivityIndex
  },
  data () {
      return {
          activeTab: 'summary'
      }
  }
}
</script>
