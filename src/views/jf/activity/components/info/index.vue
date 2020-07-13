<template>
    <div class="info">
        <el-form size="mini" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="活动标题" prop="Title">
                <el-input v-model="ruleForm.Title"></el-input>
            </el-form-item>
            <el-form-item label="活动宣传语" prop="Slogan">
                <el-input v-model="ruleForm.Slogan"></el-input>
            </el-form-item>
            <el-form-item label="活动图片" prop="PictureUrl">
                <el-upload
                    class="avatar-uploader"
                    :before-upload="beforeUpload" :http-request="importFile" :show-file-list="false"
                    action="default"
                   >
                    <img v-if="ruleForm.PictureUrl" :src="ruleForm.PictureUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="活动开始日期" required>
                <el-col :span="11">
                <el-form-item prop="BeginDateTime">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.BeginDateTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="活动结束日期" required>
                <el-col :span="11">
                <el-form-item prop="EndDateTime">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.EndDateTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="活动内容" prop="ActivityContent">
                <el-input type="textarea" v-model="ruleForm.ActivityContent"></el-input>
            </el-form-item>

            <el-form-item label="活动奖惩" prop="RewardAndPenalties">
                <el-input type="textarea" v-model="ruleForm.RewardAndPenalties"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import util from '@/libs/util.js'
export default {
    name: 'info',
    props: {
        id: {
            type: [String, Number]
        }
    },
    data () {
        return {
            dayjs,
            file: null,
            operator: util.cookies.get('uuid'),
            tempRuleForm:  {
                Title: '',
                Slogan: '',
                PictureUrl: '',
                BeginDateTime: '',
                date2: '',
                ActivityContent: '',
                RewardAndPenalties: ''
            },
            ruleForm: {...this.tempRuleForm},
            rules: {
                Title: [
                    { required: true, message: '请输入活动标题', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                PictureUrl: [
                    { required: true, message: '请上传图片',trigger: 'change'}
                ],
                BeginDateTime: [
                    {  required: true, message: '请选择日期', trigger: 'change' }
                ],
                EndDateTime: [
                    {  required: true, message: '请选择日期', trigger: 'change' }
                ],
                ActivityContent: [
                    { required: true, message: '请填写活动内容', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        beforeUpload (file) {
            this.file = file;
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.ruleForm.BeginDateTime = dayjs(this.ruleForm.BeginDateTime).format('YYYY-M-D HH:mm:ss')
                this.ruleForm.EndDateTime = dayjs(this.ruleForm.EndDateTime).format('YYYY-M-D HH:mm:ss')
                this.ruleForm.CreatedBy=this.operator
                console.log(this.id)
                if (this.id) {
                    this.editActivity(this.ruleForm)
                } else {
                    this.addActivity(this.ruleForm)
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        /**
         * 获取单条活动详情
         */
        getInfo (id) {
            this.$api.GET_ACTIVITY_INFO({id: id}).then((res) => {
                console.log(res);
                if ( res.code == 0) {
                    this.ruleForm = res.data
                } else {
                    this.$message.error(res.msg || '获取信息失败，请联系管理员')
                }
            })
        },

        /**
         * 修改活动信息
         */
        editActivity (data) {
            console.log('修改')
            
            data.id = this.id
            this.$api.EDIT_ACTIVITY(data).then(res => {
                    if (res.code === 0) {
                        this.$message.success('修改成功')
                        this.ruleForm = {...this.tempRuleForm}
                        this.$emit('changeTab')
                    } else {
                        this.$message.error(res.msg || '修改失败，请联系管理员')
                    }
                }).catch(err => {
                    console.log('err', err)
                })
        },

        /**
         * 新增活动
         */
        addActivity (data) {
            this.$api.ADD_ACTIVITY(data).then(res => {
                    if (res.code === 0) {
                        this.$message.success('新增成功')
                        this.ruleForm = {...this.tempRuleForm}
                        this.$emit('changeTab')
                    } else {
                        this.$message.error(res.msg || '新增失败，请联系管理员')
                    }
                }).catch(err => {
                    console.log('err', err)
                })
        },

        importFile () {
        const _this = this;
        _this.source = axios.CancelToken.source();
        let fileData = new FormData();
        fileData.append('file', _this.file)
        fileData.append('Operator', this.operator)
        let url = '/api/upload';
        this.uploadFile(url, fileData, _this.source.token, (res) => {
            let loaded = res.loaded
            let total = res.total
            _this.$nextTick(() => {
                _this.uploadPercent = Math.floor(loaded/total*100)>1? Math.floor(loaded/total*100):1;
                })
                }).then((res) => {
                    if (res.data.code === 0) {
                        _this.uploadPercent = 0
                        _this.ruleForm.PictureUrl = res.data.data
                    } else {
                        console.log(res)
                    }
                }, (rej) => {
                    if (rej === -2) {
                        _this.$message.info('取消上传成功')
                    }
                })
            }
    },

    watch: {
        id: function(val) {
            if(val){
                this.getInfo(val)
            } else {
                this.ruleForm = {...this.tempRuleForm}
            }
            
       }
    }
}
</script>

<style lang="scss">
.info {
    width: 50%;
    padding-top: 20px;

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: $color-primary;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>