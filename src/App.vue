<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '@/components/common/Snackbar.vue';

export default {
  name: 'App',
  components: {
    Snackbar
  }
}
</script>
