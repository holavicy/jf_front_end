<template>
    <div class="info">
        <el-form size="mini" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="活动标题" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动宣传语" prop="slogon">
                <el-input v-model="ruleForm.slogon"></el-input>
            </el-form-item>
            <el-form-item label="活动开始日期" required>
                <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="活动结束日期" required>
                <el-col :span="11">
                <el-form-item prop="date2">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="活动内容" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>

            <el-form-item label="活动奖惩" prop="rewards">
                <el-input type="textarea" v-model="ruleForm.rewards"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>

<script>
export default {
    name: 'info',
    data () {
        return {
            ruleForm: {
                name: '',
                slogon: '',
                date1: '',
                date2: '',
                desc: '',
                rewards: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动标题', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动内容', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log(this.ruleForm)
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped lang="scss">
.info {
    width: 50%;
    padding-top: 20px;
}
</style>