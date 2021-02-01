<template>
    <d2-container class="page">
        <el-tabs v-model="activeTab" v-show="showTab == 1" @tab-click="tabClick">
            <el-tab-pane label="积分看板" name="summary">
               <summary-index ref="summary" @changeTab="changeTab" @activityTab="activityTab"/>
            </el-tab-pane>
            <el-tab-pane label="A分明细" name="a-detail">
                <a-detail ref="aDetail" :isEndVal="isEnd"/>
            </el-tab-pane>
            <el-tab-pane label="B管理积分明细" name="b-manage-detail">
                <b-manage-detail ref="bManageDetail" :isEndVal="isEnd"/>
            </el-tab-pane>
            <el-tab-pane label="B固定积分" name="b-fixed">
                <b-fixed ref="bFixed"/>
            </el-tab-pane>
            
            <el-tab-pane label="年度累计积分" name="year-total-summary">
                <year-total-summary ref="yearTotalSummary"/>
            </el-tab-pane>

        </el-tabs>

        <el-tabs v-model="activeTab" v-show="showTab == 2" @tab-click="tabClick">
            <el-tab-pane label="积分看板" name="summary">
               <summary-index ref="summary" @changeTab="changeTab" @activityTab="activityTab"/>
            </el-tab-pane>
            <el-tab-pane label="积分活动" name="activity">
                <activity-index ref="activity"/>
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
import YearTotalSummary  from '../components/YearTotalSummary'
import TotalSummary from '../components/TotalSummary'
export default {
  components: {
    ADetail,
    SummaryIndex,
    BManageDetail,
    BFixed,
    ActivityIndex,
    YearTotalSummary,
    TotalSummary
  },
  data () {
      return {
          activeIndex: 0,
          isEnd: '',
          activeTab: 'summary',
          showTab: 1
      }
  },

  methods: {
      changeTab (data) {
          this.showTab = 1
        //   this.showTab = data.type
          if(data.type == 1) {
            switch(data.index) {
              case 0:
                  this.isEnd = '否'
                  this.activeTab = 'a-detail'
                  break
              case 1:
                  this.activeTab = 'a-detail'
                  this.isEnd = ''
                  break
              case 2:
                  break
              case 3:
                  this.activeTab = 'b-manage-detail'
                  this.isEnd = ''
                  break
              case 4:
                  this.activeTab = 'b-fixed'
                  this.$refs.bFixed.getSummary()
                  this.$refs.bFixed.getDetail()
                  break
            }
          }

          if (data.type == 2) {
            switch(data.index) {
              case 0:
                  this.activeTab = 'year-total-summary';
                  this.$refs.yearTotalSummary.getFixTotal()
                  break
              case 1:
                  break
            }
          }

      },

      activityTab (i) {
           this.showTab = 2
           this.activeTab = 'activity'
        //    this.activeIndex = i;
           this.$refs.activity.getInfo(i)
           console.log(i)
      },

      tabClick (e) {
          if (e.name == "a-detail") {
              this.$refs.aDetail.getList()
          }
          if (e.name == "b-manage-detail") {
              this.$refs.bManageDetail.getList()
          }
          if (e.name == "b-fixed") {
              this.$refs.bFixed.getSummary()
              this.$refs.bFixed.getDetail()
          }
      }
  }
}
</script>
