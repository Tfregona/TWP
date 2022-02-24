// Edit Cat
<template>
    <div id="bg">
        <div class="edit">
            <input type="text" placeholder="Nouveau nom" v-model="formEd.name"/>
            <button class="btn btn-secondary" v-on:click="editPo()">✒️</button>
        </div>
    </div>
</template>

<script>
import WPapi from '@/apis/WPapi.js'

export default {
    props: [
        'cat'
    ],
    data() {
      return {
        formEd: {
            name: '',
        }
      }
    },
    mounted() {
      WPapi.getcategories()
      .then(response => {
        this.categories = response.data;
      })
      .catch(error => {
      console.log('Error :', error.response)
      })
    },
    methods: {
    
    editPo(){
        WPapi.editCat(this.cat, this.formEd)
            .then(function( response ){
                console.log(response)
            }.bind(this)); 
        }
    }
}
</script>

<style scoped>

input{
    margin: auto 3mm;
    border-radius: 3px;
    border-style: none;
}
.edit {
    
    font-weight: bold;
    margin-bottom: 2px;
}
</style>