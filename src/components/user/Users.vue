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
            <div class="col-12 pl-0">
                <ul v-if="users.length > 0" class="list-group col-12 mx-3">
                    <user-list-item
                        v-for="user in users" 
                        :key="user.id" 
                        :user="user"
                        @editModal="modalOpen($event)"
                    ></user-list-item>
                </ul>
            </div>
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
import UserListItem from "./UserListItem";
import EditUser from "./EditUser";

export default {
    name: "Users",
    components: {
        CreateUser,
        UserListItem,
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
        modalOpen(user) {
            this.loadedUser = user;
            this.open = true;
        },
        addUser(user) {
            this.users.push(user);
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
    },
}
</script>

<style scoped>

</style>