<template>
  <div class="modal-content">
    <form class="b-project">
      <div class="b-columns">
        <div class="b-left">
          <div class="b-label">
            <label for="project_name">name</label>
          </div>
          <div class="b-input">
            <input
              id="project_name"
              v-model="mutableProject.name"
              class="input"
              type="text"
              placeholder="Project Name"
              autocomplete="off">
          </div>
        </div>
        <div class="b-right">
          <div class="project__avatar">
            <img
              v-if="mutableProject.logo_url"
              :src="mutableProject.logo_url"
              width="40"
              height="40">
            <template v-else>
              <div
                class="e-empty-avatar"
                style="height: 40px; width: 40px; font-size: 17px;">
                {{ mutableProject.name | abbreviation }}
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="b-columns last">
        <slot/>
        <button
          type="button"
          class="btn btn-light-grey"
          @click="closeModal()">
          Back
        </button>
        <div
          class="btn"
          style="width: 90px;"
          @click="saveName()">
          <span class="e-text">
            Save
          </span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import {abbreviation} from '~/assets/js/filter.js'

  export default {
    filters: {
      abbreviation
    },
    props: {
      project: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        mutableProject: Object.assign({},this.project),
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      saveName() {
        this.$emit('changed', this.mutableProject.name);
      }
    },
  }
</script>
