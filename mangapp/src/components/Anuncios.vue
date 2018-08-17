<template>
  <div class="anuncios">
    <div class="container">
      <section class="section">
        <h1 class="title">Anuncios</h1>

        <h2 class="subtitle is-4">Eram estes os mangas que você queria?</h2>
        <router-link to="NovoAnuncio">Novo Anuncio</router-link>
        <div class="columns" v-if="anuncios && anuncios.length">
          <div class="column is-one-third" v-bind:key="anuncio.id" v-for="anuncio of anuncios">
            <div class="card" v-if="anuncio.status">
              <div class="card-content">
                <p class="titulo">{{ anuncio.titulo }}</p>
                <p class="valor">{{ anuncio.valor }}</p>
                <p class="descricao">{{ anuncio.descricao }}</p>
                <a class="button is-primary" v-on:click="handleSubmit(anuncio)"> Comprar </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'anuncios',
  data: () => ({
    anuncios: [],
    errors:[],
    transacao:{
      anuncio:  null,
    }
  }),
  
  methods:{
     handleSubmit(anuncio) {

       this.transacao.anuncio = process.env.API+'anuncios/'+anuncio.id+'/';
     axios
        .post(process.env.API + "transacoes/", this.transacao,{
          headers: { "content-type": "application/json", "Authorization" : "Bearer " + JSON.parse(this.$cookie.get("user-token")).access}
        })
        .then(
          result => {
            this.messages.push('Compra efetuada');
          },
          error => {
             console.error(error);
             this.error.push(error);
              if(error.response.status == 401){
                this.redirectToLogin();
              }
          }
        );
        this.initAnuncios();
    },
    initAnuncios(){
      axios
          .get(process.env.API + "anuncios/", {
            headers: { "content-type": "application/json" , "Authorization" : "Bearer " + JSON.parse(this.$cookie.get("user-token")).access}
          })
          .then(
            result => {
              this.anuncios = result.data;
            },

            error => {
              console.error(error);
              if(error.response.status == '401'){
                this.redirectToLogin();
              }
            }
          );
      
      
      
      },
      redirectToLogin(){
        this.$router.push({ name: 'Login', query: { redirect: '/novo-anuncio#/Mangas' } });
      }

  },
  created() {
    this.initAnuncios();
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '../mq'

.pd
  padding: 2.5em 0 1.5em 0

.answer
  margin-top: 10px !important
  color: gray

.columns
  flex-wrap: wrap

</style>
