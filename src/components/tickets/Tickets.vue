<template>
    <div 
        class="col-12 my-1 zoom"
        @click="loadViewTicketModal()"
        data-target="#viewTicketModal"
        data-toggle="modal"
    >
        <div class="row">
            <div class="col-12 cursor-pointer">
                <div 
                    class="col-12 p-3 bg-info text-off-white rounded" 
                    :class="{'border border-danger drop-shadow' : ticketSuspended }">
                    <p>{{ ticket.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Tickets",
    data() {
        return {
            
        };
    },
    props: {
        ticket: Object,
        currentUser: Object,
    },
    mounted() {
        if ((this.ticket.raised_by._id === this.currentUser._id) && this.ticket.status.name === 'Suspended') {
            this.$emit('userHasTicketSuspended', this.ticket);
        }
    },
    computed: {
        ticketSuspended() {
            return this.ticket.status.name === 'Suspended';
        }
    },
    methods: {
        loadViewTicketModal() {
            this.$emit('selectedTicket', this.ticket);
        },
    },

}
</script>

<style scoped>

</style>