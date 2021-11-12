<template>
  <div>


    <router-view/>



  </div>
</template>

<script>
//localStorage.removeItem('cApp_ings')
//import TagsList from './components/TagsList';
// import ColapseFilters from './components/colapseFilters.vue'
import M from 'materialize-css'

// import Cards from './components/Cards'

import {tags} from './data/tags'
import {tools} from './data/tools'
import {ings} from './data/ingredients'
import {coctails} from './data/coctails'

export default {
  name: 'App',

  components: {
    // ColapseFilters,
    // Cards
  },
  mounted () {
    M.AutoInit()
    
  },


  data: () => ({
    tagsData: tags,
    toolsData: tools,
    ingsData: ings,
    coctailData: coctails,
    pageStep: 10,
    filtered_coctail_count:0,

  }),
  created(){
    // this.$store.commit('AddOrigin', {obj:tags, fieldName:'tag', title:'Категории', model:'tags'})
    // this.$store.commit('AddOrigin', {obj:ings, fieldName:'ingredient', title:'Ингредиенты', model:'ings'})
    // this.$store.commit('AddOrigin', {obj:tools, fieldName:'name', title:'Штуки', model:'tools'})


    this.$store.commit('uniqAndCount', {obj:tags, fieldName:'tag', title:'Категории', model:'tags'})
    this.$store.commit('uniqAndCount', {obj:ings, fieldName:'ingredient', title:'Ингредиенты', model:'ings'})
    this.$store.commit('uniqAndCount', {obj:tools, fieldName:'name', title:'Штуки', model:'tools'})


  },

  methods:{
    coctailSetFoo(start, step){
      return this.coctailData.slice(start, step)
    },

    removeLocalItems(){
      localStorage.removeItem('cApp_tags')
      localStorage.removeItem('cApp_ings')
      localStorage.removeItem('cApp_tools')
    }
  }
};
</script>
