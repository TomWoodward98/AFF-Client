<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12 text-center">
                <h1>University of Knowledge Ticket area</h1>
            </div>
        </div>
        <div class="row my-3">
            <div class="col-3 text-left">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Add
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button 
                            class="dropdown-item" 
                            data-target="#createTicketModal"
                            data-toggle="modal"
                        >Add Ticket</button>
                        <button 
                            v-if="currentUser.isAdmin"
                            class="dropdown-item"
                            data-target="#createColumnModal"
                            data-toggle="modal"
                        >Add Column</button>
                    </div>
                </div>
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
            <ticket-filters
                :currentUser="currentUser"
                @filterUsersTickets="getUserTickets($event)"
                @removeUserTicketFilter="removeUserFilter()"
            ></ticket-filters>
        </div>
        <div v-if="suspended.suspendedTicketAlert" class="row mt-3 mx-0">
            <div class="col-12 alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Alert!</strong> You have some suspended tickets that need attention
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
        <div v-if="columns.length > 0" class="row mx-auto overflow-x-scroll flex-nowrap max-w-100 h-100">
            <ticket-columns 
                v-for="column in columns" 
                :currentUser="currentUser"
                :key="column.id"
                :tickets="tickets"
                :column="column"
                @selectedTicket="loadModal($event)"
                @userHasTicketSuspended="alertUserSus($event)"
            ></ticket-columns>
            <ticket-modal
                v-if="selectedTicket"
                :currentUser="currentUser"
                :users="users"
                :ticket="selectedTicket"
                :statuses="columns"
                dataTarget="viewTicketModal"
                @ticketEdited="editTicket($event)"
            ></ticket-modal>
        </div>
    </div>
</template>

<script>
import CreateTicket from "./tickets/CreateTicket";
import CreateColumn from "./tickets/CreateColumn";
import TicketFilters from "./tickets/TicketFilters";
import TicketColumns from "./tickets/TicketColumns";
import TicketModal from "./tickets/TicketModal";

export default {
    name: 'Home',
    components: {
        CreateTicket,
        CreateColumn,
        TicketFilters,
        TicketColumns,
        TicketModal,
    },
    data() {
        return {
            users: [],
            tickets: [],
            columns: [],
            selectedTicket: {},
            currentUser: {},
            suspended: {
                suspendedTicketAlert: false,
                suspendedTicket: {},
            },
        };
    },
    created() {
        const baseURL = 'http://localhost:3000/api/getUsers';
        this.$http.get(baseURL).then(res => {
            this.users = res.data;
        });
        const userURL = 'http://localhost:3000/api/get-current-user';
        this.$http.get(userURL).then(res => {
            this.currentUser = res.data;
        });
        this.$http.get('http://localhost:3000/ticket/get-tickets').then(response => {
            this.tickets = response.data;
        });
    },
    mounted() {
        this.$http.get('http://localhost:3000/ticket/get-columns').then(response => {
            this.columns = response.data;
        });
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
        loadModal(ticket) {
            this.selectedTicket = ticket;
        },
        getUserTickets(user) {
            let filteredTickets = this.tickets.filter(ticket => ticket.raised_by._id === user);
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
    },
};
</script>

<style>

</style>
