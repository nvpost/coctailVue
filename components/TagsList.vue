<template>
    <div>
        <div class="mychip chip"
        v-for="(t, index) in tags.tags"
        :class="setActiveClass(tags.model, t.tag)?'chip_active':''"
        @click="localAddTag(t.tag, tags.model)"
        :key="index"
        >
            {{t.tag}} ({{t.count}})
            <i class="close material-icons"
            v-if="setActiveClass(tags.model, t.tag)"
            >close
            </i>
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
        filters:{}
    }),
    methods:{
        localAddTag(t, tags){
            let payload = {'tag':t, 'field':tags}
            this.$store.commit('add_tag', payload)
 

            this.filters = this.$store.getters.get_fiters
            console.log(this.filters)
        },
        setActiveClass(model, tag){
            if(this.filters[model] && this.filters[model].indexOf(tag)!=-1){
                return true
                // if(this.filters[model].indexOf(tag)!=-1){
                //     return true
                // }
            }
            
        }
    },




})
</script>
