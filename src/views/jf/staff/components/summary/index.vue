<template>
    <div class="a-detail">
        <div class="sum-box">
            <div class="top">
                <div class="sum-item-small" v-for="(item, index) in sumItemSmall" :key="index" @click="changeTab(index,1)">
                    <div class="item-top">
                        <span class="icon iconfont icon-data" :style="{color: item.color, opacity: item.opacity}">&#xe65c;</span>

                        <div>
                            <d2-count-up class="num" :style="{color: item.color, opacity: item.opacity}" :end="item.num" :duration="1"/>
                            <p class="title">{{item.title}}</p>
                        </div>
                    </div>
                    <p class="info-text">{{item.info}}</p>
                </div>
            </div>
            <div class="center">
              <div class="sum-item-big" v-for="(item, index) in sumItemBig" :key="index"  @click="changeTab(index,2)">
                    <div class="item-top">
                        <span class="icon iconfont icon-data" :style="{color: item.color, opacity: item.opacity}">&#xe65c;</span>

                        <div>
                            <d2-count-up class="num" :style="{color: item.color, opacity: item.opacity}" :end="item.num" :duration="2"/>
                            <p class="title">{{item.title}}</p>
                        </div>
                    </div>
                    <p class="info-text">{{item.info}}</p>
                </div>
            </div>
            <div class="bottom">
                <div class="sum-item-large"></div>
            </div>
        </div>
        <div class="activities-box">

          <el-carousel ref="carousel" height="150px" @click.native="linkTo">
            <el-carousel-item v-for="(item, index) in activityList" :key="index">
              <div class="activity-item-box">
                <p>{{item.title}}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'summary-index',
  data () {
    return {
      sumItemSmall: [
        {
          title: '现有A分',
          info: '认真负责地完成每一项工作，你的付出一定会有回报！',
          num: 20,
          color: '#F56C6C',
          opacity: 0.88
        },
        {
          title: '累计A分',
          info: '自入职以来，所获得的所有A分累加',
          num: 40,
          color: '#F56C6C',
          opacity: 1
        },
        {
          title: '可兑换积分',
          info: '积极参加公司组织的各项活动，让你的工作变得更加丰富精彩！',
          num: 20,
          color: '#F35897',
          opacity: 1
        },
        {
          title: '累计B管理积分',
          info: '自入职以来，所获得的所有B管理积分累加',
          num: 120,
          color: '#F63F76',
          opacity: 1
        },
        {
          title: 'B固定积分',
          info: '固定积分=职务积分+职称积分+学历积分+工龄积分',
          num: 2167,
          color: '#EB111D',
          opacity: 1
        }
      ],
      sumItemBig: [
        {
          title: '年度累计积分',
          info: '1. 年度累计积分=年度固定积分+年度管理积分\n2. 年度累计积分将作为年度评比、评级、评优等的参考依据\n3. 如果年度累计积分为零甚至为负值时，由人力资源部约谈，提出整改意见，并可与员工所在部门共同制定相应培训计划，促其改进。',
          num: 2187,
          color: '#409EFF',
          opacity: 0.8
        },
        {
          title: '总累计积分',
          info: '1. 总累计积分=∑年度累计积分\n2. 用于积分排名，且当总积分达到5万分及不同数量的等级的积分时，可享受“员工积分特殊奖励”',
          num: 2187,
          color: '#409EFF',
          opacity: 1
        }
      ],
      fileName:'',
      uploadPercent:0,
      totalCount:0,
      pagingPage:1,
      source:axios.CancelToken.source(),
      list:[],
      activityList: [{
        title: '俱乐部活动',
        slogon: '快来参加活动吧'
      },
      {
        title: '资格考核',
        slogon: '钉钉'
      }]
    }
  },

  created(){
    this.getSummary();
    this.getActivityList();
  },
  methods: {

    linkTo () {
      let activeIndex = this.$refs.carousel.activeIndex;
      this.$emit('activityTab',activeIndex)
    },

    changeTab (i, type) {
      let data = {
        index: i,
        type: type
      }
      this.$emit('changeTab',data)
    },

    getSummary(){
      let data = {
        jobid: 100297
      }
      this.$api.GET_SUMMARY_LIST(data).then((res)=>{
        console.log(res);
      })
    },

    getActivityList() {
      let data = {
        title: '',
        page: 1,
        pageSize: 100
      }
      this.$api.GET_ACTIVITY_LIST(data).then((res) => {
        console.log(res);
        this.activityList = res.data.detail;
      })
    }
  }
}
</script>

<style scoped lang="scss">
.sum-box{
  margin-top: 40px;
}
.top{
    display: flex;
    justify-content: space-between;

    .sum-item-small{
        width: 140px;
        margin-right: 10px;
        padding: 10px;
        box-sizing: border-box;
        flex-grow: 1;
        .item-top{
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .icon-data{
              font-size: 40px;
              margin-right: 10px;
            }

            .num{
              font-size: 24px;
              line-height: 24px;
              margin: 0;
              padding: 0;
            }

            .title{
              padding: 0;
              margin: 0;
              font-size: 10px;
              color: #101010;
            }
        }
        .info-text{
            font-size: 10px;
            color: #929292;
        }
        &:hover{
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          cursor: pointer;
        }
    }
}

.center{
  display: flex;
  justify-content: space-around;
  align-content: center;
  margin-top: 80px;

  .sum-item-big{
    width: 400px;
    margin-right: 20px;
    padding: 10px;
    .item-top{
        display: flex;
        justify-content: flex-start;

        .icon-data{
          font-size: 50px;
          margin-right: 15px;
        }

        .num{
          font-size: 34px;
          line-height: 34px;
          margin: 0;
          padding: 0;
        }

        .title{
          padding: 0;
          margin: 0;
          font-size: 14px;
          color: #101010;
        }
      }
      .info-text{
          font-size: 12px;
          color: #929292;
          white-space: pre-wrap;
      }
        &:hover{
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          cursor: pointer;
        }
  }
}

.activities-box{
  margin-top: 80px;
}

.activity-item-box{
  height: 200px;
  background: #E5E5E5;
}
</style>
