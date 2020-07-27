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
              <div class="activity-item-box" :style="{backgroundImage: 'url(' + item.PictureUrl + ')', backgroundSize:'cover', backgroundRepeat:'no-repeat'}">
                <p>{{item.Slogan}}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import util from '@/libs/util.js'
export default {
  name: 'summary-index',
  data () {
    return {
      operator: util.cookies.get('uuid'),
      sumItemSmall: [
        {
          title: '现有A分',
          info: '认真负责地完成每一项工作，你的付出一定会有回报！',
          num: 0,
          color: '#F56C6C',
          opacity: 0.88
        },
        {
          title: '累计A分',
          info: '自入职以来，所获得的所有A分累加',
          num: 0,
          color: '#F56C6C',
          opacity: 1
        },
        {
          title: '可兑换积分',
          info: '积极参加公司组织的各项活动，让你的工作变得更加丰富精彩！',
          num: 0,
          color: '#F35897',
          opacity: 1
        },
        {
          title: '累计B管理积分',
          info: '自入职以来，所获得的所有B管理积分累加',
          num: 0,
          color: '#F63F76',
          opacity: 1
        },
        {
          title: 'B固定积分',
          info: '固定积分=职务积分+职称积分+学历积分+工龄积分',
          num: 0,
          color: '#EB111D',
          opacity: 1
        }
      ],
      sumItemBig: [
        {
          title: '年度累计积分',
          info: '1. 年度累计积分=年度固定积分+年度管理积分\n2. 年度累计积分将作为年度评比、评级、评优等的参考依据\n3. 如果年度累计积分为零甚至为负值时，由人力资源部约谈，提出整改意见，并可与员工所在部门共同制定相应培训计划，促其改进。',
          num: 0,
          color: '#409EFF',
          opacity: 0.8
        },
        {
          title: '总累计积分',
          info: '1. 总累计积分=∑年度累计积分\n2. 用于积分排名，且当总积分达到5万分及不同数量的等级的积分时，可享受“员工积分特殊奖励”',
          num: 0,
          color: '#409EFF',
          opacity: 1
        }
      ],
      list:[],
      activityList: []
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
        jobid: Number(this.operator)
      }
      this.$api.GET_SUMMARY_LIST(data).then((res)=>{
        let result = res.data.detail[0]
        this.sumItemSmall[0].num = result["现有A分"]
        this.sumItemSmall[1].num = result["总获得A分"]
        this.sumItemSmall[2].num = result["现有管理积分"]
        this.sumItemSmall[3].num = result["总获得管理积分"]
        this.sumItemSmall[4].num = result["固定积分"]
        this.sumItemBig[0].num = result["年度累计积分"]
        this.sumItemBig[1].num = result["总累计积分"]
      })
    },

    getActivityList() {
      let data = {
        title: '',
        page: 1,
        pageSize: 100
      }
      this.$api.GET_ACTIVITY_LIST(data).then((res) => {
        let result = res.data.detail;
        let list = [];
        //过滤出结束时间小于当前时间的活动
        result.map((item) => {

          if(dayjs().isBefore(item.EndDateTime)){
            list.push(item)
          }
          
        })
        this.activityList = list;
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
