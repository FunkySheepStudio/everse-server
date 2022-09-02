<template>
  <v-container>
    <v-tabs
      v-if="!$store.state.auth.user"
    >
      <v-tab>
        Login
      </v-tab>
      <v-tab-item>
        <v-card>
          <v-card-text>
            <login />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>
        Create Account
      </v-tab>
      <v-tab-item>
        <v-card>
          <v-card-text>
            <create />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
import login from '~/components/users/login.vue'
import create from '~/components/users/create.vue'
export default {
  components: {
    login,
    create
  },
  layout: 'login',
  data () {
    return {}
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
