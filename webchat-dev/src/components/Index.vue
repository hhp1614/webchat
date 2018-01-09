<template>
    <!-- <h1>多人聊天室</h1>
        <div>
            <p v-for="(item, index) in msg" :key="index">{{item}}</p>
        </div>
        <input type="text" v-model="sendMsg">
        <button @click="add">send</button> -->
    <!-- <mu-row class="chat-warrp">
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
            <mu-row class="chat-box-bottom"> -->

    <!-- <mu-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6" style="width: 80%;float:left" /> -->
    <!-- <mu-text-field hintText="提示文字" style="width: 80%;" /><br/> -->
    <!-- <input type="text" v-model="sendMsg"> -->
    <!-- <mu-raised-button label="Primary" style="width:20%;height:100%;float:left" /> -->
    <!-- <button @click="add">send</button> -->
    <!-- </mu-row>
        </mu-col>
        <mu-col width="5" tablet="10" desktop="10"></mu-col>
    </mu-row> -->
    <mu-card class="chat-card">
        <mu-card-header class="card-header">
            <div>多人聊天室</div>
        </mu-card-header>
        <mu-card-text class="card-text">
            <p v-for="(item, index) in msg" :key="index">
                <!-- 进入或离开 -->
                <span v-if="!item.user">{{item}}</span>

                <!-- 聊天信息 -->
                <span v-else>
                    <!-- 用户名 -->
                    <span :style="{color: item.user === name ? 'red' : 'blue'}">{{item.user}}:</span>
                    <!-- 信息 -->
                    <span>{{item.msg}}</span>
                </span>
            </p>
        </mu-card-text>
        <mu-card-actions class="card-flex">
            <mu-text-field hintText="输入发送文本" class="card-input" v-model="sendMsg" />
            <mu-raised-button label="send" @click="add" primary/>
        </mu-card-actions>
    </mu-card>
</template>

<script>
export default {
    data() {
        return {
            user: '',
            msg: [],
            sendMsg: '',
            name: ''
        }
    },
    mounted() {
        this.userComeIn()
    },
    methods: {
        userComeIn() {
            let user = sessionStorage.getItem('user')
            this.name = user;
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
            // let str = `${data.user}: ${data.msg}`
            this.msg.push(data)
            this.sendMsg = ''
        },
        enter(val) {
            this.msg.push(val)
            console.log(val);
        },
        leave(val) {
            this.msg.push(val)
        }
    }
};
</script>
<style>
.card-flex {
  display: flex;
}
.chat-card {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.card-header {
  font-size: 20px;
}
.card-text {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 1px #ddd;
}
.card-input {
  width: 70%;
  flex: 1;
}
</style>
