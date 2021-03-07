<template>
    <div class="modal fade" :id="dataTarget" tabindex="-1" role="dialog" aria-labelledby="ticketModalLabel" aria-hidden="true">
        <div class="modal-dialog d-flex align-items-center modal-dialog-centered" role="document">
            <div v-if="ticket" class="modal-content">
                <form 
                    id="editTicketForm"
                    action="/edit-ticket"
                    autocomplete="off"
                    method="post"
                >
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
                                    <p v-if="(ticket.info && !edit) && !clientAddInfo">{{ ticket.info }}</p>
                                    <textarea
                                        v-if="clientAddInfo || edit"
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
                                        v-else-if="ticket.status && edit"
                                        autocomplete="off"
                                        class="form-control"
                                        id="editStatus"
                                        name="editStatus"
                                        @change="changeStatus($event)"
                                    >
                                        <option :value="ticket.status">{{ ticket.status.name }}</option>
                                        <option v-for="status in statuses" :key="status._id" :value="status._id">{{ status.name }}</option>
                                    </select>
                                    <p class="m-0"><strong>Created at</strong></p>
                                    <p>{{ ticket.created_at }}</p>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="col-12">
                                    <p class="m-0"><strong>Assigned to</strong></p>
                                    <p v-if="ticket.allocated_to && !edit">{{ ticket.allocated_to ? ticket.allocated_to.email : 'Assign a team member' }}</p>
                                    <select
                                        v-else-if="ticket.allocated_to && edit"
                                        autocomplete="off"
                                        class="form-control"
                                        id="editAssigned"
                                        name="editAssigned"
                                        @change="changeAllocated($event)"
                                    >
                                        <option :value="ticket.allocated_to">{{ ticket.allocated_to.email }}</option>
                                        <option v-for="user in users" :key="user._id" :value="user._id">{{ user.email }}</option>
                                    </select>
                                    <p class="m-0"><strong>Created By</strong></p>
                                    <p>{{ ticket.created_by ? ticket.created_by.email : '' }}</p>
                                    <p class="m-0"><strong>Raised By</strong></p>
                                    <p>{{ ticket.raised_by ? ticket.raised_by.email : '' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="modal-footer">
                    <button
                        v-if="!currentUser.isClient"
                        @click.prevent="edit = !edit" 
                        :class="edit ? 'btn btn-outline-info' : 'btn btn-info'"
                    >
                        {{ edit ? 'Cancel' : 'Edit' }}
                    </button>
                    <button 
                        class="btn btn-primary" 
                        v-if="edit" 
                        @click.prevent="editTicket()"
                    >
                        Edit Ticket
                    </button>
                    <button
                        v-if="currentUser.isClient && isUsersTicket && ticket.status.name === 'Solved'"
                        class="btn btn-outline-info" 
                        @click.prevent="clientEdit('reopen')"
                    >
                        Reopen
                    </button>
                    <button
                        v-if="currentUser.isClient && isUsersTicket && ticket.status.name === 'Solved'"
                        class="btn btn-info" 
                        @click.prevent="clientEdit('close')"
                    >
                        Confirm and close
                    </button>
                    <button
                        v-if="currentUser.isClient && isUsersTicket && ticket.status.name === 'Suspended'"
                        class="btn btn-info" 
                        @click="clientAddInfo = !clientAddInfo"
                    >
                       {{ clientAddInfo ? 'Cancel' : 'Add more Information' }} 
                    </button>
                    <button
                        v-if="clientAddInfo"
                        class="btn btn-info" 
                        @click="editTicket()"
                    >
                       Confirm Edit 
                    </button>
                    <button
                        v-if="(currentUser.isClient && isUsersTicket) && (ticket.status.name === 'Suspended' || ticket.allocated_to === null)"
                        class="btn btn-info" 
                        @click.prevent="clientEdit('cancel')"
                    >
                        Cancel Ticket
                    </button>
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
                id: null,
                title: '',
                info: '',
                status: null,
                allocatedTo: null,
            },
            clientAddInfo: false,
        }
    },
    props: {
        currentUser: Object,
        dataTarget: String,
        ticket: Object,
        statuses: Array,
        users: Array,
    },
    computed: {
        isUsersTicket() {
            if (this.ticket.raised_by && this.currentUser) {
                return this.ticket.raised_by._id === this.currentUser._id;
            }
        }
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
        clientEdit(editedStatus) {
            for (let i = 0; i < this.statuses.length; i++) {
                if (this.statuses[i].name === 'Open' && editedStatus === 'reopen') {
                    this.form.status = this.statuses[i]._id;
                    this.editTicket();
                    break;
                } else if (this.statuses[i].name === 'Closed' && editedStatus === 'close') {
                    this.form.status = this.statuses[i]._id;
                    this.editTicket();
                    break;
                } else if (this.statuses[i].name === 'Cancelled' && editedStatus === 'cancel') {
                    this.form.status = this.statuses[i]._id;
                    this.editTicket();
                    break;
                }
            }
        },
        addInfoToTicket() {
            this.clientAddInfo = true;
        },
        editTicket() {
            let failed = false;

            this.form.ticket = this.ticket;

            if (this.form.title.trim() === '') {
                this.form.title = this.ticket.title;
            }

            if (this.form.info.trim() === '') {
                this.form.info = this.ticket.info;
            }
            
            if (this.form.status === null) {
                this.form.status = this.ticket.status;
            } else {
                let statuses = this.statuses
                for (let i = 0; i < statuses.length; i++) {
                    if (statuses[i]._id === this.form.status) {   
                        this.form.status = statuses[i];
                    }
                }
            }

            if (this.form.allocatedTo === null) {
                this.form.allocatedTo = this.ticket.allocated_to;
            } else {
                let users = this.users
                for (let i = 0; i < users.length; i++) {
                    if (users[i]._id === this.form.allocatedTo) {   
                        this.form.allocatedTo = users[i];
                    }
                }
            }

            if (failed) {
                return false;
            }

            this.edittingTicket = true;

            this.$http.post('http://localhost:3000/ticket/update-ticket', this.form).then(response => {
                if (this.errors) {
                    this.edittingTicket = false;
                    this.handleErrors(this.errors);
                } else {
                    this.form.ticket = null
                    this.form.title = '';
                    this.form.info = '';
                    this.form.status = null;
                    this.form.allocatedTo = null;
                    this.edit = false;
                    this.$emit('ticketEdited', response.data);
                    $('#' + this.dataTarget).modal('hide')
                }
            });
        }
    },
}
</script>

<style scoped>

</style>