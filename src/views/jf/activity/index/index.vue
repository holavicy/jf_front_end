<template>
    <d2-container class="page">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="活动列表" name="list-index">
                <list-index ref="listIndex" @addActivity="addActivity" @editActivity="editActivity"/>
            </el-tab-pane>
            <el-tab-pane label="活动信息" name="info-index">
                <info-index @changeTab="changeTab" :id="ActivitiesID"/>
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
          activeTab: 'list-index',
          ActivitiesID: ''
      }
  },

  methods: {
      changeTab () {
          this.activeTab = 'list-index'
          this.$refs.listIndex.getList();
      },
      addActivity () {
          this.ActivitiesID = ''
          this.activeTab = 'info-index'
      },
      editActivity (data) {
          this.ActivitiesID = data
          this.activeTab = 'info-index'
          
      }
  }
}
</script>
