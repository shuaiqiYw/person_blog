<template>
  <canvas ref="canvas" class="canvas"></canvas>
</template>

<script>
export default {
 name:"MaskCanvas",
  data(){
    return {
        width: "",
        height: "",
        data : [],
        num: 200,
        date:0,
        newDate:new Date(),
    }
  },
  mounted(){
    let canvas = this.$refs.canvas
    this.cxt = canvas.getContext("2d");
    this.initCanvas(canvas)
    window.onresize = this.initCanvas.bind(null,canvas);

  },
  methods:{
    // 启动canvas
    initCanvas(canvas){
        this.newDate = new Date()
        // 设置节流 小于1秒 不执行
        if(this.newDate - this.date   >= 200){
            clearInterval(this.time)
            this.date = this.newDate 
            this.data  = []
            canvas.width = this.width  = document.documentElement.clientWidth;
            canvas.height = this.height =document.documentElement.clientHeight;
            this.init(); //初始化
        }
    },
    init(){
      // 存储 星星各个位置
      this.handle();
      // 画圆
      this.time = setInterval(this.circre.bind(this),60)
    },
    handle(){
      for (let i=0;i<this.num;i++){
        this.data.push({
          x:Math.floor(Math.random() *this.width),
          y:Math.floor(Math.random()*this.height),
          r:Math.random() * 4 + 1,
          moveX:  Math.random() - 0.5, // 用于星星移动步数
          moveY:  Math.random() - 0.5 // 用于星星移动步数
        });
      }
    },
    circre(){
      this.cxt.clearRect(0,0,this.width,this.height)
      // 清除画布区域  清除了上一次画布的所有内容
      this.cxt.fillStyle = "skyblue";
      this.data.forEach((item,index)=>{
        this.cxt.arc( item.x, item.y,item.r, 0 * Math.PI,2 * Math.PI,);
        this.cxt.fill();
        this.cxt.beginPath();
        // 在原有的基础进行 添加 或减少 从而进行移动
        item.x += item.moveX;
        item.y += item.moveY;
        // console.log(this.data[index+1].x);
        // 判断两点之间线段距离   同时需要和每个圆点进行比较
        for (let i=index+1;i<this.data.length;i++){
          this.line(item.x,item.y,i)
        }
        // 反弹
        if (item.x < 0 || item.x > this.width-17){
          item.moveX = -item.moveX
        }
        if (item.y < 0 || item.y > this.height){
          item.moveY = -item.moveY
        }
      })

       

    },
    line(x,y,i){
      let x1 =  this.data[i].x;
      let y1 =  this.data[i].y;
      if(Math.pow(x - x1,2)+ Math.pow(y - y1,2)  <= 400 * 5 ){
        this.cxt.moveTo(x,y);
        this.cxt.lineTo(x1,y1);
        let add =this.cxt.createLinearGradient(x,y,x1,y1);
        add.addColorStop(0,"#fff");
        add.addColorStop(0.5,"skyblue");
        add.addColorStop(1,"pink");
        this.cxt.strokeStyle = add;
        this.cxt.lineWidth = 2;
        this.cxt.stroke();
        this.cxt.beginPath();
      }
    }
  },
} 
</script>

<style lang="less" scoped>
 .canvas{
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

</style>