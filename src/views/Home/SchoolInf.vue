<template >
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
            <li><a @click="this.$router.push('/StudentHome')">个人主页</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="this.$router.push('/SchoolSel')">院校选择</a></li>
            <li></li>
            <li><a @click=" this.$router.push('/MajorSel');">专业选择</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="this.$router.push('/SchoolInf')">院校信息查询</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="this.$router.push('/MajorInf')">专业信息查询</a></li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 快捷导航栏结束 -->
    <div class="header">
      <div class="w">
        <img src="../../img/header2.png" alt="">
        <h4 class="header_h4">院校查询</h4>
      </div>
    </div>
    <el-container class="biggestdiv">
      <div class="w">
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
                        <el-radio-button label="985院校"></el-radio-button>
                      </template>
                    </el-popover>

                    <el-popover
                        placement="bottom"
                        title="211工程"
                        :width="200"
                        trigger="hover"
                        content="面向21世纪、重点建设100所左右的高等学校和一批重点学科的建设工程。">
                      <template #reference>
                        <el-radio-button label="211院校"></el-radio-button>
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
                <el-button style=" margin-top:0;width: 56px;height: 40px;" icon="el-icon-search" @click="search" type="primary"></el-button>
              </el-space>
            </el-space>
          </el-space>
          <el-divider></el-divider>
          <!--查询结果-->
          <el-table
              :data="schoolList"
              highlight-current-row
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
            <el-table-column type="expand">
              <template #default="props">
                <el-form inline>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-card>
                        <el-space direction="vertical" :size="spaceSize" alignment="flex-start">
                        <span><el-icon :size="15">
                             <school/>
                           </el-icon>
                          {{ "藏书量：" + props.row.numLibrary }}</span>
                          <span><el-icon :size="15">
                             <crop/>
                           </el-icon>
                          {{ "占地面积：" + props.row.area + "亩" }}</span>
                          <span>
                            <el-icon :size="15">
                              <Link/></el-icon>{{ "官方网站："}}
                            <el-link type="primary" :href="props.row.schoolSite" target="_blank">{{ props.row.schoolSite }}</el-link>
                          </span>
                        </el-space>
                      </el-card>
                    </el-col>

                    <el-col :span="12">
                      <el-card>
                        <el-space direction="vertical" :size="spaceSize" alignment="flex-start">

                        <span>
                          <el-icon :size="15">
                             <locationInformation/>
                           </el-icon>{{ "地址：" + props.row.address }}</span>
                          <span>
                          <el-icon :size="15">
                             <timer/>
                           </el-icon>{{ "建校时间：" + props.row.createDate + "年" }}</span>

                          <span>
                           <el-icon :size="15">
                             <phone/>
                           </el-icon>{{ "联系方式：" + props.row.phone }}</span>
                        </el-space>
                      </el-card>
                    </el-col>
                  </el-row>
                  <el-divider></el-divider>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-card>
                        <el-space direction="vertical" :size="spaceSize" alignment="flex-start">
                        <span>
                           <el-icon :size="15">
                             <medal/>
                           </el-icon>{{ "国家重点学科：" + props.row.numSubject }}</span>

                          <span>
                           <el-icon :size="15">
                             <notebook/>
                           </el-icon>{{ "硕士点： " + props.row.numMaster }}</span>

                          <span>
                           <el-icon :size="15">
                             <management/>
                           </el-icon>{{ "博士点：" + props.row.numDoctor }}</span>
                        </el-space>
                      </el-card>
                    </el-col>
                    <!--排名-->
                    <el-col :span="12">
                      <el-card>
                        <el-space direction="vertical" :size="spaceSize" alignment="flex-start">
                        <span>
                           <el-icon :size="15">
                             <files/>
                           </el-icon>{{ "软科排名：" + props.row.ruanKeRank }}</span>
                          <span>
                           <el-icon :size="15">
                             <files/>
                           </el-icon>{{ "校友会排名：" + props.row.xyhrank }}</span>
                          <span>
                           <el-icon :size="15">
                             <files/>
                           </el-icon>{{ "武书连排名：" + props.row.wslrank }}</span>
                        </el-space>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="学校代码" prop="">
              <template #default="scope">
                <el-image  style="width: 70px; height: 70px" :src="scope.row.site" alt=""></el-image>
              </template>
            </el-table-column>
            <el-table-column label="院校名称" prop="name"></el-table-column>
            <el-table-column label="所在地" prop="cityName"></el-table-column>
            <el-table-column label="主管部门" prop="belong"></el-table-column>
            <el-table-column label="办学类型" prop="levelName"></el-table-column>
            <el-table-column label="院校类型" prop="typeName"></el-table-column>
            <el-table-column label="院校特点" prop="dualClassName" ></el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
              @size-change="pageSizeChange"
              @current-change="pageCurrentChange"
              :current-page="subForm.currentPage"
              :page-size= "subForm.pageSize"
              layout="prev, pager, next"
              :total="total"
              background
              style="margin-top: 30px">
          </el-pagination>
        </div>
      </div>
    </el-container>
  </div>

