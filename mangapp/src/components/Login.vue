<template>
  <div class="Login">
    <div class="container">
        <section class="backbox hero is-fullheight is-medium">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <article class="card is-rounded">
                <div class="card-content">
                  <p class="control has-icon">
                    <input class="input" v-model="user.username" type="email" placeholder="Email">
                    <i class="fa fa-envelope"></i>
                  </p>
                  <p class="control has-icon">
                    <input class="input" v-model="user.password" type="password" placeholder="Password">
                    <i class="fa fa-lock"></i>
                  </p>
                  <p class="control">
                    <label class="checkbox">
                      <input type="checkbox">
                      Remember me
                    </label>
                  </p>
                  <p class="control">
                    <button type="submit" v-on:click="handleSubmit" class="button is-primary is-medium is-fullwidth">
                      <i class="fa fa-user"></i>
                      Login
                    </button>
                  </p>
                </div>
              </article>
            </div>
          </div>
    </div>
  </section>

<p>{{ response.access }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
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
  background-color: #383838
  a:hover
    color: gray

</style>
