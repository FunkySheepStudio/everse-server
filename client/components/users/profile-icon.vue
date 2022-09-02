<template>
  <section>
    <v-btn
      fab
      small
      target="_blank"
      @click="showForm = !showForm"
    >
      <v-icon
        large
      >
        mdi-account
      </v-icon>
    </v-btn>
    <v-dialog
      v-model="showForm"
      :persistent="!$store.state.auth.user"
    >
      <v-card
        v-if="$store.state.auth.user"
      >
        <v-card-title>
          Profile
        </v-card-title>
        <v-card-text>
          <profile />
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
import profile from '~/components/users/profile.vue'
export default {
  components: {
    profile
  },
  data () {
    return {
      showForm: false
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
