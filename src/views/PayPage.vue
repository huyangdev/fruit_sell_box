<template>
    <el-row>
        <el-col :span="24">
            <div style="height:50px; line-height: 50px; font-size: 22px; background-color: #fff;">购物车 - 结算中心</div>
            <div class="pay-list">
                <el-table size="large" :data="shopList" 
                    style="width: 96%;font-size: 26px; margin:10px auto; border-radius: 10px;" height="450"
                    :row-style="{ height:'40px'}"
                    :cell-style="{'line-height':'40px'}">
                    <el-table-column label="图片">
                        <template #default="scope" >
                            <img :src="'http://192.168.10.186:9090/static/'+scope.row.photo" alt="" width="60" height="60">
                        </template>
                    </el-table-column>

                    <el-table-column prop="type" label="名称" />
                    <el-table-column prop="weight" label="重量/斤" />
                    <el-table-column prop="place" label="单价/斤"  />
                    <el-table-column label="共计">
                        <template #default="scope">
                           {{scope.row.weight * scope.row.place}}
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" #default="scope">
                        <el-button class="del-cell" size="large" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </el-table-column>

                </el-table>
            </div>
            <div class="pay-code-part" style="margin-top:30px;">
                <img src="imgs/QR.png" alt="" width="500" height="500">
                <div class="pay-info" style="font-size:30px; margin-bottom: 30px;">
                    总金额：<span style="color:red;">{{computedTotalPlace}}</span>元
                </div>
            </div>
            <div class="pay-bottom-part">
                <el-button class="back but" type="warning">
                    <router-link to="/weight">返回称重页面</router-link>
                </el-button>
                <el-button class="cancel but" @click="successPay()" type="success">完成支付</el-button>
                <el-button class="cancel but" type="danger">
                    <router-link to="/">取消支付</router-link>
                </el-button>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import services from "@/api/services"
import { ElMessage,ElMessageBox } from 'element-plus'
export default {
    name:'PayPage',
    data(){
        return {
            shopList:this.$store.getters.getShoppingList
        }
    },
    mounted(){
        services.hx712().then((res)=>{
            this.$store.state.weights.afterTotal = res.weight
        })
    },
    computed:{
        computedTotalPlace(){
            let total = 0
            for(let i = 0; i<this.shopList.length; i++){
                total += this.shopList[i].weight * this.shopList[i].place
            }

            let msg = new SpeechSynthesisUtterance()
            msg.text = "请支付"+ total +"元"  //文字内容，字符串
            // msg.volume = 1  // 音量，数值，默认值是1，范围是0到1
            // msg.rate = 1   // 语速，数值，默认值是1，范围是0.1到10
            // msg.pitch = 1 // 音高，数值，默认值为1，范围是0到2
            speechSynthesis.speak(msg);
            return total;
        }
    },
    methods:{
        handleDelete(id,obj){
            console.log(id,obj)
            // this.shopList.pop(id)
            this.shopList.splice(id,1)
            console.log(this.shopList)
        },
        successPay(){
            services.hx712().then((res)=>{
                this.$store.state.weights.afterTotal = res.weight
                let weight = this.$store.state.weights
                let w = Math.abs(weight.beforeTotal - (weight.afterTotal + weight.shoppingWeight))
                if(w < 10){
                    // 支付成功， 返回广告页面。清空相关参数
                    this.$store.state.shoppingNum = 0
                    this.$store.state.shoppingList = []
                    this.$store.state.weights.beforeTotal = 0
                    this.$store.state.weights.shoppingWeight = 0
                    this.$store.state.weights.afterTotal = 0
                    this.$router.push({name:"MainLayout"})
                
                }else{
                    // 重量对不上，警告！！！
                    ElMessageBox.alert("请将多拿的水果放回！！！","Warning",{
                        cancelButtonText: 'OK',
                        type: 'warning',
                    })
                }
            })
            
        }
    }
}
</script>

<style scoped>
.pay-list .shop-list-item{
    width: 800px;
    height: 70px;
    background-color: red;
    margin: 5px auto;
    text-align: center;
    line-height: 70px;
    font-size: 30px;
}

::v-deep .el-table .cell {
    height: 40px;
    line-height: 40px;
}
.del-cell{
    font-size: 20px;
}
.but{
    height: 50px;
    width: 230px;
    font-size: 26px;
}
</style>