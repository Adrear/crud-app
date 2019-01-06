<template>
  <section class="section">
    <div class="container">
      <div class="login">

        <div class="login__header">
          <h1>Login</h1>
        </div>

        <form
          method="post"
          @submit.prevent="login">
          <input
            v-model="email"
            type="email"
            class="input"
            placeholder="Email"
            autocomplete="false"
            autofocus="autofocus"
            name="email">
          <input
            v-model="password"
            type="password"
            class="input"
            placeholder="Password"
            autocomplete="off"
            name="password">
          <div class="control">
            <button
              type="submit"
              class="btn">
              LOGIN
            </button>
            <transition name="fade">
              <Notification
                v-if="error"
                :message="error"/>
            </transition>
          </div>
        </form>

      </div>
    </div>
  </section>
</template>

<script>
  import Notification from '~/components/Notification'

  export default {
    middleware: 'guest',
    components: {
      Notification,
    },

    data() {
      return {
        email: '',
        password: '',
        error: null,
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      }
    },
    watch: {
      error: function (val) {
        const self = this;
        if (val !== '') setTimeout(function () {
          self.error = ''
        }, 3000)
      }
    },
    methods: {
      async login() {
        if (!this.isEmailValid()) {
          this.error = 'Invalid email';
          return;
        }

        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })

          this.$router.push('/')
        } catch (e) {
          this.error = e.response.data.first_errors.password
        }

      },
      isEmailValid() {
        return (this.email == "") ? "" : (this.reg.test(this.email)) ? true : false;
      }
    }
  }
</script>
