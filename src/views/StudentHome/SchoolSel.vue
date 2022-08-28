<template>
  <div class="body">
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
            <li><a @click="this.$router.push('/StudentHome');">个人主页</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="this.$router.push('/SchoolSel');">院校选择</a></li>
            <li></li>
            <li><a @click="this.$router.push('/MajorSel');">专业选择</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="this.$router.push('/SchoolInf');">院校信息查询</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="this.$router.push('/MajorInf');">专业信息查询</a></li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 快捷导航栏结束 -->
    <div class="header">
      <div class="w">
        <img src="../../img/header2.png" alt="">
        <h4 class="header_h4">院校选择</h4>
      </div>
    </div>

    <el-container>

      <div class="mainWindow w">
        <div>
          <div>
            <el-space :size="40">
              <el-space direction="vertical"  alignment="flex-start" :size="25">
                <!--所在地-->
                <div class="schoolPosition">
                  <el-space wrap :size="33">
                    <span class="demonstration">院校所在地 </span>
                    <el-cascader
                        placeholder="试试搜索：北京"
                        :options="options"
                        filterable
                        collapse-tags
                        ref="cascadeAddr"
                        clearable
                        @change="getData">
                    </el-cascader>
                  </el-space>
                </div>
                <!--主管部门-->
                <div>
                  <el-space wrap :size="43">
                    <span class="demonstration">主管部门 </span>
                    <el-radio-group v-model="subForm.belong" @change="getData">
                      <el-radio-button label="全部"></el-radio-button>
                      <el-radio-button label="地方"></el-radio-button>
                      <el-radio-button label="地方教委"></el-radio-button>
                      <el-radio-button label="地方教育厅"></el-radio-button>
                      <el-radio-button label="公安部/军校/武警"></el-radio-button>
                      <el-radio-button label="教育部"></el-radio-button>
                      <el-radio-button label="其他部委"></el-radio-button>
                      <el-radio-button label="其他"></el-radio-button>

                    </el-radio-group>
                  </el-space>
                </div>
                <!--院校类型-->
                <div>
                  <el-space wrap :size="43">
                    <span class="demonstration">院校类型 </span>
                    <el-radio-group v-model="subForm.typeNameT" @change="getData">
                      <el-radio-button label="全部"></el-radio-button>
                      <el-radio-button label="理工"></el-radio-button>
                      <el-radio-button label="综合"></el-radio-button>
                      <el-radio-button label="语言"></el-radio-button>
                      <el-radio-button label="艺术"></el-radio-button>
                      <el-radio-button label="农林"></el-radio-button>
                      <el-radio-button label="民族"></el-radio-button>
                      <el-radio-button label="医药"></el-radio-button>
                      <el-radio-button label="师范"></el-radio-button>
                      <el-radio-button label="财经"></el-radio-button>
                      <el-radio-button label="体育"></el-radio-button>
                      <el-radio-button label="政法"></el-radio-button>
                      <el-radio-button label="军事"></el-radio-button>
                    </el-radio-group>
                  </el-space>
                </div>
                <!--办学类型-->
                <div>
                  <el-space  wrap :size="43">
                    <span class="demonstration">办学类型 </span>
                    <el-radio-group v-model="subForm.handleType" @change="getData">
                      <el-radio-button label="全部"></el-radio-button>
                      <el-radio-button label="民办"></el-radio-button>
                      <el-radio-button label="公办"></el-radio-button>
                      <el-popover
                          placement="bottom"
                          title="985工程"
                          :width="200"
                          trigger="hover"
                          content="是为了实现现代化，建立若干所具有世界先进水平的一流大学的建设工程。">
                        <template #reference>
                          <el-radio-button label="985工程"></el-radio-button>
                        </template>
                      </el-popover>

                      <el-popover
                          placement="bottom"
                          title="211工程"
                          :width="200"
                          trigger="hover"
                          content="面向21世纪、重点建设100所左右的高等学校和一批重点学科的建设工程。">
                        <template #reference>
                          <el-radio-button label="211工程"></el-radio-button>
                        </template>
                      </el-popover>
                      <el-radio-button label="中外合作办学"></el-radio-button>
                    </el-radio-group>
                  </el-space>
                </div>
                <!--层级-->
                <div>
                  <el-space  wrap :size="43">
                    <span class="demonstration">院校层级 </span>
                    <el-radio-group v-model="subForm.layer" @change="getData">
                      <el-radio-button label="全部"></el-radio-button>
                      <el-radio-button label="普通本科"></el-radio-button>
                      <el-radio-button label="专科（高职）"></el-radio-button>
                    </el-radio-group>
                  </el-space>
                </div>
                <!--搜索-->
                <el-space>
                  <el-input
                      placeholder="请输入院校名称"
                      v-model="subForm.name"
                      @keyup.enter.native="search"
                      clearable>
                  </el-input >
                  <el-button icon="el-icon-search" @click="search" type="primary"></el-button>
                  <el-button @click="showDrawer" type="primary" style="margin-left: 16px;">查看已选院校</el-button>
                </el-space>
              </el-space>
            </el-space>
            <el-divider></el-divider>
            <!--查询结果-->
            <el-table
                :data="schoolList"
                highlight-current-row
                :border = true
                max-height="1200px"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}">
              <el-table-column label="" prop="">
                <template #default="scope">
                  <el-card>
                    <el-image  style="width: 70px; height: 70px" :src="scope.row.site" alt="" :fit="fill" ></el-image>
                  </el-card>
                </template>
              </el-table-column>
              <el-table-column label="院校名称" prop="name"></el-table-column>
              <el-table-column label="所在地" prop="cityName"></el-table-column>
              <el-table-column label="主管部门" prop="belong"></el-table-column>
              <el-table-column label="办学类型" prop="levelName"></el-table-column>
              <el-table-column label="院校类型" prop="typeName"></el-table-column>
              <el-table-column label="院校特点" prop="dualClassName" ></el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button type="primary" round @click="add(scope.row.name)">加入备选</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--分页-->
            <el-pagination
                @size-change="pageSizeChange"
                @current-change="pageCurrentChange"
                :current-page="subForm.pageNum"
                :page-sizes="[5, 50, 100]"
                :page-size= "subForm.pageSize"
                layout="prev, pager, next"
                :total="total"
                background>
            </el-pagination>
          </div>
        </div>
      </div>

      <!--已选学校抽屉-->
      <el-drawer
          title="已选院校"
          v-model="drawer"
          :with-header="false"
          direction="rtl"
          size="50%">
        <el-table :data="schoolChoiceList"
                  highlight-current-row
                  @change="getData"
                  max-height="700px"
                  :border = true
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column property="name" label="院校名称"></el-table-column>
<!--          <el-table-column property="layer" label="院校层级"></el-table-column>-->
          <el-table-column  label="操作">
            <template #default="scope">
              <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.name)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-drawer>
    </el-container>
  </div>
