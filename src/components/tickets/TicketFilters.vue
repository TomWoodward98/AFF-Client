<template>
    <div class="col-9">
        <div class="row text-right">
            <div class="col-4">
                <button v-if="!ticketsFiltered" @click="filterTickets()" class="btn btn-primary">My Tickets</button>
                <button v-if="ticketsFiltered" @click="removeFilter()" class="btn btn-primary">All Tickets</button>
            </div>
            <div class="col-4">
                <button class="btn btn-warning">Filter 2</button>
            </div>
            <div class="col-4">
                <button class="btn btn-danger">Filter 3</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TicketFilters",
    data() {
        return {
            ticketsFiltered: false,
        };
    },
    props: {
        currentUser: Object,
    },
    mounted() {

    },
    methods: {
        filterTickets() {
            this.$emit('filterUsersTickets', this.currentUser._id);
            this.ticketsFiltered = true;
        },
        removeFilter() {
            this.$emit('removeUserTicketFilter', this.currentUser._id);
            this.ticketsFiltered = false;
        },
    },

}
</script>

<style scoped>

</style>
