import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        isConnected: false,
        socketMessage: ''
    },
    mutations: {
        SET_CURRENT_USER(state, user) {
            state.user = user
        },
        SOCKET_CONNECT(state) {
            state.isConnected = true;
        },
        SOCKET_DISCONNECT(state) {
            state.isConnected = false;
        },
        SOCKET_MESSAGECHANNEL(state, message) {
            state.socketMessage = message
        }
    },
    getters: {
        currentUser: state => state.user,
    },
    actions: {
        getCurrentUser({commit}) {
            axios.get('http://localhost:3000/api/get-current-user').then((res) => {
                commit('SET_CURRENT_USER', res.data);
            });
        }
    },
})