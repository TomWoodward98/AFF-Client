<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12">
                <h1>Login</h1>
            </div>
            <div class="col-12 text-right">
                <router-link to="/welcome" class="btn btn-primary">Back</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <form action="/api/login" method="POST">
                    <div class="row mt-3">
                        <div class="col-12">
                            <div
                                class="alert alert-warning"
                                role="alert"
                                v-if="server_error"
                            >
                                <strong>{{ server_error }}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div class="col-12">
                            <label class="m-0" for="email">Email</label>
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
                                class="invalid-feedback"
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
                    <div class="row mb-0">
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
                    <div class="row">
                        <div class="col-12 text-right">
                            <router-link to="/register" class="btn btn-link text-right pr-0 pt-0">Haven't got an account? Register here</router-link>
                        </div>
                    </div>
                    <div class="row my-3">
                        <div class="col-12">
                            <button
                                id="submitBtn"
                                type="button"
                                class="btn btn-secondary w-100"
                                :class="{ 'opacity-50 pointer-event-none' : loggingIn}"
                                :disabled="loggingIn"
                                @click.prevent="submitForm()"
                            >
                                {{ loggingIn ? 'Logging In...' : 'Login' }}
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
    name: 'Login',
    data() {
        return {
            email: '',
            email_error: false,
            password: '',
            password_error: false,
            server_error: false,
            loggingIn: false,
            errors: false,
        };
    },
    methods: {
        submitForm() {
            let failed = false;
            this.email_error = false;
            this.password_error = false;
            this.server_error = false;
            if (this.email.trim() === '') {
                failed = true;
                this.email_error = 'Please enter your email';
            }

            if (this.password.trim() === '') {
                failed = true;
                this.password_error = 'Please enter your password';
            }

            if (failed) {
                return false;
            }

            this.loggingIn = true;

            const baseURL = 'http://localhost:3000/api/login';

            this.$http.post(baseURL,
                {
                    email: this.email.trim(),
                    password: this.password.trim(),
                }).then(((response) => {
                    if (response.data.Error) {
                        this.errors = true;
                        this.loggingIn = false;
                        const sentError = response.data;
                        this.handleErrors(sentError);
                    } else if (response.data.Success) {
                        this.errors = false;
                        this.confirmation = true;
                        localStorage.setItem('user', JSON.stringify(response.data.Success.user));
                        localStorage.setItem('jwt', response.data.Success.jwt);

                        if (localStorage.getItem('jwt') != null) {
                            this.$router.push('home')
                        }
                    }
                }
            ));
            return true;
        },
        handleErrors(error) {
            if (error.Error[0].email) {
                this.email_error = error.Error[0].email;
            }
            if (error.Error[1].password) {
                this.password_error = error.Error[1].password;
            }
            if (error.Error[0].server) {
                this.server_error = error.Error[0].server;
            }
        },
    },
};
</script>

<style>

</style>
