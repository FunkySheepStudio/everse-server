<template>
  <section>
    <funkysheep-service
      :service="service"
    />
  </section>
</template>
<script>
export default {
  layout: 'admin',
  components: {},
  data () {
    return {
      service: '/api/system/services'
    }
  }
}
</script>
<style>
</style>
