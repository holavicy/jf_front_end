<template>
    <div class="a-detail">
        <div class="sum-box">
            <div class="top">
                <div class="sum-item-small" v-for="(item, index) in sumItemSmall" :key="index">
                    <div class="item-top">
                        <span class="icon iconfont icon-data" :style="{color: item.color, opacity: item.opacity}">&#xe65c;</span>

                        <div>
                            <d2-count-up class="num" :style="{color: item.color, opacity: item.opacity}" :end="item.num" :duration="1"/>
                            <p class="title">{{item.title}}</p>
                        </div>
                    </div>
                    <p class="info">{{item.info}}</p>
                </div>
            </div>
            <div class="center">
              <div class="sum-item-big" v-for="(item, index) in sumItemBig" :key="index">
                    <div class="item-top">
                        <span class="icon iconfont icon-data" :style="{color: item.color, opacity: item.opacity}">&#xe65c;</span>

                        <div>
                            <d2-count-up class="num" :style="{color: item.color, opacity: item.opacity}" :end="item.num" :duration="2"/>
                            <p class="title">{{item.title}}</p>
                        </div>
                    </div>
                    <p class="info">{{item.info}}</p>
                </div>
            </div>
            <div class="bottom">
                <div class="sum-item-large"></div>
            </div>
        </div>
        <div class="activities-box">

          <el-carousel height="150px">
            <el-carousel-item v-for="(item, index) in activityList" :key="index">
              <div class="activity-item-box">
                <p>{{item.title}}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
          
            <!-- <input type="file" ref="file"  @change="importFile">
            <button @click="importFile">上传</button> -->
            <!-- <progress-bar class="progress-bar" :uploadPercent="uploadPercent" @cancelRequest="cancelRequest"></progress-bar> -->
        </div>
    </div>
</template>

<script>
// import ProgressBar from '@/components/ProgressBar.vue'
import axios from 'axios'
export default {
  name: 'summary-index',
  // components: {
  //   ProgressBar
  // },
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
      }
      ]
    }
  },

  methods: {
    fileUpload (event) {
      const file = event.target.files
      const formData = new FormData()
      formData.append('fileType', '.xlsx')
      formData.append('file', file[0])
      console.log(formData)

      this.$api.UPLOAD_TEST(formData)
    },

    importFile () {
      const _this = this;
      _this.source = axios.CancelToken.source();

      if (!_this.$refs.file.files[0]) {
        alert('请选择文件');
        return
      }
      let fileData = new FormData();
      fileData.append('file', _this.$refs.file.files[0])
      let url = '/api/test';
      this.uploadFile(url, fileData, _this.source.token, (res) => {
          let loaded = res.loaded
          let total = res.total
          _this.$nextTick(() => {
              _this.uploadPercent = Math.floor(loaded/total*100)>1? Math.floor(loaded/total*100):1;
              })
              }).then((res) => {
                  if (res.data.code === 0) {
                      alert('上传成功');
                      _this.uploadPercent = 0;
                  }
              }, (rej) => {
                  if (rej === -2) {
                      alert('取消上传成功')
                  } else {
                      alert('上传失败')
                  }
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
    align-items: center;

    .sum-item-small{
        width: 140px;
        margin-right: 10px;
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
        .info{
            font-size: 10px;
            color: #929292;
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
    .item-top{
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .icon-data{
          font-size: 50px;
          margin-right: 15px;
        }

        .num{
          font-size: 40px;
          line-height: 44px;
          margin: 0;
          padding: 0;
        }

        .title{
          padding: 0;
          margin: 0;
          font-size: 16px;
          color: #101010;
        }
      }
      .info{
          font-size: 14px;
          color: #929292;
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
