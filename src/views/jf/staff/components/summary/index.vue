<template>
    <div class="a-detail">
        <div class="sum-box">
            <div class="top">
                <div class="sum-item-small" v-for="(item, index) in sumItemSmall" :key="index">
                    <div class="item-top">
                        <d2-icon name="bar-chart" :style="{color: item.color,opacity: item.opacity, fontSize: '50px'}"/>
                        <div>
                            <p>{{item.num}}</p>
                            <p>{{item.title}}</p>
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
            <input type="file" ref="file"  @change="importFile">
            <button @click="importFile">上传</button>
            <!-- <progress-bar class="progress-bar" :uploadPercent="uploadPercent" @cancelRequest="cancelRequest"></progress-bar> -->
        </div>
    </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import axios from 'axios'
export default {
  name: 'summary-index',
  components: {
    ProgressBar
  },
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
      fileName:'',
      uploadPercent:0,
      totalCount:0,
      pagingPage:1,
      source:axios.CancelToken.source(),
      list:[]
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
.top{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .sum-item-small{
        width: 200px;
        .item-top{
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .info{
            font-size: 14px;
            color: #929292;
        }
    }
}
</style>
