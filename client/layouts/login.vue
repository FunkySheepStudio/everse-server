<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <funkysheep-logo
        src="/img/Logo.png"
      />
      <v-spacer />
      <v-divider
        class="mx-4"
        vertical
        :hidden="$vuetify.breakpoint.mobile"
      />
      <div
        :hidden="!$vuetify.breakpoint.mobile"
      >
        <v-btn
          fab
          elevation="0"
          x-small
          color="primary"
          @click="mobileMenu = !mobileMenu"
        >
          <v-icon dark>
            mdi-menu
          </v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="mobileMenu"
      right
      temporary
      fixed
      @mouseout="showMobileMenu = false"
    >
    </v-navigation-drawer>
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
