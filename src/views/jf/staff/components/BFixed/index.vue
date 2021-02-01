<template>
    <div>
      <div class="top-total">
        <div class="title">总计</div>
        <div class="num">{{summaryInfo["固定积分"]}}</div>
      </div>
        <el-collapse accordion>
  <el-collapse-item>
    <template slot="title">
      <div class="line-item"><span class="title">职务积分</span><span class="num">{{fixDetail["totalZW"]}}</span></div>
    </template>
    <div class="rule-item" v-for="(item, index) in fixDetail['职务积分']" :key="index">
      <span class="title">{{item.begindate}}-{{item.enddate}}————{{item.jobname}}({{item.jobrank}})</span><span class="num">{{item.jobrankpoint}}</span>
    </div>
  </el-collapse-item>
  <el-collapse-item>
    <template slot="title">
      <div class="line-item"><span class="title">职称积分</span><span class="num">{{fixDetail["职称积分"]["tittleRankPoint"]}}</span></div>
    </template>
    <div class="rule-item">
      <span class="title" v-if="fixDetail['职称积分'].tectittle">{{fixDetail["职称积分"].tectittle}}（{{fixDetail["职称积分"].tittleRank}}）</span>
      <span class="title" v-else>暂无职称</span>
      <span class="num">{{fixDetail["职称积分"].tittleRankPoint}}</span>
    </div>
  </el-collapse-item>
  <el-collapse-item>
    <template slot="title">
      <div class="line-item"><span class="title">学历积分</span><span class="num">{{fixDetail["学历积分"]["schoolPoints"]}}</span></div>
    </template>
    <div class="rule-item">
      <span class="title">{{fixDetail["学历积分"].education}}{{fixDetail["学历积分"].education == '本科'?(fixDetail["学历积分"].is985211?'（985/211）':'（普通）'):''}}</span><span class="num">{{fixDetail["学历积分"]["schoolPoints"]}}</span>
    </div>
  </el-collapse-item>
  <el-collapse-item>
   <template slot="title">
      <div class="line-item"><span class="title">工龄积分</span><span class="num">{{fixDetail["工龄积分"]["servingAgePoints"]}}</span></div>
    </template>
    <div class="rule-item">
      <span class="title">自2004年1月1日起计算，每满一年，加2000分。<br>当年新入职的员工工龄积分为：当年合同履行时间/全年时间×2000分（取整）</span>
      <span class="title date">入职日期：{{fixDetail["工龄积分"]["begindate"]}}</span>
    </div>
  </el-collapse-item>
</el-collapse>
    </div>
</template>

<script>
import base from './mixins/index'
import util from '@/libs/util.js'
export default {
    name: 'b-fixed',
    mixins: [
      base
    ],
    data () {
      return {
        operator: util.cookies.get('uuid'),
        activeNames: ['1'],
        educationLevel: 0,
        fixDetail: null
      }
    },
    methods: {
      getSummary(){
        let data = {
          jobid: String(this.operator)
        }
        this.$api.GET_SUMMARY_LIST(data).then((res)=>{
          let result = res.data.detail[0]
          this.summaryInfo = result
        })
      },

      getDetail(){
        let data = {
          jobid: String(this.operator)
        }
        this.$api.GET_FIX_DETAIL(data).then((res)=>{
          let totalZW = 0;
          let zwList = res.data["职务积分"];
          zwList.map((item) => {
            totalZW = totalZW + item.jobrankpoint
          })
          res.data.totalZW = totalZW;
          this.fixDetail = res.data
        })
      },
    }
}
</script>

<style scoped lang="scss">
.top-total{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  margin: 20px 0;

  .title{
    color: #101010;
    font-size: 24px;
  }

  .num{
    font-size: 36px;
    color: $color-primary;
  }
}

.line-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-right: 10px;
  .title{
    color: #101010;
    font-size: 14px;
  }

  .num{
    font-size: 18px;
    color: $color-primary;
  }
}

.rule-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-right: 32px;
  color: #929292;

  .title{
    font-size: 12px;
    &.date{
      color: #101010;
    }
  }

  .num{
    font-size: 16px;
  }

  &.active{
    color: $color-primary;
    font-weight: bold;
  }
}
</style>
