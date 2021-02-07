<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-8 mx-auto p-0">
          <form action="/hit-backend" method="POST">
            <div class="row my-3">
              <div class="col-12">
                <label class="m-0" for="name"> Name </label>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12">
                <input
                  class="form-control"
                  :class="{ 'is-invalid' : name_error}"
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter Name"
                  v-model="name"
                >
                <span
                  class="invalid-feedback"
                  role="alert"
                  v-if="name_error"
                >
                <strong>{{ name_error }}</strong>
                </span>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12">
                <label class="m-0" for="password"> Password </label>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12">
                <input
                  class="form-control"
                  :class="{ 'is-invalid' : password_error}"
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter Password"
                  v-model="password"
                >
                <span
                  class="invalid-feedback"
                  role="alert"
                  v-if="password_error"
                >
                <strong>{{ password_error }}</strong>
                </span>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12">
                <button
                  id="submitBtn"
                  type="button"
                  class="btn btn-secondary w-100"
                  :class="{ 'opacity-50 pointer-event-none' : registering}"
                  :disabled="registering"
                  @click.prevent="submitForm()"
                >
                  {{ registering ? 'Registering...' : 'Register' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      name: '',
      name_error: false,
      password: '',
      password_error: false,
      registering: false,
      errors: false,
    };
  },
  methods: {
    submitForm() {
      let failed = false;
      this.name_error = false;
      this.password_error = false;
      if (this.name.trim() === '') {
        failed = true;
        this.name_error = 'Please fill out your name';
      }

      if (this.password.trim() === '') {
        failed = true;
        this.password_error = 'Please create a password';
      }

      if (failed) {
        return false;
      }

      this.registering = true;

      const baseURL = 'http://localhost:3000/create-user';

      axios.post(baseURL,
        {
          name: this.name.trim(),
          password: this.password.trim(),
        }).then(((response) => {
        if (response.name || response.password) {
          this.errors = true;
          this.registering = false;
          const sentError = response;
          this.handleErrors(sentError);
        } else {
          this.errors = false;
          this.confirmation = true;
        }
      }));
      return true;
    },
    handleErrors(error) {
      if (error.name) {
        this.name_error = error.name;
      }
      if (error.password) {
        this.password_error = error.password;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Titillium Web', sans-serif, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@import '~bootstrap/dist/css/bootstrap.css'
</style>
