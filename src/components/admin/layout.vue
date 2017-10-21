<template>
<div class="tmpl">
  <!-- 思路；先分左右两列，右边列再分两行 -->
<el-row>
  <!--左边  侧边栏 -->
  <el-col :span="leftCol">
    <img src="../../../statics/imgs/logo.png" alt="">
    <div class="grid-content bg-purple  layout menu">
      <!-- 冒号的数据绑定和v-model的绑定有什么区别？ -->
          <el-menu default-active="1-1" class="el-menu-vertical-demo":collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>购物商城</template>
<!-- 设置跳转的路由  相当于a标签 -->
<router-link to="/admin/goodslist">
    <el-menu-item index="1-1">内容管理</el-menu-item>
</router-link>

<el-menu-item index="1-2">类别管理</el-menu-item>
<el-menu-item index="1-3">评论管理</el-menu-item>
</el-submenu>
<el-submenu index="2">
    <template slot="title"><i class="el-icon-message"></i>订单管理</template>
    <el-menu-item index="2-1">订单列表</el-menu-item>
</el-submenu>
</el-menu>
</div>
</el-col>

<!--右边  顶部登陆退出 -->
<el-col :span="rightCol">
    <el-row>
        <el-col :span="24">
            <div class="topbg">
                <el-row>
                    <el-col :span="1">
                        <i @click="menuToggle" class="el-icon-menu layout area"></i>
                    </el-col>
                    <el-col :span="23">
                        <span>你好，欢迎***</span>
                        <el-dropdown>
                            <el-button type="primary">
                                更多功能<i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>预览网站</el-dropdown-item>
                                <el-dropdown-item>修改密码</el-dropdown-item>
                                <el-dropdown-item>注销登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>

    <!-- 这里是内容区域   注意位置是放在右边的第二行，如果放在外面是没有效果的-->
    <el-row>
        <el-col :span='24'>
            <router-view></router-view>
        </el-col>
    </el-row>
</el-col>
</el-row>
</div>
</template>

<script>
    export default {
        //参数的定义写在data中
        data() {
            return {
                isCollapse: false,
                leftCol: 4,
                rightCol: 20
            };
        },
        methods: {
            menuToggle() {
                // console.log(11)
                this.isCollapse = !this.isCollapse;
                if (this.isCollapse) {
                    (this.leftCol = 2), (this.rightCol = 22);
                } else {
                    (this.leftCol = 4), (this.rightCol = 20);
                }
            }
        }
    };
</script>
<style scoped>

</style>