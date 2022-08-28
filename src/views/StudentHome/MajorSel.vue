<template>
  <div class="body">
    <!-- 快捷导航栏开始 -->
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
            <li><a @click="this.$router.push('/MajorSel')">专业选择</a></li>
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
        <img src="../../img/header1.png" alt="">
        <h4 class="header_h4">专业选择</h4>
      </div>
    </div>
    <el-container>
      <div class="content w">
        <div class="neirong">
          <el-space :size="33">
            <el-space direction="vertical"  class="select" alignment="flex-start" :size="15">
              <!--专业筛选-->
                <el-space wrap :size="1">
                <h4>专业类别：</h4>
                <el-cascader
                    placeholder="试试搜索：计算机类"
                    :options="options"
                    filterable
                    collapse-tags
                    ref="cascadeAddr"
                    clearable
                    @change="getData" class="float search"></el-cascader>
            </el-space>
              <!--层级-->
              <el-space  wrap :size="1">
<!--                <h4>院校层次：</h4>
                <el-space :size="10" :spacer="spacer">
                  <el-radio-group v-model="subForm.type" @change="getData" class="float">
                    <el-radio-button label="全部" class="float  three_box color"></el-radio-button>
                    <el-radio-button label="本科" class="float  three_box color"></el-radio-button>
                    <el-radio-button label="专科" class="float  three_box color"></el-radio-button>
                  </el-radio-group>-->
                  <el-switch v-model="Switch" active-text="仅查看已选学校" inactive-text="查看所有学校" @change="switchOption" class="margin2"></el-switch>
<!--                </el-space>-->
              </el-space>
              <!--选课要求-->
              <el-space  wrap :size="1">
                <h4 >所选科目：</h4>
                <el-space :size="10" :spacer="spacer">
                  <div>
                    <el-radio-group v-model="subForm.subject" size="small" @change="getData">
                      <el-radio-button v-for="major in majors" :label="major" :key="major">{{major}}</el-radio-button>
                    </el-radio-group>
                  </div>
                  <el-space wrap :size="10">
                    <h4 class="margin1">高考位次：</h4>
                    <el-space wrap :size="40">
                      <el-input v-model.number="subForm.rank" min="1" placeholder="高考位次" @change="getData" class="float ranking"></el-input>
                      <div>
                        <el-button @click="showDrawer" type="primary" class="top_button float">查看已选专业</el-button>
<!--                        <el-button @click="showCreateForm" type="primary" class="top_button float">生成志愿列表</el-button>-->
                      </div>
                    </el-space>
                </el-space>
                </el-space>
              </el-space>
            </el-space>
          </el-space>
          <!--查询结果-->
          <div class="kkk">
            <el-table
                :data="specialList"
                border stripe
                max-height="780px"
                highlight-current-row
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}">
              <el-table-column label="高校代码" prop="schoolCode"></el-table-column>
              <el-table-column label="专业名称" prop="specialName"></el-table-column>
              <el-table-column label="所属高校" prop="schoolName"></el-table-column>
              <el-table-column label="专业代码" prop="specialCode"></el-table-column>
              <el-table-column label="录取批次" prop="batch"></el-table-column>
              <el-table-column label="最低录取分数" prop="lowMark"></el-table-column>
              <el-table-column label="最低录取位次" prop="lowRank"></el-table-column>
              <el-table-column label="选课要求" prop="subjectLimit"></el-table-column>
              <el-table-column label="备注" prop="addition"></el-table-column>
              <el-table-column label="操作" prop="">
                <template #default="scope">
                  <el-button type="primary" round @click="add(scope.row)">加入备选</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!--已选专业抽屉-->
          <el-drawer
              title="已选院校"
              v-model="drawer"
              :with-header="false"
              direction="rtl"
              size="50%">
            <el-table :data="majorChoiceList"
                      highlight-current-row
                      @change="getData"
                      max-height="700"
                      :border = true
                      :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}">
              <el-table-column property="schoolName" label="院校"></el-table-column>
              <el-table-column property="specialName" label="专业"></el-table-column>
              <el-table-column property="lowRank" label="最低录取位次"></el-table-column>
              <el-table-column  label="操作">
                <template #default="scope">
                  <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-drawer>

          <!--生成志愿-->
<!--          <el-dialog-->
<!--              title="生成志愿列表"-->
<!--              v-model="dialogVisible"-->
<!--              width="70%">-->

