<template>
    <div>
        <el-carousel ref="activityCar" height="150px" :autoplay="autoplay" :initial-index="initIndex">
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
    props: {
        defaultIndex: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            initIndex1:1,
            autoplay: false,
            initIndex: this.defaultIndex,
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
    watch: {
        defaultIndex: function (val) {
            console.log('val', val)
            this.$refs.activityCar.setActiveItem(val);
        }
    }
}
</script>
