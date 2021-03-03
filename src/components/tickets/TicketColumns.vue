<template>
    <div class="row mx-auto overflow-x-scroll flex-nowrap max-w-100 h-100">
        <div class="col-3 my-1 mr-1 bg-light-grey">
            <div class="row">
                <div class="col-12">
                    <p>Open</p>
                </div>
                <div 
                    v-for="ticket in tickets" 
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
        <div class="col-3 m-1 bg-light-grey">
            <p>Suspended</p>
        </div>
        <div class="col-3 m-1 bg-light-grey">
            <p>Expired</p>
        </div>
        <div class="col-3 m-1 bg-light-grey">
            <p>Cancelled</p>
        </div>
        <div class="col-3 m-1 bg-light-grey">
            <p>Closed</p>
        </div>
        <div class="col-3 my-1 ml-1 bg-light-grey">
            <p>Complete</p>
        </div>
        <ticket-modal
            :ticket="selectedTicket"
            dataTarget="viewTicketModal"
        ></ticket-modal>
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
    },
    mounted() {

    },
    methods: {
        loadViewTicketModal(ticket) {
            this.selectedTicket = ticket
        },
    },
}
</script>

<style scoped>

</style>
