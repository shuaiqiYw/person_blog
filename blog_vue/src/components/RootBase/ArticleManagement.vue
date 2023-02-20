<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="标题" width="200">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.articletitle"
            :disabled="scope.row.articleamend"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="260">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.articledescribe"
            :disabled="scope.row.articleamend"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="修改文档" width="260">
        <template slot-scope="scope">
          <el-button 
            @click="amendDocument(scope.row)"
            >修改文档</el-button>
        </template>
      </el-table-column>
      <el-table-column label="HOT" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.articletop"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{
            scope.row.articleamend ? "编辑" : "确定"
          }}</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleSubmit(scope.$index, scope.row)"
            >提交</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination 
      background 
      layout="prev, pager, next" 
      :total="total"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "ArticleManagement",
  data() {
    return {
      total:0,
      tableData: [],
      storageData: []
    };
  },
  methods: {
    //获取所有文章
    async getArticleAll() {
      let { data } = await this.$axios.post("/root/getarticleall");
      this.tableData = data.once;
      //一页至少十项才能分页
      this.total = data.alldata.length
      this.storageData.push(...data.alldata)
    },
    //是否编辑
    handleEdit(index, row) {
      row.articleamend = !row.articleamend;
    },
    //提交修改
    async handleSubmit(index, row) {
      let { data } = await this.$axios.post("/root/editairicle", {
        id: row._id,
        articletitle: row.articletitle,
        articledescribe: row.articledescribe,
        articletop: row.articletop,
      });
      this.$message.success(data.msg);
    },
    //删除
    async handleDelete(index, row) {
      let { data } = await this.$axios.post("/root/deletearticle", {
        id: row._id,
      });
      this.tableData.splice(index, 1);
      this.$message.success(data.msg);
    },
    //分页
    async currentChange(index){
      this.tableData = this.storageData.slice((index-1)*10,index*10);
      if(this.tableData.length) return;
      //过滤
      index = index * 10 - 10;
      let {data} = await this.$axios.post("/root/paging",{index})
      this.tableData = data
      this.storageData.push(...data)
    }, 
    //修改文档
    amendDocument(row){
      this.$router.push({path:"/amendArticle/123",query:{info:row.articleMdUrl,id:row._id}})
    }
  },
  created() {
    this.getArticleAll();
  },
};
</script>

<style lang="less" scoped>
.el-pagination{
  text-align: center;
  padding-top: 20px;
}
</style>