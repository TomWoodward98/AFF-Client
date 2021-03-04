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
                        Create
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button 
                            class="dropdown-item" 
                            data-target="#createTicketModal"
                            data-toggle="modal"
                        >Add Ticket</button>
                        <button 
                            class="dropdown-item"
                            data-target="#createColumnModal"
                            data-toggle="modal"
                        >Add Column</button>
                    </div>
                </div>
                <create-ticket
                    :users="users"
                    dataTarget="createTicketModal"
                    @ticketCreated="addTicket($event)"
                ></create-ticket>
                <create-column
                    dataTarget="createColumnModal"
                    @columnCreated="addColumn($event)"
                ></create-column>
            </div>
            <ticket-filters></ticket-filters>
        </div>
        <div v-if="columns.length > 0" class="row mx-auto overflow-x-scroll flex-nowrap max-w-100 h-100">
            <ticket-columns 
                v-for="column in columns" 
                :key="column.id"
                :tickets="tickets"
                :column="column"
                @selectedTicket="loadModal($event)"
            ></ticket-columns>
            <ticket-modal
                v-if="selectedTicket"
                :users="users"
                :ticket="selectedTicket"
                :statuses="columns"
                dataTarget="viewTicketModal"
                @ticketEditted="editTicket($event)"
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
        };
    },
    created() {
        const baseURL = 'http://localhost:3000/api/getUsers';
        this.$http.get(baseURL).then(res => {
            this.users = res.data;
        });
    },
    mounted() {
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
            let edittedTicket = this.tickets.find(x => x.id === ticket._id);
            let tickets = this.tickets
            for (i = 0; i < tickets.length; i++) {
                if (tickets[i] === edittedTicket) {
                    tickets[i] = edittedTicket;
                }
            }
        },
        addColumn(column) {
            this.columns.push(column);
        },
        loadModal(ticket) {
            this.selectedTicket = ticket;
        }
    },
};
</script>

<style>

</style>
