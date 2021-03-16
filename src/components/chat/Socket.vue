<template>
    <div class="card bg-info">
        <div class="card-header text-white">
            <h4>My Chat Apps {{ connections }}</h4>
            <button 
                v-if="!isConnected" 
                class="btn btn-warning" 
                @click.prevent="startChat()"
            >Connect to Chat</button>
        </div>
        <ul class="list-group list-group-flush text-right">
            <li class="list-group-item" v-for="message in messages" :key="message.id">
                <span>{{ message.message }}
                    <small>{{ message.user }}</small>
                </span>
            </li>
        </ul>

        <div class="card-body">
            <form @submit.prevent="send()">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="newMessage" placeholder="Enter message here">
                    <input type="submit" value="submit" class="btn btn-sm btn-info ml-1">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Socket from './Socket';
import SocketIO from 'socket.io-client';

export default {
    name: 'Socket',
    data() {
        return {
            newMessage: null,
            messages: [],
            typing: false,
            username: null,
            ready: false,
            info: [],
            connections: 0,
            isConnected: false,
            socketMessage: '',
            socket: this.loadSocket,
        };
    },
    watch: {
        socket() {
            console.log('connected');
            this.socket.on('connected', (data) => {
                this.isConnected = true;
                this.connections++;
                this.socketMessage = data;
            });
        }
    },
    sockets: {
        // connect() { // Fired when the socket connects.
        //     this.isConnected = true;
        // },
        // disconnect() {
        //     this.isConnected = false;
        // },
        // messageChannel(data) { // Fired when the server sends something on the "messageChannel" channel.
        //     this.socketMessage = data
        // },
    },
    methods: {
        startChat() {
            let roomId = 4
            let socket = SocketIO('http://localhost:4000', {
                query: { roomId },
            });
            this.$emit('startedChat', socket);
            this.socket = socket;
        },
        send() {
            this.messages.push({
                message: this.newMessage,
                type: 0,
                user: 'Me',
            });

            this.socket.emit('chat-message', {
                message: this.newMessage,
                user: this.username
            });
            this.loadMessages();
            this.newMessage = null;
        },
        loadMessages() {
            this.socket.on('chat-message', (data) => {
                this.messages.push({
                    message: data.message,
                    type: 1,
                    user: data.user,
                });
            });
        }
    },
};
</script>

<style>

</style>
