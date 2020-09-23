<template>
    <div class="count-summary">
      <div class="search-wrapper">
            <div class="search-item">
                <label>考核日期：</label>
                <el-date-picker v-model="checkDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" size="mini"></el-date-picker>
            </div>
            <el-row class="button-wrapper">
              <el-button type="primary" size="mini" @click="getData()">查询</el-button>
              <el-button type="primary" size="mini" @click="exportTable()">导出</el-button>
            </el-row>
        </div>

        <div v-if="!dataEmpty">
          <ve-line :data="lineData"  :settings="lineSettings" :extend="histogramExtend"></ve-line>
          <el-table
          size="mini"
            :row-class-name="tableRowClassName"
            :data="tableData"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px">
            <el-table-column prop="FunctionalDepartment" label="管理职能" width="180"></el-table-column>
            <el-table-column prop="ReasonType" label="分类理由"></el-table-column>
            <el-table-column prop="totalBonous" label="加分合计"></el-table-column>
            <el-table-column prop="totalMinus" label="减分合计"></el-table-column>
            <el-table-column prop="totalScore" label="累计管理积分"></el-table-column>
          </el-table>
        </div>

        <div v-if="dataEmpty" class="data-empty">暂无数据</div>

        

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
    this.lineSettings = {
      labelMap: {
        num: '条数',
        totalBonous: '加分合计',
        totalMinus: '减分合计',
        totalScore: '累计管理积分'
      },
      legendName: {
        访问用户: '访问用户 total: 10000'
      }
    }

    this.histogramExtend
     = {
       title: {
        subtext: '每月管理积分趋势图',
        left: 'center',
        top: '90%',
        textAlign: 'center'

       },
        xAxis: {
          axisLabel: {
             margin: 15,
             interval: 0,
             rotate: 30
           }
        }
      }

    return {
      dataEmpty: true,
      checkDate: [new Date(), new Date()],
      lineData:{
        columns: ['month', 'num', 'totalBonous', 'totalMinus','totalScore'],
        rows: []
      },

      tableData: [],
      // [['A2', 'A6'],['A7','A20'],['A21','B21'],['A22','B22']]
      mergeData:[],
      tableColumns: [
          { label: '管理职能', prop: 'FunctionalDepartment' },
          { label: '分类理由', prop: 'ReasonType' },
          { label: '加分合计', prop: 'totalBonous' },
          { label: '减分合计', prop: 'totalMinus' },
          { label: '累计管理积分', prop: 'totalScore' }
        ]
      
    }
  },

  methods: {
    //获取图表数据
    getData () {
      let data = {
        startTime:  this.checkDate? dayjs(this.checkDate[0]).startOf('month').format('YYYY-M-D HH:mm:ss') :'',
        endTime: this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :''
      }
      this.$api.GET_TENDENCY_DATA(data).then(res => {
        this.lineData.rows = res.data
        this.dataEmpty = res.data && res.data.length>0?false:true
        this.getTableData(data);
      }).catch(err => {
        console.log('err', err);
        this.loading = false
      })

      
    },

    getTableData(data){
      this.$api.GET_FUNC_REASON_DATA(data).then(res => {
        let [ ...oriData ]  = res.data;
        let formattedData = [];
        
        let rowIndex = 0;
        let rowspanNum = 0;
        
        if (oriData && oriData.length>0) {
          let text = oriData[0].FunctionalDepartment;
          let totalBonousSum = 0;
          let totalMinusSum = 0;
          let totalScoreSum = 0;

          let culture = null;
      
          // 统计每个分类的小计
          oriData.forEach((element, index) => {
            if(element.ReasonType == '企业文化'){
              culture = element;
              culture.FunctionalDepartment = '企业文化'
            } else {
              if(element.FunctionalDepartment == text){
                formattedData.push(element);
                totalBonousSum += element.totalBonous;
                totalMinusSum += element.totalMinus;
                totalScoreSum += element.totalScore;
              } else {
                let item = {
                  summary: true,
                  FunctionalDepartment: text,
                  ReasonType: '小计',
                  totalBonous: totalBonousSum,
                  totalMinus: totalMinusSum,
                  totalScore: totalScoreSum
                }
                formattedData.push(item);
                text = element.FunctionalDepartment;
                totalBonousSum = element.totalBonous;
                totalMinusSum = element.totalMinus;
                totalScoreSum = element.totalScore;
                formattedData.push(element)

              }
              if(oriData.length - 1 == index) {
                  let item = {
                  summary: true,
                  FunctionalDepartment: text,
                  ReasonType: '小计',
                  totalBonous: totalBonousSum,
                  totalMinus: totalMinusSum,
                  totalScore: totalScoreSum
                }
                formattedData.push(item);
              }

            }
           
            
          });
          // 根据新数组标识可折叠的字段
          text = '';
          let totalSummaryBonous = 0
          let totalSummaryMinus = 0
          let totalSummaryScore = 0
          let rowIndexArray = [];
          this.mergeData = [];
          
          formattedData.forEach((element, index) => {
            if (text != element.FunctionalDepartment) {
              rowIndex = index;
              rowIndexArray.push(rowIndex);
              rowspanNum = 1;
              formattedData[rowIndex].rowspan = true;
              formattedData[rowIndex].rowspanNum = rowspanNum;
              text = element.FunctionalDepartment;
            } else {
              rowspanNum++;
              formattedData[rowIndex].rowspanNum = rowspanNum;
            }

            if(element.summary){
              totalSummaryBonous += element.totalBonous;
              totalSummaryMinus += element.totalMinus;
              totalSummaryScore += element.totalScore;
            }

          })
          
          if(culture != null){
            formattedData.push(culture);
            totalSummaryBonous += culture.totalBonous;
            totalSummaryMinus += culture.totalMinus;
            totalSummaryScore += culture.totalScore;
          }

          let item = {
                  FunctionalDepartment:'合计',
                  totalSummary: true,
                  totalBonous: totalSummaryBonous,
                  totalMinus: totalSummaryMinus,
                  totalScore: totalSummaryScore,
                }
          formattedData.push(item);
          this.tableData = formattedData;
          console.log(formattedData)

          let length = formattedData.length;
          let startItem = 'A'+Number(length+1);
          let endItem = 'B'+Number(length+1);
          this.mergeData.push([startItem,endItem]);
          if(culture != null) {
            startItem = 'A'+Number(length);
            endItem = 'B'+Number(length);
            this.mergeData.push([startItem,endItem]);
            rowIndexArray.push(length-2)
          } else {
            rowIndexArray.push(length-1)
          }

          for(let i=0;i<rowIndexArray.length-1;i++){
            if(i<=rowIndexArray.length-2){
              startItem = 'A'+Number(rowIndexArray[i]+2);
              endItem = 'A'+Number(rowIndexArray[i+1]+1);
              this.mergeData.push([startItem,endItem]);
            }
          }

          console.log(rowIndexArray)
          console.log(this.mergeData)
        }
        }).catch(err => {
          console.log('err', err);
          this.loading = false
        })
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 && row.ReasonType != '企业文化' && !row.totalSummary) {
          if (row.rowspan && row.ReasonType != '企业文化' && !row.totalSummary) {
            return {
              rowspan: row.rowspanNum,
              colspan: 1
            };
          }  else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }

        if(row.ReasonType == '企业文化' || row.totalSummary) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },

    exportTable(){
      this.$export.excel({
      columns: this.tableColumns,
      data: this.tableData,
      merges: this.mergeData
    })
      .then(() => {
        this.$message('导出表格成功')
      })
    },

    // 行颜色
    tableRowClassName({row, rowIndex}) {
        if (row.summary) {
          return 'warning-row';
        } else if (row.totalSummary) {
          return 'success-row';
        }
        return '';
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

    .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }
}
</style>
