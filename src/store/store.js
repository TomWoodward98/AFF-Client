import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        statuses: [],
        tickets: [],
        isConnected: false,
        socketMessage: ''
    },
    mutations: {
        SET_CURRENT_USER(state, user) {
            state.user = user
        },
        SET_STATUSES(state, statuses) {
            state.statuses = statuses
        },
        SET_TICKETS(state, tickets) {
            state.tickets = tickets
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
        statuses: state => state.statuses,
        tickets: state => state.tickets,
    },
    actions: {
        getCurrentUser({commit}) {
            axios.get('http://localhost:3000/api/get-current-user').then((res) => {
                commit('SET_CURRENT_USER', res.data);
            });
        },
        getStatuses({commit}) {            
            axios.get('http://localhost:3000/ticket/get-columns').then(response => {
                commit('SET_STATUSES', response.data);
            });
        },
        getTickets({commit}) { 
            axios.get('http://localhost:3000/ticket/get-tickets').then(response => {
                commit('SET_TICKETS', response.data);
            });
        }
    },
})