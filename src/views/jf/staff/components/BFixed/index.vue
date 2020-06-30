<template>
    <div>
      <div class="top-total">
        <div class="title">总计</div>
        <div class="num">2167</div>
      </div>
        <el-collapse accordion>
  <el-collapse-item>
    <template slot="title">
      <div class="line-item"><span class="title">职位积分</span><span class="num">0</span></div>
    </template>
    <div class="rule-item" :class="{'active': zwLevel == item.id}" v-for="(item, index) in zwRules" :key="index">
      <span class="title"><i class="header-icon el-icon-wind-power" v-if="zwLevel == item.id"></i>{{item.title}}</span><span class="num">{{item.num}}</span>
    </div>
  </el-collapse-item>
  <el-collapse-item>
    <template slot="title">
      <div class="line-item"><span class="title">职务积分</span><span class="num">0</span></div>
    </template>
  </el-collapse-item>
  <el-collapse-item>
    <template slot="title">
      <div class="line-item"><span class="title">学历积分</span><span class="num">1000</span></div>
    </template>
  </el-collapse-item>
  <el-collapse-item>
   <template slot="title">
      <div class="line-item"><span class="title">工龄积分</span><span class="num">1167</span></div>
    </template>
  </el-collapse-item>
</el-collapse>
    </div>
</template>

<script>
export default {
    name: 'b-fixed',
    data () {
      return {
        activeNames: ['1'],
        zwLevel: 1,
        zwRules: [{
          title: '一般科员、一般员工',
          num: 0,
          id: 1
        },
        {
          title: '经理助理',
          num: 200,
          id: 2
        },
        {
          title: '副经理',
          num: 300,
          id: 3
        },
        {
          title: '经理',
          num: 400,
          id: 4
        },
        {
          title: '中心总经理助理',
          num: 500,
          id: 5
        },
        {
          title: '中心副总监',
          num: 600,
          id: 6
        },
        {
          title: '高级副总裁、副总裁',
          num: 700,
          id: 7
        },
        {
          title: '总裁助理、中心总监',
          num: 800,
          id: 8
        },
        {
          title: '总裁',
          num: 1000,
          id: 9
        }]
      };
    },
    methods: {
      handleChange (val) {
        console.log(val);
      }
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
