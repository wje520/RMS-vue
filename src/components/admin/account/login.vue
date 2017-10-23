<template>
<div class="accounttmpl">
    <el-row>
        <el-col :span='6' :offset='8'>
                <img src="../../../../statics/imgs/logo.png" alt="">
            <el-form :model='form' :rules='rules' ref='ruleForm'  class="demo-ruleForm">
                <el-form-item label='用户名' prop='uname'>
                    <el-input v-model='form.uname'></el-input>
                </el-form-item>
                <el-form-item label='密码' prop='upwd'>
                    <el-input v-model='form.upwd' type='password'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</div>  
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    uname: '',
                    upwd: '',

                },
                rules: {
                    uname: [{
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }],
                    upwd: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        mounted() {
            document.getElementsByTagName('body')[0].style.backgroundColor = '#267cb7';
        },
        beforeDestroy() {
            document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
        },
        methods: {
            resetForm(formref) {
                this.$refs[formref].resetFields();
            },
            submitForm(formref) {
                this.$refs[formref].validate((valid) => {
                    if (valid) {
                        var url = '/admin/account/login';
                        this.$http.post(url, this.form).then(res => {
                            if (res.data.status == 1) {
                                return this.$message.error(res.data.message);
                            }
                            //vue-router的链式编程
                            this.$router.push({
                                name: 'layout'
                            })
                        })
                    } else {
                        return false;
                    }
                })
            },
        }
    }
</script>
<style scoped>

</style>