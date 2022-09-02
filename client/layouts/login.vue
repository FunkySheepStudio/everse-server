<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <funkysheep-logo
        src="/img/Logo.png"
      />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      color="primary"
      height="auto"
    >
      <v-layout
        justify-center
        align-center
      >
        <v-divider
          class="mx-2"
          vertical
        />
        Funky Sheep Studio &copy; {{ new Date().getFullYear() }}
        <v-divider
          class="mx-2"
          vertical
        />
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      drawer: false,
      fixed: false,
      miniVariant: false,
      mobileMenu: false,
      title: 'Everse'
    }
  },
  mounted () {}
}
</script>
