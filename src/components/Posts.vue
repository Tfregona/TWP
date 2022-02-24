// Diplay la list de note
<template>
  <!-- Use pour Bg -->
  <div id="notes">
    <!-- Création de la boucle / Récupérer l'ID par la méthode déclanché par l'évent @click -->
    
    <article v-for="post in posts" v-bind:key="post.id" >   
        <div id='post' @click="openPost(post.id)">
        <p id="text">{{post.id}} : {{post.title.rendered}}</p>
        </div>
    </article>

    <ShowPost v-if="showpost" @closePost="closePost" :pos="idpost"/>

    <input type="text" v-model="formPo.title" placeholder="Create a Post"/>
    <button class="btn btn-secondary" v-on:click="createPo()">➕</button>

  </div>

</template>

<script>

  // Import de l'API
  import WPapi from '@/apis/WPapi.js'
  import ShowPost from '@/components/ShowPost.vue'

  export default {
    props: [
        'cat'
    ],
    components: {
      ShowPost
    },
    data() {
      return {
        posts: [], //  Affiche les posts
        showpost: false,
        idpost: '',
        formPo: {
          title: '',
          status: 'publish',
          categories: this.cat
        }
      }
    },

    // Api Get
    mounted() {
      WPapi.getposts(this.cat)
      .then(response => {
        this.posts = response.data;
      })
      .catch(error => {
      console.log('Error :', error.response)
      })
    },
    methods: {
    createPo(){
        WPapi.createPo(this.formPo)
          .then(function( response ){
            //this.posts.push() <- askip ça rajouterai les éléments les un après les autres
            console.log(response)
          }.bind(this));
    },
    openPost(id) {
      this.idpost = id;
      this.showpost = true;
    },
    closePost() {
     this.pos = '';
     this.showpost = false;
     location.reload();
    }
  }
}
</script>

<style scoped>
#post{
  background: white;
  border-radius: 7px;
  margin: 1em 0;
}
#post :hover{
  cursor: pointer;
}
</style>