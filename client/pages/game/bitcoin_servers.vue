<template>
  <section>
    <v-text-field
      v-model="address"
      label="Address"
    />
    <v-text-field
      v-model="port"
      label="Port"
    />
    <v-select
      v-model="network"
      :items="networks"
      label="Network"
    />
    <v-text-field
      v-model="login"
      label="Login"
    />
    <v-text-field
      v-model="password"
      label="Password"
    />
    <v-btn
      @click="create({
        address,
        port,
        network,
        login,
        password,
        online: false
      })"
    >
      Add
    </v-btn>
    <v-data-table
      :items="bitcoinServers().data"
      :headers="headers"
    >
      <template #[`item.remove`]="{ item }">
        <v-btn
          @click="remove(item._id)"
        >
          <v-icon
            color="red"
          >
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  layout: 'admin',
  data () {
    return {
      networks: [
        'mainnet',
        'testnet',
        'regtest'
      ],
      address: '',
      port: '',
      network: '',
      login: '',
      password: ''
    }
  },
  head () {
    return {
      title: 'Bitcoin Servers'
    }
  },
  computed: {
    ...mapGetters('/api/bitcoin/servers', { bitcoinServers: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Address',
          value: 'address'
        },
        {
          text: 'Port',
          value: 'port'
        },
        {
          text: 'Network',
          value: 'network'
        },
        {
          text: 'Login',
          value: 'login'
        },
        {
          text: 'Online',
          value: 'online'
        },
        {
          text: 'Remove',
          value: 'remove'
        }
      ]
    }
  },
  mounted () {
    this.findBitcoinServers()
  },
  methods: {
    ...mapActions('/api/bitcoin/servers', { findBitcoinServers: 'find', create: 'create', remove: 'remove' })
  }
}
</script>
<style>
</style>
