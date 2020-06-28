<template>
    <div class="a-detail">
        <div class="sum-box">
            <div class="top">
                <div class="sum-item-small" v-for="(value, key, index) in sumItemSmall" :key="index">
                    <d2-icon name="bar-chart"/>
                    <span>{{key}}</span>
                    <span>{{value}}</span>
                </div>
            </div>
            <div class="bottom">
                <div class="sum-item-large"></div>
            </div>
        </div>
        <div class="activities-box"></div>
    </div>
</template>

<script>
export default {
  name: 'a-detail',
  data () {
    return {
      sumItemSmall: {
        nowA: 0,
        totalA: 40,
        canChangeB: 40,
        totalChangeB: 100,
        fixB: 2167
      }
    }
  }
}
</script>
