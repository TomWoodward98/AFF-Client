<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12 text-center">
                <h1>University of Knowledge Users</h1>
            </div>
        </div>
        <div class="row px-3">
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
            <div v-if="userDeleted" class="col-12 alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Alert!</strong> User was deleted Successfully!
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div v-if="userCreated" class="col-12 alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> User was Created Successfully!
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="col-12 pl-0">
                <ul v-if="users.length > 0" class="list-group col-12 mx-3">
                    <user-list-item
                        v-for="user in users" 
                        :key="user.id" 
                        :user="user"
                        @editModal="modalOpen($event)"
                        @userUpdated="editUser($event)"
                        @delete="deleteUser($event)"
                    ></user-list-item>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import CreateUser from "./CreateUser";
import UserListItem from "./UserListItem";

export default {
    name: "Users",
    components: {
        CreateUser,
        UserListItem,
    },
    data() {
        return {
            users: [],
            loadedUser: {},
            userDeleted: false,
            userCreated: false,
            open: false,
        };
    },
    mounted() {
        this.$http.get('/api/get-users').then(response => {
            this.users = response.data;
        });
    },
    methods: {
        modalOpen(user) {
            this.loadedUser = user;
            this.open = true;
        },
        addUser(user) {
            this.users.push(user);
            this.userCreated = true;
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
        deleteUser(user) {
            let form = {
                userId: user._id,
            };
            this.$http.post('/api/delete-user', form).then(response => {
                if (this.errors) {
                    this.handleErrors(this.errors);
                } else {
                    let users = this.users
                    for (let i = 0; i < users.length; i++) {
                        if (users[i]._id === user._id) {
                            this.users = this.users.filter(dUser => dUser._id !== user._id);
                        }
                    }
                    this.userDeleted = true;
                }
            });
        },
    },
}
</script>

<style scoped>

</style>