<template>
    <div class="col-sm-12 col-md-3 my-1 mr-1 bg-light-grey">
        <div class="row">
            <div class="col-12">
                <p>{{ column.name }}</p>
            </div>
            <tickets
                v-for="ticket in filteredTickets" 
                :key="ticket.id"
                :currentUser="currentUser" 
                :ticket="ticket"
                @selectedTicket="loadModal($event)"
                @userHasTicketSuspended="alertUserSus($event)"
            ></tickets>
        </div>
    </div>
</template>

<script>
import Tickets from "./Tickets";

export default {
    name: "TicketColumns",
    components: {
        Tickets,
    },
    data() {
        return {
            selectedTicket: {},
        };
    },
    props: {
        currentUser: Object,
        tickets: Array,
        column: Object,
        columns: Array,
        users: Array,
    },
    computed: {
        filteredTickets() {
            return this.tickets.filter(item => this.column.name.includes(item.status.name));
        },
    },
    methods: {
        loadModal(ticket) {
            this.selectedTicket = ticket;
            this.$emit('selectedTicket', ticket);
        },
        alertUserSus(ticket) {
            this.$emit('userHasTicketSuspended', ticket);
        },
    },
}
</script>

<style scoped>

</style>
