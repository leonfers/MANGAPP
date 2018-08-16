<template>
  <div class="anuncios">
    <div class="container">
      <section class="section">
        <h1 class="title">Anuncios</h1>

        <h2 class="subtitle is-4">Eram estes os mangas que você queria?</h2>
        <router-link to="NovoAnuncio">Novo Anuncio</router-link>
        <div class="columns" v-if="anuncios && anuncios.length">
          <div class="column is-one-third" v-bind:key="anuncio" v-for="anuncio of anuncios">
            <div v-if="anuncio.status == true" class="card">
              <div class="card-content">
                <p class="titulo">{{ anuncio.titulo }}</p>
                <p class="valor">{{ anuncio.valor }}</p>
                <p class="descricao">{{ anuncio.descricao }}</p>
                <a class="button is-primary"> Comprar </a>
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
  }),

  created() {
    axios.get('/anuncios')
      .then(response => {
        this.anuncios = response.data;
        console.log('TESTE')
      })
      .catch(e => {
        this.errors.push(e)
      })
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
