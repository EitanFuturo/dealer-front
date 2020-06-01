<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <h3 class="text-2xl mb-6">Sign Up</h3>
      <form @submit.prevent="signup">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="mb-6">
          <label for="name" class="label">Name</label>
          <input type="text" v-model="name" class="input" id="email" placeholder="Justin">
        </div>

        <div class="mb-6">
          <label for="last_name" class="label">Last name</label>
          <input type="text" v-model="last_name" class="input" id="email" placeholder="Bieber">
        </div>

        <div class="mb-6">
          <label for="email" class="label">E-mail Address</label>
          <input type="email" v-model="email" class="input" id="email" placeholder="andy@web-crunch.com">
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input type="password" v-model="password" class="input" id="password" placeholder="Password">
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password confirmation</label>
          <input type="password" v-model="password_confirmation" class="input" id="password_confirmation" placeholder="Password confirmation">
        </div>

          <button type="submit" class="font-sans font-bold px-4 rounded cursor-pointer no-underline block w-full py-4 items-center justify-center">Sign Up</button>

        <div class="my-4"><router-link to="/" class="link-grey">Sign In</router-link></div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { name: this.name, last_name: this.last_name, email: this.email, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/drugs')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Ups!'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/drugs')
      }
    }
  }
}
</script>
