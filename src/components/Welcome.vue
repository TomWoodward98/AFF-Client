<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12 mb-5">
                <h1>Welcome to the University Support System</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-lg-6 p-3">
                <router-link to="/login" class="btn btn-primary">Login</router-link>
            </div>
            <div class="col-sm-12 col-lg-6 p-3">
                <router-link to="/register" class="btn btn-outline-primary">Register</router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Welcome',
  data() {
    return {
      
    };
  },
  methods: {
    
  },
};
</script>

<style>

</style>
