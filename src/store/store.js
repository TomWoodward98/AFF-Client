import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
    },
    mutations: {
        setCurrentUser: (state, user) => {
            state.user = user
        },
    },
    getters: {
        currentUser: state => state.user,
    },
    actions: {
        getCurrentUser({commit}) {
            axios.get('http://localhost:3000/api/get-current-user').then((res) => {
                commit('setCurrentUser', res.data);
            });
        }
    },
})