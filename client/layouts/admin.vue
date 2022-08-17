<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <funkysheep-logo
        src="/img/Logo.png"
        to="/admin"
      />
      <v-toolbar-title
        v-if="$vuetify.breakpoint.name != 'xs'"
        v-text="title"
      />
      <v-spacer />
      <funkysheep-menu-item
        v-for="(menu, i) in menus"
        :key="i"
        :menu="menu"
        :hidden="$vuetify.breakpoint.mobile"
      />
      <v-divider
        class="mx-4"
        vertical
        :hidden="$vuetify.breakpoint.mobile"
      />
      <funkysheep-user-login />
      <v-divider
        class="mx-4"
        vertical
        :hidden="$vuetify.breakpoint.mobile"
      />
      <funkysheep-social
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
      <v-list>
        <funkysheep-menu-mobile-item
          v-for="(menu, i) in menus"
          :key="i"
          :menu="menu"
        />
        <v-list-item>
          <funkysheep-social />
        </v-list-item>
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
  middleware: ['authenticated', 'admin'],
  data () {
    return {
      drawer: false,
      fixed: false,
      menus: [
        {
          icon: 'mdi-chart-bubble',
          title: 'System',
          items: [
            {
              title: 'Services',
              to: '/system/services'
            },
            {
              title: 'Connections',
              to: '/system/connections'
            },
            {
              title: 'Users',
              to: '/system/users'
            },
            {
              title: 'Messages',
              to: '/system/messages'
            }
          ]
        },
        {
          icon: 'mdi-gamepad-variant',
          title: 'Game',
          items: [
            {
              title: 'Map',
              to: '/game/map'
            },
            {
              title: 'Netcode Servers',
              to: '/game/netcode_servers'
            },
            {
              title: 'Bitcoin Servers',
              to: '/game/bitcoin_servers'
            }
          ]
        },
        {
          icon: 'mdi-gamepad-variant',
          title: 'Mini games',
          items: [
            {
              title: 'Plane',
              to: '/minigames/planes/managment'
            }
          ]
        }
      ],
      miniVariant: false,
      mobileMenu: false,
      title: 'Administration'
    }
  },
  mounted () {}
}
</script>
