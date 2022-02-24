// Afficher post

<template>
    <div>
        <div id="back">
            <div class="post">

                <!-- Boutton -->
                <span><button id="btn" class="btn btn-danger" @click="closePost">❌</button>
                <button id="btn" @click="deletePo(pos)" class="btn btn-danger">🗑️</button>
                <button id="btn" @click="openEdit(pos)" class="btn btn-secondary"><span v-if="showedit">Close Update</span>
                <span v-else>Update</span></button></span>
                <div>

                <!-- Elements à afficher -->
                <p><strong>{{title}}</strong></p>
                <p>{{description}}</p>
                </div>
                
                <!-- Appel Edit -->
                <EditPost v-if="showedit" :idedit='idedit'/>
                
                <div id="com-space"></div>
                <p>Commentaires :</p>
                <div>
                <span><input type="text" v-model="formc.content"/> <button @click="comment()" class="btn btn-light">Comment</button></span>
                    <span v-if="showeditC"><input type="text" v-model="formedit.content" /><button @click="submiteditC(idc)" class="btn btn-light">Edit</button></span>
                    <div id="com" v-for="com in coms" v-bind:key="com.id">
                        <a @click="deleteCo(com.id)">Delete your com</a> | <a @click="editC(com.id)">Edit your com</a>
                        <p>From : {{com.author_name}}</p>

                        <!-- V-html pour enlever les balises <p> sur le display -->
                        <p v-html="com.content.rendered"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WPapi from '@/apis/WPapi.js'
import EditPost from '@/components/EditPost.vue'

export default {
    components: {
        EditPost
    },
    props: [
        'pos'
    ],
    data() {
      return {
        description: "",
        title: "Loading ...",
        idedit: '',
        showedit: false,
        showeditC: false,
        idc: '',
        coms: [],
        formc: {
            content: '',
        },
        formedit: {
            content: '',
        }
      }
    },
    mounted() {
      WPapi.getpost(this.pos)
      .then(response => {
        this.description = response.data.content.rendered;
        this.title = response.data.title.rendered;
      })
      .catch(error => {
      console.log('Error :', error.response)
      }),
      WPapi.getcoms(this.pos)
      .then(response => {
        this.coms = response.data
      })
      .catch(error => {
      console.log('Error :', error.response)
      })
    },
    methods: {
        deletePo(id) {
        WPapi.deletePo(id)
        .then(function( response ){
            console.log(response)
        }.bind(this));
    },
    closePost() {
      this.$emit('closePost');
    },
    openEdit(id) {
      if (this.showedit === true) {
      this.showedit = false;
      }
      else {
      this.showedit = true;
      this.idedit = id
      }
    },
    comment() {
        WPapi.comment(this.pos, this.formc)
        .then(function( response ){
            console.log(response)
        }.bind(this));
    },
    deleteCo(id) {
        WPapi.deleteCo(id)
        .then(function( response ){
            console.log(response)
        }.bind(this));
    },
    editC(id) {
        this.showeditC = true;
        this.idc = id
    },
    submiteditC(id) {
        WPapi.editCo(id, this.formedit)
        .then(function( response ){
            console.log(response)
        }.bind(this));
        this.showeditC = false;
        this.idc = '';
        this.formedit= { content: ''};
    }
    }
}
</script>

<style scoped>
#back {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 0px);
    min-height: calc(100vh - 0px);
    background: rgba(0, 0, 0, 0.8);
}
.post{
  background: ivory;
  width: 80%;
  max-height: 600px;
  padding: 10px;
  margin: 10px 0;
  overflow-y: scroll;
}
#btn{
margin: -5px 5px ;
margin-left: auto;
}
#com-space {
    height: 5px;
    width: 100%;
    margin: auto;
    background-color: rgb(87, 87, 87);
    border-radius: 5px;
}
#com {
    background: grey;
    margin: 0.5em;
    border-radius: 5px;
    color: rgb(224, 224, 224);
    padding: 5px;
}
#com a {
    color: ivory;
    cursor: pointer;
    text-decoration: underline;
}
</style>