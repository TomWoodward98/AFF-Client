<template>
    <div class="col-12">
        <div class="row">
            <div v-if="successReg" class="alert alert-success alert-dismissible fade show col-12" role="alert">
                <h4 class="alert-heading"><strong>Account created successfully</strong>
                  <button type="button" @click="successReg = false" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </h4> 
                <hr>
                <p>All you need to do now is wait for an admin to approve your account and then you 
                  can login.
                </p>
            </div>
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
                    <div class="form-group row mb-0">
                        <div class="col-12 text-left">
                            <label for="title">Title</label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12">
                            <input
                                autocomplete="off"
                                autofocus
                                class="form-control"
                                :class="{ 'is-invalid' : title_error }"
                                id="title"
                                name="title"
                                required
                                type="text"
                                placeholder="Enter Title"
                                v-model="form.title"
                            >
                            <span
                                class="invalid-feedback"
                                role="alert"
                                v-if="title_error">
                                <strong>{{ title_error }}</strong>
                            </span>
                        </div>
                    </div>
                    <div class="form-group row mb-0">
                            <div class="col-12 text-left">
                                <label for="first_name">First Name</label>
                            </div>
                        </div>
                    <div class="form-group row">
                        <div class="col-12">
                            <input
                                autocomplete="off"
                                autofocus
                                class="form-control"
                                :class="{ 'is-invalid' : first_name_error }"
                                id="first_name"
                                name="first_name"
                                required
                                type="text"
                                placeholder="Enter First Name"
                                v-model="form.first_name"
                            >
                            <span
                                class="invalid-feedback"
                                role="alert"
                                v-if="first_name_error">
                                <strong>{{ first_name_error }}</strong>
                            </span>
                        </div>
                    </div>
                    <div class="form-group row mb-0">
                        <div class="col-12 text-left">
                            <label for="last_name">Last Name</label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12">
                            <input
                                autocomplete="off"
                                autofocus
                                class="form-control"
                                :class="{ 'is-invalid' : last_name_error }"
                                id="last_name"
                                name="last_name"
                                required
                                type="text"
                                placeholder="Enter Last Name"
                                v-model="form.last_name"
                            >
                            <span
                                class="invalid-feedback"
                                role="alert"
                                v-if="last_name_error">
                                <strong>{{ last_name_error }}</strong>
                            </span>
                        </div>
                    </div>
                    <div class="form-group row mb-0">
                        <div class="col-12 text-left">
                          <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12">
                            <input
                                class="form-control"
                                :class="{ 'is-invalid' : email_error}"
                                id="email"
                                name="email"
                                type="text"
                                required
                                placeholder="Enter Email"
                                v-model="form.email"
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
                    <div class="form-group row mb-0">
                        <div class="col-12 text-left">
                            <label for="password">Password</label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12">
                            <input
                                class="form-control"
                                :class="{ 'is-invalid' : password_error}"
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Enter Password"
                                v-model="form.password"
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
                    <div class="form-group row mb-0">
                        <div class="col-12 text-left">
                            <label for="password_confirmation">Confirm Password</label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12">
                            <input
                                class="form-control"
                                :class="{ 'is-invalid' : password_confirmation_error }"
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                required
                                placeholder="Confirm Password"
                                v-model="password_confirmation"
                            >
                            <span
                                class="invalid-feedback"
                                role="alert"
                                v-if="password_confirmation_error">
                                <strong>{{ password_confirmation_error }}</strong>
                            </span>
                        </div>
                    </div>
                    <div class="form-group row mb-0">
                        <div class="col-12 text-left">
                            <label for="department">Department</label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-12">
                            <select
                                autocomplete="off"
                                class="form-control"
                                :class="{ 'is-invalid' : department_error }"
                                id="department"
                                name="department"
                                required
                                v-model="form.department"
                            >
                                <option value=""></option>
                                <option v-for="department in departments" :key="department.id" :value="department">{{ department.name }}</option>
                            </select>
                            <span
                                class="invalid-feedback"
                                role="alert"
                                v-if="department_error">
                                <strong>{{ department_error }}</strong>
                            </span>
                        </div>
                    </div>
                    <div class="form-group row mb-0">
                        <div class="col-12 text-left">
                            <label for="userType">User Type</label>
                        </div>
                    </div>
                    <div class="form-group row mb-0">
                        <div class="col-12">
                            <select
                                autocomplete="off"
                                class="form-control"
                                :class="{ 'is-invalid' : user_type_error }"
                                id="userType"
                                name="userType"
                                required
                                v-model="form.user_type"
                            >
                                <option value=""></option>
                                <option v-for="userType in user_types" :key="userType.id" :value="userType">{{ userType.type }}</option>
                            </select>
                            <span
                                class="invalid-feedback"
                                role="alert"
                                v-if="user_type_error">
                                <strong>{{ user_type_error }}</strong>
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

