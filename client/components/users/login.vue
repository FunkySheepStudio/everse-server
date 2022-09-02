<template>
  <section>
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="login"
          label="Login"
        />
        <v-text-field
          v-model="password"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        />
        <v-btn
          @click="Login()"
        >
          Login
        </v-btn>
        {{ message }}
      </v-card-text>
    </v-card>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      id: '',
      password: '',
      login: '',
      showPassword: false,
      message: '',
      isAuthenticated: false
    }
  },
  computed: {
    ...mapGetters('/api/system/users', { users: 'find', get: 'get' })
  },
  mounted () {
    this._id = localStorage.getItem('_id')
    this.login = localStorage.getItem('login')
    this.password = localStorage.getItem('password')
    this.Auth()
  },
  methods: {
    ...mapActions('/api/system/users', { findUsers: 'find', create: 'create', patch: 'patch' }),
    Auth () {
      if (!this.$store.getters['auth/isAuthenticated']) {
        if (localStorage.getItem('feathers-jwt')) { //  Try the jwt auth
          this.$store.dispatch('auth/authenticate', {
            accessToken: localStorage.getItem('feathers-jwt'),
            strategy: 'jwt'
          })
            .then((auth) => {
              if (auth.user.admin) {
                this.$router.push('/admin')
              } else {
                this.$router.push('/')
              }
            })
            .catch((err) => {
              this.message = err
            })
        } else if (this.login && this.password) {
          this.$store.dispatch('auth/authenticate', { //  Try the local auth
            login: this.login,
            password: this.password,
            strategy: 'local'
          })
            .then((auth) => {
              localStorage.setItem('_id', auth.user._id)
              this._id = auth.user._id
              this.showForm = false
              if (auth.user.admin) {
                this.$router.push('/admin')
              } else {
                this.$router.push('/')
              }
            })
            .catch((err) => {
              this.showForm = true
              this.message = err
            })
        } else {
          this.showForm = true
        }
      }
    },
    _idExist (_id) {
      return this.findUsers({
        query: {
          _id
        }
      })
        .then((users) => {
          if (users.total === 1) {
            return true
          } else {
            return false
          }
        })
    },
    loginExist (login) {
      return this.findUsers({
        query: {
          login
        }
      })
        .then((users) => {
          if (users.total === 1) {
            return true
          } else {
            return false
          }
        })
    },
    Login () {
      localStorage.setItem('login', this.login)
      localStorage.setItem('password', this.password)
      localStorage.removeItem('feathers-jwt')
      this.Auth()
    }
  }
}
</script>
