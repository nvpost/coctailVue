<template>
  <div>

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <div>
      Найдено: {{ $store.state.coctails.length }}
    </div>  
      <ColapseFilters
        :tags="tagsData"
        :ings="ingsData"
        :tools="toolsData"
      ></ColapseFilters>
        
      <Cards
        :coctailSet="coctailSetFoo(0, pageStep)"
      ></Cards>
      <Pagination>  
      
      </Pagination>  


  </div>
</template>

<script>
//localStorage.removeItem('cApp_ings')
//import TagsList from './components/TagsList';
import ColapseFilters from '../components/colapseFilters.vue'
import M from 'materialize-css'

import Cards from '../components/Cards'
import Pagination from '../components/Pagination'

// import {tags} from '../data/tags'
// import {tools} from '../data/tools'
// import {ings} from '../data/ingredients'
// import {coctails} from '../data/coctails'

export default {
  name: 'App',

  components: {
    ColapseFilters,
    Cards,
    Pagination
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

    // this.tagsData = this.$store.getters.get_tags
    // this.ingsData = this.$store.getters.get_ings
    // this.toolsData = this.$store.getters.get_tools

    this.tagsData = this.$store.state.tags
    this.ingsData = this.$store.state.ings
    this.toolsData = this.$store.state.tools

    this.coctailData = this.$store.state.coctails

    // this.filtered_coctail_count = this.$store.getters.get_filtered_coctails


  },


  methods:{

    coctailSetFoo(start, step){
      let  coctailsCatalog = this.$store.state.coctails
      return coctailsCatalog.slice(start, step)
    },

    removeLocalItems(){
      localStorage.removeItem('cApp_tags')
      localStorage.removeItem('cApp_ings')
      localStorage.removeItem('cApp_tools')
    }
  }
};
</script>
