<template>
    <!-- <h1>多人聊天室</h1>
        <div>
            <p v-for="(item, index) in msg" :key="index">{{item}}</p>
        </div>
        <input type="text" v-model="sendMsg">
        <button @click="add">send</button> -->
    <mu-row class="chat-warrp">
        <mu-col width="5" tablet="10" desktop="10"></mu-col>
        <mu-col width="90" tablet="80" desktop="80" class="chat-box">
            <mu-col width="100" tablet="100" desktop="100">
                <h1>多人聊天室</h1>
            </mu-col>
            <mu-col width="100" tablet="100" desktop="100" class="chat-box-main">
                <mu-card style="height:100%;">
                    <div>
                        <p v-for="(item, index) in msg" :key="index">{{item}}</p>
                    </div>
                </mu-card>
            </mu-col>
            <mu-row class="chat-box-bottom">

                <!-- <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6" style="width: 80%;float:left" /> -->
                <mu-text-field hintText="提示文字" style="width: 80%;" /><br/>
                <!-- <input type="text" v-model="sendMsg"> -->
                <mu-raised-button label="Primary" style="width:20%;height:100%;float:left" />
                <!-- <button @click="add">send</button> -->
            </mu-row>
        </mu-col>
        <mu-col width="5" tablet="10" desktop="10"></mu-col>
    </mu-row>
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
            this.$socket.emit('enter', { user: user })
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
.chat-warrp {
  width: 100%;
  height: 100%;
  padding: 10px 0;
  /* border: 1px double orange; */
}
.chat-box {
  width: 100%;
  height: 100%;
}
.chat-box-main {
  /* border: 1px solid #c2bfbf; */
  height: 70%;
}
/* .chat-box-bottom {
  height: 8%;
} */
/* .mu-raised-button {
  width: 100%;
  height: 100%;
} */
.msg-input,
.msg-input input,
.msg-send,
.msg-send .send-button {
  width: 100%;
  height: 100%;
}
</style>
