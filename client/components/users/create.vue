<template>
  <section>
    <v-card>
      <v-card-text>
        {{ $data.id }}
        <v-text-field
          v-model="login"
          label="Login"
          @input="CheckLogin($event)"
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
        {{ message }}
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
      password: '',
      login: '',
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
    } else {
      this.id = ''
      this.login = ''
      this.isValid = false
    }
  },
  methods: {
    ...mapActions('/api/system/users', { findUsers: 'find', patch: 'patch', create: 'create' }),
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
            password: this.password
          }
        ])
          .then(() => {
            localStorage.setItem('login', this.login)
            localStorage.setItem('password', this.password)
          })
          .catch((err) => {
            this.message = err.message
          })
      } else {
        const data = {
          login: this.login,
          password: this.password
        }
        this.create(data)
      }
    },
    Logout () {
      this.$store.dispatch('auth/logout')
        .then(() => {
          localStorage.setItem('login', this.login)
          localStorage.setItem('password', this.password)
          localStorage.removeItem('feathers-jwt')
        })
    }
  }
}
</script>
