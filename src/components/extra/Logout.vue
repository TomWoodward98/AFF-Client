<template>
    <div class="row">  
        <div class="col-12">
            <button @click="logout(currentUser)" class="btn btn-outline-primary">Logout</button>
        </div>
    </div>
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
                this.$store.commit('setCurrentUser', {})
                this.$router.push('/welcome')
            });
        },
    },

}
</script>

<style scoped>

</style>