<template>
  <div>

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->

      <ColapseFilters
        :tags="tagsData"
        :ings="ingsData"
        :tools="toolsData"
      ></ColapseFilters>
        
      <Cards
        :coctailSet="coctailSetFoo(0, pageStep)"
      ></Cards>


  </div>
</template>

<script>
//localStorage.removeItem('cApp_ings')
//import TagsList from './components/TagsList';
import ColapseFilters from '../components/colapseFilters.vue'
import M from 'materialize-css'

import Cards from '../components/Cards'

import {tags} from '../data/tags'
import {tools} from '../data/tools'
import {ings} from '../data/ingredients'
// import {coctails} from '../data/coctails'

export default {
  name: 'App',

  components: {
    ColapseFilters,
    Cards
  },
  mounted () {
    M.AutoInit()
  },


  data: () => ({
    tagsData: {},
    toolsData: {},
    ingsData: {},
    coctailData: {},
    pageStep: 10,

  }),

  

  created(){

    this.$store.commit('uniqAndCount', {obj:tags, fieldName:'tag', title:'Категории', model:'tags'})
    this.$store.commit('uniqAndCount', {obj:ings, fieldName:'ingredient', title:'Ингредиенты', model:'ings'})
    this.$store.commit('uniqAndCount', {obj:tools, fieldName:'name', title:'Штуки', model:'tools'})

    
    this.tagsData = this.$store.getters.get_tags
    this.ingsData = this.$store.getters.get_ings
    this.toolsData = this.$store.getters.get_tools
    this.coctailData = this.$store.getters.get_coctails

  },
  methods:{


    // uniqAndCount(obj, fieldName, title, model){

    //     let namedArr = localStorage.getItem('cApp_'+model)
    //     console.log('cApp_'+model)
    //     if(namedArr){
    //       return( JSON.parse(namedArr))
    //     }

    //     const unique = [...new Set(obj.map(item => item[fieldName]))];
    //     let uniqueAndCountArr = []
    //     unique.forEach((i)=>{
    //         let count = obj.filter((item)=>{
    //             return item[fieldName] == i
    //         }).length
    //         uniqueAndCountArr.push({'tag':i, 'count':count})
    //     })
    //     uniqueAndCountArr.sort((min, max) => max.count - min.count);
        
    //     namedArr = {'title': title, 'model': model, tags:uniqueAndCountArr}
    //     localStorage.setItem('cApp_'+model, JSON.stringify(namedArr))
    //     console.log(JSON.stringify(namedArr))
    //     return(namedArr)
    // },
    coctailSetFoo(start, step){
      return this.coctailData.slice(start, step)
    },

    setModel(t, model){
      console.log(t, model)
    },
    removeLocalItems(){
      localStorage.removeItem('cApp_tags')
      localStorage.removeItem('cApp_ings')
      localStorage.removeItem('cApp_tools')
    }
  }
};
</script>
