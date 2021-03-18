<template>
    <li
        class="list-group-item row p-2"
        :class="{ 'border border-danger' : !loadedUser.approved }"
    >
        <div class="col-12">
            <div class="row align-items-center">
                <div class="col-6">
                    {{ loadedUser.first_name }} {{ loadedUser.last_name }} ({{loadedUser.user_type.type}})
                </div>
                <div class="col-6">
                    <div class="row align-items-center">
                        <div class="col-sm-12 col-md-4 mb-1">
                            <button
                                type="button"
                                class="btn btn-info"
                                data-target="#editUserModal"
                                data-toggle="modal"
                                @click="modalOpen(loadedUser)"
                            >
                                Edit
                            </button>
                        </div>
                        <div class="col-sm-12 col-md-4 mb-1">
                            <button
                                v-if="!loadedUser.approved"
                                type="button"
                                class="btn btn-outline-info"
                                @click="approveUser(loadedUser)"
                            >
                                Approve
                            </button>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <button class="btn btn-danger" type="button" data-toggle="collapse" :data-target="'#collapseDel-' + user._id" aria-expanded="false" aria-controls="collapseDel">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="collapse col-12 my-3" :id="'collapseDel-' + loadedUser._id">
                    <div class="col-12 card card-body">
                        <div class="row">
                            <p class="col-12">Are you sure you want to delete {{ loadedUser.first_name }}?</p>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    @click="deleteUser(loadedUser)"
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
        
        <edit-user
            v-if="open"
            dataTarget="editUserModal"
            @userUpdated="editUser($event)"
            :user="loadedUser"
        ></edit-user>
    </li>
</template>

<script>
import EditUser from "./EditUser";

export default {
    name: "UserListItem",
    components: {
        EditUser,
    },
    data() {
        return {
            loadedUser: this.user,
            open: false,
        };
    },
    props: {
        user: Object,
    },
    methods: {
        modalOpen(user) {
            this.$emit('editModal', user);
            this.open = true;
        },
        editUser(user) {
            this.$emit('userUpdated', user);
            this.loadedUser = user;
            this.open = false;
        },
        approveUser(user) {
            let form = 
            {
                user: user,
                approved: true,
            }
            this.$http.post('/api/approve-user', form).then(response => {
                if (this.errors) {
                    this.handleErrors(this.errors);
                } else {
                    this.editUser(response.data);
                }
            });
        },
        deleteUser(user) {
            this.$emit('delete', user);
        }
    },
}
</script>

<style scoped>

</style>