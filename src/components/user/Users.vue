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
                <li 
                    v-for="user in users" 
                    :key="user.id" 
                    class="list-group-item row p-2"
                    :class="{ 'border border-danger' : !user.approved }"
                >
                    <div class="col-12">
                        <div class="row align-items-center">
                            <div class="col-6">
                                {{ user.email }}
                            </div>
                            <div class="col-6">
                                <button 
                                    v-if="user.approved"
                                    type="button"
                                    class="btn btn-info"
                                    data-target="#editUserModal"
                                    data-toggle="modal"
                                    @click="modalOpen(user)"
                                >Edit</button>
                                <button
                                    v-else
                                    type="button"
                                    class="btn btn-outline-info"
                                    @click="approveUser(user)"
                                >Approve User</button>
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
    props: {
        
    },
    mounted() {
        this.$http.get('http://localhost:3000/api/getUsers').then(response => {
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
                    this.$emit('columnCreated', response.data);
                    this.editUser(response.data);
                }
            });
        },
    },
}
</script>

<style scoped>

</style>