<template>
  <div class="start">
    <div class="card-start">
      <mu-card>
        <mu-flexbox orient="vertical">
          <mu-flexbox-item order="0" class="input-flex">
            <h1>多人在线聊天</h1>
          </mu-flexbox-item>
        </mu-flexbox>
        <!-- <router-link to="/index">to index</router-link>
        <a href="javascript:;" @click="toIndex">to index</a> -->
        <mu-flexbox class="card-input" orient="vertical">
          <mu-flexbox-item order="0" class="input-flex">
            <mu-text-field hintText="用户名" v-model="user" />
          </mu-flexbox-item>
          <mu-flexbox-item order="1" class="input-flex">
            <mu-text-field type="password" hintText="密码" v-model="passwd" />
          </mu-flexbox-item>
          <mu-flexbox-item order="2" class="input-flex">
            <mu-text-field type="password" hintText="确认密码" v-model="confirmPasswd" v-show="ok" />
          </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item order="1" class="button-flex">
            <mu-flat-button :label="btn" backgroundColor="skyblue" @click="login" />
          </mu-flexbox-item>
          <mu-flexbox-item order="0">
          </mu-flexbox-item>
          <mu-flexbox-item order="2">
          </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item order="2" class="text-small">
            <a href="javascript:;" @click="tabLogin">{{message}}</a>
          </mu-flexbox-item>
          <mu-flexbox-item order="0">
          </mu-flexbox-item>
          <mu-flexbox-item order="1">
          </mu-flexbox-item>
        </mu-flexbox>
      </mu-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      passwd: "",
      confirmPasswd: "",
      ok: true,
      btn: "注册",
      message: "有账号去登陆"
    };
  },
  methods: {
    tabLogin() {
      this.ok = !this.ok;
      if (this.ok) {
        this.btn = "注册";
        this.message = "有账号去登陆";
      } else {
        this.btn = "登陆";
        this.message = "注册账号";
      }
    },
    // toIndex() {
    //   this.$router.replace({ path: "/index" });
    // },
    register() {
      this.$http
        .post(this.api + "/register", {
          user: this.user,
          passwd: this.passwd,
          confirmPasswd: this.confirmPasswd
        })
        .then(response => {
          let res = response.data;
          if (res.status) {
            console.log(res.data);
            console.log(res.msg);
            sessionStorage.setItem("user", res.data);
            this.$router.replace({ path: "/index" });
          } else {
            console.log("error!");
          }
        });
    },
    login() {
      if (this.ok) {
        this.register();
      } else {
        this.$http
          .post(this.api + "/login", {
            user: this.user,
            passwd: this.passwd
          })
          .then(response => {
            let res = response.data;
            if (res.status) {
              console.log(res.data);
              console.log(res.msg);
              sessionStorage.setItem("user", res.data);
              this.$router.replace({ path: "/index" });
            } else {
              console.log("error!");
            }
          });
      }
    }
  }
};
</script>

<style lang="less">
@text-center: center;
.start {
  width: 100%;
  height: 100%;
}
.card-start {
  width: 80%;
  margin: 0 auto;
}
.card-start .card-input {
  // border: 1px solid orange;
}
.input-flex {
  text-align: @text-center;
}
.button-flex button {
  width: 100%;
}
.text-small a {
  // font-size: 0.1em;
  text-decoration: underline;
}
</style>
