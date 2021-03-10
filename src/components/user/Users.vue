<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12 text-center">
                <h1>University of Knowledge Users</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-left pl-0 my-3">
                <button 
                    type="button"
                    class="btn btn-secondary"
                    data-target="#createUserModal"
                    data-toggle="modal"
                >
                    Add User
                </button>
                <create-user
                    dataTarget="createUserModal"
                    @userCreated="addUser($event)"
                ></create-user>
            </div>
            <ul v-if="users.length > 0" class="list-group col-12">
                <!-- TODO - Convert to own component -->
                <li 
                    v-for="user in users" 
                    :key="user.id" 
                    class="list-group-item row p-2"
                    :class="{ 'border border-danger' : !user.approved }"
                >
                    <div class="col-12">
                        <div class="row align-items-center">
                            <div class="col-6">
                                {{ user.first_name }} {{ user.last_name }} ({{user.user_type.type}})
                            </div>
                            <div class="col-6">
                                <div class="row align-items-center">
                                    <div class="col-4">
                                        <button
                                            type="button"
                                            class="btn btn-info"
                                            data-target="#editUserModal"
                                            data-toggle="modal"
                                            @click="modalOpen(user)"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div class="col-4">
                                        <button
                                            v-if="!user.approved"
                                            type="button"
                                            class="btn btn-outline-info"
                                            @click="approveUser(user)"
                                        >
                                            Approve
                                        </button>
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-danger" type="button" data-toggle="collapse" :data-target="'#collapseDel-' + user._id" aria-expanded="false" aria-controls="collapseDel">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="collapse col-12 my-3" :id="'collapseDel-' + user._id">
                                <div class="col-12 card card-body">
                                    <div class="row">
                                        <p class="col-12">Are you sure you want to delete {{ user.first_name }}?</p>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <button
                                                type="button"
                                                class="btn btn-danger"
                                                @click="deleteUser(user)"
                                            >
                                                Yes
                                            </button>
                                        </div>
                                        <div class="col-6">
                                            <button
                                                type="button"
                                                class="btn btn-outline-danger"
                                                data-toggle="collapse"
                                                data-target="#collapseDel"
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <edit-user
                v-if="open"
                dataTarget="editUserModal"
                @userUpdated="editUser($event)"
                :user="loadedUser"
            ></edit-user>
        </div>
    </div>
</template>

<script>
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";

export default {
    name: "Users",
    components: {
        CreateUser,
        EditUser,
    },
    data() {
        return {
            users: [],
            loadedUser: {},
            open: false,
        };
    },
    mounted() {
        this.$http.get('http://localhost:3000/api/get-users').then(response => {
            this.users = response.data;
        });
    },
    methods: {
        addUser(user) {
            this.users.push(user);
        },
        modalOpen(user) {
            this.loadedUser = user;
            this.open = true;
        },
        editUser(user) {
            let users = this.users
            for (let i = 0; i < users.length; i++) {
                if (users[i]._id === user._id) {
                    this.users.splice(i, 1, user);
                }
            }
            this.open = false;
        },
        approveUser(user) {
            let form = 
            {
                user: user,
                approved: true,
            }
            this.$http.post('http://localhost:3000/api/approve-user', form).then(response => {
                if (this.errors) {
                    this.handleErrors(this.errors);
                } else {
                    this.editUser(response.data);
                }
            });
        },
        deleteUser(user) {
            let form = {
                userId: user._id,
            };
            this.$http.post('http://localhost:3000/api/delete-user', form).then(response => {
                if (this.errors) {
                    this.handleErrors(this.errors);
                } else {
                    let users = this.users
                    for (let i = 0; i < users.length; i++) {
                        if (users[i]._id === user._id) {
                            this.users = this.users.filter(dUser => dUser._id !== user._id);
                        }
                    }
                }
            });
        }
    },
}
</script>

<style scoped>

</style>