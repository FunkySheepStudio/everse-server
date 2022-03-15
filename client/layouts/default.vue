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
      <v-btn
        fab
        elevation="0"
        @click="mobileMenu = !mobileMenu"
      >
        <v-icon dark>
          mdi-account
        </v-icon>
      </v-btn>
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
        <funkysheep-social
          :hidden="$vuetify.breakpoint.mobile"
        />
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  components: {},
  middleware: ['authenticated'],
  data () {
    return {
      drawer: false,
      fixed: false,
      menus: [
        {
          icon: 'mdi-gamepad-variant',
          title: 'Game',
          items: [
            {
              title: 'Services',
              to: '/system/reputation'
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
