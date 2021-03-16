<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12 text-center">
                <h1>University of Knowledge Ticket area</h1>
            </div>
        </div>
        <div class="row my-3">
            <div class="col-3 text-left">
                <dropdown-buttons
                    :currentUser="currentUser"
                ></dropdown-buttons>
                <create-ticket
                    :currentUser="currentUser"
                    :users="users"
                    dataTarget="createTicketModal"
                    @ticketCreated="addTicket($event)"
                ></create-ticket>
                <create-column
                    dataTarget="createColumnModal"
                    @columnCreated="addColumn($event)"
                ></create-column>
            </div>
            <div class="col-9" v-if="!currentUser.isClient">
                <ticket-filters
                    :currentUser="currentUser"
                    :statuses="columns"
                    :users="users"
                    @filterAllocatedTickets="getAllocatedTickets($event)"
                    @filterCreatedByTickets="getCreatedByTickets($event)"
                    @filterRaisedByTickets="getRaisedByTickets($event)"
                    @filterStatusTickets="getStatusTickets($event)"
                    @removeUserTicketFilter="removeUserFilter()"
                ></ticket-filters>
            </div>
        </div>
        <div v-if="suspended.suspendedTicketAlert" class="row mt-3 mx-0">
            <alert-component></alert-component>
        </div>
        <div  v-if="chatCreated" class="col-12 alert alert-success alert-dismissible fade show" role="alert">
            <strong>Chat for ticket created</strong> 
            Open the ticket to open the chat
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div v-if="columns.length > 0" class="row mx-auto overflow-x-scroll flex-nowrap">
            <ticket-columns 
                v-for="column in columns" 
                :currentUser="currentUser"
                :key="column._id"
                :tickets="tickets"
                :column="column"
                :columns="columns"
                :users="users"
                @selectedTicket="loadModal($event)"
                @userHasTicketSuspended="alertUserSus($event)"
            ></ticket-columns>
            <ticket-modal
                v-if="Object.keys(selectedTicket).length !== 0"
                :currentUser="currentUser"
                :users="users"
                :ticket="selectedTicket"
                :statuses="columns"
                :key="selectedTicket._id"
                dataTarget="viewTicketModal"
                @ticketEdited="editTicket($event)"
                @openChat="openChat($event)"
            ></ticket-modal>
            <chat-modal 
                v-if="isChatOpen && selectedTicket"
                dataTarget="ticketChatModal"
                :key="selectedTicket.chat._id"
                :ticket="selectedTicket"
                :currentUser="currentUser"
            ></chat-modal>
        </div>
    </div>
</template>

<script>
import AlertComponent from "./extra/AlertComponent";
import CreateTicket from "./tickets/CreateTicket";
import CreateColumn from "./tickets/CreateColumn";
import DropdownButtons from "./extra/DropdownButtons";
import TicketFilters from "./tickets/TicketFilters";
import TicketColumns from "./tickets/TicketColumns";
import TicketModal from "./tickets/TicketModal";
import ChatModal from './chat/ChatModal.vue';

export default {
    name: 'Home',
    components: {
        AlertComponent,
        CreateTicket,
        CreateColumn,
        ChatModal,
        DropdownButtons,
        TicketFilters,
        TicketColumns,
        TicketModal,
    },
    data() {
        return {
            users: [],
            tickets: [],
            columns: [],
            chatCreated: false,
            selectedTicket: {},
            suspended: {
                suspendedTicketAlert: false,
                suspendedTicket: {},
            },
            isChatOpen: false,
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.user;
        },
        storeTickets() {
            return this.$store.state.tickets;
        }
    },
    created() {
        const baseURL = 'http://localhost:3000/api/get-users';
        this.$http.get(baseURL).then(res => {
            this.users = res.data;
        });
        this.$http.get('http://localhost:3000/ticket/get-tickets').then(response => {
            this.tickets = response.data;
        });
        // TODO:: Make it so we get this from store
        this.$http.get('http://localhost:3000/ticket/get-columns').then(response => {
            this.columns = response.data;
        });
    },
    mounted() {
        let chatModal = document.getElementById('ticketChatModal')
        if (!chatModal) {
            this.isChatOpen = false;
        }
    },
    methods: {
        addTicket(ticket) {
            this.tickets.push(ticket);
        },
        editTicket(ticket) {
            let tickets = this.tickets
            for (let i = 0; i < tickets.length; i++) {
                if (tickets[i]._id === ticket._id) {
                    this.tickets.splice(i, 1, ticket);
                }
            }
        },
        addColumn(column) {
            this.columns.push(column);
        },

        getAllocatedTickets(user) {
            let filteredTickets = this.storeTickets.filter(ticket => ticket.allocated_to._id === user);
            this.tickets = filteredTickets;
        },
        getCreatedByTickets(user) {
            let filteredTickets = this.storeTickets.filter(ticket => ticket.created_by._id === user);
            this.tickets = filteredTickets;
        },
        getRaisedByTickets(user) {
            let filteredTickets = this.storeTickets.filter(ticket => ticket.raised_by._id === user);
            this.tickets = filteredTickets;
        },
        getStatusTickets(status) {
            let filteredTickets = this.storeTickets.filter(ticket => ticket.status._id === status);
            this.tickets = filteredTickets;
        },


        removeUserFilter() {
            this.$http.get('http://localhost:3000/ticket/get-tickets').then(response => {
                this.tickets = response.data;
            });
        },
        alertUserSus(ticket) {
            this.suspended.suspendedTicketAlert = true;
            this.suspended.suspendedTicket = ticket;
        },
        loadModal(ticket) {
            this.selectedTicket = ticket;
            // this.$emit('selectedTicket', this.ticket);
        },
        openChat(ticket) {
            if (ticket.chat !== null) {
                this.isChatOpen = true;
            } else {
                let form = {
                    ticket: ticket._id,
                };
                this.$http.post('http://localhost:3000/chat/create-chat', form).then(res => {
                    this.selectedTicket.chat = res.data
                    this.isChatOpen = true;
                    this.chatCreated = true;
                });
            }
        }
    },
};
</script>

<style>

</style>
