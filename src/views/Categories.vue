<template>
<div>
  <!-- Use pour Bg -->
  <div><Editform v-if="Editform"
  :cat="cat"/>
  </div>
  <div id="bg">
    <!-- Création de la boucle / Récupérer l'ID par la méthode déclanché par l'évent @click -->
    <div class="cat" v-for="categorie in categories" v-bind:key="categorie.id">
    <!-- Affichage des infos -->
      <span>
        <button id="btn" @click="deletecat(categorie.id)" class="btn btn-danger">🗑️</button>
        <button class="btn btn-secondary" @click="openEdit(categorie.id)">Update</button>
      </span>

      <p class="text"><strong>{{categorie.name}}</strong></p>

      <div class="posts">
        <Posts :cat ="categorie.id"/>
      </div>
    </div>
    
    <div class="cat">
      <label><strong>New category</strong></label>
      <br>
        <input type="text" v-model="formCa.name" placeholder="Create a category"/>
        <button class="btn btn-secondary" v-on:click="createCa()">➕</button>
    </div>
  </div>
</div>
</template>

<script>

  // Import de l'API
  import WPapi from '@/apis/WPapi.js'
  import Posts from '@/components/Posts.vue'
  import Editform from '@/components/EditCat.vue'
  export default {

    components: {
      Posts,
      Editform,
    },

    props: [

    ],
    data() {
      return {
        Editform: false,
        categories: [], // Affiche les infos du array notes
        cat: '', // Id catégorie
        test: '',
        formCa: {
          name: ''
        }
      }
    },

    // Api Get
    mounted() {
      WPapi.getcategories()
      .then(response => {
        this.categories = response.data
        
      })
      .catch(error => {
      console.log('Error :', error.response)
      })
    },
    methods: {
      createCa(){
            WPapi.createCa(this.formCa)
                .then(function( response ){
                console.log(response)
                }.bind(this));
      },
      deletecat(id) {
        WPapi.deletecat(id)
        .then(function( response ){
          console.log(response)
        }.bind(this))
      },
    openEdit(id) {
      if (this.Editform === true) {
      this.Editform = false;
      }
      else {
      this.Editform = true;
      this.cat = id
      }
    },
    }
}
</script>

<style>
body{
background: rgb(134,135,243);
background: linear-gradient(48deg, rgba(134,135,243,1) 15%, rgba(254,134,177,1) 80%);
background-attachment: fixed;
}
#bg{
  display: flex;
  flex-wrap: wrap ;
  justify-content: center;
}
.cat {
  flex-direction: column;
  background: rgb(240, 236, 236);
  border-radius: 10px;
  width: 300px;
  min-height: 198px;
  text-align: left;
  margin: 5mm 5mm;
  padding: 3mm;
  overflow-wrap: break-word;
}
input {
  width: 50%;
  margin: 0.1em 0.1em;
}
.cat button {
  float: right;
}
</style>