</template>

<script>
import { h } from 'vue'
import {ElDivider, ElMessage} from 'element-plus'
export default {
  name: "StudentSel",

  data() {
    return {
      info:{
        userId:'',
      },
      spacer: h(ElDivider, {direction: 'vertical'}),
      props: {multiple: true},
      Switch: false,
      options: require('../../../public/static/Data/positionData.json'),
      subForm: {
        position:null,
        belong: '全部',
        level:'全部',
        layer:'全部',
        typeName:'',
        typeNameT:'全部',
        isDual: false,
        currentPage: 1,
        pageSize: 50,
        name: null,
        handleType:'全部'//办学类型
      },
      schoolList: [],
      schoolChoiceList: [],
      total: 0,
      spaceSize: 20,
      drawer: false,
    }

  },
  mounted() {
    this.info.userId = window.sessionStorage.getItem("userId");
    this.getData();
  },
  methods: {
    getData() {
      this.subForm.position = null;
      //给位置数组赋值方便后端接收数据
      for(let i=0;i<this.$refs['cascadeAddr'].getCheckedNodes().length;i++){
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 2) {
          this.subForm.position = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }

      //院校类型数据
      if (this.subForm.typeNameT !== '全部'){
        this.subForm.typeName=this.subForm.typeNameT + '类';
      }else {
        this.subForm.typeName=this.subForm.typeNameT;
      }

      //处理开关数据
      this.subForm.isDual = this.Switch.toString();

      this.$http({
        method: 'post',
        url: '/schoolInfo/getSchoolInfo',
        data: this.subForm
      }).then(({data}) => {
        console.log(data);
        for(let i=0;i<data.SchoolInfo.length;i++) {
          // data.SchoolInfo[i].type = data.SchoolInfo[i].firstClass
          //拼接校徽图片链接
          data.SchoolInfo[i].site = 'https://static-data.eol.cn/upload/logo/' + data.SchoolInfo[i].schoolId + '.jpg'
          data.SchoolInfo[i].levelName = data.SchoolInfo[i].handleName + '-' + data.SchoolInfo[i].levelName
        }

        this.schoolList = data.SchoolInfo
        this.total = data.total
      })
    },

    add(name) {
      console.log(name);
        this.$http({
        method: 'get',
        url: '/schoolInfo/selSchool?schoolName=' + name + '&&userId=' + this.info.userId,
      }).then(({data}) => {
        console.log(data)
        if (data.code === 200) {
          ElMessage.success({
            message: "添加成功",
            type: 'success'
          });
        }
        else {
          ElMessage.warning({
            message: data.msg,
            type: 'warning'
          });
        }

      })
    },

    del(name) {
      this.$http({
        method: 'get',
        url: '/schoolInfo/delSchool?schoolName=' + name + '&&userId=' + this.info.userId,
      }).then(({data}) => {
        if (data.code === 200) {
          ElMessage.success({
            message: "删除成功",
            type: 'success'
          });
        }
        else {
          ElMessage.warning({
            message: data.msg,
            type: 'warning'
          });
        }
      })
      //利用延时解决删除已选学校更新列表错误的问题
      this.timer = setTimeout(()=>{   //设置延迟执行
        this.showDrawer()
      },100);

    },

    showDrawer() {
      this.schoolChoiceList = []
      this.$http({
        method: 'get',
        url: '/schoolInfo/showChosenSchool?userId=' + this.info.userId,
      }).then(({data}) => {
        this.schoolChoiceList = data.list;
      })
      this.drawer = true
    },
    pageSizeChange(newSize) {
      if (newSize === null)
        return
      this.subForm.pageSize = newSize;
      this.getData();
    },
    pageCurrentChange(newPage) {
      this.subForm.pageNum = newPage;
      this.getData();
    },
    search(){
      this.$http({
        method:'post',
        url:'/schoolInfo/searchSchool',
        data: this.subForm
      }).then(({data})=> {
        console.log(data);
        for(let i=0;i<data.SchoolInfo.length;i++) {
          data.SchoolInfo[i].site = 'https://static-data.eol.cn/upload/logo/' + data.SchoolInfo[i].schoolId + '.jpg'
          data.SchoolInfo[i].levelName = data.SchoolInfo[i].handleName + '-' + data.SchoolInfo[i].levelName
        }
        this.schoolList = data.SchoolInfo
        this.total = data.SchoolInfo.length;
      })
    },
  }
}

</script>
<style scoped>
* {
  box-sizing: border-box;
  padding:0;
  margin:0;
}
.w {
  width: 1200px;
  margin: 0 auto;
}

li {
  list-style: none;
}
.body {

  height: 1900px;
  background-color:#fff;

}

a {
  text-decoration: none;
}

h4 {
  float: left;
}

.header {
  text-align: center;
  height: 120px;
  margin-bottom: 20px;
  border-bottom: 3px solid #F49F0A;
}

.header img {
  display:inline-block;
  float: left;
  width: 100px;
  height:90px;
  margin: 20px 10px 0 0;
}

.header_h4 {
  margin: 73px 15px 10px 10px;
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

.style_red {
  color: #c81623;
}

.shortcut .fr ul li:nth-child(even) {
  width: 1px;
  height: 12px;
  background-color: #666;
  margin: 14px 15px 0;
}

.shortcut img {
  width: 50px;
  height: 30px;
  margin-right: 20px;
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
  /* margin-bottom: 15px; */
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

.text_align_left {
  float: left;
  margin: 0;
  padding-right: 256px;
}

.text_align_left1 {
  float: left;
  margin: auto 0;
  margin-right: 0;
}

.content {

  background-color: #fff;
  padding: 10px;
}



</style>
