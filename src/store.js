import {createStore} from "vuex"

const stroe = createStore({
    state: {
        shoppingNum:0,
        shoppingList:[],
        weights:{
            beforeTotal:0,
            shoppingWeight:0,
            afterTotal:0
        }
    },
    getters:{
       getShoppingNum:(state)=>{
        return state.shoppingNum
       },
       getShoppingList:(state)=>{
        return state.shoppingList
       }
    },
    mutations:{
        changeShopping(state,data){
            state.shoppingNum++
        },
        addShoppingList:(state,data)=>{
            state.shoppingList.push(data)
        }
    }
})
export default stroe