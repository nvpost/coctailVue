<template>
  <div>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about/25">About</router-link>
      
    </div>
    <router-view/>

      <!-- <ColapseFilters
        :tags="uniqAndCount(tagsData, 'tag', 'Категории', 'tags')"
        :ings="uniqAndCount(ingsData, 'ingredient', 'Ингредиенты', 'ings')"
        :tools="uniqAndCount(toolsData, 'name', 'Штуки', 'tools')"
        
        @setModel="setModel"
      ></ColapseFilters>
        
      <Cards
        :coctailSet="coctailSetFoo(0, pageStep)"
      ></Cards> -->


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
import {ingredients} from './data/ingredients'
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
    ingsData: ingredients,
    coctailData: coctails,
    pageStep: 10,

  }),
  methods:{
    uniqAndCount(obj, fieldName, title, model){

        let namedArr = localStorage.getItem('cApp_'+model)
        console.log('cApp_'+model)
        if(namedArr){
          return( JSON.parse(namedArr))
        }

        const unique = [...new Set(obj.map(item => item[fieldName]))];
        let uniqueAndCountArr = []
        unique.forEach((i)=>{
            let count = obj.filter((item)=>{
                return item[fieldName] == i
            }).length
            uniqueAndCountArr.push({'tag':i, 'count':count})
        })
        uniqueAndCountArr.sort((min, max) => max.count - min.count);
        
        namedArr = {'title': title, 'model': model, tags:uniqueAndCountArr}
        localStorage.setItem('cApp_'+model, JSON.stringify(namedArr))
        console.log(JSON.stringify(namedArr))
        return(namedArr)
    },
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
