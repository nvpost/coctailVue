import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const Filters = new Vuex.Store({
    state: {
        filters:{
            tags:[],
            tools:[],
            ings:[]
          }
    },
    getters: {
        get_fiters(state){
            return state.filters
        }
    },
    actions: {
        addTag(context, tag, field){
            console.log('vuex')
            context.commit('add_tag', tag, field)
        }
    },
    mutations: {
        add_tag(state, tag, field){
            console.log(state, tag, field)
        }
    }
})