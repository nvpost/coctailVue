<template>
    <div class="pagintaion_field">
         <ul class="pagination">
             
            <li 
            :class="(currentPage)>1?'waves-effect':'disabled'"
            >
                <a href="#!"
                    @click="currentPage>0?currentPage--:false"
                ><i class="material-icons">chevron_left</i></a>
            </li>
            <li v-for="(i, idx) in rangeForPagination(currentPage)" 
            :key="idx"
            :class="(i)==currentPage?'active':'waves-effect'"
            >
                <a
                @click="setPage(i, idx)"
                >{{i}}</a>
            </li>

            <li class="waves-effect">
                <a href="#!"
                @click="currentPage<pagesCount()?currentPage++:false"
                >
                    <i class="material-icons">chevron_right</i></a>
            </li>
        </ul>
        <span>
             Показано с {{(currentPage-1)*pageStep + 1}} по {{(currentPage)*pageStep}} из {{this.$store.state.filtered_coctails.length}} 
             (всего страниц {{pagesCount()}})
        </span>   

    </div>
</template>

<script>
export default {
    name: 'Pagination',
    data: () => ({
            filteredCount: 0,
            pageStep: 0,
            currentPage: 1,
    }),
    created(){
        this.filteredCount = this.$store.state.filtered_coctails.length
        this.pageStep = this.$store.state.pageStep
        this.currentPage = this.$store.state.currentPage
    },
    methods:{
        pagesCount(){
        
           return Math.ceil(this.$store.state.filtered_coctails.length/this.pageStep)
        },
        setPage(i, idx){
            console.log(i, idx)
            this.$store.state.currentPage = i
            this.currentPage = i
            this.$emit('setPage', i)
        },
        rangeForPagination(currentPage){
            let start
            let stop
            let pageCount = this.pagesCount()
            if(currentPage<4){
                start = 1
                stop = pageCount>7?7:pageCount
            }else{
                let plus3 = currentPage+3
                start = currentPage-3
                stop =  plus3 < pageCount ? plus3 : pageCount
            }

            let arr = []
            for(let i=start; i<=stop; i++){
                arr.push(i)
            }
            return arr
        }
    }
    // props:{
    //     itemCount: number,
    //     pageStep: number,
    // }
}
</script>