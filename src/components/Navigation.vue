<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/home" class="nav-item nav-link" data-toggle="collapse" data-target="#navbarNavAltMarkup">Home</router-link>
                    <router-link to="/users" class="nav-item nav-link" data-toggle="collapse" data-target="#navbarNavAltMarkup">Users</router-link>
                    <router-link to="/departments" class="nav-item nav-link" data-toggle="collapse" data-target="#navbarNavAltMarkup">Departments</router-link>
                    <logout
                        :currentUser="currentUser"
                    ></logout>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import Logout from "./extra/Logout";

export default {
    name: 'Navigation',
    components: {
        Logout,
    },
    props: {
        currentUser: Object
    },
    
}
</script>