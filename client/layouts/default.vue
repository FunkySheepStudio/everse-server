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
      <funkysheep-menu-item
        v-for="(menu, i) in menus"
        :key="i"
        :menu="menu"
        :hidden="$vuetify.breakpoint.mobile"
      />
      <userProfileIcon />
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
      <v-list>
        <funkysheep-menu-mobile-item
          v-for="(menu, i) in menus"
          :key="i"
          :menu="menu"
        />
      </v-list>
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
import userProfileIcon from '~/components/users/profile-icon.vue'
export default {
  components: {
    userProfileIcon
  },
  middleware: ['authenticated'],
  data () {
    return {
      drawer: false,
      fixed: false,
      menus: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Settings',
          items: [
            {
              title: 'Map',
              to: '/user/map'
            }
          ]
        }
      ],
      miniVariant: false,
      mobileMenu: false,
      title: 'Everse'
    }
  },
  mounted () {
  }
}
</script>
