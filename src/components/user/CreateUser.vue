<template>
    <div class="modal fade" :id="dataTarget" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog d-flex align-items-center modal-dialog-centered" role="document">
            <div class="modal-content">
                <form 
                    id="createUserForm"
                    action="/create-user"
                    autocomplete="off"
                    method="post"
                >
                    <div class="modal-header">
                        <h5 class="modal-title" id="userModalLabel">Create User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
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
                                    autocomplete="off"
                                    autofocus
                                    class="form-control"
                                    :class="{ 'is-invalid' : email_error }"
                                    id="email"
                                    name="email"
                                    required
                                    type="text"
                                    placeholder="Enter email"
                                    v-model="form.email"
                                >
                                <span
                                    class="invalid-feedback"
                                    role="alert"
                                    v-if="email_error">
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
                                    autocomplete="off"
                                    autofocus
                                    class="form-control"
                                    :class="{ 'is-invalid' : password_error }"
                                    id="password"
                                    name="password"
                                    required
                                    type="password"
                                    placeholder="Enter Password"
                                    v-model="form.password"
                                >
                                <span
                                    class="invalid-feedback"
                                    role="alert"
                                    v-if="password_error">
                                    <strong>{{ password_error }}</strong>
                                </span>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-12">
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
                                    v-model="form.password_confirmation"
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
                                <label for="user_type">User Permission Level</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <select
                                    autocomplete="off"
                                    class="form-control"
                                    :class="{ 'is-invalid' : user_type_error }"
                                    id="user_type"
                                    name="user_type"
                                    required
                                    v-model="form.user_type"
                                >
                                    <option value=""></option>
                                    <option v-for="user_type in user_types" :key="user_type.id" :value="user_type">{{ user_type.type }}</option>
                                </select>
                                <span
                                    class="invalid-feedback"
                                    role="alert"
                                    v-if="user_type_error">
                                    <strong>{{ user_type_error }}</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                        <button id="createUserBtn" type="button" class="btn btn-secondary" @click.prevent="createUser()">{{ this.creatingUser ? 'Creating User' : 'Create User' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateDepartment",
    data() {
        return {
            form : {
                title: '',
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: '',  
                department: null,
                user_type: null,
                approved: true,
            },
            title_error: false,
            first_name_error: false,
            last_name_error: false,
            email_error: false,
            emailFormat: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9-]+)*$/,
            password_error: false,
            password_confirmation_error: false,
            department_error: false,
            user_type_error: false,
            creatingUser: false,
        };
    },
    props: {
        dataTarget: String,
    },
    created() {
        // this.$http.get('/department/get-departments').then(res => {
        //     this.departments = res.data;
        // });

        // this.$http.get('/api/get-user-type').then(res => {
        //     this.user_types = res.data;
        // });
    },
    computed: {
        departments() {
            return this.$store.state.departments;
        },
        user_types() {
            return this.$store.state.userTypes;
        },
    },
    methods: {
        createUser() {
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
                this.title_error = 'Please enter the users title'
            }

            if (this.form.first_name.trim() === '') {
                failed = true;
                this.first_name_error = 'Please enter the users first name'
            }

            if (this.form.last_name.trim() === '') {
                failed = true;
                this.last_name_error = 'Please enter the users last name'
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

            if (this.form.password_confirmation.trim() === '') {
                failed = true;
                this.password_confirmation_error = 'Please confirm your password'
            }

            if (this.form.password !== this.form.password_confirmation) {
                failed = true;
                this.password_error = 'Your Passwords do not match'
                this.password_confirmation_error = 'Your Passwords do not match'
            }

            if (this.form.department === null) {
                failed = true;
                this.department_error = 'Please enter the users department'
            }

            if (this.form.user_type === null) {
                failed = true;
                this.user_type_error = 'Please enter the users permission level'
            }

            if (failed) {
                return false;
            }

            this.creatingUser = true;

            this.$http.post('/api/register', this.form).then(response => {
                if (response.data.Error) {
                    this.creatingUser = false;
                    this.handleErrors(response.data.Error);
                } else {
                    this.creatingUser = false;
                    this.form.title = '';
                    this.form.first_name = '';
                    this.form.last_name = '';
                    this.form.email = '';
                    this.form.password = '';
                    this.form.password_confirmation = '';
                    this.form.department = null;
                    this.form.user_type = null;
                    this.$emit('userCreated', response.data);
                    $('#' + this.dataTarget).modal('hide')
                }
            });
        },
        isEmail() {
            return this.emailFormat.test(this.form.email);
        },
        handleErrors(sentError){
            if (sentError.title) {
                this.title_error = sentError.title;
            }
            if (sentError.first_name) {
                this.first_name_error = sentError.first_name;
            }
            if (sentError.last_name) {
                this.last_name_error = sentError.last_name;
            }
            if (sentError.email) {
                this.email_error = sentError.email;
            }
            if (sentError.password) {
                this.password_error = sentError.password;
            }
            if (sentError.password) {
                this.password_confirmation_error = sentError.password;
            }
            if (sentError.department) {
                this.department_error = sentError.department;
            }
            if (sentError.user_type) {
                this.user_type_error = sentError.user_type;
            }
        },
    },

}
</script>

<style scoped>

</style>
