/* eslint-disable */
<template>
  <div class="app-container goods-edit">
    <h1>商品新增</h1>
    <!-- S  表单 -->
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input
            v-model="form.desc"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="商品品类">
          <el-select v-model="form.cate" placeholder="请选择">
            <el-option
              v-for="item in cateList"
              :key="item.cate"
              :label="item.label"
              :value="item.cate"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <!-- <el-switch v-model="form.delivery" /> -->
          <el-input-number
            v-model="form.price"
            controls-position="right"
            :min="1"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="是否热销">
          <el-tooltip
            :content="'Switch value: ' + switchValue"
            placement="top"
          >
            <el-switch
              v-model="switchValue"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="true"
              inactive-value="false"
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="活动形式">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- E  表单 -->
  </div>
</template>

<script>
export default {
    name: "GoodsList",
    data() {
        return {
            textarea: "",
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            value: "",
            switchValue: false,
            form: {
                name: "",
                desc: "",
                cate: "",
                price: "",
                hot: false,
                img: ""
            },
            cateList: []
        };
    },
    mounted() {
        this.initCateList();
    },
    methods: {
        onSubmit() {
            console.log("submit!", this.form);
        },
        initCateList() {
            this.$goodsApi.getCateList().then(res => {
                this.cateList = res.data;
                console.log("分类数据res", res);
            });
        },
        handleChange(value) {
            console.log(value);
        }
    }
};
</script>

<style lang="scss" scoped>
.goods-edit {
    // text-align: center;
    .form {
        width: 60%;
        // margin: 0px auto;
    }
}
</style>
