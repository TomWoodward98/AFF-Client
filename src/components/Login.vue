<template>
    <div class="col-12 col-lg-6 mx-auto">
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
                            <div v-if="approve_error" class="alert alert-danger alert-dismissible fade show col-12 mt-3" role="alert">
                                <strong>{{ approve_error }}</strong>
                                <button type="button" @click="approve_error = false" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
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
            approve_error: false,
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
            this.approve_error = false;
            
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

            this.$http.post('/api/login',
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
                        this.loadCurrentUser();
                        this.loadUsers();
                        this.loadStatuses();
                        this.loadTickets();
                        this.$router.push('home');
                    }
                }
            ));
            return true;
        },
        handleErrors(error) {
            if (error.Error.email) {
                this.email_error = error.Error.email;
            }
            if (error.Error.password) {
                this.password_error = error.Error.password;
            }
            if (error.Error.server) {
                this.server_error = error.Error.server;
            }
            if (error.Error.approved) {
                this.approve_error = error.Error.approved;
            }
        },
        loadCurrentUser() {
            this.$http.get('/api/get-current-user').then((res) => {
                this.$store.commit('SET_CURRENT_USER', res.data);
            });
        },
        loadUsers() {
            this.$http.get('/api/get-users').then(response => {
                this.$store.commit('SET_USERS', response.data);
            });
        },
        loadTickets() {
            this.$http.get('/ticket/get-tickets').then(response => {
                this.$store.commit('SET_TICKETS', response.data);
            });
        },
        loadStatuses() {
            this.$http.get('/ticket/get-columns').then(response => {
                this.$store.commit('SET_STATUSES', response.data);
            });
        },
    },
};
</script>

<style>

</style>
