<template>
  <section class="section">

    <div
      ref="modal"
      class="modal">
      <Modal
        v-if="modal"
        :project="projects[id]"
        @close="closeModal"
        @changed="saveChanges">
        <transition name="fade">
          <Notification
            v-if="error"
            :message="error"/>
        </transition>
        {{ message }}
      </Modal>
    </div>

    <div
      v-if="isAuthenticated"
      class="container">
      <h1 class="title">Projects</h1>
      <div
        v-for="(value, key) in projects"
        :key="key"
        class="project"
        @click="openModal(value, key)">
        <div class="project__content">
          <div class="project__logo">
            <div class="project__avatar">
              <img
                v-if="value.logo_url"
                :src="value.logo_url"
                width="40"
                height="40">
              <template v-else>
                <div
                  class="e-empty-avatar"
                  style="height: 40px; width: 40px; font-size: 17px;">
                  {{ value.name | abbreviation }}
                </div>
              </template>
            </div>
          </div>
          <div class="b-name">
            <div class="e-name">{{ value.name }}</div>
          </div>
          <div class="b-status">
            <div
              :class="{ 'm-active': value.is_active}"
              class="e-status">
              {{ value.is_active | checkActive }}
            </div>
            <div
              class="e-users">
              {{ value.users | checkNumber }}
            </div>
          </div>
          <div class="b-stats">
            <div class="stats-row">
              <div class="e-titles">time this week</div>
              <div class="e-counts">{{ value.spent_time_week | formatTime }}</div>
            </div>
            <div class="stats-row">
              <div class="e-titles">this month</div>
              <div class="e-counts">{{ value.spent_time_month | formatTime }}</div>
            </div>
            <div class="stats-row">
              <div class="e-titles">total</div>
              <div class="e-counts">{{ value.spent_time_all | formatTime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {abbreviation, formatTime, checkActive, checkNumber} from '~/assets/js/filter.js'
  import Modal from '~/components/Modal'
  import Notification from '~/components/Notification'

  export default {
    components: {
      Modal,
      Notification
    },
    filters: {
      abbreviation,
      formatTime,
      checkActive,
      checkNumber
    },
    data() {
      return {
        projects: [],
        id: null,
        modal: false,
        message: '',
        error: null
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
    watch: {
      error: function (val) {
        const self = this;
        if (val !== '') setTimeout(function () {
          self.error = ''
        }, 3000)
      }
    },
    mounted() {
      if (this.isAuthenticated) {
        try {
          this.$axios({
            method: 'get',
            url: 'https://api.quwi.com/v2/projects-manage/index',
            proxyHeaders: false,
            credentials: false,
          }).then(response => {
            this.projects = response.data.projects
          });
        } catch (e) {
          this.error = e.response.data.first_errors
        }
      }
    },
    methods: {
      openModal(value, key) {
        this.id = key;
        this.$refs.modal.style.display = "block";
        this.modal = true;
        this.message = '';
      },
      closeModal() {
        this.$refs.modal.style.display = "none";
        this.modal = false;
        this.message = '';
      },
      async saveChanges(name) {
        this.message = '';
        try {
          await this.$axios({
            method: 'put',
            url: 'https://api.quwi.com/v2/projects-manage/update?id=' + this.projects[this.id].id,
            proxyHeaders: false,
            credentials: false,
            data: {
              name: name
            }
          }).then(response => {
            if (response.status == 200) {
              this.message = 'Project successfully saved';
              this.projects[this.id].name = name;
            }
          });
        } catch (e) {
          this.error = e.response.data.first_errors.name
        }
      }
    },
  }
</script>

<style>

</style>
