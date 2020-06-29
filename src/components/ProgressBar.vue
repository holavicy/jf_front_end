<template>
<div class="progress-bar">
    <div class="progress-percent" :style="{width:uploadPercent+'%'}"></div>
    <div class="tip" :style="{left:uploadPercent+'%'}" 
      v-show="uploadPercent && uploadPercent !=100"
        >{{uploadPercent+'%'}}
    </div>
    <div class="cancel-btn" @click="cancelRequest()">×</div>
</div>
</template>

<script>

export default {
    name:'progress-bar',
    props:{
        uploadPercent:Number
    },
    methods: {
        cancelRequest () {
            this.$emit('cancelRequest');
        }
    }
}
</script>

<style scoped>
.progress-bar {
    width: 800px;
    height: 16px;
    border: 1px solid #4395ff;
    border-radius: 4px;
    position: relative;
}

.progress-percent {
    height: 100%;
    background-color: #4395ff;
}

.progress-bar .tip {
    position: absolute;
    height: 20px;
    line-height: 20px;
    background-color:black;
    color: #ffffff;
    top:18px;
    left: 0;
    text-align: center;
    padding: 2px;
    width: 28px;
    font-size: 12px;
    border-radius: 6px;
}
.cancel-btn {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #cecece;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
    position: absolute;
    right: -24px;
    top: -2px;
}

.cancel-btn:hover {
    background-color: #4395ff;
    cursor: pointer;
}
</style>
