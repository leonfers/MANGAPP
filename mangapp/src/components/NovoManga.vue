<template>

  <div class="NovoManga">
    <div class="container">
        <h2 class="subtitle is-4">Novo Manga</h2>
        <section class="backbox hero is-medium">

<div class="field">
  <label class="label">Serie</label>
  <div class="control">
    <div class="select">
      <select v-model="manga.serie" >
        <option  :value="serie.id" :key="serie.id" v-for="serie of series">{{ serie.titulo }} - {{ serie.ano }}</option>
      </select>
    </div>
  </div>
</div>

<div class="field">
  <label class="label">Volume</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="number" placeholder="Valor em mangacoins" value="0"  v-model = "manga.volume" >
  </div>
</div>

<div class="field">
  <label class="label">Nota</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="number" placeholder="Avalie este manga" min="0" max="5" value="3"  v-model = "manga.avaliacao" >
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-link" v-on:click="handleSubmit">Submit</button>
  </div>
  <div class="control">
    <router-link to="Mangas"><button class="button is-text">Cancel</button></router-link>
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
  name: "NovoManga",
  data: () => ({
    manga: {
      serie: null,
      volume: null,
      avalicao: null
    },
    series:[],
    errors:[],
    messages:[],
  }),

  methods: {
    handleSubmit() {

     this.manga.serie = process.env.API+'series/'+this.manga.serie+'/';
     axios
        .post(process.env.API + "mangas/", this.manga,{
          headers: { "content-type": "application/json", "Authorization" : "Bearer " + JSON.parse(this.$cookie.get("user-token")).access}
        })
        .then(
          result => {
            this.messages.push('Manga enviado com sucesso');
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
  initSeries(){
        axios
          .get(process.env.API+'series/', {
            headers: { "content-type": "application/json" , "Authorization" : "Bearer " + JSON.parse(this.$cookie.get("user-token")).access}
          })
          .then(
            result => {
              this.series = result.data;
              console.log(series)
            },
            error => {
              this.errors.push(error);
              console.log(error);
            }
          );
      }
  },
    created() {
    this.initSeries();
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
