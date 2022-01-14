import Vue from 'vue'
import Vuex from 'vuex'

import {coctails} from '../data/coctails'

Vue.use(Vuex)


let stateTemplate = {
  filters:{
      tags:[],
      tools:[],
      ings:[],
    },
    set_len: 0,
    origin_tags: {},
    origin_tools: {},
    origin_ings: {},

    tags: {},
    tools: {},
    ings: {},
    flag_and: false, // for multiply select
    coctails: coctails,
    filtered_coctails: {},
    filtered_coctail_idx: [],
    flatten_c_id:[],
    pageStep: 10,
    currentPage: 1
  }

export default new Vuex.Store({
  state: stateTemplate,
    getters: {
        // get_fiters(state){
        //     return state.filters
        // },
        // get_tags(state){
        //   return state.tags
        // },
        // get_tools(state){
        //   return state.tools
        // },
        // get_ings(state){
        //   return state.ings
        // },
        // get_coctails(state){
        //   return state.coctails
        // },
        // get_filtered_coctails(state){
        //   return state.coctails.length
        // },
    },
    actions: {
        get_coctail_from_id(context, id){

          let coctails = context.state.coctails
          let coctail = coctails.filter(i=>{
            return i.id == id 
          })
          return coctail
        }


    },
    mutations: {
        add_tag(state, payload){
          let field = payload.field
          let tag = payload.tag
          let idx = state.filters[field].indexOf(tag)

          
          if(idx==-1){
            state.filters[field].push(tag)
            //console.log(state.filters[field])
            this.commit('filter_coctail')
            console.log('нажали')
            // console.log(state.filters[field])
            // console.log(state.tags.tags)
            return
          }else{
            //Отжатие комититися в activeTags
            
            // state.filters[field].splice(idx, 1)
            // //console.log(state.filters[field])
            
            // state.filtered_coctail_idx = ""
            // console.log('отжали')
            // this.commit('filter_coctail')
            // console.log(state.filters[field])
            // console.log(state.tags.tags)
          }
        },


        filter_coctail(state){ 



          let filters = state.filters
          let coctails = state.coctails
          let filtered_coctails = {}
          let filtered_ids = []


          // если фильтры пустые обновляем значения фильтрованых коктлей на все
          let reload_counter = 0
          Object.keys(filters).forEach(i=>{
            reload_counter += filters[i].length
            
          })
          if(reload_counter == 0){
            state.filtered_coctails=state.coctails
            state.filtered_coctail_idx=[]
            this.commit('uniqAndCount', {obj:state.tags_origin, fieldName:'tag', title:'Категории', model:'tags'})
            this.commit('uniqAndCount', {obj:state.ings_origin, fieldName:'ingredient', title:'Ингредиенты', model:'ings'})
            this.commit('uniqAndCount', {obj:state.tools_origin, fieldName:'name', title:'Штуки', model:'tools'})

            return state.filtered_coctails
          }


          // console.log(filters)
          let tagsName = {
            'tags': 'tag',
            'ings': 'ingredient',
            'tools': 'name'
          }

          for(let filter in filters){
            
            let filterName = tagsName[filter]

            if(filters[filter].length>0){
              let line_filtered_idx = []
              let origin_tags = state[filter+"_origin"]
              for(let filter_item in filters[filter]){
                line_filtered_idx = []
                let fi = filters[filter][filter_item]
                

                for (let otr in origin_tags){ //otr - origin tag row
                  let c_id = origin_tags[otr]['coctail_id']
                  
                  if(origin_tags[otr][filterName] == fi){
                    // console.log('совпадение')
                    line_filtered_idx.push(c_id)
                  }
                }

              }
              if(state.filtered_coctail_idx.length==0){
                state.filtered_coctail_idx = line_filtered_idx
                filtered_ids = line_filtered_idx
              }else{
                // console.log('пересечение')
                state.filtered_coctail_idx = state.filtered_coctail_idx.filter(x => line_filtered_idx.includes(x));
                filtered_ids = line_filtered_idx.filter(x => line_filtered_idx.includes(x))
              }
            }
          }
          // console.log(filtered_ids)
          // console.log(state.filtered_coctail_idx)
          // filtered_coctails = coctails.filter(x=>state.filtered_coctail_idx.includes(x.coctail_id))
          filtered_coctails = coctails.filter(x=>filtered_ids.includes(x.coctail_id))

          
          this.commit('uniqAndCount', {obj:state.tags_origin, fieldName:'tag', title:'Категории', model:'tags'}, filtered_ids)
          this.commit('uniqAndCount', {obj:state.ings_origin, fieldName:'ingredient', title:'Ингредиенты', model:'ings'}, filtered_ids)
          this.commit('uniqAndCount', {obj:state.tools_origin, fieldName:'name', title:'Штуки', model:'tools'}, filtered_ids)



          state.filtered_coctails = filtered_coctails

          console.log(state.filters.tags)
          
          return state.filtered_coctails
        },

        stateRestart(state) {
          
          state = stateTemplate
          console.log(state)
        },
        
        uniqAndCount(state, paylod){
          // console.log('uniqAndCount')
          // console.log(paylod)
          let obj = paylod.obj
          let fieldName = paylod.fieldName
          let model = paylod.model
          // if('f_idx' in paylod){
          //   f_idx = paylod.f_idx
          //   console.log('yes f_idx')
          // }else{
          //   console.log('no f_idx')
          //   // f_idx = []
          // }

          // paylod.f_idx?f_idx = paylod.f_idx: []

          let namedArr = localStorage.getItem('cApp_'+model)
          state[model+'_origin'] = obj

          // console.log(state.filtered_coctail_idx) 

          if(state.filtered_coctail_idx.length>0){
            let set = obj.filter(i=> state.filtered_coctail_idx.includes(i.coctail_id) )
            obj=set
          }
          // if(f_idx.length>0){
          //   let set = obj.filter(i=> f_idx.includes(i.coctail_id) )
          //   obj=set
          // }

          const unique = [...new Set(obj.map(item => item[fieldName]))];

          // console.log(model, unique.length)
          let uniqueAndCountArr = []
          unique.forEach((i)=>{
              let count = obj.filter((item)=>{
                  return item[fieldName] == i
              }).length
              uniqueAndCountArr.push({'tag':i, 'count':count})
          })
          uniqueAndCountArr.sort((min, max) => max.count - min.count);
          
          namedArr = {'title': paylod.title, 'model': model, tags:uniqueAndCountArr}
          // localStorage.setItem('cApp_'+model, JSON.stringify(namedArr))

          state[model] = namedArr
          // console.log(model, namedArr.tags)
          return true
      },
    }
})
