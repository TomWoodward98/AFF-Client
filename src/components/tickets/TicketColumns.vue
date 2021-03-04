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
                        <div class="col-12 p-3 bg-grey">
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
            // this.selectedTicket = ticket
        },
    },
}
</script>

<style scoped>

</style>
