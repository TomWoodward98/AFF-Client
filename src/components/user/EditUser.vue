<template>
    <div class="modal fade" :id="dataTarget" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog d-flex align-items-center modal-dialog-centered" role="document">
            <div class="modal-content">
                <form 
                    id="editUserForm"
                    action="/update-user"
                    autocomplete="off"
                    method="post"
                >
                    <div class="modal-header">
                        <h5 class="modal-title" id="userModalLabel">Edit User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row mb-0">
                            <div class="col-12 text-left">
                                <label for="editTitle">Title</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <input
                                    autocomplete="off"
                                    autofocus
                                    class="form-control"
                                    id="editTitle"
                                    name="editTitle"
                                    required
                                    type="text"
                                    :placeholder="user.title"
                                    :value="user.title"
                                    @change="changeTitle($event)"
                                >
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-12 text-left">
                                <label for="edit_first_name">First Name</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <input
                                    autocomplete="off"
                                    autofocus
                                    class="form-control"
                                    id="edit_first_name"
                                    name="edit_first_name"
                                    required
                                    type="text"
                                    :placeholder="user.first_name"
                                    :value="user.first_name"
                                    @change="changeFirst($event)"
                                >
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-12 text-left">
                                <label for="edit_last_name">Last Name</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <input
                                    autocomplete="off"
                                    autofocus
                                    class="form-control"
                                    id="edit_last_name"
                                    name="edit_last_name"
                                    required
                                    type="text"
                                    :placeholder="user.last_name"
                                    :value="user.last_name"
                                    @change="changeLast($event)"
                                >
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-12 text-left">
                                <label for="edit_email">Email</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <input
                                    autocomplete="off"
                                    autofocus
                                    class="form-control"
                                    :class="{ 'is-invalid' : email_error }"
                                    id="edit_email"
                                    name="edit_email"
                                    required
                                    type="text"
                                    :placeholder="user.email"
                                    :value="user.email"
                                    @change="changeEmail($event)"
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
                                <label for="edit_password">Password</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <input
                                    autocomplete="off"
                                    autofocus
                                    class="form-control"
                                    :class="{ 'is-invalid' : password_error }"
                                    id="edit_password"
                                    name="edit_password"
                                    required
                                    type="password"
                                    placeholder="Enter a new Password to change"
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
                            <div class="col-12 text-left">
                                <label for="edit_password_confirmation">Confirm Password</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <input
                                    class="form-control"
                                    :class="{ 'is-invalid' : password_confirmation_error }"
                                    id="edit_password_confirmation"
                                    name="edit_password_confirmation"
                                    type="password"
                                    required
                                    placeholder="Confirm the new Password"
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
                                <label for="edit_department">Department</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <select
                                    autocomplete="off"
                                    class="form-control"
                                    id="edit_department"
                                    name="edit_department"
                                    @change="changeDepartment($event)"
                                >
                                    <option :value="user.department._id">{{ user.department.name }}</option>
                                    <option v-for="department in departments" :key="department._id" :value="department._id">{{ department.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-12 text-left">
                                <label for="edit_user_type">User Permission Level</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <select
                                    autocomplete="off"
                                    class="form-control"
                                    id="edit_user_type"
                                    name="edit_user_type"
                                    @change="UserType($event)"
                                >
                                    <option :value="user.user_type._id">{{  user.user_type.type }}</option>
                                    <option v-for="user_type in user_types" :key="user_type._id" :value="user_type._id">{{ user_type.type }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                        <button id="editUserBtn" type="button" class="btn btn-secondary" @click.prevent="editUser()">Edit User</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditUser",
    data() {
        return {
            departments: [],
            user_types: [],
            form : {
                user: this.user,
                title: '',
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                department: null,
                user_type: null,
                approved: true,
            },
            email_error: false,
            emailFormat: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9-]+)*$/,
            password_error: false,
            password_confirmation: '',
            password_confirmation_error: false,
        };
    },
    props: {
        dataTarget: String,
        user: Object,
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
        changeTitle(event) {
            this.form.title = event.target.value;
        },
        changeFirst(event) {
            this.form.first_name = event.target.value;
        },
        changeLast(event) {
            this.form.last_name = event.target.value;
        },
        changeEmail(event) {
            this.form.email = event.target.value;
        },
        changeDepartment(event) {
            this.form.department = event.target.value;
        },
        changeUserType(event) {
            this.form.user_type = event.target.value;
        },
        editUser() {
            let failed = false;

            this.email_error = false;
            this.password_error = false;
            this.password_confirmation_error = false;

            if (this.form.title.trim() === '') {
                this.form.title = this.user.title;
            }

            if (this.form.first_name.trim() === '') {
                this.form.first_name = this.user.first_name;
            }

            if (this.form.last_name.trim() === '') {
                this.form.last_name = this.user.last_name;
            }

            if (this.form.email.trim() === '') {
                this.form.email = this.user.email;
            }

            if (this.form.password !== this.password_confirmation && this.form.password !== ''){
                failed = true;
                this.password_error = 'Your Passwords do not match'
                this.password_confirmation_error = 'Your Passwords do not match'
            }

            if (this.form.department === null) {
                this.form.department = this.user.department;
            } else {
                let departments = this.departments;
                for (let i = 0; i < departments.length; i++) {
                    if (departments[i]._id === this.form.department) {   
                        this.form.department = departments[i];
                    }
                }
            }

            if (this.form.user_type === null) {
                this.form.user_type = this.user.user_type;
            } else {
                let userTypes = this.user_types;
                for (let i = 0; i < userTypes.length; i++) {
                    if (userTypes[i]._id === this.form.user_type) {   
                        this.form.user_type = userTypes[i];
                    }
                }
            }

            if (failed) {
                return false;
            }

            this.edittingUser = true;

            this.$http.post('http://localhost:3000/api/update-user', this.form).then(response => {
                if (response.errors) {
                    this.creatingUser = false;
                    this.handleErrors(response.errors[0]);
                } else {
                    this.form.title = '';
                    this.form.first_name = '';
                    this.form.last_name = '';
                    this.form.email = '';
                    this.form.password = '';
                    this.password_confirmation = '';
                    this.form.department = null;
                    this.form.user_type = null;
                    this.form.approved = false;
                    this.$emit('userUpdated', response.data);
                    $('#' + this.dataTarget).modal('hide')
                }
            });
        },
        isEmail() {
            return this.emailFormat.test(this.form.email);
        },
    },

}
</script>

<style scoped>

</style>
