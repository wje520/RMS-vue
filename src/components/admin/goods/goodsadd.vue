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
    <el-row class="formTop">
        <el-col :span='24'>
           <el-form :model='form' :rules='rules' ref='ruleForm' label-width='100px' class="demo-ruleForm">
               <!-- 定义表单元素 -->
               <!-- 标题和副标题 -->
               <el-row>
                   <el-col  :span="10" >
                        <el-form-item label='内容标题' prop='title'>
                                <el-input v-model="form.title"></el-input>
                        </el-form-item>
                   </el-col>
                   <el-col :span="10" :offset="2">
                        <el-form-item label='副标题' prop='sub_title'>
                                <el-input v-model="form.sub_title"></el-input>
                        </el-form-item>
                   </el-col>
               </el-row>
               <!-- 所属类别 -->
               <el-row>
                   <el-col :span="8">
                        <el-form-item label='所属类别' prop='category_id'>
                               <el-select v-model='form.category_id' placeholder='请选择'>
                                   <el-option v-for='(item,index) in categoryList' :key="index" :label='item.title' :value='item.category_id'>
                                       <span v-if='item.class_layer>1'>|-</span>
                                       <!-- v-text  也可以绑定数据 -->
                                       <span v-text='item.title'></span>  
                                       <!-- <span v-for='layer in (item.class_layer-1)'>&nbsp;</span> -->
                                   </el-option>
                               </el-select>
                        </el-form-item>
                   </el-col>
                   <el-col :span='5'>
                        <el-form-item label='是否发布' prop='status'>
                            <!-- width需要prop绑定 -->
                            <el-switch v-model="form.status"  on-text="是" off-text="否"  :width='60' > </el-switch>
                        </el-form-item>
                   </el-col>
                   <el-col :span='11'>
                    <el-form-item label='推荐类型'>
                        <!-- switch使用v-model来绑定数据，和prop类似 -->
                      <el-switch v-model="form.is_slide"  on-text="轮播图" off-text="轮播图" :width='70'></el-switch> <el-switch v-model="form.is_top" on-text="置顶" off-text="置顶" 
                        :width='60' ></el-switch>
                      <el-switch v-model="form.is_hot"  on-text="热门" off-text="热门" :width='60'></el-switch> 
                    </el-form-item>
                   </el-col>
               </el-row>
               <!-- 上传封面图片 相册 -->
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='上传封面图'>
                                <el-upload
                                class="upload-demo"
                                action=" http://157.122.54.189:9095/admin/article/uploadimg"
                                :on-success='imgUploaded'
                                :file-list="form.imgList"
                                list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                              </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='图片相册'>
                                <el-upload
                                class="upload-demo"
                                action=" http://157.122.54.189:9095/admin/article/uploadfile"
                                :on-success='fileUploaded'
                                :file-list="form.fileList"
                                list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                              </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <!-- 商品货号、销售价格 -->
               <el-row>
                   <el-col :span='5'>
                       <el-form-item label='商品货号' prop='goods_no'>
                           <el-input v-model='form.goods_no'></el-input>
                       </el-form-item>
                   </el-col>
                   <el-col :span='5':offset='-1'>
                        <el-form-item label='库存数量' prop='stock_quantity'>
                            <el-input v-model.number='form.stock_quantity' auto-complete="off"></el-input>
                        </el-form-item>
                   </el-col>
                   <el-col :span='5':offset='-1'>
                        <el-form-item label='市场价格' prop='market_price'>
                            <el-input v-model.number='form.market_price' auto-complete="off"></el-input>
                        </el-form-item>
                   </el-col>
                   <el-col :span='5':offset='-1'>
                        <el-form-item label='销售价格' prop='sell_price'>
                            <el-input v-model.number='form.sell_price' auto-complete="off"></el-input>
                        </el-form-item>
                   </el-col>
               </el-row>
               <!-- 内容摘要 -->
               <el-row>
                   <el-col :span='22'>
                       <el-form-item label='内容摘要' prop='zhaiyao'>
                           <el-input type='textarea' v-model='form.zhaiyao' placeholder='请输入摘要'></el-input>
                       </el-form-item>
                   </el-col>
               </el-row>
               <!-- 富文本编辑组件 -->
               <el-row>
                   <el-col :span='22'>
                       <el-form-item  label='详细内容' prop='content'>
                           <quill-editor v-model='form.content' ></quill-editor>
                       </el-form-item>
                   </el-col>
               </el-row>
               <!-- 提交保存 -->
               <el-row>
                   <el-col :span='24'>
                       <el-form-item >
                           <!-- 传入的是ref中的值：ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。
                            如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例： -->
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                       </el-form-item>
                   </el-col>
               </el-row>
           </el-form>
        </el-col>
    </el-row>
</div>
</template>

<script>
    // 导入富文本编辑的私有组件
    import {
        quillEditor
    } from 'vue-quill-editor';
    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                //获取商品分类列表
                categoryList: [],
                // form表单需要提交到服务器的数据
                form: {
                    title: '',
                    sub_title: '',
                    category_id: '',
                    status: true,
                    is_slide: false,
                    is_top: false,
                    is_hot: false,
                    goods_no: '',
                    stock_quantity: 0,
                    market_price: 0,
                    sell_price: 0,
                    zhaiyao: '',
                    content: '',
                    imgList: [],
                    fileList: []
                },
                rules: {
                    title: [{
                        required: true, //非空检查
                        message: '请输入标题名称',
                        trigger: 'blur' //文本框失去焦点，触发检查
                    }],
                    category_id: [{
                        required: true
                    }],
                    goods_no: [{
                        required: true, //非空检查
                        message: '请输入商品货号',
                        trigger: 'blur' //文本框失去焦点，触发检查
                    }],
                    stock_quantity: [{
                        required: true,
                        message: '库存数量不能为空',
                    }, {
                        type: 'number',
                        message: '数量必须为数值',
                    }],
                    market_price: [{
                        required: true,
                        message: '价格不能为空',
                    }, {
                        type: 'number',
                        message: '价格必须为数值',
                    }],
                    sell_price: [{
                        required: true,
                        message: '价格不能为空',
                    }, {
                        type: 'number',
                        message: '价格必须为数值',
                    }],
                    zhaiyao: [{
                        required: true,
                        message: '内容不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {
            this.getCategList();
        },
        methods: {
            getCategList() {
                var url = '/admin/category/getlist/goods';
                this.$http.get(url).then(res => {
                    if (res.data.status == 1) {
                        return this.$message.error(res.data.message);
                    }
                    this.categoryList = res.data.message;
                })
            },
            // 上传封面图片
            imgUploaded(response, file, fileList, ) {
                // console.log(response)
                // console.log(file) 
                // console.log(fileList)
                this.form.imgList = [response] //这样保证只能上传一张
                    // console.log(this.form.imgList) //注意imgList是form下面的属性，不能直接点出来
            },
            fileUploaded(response, file, fileList) {
                this.form.fileList.push(response); //可上传多张图片
            },
            submitForm(formref) {
                this.$refs[formref].validate((valid) => {
                    if (valid) {
                        var url = '/admin/goods/add/goods';
                        this.$http.post(url, this.form).then(res => {
                            if (res.data.status == 1) {
                                this.$message.error(res.data.message);
                                return;
                            } else {
                                // 使用vue-router的链式编程，跳转到goodslist页面
                                this.$router.push({
                                    name: 'goodslist'
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formref) {
                this.$refs[formref].resetFields();
            }

        }
    }
</script>
<style scoped>
    .formTop {
        margin-top: 10px;
    }
</style>