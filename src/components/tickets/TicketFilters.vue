<template>
    <div class="row text-right">
        <!-- <div class="col-12"> -->
            <!-- <button v-if="!ticketsAllocatedFiltered" @click="filterAllocatedTickets()" class="btn btn-info">Allocated to me</button>
            <button v-if="ticketsAllocatedFiltered" @click="removeFilter()" class="btn btn-info">All tickets</button> -->
            <div class="dropdown ml-auto">
                <button class="btn btn-info mr-1 dropdown-toggle" type="button" id="dropdownAllo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Allocated to...
                </button>
                <div class="dropdown-menu" id="dropdownAllo" data-toggle="dropdown" aria-labelledby="dropdownAllo">
                    <button @click="filterAllocatedTickets(user)" v-for="user in supportUsers" :key="user._id" class="dropdown-item"> {{ user.first_name }}</button>
                    <button v-if="ticketsAllocatedFiltered" @click="removeFilter()" class="dropdown-item bg-danger">All tickets</button>
                </div>
            </div>

            <div class="dropdown ml-auto">
                <button class="btn btn-info mr-1 dropdown-toggle" type="button" id="dropdownCreated" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Created by...
                </button>
                <div class="dropdown-menu" id="dropdownCreated" data-toggle="dropdown" aria-labelledby="dropdownCreated">
                    <button @click="filterCreatedByTickets(user)" v-for="user in users" :key="user._id" class="dropdown-item"> {{ user.first_name }}</button>
                    <button v-if="ticketsCreatedByFiltered" @click="removeFilter()" class="dropdown-item bg-danger">All tickets</button>
                </div>
            </div>

            <div class="dropdown ml-auto">
                <button class="btn btn-info mr-1 dropdown-toggle" type="button" id="dropdownRaise" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Raised by..
                </button>
                <div class="dropdown-menu" id="dropdownRaise" data-toggle="dropdown" aria-labelledby="dropdownRaise">
                    <button @click="filterRaisedByTickets(user)" v-for="user in users" :key="user._id" class="dropdown-item"> {{ user.first_name }}</button>
                    <button v-if="ticketsRaisedByFiltered" @click="removeFilter()" class="dropdown-item bg-danger">All tickets</button>
                </div>
            </div>

            <div class="dropdown ml-auto">
                <button class="btn btn-info mr-1 dropdown-toggle" type="button" id="dropdownStatus" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Status...
                </button>
                <div class="dropdown-menu" id="dropdownStatus" data-toggle="dropdown" aria-labelledby="dropdownStatus">
                    <button @click="filterStatusTickets(status)" v-for="status in statuses" :key="status._id" class="dropdown-item"> {{ status.name }}</button>
                    <button v-if="ticketsStatusFiltered" @click="removeFilter()" class="dropdown-item bg-danger">All tickets</button>
                </div>
            </div>

            <div class="dropdown ml-auto pr-3">
                <button class="btn btn-info dropdown-toggle" type="button" id="dropdownCreatedAt" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Created At...
                </button>
                <div class="dropdown-menu" id="dropdownCreatedAt" data-toggle="dropdown" aria-labelledby="dropdownCreatedAt">
                    <!-- <button @click="filterAllocatedTickets()" class="dropdown-item" >Allocated to...</button>" -->
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: "TicketFilters",
    data() {
        return {
            ticketsAllocatedFiltered: false,
            ticketsCreatedByFiltered: false,
            ticketsRaisedByFiltered: false,
            ticketsStatusFiltered: false,
        };
    },
    props: {
        currentUser: Object,
        statuses: Array,
        users: Array,
    },
    mounted() {

    },
    computed: {
        supportUsers() {
            return this.users.filter(user => user.user_type.type === 'support');
        },
    },
    methods: {
        filterAllocatedTickets(user) {
            this.$emit('filterAllocatedTickets', user._id);
            this.ticketsAllocatedFiltered = true;
        },
        filterCreatedByTickets(user) {
            this.$emit('filterCreatedByTickets', user._id);
            this.ticketsCreatedByFiltered = true;
        },
        filterRaisedByTickets(user) {
            this.$emit('filterRaisedByTickets', user._id);
            this.ticketsRaisedByFiltered = true;
        },
        filterStatusTickets(status) {
            this.$emit('filterStatusTickets', status._id);
            this.ticketsStatusFiltered = true;
        },
        removeFilter() {
            this.$emit('removeUserTicketFilter', this.currentUser._id);
            this.ticketsAllocatedFiltered = false;
            this.ticketsCreatedByFiltered = false;
            this.ticketsRaisedByFiltered = false;
            this.ticketsStatusFiltered = false;
        },
    },

}
</script>

<style scoped>

</style>
