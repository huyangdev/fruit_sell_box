<template>
  <el-row>
    <el-col :span="24">
      
      <div class="up-part">
        <el-carousel  arrow="always" 
                      height="900px">
          <el-carousel-item v-for="item in 3" :key="item">
            <img :src="'imgs/'+item+'.jpeg'" width="820" height="900" alt="促销图片">
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="down-part">
        <el-button class="start-weight" type="primary">
          <router-link to="/weight">点我开始购买水果</router-link></el-button>
        <!-- <el-steps class="step" align-center>
          <el-step title="打开柜门" />
          <el-step title="选购水果并加入购物车" />
          <el-step title="进行付款" />
          <el-step title="结算" />
        </el-steps> -->
        <!-- <ul class="tips">
          <li>1. fds</li>
          <li>2. fds</li>
          <li>3. fds</li>
        </ul> -->
      </div>
    </el-col>
  </el-row>
</template>

<script>
import services from "@/api/services"
export default {
  name:"MainLayout",
  components:{
    
  },
  mounted(){
    // this.send()
    if(this.$store.state.weights.beforeTotal == 0){
      services.hx712().then((res)=>{
        this.$store.state.weights.beforeTotal = res.weight
      })
    }
  },
  methods:{
    async send(){
      let result = await services.test()
      console.log(result)
    }
  }
}
</script>

<style scoped>
  .tips{
    width: 80%;
    margin: 0 auto;
    text-align: left;
    font-size: 26px;
  }
  .down-part{
    margin-top:30px;
  }
  .down-part .step{
    font-size: 20px !important;
    color: #a8abb2;
  }
  
  .start-weight{
    width: 610px;
    height: 80px;
    border-radius: 15px;
    font-size: 40px;
    margin-bottom: 30px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .el-carousel__item h3 {
    display: flex;
    /* color: #475669; */
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

</style>