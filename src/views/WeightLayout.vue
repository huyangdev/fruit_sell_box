<template>
    <el-row>
        <el-col :span="24">
            <div style="height:50px; line-height: 50px; font-size: 22px; background-color: #fff;">称重中心</div>
            <div id="photo-part">
                <img v-if="video_flag" src="http://192.168.10.186:9090/video_streaming" alt="photo" width="820" height="700">
                <img v-if="!video_flag"  :src="'http://192.168.10.186:9090/static/' + form.img"  alt="photo" width="820" height="700" />
            </div>

            <div id="fruit-info">
                <table class="tab-info"  cellspacing="0" >
                    <tr>
                        <td class="info-label">种类</td>
                        <td><div class="info-val">{{form.type}}</div></td>
                    </tr>
                    <tr>
                        <td class="info-label">重量</td>
                        <td><div class="info-val">{{form.weight / 500}} <span>斤</span> </div></td>
                    </tr>
                    <tr>
                        <td class="info-label">单价</td>
                        <td><div class="info-val">{{form.place}} <span>元/斤</span></div></td>
                    </tr>
                </table>
            </div>

            <div id="bottom-part">
                <el-button class="shopping">
                    <router-link id="shopping-car" to="/paypage">
                        <el-icon size="40px"><ShoppingCartFull /></el-icon>
                        <span class="shopping-num">{{listenShoppingNum}}</span>
                    </router-link>
                </el-button>
                <el-button class="opt" type="danger" @click="startComput">开始称重</el-button>
                <el-button class="opt" type="warning" @click="addShoppingNum">加入购物车</el-button>
                <!-- <el-button class="opt" type="warning">
                    <router-link to="/paypage">结算</router-link>
                </el-button> -->
            </div>
        </el-col>
    </el-row>
</template>

<script>
import services from "@/api/services"
import { ElMessage,ElMessageBox } from 'element-plus'
export default {
    name:'WeightLayout',
    data(){
        return {
            form:{
                type:'无',
                weight:0,
                place:0,
                img:"handle-5551.png"
            },
            video_flag:true,
            userAction:false,
            shoppingNum:0,
            types:[["苹果",4],["香蕉",5]],
            fruitSet:["梨子","葡萄","黄瓜","香蕉","芒果"],
            fruitPlaceSet:["1","2","3","4","5"]
        }
    },
    computed:{
        listenShoppingNum(){
            return this.$store.getters.getShoppingNum
        }
    },
    mounted(){

    },
    methods:{
        async startComput(){

            let result = null,img = null

            ElMessageBox.confirm(
                "确认水果位置摆放正确，开始称重吗？",
                "Warning",
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            ).then(() => {
                this.userAction = false
            }).catch(()=>{
                // 取消称重
                console.log("取消称重...........")
                ElMessage({
                    message: '称重取消',
                    type: 'error',
                    offset:990
                    // appendTo:'#bottom-part'
                })
                this.userAction = true
            })            

            // 对购物车list添加一条数据
            console.log("开始称重...........")
            // 发送请求，获取类别，单价，重量
            result  = await services.hx711()
            img = await services.pic()
            console.log(img)
            if(!this.userAction){
                this.form.img = img.img_name
                this.form.weight = result.weight < 10 ? 0 : result.weight
                this.form.type = this.fruitSet[img.fruit_type[0].id]
                this.form.place = this.fruitPlaceSet[img.fruit_type[0].id]
                
                ElMessage({
                    message: '称重成功',
                    type: 'success',
                    offset:990
                    // appendTo:'#bottom-part'
                })

                this.video_flag = false
            }


            // 拍到的图片显示2秒
            // setTimeout(() => {
            //     this.video_flag = true
            // }, 2000);
        },
        addShoppingNum(){
            console.log(this.form)
            // 没有称重，无法加入购物车
            if(this.form.weight == 0){
                ElMessage({
                    message: '没有称重，无法加入购物车',
                    type: 'error',
                    offset:990
                    // appendTo:'#bottom-part'
                })
                return
            }

            setTimeout(() => {
                ElMessage({
                    message: '添加购物车成功',
                    type: 'success',
                    offset:990
                    // appendTo:'#bottom-part'
                })
                this.video_flag = true
            }, 500);
            // 向购物车添加记录
            let carItem = {
                "type":this.form.type,
                "weight":this.form.weight / 500,
                "place":this.form.place,
                "photo":this.form.img,
                "total":(this.form.weight / 500) * this.form.place
            }
            this.$store.commit("addShoppingList",carItem)

            this.$store.state.weights.shoppingWeight += this.form.weight
            // 改变购物车数量
            this.$store.commit("changeShopping",1)
        }
    }
}
</script>

<style scoped>
/* #photo-part{

} */

#fruit-info{
    width: 70%;
    /* border: 1px solid #ccc; */
    height: 300px;
    font-size: 36px;
    margin: 20px auto;
}

#fruit-info .tab-info{
    width: 100%;
}
#fruit-info .tab-info .info-val{
    background-color: #fff;
    border-radius: 10px;
}

#fruit-info .info-label{
    width:100px;
    height: 72px;
}

#bottom-part{
    width: 70%;
    margin: 0 auto;
    font-size: inherit;
}

#bottom-part .opt{
    height: 50px;
    width: 230px;
    font-size: 26px;
}
#bottom-part .shopping{
    position: relative;
    height: 50px;
    width: 66px;
}
.shopping-num{
    position: absolute;
    width: 24px; height: 24px;
    line-height: 24px;
    background-color: #f56c6c;
    border-radius: 14px;
    color: #fff;
    top: -14px;
    right: 0px;
}

#shopping-car{
    color: #b5b5b5;
}


</style>