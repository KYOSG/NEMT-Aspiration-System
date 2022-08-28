<template>

  <div class="body">
    <img src="../../img/banner1.png" alt="">
    <div class="login_box">
      <div class="box">
        <h2>登录</h2>
        <input type="text" class="typing" placeholder="用户名" v-model="loginForm.username">
        <input type="password" class="typing" placeholder="密码" v-model="loginForm.password">
        <a class="button" @click="login">登录</a>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    login() {
      this.$http({
        method: 'get',
        url: '/user/login?username=' + this.loginForm.username + '&&password=' + this.loginForm.password,
      }).then(({data}) => {
        if (data.code !== 200) {
          this.$notify({
            title: '登陆失败',
            message: data.msg,
            type: 'warning'
          });
        }else {
          if (data.role !== "admin") {
            this.messageName = this.loginForm.username
          } else {
            this.messageName = '管理员'
          }
          //登陆提示
          this.$notify({
            title: '登陆成功',
            message: '你好，' + this.messageName,
            type: 'success'
          });
          window.sessionStorage.setItem("userId", data.user.userId);
          window.sessionStorage.setItem("username", this.loginForm.username);
          window.sessionStorage.setItem("role", data.user.role);
          window.sessionStorage.setItem("Login", "1");
          window.sessionStorage.setItem("rank",data.user.rank);
          //在此处进行身份识别和跳转到对应的页面。
           if (data.user.role === "admin")
             this.$router.push("/ManagerHome");
           else if (data.user.role === "student")
             this.$router.push("/StudentHome");
           else if (data.user.role === "teacher")
             this.$router.push("/TeacherHome");
        }
      })
    }
  }
}
</script>
<style scoped>

.body {
  position: relative;
  width: 100%;
  height: 100%;
}

.box h2 {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-weight: 400;
  margin-top: 20px;
  font-size: 24px;
}

.login_box {
  margin-top: 100px;
  position: absolute;
  float: left;
  left: 20%;
  top: 7%;
  width: 400px;
  height: 575px;
  background-color: #FFFFFF;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}

.body img {
  float: left;
  width: 100%;
  height: 100%;
}

.typing {
  display: inline-block;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  border: none
}

.typing {
  background-color: #FFFFFF;
  border-bottom: 1px solid #EAEAEA;

}

input {
  outline: none;
}

.box a {
  display: inline-block;
  width: 250px;
  height: 50px;
  margin-top: 30px;
  background-color: #F49F0A;
  border: 1px solid #F49F0A;
  border-radius: 25px;
  text-align: center

}

.button{
  cursor:pointer;
}

.box a {
  font-size: 20px;
  color: #FFFFFF;
  line-height: 50px;
  text-decoration: none;
}


</style>
