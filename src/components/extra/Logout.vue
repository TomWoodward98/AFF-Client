<template>
    <button @click="logout(currentUser)" data-toggle="collapse" data-target="#navbarNavAltMarkup" class="nav-item nav-link border-0 bg-transparent">Logout</button>
</template>

<script>
export default {
    name: "Logout",
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
        logout(currentUser){
            const baseURL = 'http://localhost:3000/api/logout';
            this.$http.post(baseURL, currentUser).then(res => {
                this.$store.commit('SET_CURRENT_USER', {})
                this.$store.commit('SET_TICKETS', [])
                this.$router.push('/welcome')
            });
        },
    },

}
</script>

<style scoped>

</style>