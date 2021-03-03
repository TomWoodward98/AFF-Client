<template>
    <div class="modal fade" :id="dataTarget" tabindex="-1" role="dialog" aria-labelledby="ticketModalLabel" aria-hidden="true">
        <div class="modal-dialog d-flex align-items-center modal-dialog-centered" role="document">
            <div v-if="ticket" class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel">{{ ticket.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-left">
                    <div class="row word-break-word">
                        <div class="col-6">
                            <div class="col-12">
                                <p class="m-0"><strong>Description</strong></p>
                                <p v-if="ticket.info">{{ ticket.info }}</p>
                                <p class="m-0"><strong>Created at</strong></p>
                                <p>{{ ticket.created_at }}</p>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="col-12">
                                <p class="m-0"><strong>Ticket Status</strong></p>
                                <p><!--{{ ticket.status }}  --></p>
                                <p class="m-0"><strong>Assigned to</strong></p>
                                <p>{{ ticket.allocated_to ? ticket.allocated_to.email : 'Assign a team member' }}</p>
                                <p class="m-0"><strong>Created By</strong></p>
                                <p>{{ ticket.created_by ? ticket.created_by.email : '' }}</p>
                                <p class="m-0"><strong>Raised By</strong></p>
                                <p>{{ ticket.raised_by ? ticket.raised_by.email : '' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "TicketModal",
    components: {

    },
    data() {
        return {

        };
    },
    props: {
        dataTarget: String,
        ticket: Object
    },
    mounted() {

    },
    methods: {
        
    },
}
</script>

<style scoped>

</style>