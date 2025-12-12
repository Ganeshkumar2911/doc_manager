<template>
    <v-snackbar
        v-model="snackbar.show"
        :timeout="3000"
        :color="snackbar.color"
        location="top end"
        variant="elevated"
    >
        {{ snackbar.message }}
        <template v-slot:actions>
            <v-btn
                variant="text"
                @click="closeSnackbar"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Snackbar',
    computed: {
        ...mapGetters('snackbar', ['snackbar'])
    },
    methods: {
        closeSnackbar() {
            this.$store.dispatch('snackbar/closeSnackbar');
        }
    }
}
</script>
