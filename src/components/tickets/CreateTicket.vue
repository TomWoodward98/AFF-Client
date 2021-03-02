<template>
    <div class="modal fade" :id="dataTarget" tabindex="-1" role="dialog" aria-labelledby="ticketModalLabel" aria-hidden="true">
        <div class="modal-dialog d-flex align-items-center modal-dialog-centered" role="document">
            <div class="modal-content">
                <form 
                    id="createTicketForm"
                    action="/create-ticket"
                    autocomplete="off"
                    method="post"
                >
                    <div class="modal-header">
                        <h5 class="modal-title" id="ticketModalLabel">Create Ticket</h5>
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
                                    placeholder="Enter Ticket Title"
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
                                <label for="title">Ticket Information</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <textarea
                                    autocomplete="off"
                                    class="form-control"
                                    :class="{ 'is-invalid' : info_error }"
                                    id="info"
                                    name="info"
                                    required
                                    type="text"
                                    placeholder="Enter Ticket Information"
                                    v-model="form.info"
                                >
                                </textarea>
                                <span
                                    class="invalid-feedback"
                                    role="alert"
                                    v-if="info_error">
                                    <strong>{{ info_error }}</strong>
                                </span>
                            </div>
                        </div>
                        <!-- TODO - Can only do this if support worker or admin -->
                        <div class="form-group row mb-0">
                            <div class="col-12 text-left">
                                <label for="title">Allocate Ticket</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-12">
                                <select
                                    autocomplete="off"
                                    class="form-control"
                                    :class="{ 'is-invalid' : allocated_error }"
                                    id="allocatedTo"
                                    name="allocatedTo"
                                    v-model="form.allocatedTo"
                                >
                                    <option value=""></option>
                                    <option v-for="user in users" :key="user.id" :value="user">{{ user.email }}</option>
                                </select>
                                <span
                                    class="invalid-feedback"
                                    role="alert"
                                    v-if="info_error">
                                    <strong>{{ info_error }}</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                        <button id="createTicketBtn" type="button" class="btn btn-secondary" @click.prevent="createTicket()">Create Ticket</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateTicket",
    data() {
        return {
            users: null,
            form : {
                title: '',
                info: '',
                allocatedTo: null,
            },
            title_error: false,
            info_error: false,
            allocated_error: false,
        };
    },
    props: {
        dataTarget: String,
    },
    created() {
        const baseURL = 'http://localhost:3000/api/getUsers';
        this.$http.get(baseURL).then(res => {
            this.users = res.data;
        });
    },
    mounted() {

    },
    methods: {
        createTicket() {
            let failed = false;

            this.title_error = false;
            this.info_error = false;
            this.allocated_error = false;

            if (this.form.title.trim() === '') {
                failed = true;
                this.title_error = 'Please give this ticket a title'
            }

            if (this.form.info.trim() === '') {
                failed = true;
                this.info_error = 'Please a description of the ticket'
            }

            if (failed) {
                return false;
            }

            this.creatingTicket = true;

            this.$http.post('http://localhost:3000/ticket/create-ticket', this.form).then(response => {
                if (this.errors) {
                    this.creatingTicket = false;
                    this.handleErrors(this.errors);
                } else {
                    $('#' + this.dataTarget).modal('hide')
                }
            });
        }
    },

}
</script>

<style scoped>

</style>
