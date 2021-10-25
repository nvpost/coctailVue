<template>
    <div>
        
  {{ this.$route.params.id  }}
    </div>
</template>



<script>

export default({
    name:"Coctail",
    // data:()=>{
        
    // },
    created(){
        this.$store.dispatch('get_coctail_from_id', this.$route.params.id)
        
    }
})
</script>
