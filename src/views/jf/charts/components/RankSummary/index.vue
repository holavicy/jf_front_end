<template>
    <div class="count-summary">
      <div class="search-wrapper">
            <div class="search-item">
                <label>报表名称：</label><el-select v-model="type" placeholder="请选择" size="mini" @change="typeChange">
                    <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="search-item" v-show="type == 1 || type == 2 || type == 3 || type == 7">
                <label>考核日期：</label>
                 <el-date-picker v-model="checkDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" size="mini"></el-date-picker>
            </div>
            <div class="search-item" v-show="type == 4 || type == 5 || type == 6">
              <label>考核日期：</label>
              <el-date-picker v-model="searchMonth" type="month" placeholder="选择月" size="mini"></el-date-picker>
              <!-- <el-date-picker v-model="checkDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" size="mini"></el-date-picker> -->
            </div>
            <div class="search-item" v-show="type == 8">
              <label>考核年份：</label>
              <el-date-picker v-model="searchYear" type="year" placeholder="选择年" size="mini"></el-date-picker>
              <!-- <el-date-picker v-model="checkDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" size="mini"></el-date-picker> -->
            </div>
            <el-row class="button-wrapper">
              <el-button type="primary" size="mini" @click="getData()" v-show="type !== 8">查询</el-button>
              <el-button type="primary" size="mini" @click="getSumData()" v-show="type == 8">查询</el-button>
              <el-button type="primary" plain size="mini" @click="exportTable()">导出</el-button>
            </el-row>
        </div>

        <div>
          <!-- 加减分合计-职务级别 -->
          <el-table border size="mini" :data="tableData" style="width: 100%" :default-sort = "{prop: 'totalScore', order: 'descending'}" v-loading="loading" v-show="type == 1">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="groupType" label="职务级别" width="240"></el-table-column>
            <el-table-column prop="totalBonus" label="加分" sortable width="80"></el-table-column>
            <el-table-column prop="totalMinus" label="减分" sortable width="80"></el-table-column>
            <el-table-column prop="totalScore" label="累计管理积分" width="120" sortable></el-table-column>
          </el-table>

          <!-- 加减分合计-业务单元 -->
          <el-table border size="mini" :data="tableData" style="width: 100%" :default-sort = "{prop: 'totalScore', order: 'descending'}" v-loading="loading" v-show="type == 2">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="groupType" label="公司/业务单元" width="240"></el-table-column>
            <el-table-column prop="totalBonus" label="加分" sortable width="80"></el-table-column>
            <el-table-column prop="totalMinus" label="减分" sortable width="80"></el-table-column>
            <el-table-column prop="totalScore" label="累计管理积分" width="120" sortable></el-table-column>
          </el-table>

          <!-- 加减分合计-一级部门 -->
          <el-table border size="mini" :data="tableData" style="width: 100%" :default-sort = "{prop: 'totalScore', order: 'descending'}" v-loading="loading" v-show="type == 3">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="DepartmentLv1" label="公司" width="180" ></el-table-column>
            <el-table-column prop="DepartmentLv2" label="一级部门" width="240"></el-table-column>
            <el-table-column prop="totalBonus" label="加分" sortable width="80"></el-table-column>
            <el-table-column prop="totalMinus" label="减分" sortable width="80"></el-table-column>
            <el-table-column prop="totalScore" label="累计管理积分" width="120" sortable></el-table-column>
          </el-table>

          <!-- 人均统计排名-职务级别 -->
          <el-table border size="mini" :data="tableData" style="width: 100%" :default-sort = "{prop: 'totalScore', order: 'descending'}" v-loading="loading" v-show="type == 4">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="groupType" label="职务级别" width="240"></el-table-column>
            <el-table-column prop="totalBonus" label="加分" sortable width="80"></el-table-column>
            <el-table-column prop="totalMinus" label="减分" sortable width="80"></el-table-column>
            <el-table-column prop="totalScore" label="累计管理积分" width="120" sortable></el-table-column>
            <el-table-column prop="NUM" label="总人数" width="80"></el-table-column>
            <el-table-column prop="avg" label="人均加分" sortable width="100"></el-table-column>
            <el-table-column prop="percent" label="人均加分率" sortable></el-table-column>
          </el-table>

          <!-- 人均统计排名-业务单元 -->
          <el-table border size="mini" :data="tableData" style="width: 100%" :default-sort = "{prop: 'totalScore', order: 'descending'}" v-loading="loading" v-show="type == 5">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="groupType" label="公司/业务单元" width="240"></el-table-column>
            <el-table-column prop="totalBonus" label="加分" sortable width="80"></el-table-column>
            <el-table-column prop="totalMinus" label="减分" sortable width="80"></el-table-column>
            <el-table-column prop="totalScore" label="累计管理积分" width="120" sortable></el-table-column>
            <el-table-column prop="NUM" label="总人数" width="80"></el-table-column>
            <el-table-column prop="avg" label="人均加分" sortable width="100"></el-table-column>
            <el-table-column prop="percent" label="人均加分率" sortable></el-table-column>
          </el-table>

          <!-- 人均统计排名-一级部门 -->

          <el-table border size="mini" :data="tableData" style="width: 100%" :default-sort = "{prop: 'totalScore', order: 'descending'}" v-loading="loading" v-show="type == 6">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="DepartmentLv1" label="公司" width="180" ></el-table-column>
            <el-table-column prop="DepartmentLv2" label="一级部门" width="240"></el-table-column>
            <el-table-column prop="totalBonus" label="加分" sortable width="80"></el-table-column>
            <el-table-column prop="totalMinus" label="减分" sortable width="80"></el-table-column>
            <el-table-column prop="totalScore" label="累计管理积分" width="120" sortable></el-table-column>
            <el-table-column prop="NUM" label="总人数" width="80"></el-table-column>
            <el-table-column prop="avg" label="人均加分" sortable width="100"></el-table-column>
            <el-table-column prop="percent" label="人均加分率" sortable></el-table-column>
          </el-table>

          <!-- 个人管理积分排名 -->
          <el-table border :data="tableData" stripe height="400" style="margin-top: 20px" v-loading="loading" size="mini" :default-sort = "{prop: 'totalScore', order: 'descending'}" v-show="type == 7">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="JobId" label="工号" width="70"></el-table-column>
            <el-table-column prop="Name" label="姓名" width="100"></el-table-column>
            <!-- <el-table-column prop="组织" label="一级部门" width="180"></el-table-column>
            <el-table-column prop="DEP1" label="二级部门" width="140"></el-table-column>
            <el-table-column prop="DEP2" label="三级部门" width="140"></el-table-column> -->
            <!-- <el-table-column prop="年度管理积分" label="年度管理积分" width="120" sortable></el-table-column> -->
            <el-table-column prop="totalBonus" label="总获得B管理积分加分" width="160" sortable></el-table-column>
            <el-table-column prop="totalMinus" label="总获得B管理积分减分" width="160" sortable></el-table-column>
            <el-table-column prop="totalScore" label="总获得B管理积分" width="160" sortable></el-table-column>
            <!-- <el-table-column prop="总累计积分" label="总累计积分" width="120" sortable></el-table-column> -->
          </el-table>

          <!-- 个人合计排名 -->
          <el-table :data="tableData" stripe height="400" style="margin-top: 20px" v-loading="loading" size="mini" :default-sort = "{prop: '总累计积分', order: 'descending'}" v-show="type == 8">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="工号" label="工号" width="70"></el-table-column>
              <el-table-column prop="姓名" label="姓名" width="100"></el-table-column>
              <!-- <el-table-column prop="组织" label="一级部门" width="180"></el-table-column>
              <el-table-column prop="DEP1" label="二级部门" width="140"></el-table-column>
              <el-table-column prop="DEP2" label="三级部门" width="140"></el-table-column> -->
              <el-table-column prop="年度管理积分" label="年度管理积分" width="120" sortable></el-table-column>
              <el-table-column prop="总获得管理积分" label="总获得B管理积分" width="160" sortable></el-table-column>
              <el-table-column prop="总累计积分" label="总累计积分" width="120" sortable></el-table-column>
          </el-table>
        </div>
    </div>
