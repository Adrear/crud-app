<template>
  <div class="error">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Notification',
    props: {
      message: {
        type: String,
        default: ''
      }
    }
  }
</script>
