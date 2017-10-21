<template>
<div class="tmpl">
    <!-- 第一行：面包屑 -->
    <el-row>
        <el-col :span='24'>
                <div class="abread bt-line"> 
                        <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>购物商城</el-breadcrumb-item>
                        <el-breadcrumb-item>商品新增</el-breadcrumb-item>
                        </el-breadcrumb>
                </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {

        }
    }
</script>
<style scoped>

</style>