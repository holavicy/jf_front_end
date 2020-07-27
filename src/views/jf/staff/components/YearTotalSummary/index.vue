<template>
    <div class="year-total-summary">
        <div class="inner">
            <ve-pie :data="chartData" width="400px" v-bind="pubSetting" :settings="chartSettings" :events="chartEvents"></ve-pie>
        </div>
        <div class="table">
            <d2-crud
            :columns="columns"
            :data="data"
            :options="options" v-show="showTable == 1"/>
            <d2-crud
            :columns="columnsManage"
            :data="dataManage"
            v-show="showTable == 2"/>
        </div>
    </div>
</template>

<script>
import util from '@/libs/util.js'
export default {
    name: 'year-total-summary',

    data () {
        return {
            operator: util.cookies.get('uuid'),
            showTable: 1,
            chartSettings: {
                selectedMode: 'single',
                hoverAnimation: false
            },
            chartEvents: {
                click: (e) => {
                    // this.name = e.name

                    if (e.name == '年度固定积分') {
                        this.showTable = 1
                    }

                    if (e.name == '年度管理积分') {
                        this.showTable = 2
                    }
                    console.log(e)
                }
            },
            pubSetting: {
                height: '400px'
            },
            chartData: {
            columns: ['类别', '数值'],
            rows: [
                { 类别: '年度管理积分', 数值: 40 },
                { 类别: '年度固定积分', 数值: 2187 }
                ]
            },
            columns: [{
                title: '固定积分类别',
                key: 'type'
            }, {
                title: '数值',
                key: 'num'
            }],
            data: [{
                type: '职务积分',
                num: 0
            }, {
                type: '职称积分',
                num: 0
            },{
                type: '学历积分',
                num: 1000
            },{
                type: '工龄积分',
                num: 1167
            }],
            columnsManage: [{
                title: '加分',
                key: 'jiafen'
            }, {
                title: '减分',
                key: 'jianfen'
            }, {
                title: '加减分理由',
                key: 'Reason'
            }, {
                title: '考核日期',
                key: 'date'
            }],
            options: {
                showSummary: true,
                summaryMethod (param) {
                    const { columns, data } = param
                    const sums = []
                    columns.forEach((column, index) => {
                        if (index === 0) {
                        sums[index] = '合计'
                        return
                        }
                        const values = data.map(item => Number(item[column.property]))
                        if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                            return prev + curr
                            } else {
                            return prev
                            }
                        }, 0)
                        sums[index] += ' 分'
                        } else {
                        sums[index] = 'N/A'
                        }
                    })

                    return sums
                }
            }
        }
    },

    methods: {
        getFixTotal(){
            let data = {
                jobid: this.operator,
                page: 1,
                pageSize: 100
            }
            this.$api.FIX_TOTAL(data).then((res) => {
                console.log(res);
            })
        }
    }
}
</script>

<style scoped lang="scss">

.year-total-summary{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
}
.table {
    flex-grow: 0;
    flex-shrink: 0;
    width: 50%;
}

.inner {
    width: 300px;
    flex-grow: 1;
    flex-shrink:1
}
</style>