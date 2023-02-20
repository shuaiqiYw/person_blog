<template>
  <div class="link_box">
    <i class="el-icon-collection icon_link"></i>
    <span class="link_text">精选文章</span>
    <el-divider><span>文章列表</span></el-divider>
    <div class="article_box">
      <el-row>
        <el-col
          :span="24"
          v-for="(o, index) in tableData"
          :key="index"
          :offset="index > 0 ? 2 : 0"
        >
          <el-card>
            <!-- <img 
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="elcardImg"
            > -->
            <div class="elcardtextBox">
              <p class="biaoti">{{o.articletitle}}</p>
              <span class="miaoshu">{{o.articledescribe}}</span>
              <div class="bottom clearfix">
                <time class="time">发表时间：{{ o.articletime.slice(0,19).replace("T"," ") }}</time>
                <el-button type="text" class="button" @click="toViewFullText(o)">查看全文</el-button>
              </div>
              <el-badge value="hot" class="item"></el-badge>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="currentChange"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      total:0,
      tableData: [],
      storageData: [],
    };
  },
  methods:{
    async getArticleAll() {
      let { data } = await this.$axios.post("/root/getarticleall");
      this.tableData = data.once;
      //一页至少十项才能分页
      this.total = data.alldata.length
      this.storageData.push(...data.alldata)
    },
    async currentChange(index){
      this.tableData = this.storageData.slice((index-1)*10,index*10);
      if(this.tableData.length) return;
      //过滤
      index = index * 10 - 10;
      let {data} = await this.$axios.post("/root/paging",{index})
      this.tableData = data
      this.storageData.push(...data)
    }, 
    toViewFullText(row){
      this.$router.push({path:"/article/lookOver",query:{info:row.articleMdUrl,id:row._id}})
    },
    
  },
  //初始化请求
  created() {
    this.getArticleAll();
  },
};
</script>

<style lang="less" scoped>
.link_box {
  width: 100%;
  height: 50px;
  background: #ebeef5;
  border-radius: 8px;
  user-select: none;

  .link_text {
    font-size: 20px;
    font-family: Microsoft JhengHei; //微软正黑体
    line-height: 50px;
    margin-left: 15px;
  }

  .icon_link {
    font-size: 24px;
    margin-left: 10px;
  }

  .article_box {
    margin-top: 20px;
    padding: 8px;
    box-sizing: border-box;

    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      margin-left:30px;
    }

    //
    .el-col-offset-2{
      margin-left: 0;
    }

    /deep/ .el-card__body{
      padding: 10px;
    } 

    /deep/ .el-card{
     margin-bottom: 10px;
    }

    .elcardImg{
      width: 14%;
    }

    .elcardtextBox{
      display: inline-block;
      width: auto;
      cursor: pointer;

      .biaoti{
        font-size: 18px;
        font-weight: 600;
        padding-bottom: 10px;
      }

      .miaoshu{
        font-size: 13px;
        font-weight: 400;
        text-overflow: ellipsis;
        // overflow: hidden;
        white-space: nowrap;
      }

      .item {
        margin-top: -160px;
        margin-left: 800px;
      }
    }
  }
  
  .el-pagination{
    text-align: center;
    padding-top: 20px;
  }

}
</style>


