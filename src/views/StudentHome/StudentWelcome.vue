<template>
  <div class="mainWindow w">
    <!-- 快捷导航栏 -->
    <section class="shortcut">
      <div class="w">
        <img src="../../img/shortcut1.png" alt="">
        <div class="fl">
          <ul>
            <li>欢迎使用高考志愿填报系统！&nbsp;</li>
          </ul>
        </div>
        <div class="fr">
          <ul>
            <li><a @click="StudentHomee">个人主页</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="SchoolSell">院校选择</a></li>
            <li></li>
            <li><a @click="MajorSell">专业选择</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="School">院校信息查询</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="Major">专业信息查询</a></li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 快捷导航栏结束 -->
    <el-card>
        <div class="mainInf">
          <img src="../../img/Touxiang.png" alt="">
          <h3 class="color">欢迎使用高考志愿填报系统!</h3>

        </div>
        <Applications />
    </el-card>
  </div>
</template>

<script>
import Applications from './Applications'
export default {
  name: "StudentWelcome",
  data(){
    return{
      info:[],
      aaa:{
        bbb:"1111111"
      }
    }
  },
  mounted() {
    this.getStudent()
  },
  methods: {
    StudentHomee:function (){
      this.$router.push('/StudentHome');
    },
    School:function (){
      this.$router.push('/SchoolInf');
    },
    Major:function (){
      this.$router.push('/MajorInf');
    },
    SchoolSell:function (){
      this.$router.push('/SchoolSel');
    },
    MajorSell:function (){
      this.$router.push('/MajorSel');
    },
    getStudent(){
      this.$http({
        method: 'post',
        url: '/User/getUserInformation',
        data: this.aaa
      }).then(res => {
        this.info = res.data;
      })
    }
  },
  components:{
    Applications,
  }

}
</script>

<style scoped>
.mainInf{
  margin-bottom: 40px;
}
.mainWindow{
  height: 1350px;
}
.copyrights {
  height: 198px;
  margin-top: 15px;
  background-color: rgb(2,48,71);
}


.el-card {
  margin-top: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 60px;
}

.color {
  color: #f49f0a;
  margin-bottom: 30px;
}

.el-card img {
  width: 80px;
  height: 80px;
}

.w {
  width: 1200px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}


.header {
  text-align: center;
  height: 120px;
  margin-bottom: 40px;
  border-bottom: 3px solid #F49F0A;
}

.header img {
  display:inline-block;
  float: left;
  width: 120px;
  height: 120px;
}

.header_h4 {
  margin: 48px 10px;
  font-size: 24px;
  color: #F49F0A;
}

.shortcut {
  height: 40px;
  background-color: #f5f5f5;
  line-height: 40px;
}

.shortcut img {
  float: left;
  width: 50px;
  height: 30px;
  margin-right: 20px;
}


.fr {
  margin-left: 50%;
}

.shortcut ul li {
  float: left;
  list-style: none;
}

.shortcut ul li a {
  color: #666666;
}

.shortcut ul li a:hover {
  color: #F49F0A;
}

.shortcut .fr ul li:nth-child(even) {
  width: 1px;
  height: 12px;
  background-color: #666;
  margin: 14px 15px 0;
}

.hedingh3 h4 {
  color: #fff;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  line-height: 23px;
  font-weight: 400;
  text-align: left;
}

.hedingh3 p {
  color: #fff;
  text-align: left;
}

ul.social_icon li {
  display: inline-block;
  margin: 0 2px;
}

ul.social_icon li a i {
  font-size: 17px;
  color: #323757;
  transition: ease-in all 0.5s;
  background: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50px;
  text-align: center;
}

ul.social_icon li a i:hover {
  color: #fff;
  transition: ease-in all 0.5s;
  background: #dc2727;
}

ul.menu_footer {
  text-align: left;
}

ul.menu_footer li a {
  color: #fff;
  font-size: 14px;
  line-height: 18px;
  margin-top: 10px ;
  margin-bottom: 10px ;

  display: block;
}

ul.menu_footer p {
  font-size: 14px;
}
ul.menu_footer li a:hover {
  color: #dc2727;
}

.shortcut {
  height: 40px;
  background-color: #f5f5f5;
  line-height: 40px;
}

.shortcut img {
  float: left;
  width: 50px;
  height: 30px;
  margin-right: 20px;
}

.fr {
  cursor:pointer;
  margin-left: 50%;
}

.shortcut ul li {
  float: left;
  list-style: none;

}

.shortcut ul li a {
  color: #666666;
}

.shortcut ul li a:hover {
  color: #F49F0A;
}

.shortcut .fr ul li:nth-child(even) {
  width: 1px;
  height: 12px;
  background-color: #666;
  margin: 14px 15px 0;
}



</style>