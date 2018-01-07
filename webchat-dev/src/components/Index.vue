<template>
    <div>
        <h1>index</h1>
        <div>
            <p v-for="(item, index) in msg" :key="index">{{item}}</p>
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
            msg: [],
            sendMsg: ''
        }
    },
    mounted() {
        this.userComeIn()
    },
    methods: {
        userComeIn() {
            let user = sessionStorage.getItem('user')
            this.$socket.emit('enter', {user: user})
        },
        add() {
            let obj = {
                user: sessionStorage.getItem('user'),
                msg: this.sendMsg
            }
            this.$socket.emit('message', obj)
        }
    },
    sockets: {
        connect() {
            console.log('socket connected')
        },
        message(data) {
            console.log(data)
            let str = `${data.user}: ${data.msg}`
            this.msg.push(str)
            this.sendMsg = ''
        },
        enter(val) {
            this.msg.push(val)
        },
        leave(val) {
            this.msg.push(val)
        }
    }
};
</script>

<style>

</style>
