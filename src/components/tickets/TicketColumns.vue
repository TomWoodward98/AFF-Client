<template>
    <div class="row mx-auto overflow-x-scroll flex-nowrap max-w-100 h-100">
        <div class="col-3 my-1 mr-1 bg-light-grey">
            <div class="row">
                <div class="col-12">
                    <p>Open</p>
                </div>
                <div v-for="ticket in tickets" :key="ticket.id" class="col-12 my-1">
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
    </div>
</template>

<script>

export default {
    name: "TicketColumns",
    data() {
        return {

        };
    },
    props: {
        tickets: Array,
    },
    mounted() {

    },
    methods: {
        
    },
}
</script>

<style scoped>

</style>
