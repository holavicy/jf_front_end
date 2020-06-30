<template>
    <d2-container class="page">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="A分明细" name="a-detail">
                <a-detail/>
            </el-tab-pane>
            <el-tab-pane label="B管理积分明细" name="b-manage-detail">
                <b-manage-detail/>
            </el-tab-pane>
            <el-tab-pane label="B固定积分" name="b-fixed">
                <b-fixed/>
            </el-tab-pane>
            <el-tab-pane label="人员汇总" name="activity">
                <staff-summary/>
            </el-tab-pane>
        </el-tabs>
    </d2-container>
</template>

<script>
import ADetail from '../components/ADetail'
import BManageDetail from '../components/BManageDetail'
import BFixed from '../components/BFixed'
import StaffSummary from '../components/StaffSummary'
export default {
  components: {
    ADetail,
    BManageDetail,
    BFixed,
    StaffSummary
  },
  data () {
      return {
          activeTab: 'a-detail'
      }
  }
}
</script>

