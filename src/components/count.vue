<template>
  <div class="count">
      <h3>计算结果为{{sum}}</h3>
      <h3>计算结果为放大十倍{{bigSum}}</h3>
      <h3>person组件的人数为： {{personList.length}}</h3>
      <select  v-model.number="n">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
      </select>
      <button @click="increment(n)">+</button>
      <button @click="decrement(n)">-</button>
      <button @click="incrementOdd(n)">当前求和为奇数再加</button>
      <button @click="incrementWait(n)">等等再加</button>
  </div>
</template>

<script> 
    import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        name:'count',
        data() {
            return { 
                n:1
            }
        },
        computed:{
            // ...mapState({sum:'sum'})
            ...mapState('countAbout',['sum']),

            // ...mapGetters({bigSum:'bigSum'})
            ...mapGetters('countAbout',['bigSum']),

            ...mapState('personAbout',['personList']),
 
        },
        methods:{
            // increment(){
            //      this.$store.commit('JIA',this.n)
            // },
            // decrement(){
            //      this.$store.commit('JIAN',this.n)
            // },

            ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),

            // incrementOdd(){
            //      this.$store.dispatch('jiaOdd',this.n)
            // },
            // incrementWait(){
            //    this.$store.dispatch('jiaWait',this.n)
            // } 

            ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
        }, 
    }
</script>

<style>
    button{
        margin-left: 10px;
    }
</style>