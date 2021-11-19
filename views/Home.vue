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
        :coctailSet="coctailSetFoo((currentPage-1)*pageStep, currentPage*pageStep)"
      ></Cards>
      <Pagination
        @setPage='setPage'
      >  
      
      </Pagination>  


  </div>
</template>

<script>

import ColapseFilters from '../components/colapseFilters.vue'
import M from 'materialize-css'

import Cards from '../components/Cards'
import Pagination from '../components/Pagination'


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
    currentPage: 1

  }),

  
  created(){

    this.tagsData = this.$store.state.tags
    this.ingsData = this.$store.state.ings
    this.toolsData = this.$store.state.tools

    this.coctailData = this.$store.state.coctails

    this.currentPage = this.$store.state.currentPage

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
    },
    setPage(page_num){
      this.currentPage = page_num  
    }
  }
};
</script>
