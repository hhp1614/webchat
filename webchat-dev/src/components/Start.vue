<template>
    <div class="start">
        <div class="start-card">
            <!-- <input type="text" placeholder="用户名" v-model="user"> -->
            <!-- <input type="password" placeholder="密码" v-model="passwd">
            <input type="password" placeholder="确认密码"> -->
            <mu-text-field hintText="用户名" v-model="user" />
            <mu-text-field type="password" hintText="密码" v-model="passwd" />
            <mu-text-field type="password" hintText="确认密码" v-model="passwd" />
            <hr>
            <button @click="register">注册</button>
            <a href="">已有账号,切换登陆</a>
            <!-- <router-link to="/index">to index</router-link> -->
            <a href="javascript:;" @click="toIndex">to index</a>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      passwd: ""
    };
  },
  methods: {
    toIndex() {
      this.$router.replace({ path: "/index" });
    },
    register() {
      this.$http
        .post(this.api + "/register", {
          user: this.user,
          passwd: this.passwd
        })
        .then(response => {
          let res = response;
          if (res.status === 200) {
            console.log(res.data);
          } else {
            console.log("error");
          }
        });
    }
  }
};
</script>

<style lang="less">
html,
body {
  width: 100%;
  margin: 0;
  padding: 0;
}
.start {
  width: 100%;
  height: 100%;
}
.start-card {
  width: 50%;
  margin: 0 auto;
}
</style>
