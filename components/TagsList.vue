<template>
    <div>
        <div class="mychip chip"
        v-for="(t, index) in tagsData.tags"
        :class="setActiveClass(tags.model, t.tag)?'chip_active':''"
        @click="localAddTag(t.tag, tags.model)"
        :key="index"
        >
            {{t.tag}} <span v-if="!setActiveClass(tags.model, t.tag)">({{t.count}})</span>

        </div>

    </div>
</template>

<script>


export default({
    name: 'TagsList',
    props:{
        tags: Object,
    },
    data: () => ({
        filters:{},
        tagsData:{},
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
            if(this.filters[model] && this.filters[model].indexOf(tag)!=-1){
                return true
            }
            
        }
    },




})
</script>
