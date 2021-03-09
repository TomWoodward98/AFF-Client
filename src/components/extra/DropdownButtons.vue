<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Add
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button 
                class="dropdown-item" 
                data-target="#createTicketModal"
                data-toggle="modal"
            >Add Ticket</button>
            <button 
                v-if="currentUser.isAdmin"
                class="dropdown-item"
                data-target="#createColumnModal"
                data-toggle="modal"
            >Add Column</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "DropdownButtons",
    data() {
        return {
            
        };
    },
    props: {
        currentUser: Object,
    },
    mounted() {

    },
    methods: {
        
    },

}
</script>

<style scoped>

</style>