</template>

<script>
import js from './mixins/index'
import dayjs from 'dayjs'
import Vue from 'vue'
import pluginExport from '@d2-projects/vue-table-export'
Vue.use(pluginExport)
export default {
  name: 'count-summary',
  mixins: [
      js
  ],
  data () {
    return {
      dataEmpty: false,
      type:1,
      checkDate: [new Date(), new Date()],
      searchMonth: new Date(),
      searchYear: new Date(),
      tableColumns:[
          { label: '职务级别', prop: 'groupType' },
          { label: '加分', prop: 'totalBonus' },
          { label: '减分', prop: 'totalMinus' },
          { label: '累计管理积分', prop: 'totalScore' },
          { label: '总人数', prop: 'NUM' },
          { label: '人均加分', prop: 'avg' },
          { label: '人均加分率', prop: 'percent' }
      ],
      tableData: [],
      data: []
    }
  },

  methods: {
    //获取数据
    getData () {

      let startTime = this.checkDate? dayjs(this.checkDate[0]).startOf('month').format('YYYY-M-D HH:mm:ss') :''
      let endTime = this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :''

      // 单月选择
      if (this.type >=4 && this.type <=6) {
        startTime = this.searchMonth? dayjs(this.searchMonth).startOf('month').format('YYYY-M-D HH:mm:ss') :''
        endTime = this.searchMonth? dayjs(this.searchMonth).endOf('month').format('YYYY-M-D HH:mm:ss') :''
      }

      // 单年选择
      if (this.type == 8) {
        startTime = this.searchYear? dayjs(this.searchYear).startOf('year').format('YYYY-M-D HH:mm:ss') :''
        endTime = this.searchYear? dayjs(this.searchYear).endOf('year').format('YYYY-M-D HH:mm:ss') :''
      }

      let data = {
        cateType: this.type,
        startTime: startTime,
        endTime: endTime
      }
      this.loading = true;
      this.$api.GET_RANKING_DATA(data).then(res => {
        this.loading = false
        this.dataEmpty = res.data && res.data.length>0?false:true
        this.tableData = res.data
        this.tableData.forEach((item) => {
          item.NUM = item.NUM ? item.NUM : '--'
          item.avg = item.NUM > 0 ? (item.totalScore/item.NUM).toFixed(2) : '--'
          item.percent = item.NUM > 0 ? (item.personNum/item.NUM*100).toFixed(2) + '%' : '--'
          item["现有管理积分"]=item["NowManaScore"] || 0
          item["年度管理积分"]=item["YearManaScore"] || 0
          item["年度累计积分"]=item["YearTotalScore"] || 0
          item["总获得管理积分"]=item["TotalManaScore"] || 0
          item["总累计积分"]=item["TotalScore"] || 0
          item["工号"]=item["StaffNo"] || 0
          item["姓名"]=item["Name"] || 0
        })
      }).catch(err => {
        this.loading = false
        console.log('err', err)
      })
    },

    // 获取人员统计数据
    getSumData () {

      const startTime = this.searchYear? dayjs(this.searchYear).startOf('year').format('YYYY-M-D HH:mm:ss') :''
      const endTime = this.searchYear? dayjs(this.searchYear).endOf('year').format('YYYY-M-D HH:mm:ss') :''

      const nowYearTime = dayjs(new Date()).startOf('year').format('YYYY-M-D HH:mm:ss')
      console.log(startTime)
      console.log(nowYearTime)

      const startYear = dayjs(this.searchYear).year()
      const nowYear = dayjs().year()

      console.log(startYear)
      console.log(nowYear)

      if (startYear>=nowYear) {
        // 查询实时数据
        let data = {
            name: this.name,
            jobid: this.staffNo? String(this.staffNo):'',
            onduty: 0
        }
        this.loading = true;
        this.$api.GET_SUMMARY_LIST(data).then(res => {
            this.loading = false
            res.data.detail.map((item) => {
                item["现有管理积分"]=item["现有管理积分"] || 0
                item["年度管理积分"]=item["年度管理积分"] || 0
                item["年度累计积分"]=item["年度累计积分"] || 0
                item["总获得管理积分"]=item["总获得管理积分"] || 0
                item["总累计积分"]=item["总累计积分"] || 0
            })
            this.tableData = res.data.detail
        }).catch(err => {
            console.log('err', err);
            this.loading = false
        })
      } else {
        // 查询缓存数据
        this.getData()
      }
          
    },

    //导出数据
    exportTable(){
      const index = this.type - 1
      const tableColumns = this.exportTableColums[index]
      this.$export.excel({
        columns: tableColumns,
        data: this.tableData
      }).then(() => {
        this.$message('导出表格成功')
      })
    },

    // type发生变化时
    typeChange(val){
      if (this.type ==8) {
        this.getSumData()
      } else {
        this.getData()
      }
    }
  }
}

</script>

<style lang="scss">
.count-summary {
    .search-wrapper{
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .search-item{
            display: flex;
            align-items: center;
            margin-right: 10px;

            label{
                flex-shrink: 0;
                font-size: 14px;
                color: #101010;
            }
        }
    }

    .button-wrapper{
        display: flex;
        align-items: center;
    }

    .data-empty{
      text-align: center;
      margin-top: 80px;
    }
}
</style>
