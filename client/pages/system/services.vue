<template>
  <section>
    <v-data-table
      :items="services().data"
      :headers="headers"
    >
      <template #[`item.log_messages`]="{ item }">
        <v-checkbox
          :input-value="item.log_messages"
          @change="switchLogMessages(item._id, !item.log_messages)"
        />
      </template>
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
  layout: 'admin',
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'Services'
    }
  },
  computed: {
    ...mapGetters('/api/system/services', { services: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Log Messages',
          value: 'log_messages'
        },
        {
          text: 'Remove',
          value: 'remove'
        }
      ]
    }
  },
  mounted () {
    this.findServices()
  },
  methods: {
    ...mapActions('/api/system/services', { findServices: 'find', patch: 'patch', remove: 'remove' }),
    switchLogMessages (_id, logMessages) {
      this.patch([
        _id,
        {
          log_messages: logMessages
        }
      ])
    }
  }
}
</script>
<style>
</style>