</template>

<script>
import { h } from 'vue'
import { ElDivider } from 'element-plus'
import * as echarts from "echarts";
import { getProvinceMapInfo } from "../../../utils/mapNameExchange";
import { Collection, LocationInformation, Medal, Notebook, Management, School, Crop, Link, Timer, Phone, Files } from '@element-plus/icons'
export default {
  name: "StudentInfo",
  data() {
    return {
      spacer: h(ElDivider, { direction: 'vertical' }),
      props: {multiple: true},
      options: require('../../../public/static/Data/positionData.json'),
      Switch: false,

      subForm:{
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
      schoolList:[],
      total: 0,
      spaceSize:30,
      chartInstance: null,
      allData: null,
      mapData: {},
      flag:'china',
      positionTemp:[],
    }

  },
  mounted() {
    this.getData();
  },
  methods:{
    reset(){
      this.positionTemp = [];
      this.getData();
    },

    getData(){
      this.subForm.position = null;
      //给-位置-数组赋值方便后端接收数据
      for(let i=0;i<this.$refs['cascadeAddr'].getCheckedNodes().length;i++){
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 2) {
          this.subForm.position = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }

      if (this.subForm.typeNameT !== '全部'){
        this.subForm.typeName=this.subForm.typeNameT + '类';
      }else {
        this.subForm.typeName=this.subForm.typeNameT;
      }

      //处理开关数据
      this.subForm.isDual = this.Switch.toString();

      this.$http({
        method:'post',
        url:'/schoolInfo/getSchoolInfo',
        data: this.subForm
      }).then(({data})=> {
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

    pageSizeChange(newSize){
      if (newSize === null)
        return
      this.subForm.pageSize = newSize;
      this.getData();
    },
    pageCurrentChange(newPage){
      this.subForm.currentPage = newPage;
      this.getData();
    },
    search(){
      this.$http({
        method:'post',
        url:'/schoolInfo/searchSchool',
        data: this.subForm
      }).then(({data})=> {
        for(let i=0;i<data.SchoolInfo.length;i++) {
          data.SchoolInfo[i].site = 'https://static-data.eol.cn/upload/logo/' + data.SchoolInfo[i].schoolId + '.jpg'
          data.SchoolInfo[i].levelName = data.SchoolInfo[i].handleName + '-' + data.SchoolInfo[i].levelName
        }
        this.schoolList = data.SchoolInfo
        this.total = data.SchoolInfo.length;
      })
    },
  },
  components: {
    Collection,
    LocationInformation,
    Medal,
    Notebook,
    Management,
    School,
    Crop,
    Link,
    Timer,
    Phone,
    Files
  },
}

</script>

<style scoped>
* {
  box-sizing: border-box;
  padding:0;margin:0;
}
.w {
  width: 1200px;
  margin: 0 auto;
}

li {
  list-style: none;
}
.body {

  height: 1400px;
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

.footer {
  height: 190px;
  margin-top: 90px;
  /* padding-top: 15px; */
  padding-bottom: 15px;
  background: #F49F0A;
  text-align: center;
}

.hedingh3 h4 {
  color: #fff;
  font-size: 20px;
  padding-bottom: 5px;
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
  /* margin-bottom: 15px; */

}

ul.menu_footer li a {
  color: #fff;
  font-size: 17px;
  line-height: 18px;
  padding-bottom: 10px;
  display: block;
}

ul.menu_footer li a:hover {
  color: #dc2727;
}

.text_align_left {
  float: left;
  margin: 0;
  padding-right: 216px;
}

.text_align_left1 {
  float: left;
  margin: auto 0;

}

.content {

  background-color: #fff;
  /* border: 1px solid #666; */
  padding: 10px;
}

.kkk {
  margin-top: -30px;
  border: 1px solid;
}

.el-button {
  float: right;
  margin-top: 10px;
  margin-right: 5px;
}

.aaa {
  padding: 0;
}


</style>
