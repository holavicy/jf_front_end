<template>
    <d2-container class="page">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="活动列表" name="list-index">
                <list-index/>
            </el-tab-pane>
            <el-tab-pane label="新增活动" name="info-index">
                <info-index/>
            </el-tab-pane>
        </el-tabs>
    </d2-container>
</template>

<script>
import ListIndex from '../components/list'
import InfoIndex from '../components/info'
export default {
  components: {
    ListIndex,
    InfoIndex
  },
  data () {
      return {
          activeTab: 'info-index'   
      }
  }
}
</script>
