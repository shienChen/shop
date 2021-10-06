import axios from "axios"
import { nanoid } from "nanoid"

export default {
    namespaced:true,
    actions:{
         addPersonWang(context,value){
             if(value.name.indexOf('王') === 0){
                context.commit('ADD_PERSON',value)
             }else{
                 alert('输入必须是姓王的')
             }
         },
         addPersonServer(context){
             axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                 Response =>{
                    context.commit('ADD_PERSON',{id:nanoid(),name:Response.data})
                 },
                 error =>{
                     return error.message
                 }
             )
         }
    },
    
    mutations:{
        ADD_PERSON(state,value){
            console.log('mutations中的ADD_PERSON被调用了')
            state.personList.unshift(value) 
            console.log(state.personList)
        }
    }, 

    state:{
        personList:[
            {id:'001',name:'张三'}
        ]
    },

    
    getters:{
        firstPersonName(state){
            return state.personList[0].name
        }
    }  
}