<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12 text-center">
                <h1>University of Knowledge Ticket area</h1>
            </div>
        </div>
        <div class="row my-3">
            <div class="col-3 text-left">
                <button 
                    type="button"
                    class="btn btn-secondary"
                    data-target="#createTicketModal"
                    data-toggle="modal"
                >
                    Add ticket
                </button>
                <create-ticket
                    dataTarget="createTicketModal"
                    @ticketCreated="addTicket($event)"
                ></create-ticket>
            </div>
            <ticket-filters></ticket-filters>
        </div>
        <ticket-columns
            :tickets="tickets"
        ></ticket-columns>
    </div>
</template>

<script>
import CreateTicket from "./tickets/CreateTicket";
import TicketFilters from "./tickets/TicketFilters";
import TicketColumns from "./tickets/TicketColumns";

export default {
    name: 'Home',
    components: {
        CreateTicket,
        TicketFilters,
        TicketColumns,
    },
    data() {
        return {
            tickets: [],
        };
    },
    mounted() {
        this.$http.get('http://localhost:3000/ticket/get-tickets').then(response => {
            this.tickets = response.data;
        });
    },
    methods: {
        addTicket(ticket) {
            this.tickets.push(ticket);
        }
    },
};
</script>

<style>

</style>
