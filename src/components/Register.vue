<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12">
                <h1>Register</h1>
            </div>
            <div class="col-12 text-right">
                <router-link to="/welcome" class="btn btn-primary">Back</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <form action="/api/register" method="POST">
                    <div class="row mt-3">
                        <div class="col-12">
                        <label class="m-0" for="email"> Email </label>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12">
                            <input
                                class="form-control"
                                :class="{ 'is-invalid' : email_error}"
                                id="email"
                                name="email"
                                type="text"
                                required
                                placeholder="Enter Email"
                                v-model="email"
                            >
                            <span
                                class="invalid-feedback m-0"
                                role="alert"
                                v-if="email_error"
                            >
                                <strong>{{ email_error }}</strong>
                            </span>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <label class="m-0" for="password"> Password </label>
                        </div>
                    </div>
                    <div class="row">
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
                                class="invalid-feedback m-0"
                                role="alert"
                                v-if="password_error"
                            >
                                <strong>{{ password_error }}</strong>
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-right">
                            <router-link to="/login" class="btn btn-link text-right pr-0 pt-0">Already Registered?</router-link>
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  
  data() {
    return {
      email: '',
      email_error: false,
      password: '',
      password_error: false,
      registering: false,
      errors: false,
      emailFormat: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9-]+)*$/,
    };
  },
  methods: {
    submitForm() {
      let failed = false;
      this.email_error = false;
      this.password_error = false;

      if (this.email.trim() === '') {
        failed = true;
        this.email_error = 'Please fill out your email';
      } else if (this.isEmail() === false) {
        failed = true;
        this.email_error = 'Please enter a valid email address';
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

      axios.post(baseURL,
        {
          email: this.email.trim(),
          password: this.password.trim(),
        }).then(((response) => {
        if (response.email || response.password) {
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
      if (error.email) {
        this.email_error = error.email;
      }
      if (error.password) {
        this.password_error = error.password;
      }
    },
    isEmail() {
        return this.emailFormat.test(this.email);
    },
  },
};
</script>

<style>

</style>
