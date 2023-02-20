<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="博客名" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.blogName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="博客地址" width="250">
      <template slot-scope="scope">
        <span>{{ scope.row.blogUrl }}</span>
      </template>
    </el-table-column>
    <el-table-column label="博客logo地址" width="300">
      <template slot-scope="scope">
        <span>{{ scope.row.logoUrl }}</span>
      </template>
    </el-table-column>
    <el-table-column label="博客描述" width="200">
      <template slot-scope="scope">
        <span>{{ scope.row.blogDescribe }}</span>
      </template>
    </el-table-column>
    <el-table-column label="是否推荐" width="80">
      <template slot-scope="scope">
        <!-- <span>{{ scope.row.recommendBol }}</span> -->
        <el-switch
          v-model="scope.row.recommendBol"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value= true
          :inactive-value= false
          @click.native="handleEdit(scope.$index, scope.row)"
        >
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "LinkManagement",
  data() {
    return {
      value: true,
      tableData: [],
    };
  },
  methods: {
    //是否推荐
    async handleEdit(index, row) {
      let {data} = await this.$axios.post("/root/recommendflink",{
        recommendBol:row.recommendBol,
        id:row._id
      })  
      console.log(data);
    },
    async handleDelete(index, row) {
        let {data} = await this.$axios.post("/root/deletelink",{id:row._id})
        this.tableData.splice(index,1);
        this.$message.success(data.msg)
    },
    //获取所有友链数据
    async getLinks() {
      let { data } = await this.$axios.post("/flinks/getlinksdata");
      // console.log(data);
      this.tableData = data;
    },
  },
  created() {
    this.getLinks();
  },
};
</script>

<style>
</style>