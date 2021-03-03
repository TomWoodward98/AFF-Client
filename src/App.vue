<template>
    <div id="app" class="m-0">
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <router-link to="/home" class="nav-item nav-link">Home</router-link>
                        <router-link to="/users" class="nav-item nav-link">Users</router-link>
                        <router-link to="/departments" class="nav-item nav-link">Departments</router-link>
                    </div>
                </div>
            </nav>
        </header>
        <div class="container">
            <div class="row">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'App',
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
