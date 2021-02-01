<template>
    <div class="activity">
        <div class="image-wrapper">
            <img :src="activityInfo.PictureUrl">
        </div>
        <div class="title-wrapper">{{activityInfo.Title}}</div>

        <div class="info-item">
            <div class="title">
                <div class="icon red"></div>
                <div>时间</div>
            </div>
            <div class="detail">
            {{dayjs(activityInfo.BeginDateTime).format('YYYY-M-D')}} ~ {{dayjs(activityInfo.EndDateTime).format('YYYY-M-D')}}
            </div>
        </div>

        <div class="info-item">
            <div class="title">
                <div class="icon green"></div>
                <div>内容</div>
            </div>
            <div class="detail">
            {{activityInfo.ActivityContent}}
            </div>
        </div>

        <div class="info-item">
            <div class="title">
                <div class="icon blue"></div>
                <div>奖惩</div>
            </div>
            <div class="detail">
            {{activityInfo.RewardAndPenalties}}
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    name: 'activity-index',

    data () {
        return {
            dayjs,
            activityInfo: null   
        }
    },

    methods: {
      getInfo(id){
         let data = {
            id: Number(id)
            }
        this.$api.GET_ACTIVITY_INFO(data).then(res => {
            console.log(res);
            this.activityInfo = res.data

        })

      }
    }
}
</script>


<style lang="scss" scoped>
.image-wrapper img{
    width: 1180px;
    height: 220px;
}

.title-wrapper{
    font-size: 18px;
    font-weight: bold;
    padding: 20px;
}

.info-item{
    padding: 20px;
    box-sizing: border-box;
}

.info-item .icon{
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-right: 12px;
}

.info-item .icon.red{
    background-color: #FF2D55;
}

.info-item .icon.green{
    background-color: #26C080;
}

.info-item .icon.blue{
    background-color: #1E82D2;
}

.info-item .title{
    display: flex;
    align-items: center;
    font-size: 18px;
}

.info-item .detail{
    padding-left: 26px;
    color: #CCCCCC;
    font-size: 16px;
    margin-top: 20px;
}
</style>