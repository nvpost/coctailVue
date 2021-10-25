
<template>
      <div>
          <div class="row"  v-for="(coctail, c_item) in coctailSet" :key="c_item">
              <!-- {{coctail}}
              {{coctail.name}} -->
                <div class="col s12 m7">
                <div class="card">
                    <div class="card-image">
                    <img :src="prepare_src(coctail.src)">
                    <span class="card-title">{{coctail.name}} ({{coctail.en_name}})</span>
                    </div>
                    <div class="card-content">
                    <p>{{coctail.text_info}}</p>
                    </div>
                    <div class="card-action">
                    <router-link :to="'/coctail/'+coctail.id">Подробнее</router-link>
                    </div>
                </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'Cards',
    data:()=>{
        return{

            }
    },
    props:{
        coctailSet: Array,
    },
    methods: {
        prepare_src(src){
            let imgFolderLink='https://timetodrink.ru/imgs/'
            let src_arr = src.split('/')          
            let img_link = imgFolderLink + src_arr[src_arr.length - 1]
            return img_link
        }
    },

}
</script>

<style scoped>

.card span.card-title{
    color: black;
}
.card .card-image{
    height: 300px;
    display: flex;
    justify-content: center;
    padding-top: 20px;
}
.card .card-image img{
    height: 100%;
    width: auto;
}
</style>

