<template>
<div class="arttmpl">
    <!-- 第一行 面包屑-->
    <el-row>
        <el-col :span='24'>
            <div class="abread bt-line"> 
   <el-breadcrumb separator="/">
   <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
   <el-breadcrumb-item>购物商城</el-breadcrumb-item>
   <el-breadcrumb-item>商品列表</el-breadcrumb-item>
   </el-breadcrumb>
            </div>
        </el-col >
    </el-row>
    <!-- 第二行 筛选-->
    <div class="operation">
         <el-row>
        <el-col :span='5'>
             <el-button >全选</el-button>
             <router-link to="/admin/goodsadd">
                <el-button >新增</el-button>
             </router-link>
             <el-button >删除</el-button>
        </el-col>
        <el-col :span='4' :offset="15">
            <el-input
         placeholder="请输入搜索内容"
         icon="search"
         v-model="searchVal" :on-icon-click="getlist">
            </el-input>
        </el-col>
        </el-row>
    </div>
    <!-- 第三行： 列表展示-->
    <el-row>
        <el-col :span='24'>
              <!-- 对应的单个字段填到prop中，同时传入多个字段使用template -->
             <el-table :data="list" height="400"  style="width: 100%" border @selection-change="getrows"
             :row-class-name="tableRowClassName"
             >
                 <el-table-column type='selection'  width="80"> </el-table-column>
                 <el-table-column label="标题" width=""> 
                    <template scope="scope">
                      <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">{{scope.row.title}}</router-link>
                     </template>
</el-table-column>
<!-- <el-table-column prop="categoryname" label="所属类别" width="100"> </el-table-column>
<el-table-column label="发布人/发布时间" width="180">
    <template scope='scope'>
                            {{scope.row.user_name}}/{{scope.row.add_time}}
                        </template>
</el-table-column> -->
<el-table-column prop="stock_quantity" label="库存" width="100"> </el-table-column>
<el-table-column prop="market_price" label="市场价" width="100"> </el-table-column>
<el-table-column prop="sell_price" label="销售价" width="100"> </el-table-column>
<el-table-column prop="" label="属性" width="150">
    <template scope="scope">
            <el-tooltip class="item" effect="dark" content="进入轮播" placement="top">
                    <i class="el-icon-picture ls" v-bind="{class:scope.row.is_slide?'imgactive':''}" ></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="文章置顶" placement="top">
                    <i class="el-icon-upload ls" v-bind="{class:scope.row.is_top?'imgactive':''}"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="热门文章" placement="top">
                    <i class="el-icon-star-on ls" v-bind="{class:scope.row.is_hot?'imgactive':''}"></i>
            </el-tooltip>
    </template>
</el-table-column>
<el-table-column prop="date" label="操作" width="100">
    <!-- 默认的数据需要这样设置  template  +scope="scope" -->
    <template scope="scope">
        <!-- router-link相当于a标签，不用再另外加a标签了 -->
         <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">
            <el-button type="info" size="mini" >修改</el-button>
        </router-link>                   
  </template>
</el-table-column>
</el-table>
</el-col>
</el-row>
<!-- 第四行：分页功能 -->
<el-row>
    <el-col :span="24">
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="[10,20,30,40,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-col>
</el-row>
</div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                searchVal: '',
                ids: '', //获取删除商品的id字符串,可不可以存到数组中？
                currentPage: 1,
                pageSize: 10,
                total: 0
            };
        },
        created() {
            this.getlist();
        },
        methods: {
            sizeChange(pagesize) { //所传参数参照elementui
                // console.log(pagesize)
                this.pageSize = pagesize;
                this.getlist(); //再次获取当前页的真实数据
            },
            currentChange(pageindex) {
                this.currentPage = pageindex;
                this.getlist(); //再次获取当前页的真实数据
            },
            // 获取单个行对象
            getrows(rows) {
                // console.log(rows)
                this.ids = '';
                var splitChar = ',';
                for (var i = 0; i < rows.length; i++) {

                    if (i == rows.length - 1) {
                        splitChar = '';
                    }
                    this.ids += rows[i].id + splitChar;
                }
                // console.log(this.ids) //string
            },
            getlist() {
                var url = "/admin/goods/getlist?pageIndex=" + this.currentPage + "&pageSize=" + this.pageSize + "&searchvalue=" + this.searchVal;
                this.$http.get(url).then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                    } else {
                        this.list = res.data.message;
                        this.total = res.data.totalcount;
                    }
                })

            },
            tableRowClassName(row, index) {
                if (index % 2 == 0) {
                    return 'info-row';
                } else {
                    return 'positive-row';
                }
            }
        }
    };
</script>
<style scoped>

</style>