<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12 mb-5">
                <h1>Welcome to the University Support System</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <router-link to="/login" class="btn btn-primary">Login</router-link>
            </div>
            <div class="col-6">
                <router-link to="/register" class="btn btn-outline-primary">Register</router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Register',
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

      const baseURL = 'http://localhost:3000/api/register';

      this.$http.post(baseURL,
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

</style>
