<template>


<!-- 
            "valor": 50,
            "status": false,
            "descricao": "conservado",
            "manga": "http://localhost:8001/mangas/1/",
            "usuario": "http://localhost:8001/usuarios/4/"
             -->
  <div class="NovoAnuncio">
    <div class="container">
        <h2 class="subtitle is-4">Novo Anuncio</h2>
        <section class="backbox hero is-fullheight is-medium">

            <div class="field">
  <label class="label">Titulo</label>
  <div class="control">
    <input class="input" type="text" placeholder="Titulo do manga">
  </div>
</div>

<div class="field">
  <label class="label">Valor</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="number" placeholder="Valor em mangacoins" value="0">
  </div>
  
</div>

<div class="field">
  <div class="control">
    <label class="checkbox">
      <input type="checkbox">
     <p> Este anuncio esta ativo?</p>
    </label>
  </div>
</div>

<div class="field">
  <label class="label">Descrição</label>
  <div class="control">
    <textarea class="textarea" placeholder="Textarea"></textarea>
  </div>
</div>



<div class="field">
  <label class="label">Manga</label>
  <div class="control">
    <div class="select">
      <select>
        <option>manga 01</option>
        <option>manga 02</option>
      </select>
    </div>
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-link">Submit</button>
  </div>
  <div class="control">
    <button class="button is-text">Cancel</button>
  </div>
</div>
        
  </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "NovoAnuncio",
  data: () => ({
    user: {
      username: null,
      password: null
    },
    response: ""
  }),

  methods: {
    handleSubmit() {
      this.$http
        .post(process.env.API + "api/token/", this.user, {
          headers: { "content-type": "application/json" }
        })
        .then(
          result => {
            this.response = result.data;
            const token = this.response;
            this.$cookie.set("user-token", JSON.stringify(token), 1);
            console.log(JSON.parse(this.$cookie.get("user-token")).access);
          },
          error => {
            console.error(error);
            this.$cookie.delete("user-token");
          }
        );
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../mq'
.backbox
  background-color: #ffffff
  a:hover
    color: gray

</style>
