<template>
  <v-container
    class="d-md-flex justify-center"
  >
    <funkysheep-unity
      v-if="userId !== ''"
      game="Everst"
      :width="800"
      :height="400"
    />
  </v-container>
</template>
<script>

export default {
  components: {},
  data () {
    return {
      userId: ''
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.userId = localStorage.getItem('_id')
  },
  methods: {}
}
</script>
<style>
</style>
