<template>
    <div>

        <div class="mychip chip"
        v-for="(t, index) in tagsData.tags"
        :class="setActiveClass(tags.model, t.tag)?'chip_active':''"
        @click="localAddTag(t.tag, tags.model)"
        :key="index"
        >
            {{t.tag}} ({{t.count}})
            <!-- <i class="no-active material-icons"
            v-if="setActiveClass(tags.model, t.tag)"
            >close
            </i> -->
        </div>

    </div>
</template>

<script>

//mybtn waves-effect waves-light btn-small

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
    updated(){
        // console.log('updated')
        // this.tagsData = this.tags
        // console.log(this.tagsData)
    },
    methods:{
        localAddTag(t, tags){
            let payload = {'tag':t, 'field':tags}
            this.$store.commit('add_tag', payload)
            this.filters = this.$store.getters.get_fiters
            // this.$emit('reloadData', 'data')
            // console.log(tags)
            this.tagsData = this.$store.getters['get_'+tags]
            // console.log(this.tagsData)
        },
        setActiveClass(model, tag){
            if(this.filters[model] && this.filters[model].indexOf(tag)!=-1){
                return true
            }
            
        }
    },




})
</script>
