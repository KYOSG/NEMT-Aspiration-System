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
        <img src="../../img/header1.png" alt="">
        <h4 class="header_h4">专业信息查询</h4>
      </div>
    </div>

    <el-container >
      <div class="w">

          <el-space alignment="flex-start" :size="25" style="margin-bottom: 30px">
            <!--专业筛选-->
<!--            <div class="schoolPosition">
              <el-space wrap :size="33">
                <span class="demonstration">专业筛选 </span>
                <el-cascader
                    placeholder="试试搜索：计算机类"
                    :options="options"
                    :props="{ multiple: true }"
                    filterable
                    collapse-tags
                    ref="cascadeAddr"
                    clearable
                    @change="getData"></el-cascader>
              </el-space>
            </div>-->
            <!--层级-->
            <div>
              <el-space  wrap :size="43">
                <span class="demonstration">专业层级 </span>
                <el-radio-group v-model="subForm.type" @change="getData">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="本科"></el-radio-button>
                  <el-radio-button label="专科"></el-radio-button>
                </el-radio-group>
              </el-space>
            </div>
            <!--搜索-->
            <el-space>
              <el-input
                  placeholder="请输入专业名称"
                  v-model="subForm.majorName"
                  clearable>
              </el-input >
              <el-button icon="el-icon-search" @click="getData" type="primary" style="width: 56px;height: 40px;"></el-button>
            </el-space>
          </el-space>

          <!--查询结果-->

          <el-table
              :data="majorList"
              border stripe
              highlight-current-row
              max-height="900px"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
            <template #default="scope">
              <el-table-column label="一级分类" prop="firstName"></el-table-column>
              <el-table-column label="二级分类" prop="secondName"></el-table-column>
              <el-table-column label="三级分类" prop="thirdName"></el-table-column>
              <el-table-column label="授予学位" prop="degree"></el-table-column>
              <el-table-column label="专业层级" prop="type"></el-table-column>
              <el-table-column label="学位名称" prop="degree"></el-table-column>
            </template>
          </el-table>

          <!--分页-->
          <el-pagination
              @size-change="pageSizeChange"
              @current-change="pageCurrentChange"
              :current-page="subForm.pageNum"
              :page-size= "subForm.pageSize"
              layout=" prev, pager, next"
              :total="total"
              background
              style="margin-top: 30px">
          </el-pagination>

      </div>
    </el-container>
    <!--详情-->
    <el-dialog
        title="提示"
        v-model="dialogVisible"
        width="30%">
      <span>这是一段信息</span>
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { h } from 'vue'
import { ElDivider } from 'element-plus'
export default {
  name: "MajorInf",

  data() {
    return {
      spacer: h(ElDivider, { direction: 'vertical' }),
      props: {multiple: true},
      options:require('../../../public/static/Data/majorTypeData.json'),
      Switch: false,

      subForm:{
        type_detail:[],
        type:'全部',
        pageNum: 1,
        pageSize: 30,
        majorName: ''
      },
      majorList:[],

      total: 0,
      spaceSize:20,
      dialogVisible: false
    }
  },
  mounted() {
    this.getData();
  },
  methods:{
    getData(){
     /* this.subForm.type_detail = []
      for(let i=0;i<this.$refs['cascadeAddr'].getCheckedNodes().length;i++){
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 2) {
          this.subForm.type_detail[i] = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }*/
      this.$http({
        method:'post',
        url:'/major/getMajorInfo ',
        data: this.subForm
      }).then(({data})=> {
        this.majorList = data.SchoolInfo
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
      if (newPage === null)
        return
      this.subForm.pageNum = newPage;
      this.getData();
    },
  },
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
  position: relative;
  height: 1100px;
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

</style>
