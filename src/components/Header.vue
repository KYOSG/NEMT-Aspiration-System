<template>
  <!-- header -->
  <div class="header">
    <div class="header_midil w">
      <div class="container-width">
        <div class="row d_flex">
          <div class="col-lg-9 col-md-12 col-sm-12">
            <div class="navbar-area">
              <nav class="site-navbar">
                <ul>
                  <li><a href="#">首页</a></li>
                  <li><a @click="this.$router.push('/SchoolInf');">院校库</a></li>
                  <li><a @click="this.$router.push('/MajorInf');" >专业库</a></li>
                  <div class="Login" v-show="!info.isLogin">
                    <li class="margina"><a @click="this.$router.push('/Signup');">注册</a></li>
                    <li><a @click="this.$router.push('/Login');">登录</a></li>
                  </div>

                  <div class="Login" v-show="info.isLogin">
                    <li class="margina"><a @click="LoginOut">退出</a></li>
                    <li><a @click="this.$router.push('/StudentHome');">个人主页</a></li>
                  </div>
                </ul>
                <button class="nav-toggler">
                  <span></span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { School } from '@element-plus/icons'
import { Collection } from '@element-plus/icons'
export default {
  name: "Header",
  data(){
    return{
      judge1: true,
      judge2: false,

      info:{
        identity:'',
        username:'',
        isLogin:false,
      }
    }
  },
  mounted() {
    this.info.identity = window.sessionStorage.getItem("identity");
    this.info.username = window.sessionStorage.getItem("username");
    if (this.info.username!==null){
      this.info.isLogin = true;
    }
  },
  methods:{
    LoginOut(){
      window.sessionStorage.clear();

      this.$notify({
        title: '退出成功',
        message: '再会',
        type: 'success'
      });
      this.$router.push('/Home');
    },
  },
  components: {
    School,
    Collection
  }
}

</script>

<style scoped>
.w {
  width: 1200px;
  margin: auto 0;
}

.header{
  width: 100%;
  background: #F49F0A;

  font-size: 20px;
  font-family: "Microsoft YaHei UI",serif;
}


.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.container-width {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  clear: both;
  display: block;
  box-sizing: border-box;
}

.logo a {
  font-size: 50px;
  color: #323757;
  font-weight: 700;
  font-style: italic;
}

.header_midil {
  /* position: relative; */
  background: #F49F0A;
  /* width: 100%; */
  height: 20px;
  padding: 10px 0px;
  margin: 0 auto;
}

.site-navbar {
  position: relative;
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.site-navbar ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  cursor:pointer
}

.site-navbar ul li a {
  color: #fff;
  font-size: 14px;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
}

.site-navbar ul li {
  padding-right: 30px;
}

.site-navbar ul li:last-child {
  padding-right: 0;
}

.site-navbar ul li a:hover {
  color: #323757;
}

.site-navbar ul li a.active {
  color: #323757;
}

.site-navbar .button {
  position: absolute;
  right: 10px;
  padding-right: 10px;
}

.site-navbar .button li {
  float: left;
  background-color: #F49F0A;
}

.nav-toggler {
  border: 3px solid #fff;
  padding: 5px;
  background-color: transparent;
  cursor: pointer;
  height: 39px;
  display: none;
  z-index: 99999;
}

.nav-toggler span,
.nav-toggler span:before,
.nav-toggler span:after {
  width: 28px;
  height: 3px;
  background-color: #fff;
  display: block;
  transition: .3s;
}

.nav-toggler span:before {
  content: '';
  transform: translateY(-9px);
}

.nav-toggler span:after {
  content: '';
  transform: translateY(6px);
}
ul.email li a {
  color: #fff;
  text-transform: uppercase;
  font-size: 17px;
}

ul.email li a i {
  color: #fff;
  font-size: 19px;
  padding-right: 10px;
}


.el-input_inner input{
  width: 10px;
}

.front-face {
  text-align: center;
}

.site-navbar ul .Login{
  position: absolute;
  float: right;
  right: 0;

}
.Login li {
  float: right;
  margin-left: 20px;
}
</style>