export default {
  name: 'Register',
  
  data() {
    return {
      departments: [],
      user_types: [],
      form: {
        title: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        department: null,
        user_type: null,
      },
      title_error: false,
      first_name_error: false,
      last_name_error: false,
      email_error: false,
      emailFormat: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9-]+)*$/,
      password_error: false,
      password_confirmation_error: false,
      password_confirmation: '',
      department_error: false,
      user_type_error: false,
      registering: false,
      errors: false,
      successReg: false,
    };
  },
  created() {
    const baseURL = 'http://localhost:3000';
    this.$http.get(baseURL + '/department/get-departments').then(res => {
        this.departments = res.data;
    });

    this.$http.get(baseURL + '/api/get-user-type').then(res => {
        this.user_types = res.data;
    });
  },
  methods: {
    submitForm() {
        let failed = false;

        this.title_error = false;
        this.first_name_error = false;
        this.last_name_error = false;
        this.email_error = false;
        this.password_error = false;
        this.password_confirmation_error = false;
        this.department_error = false;
        this.user_type_error = false;

        if (this.form.title.trim() === '') {
            failed = true;
            this.title_error = 'Please enter your title'
        }

        if (this.form.first_name.trim() === '') {
            failed = true;
            this.first_name_error = 'Please enter your first name'
        }

        if (this.form.last_name.trim() === '') {
            failed = true;
            this.last_name_error = 'Please enter your last name'
        }

        if (this.form.email.trim() === '') {
            failed = true;
            this.email_error = 'Please fill out your email';
        } else if (this.isEmail() === false) {
            failed = true;
            this.email_error = 'Please enter a valid email address';
        }

        if (this.form.password.trim() === '') {
            failed = true;
            this.password_error = 'Please enter a valid password'
        }

        if (this.password_confirmation.trim() === '') {
            failed = true;
            this.password_confirmation_error = 'Please confirm your password'
        }

        if (this.form.password !== this.password_confirmation) {
            failed = true;
            this.password_error = 'Your Passwords do not match'
            this.password_confirmation_error = 'Your Passwords do not match'
        }

        if (this.form.department === null) {
            failed = true;
            this.department_error = 'Please enter your department'
        }

        if (this.form.user_type === null) {
            failed = true;
            this.user_type_error = 'Please select a user type, if unsure select client ando our admins will handle the rest'
        }

        if (failed) {
            return false;
        }

        this.registering = true;

        this.$http.post('http://localhost:3000/api/register', this.form).then(response => {
            if (response.data.Error) {
                this.errors = true;
                this.registering = false;
                const sentError = response.data;
                this.handleErrors(sentError);
            } else {
                this.form.title = '';
                this.form.first_name = '';
                this.form.last_name = '';
                this.form.email = '';
                this.form.password = '';
                this.password_confirmation = '';
                this.form.department = null;
                this.form.user_type = null;
                this.registering = false;
                this.successReg = true;
            }
        });
    },
    handleErrors(error) {
        if (error.Error.title) {
            this.title_error = error.Error.title;
        }
        if (error.Error.first_name) {
            this.first_name_error = error.Error.first_name;
        }
        if (error.Error.last_name) {
            this.last_name_error = error.Error.last_name;
        }
        if (error.Error.email) {
            this.email_error = error.Error.email;
        }
        if (error.Error.password) {
            this.password_error = error.Error.password;
            this.password_confirmation_error = error.Error.password;
        }
        if (error.Error.department) {
            this.department_error = error.Error.department;
        }
        if (error.Error.user_type) {
            this.user_type_error = error.Error.user_type;
        }
    },
    isEmail() {
        return this.emailFormat.test(this.form.email);
    },
  },
};
</script>

<style>

</style>
