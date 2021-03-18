import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        departments: [],
        userTypes: [],
        statuses: [],
        tickets: [],
        users: [],
        isConnected: false,
    },
    mutations: {
        SET_CURRENT_USER(state, user) {
            state.user = user;
        },
        SET_STATUSES(state, statuses) {
            state.statuses = statuses;
        },
        SET_TICKETS(state, tickets) {
            state.tickets = tickets;
        },
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_DEPARTMENTS(state, departments) {
            state.departments = departments;
        },
        SET_USER_TYPES(state, userTypes) {
            state.userTypes = userTypes;
        },
        SOCKET_CONNECT(state) {
            state.isConnected = true;
        },
        SOCKET_DISCONNECT(state) {
            state.isConnected = false;
        },
    },
    getters: {
        currentUser: state => state.user,
        statuses: state => state.statuses,
        tickets: state => state.tickets,
        users: state => state.users,
        departments: state => state.departments,
        userTypes: state => state.userTypes,
    },
    actions: {
        getCurrentUser({commit}) {
            axios.get('/api/get-current-user').then((res) => {
                commit('SET_CURRENT_USER', res.data);
            });
        },
        getStatuses({commit}) {            
            axios.get('/ticket/get-columns').then(response => {
                commit('SET_STATUSES', response.data);
            });
        },
        getTickets({commit}) { 
            axios.get('/ticket/get-tickets').then(response => {
                commit('SET_TICKETS', response.data);
            });
        },
        getUsers({commit}) { 
            axios.get('/api/get-users').then(response => {
                commit('SET_USERS', response.data);
            });
        },
        getDepartments({commit}) { 
            axios.get('/department/get-departments').then(response => {
                commit('SET_DEPARTMENTS', response.data);
            });
        },
        getUserTypes({commit}) { 
            axios.get('/api/get-user-type').then(response => {
                commit('SET_USER_TYPES', response.data);
            });
        },
    },
})