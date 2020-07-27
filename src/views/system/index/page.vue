<template>
  <d2-container class="page">
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center">
      {{time}}
    </div>
    <div class="text">————爱人思贤&nbsp;&nbsp;&nbsp;&nbsp;至诚笃信————</div>
  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data(){
    return{
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
    }
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
  }
}
</script>

<style lang="scss" scoped>
.page {

  // 时间
  .page-login--layer-time {
    margin-top: 20px;
    font-size: 12em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.09);
    overflow: hidden;
  }

  .text{
    margin-top: 30px;
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.3);
  }
}
</style>
