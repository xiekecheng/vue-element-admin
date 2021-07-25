<template>
  <div class="app-container goods-list">
    <h1>商品列表</h1>
    <!-- S 搜索框 -->
    <div>
      <!-- <span>名称</span><el-input v-model="input" placeholder="请输入内容"></el-input> 分类
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->

      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="名称">
          <el-input
            v-model="formInline.name"
            placeholder="商品名称"
            clearable
            @change="onSubmit"
          />
        </el-form-item>
        <el-form-item label="品类">
          <el-select
            v-model="formInline.cate"
            placeholder="请选择"
            @change="onSelectChange"
          >
            <el-option label="全部" value="" />
            <el-option
              v-for="item in cateList"
              :key="item._id"
              :label="item.label"
              :value="item.cate"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- E 搜索框 -->

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentHighlight"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="商品" width="150">
        <template slot-scope="scope">
          <!-- {{ scope.row.date }} -->
          <!-- <img :src="scope.row.img" alt="" /> -->
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.img"
            :fit="fit"
          />
          <!-- {{ scope.row.name }} -->
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="120" />
      <el-table-column prop="name" label="名称" width="120" />
      <el-table-column
        prop="desc"
        label="商品描述"
        show-overflow-tooltip
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px; margin-bottom: 20px">
      <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      > -->
      <el-button
        type="danger"
        @click="deleteSelection()"
      >删除选中行</el-button>
    </div>

    <!-- S 分页功能 -->
    <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination
        :current-page="page"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
    <!-- E 分类功能 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      total: 1,
      fit: "cover",
      page: 1,
      size: 10,
      formInline: {
        name: "",
        cate: ""
      },
      input: "",
      value: "",
      tableData: [],
      multipleSelection: [],
      cateList: [],
      deleteIdsArr: []
    }
  },
  watch: {
    size() {
      // console.log('每页数据条:',this.size);
      this.init()
    },
    page() {
      // console.log('页数:',this.page);
      this.init()
      // this.initCateList();
    }
  },
  mounted() {
    this.init()
    this.initCateList()
  },

  methods: {
    init() {
      // console.log('page,size',this.page,this.size);
      this.$goodsApi
        .getGoodsList({
          page: this.page,
          size: this.size,
          cate: this.formInline.cate,
          desc: this.formInline.name
        })
        .then((res) => {
          // console.log("res", res);
          // console.log('res', res)
          this.total = res.data.total
          this.tableData = res.data.list
        })
    },
    initCateList() {
      this.$goodsApi.getCateList().then((res) => {
        this.cateList = res.data
        // console.log("分类数据res", res)
      })
    },
    // S 分页操作
    handleSizeChange(val) {
      this.size = val
    },
    handlePageChange(val) {
      // console.log(`当前页: ${val}`);
      // console.log(val);
      this.page = val
      // this.init();
    },
    // E 分页操作

    //  选中行高亮
    handleCurrentHighlight(val) {
      this.currentRow = val
    },
    // 查询
    onSubmit() {
      console.log("submit!", this.formInline)
      // console.log(thi)
      this.init()
      // console.log('');
    },
    onSelectChange() {
            this.init()
    },
    // 编辑
    handleEdit(index, data) {
      // console.log("编辑数据", data)
      this.$router.push({ name: 'GoodsEdit', params: data })
      // console.log("跳转")
    },
    // 删除
    async handleDelete(index, data) {
      // console.log("删除数据");
      // const info = await this.$goodsApi.deleteGoodsById({_id:data._id})
      // console.log(info);

      this.$confirm("是否删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$goodsApi
            .deleteGoodsById({ _id: data._id })
            .then((res) => {
              console.log(res)
              this.init()
              this.$message({
                type: "success",
                message: "删除成功!"
              })
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "删除失败"
              })
            })
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        })
    },
    deleteSelection() {
      this.deleteIdsArr = []
      let arrStr = ''
      this.multipleSelection.forEach(item => {
        arrStr += item._id + ';'
      })
      console.log(arrStr)
      // 调删除接口
      this.$goodsApi.deleteGoodsByIds({ ids: arrStr }).then(res => {
        console.log(res)
      })
      this.init()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
// .goods-list{
// text-align: center;
// }
</style>
