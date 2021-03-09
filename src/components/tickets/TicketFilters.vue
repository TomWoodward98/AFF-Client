<template>
    <div class="row text-right">
        <div class="col-12">
            <button v-if="!ticketsAllocatedFiltered" @click="filterAllocatedTickets()" class="btn btn-info">Allocated to me</button>
            <button v-if="ticketsAllocatedFiltered" @click="removeFilter()" class="btn btn-info">All tickets</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "TicketFilters",
    data() {
        return {
            ticketsAllocatedFiltered: false,
        };
    },
    props: {
        currentUser: Object,
    },
    mounted() {

    },
    methods: {
        filterAllocatedTickets() {
            this.$emit('filterAllocatedTickets', this.currentUser._id);
            this.ticketsAllocatedFiltered = true;
        },
        removeFilter() {
            this.$emit('removeUserTicketFilter', this.currentUser._id);
            this.ticketsAllocatedFiltered = false;
        },
    },

}
</script>

<style scoped>

</style>
