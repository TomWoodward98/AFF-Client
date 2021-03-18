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
                                    :class="{ 'is-invalid' :title_error }"
                                    id="editTitle"
                                    name="editTitle"
                                    required
                                    type="text"
                                    :placeholder="user.title"
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
                                <label for="edit_first_name">First Name</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <input
                                    autocomplete="off"
                                    autofocus
                                    class="form-control"
                                    :class="{ 'is-invalid' : first_name_error }"
                                    id="edit_first_name"
                                    name="edit_first_name"
                                    required
                                    type="text"
                                    :placeholder="user.first_name"
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
                                <label for="edit_last_name">Last Name</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <input
                                    autocomplete="off"
                                    autofocus
                                    class="form-control"
                                    :class="{ 'is-invalid' : last_name_error }"
                                    id="edit_last_name"
                                    name="edit_last_name"
                                    required
                                    type="text"
                                    :placeholder="user.last_name"
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
                                <label for="edit_department">Department</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <select
                                    autocomplete="off"
                                    class="form-control"
                                    :class="{ 'is-invalid' : department_error }"
                                    id="edit_department"
                                    name="edit_department"
                                    required
                                    v-model="form.department"
                                >
                                    <option selected disabled value="">{{ user.department.name }}</option>
                                    <option v-for="department in departments" :key="department._id" :value="department">{{ department.name }}</option>
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
                                <label for="edit_user_type">User Permission Level</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <select
                                    autocomplete="off"
                                    class="form-control"
                                    :class="{ 'is-invalid' : user_type_error }"
                                    id="edit_user_type"
                                    name="edit_user_type"
                                    required
                                    v-model="form.user_type"
                                >
                                    <option selected disabled value="">{{ user.user_type.type }}</option>
                                    <option v-for="user_type in user_types" :key="user_type._id" :value="user_type">{{ user_type.type }}</option>
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
                        <button id="editUserBtn" type="button" class="btn btn-secondary" @click.prevent="editUser()">{{ editingUser ? 'Editing User' : 'Edit User' }}</button>
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
            form : {
                user: this.user,
                title: '',
                first_name: '',
                last_name: '',
                email: '',
                department: '',
                user_type: '',
                approved: true,
            },
            title_error: false,
            first_name_error: false,
            last_name_error: false,
            email_error: false,
            emailFormat: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9-]+)*$/,
            department_error: false,
            user_type_error: false,
            editingUser: false,
        };
    },
    props: {
        dataTarget: String,
        user: Object,
    },
    computed: {
        departments() {
            return this.$store.state.departments;
        },
        user_types() {
            return this.$store.state.userTypes;
        }
    },
    methods: {
        editUser() {
            let failed = false;

            this.title_error = false;
            this.first_name_error = false;
            this.last_name_error = false;
            this.email_error = false;
            this.department_error = false;
            this.user_type_error = false;

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

            if (this.form.department === '') {
                this.form.department = this.user.department;
            }

            if (this.form.user_type === '') {
                this.form.user_type = this.user.user_type;
            }

            if (failed) {
                return false;
            }

            this.editingUser = true;

            this.$http.post('/api/update-user', this.form).then(response => {
                if (response.data.Error) {
                    this.editingUser = false;
                    this.handleErrors(response.data.Error);
                } else {
                    this.editingUser = false;
                    this.form = null;
                    this.$emit('userUpdated', response.data);
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
