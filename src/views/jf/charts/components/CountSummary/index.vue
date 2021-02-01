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
              <el-button type="primary" plain size="mini" @click="triggerChart">切换图表</el-button>
            </el-row>
        </div>

        <div>
          <ve-pie :data="pieDataOne" :extend="pieExtendOne" v-if="chartType == 1 && !dataEmpty"></ve-pie>
          <ve-pie :data="pieDataTwo" :extend="pieExtendTwo" v-if="chartType == 1 && !dataEmpty"></ve-pie>
          <ve-histogram :data="histogramData" 
          :dataEmpty = "dataEmpty" 
          :extend="histogramExtend" 
          :settings="chartSettings" v-if="chartType == 2 && !dataEmpty"></ve-histogram>
          <div v-if="dataEmpty" class="data-empty">暂无数据</div>
        </div>
    </div>
</template>

<script>
import js from './mixins/index'
import dayjs from 'dayjs'
export default {
  name: 'count-summary',
  mixins: [
      js
  ],
  data () {
     this.chartSettings = {
      labelMap: {
        num: '条数',
        totalScore: '分值'
      },
      legendName: {
        访问用户: '访问用户 total: 10000'
      }
    }
    this.histogramExtend
     = {
       title: {
        subtext: '标题',
        left: 'center',
        top: '90%',
        textAlign: 'center'

       },
        series: {
          label: { show: true, position: "top", barWidth: 100}
        },
        xAxis: {
          axisLabel: {
             margin: 15,
             interval: 0,
             rotate: 30
           }
        }
      }
      this.pieExtendOne = {
         title: {
        subtext: '条数统计图',
        left: 'center',
        top: '90%',
        textAlign: 'center'

       },
         legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20
        },
          series: {
          label: { formatter: '{b}: {d}%'}
        },
      },
      this.pieExtendTwo = {
         title: {
        subtext: '分值统计图',
        left: 'center',
        top: '90%',
        textAlign: 'center'

       },
         legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20
        },
          series: {
          label: { formatter: '{b}: {d}%'}
        },
      }
    return {
      dataEmpty: false,
      chartType: 2,
      type: 1,
      checkDate: [new Date(), new Date()],
      histogramData:{
        columns: ['groupType', 'num','totalScore'],
        rows: []
      },
      pieDataOne:{
        columns: ['groupType', 'num'],
        rows: []
      },
      pieDataTwo:{
        columns: ['groupType', 'totalScore'],
        rows: []
      }
    }
  },
  mounted () {
      this.getData()
  },
  methods: {
    //获取图表数据
    getData () {
      this.changeSubText();
      let data = {
        cateType: this.type,
        startTime:  this.checkDate? dayjs(this.checkDate[0]).startOf('month').format('YYYY-M-D HH:mm:ss') :'',
        endTime: this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :''
      }
      this.loading = true;
      this.$api.GET_COUNT_SUMMARY(data).then(res => {
        this.dataEmpty = res.data && res.data.length>0?false:true
        this.histogramData.rows = res.data
        this.pieDataOne.rows = res.data
        this.pieDataTwo.rows = res.data
        console.log(this.histogramData)
      }).catch(err => {
        console.log('err', err);
      })
    },

    //切换图表
    triggerChart(){

      if(this.chartType == 1){
        this.chartType = 2
      }else if(this.chartType == 2){
        this.chartType = 1
      }
    },

    changeSubText(){
      switch(this.type){
        case 1:
          this.histogramExtend.title.subtext = '业务单元分类统计图'
          break;
        case 2:
          this.histogramExtend.title.subtext = '加减分理由分类统计图'
          break;
        case 3:
          this.histogramExtend.title.subtext = '加分理由分类统计图'
          break;
        case 4:
          this.histogramExtend.title.subtext = '减分理由分类统计图'
          break;
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
