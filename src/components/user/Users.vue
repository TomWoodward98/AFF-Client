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
                    class="list-group-item"
                >
                    {{ user.email }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import CreateUser from "./CreateUser";
// import EditUser from "./EditUser";

export default {
    name: "Users",
    components: {
        CreateUser,
        // EditUser,
    },
    data() {
        return {
            users: [],
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
        }
    },
}
</script>

<style scoped>

</style>