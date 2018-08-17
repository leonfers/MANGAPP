<template>
  <div class="Transacoes">
    <div class="container">
      <section class="section">
        <h1 class="title">Transações</h1>

        <h2 class="subtitle is-4">Estas são as suas transações</h2>
        <div class="columns" v-if="transacoes && transacoes.length">
          <div class="column is-one-third" v-bind:key="transacao.id" v-for="transacao of transacoes">
            <div class="card">
              <div class="card-content">
                <p class="serie">{{transacao.anuncio.titulo}} - {{transacao.anuncio.valor}}</p>
                <p class="serie">{{transacao.data}}</p>
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
  name: 'Transacoes',
  data: () => ({
    transacoes: [],
    errors:[],
  }),

  methods:{
    initTransacoes(){
      axios
          .get(process.env.API + "transacoes/", {
            headers: { "content-type": "application/json" , "Authorization" : "Bearer " + JSON.parse(this.$cookie.get("user-token")).access}
          })
          .then(
            result => {
              this.transacoes = result.data;
              this.transacoes.forEach(element => {

        axios
          .get(element.anuncio, {
            headers: { "content-type": "application/json" , "Authorization" : "Bearer " + JSON.parse(this.$cookie.get("user-token")).access}
          })
          .then(
            result => {
              element.anuncio = result.data;
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
      
      
      
      },
      redirectToLogin(){
        this.$router.push({ name: 'Login', query: { redirect: '/novo-anuncio#/Mangas' } });
      }

  },
  created() {
    this.initTransacoes();
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
