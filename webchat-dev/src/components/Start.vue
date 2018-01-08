<template>
  <mu-flexbox orient="vertical">
    <mu-flexbox-item>
      <mu-row>
        <mu-col width="100" tablet="100" desktop="100" class="box">
          <mu-card class="login-box" v-if="hasUser">
            <mu-card-header>
              <h1>登陆</h1>
            </mu-card-header>
            <mu-card-text>
              <mu-text-field v-model="loginForm.user" label="用户名" fullWidth labelFloat/>
              <mu-text-field v-model="loginForm.passwd" type="password" label="密码" fullWidth labelFloat/>
              <mu-raised-button label="登陆" @click="login(loginForm)" primary/>
              <mu-raised-button label="注册账号" @click="tabClick" secondary/>
            </mu-card-text>
          </mu-card>
          <mu-card class="login-box" v-else>
            <mu-card-header>
              <h1>注册</h1>
            </mu-card-header>
            <mu-card-text>
              <mu-text-field v-model="registerForm.user" label="用户名" fullWidth labelFloat/>
              <mu-text-field v-model="registerForm.passwd" type="password" label="密码" fullWidth labelFloat/>
              <mu-text-field v-model="registerForm.isPasswd" type="password" label="确认密码" fullWidth labelFloat/>
              <mu-raised-button label="注册" @click="register(registerForm)" primary/>
              <mu-raised-button label="登陆" secondary/>
            </mu-card-text>
          </mu-card>
        </mu-col>
        <mu-dialog :open="dialog">
            {{dialogText}}
            <mu-flat-button label="确定" slot="actions" primary @click="close"/>
          </mu-dialog>
      </mu-row>
    </mu-flexbox-item>
  </mu-flexbox>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        user: '',
        passwd: ''
      },
      registerForm: {
        user: '',
        passwd: '',
        isPasswd: ''
      },
      hasUser: true,
      dialog: false,
      dialogText: '',
      ok: false
    }
  },
  methods: {
    tabClick() {
      this.hasUser = !this.hasUser;
      this.loginForm = {
        user: '',
        passwd: ''
      }
      this.registerForm = {
        user: '',
        passwd: '',
        isPasswd: ''
      }
    },
    login(data) {
      if (data.user && data.passwd) {
        this.$http.post(this.api + '/login', {
          user: data.user,
          passwd: data.passwd
        })
        .then(response => {
            let res = response.data;
            if (res.status) {
              sessionStorage.setItem('user', res.data);
              this.dialog = true;
              this.dialogText = res.msg;
              this.ok = true;
            } else {
              this.dialog = true;
              this.dialogText = res.msg;
            }
          })
      } else {
        this.dialog = true;
        this.dialogText = '请正确填写用户名和密码';
      }
    },
    register(data) {
      let isTure = data.user && data.passwd && data.isPasswd &&  data.passwd == data.isPasswd;
      if (isTure) {
        this.$http.post(this.api + '/register', {
          user: data.user,
          passwd: data.passwd
        })
        .then(response => {
            let res = response.data;
            if (res.status) {
              sessionStorage.setItem('user', res.data);
              this.dialog = true;
              this.dialogText = res.msg;
              this.ok = true;
            } else {
              this.dialog = true;
              this.dialogText = res.msg;
            }
          })
      } else {
        this.dialog = true;
        this.dialogText = '请正确填写用户名和密码';
      }
    },
    close() {
      this.dialog = false;
      this.dialogText = '';
      this.loginForm.passwd = '';
      this.registerForm.passwd = '';
      this.registerForm.isPasswd = '';
      if (this.ok) {
        this.$router.push({path: '/index'});
      }
    }
  }
};
</script>

<style lang="less">
  .box {
    padding: 20px;
  }
  .login-box, .register-box {
    display: block;
    margin: 0 auto;
    text-align: center;
  }
</style>
