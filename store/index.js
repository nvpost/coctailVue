import Vue from 'vue'
import Vuex from 'vuex'

import {coctails} from '../data/coctails'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filters:{
        tags:[],
        tools:[],
        ings:[],
        set_len: 0,


      },
      tags: {},
      tools: {},
      ings: {},
      coctails: coctails,
      pageStep: 10,
    },
    getters: {
        get_fiters(state){
            return state.filters
        },
        get_tags(state){
          return state.tags
        },
        get_tools(state){
          return state.tools
        },
        get_ings(state){
          return state.ings
        },
        get_coctails(state){
          return state.coctails
        
        }
    },
    actions: {
        // addTag(context, tag, field){
        //     console.log('vuex')
        //     context.commit('add_tag', tag, field)
        // }
        get_coctail_from_id(context, id){
          // console.log('sdfsd')
          // console.log(id)
          let coctails = context.state.coctails
          let coctail = coctails.filter(i=>{
            return i.id == id 
          })
          console.log(coctail)
          return coctail
        }
    },
    mutations: {
        add_tag(state, payload){
          let field = payload.field
          let tag = payload.tag
          state.filters[field].push(tag)

        },
        

        uniqAndCount(state, paylod){
          // let namedArr
          // console.log(paylod)
          let obj = paylod.obj
          let fieldName = paylod.fieldName
          let model = paylod.model

          let namedArr = localStorage.getItem('cApp_'+model)

          if(namedArr){
            let jsArr = JSON.parse(namedArr)
            state[model] = jsArr
            return  JSON.parse(namedArr)
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
          
          namedArr = {'title': paylod.title, 'model': model, tags:uniqueAndCountArr}
          localStorage.setItem('cApp_'+model, JSON.stringify(namedArr))


          return(namedArr)
      },
    }
})
