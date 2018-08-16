<template>
  <div class="Mangas">
    <div class="container">
      <section class="section">
        <h1 class="title">Mangas</h1>

        <h2 class="subtitle is-4">Estes são os seus mangas</h2>
        <router-link to="NovoManga">Novo Manga</router-link>
        <div class="columns" v-if="mangas && mangas.length">
          <div class="column is-one-third" v-bind:key="manga.id" v-for="manga of mangas">
            <div class="card">
              <div class="card-content">
                <p class="serie">{{ manga.serie.titulo }} - {{ manga.volume }}</p>
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
  name: 'Mangas',
  data: () => ({
    mangas: [],
    errors:[],
  }),

  methods:{
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
      
      
      
      },
      redirectToLogin(){
        this.$router.push({ name: 'Login', query: { redirect: '/novo-anuncio#/Mangas' } });
      }

  },
  created() {
    this.initMangas();
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
