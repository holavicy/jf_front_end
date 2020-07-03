<template>
    <div>
        <el-carousel height="150px" :autoplay="false">
            <el-carousel-item v-for="(item, index) in activityList" :key="index">
              <div class="activity-item-box">
                <p>{{item.title}}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
    </div>
</template>

<script>
export default {
    name: 'activity-index',
    data () {
        return {
            activityList: [{
                title: '俱乐部活动',
                slogon: '快来参加活动吧'
            },
            {
                title: '资格考核',
                slogon: '钉钉'
            }]
        }
    }
}
</script>
