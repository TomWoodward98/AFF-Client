<template>
    <div id="app" class="m-0">
        <navigation v-if="currentUser && currentUser.isAdmin"></navigation>
        <div class="container mt-3">
            <div class="row">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
    name: 'App',
    components: {
        Navigation
    },
    data() {
        return {
            
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.user;
        }
    },
};
</script>

<style>
#app {
  font-family: 'Titillium Web', sans-serif, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@import '~bootstrap/dist/css/bootstrap.css'
</style>
