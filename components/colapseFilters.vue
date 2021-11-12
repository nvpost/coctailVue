<template>
   <div>
        <ul class="collapsible">
            <li>
            <div class="collapsible-header">
                <i class="material-icons">apps</i>
                {{tags.title}} (Доступно: {{$store.state.tags.tags.length}})
            </div>
            <div class="collapsible-body">
                <TagsList 
                    :tags="tags"
                />
            </div>
            </li>
            <li>
            <div class="collapsible-header">
                <i class="material-icons">blur_on</i>
                {{ings.title}} (Доступно: {{$store.state.ings.tags.length}})
            </div>
            <div class="collapsible-body">
                <TagsList 
                    :tags="ings"
                />
            </div>
            </li>
            <li>
            <div class="collapsible-header">
                <i class="material-icons">local_dining</i>
                {{tools.title}} (Доступно: {{$store.state.tools.tags.length}})
            </div>
            <div class="collapsible-body">
                <TagsList 
                    :tags="tools"
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
    }

})


</script>
