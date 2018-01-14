<template>
    <mu-flexbox orient="vertical" style="height: 100%">
        <mu-appbar title="多人在线聊天室（测试版）">
            <mu-icon-button icon="close" slot="right" @click="logout" />
            <mu-icon-menu icon="menu" slot="left">
                <mu-menu-item leftIcon="home" title="主页" to="/" />
                <mu-menu-item leftIcon="account_circle" title="个人" />
                <mu-menu-item leftIcon="settings" title="设置" />
                <mu-menu-item leftIcon="info" title="关于" />
            </mu-icon-menu>
        </mu-appbar>
        <mu-flexbox-item basis="1">
            <mu-card class="chat-card" id="card">
                <mu-card-text class="card-text">
                    <div v-for="(item, index) in msg" :key="index" class="msg-box">
                        <span class="user-name" :style="{color: item.user === user ? 'red' : 'blue'}">
                            {{item.user}}:
                        </span>
                        <span>
                            {{item.msg}}
                        </span>
                    </div>
                </mu-card-text>
            </mu-card>
        </mu-flexbox-item>
        <mu-flexbox justify="center" align="baseline" wrap="nowrap" style="padding-top: 10px;">
            <mu-flexbox-item style="padding-left: 10px;">
                <mu-text-field hintText="输入发送文本" v-model="sendMsg" @keyup.native.enter="add" fullWidth />
            </mu-flexbox-item>
            <mu-flexbox-item grow="0" shrink="0" basis="100px">
                <mu-raised-button label="发送" @click="add" :disabled="sendMsg ? false : true" primary/>
            </mu-flexbox-item>
        </mu-flexbox>
    </mu-flexbox>
</template>

<script>
    export default {
        data() {
            return {
                msg: [],
                sendMsg: '',
                user: '', // 名字
                dom: '', // card 的 Dom 元素
            };
        },
        mounted() {
            this.userComeIn(); // 用户进入房间
            this.setCardHeight(); // 初始聊天内容框高度
            this.windowResize(); // 绑定窗口大小监听事件
        },
        methods: {
            setCardHeight() { // 获取并设置内容框高度为固定高度
                this.dom = document.getElementById('card');
                let height = this.dom.offsetHeight;
                this.dom.style.height = height + 'px';
            },
            windowResize() { // 监听窗口大小变化，并重置内容框的高度
                window.onresize = () => {
                    this.dom.style.height = '100%';
                    this.setCardHeight();
                };
            },
            userComeIn() { // 用户进入房间
                let user = sessionStorage.getItem('user');
                this.user = user;
                this.$socket.emit('enter', { user: user });
            },
            add() { // 发送消息
                if (this.sendMsg) {
                    let obj = {
                        user: sessionStorage.getItem('user'),
                        msg: this.sendMsg
                    };
                    this.$socket.emit('message', obj);
                    this.sendMsg = '';
                }
            },
            logout() {
                sessionStorage.clear();
                this.$router.push({ path: '/login' })
            }
        },
        sockets: {
            connect() {
                console.log('socket connected');
            },
            message(data) { // 接受广播消息
                console.log(data);
                // let str = `${data.user}: ${data.msg}`
                this.msg.push(data);
            },
            enter(val) { // 接受广播进入消息
                // console.log(val);
                // this.msg.push(val);
            },
            leave(val) { // 接受广播离开消息
                // this.msg.push(val);
            }
        }
    };
</script>
<style>
    .chat-card {
      height: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
    .card-text {
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-shadow: 1px 1px 2px 1px #ddd;
    }
    .msg-box {
      word-wrap: break-word;
    }
    .user-name {
      font-weight: bold;
    }
</style>
