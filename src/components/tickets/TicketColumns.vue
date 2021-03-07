<template>
    <div class="col-3 my-1 mr-1 bg-light-grey">
        <div class="row">
            <div class="col-12">
                <p>{{ column.name }}</p>
            </div>
            <div 
                v-for="ticket in filteredTickets" 
                :key="ticket.id" 
                class="col-12 my-1 zoom"
                @click="loadViewTicketModal(ticket)"
                data-target="#viewTicketModal"
                data-toggle="modal"
            >
                <div class="row">
                    <div class="col-12 cursor-pointer">
                        <div 
                            class="col-12 p-3 bg-grey" 
                            :class="{'border border-danger drop-shadow' : ticketSuspended(ticket)}">
                            <p>{{ ticket.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TicketModal from "./TicketModal";

export default {
    name: "TicketColumns",
    components: {
        TicketModal,
    },
    data() {
        return {
            selectedTicket: {},
        };
    },
    props: {
        currentUser: {},
        tickets: Array,
        column: {},
    },
    computed: {
        filteredTickets() {
            return this.tickets.filter(item => this.column.name.includes(item.status.name));
        }
    },
    mounted() {

    },
    methods: {
        loadViewTicketModal(ticket) {
            this.$emit('selectedTicket', ticket);
        },
        ticketSuspended(ticket) {
            if ((ticket.raised_by._id === this.currentUser._id) && ticket.status.name === 'Suspended') {
                this.$emit('userHasTicketSuspended', ticket);
            }
            return ticket.status.name === 'Suspended';
        },
    },
}
</script>

<style scoped>

</style>
