<template>
  <nav class="navbar is-light">
    <div class="navbar__brand">
      <nuxt-link
        class="navbar__logo"
        to="/">Q
      </nuxt-link>
    </div>
    <div class="navbar__menu">
      <div
        v-if="isAuthenticated">
        <nuxt-link
          to="/profile">
          My Profile
        </nuxt-link>
        <a
          @click="logout">
          Logout
        </a>
      </div>
      <template v-else>
        <nuxt-link
          class="navbar__item"
          to="/login">
          Log In
        </nuxt-link>
      </template>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
    methods: {
      async logout() {
        await this.$auth.logout();
      },
    },
  }
</script>
