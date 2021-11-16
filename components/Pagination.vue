<template>
    <div>
         <ul class="pagination">
            <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            <li class="active"><a href="#!">1</a></li>
            <li class="waves-effect"><a href="#!">2</a></li>
            <li class="waves-effect"><a href="#!">3</a></li>
            <li class="waves-effect"><a href="#!">4</a></li>
            <li class="waves-effect"><a href="#!">5</a></li>
            <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
        </ul>
        <span>
             {{filteredCount}} ({{pagesCount()}})
        </span>    
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    data: () => ({
            filteredCount: this.$store.state.coctails.length,
            pageStep: this.$store.state.pageStep
    }),
    created(){
        console.log(this.$store.state.coctails.length)
    },
    methods:{
        pagesCount(){
           return this.filteredCount/this.pageStep
        }
    }
    // props:{
    //     itemCount: number,
    //     pageStep: number,
    // }
}
</script>