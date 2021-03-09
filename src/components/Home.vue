<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12 text-center">
                <h1>University of Knowledge Ticket area</h1>
            </div>
        </div>
        <div class="row my-3">
            <div class="col-2 text-left">
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
            <div class="col-8" v-if="!currentUser.isClient">
                <ticket-filters
                    :currentUser="currentUser"
                    @filterAllocatedTickets="getAllocatedTickets($event)"
                    @removeUserTicketFilter="removeUserFilter()"
                ></ticket-filters>
            </div>
            <div class="col-2 text-right ml-auto">
                <logout
                    :currentUser="currentUser"
                ></logout>
            </div>
        </div>
        <div v-if="suspended.suspendedTicketAlert" class="row mt-3 mx-0">
            <alert-component></alert-component>
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
import AlertComponent from "./extra/AlertComponent";
import CreateTicket from "./tickets/CreateTicket";
import CreateColumn from "./tickets/CreateColumn";
import DropdownButtons from "./extra/DropdownButtons";
import Logout from "./extra/Logout";
import TicketFilters from "./tickets/TicketFilters";
import TicketColumns from "./tickets/TicketColumns";
import TicketModal from "./tickets/TicketModal";

export default {
    name: 'Home',
    components: {
        AlertComponent,
        CreateTicket,
        CreateColumn,
        DropdownButtons,
        Logout,
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
            suspended: {
                suspendedTicketAlert: false,
                suspendedTicket: {},
            },
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.user;
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
            this.selectedTicket = ticket
        },
        getAllocatedTickets(user) {
            let filteredTickets = this.tickets.filter(ticket => ticket.allocated_to._id === user);
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
