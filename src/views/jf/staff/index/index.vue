<template>
    <d2-container class="page">
        <el-tabs>
            <el-tab-pane label="积分看板">
               <summary-index/>
            </el-tab-pane>
            <el-tab-pane label="A分明细">
                <a-detail/>
            </el-tab-pane>
            <el-tab-pane label="B管理积分明细">
                <b-manage-detail/>
            </el-tab-pane>
            <el-tab-pane label="B固定积分">
                <b-fixed/>
            </el-tab-pane>
            <el-tab-pane label="积分活动">
                积分活动
            </el-tab-pane>
        </el-tabs>
    </d2-container>
</template>

<script>
import ADetail from '../components/ADetail'
import SummaryIndex from '../components/summary'
import BManageDetail from '../components/BManageDetail'
import BFixed from '../components/BFixed'
export default {
  components: {
    ADetail,
    SummaryIndex,
    BManageDetail,
    BFixed
  }
}
</script>
