<template>
  <section>
    <v-form ref="form" lazy-validation>
      {{ modelValue }}
      <v-text-field
        v-model="password"
        label="Password"
        validate-on-blur
        :rules="[rules.required, rules.minimum, rules.maximum, rules.complexity]"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      />
      <v-text-field
        v-model="passwordCheck"
        label="Confirm password"
        validate-on-blur
        :rules="[rules.same]"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        @input="Send"
      />
    </v-form>
  </section>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: localStorage.getItem('password')
    }
  },
  data () {
    return {
      password: '&&&', // this.modelValue,
      passwordCheck: this.modelValue,
      showPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        minimum: value => value.length >= 8 || 'Min 8 characters, you should set 12 :)',
        maximum: value => value.length <= 20 || 'Max 20 characters, enougth is enougth ;)',
        same: value => value === this.password || 'Password must be identical, try again :p',
        complexity: (value) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
          return pattern.test(value) || 'Password MUST contain uppercase, lowercase and number .'
        }
      }
    }
  },
  computed: {},
  mounted () {
    this.password = this.passwordCheck = localStorage.getItem('password')
  },
  methods: {
    Send () {
      if (this.$refs.form.validate()) {
        this.$emit('input', this.password)
      }
    }
  }
}
</script>
