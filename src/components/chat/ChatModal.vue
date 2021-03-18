<template>
    <div class="modal fade" :id="dataTarget" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="ticketModalLabel" aria-hidden="true">
        <div class="modal-dialog d-flex align-items-center modal-dialog-centered" role="document">
            <div id="m-content" class="modal-content col-12">
                <div id="m-header" class="modal-header row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <h4>{{ ticket.title }} chat</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="row align-items-center">
                            <div class="col-6 text-left">
                                <h6 class="m-0">Users connected to chat - {{ connections }}</h6>
                            </div>
                            <div class="col-6 text-right
                            ">
                                <button 
                                    v-if="!isConnected" 
                                    class="btn btn-warning" 
                                    @click.prevent="startChat()"
                                >Connect to Chat</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="m-body"  style="overflow-y: scroll;" class="modal-body row text-left bg-light-grey pt-0">
                    <ul  v-if="isConnected" id="m-messages" class="list-group list-group-flush text-right col-12 pb-3 pr-0">
                        <li class="list-group-item" :class="{ 'bg-light-blue text-white' : !isOwnMessage(message) }" v-for="message in messages" :key="message.id">
                            <div class="col-12" :class="{ 'text-left' : !isOwnMessage(message) }">
                                <p class="m-0">{{ message.content }}</p>
                            </div>
                        </li>
                    </ul>
                    <div v-if="isConnected" id="m-input" class="col-12 mt-auto">
                        <div class="row">
                            <div class="col-9 p-0">
                                <input type="text" class="form-control" v-model="form.newMessage" placeholder="Enter message here">
                            </div>
                            <div class="col-3 text-right p-0">
                                <button type="button" @click.prevent="send()" class="btn btn-primary">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="m-footer" class="modal-footer">
                    <button
                        @click="switchToTicket()"
                        class="btn btn-info"
                        data-target="#viewTicketModal"
                        data-toggle="modal"
                    >Back to ticket Chat</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import SocketIO from 'socket.io-client';

export default {
    name: "ChatModal",
    data() {
        return {
            messages: [],
            typing: false,
            ready: false,
            info: [],
            connections: 0,
            socketMessage: '',
            socket: null,
            form: {
                newMessage: '',
                sent_by: this.currentUser,
                chat: null
            },
            loadedTicket: this.ticket,
        }
    },
    props: {
        currentUser: Object,
        dataTarget: String,
        ticket: Object,
    },
    watch: {
        socket() {
            if (this.socket) {
                this.socket.on('connected', (data) => {
                    this.$store.commit('SOCKET_CONNECT')
                    this.connections++;
                    this.socketMessage = data;
                });
                this.socket.on('disconnected', (data) => {
                    this.$store.commit('SOCKET_DISCONNECT')
                    this.connections--;
                    this.socket = null;
                });
                this.socket.on('chatMessage', (data) => {
                    this.messages.push({
                        content: data.newMessage,
                        chat: data.chat,
                        sent_by: data.sent_by,
                    });
                });
            }
            let modal = document.getElementById('ticketChatModal');
            let modalHeight = modal.offsetHeight;
            let header = document.getElementById('m-header');
            let headerHeight = header.offsetHeight;
            let mFoot = document.getElementById('m-footer');
            let footerHeight = mFoot.offsetHeight;
            document.getElementById('m-body').style.height = 'calc(' + modalHeight + 'px' + ' - ' + headerHeight + 'px - ' + footerHeight + 'px - ' + footerHeight + 'px)';
        },
    },
    created() {
        if (this.ticket.chat) {
            let id = this.ticket._id
            this.$http.get('/chat/get-chat/' + id).then(res => {
                this.form.chat = res.data._id;
                this.loadMessages(res.data);
            });
        }
    },
    computed: {
        isConnected() {
            return this.$store.state.isConnected;
        }
    },
    methods: {
        switchToTicket() {
            $('#' + this.dataTarget).modal('hide')
            this.$emit('selectedTicket', this.ticket);
            this.socket.emit('disconnected');
        },        
        startChat() {
            let roomId = this.ticket._id
            let socket = SocketIO('http://localhost:' + process.env.VUE_APP_SOCKET_PORT, {
                query: { roomId },
            });
            this.socket = socket;
        },
        send() {
            if (this.socket) {
                this.$http.post('/chat/send-message', this.form).then(res => {
                    this.messages.push({
                        content: res.data.content,
                        chat: res.data.chat,
                        sent_by: res.data.sent_by,
                    });
                });

                this.socket.emit('chat-message', this.form);
                
                this.form.newMessage = '';
            }
        },
        loadMessages(chat) {
            let id = chat._id;
            this.$http.get('/chat/get-messages/'+ id).then(res => {
                this.messages = res.data
            })
        },
        isOwnMessage(message) {
            return message.sent_by === this.currentUser._id;
        }
    },
}
</script>

<style scoped>

</style>