<template>
  <section>
    <v-btn
      @click="create"
    >
      Add
    </v-btn>
    <v-data-table
      :items="netcodeServers().data"
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
    }
  },
  head () {
    return {
      title: 'Netcode Servers'
    }
  },
  computed: {
    ...mapGetters('/api/game/netcode_servers', { netcodeServers: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Remove',
          value: 'remove'
        }
      ]
    }
  },
  mounted () {
    this.findNetcodeServers()
  },
  methods: {
    ...mapActions('/api/game/netcode_servers', { findNetcodeServers: 'find', create: 'create', remove: 'remove' })
  }
}
</script>
<style>
</style>
