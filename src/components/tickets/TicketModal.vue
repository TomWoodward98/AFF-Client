<template>
    <div class="modal fade" :id="dataTarget" tabindex="-1" role="dialog" aria-labelledby="ticketModalLabel" aria-hidden="true">
        <div class="modal-dialog d-flex align-items-center modal-dialog-centered" role="document">
            <div v-if="ticket" class="modal-content">
                <div class="modal-header">
                    <h5 v-if="!edit" class="modal-title" id="ModalLabel">{{ ticket.title }}</h5>
                    <input
                        v-else
                        autocomplete="off"
                        class="form-control"
                        id="editTitle"
                        name="editTitle"
                        required
                        type="text"
                        :placeholder="ticket.title"
                        :value="ticket.title"
                        @change="changeTitle($event)"
                    >
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-left">
                    <div class="row word-break-word">
                        <div class="col-6">
                            <div class="col-12">
                                <p class="m-0"><strong>Description</strong></p>
                                <p v-if="ticket.info && !edit">{{ ticket.info }}</p>
                                <textarea
                                    v-else
                                    autocomplete="off"
                                    class="form-control resize-none"
                                    id="editInfo"
                                    name="editInfo"
                                    required
                                    type="text"
                                    :placeholder="ticket.info"
                                    :value="ticket.info"
                                    @change="changeInfo($event)"
                                >
                                </textarea>
                                <p class="m-0"><strong>Ticket Status</strong></p>
                                <p v-if="ticket.status && !edit">{{ ticket.status.name }}</p>
                                <select
                                    v-else
                                    autocomplete="off"
                                    class="form-control"
                                    id="editStatus"
                                    name="editStatus"
                                    @change="changeStatus($event)"
                                >
                                    <option :value="ticket.status.name">{{ ticket.status.name }}</option>
                                    <option v-for="status in statuses" :key="status.id" :value="status.name">{{ status.name }}</option>
                                </select>
                                <p class="m-0"><strong>Created at</strong></p>
                                <p>{{ ticket.created_at }}</p>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="col-12">
                                <p class="m-0"><strong>Assigned to</strong></p>
                                <p v-if="!edit">{{ ticket.allocated_to ? ticket.allocated_to.email : 'Assign a team member' }}</p>
                                <select
                                    v-else
                                    autocomplete="off"
                                    class="form-control"
                                    id="editAssigned"
                                    name="editAssigned"
                                    @change="changeAllocated($event)"
                                >
                                    <option :value="ticket.allocated_to.email">{{ ticket.allocated_to.email }}</option>
                                    <option v-for="user in users" :key="user.id" :value="user.email">{{ user.email }}</option>
                                </select>
                                <p class="m-0"><strong>Created By</strong></p>
                                <p>{{ ticket.created_by ? ticket.created_by.email : '' }}</p>
                                <p class="m-0"><strong>Raised By</strong></p>
                                <p>{{ ticket.raised_by ? ticket.raised_by.email : '' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button 
                    @click="edit = !edit" 
                    :class="edit ? 'btn btn-outline-info' : 'btn btn-info'"
                    >{{ edit ? 'Cancel' : 'Edit' }}</button>
                    <button 
                        class="btn btn-primary" 
                        v-if="edit" 
                        @click="editTicket()"
                    >Edit Ticket</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "TicketModal",
    data() {
        return {
            edit: false,
            form: {
                title: '',
                info: '',
                status: null,
                allocatedTo: null,
            },
        };
    },
    props: {
        dataTarget: String,
        ticket: Object,
        statuses: Array,
        users: Array,
    },
    methods: {
        changeTitle(event) {
            this.form.title = event.target.value
        },
        changeInfo(event) {
            this.form.info = event.target.value
        },
        changeStatus(event) {
            this.form.status = event.target.value
        },
        changeAllocated(event) {
            this.form.allocatedTo = event.target.value
        },
        editTicket() {
            let failed = false;

            if (this.form.title.trim() === '') {
                this.form.title = this.ticket.title;
            }

            if (this.form.info.trim() === '') {
                this.form.info = this.ticket.info;
            }
            
            if (this.form.status === null) {
                this.form.status = this.ticket.status;
            }

            if (this.form.allocatedTo === null) {
                this.form.allocatedTo = this.ticket.allocatedTo;
            }

            if (failed) {
                return false;
            }

            this.edittingTicket = true;

            this.$http.post('http://localhost:3000/ticket/create-ticket', this.form).then(response => {
                if (this.errors) {
                    this.edittingTicket = false;
                    this.handleErrors(this.errors);
                } else {
                    this.form.title = '';
                    this.form.info = '';
                    this.form.status = null;
                    this.form.allocatedTo = null;
                    this.$emit('ticketEditted', response.data);
                    // Event emit where we get the created ticket 
                    $('#' + this.dataTarget).modal('hide')
                }
            });
        }
    },
}
</script>

<style scoped>

</style>