<!--            <el-space :size="33">-->
<!--              <el-space direction="vertical"  class="select" alignment="flex-start" :size="15">-->
<!--                &lt;!&ndash;专业筛选&ndash;&gt;-->
<!--                <el-space wrap :size="1">-->
<!--                  <h4>专业类别：</h4>-->
<!--                  <el-cascader-->
<!--                      placeholder="试试搜索：计算机类"-->
<!--                      :options="options"-->
<!--                      :props="{ multiple: true }"-->
<!--                      filterable-->
<!--                      collapse-tags-->
<!--                      ref="cascadeAddr"-->
<!--                      clearable-->
<!--                      @change="getData" class="float search"></el-cascader>-->
<!--                </el-space>-->
<!--                &lt;!&ndash;层级&ndash;&gt;-->
<!--                <el-space  wrap :size="1">-->
<!--                  <h4>院校层次：</h4>-->
<!--                  <el-space :size="10" :spacer="spacer">-->
<!--                    <el-radio-group v-model="subForm.type" @change="getData" class="float">-->
<!--                      <el-radio-button label="全部" class="float  three_box color"></el-radio-button>-->
<!--                      <el-radio-button label="本科" class="float  three_box color"></el-radio-button>-->
<!--                      <el-radio-button label="专科" class="float  three_box color"></el-radio-button>-->
<!--                    </el-radio-group>-->
<!--                    <el-switch v-model="Switch" active-text="查看所有学校" inactive-text="仅查看已选学校" @change="switchOption" class="margin2"></el-switch>-->
<!--                  </el-space>-->
<!--                </el-space>-->
<!--                &lt;!&ndash;选课要求&ndash;&gt;-->
<!--                <el-space  wrap :size="1">-->
<!--                  <h4 >所选科目：</h4>-->
<!--                  <el-space :size="10" :spacer="spacer">-->
<!--                    <div>-->
<!--                      <el-checkbox-group v-model="subForm.subject" size="small" @change="getData">-->
<!--                        <el-checkbox-button v-for="major in majors" :label="major" :key="major">{{major}}</el-checkbox-button>-->
<!--                      </el-checkbox-group>-->
<!--                    </div>-->
<!--                    <el-space wrap :size="10">-->
<!--                      <h4 class="margin1">高考位次：</h4>-->
<!--                      <el-space wrap :size="40">-->
<!--                        <el-input v-model.number="subForm.rank" placeholder="高考位次" @change="getData" class="float ranking"></el-input>-->
<!--                        <el-button type="primary" @click="getDataCreate">生成志愿</el-button>-->
<!--                      </el-space>-->
<!--                    </el-space>-->
<!--                  </el-space>-->
<!--                </el-space>-->
<!--              </el-space>-->
<!--            </el-space>-->
<!--            &lt;!&ndash;结果&ndash;&gt;-->
<!--            <el-table :data="majorCreateList"-->
<!--                      highlight-current-row-->
<!--                      @change="getData"-->
<!--                      max-height="700"-->
<!--                      :border = true-->
<!--                      :header-cell-style="{'text-align':'center'}"-->
<!--                      :cell-style="{'text-align':'center'}">-->
<!--              <el-table-column property="admissionDirection" label="院校"></el-table-column>-->
<!--              <el-table-column property="major" label="专业"></el-table-column>-->
<!--              <el-table-column property="lowLevel" label="最低录取位次"></el-table-column>-->
<!--              <el-table-column  label="操作">-->
<!--                <template #default="scope">-->
<!--                  <el-button type="danger" icon="el-icon-delete" circle @click="delCreate(scope.row.major_id)"></el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--            </el-table>-->
<!--            <template #footer>-->
<!--            <span class="dialog-footer">-->
<!--              <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--              <el-button type="primary" @click="confirm">确 定</el-button>-->
<!--            </span>-->
<!--            </template>-->
<!--          </el-dialog>-->
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
    </el-container>
  </div>

</template>

