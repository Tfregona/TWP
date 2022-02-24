<template>
  <div>
    <div id="edit">
      <div id="com-space"></div>
      <div>
        <button class="btn btn-secondary" v-on:click="editPo()">Update</button>
        <label>Title</label>
        <input type="text" v-model="formEd.title"/>
      </div>
      <div>
        <label>Description</label>
        <input type="text" v-model="formEd.content"/>
      </div>
      <div>
        <label>Categories</label>
        <select v-model="formEd.categories">
        <option v-bind:value="categorie.id" v-for="categorie in categories" v-bind:key="categorie.id">{{categorie.name}}</option>
      </select>
      </div>
    </div>
  </div>
</template>

<script>
import WPapi from '@/apis/WPapi.js'

export default {
  props: [
    'idedit'
  ],
  data() {
    return {
      categories:[],
      formEd: {
        title: '',
        content: '',
        categories: ''
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
      WPapi.editPo(this.idedit, this.formEd)
      .then(function( response ){
        console.log(response)
      }.bind(this));
    }
  }
}
</script>

<style scoped>
#edit {
    font-weight: bold;
    margin-bottom: 2px;
}
#edit label {
    width: 90px;
}
#com-space {
    height: 5px;
    width: 100%;
    margin: auto;
    margin-bottom: 0.5em;
    background-color: rgb(87, 87, 87);
    border-radius: 5px;
}
</style>