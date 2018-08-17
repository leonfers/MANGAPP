<template>
  <div class="NovoAnuncio">
    <div class="container">
        <h2 class="subtitle is-4">Novo Anuncio</h2>
        <section class="backbox hero is-fullheight is-medium">

            <div class="field">
  <label class="label">Titulo</label>
  <div class="control">
    <input class="input" type="text" placeholder="Titulo do manga" v-model="anuncio.titulo">
  </div>
</div>

<div class="field">
  <label class="label">Valor</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="number" placeholder="Valor em mangacoins" value="0" v-model="anuncio.valor">
  </div>
  
</div>

<div class="field">
  <div class="control">
    <label class="checkbox">
      <input type="checkbox"  v-model="anuncio.status">
     <p> Este anuncio esta ativo?</p>
    </label>
  </div>
</div>

<div class="field">
  <label class="label">Descrição</label>
  <div class="control">
    <textarea class="textarea" placeholder="Textarea"  v-model="anuncio.descricao"></textarea>
  </div>
</div>



<div class="field">
  <label class="label">Manga</label>
  <div class="control">
    <div class="select" >
      <select v-model="anuncio.manga" >
        <option  :value="manga.id" :key="manga.id" v-for="manga of mangas">{{ manga.serie.titulo }} - {{ manga.volume }}</option>
      </select>
    </div>
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-link" v-on:click="handleSubmit">Submit</button>
  </div>
  <div class="control">
    <router-link to="Anuncios"><button class="button is-text">Cancel</button></router-link>
  </div>
</div>

<article  v-if="messages && messages.length>0" class="message is-success">
  <div class="message-header">
    <p>Sucesso</p>
  </div>
  <div class="message-body" :key="message" v-for="message of messages">
    {{message}}
  </div>
</article>

<article  v-if="errors && errors.length>0" class="message is-danger">
  <div class="message-header">
    <p>Errors</p>
  </div>
  <div class="message-body" :key="error.response.data.messages.message" v-for="error of errors">
    {{error.response.data.messages[0].message}}
  </div>
</article>
        
  </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "NovoAnuncio",
  data: () => ({
    anuncio: {
    titulo: null,
    valor: null,
    descricao: null,
    status: true,
    manga: null,
    },
    mangas:[],
    errors:[],
    messages:[],
  }),

  methods: {
    handleSubmit() {

     this.anuncio.manga = process.env.API+'mangas/'+this.anuncio.manga+'/';
     axios
        .post(process.env.API + "anuncios/", this.anuncio,{
          headers: { "content-type": "application/json", "Authorization" : "Bearer " + JSON.parse(this.$cookie.get("user-token")).access}
        })
        .then(
          result => {
            this.messages.push('Anuncio enviado com sucesso');
          },
          error => {
             console.error(error);
             this.error.push(error);
              if(error.response.status == 401){
                this.redirectToLogin();
              }
          }
        );
    },
  initMangas(){
      axios
          .get(process.env.API + "mangas/", {
            headers: { "content-type": "application/json" , "Authorization" : "Bearer " + JSON.parse(this.$cookie.get("user-token")).access}
          })
          .then(
            result => {
              this.mangas = result.data;
              this.mangas.forEach(element => {

        axios
          .get(element.serie, {
            headers: { "content-type": "application/json" , "Authorization" : "Bearer " + JSON.parse(this.$cookie.get("user-token")).access}
          })
          .then(
            result => {
              element.serie = result.data;
              console.log(element.serie.title);
            },
            error => {
              console.error(error);
              if(error.response.status == '401'){
                this.redirectToLogin();
              }
            }
          );
        
      });
            },
            error => {
              console.error(error);
              if(error.response.status == '401'){
                this.redirectToLogin();
              }
            }
          );      
      }
  },
    created() {
    this.initMangas();
    }
  }
</script>


<style lang="sass" scoped>
@import '../mq'
.backbox
  background-color: #ffffff
  a:hover
    color: gray

</style>
