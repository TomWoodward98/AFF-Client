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
                        <h5 v-if="!edit || currentUser.isAdmin" class="modal-title" id="ModalLabel">{{ ticket.title }}</h5>
                        <input
                            v-else-if="edit && !currentUser.isAdmin"
                            autocomplete="off"
                            class="form-control"
                            :class="{ 'is-invalid' : title_error }"
                            id="editTitle"
                            name="editTitle"
                            required
                            type="text"
                            :placeholder="ticket.title"
                            v-model="form.title"
                        >
                        <span
                            class="invalid-feedback"
                            role="alert"
                            v-if="title_error">
                            <strong>{{ title_error }}</strong>
                        </span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-left">
                        <div class="row word-break-word">
                            <div class="col-6">
                                <div class="col-12">
                                    <p class="m-0"><strong>Description</strong></p>
                                    <p v-if="(ticket.info && !edit) && !clientAddInfo || currentUser.isAdmin">{{ ticket.info }}</p>
                                    <textarea
                                        v-if="!currentUser.isAdmin && (clientAddInfo || edit)"
                                        autocomplete="off"
                                        class="form-control resize-none"
                                        :class="{ 'is-invalid' : info_error }"
                                        id="editInfo"
                                        name="editInfo"
                                        required
                                        type="text"
                                        :placeholder="ticket.info"
                                        v-model="form.info"
                                    >
                                    </textarea>
                                    <span
                                        class="invalid-feedback"
                                        role="alert"
                                        v-if="info_error">
                                        <strong>{{ info_error }}</strong>
                                    </span>
                                    <p class="m-0"><strong>Ticket Status</strong></p>
                                    <p v-if="(ticket.status && !edit) || currentUser.isAdmin">{{ ticket.status.name }}</p>
                                    <select
                                        v-else-if="!currentUser.isAdmin && (ticket.status && edit)"
                                        autocomplete="off"
                                        class="form-control"
                                        :class="{ 'is-invalid' : status_error }"
                                        id="editStatus"
                                        name="editStatus"
                                        v-model="form.status"
                                    >
                                        <option selected disabled value="">{{ticket.status.name}}</option>
                                        <option v-for="status in statuses" :key="status._id" :value="status">{{ status.name }}</option>
                                    </select>
                                    <span
                                        class="invalid-feedback"
                                        role="alert"
                                        v-if="status_error">
                                        <strong>{{ status_error }}</strong>
                                    </span>
                                    <p class="m-0"><strong>Created at</strong></p>
                                    <p class="m-0">{{ ticketTime }}</p>
                                    <p class="m-0">{{ ticketDate }}</p>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="col-12">
                                    <p class="m-0"><strong>Assigned to</strong></p>
                                    <p v-if="!edit">{{ ticket.allocated_to ? ticket.allocated_to.email : 'Assign a team member' }}</p>
                                    <select
                                        v-if="edit && currentUser.isAdmin"
                                        autocomplete="off"
                                        class="form-control"
                                        id="editAssigned"
                                        name="editAssigned"
                                        v-model="form.allocatedTo"
                                    >
                                        <option selected disabled value="">{{ ticket.allocated_to ? ticket.allocated_to.email : '' }}</option>
                                        <option v-for="user in supportUsers" :key="user._id" :value="user">{{ user.email }}</option>
                                    </select>
                                    <p class="m-0"><strong>Created By</strong></p>
                                    <p>{{ ticket.created_by ? ticket.created_by.email : '' }}</p>
                                    <p class="m-0"><strong>Raised By</strong></p>
                                    <p>{{ ticket.raised_by ? ticket.raised_by.email : '' }}</p>
                                    <p class="m-0"><strong>Department</strong></p>
                                    <p>{{ ticket.department.name ? ticket.department.name : department }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="modal-footer">
                    <button
                        v-if="!currentUser.isAdmin"
                        @click.prevent="switchToChat()"
                        class="btn btn-info"
                        data-target="#ticketChatModal"
                        data-toggle="modal"
                    >{{ ticket.chat !== null ? 'Chat' : 'Create Chat' }}</button>
                    <button
                        v-if="!currentUser.isClient"
                        @click.prevent="edit = !edit" 
                        :class="edit ? 'btn btn-outline-danger' : 'btn btn-info'"
                    >
                        {{ edit ? 'Cancel' : 'Edit' }}
                    </button>
                    <button 
                        class="btn btn-primary" 
                        v-if="edit" 
                        @click.prevent="editTicket()"
                    >
                        Confirm Edit
                    </button>
                    <button
                        v-if="currentUser.isClient && isUsersTicket && ticket.status.name === 'Solved'"
                        class="btn btn-outline-info" 
                        @click.prevent="clientEdit('reopen')"
                    >
                        Reopen
                    </button>
                    <button
                        v-if="!currentUser.isSupport && isUsersTicket && ticket.status.name === 'Solved'"
                        class="btn btn-info" 
                        @click.prevent="clientEdit('close')"
                    >
                        Confirm and close
                    </button>
                    <button
                        v-if="!currentUser.isSupport && isUsersTicket && ticket.status.name === 'Suspended'"
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
                        v-if="(isUsersTicket || currentUser.isSupport) && (isTicketSuspendedOrNotAllocated) && (!isTicketCancelled)"
                        class="btn btn-danger" 
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
                status: '',
                allocatedTo: '',
            },
            clientAddInfo: false,
            editingTicket: false,
            title_error: false,
            info_error: false,
            status_error: false,
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
        department() {
            let i = this.$store.state.departments.filter(item => this.ticket.department === item._id);
            return i[0].name
        },
        isUsersTicket() {
            if (this.ticket.raised_by && this.currentUser) {
                return this.ticket.raised_by._id === this.currentUser._id;
            }
        },
        isTicketSuspendedOrNotAllocated() {
            return this.ticket.status.name === 'Suspended' || this.ticket.allocated_to === null;
        },
        isTicketCancelled() {
            return this.ticket.status.name === 'Cancelled';
        },
        supportUsers() {
            return this.users.filter(user => user.user_type.type === 'support');
        },
        ticketTime() {
            let time = this.ticket.created_at.slice(11,19);
            return time;
        },
        ticketDate() {
            let year = this.ticket.created_at.slice(0,4);
            let month = this.ticket.created_at.slice(5,7);
            let day = this.ticket.created_at.slice(8,10);
            let date =  day + '-' + month + '-' + year;
            return date;
        },
    },
    methods: {
        clientEdit(editedStatus) {
            for (let i = 0; i < this.statuses.length; i++) {
                if (this.statuses[i].name === 'Open' && editedStatus === 'reopen') {
                    this.form.status = this.statuses[i];
                    this.editTicket();
                    break;
                } else if (this.statuses[i].name === 'Closed' && editedStatus === 'close') {
                    this.form.status = this.statuses[i];
                    this.editTicket();
                    break;
                } else if (this.statuses[i].name === 'Cancelled' && editedStatus === 'cancel') {
                    this.form.status = this.statuses[i];
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

            this.title_error = false;
            this.info_error = false;
            this.status_error = false;

            this.form.ticket = this.ticket;
            this.form.currentUser = this.currentUser;

            if (this.form.title.trim() === '') {
                this.form.title = this.ticket.title;
            }

            if (this.form.info.trim() === '') {
                this.form.info = this.ticket.info;
            }
            
            if (this.form.status === '') {
                this.form.status = this.ticket.status;
            }

            if (this.form.allocatedTo === '') {
                this.form.allocatedTo = this.ticket.allocated_to;
            }

            if (failed) {
                return false;
            }

            this.editingTicket = true;

            this.$http.post('/ticket/update-ticket', this.form).then(response => {
                if (response.data.Error) {
                    this.editingTicket = false;
                    this.handleErrors(response.data.Error);
                } else {
                    this.editingTicket = false;
                    this.form.title = '';
                    this.form.info = '';
                    this.form.status = '';
                    this.form.allocatedTo = '';
                    this.edit = false;
                    this.clientAddInfo = false;
                    this.$emit('ticketEdited', response.data);
                    $('#' + this.dataTarget).modal('hide')
                }
            });
        },
        handleErrors(sentError){
            if (sentError.ticket) {
                this.title_error = sentError.ticket;
                this.info_error = sentError.ticket;
                this.status_error = sentError.ticket;
            }
            if (sentError.title) {
                this.title_error = sentError.ticket;
            }
            if (sentError.info) {
                this.info_error = sentError.info;
            }
            if (sentError.status) {
                this.status_error = sentError.status;
            }
        },
        switchToChat() {
            $('#' + this.dataTarget).modal('hide');
            this.$emit('openChat', this.ticket);
        },
    },
}
</script>

<style scoped>

</style>