<template>
    <div>
        <div class="mychip chip"
        v-for="(t, index) in tagsData.tags"
        v-show="!setActiveClass(tags.model, t.tag)"
        @click="localAddTag(t.tag, tags.model)"
        :key="index"
        >
            {{t.tag}} <span v-if="!setActiveClass(tags.model, t.tag)">({{t.count}})</span>

        </div>

    </div>
</template>

<script>


export default({

    //        :class="setActiveClass(tags.model, t.tag)?'chip_active':''"
    name: 'TagsList',
    props:{
        tags: Object,
    },
    data: () => ({
        filters:{},
        tagsData:{},
        currentTagState:false
    }),
    created(){
        this.tagsData = this.tags
        // console.log(this.tagsData)
    },
    methods:{
        localAddTag(t, tags){
            let payload = {'tag':t, 'field':tags}
            this.$store.commit('add_tag', payload)
            this.filters = this.$store.state.filters


            this.tagsData = this.$store.getters['get_'+tags]
            this.tagsData = this.$store.state[tags]


        },
        setActiveClass(model, tag){
            this.currentTagState = false
            if(this.filters[model] && this.filters[model].indexOf(tag)!=-1){
                this.currentTagState = true
                return true
            }
            
        }
    },




})
</script>