<script>
import { h } from 'vue'
import {ElDivider, ElMessage} from 'element-plus'
const majorOptions = ['全部','物理', '化学', '生物', '政治', '历史', '地理','不限'];
export default {
  name: "MajorInf",

  data() {
    return {
      info:{
        userId:1,
      },
      spacer: h(ElDivider, { direction: 'vertical' }),
      props: {multiple: true},
      options:require('../../../public/static/Data/majorData.json'),
      Switch: false,
      subForm:{
        majorList:null,
        type:'全部',
        pageNum: 1,
        pageSize: 50,
        subject: '全部',
        rank: 1
      },
      //添加预选专业
      addForm:{
        userId:'',
        specialName:'',
        schoolName:'',
        lowRank:''
      },


      dialogVisible: false,
      specialList:[],//专业分数线列表

      total: 0,
      spaceSize:20,
      majors: majorOptions,
      drawer: false,
      majorChoiceList:[],
      majorCreateList:[],
      choiceMajor: {
        university_id: ''
      },
      Confirm:{
        majorId:[]
      }
    }
  },
  mounted() {
    this.getData();
    this.info.userId = window.sessionStorage.getItem("userId");
    this.addForm.userId = window.sessionStorage.getItem("userId").toString();
    this.subForm.rank = parseInt(window.sessionStorage.getItem("rank"));
  },
  methods: {
    getData() {
      this.subForm.majorList = null;
      if (this.subForm.rank === ''){
        this.subForm.rank = 1;
      }
      for (let i = 0; i < this.$refs['cascadeAddr'].getCheckedNodes().length; i++) {
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 1) {
          this.subForm.majorList = this.$refs['cascadeAddr'].getCheckedNodes()[0].data.label
        }
      }

      if (this.subForm.subject === ''){
        this.subForm.subject = '全部';
      }
      if (!this.Switch){
        this.$http({
          method: 'post',
          url: '/SpecialsBoardLine/getMajorScoreList',
          data: this.subForm
        }).then(({data})=> {
          this.specialList = data.specialList
          this.total = data.total;
        })
      }
      else {
        this.$http({
          method: 'get',
          url: '/SpecialsBoardLine/getMajorInfoByChosenSchool?userId=' + this.info.userId + '&&pageNum=' + this.subForm.pageNum + '&&pageSize=' + this.subForm.pageSize,
        }).then(({data})=> {
          console.log(data);
          this.specialList = data.specialList
          this.total = data.total;
        })
      }
    },
    //查看已选专业
    showDrawer() {
      this.majorList = null
      this.$http({
        method: 'get',
        url: '/SpecialsBoardLine/showSelectedSpecials?userId=' + this.info.userId,
      }).then(({data}) => {
        console.log(data);
        this.majorChoiceList = data.list;
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
      if (newPage === null)
        return
      this.subForm.pageNum = newPage;
      this.getData();
    },
    add(item) {
      this.addForm.userId = 1;
      this.addForm.specialName = item.specialName;
      this.addForm.schoolName = item.schoolName;
      this.addForm.lowRank = item.lowRank;
      console.log(this.addForm)
      this.$http({
        method: 'post',
        url: '/SpecialsBoardLine/selSpecial',
        data: this.addForm
      }).then(({data}) => {
        console.log(data)
        if (data.code === 200) {
          ElMessage.success({
            message: "添加成功",
            type: 'success'
          });
        }
        else{
          ElMessage.warning({
            message: data.msg,
            type: 'warning'
          });
        }
      })
    },
    del(item) {
      this.$http({
        method: 'get',
        url: '/SpecialsBoardLine/removeSelectSpecial?specialName=' + item.specialName + '&&schoolName=' + item.schoolName + '&&userId=' + this.info.userId ,
      }).then(({data}) => {
        if (data.code === 200) {
          ElMessage.success({
            message: '删除成功',
            type: 'success'
          });
        }
        else{
          ElMessage.warning({
            message: data.msg,
            type: 'warning'
          });
        }
      })
      //利用延时解决删除已选学校更新列表错误的问题
      this.timer = setTimeout(() => {   //设置延迟执行
        this.showDrawer()
      }, 100);
    },
    switchOption() {
      this.getData();

      /*for (let i = 0; i < this.$refs['cascadeAddr'].getCheckedNodes().length; i++) {
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 1) {
          this.subForm.majorList[i] = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }

      if (this.Switch === false){
        this.$http({
          method: 'post',
          url: '/User/showMajorWithoutUniversity',
          data: this.subForm
        }).then(res => {

          this.majorScoreList = res.data.list
          this.total = res.data.total
        })
      }
      else{
        this.$http({
          method: 'post',
          url: '/User/showMajorFromSelectUniversity',
          data: this.subForm
        }).then(res => {

          this.majorScoreList = res.data.list
          this.total = res.data.total
        })
      }
*/
    },
    showCreateForm(){
      this.dialogVisible = true
    },
    submitCreate(){
      this.majorCreateList = []
      if (this.subForm.lowLevel === ''){
        this.subForm.lowLevel = 0
      }
      console.log(this.subForm)
      this.subForm.majorList = []
      this.$http({
        method: 'post',
        url: '/User/getAutoMajor',
        data: this.subForm
      }).then(res => {
        console.log(res.data)
        this.majorCreateList = res.data
      })
    },
    delCreate(id){

      for (let i =0 ;i<this.majorCreateList.length;i++){
        if(id === this.majorCreateList[i].major_id){
          for(let k=i;k<this.majorCreateList.length-1 ; k++){
            this.majorCreateList[k] = this.majorCreateList[k+1]
          }
        }
      }
      this.majorCreateList.length--
      console.log(this.majorCreateList)
    },
    confirm(){
      for(let i=0;i<this.majorCreateList.length;i++){
        this.Confirm.majorId[i] = this.majorCreateList[i].major_id
      }
      console.log(this.Confirm)
      this.$http({
        method: 'post',
        url: '/User/submitAutoMajorToDataBase',
        data: this.Confirm
      }).then(res => {
        if (res.data.info.code === 200){
          ElMessage.success({
            message: res.data.data,
            type: 'success'
          })
        }

      })
      this.dialogVisible = false
    }
  }
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

  height: 1200px;
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
