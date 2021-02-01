<template>
    <div class="year-total-summary">
        <div class="inner">
            <ve-pie :data="chartData" width="400px" v-bind="pubSetting" :settings="chartSettings" :events="chartEvents"></ve-pie>
        </div>
        <div class="table">
            <el-table :data="fixData" size="mini" stripe height="400" v-show="showTable == 1">
                <el-table-column prop="type" label="固定积分类别"></el-table-column>
                <el-table-column prop="num" label="数值"></el-table-column>
            </el-table>

            <el-table :data="dataManage" size="mini" stripe v-show="showTable == 2">
                <el-table-column type="index" width="55"></el-table-column>
                <el-table-column prop="BonusPoints" label="加分" width="60"></el-table-column>
                <el-table-column prop="MinusPoints" label="减分" width="60"></el-table-column>
                <el-table-column prop="Reason" label="加减分理由" width="180"></el-table-column>
                <el-table-column prop="Proof" label="加减分依据" width="180"></el-table-column>
                <el-table-column prop="ReasonType" label="理由分类" width="120"></el-table-column>
                <el-table-column prop="checkDate" label="考核日期" width="120"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import util from '@/libs/util.js'
import dayjs from 'dayjs'
export default {
    name: 'year-total-summary',

    data () {
        return {
            dataManage: [],
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
                    { 类别: '年度管理积分', 数值: 0 },
                    { 类别: '年度固定积分', 数值: 0 }
                    ]
            },
            fixData: [{
                type: '职务积分',
                num: 0
            }, {
                type: '职称积分',
                num: 0
            },{
                type: '学历积分',
                num: 0
            },{
                type: '工龄积分',
                num: 0
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
            }]
        }
    },

    created(){
        this.getFixTotal();
        this.getManageList();
    },

    methods: {
        getFixTotal(){
            let data = {
                jobid: String(this.operator),
                page: 1,
                pageSize: 100
            }
            this.$api.FIX_TOTAL(data).then((res) => {
                this.fixData[0].num = res.data.detail[0]["职务积分"]
                this.fixData[1].num = res.data.detail[0]["职称积分"]
                this.fixData[2].num = res.data.detail[0]["学历积分"]
                this.fixData[3].num = res.data.detail[0]["工龄积分"]
                let toatalFix = this.fixData[0].num+this.fixData[1].num+this.fixData[2].num+this.fixData[3].num;
                this.chartData.rows[1]["数值"]=toatalFix;
            })
        },

        getManageList(){
          let data = {
            jobid: String(this.operator),
            isAccounted: '',
            beginDate: dayjs().startOf('year').format('YYYY-M-D HH:mm:ss'),
            endDate: dayjs().endOf('year').format('YYYY-M-D HH:mm:ss'),
            page: 1,
            pageSize: 1000,
            rewardPointsType: "管理积分"
          }
          this.loading = true;
          this.$api.GET_DETAIL_LIST(data).then(res => {
              this.loading = false
              let totalManage = 0
              res.data.detail.map((item) => {
                item.checkDate = dayjs(item.AssessmentDate).format('YYYY-M-D');
                totalManage = totalManage + item.BonusPoints - item.MinusPoints
              })
              this.dataManage = res.data.detail
              this.chartData.rows[0]["数值"]=totalManage;
          }).catch(err => {
              console.log('err', err);
              this.loading = false
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