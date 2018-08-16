<template>
  <div id="app">
    <div class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">Mangapp</router-link>

          <span class="navbar-burger" v-on:click="toggleNav" v-bind:class="{ 'is-active': isActive }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>

        <div class="navbar-end navbar-menu" v-bind:class="{ 'is-active': isActive }">

          <router-link to="/" class="navbar-item r-item">Home</router-link>
          <router-link to="Login" class="navbar-item r-item">Login</router-link>
          <router-link to="Anuncios" class="navbar-item r-item">Anuncios</router-link>
          <router-link to="Mangas" class="navbar-item r-item">Mangas</router-link>
          <router-link to="faq" class="navbar-item r-item">Transações</router-link>
          <router-link to="faq" class="navbar-item r-item">Perfil</router-link>
          

        </div>
      </div>
</div>

    <router-view></router-view>

    <footer class="footer is-primary">
      <div class="container">
        <div class="columns">
          <div class="column">
            <p>And this right here is a spiffy footer, where you can put stuff.</p>
          </div>
          <div class="column has-text-right">
            <a class="icon" href="#"><i class="fa fa-facebook"></i></a>
            <a class="icon" href="#"><i class="fa fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleNav: function() {
      this.isActive = !this.isActive;
    }
  }
}
</script>

<style lang="sass">
@import '../node_modules/bulma/bulma.sass'
@import 'mq'
.navbar
  background-color: #383838
  a:hover
    color: gray

.navbar-brand a 
  color: #fff
  font-weight: bold

a.r-item
  color:#C1C1C1
  padding: 0.5rem 1.75rem
  +mobile
    color: gray
    &:hover
      background-color: #F1F1F1


.navbar-burger
  &:hover
    background-color: #F1F1F1
  span
    background-color: #C1C1C1

</style>