<template>
    <div class="count-summary">
      <div class="search-wrapper">
            <div class="search-item">
                <label>统计维度：</label><el-select v-model="type" placeholder="请选择" size="mini">
                    <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="search-item">
                <label>考核日期：</label>
                 <el-date-picker v-model="checkDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" size="mini"></el-date-picker>
            </div>
            <el-row class="button-wrapper">
              <el-button type="primary" size="mini" @click="getData()">查询</el-button>
              <el-button type="primary" plain size="mini" @click="exportTable()">导出</el-button>
            </el-row>
        </div>

        <div>
          <el-table border size="mini" :data="tableData" style="width: 100%" :default-sort = "{prop: 'totalScore', order: 'descending'}">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="groupType" label="职务级别" width="240" v-if="type == 1"></el-table-column>
            <el-table-column prop="groupType" label="公司/业务单元" width="240" v-if="type == 2"></el-table-column>
            <el-table-column prop="lv1" label="公司" width="180" v-if="type == 3"></el-table-column>
            <el-table-column prop="groupType" label="一级部门" width="240" v-if="type == 3"></el-table-column>
            <el-table-column prop="totalBonus" label="加分" sortable width="180"></el-table-column>
            <el-table-column prop="totalMinus" label="减分" sortable width="180"></el-table-column>
            <el-table-column prop="totalScore" label="累计管理积分" sortable></el-table-column>
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
      tableColumns:[
          { label: '职务级别', prop: 'groupType' },
          { label: '加分', prop: 'totalBonus' },
          { label: '减分', prop: 'totalMinus' },
          { label: '累计管理积分', prop: 'totalScore' }
      ],
      tableData: []
    }
  },

  methods: {
    //获取图表数据
    getData () {
      let data = {
        cateType: this.type,
        startTime:  this.checkDate? dayjs(this.checkDate[0]).startOf('month').format('YYYY-M-D HH:mm:ss') :'',
        endTime: this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :''
      }
      this.loading = true;
      this.$api.GET_RANKING_DATA(data).then(res => {
        this.dataEmpty = res.data && res.data.length>0?false:true
        console.log(res);
        this.tableData = res.data;
      }).catch(err => {
        console.log('err', err);
      })
    },

    //导出数据
    exportTable(){
      this.$export.excel({
      columns: this.tableColumns,
      data: this.tableData
    })
      .then(() => {
        this.$message('导出表格成功')
      })
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
