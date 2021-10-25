<template>
   <div>
        <ul class="collapsible">
            <li>
            <div class="collapsible-header">
                <i class="material-icons">apps</i>
                {{tags.title}}
            </div>
            <div class="collapsible-body">
                <TagsList 
                    :tags="tags"
                    @addTag="addTag"
                />
            </div>
            </li>
            <li>
            <div class="collapsible-header">
                <i class="material-icons">blur_on</i>
                {{ings.title}}
            </div>
            <div class="collapsible-body">

                <TagsList 
                    :tags="ings"
                    @addTag="addTag"
                />
            </div>
            </li>
            <li>
            <div class="collapsible-header">
                <i class="material-icons">local_dining</i>
                {{tools.title}}
            </div>
            <div class="collapsible-body">
                <TagsList 
                    :tags="tools"
                    @addTag="addTag"
                />
            </div>
            </li>
        </ul>
    </div> 

</template>

<script>
import TagsList from './TagsList';

export default({
    name: 'ColapseFilters',
    components: {
        TagsList
    },
    props: {
        tags: Object,
        tools: Object,
        ings: Object
    },
    methods:{
        addTag(t, tags){
            this.$emit('setModel', t, tags)
        }
    }

})


</script>
