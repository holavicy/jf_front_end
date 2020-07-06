<template>
    <div class="staff-summary">
         <div class="search-wrapper">
            <div class="search-item">
                <label>工号：</label><el-input placeholder="请输入工号" v-model="staffNo" size="mini"></el-input>
            </div>
            <!-- <div class="search-item">
                一级部门：<el-input placeholder="请选择部门" v-model="depFirst"></el-input>
            </div>
            <div class="search-item">
                二级部门：<el-input placeholder="请选择部门" v-model="depSecond"></el-input>
            </div>
            <div class="search-item">
                三级部门：<el-input placeholder="请选择部门" v-model="depThird"></el-input>
            </div> -->
            <div class="search-item">
                <label>姓名：</label><el-input placeholder="请输入姓名" v-model="name" size="mini"></el-input>
            </div>
            <el-row class="button-wrapper">
                <el-button type="primary" plain size="mini" @click="getList">查询</el-button>
                <el-button type="primary" size="mini" @click="exportFile">导出</el-button>
            </el-row>
        </div>

        <div class="table-wrapper">
            <el-table :data="data" stripe height="400" style="margin-top: 20px" v-loading="loading">
                <el-table-column prop="jobid" label="工号" width="70" fixed></el-table-column>
                <el-table-column prop="name" label="姓名" fixed></el-table-column>
                <el-table-column prop="DepartmentLv1" label="业务单元"></el-table-column>
                <el-table-column prop="DepartmentLv3" label="部门"></el-table-column>
                <el-table-column prop="BonusPoints" label="职务"></el-table-column>
                <el-table-column prop="MinusPoints" label="职称"></el-table-column>
                <el-table-column prop="Reason" label="学历"></el-table-column>
                <el-table-column prop="AssessmentDate" label="入职时间" width="180"></el-table-column>
                <el-table-column prop="AssessmentDate" label="职务积分" width="80"></el-table-column>
                <el-table-column prop="AssessmentDate" label="职称积分" width="80"></el-table-column>
                <el-table-column prop="AssessmentDate" label="学历积分" width="80"></el-table-column>
                <el-table-column prop="AssessmentDate" label="工龄积分" width="80"></el-table-column>
                <el-table-column prop="AssessmentDate" label="合计" width="100"></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>
        </div>
    </div>
</template>

<script>
import js from './mixins/index'
export default {
    mixins: [
        js
    ],
    data () {
        return {
            data: []
        }
    }
}
</script>

<style scoped lang="scss">
.staff-summary {
    .search-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .search-item{
            display: flex;
            align-items: center;
            margin-right: 10px;

            label{
                flex-shrink: 0;
                font-size: 14px;
                color: #101010;
            }
        }
    }

    .button-wrapper{
        display: flex;
        align-items: center;
    }
}
</style>