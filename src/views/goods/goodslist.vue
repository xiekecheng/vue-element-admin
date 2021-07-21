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

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.user" placeholder="商品名称" @change="onSubmit" />
        </el-form-item>
        <el-form-item label="品类">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
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
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="address" label="地址" show-overflow-tooltip />
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
    <div style="margin-top: 10px;margin-bottom:20px">
      <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      > -->
      <el-button type="danger" @click="toggleSelection()">删除选中行</el-button>
    </div>

    <!-- S 分页功能 -->
    <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
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
      currentPage4: 5,
      formInline: {
        user: '',
        region: ''
      },
      input: '',
      value: '',
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: []
    }
  },

  methods: {
    // S 分页操作
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handlePageChange(val) {
      console.log(`当前页: ${val}`)
    },
    // E 分页操作

    //  选中行高亮
    handleCurrentHighlight(val) {
      this.currentRow = val
    },
    onSubmit() {
      console.log('submit!', this.formInline)
      // console.log('');
    },
    // 编辑
    handleEdit() {
      console.log('编辑数据')
    },
    // 删除
    handleDelete() {
      console.log('删除数据')
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list{
  // text-align: center;
}
</style>
