<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
    persistent
  >
    <v-card class="rounded-lg">
      <v-card-title class="d-flex align-center pa-6 pb-4 bg-indigo">
        <v-icon
          color="warning"
          size="28"
          class="mr-3"
        >
          mdi-alert-circle-outline
        </v-icon>
        <span class="text-h6 font-weight-bold">Confirm Logout</span>
      </v-card-title>
      
      <v-card-text class="pa-6">
        <p>
          Are you sure you want to log out?
        </p>
      </v-card-text>
      
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
        
          variant="outlined"
          color="grey-darken-1"
          @click="dialog = false"
          class="text-none"
        >
          Cancel
        </v-btn>
        <v-btn
          color="error"
          variant="flat"
          @click="confirmLogout"
          class="text-none"
        >
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LogoutDialog',
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    confirmLogout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user_id");
      sessionStorage.removeItem("user_name");
      
      this.$store.dispatch("setSearchText", "");
      this.dialog = false;
      this.$router.push({ name: "Login" });
    }
  }
}
</script>

<style scoped>
</style>
