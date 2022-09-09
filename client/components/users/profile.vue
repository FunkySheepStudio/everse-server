<template>
  <section>
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="login"
          label="Login"
          @input="CheckLogin($event)"
        />
        <v-text-field
          v-model="nickname"
          label="Nickname"
        />
        <passwordForm
          v-model="password"
        />
        <v-btn
          v-if="$store.state.auth.user"
          @click="Logout()"
        >
          Logout
        </v-btn>
        <v-btn
          v-if="isValid"
          @click="Save()"
        >
          Save
        </v-btn>
      </v-card-text>
    </v-card>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import passwordForm from '~/components/users/password.vue'
export default {
  components: {
    passwordForm
  },
  data () {
    return {
      id: '',
      password: localStorage.getItem('password'),
      login: '',
      nickname: '',
      message: '',
      isValid: false
    }
  },
  computed: {
    ...mapGetters('/api/system/users', { users: 'find', get: 'get' })
  },
  mounted () {
    if (this.$store.state.auth.user) {
      this.id = this.$store.state.auth.user._id
      this.login = this.$store.state.auth.user.login
      this.isValid = true

      this.getUser(this.id)
        .then((data) => {
          this.nickname = data.nickname
        })
    } else {
      this.id = ''
      this.login = ''
      this.nickname = ''
      this.isValid = false
    }
  },
  methods: {
    ...mapActions('/api/system/users', { findUsers: 'find', getUser: 'get', patch: 'patch' }),
    LoginExist (login) {
      const query = {
        login,
        _id: {
          $ne: this.id
        }
      }

      return this.findUsers({
        query
      })
        .then((users) => {
          if (users.total === 1) {
            return true
          } else {
            return false
          }
        })
    },
    CheckLogin (login) {
      this.LoginExist(login)
        .then((result) => {
          if (result) {
            this.isValid = false
            this.message = 'Login already in use'
          } else {
            this.isValid = true
            this.message = ''
          }
        })
    },
    Save () {
      if (this.id) {
        this.patch([
          this.id,
          {
            login: this.login,
            password: this.password,
            nickname: this.nickname
          }
        ])
          .then(() => {
            localStorage.setItem('login', this.login)
            localStorage.setItem('password', this.password)
          })
          .catch((err) => {
            this.message = err.message
          })
      }
    },
    Logout () {
      this.$store.dispatch('auth/logout')
        .then(() => {
          localStorage.removeItem('login')
          localStorage.removeItem('password')
          localStorage.removeItem('_id')
          localStorage.removeItem('feathers-jwt')
          window.location.href = '/'
        })
    }
  }
}
</script>
