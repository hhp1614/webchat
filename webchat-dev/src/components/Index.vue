<template>
    <div>
        <h1>index</h1>
        <div>
            <p v-for="item in msg" :key="item">{{item}}</p>
        </div>
        <input type="text" v-model="sendMsg">
        <button @click="add">send</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: '',
            msg: ['msg'],
            sendMsg: ''
        }
    },
    methods: {
        add() {
            this.$socket.emit('msg', {msg: this.sendMsg})
        }
    },
    sockets: {
        connect() {
            console.log('socket connected')
        },
        msg(val) {
            console.log(val)
            this.msg.push(val.msg)
            this.sendMsg = ''
        }
    }
};
</script>

<style>

</style>
