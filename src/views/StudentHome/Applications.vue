<template>
  <el-tabs type="border-card" style="height: 1000px">
        <el-tab-pane label="查看自选志愿" @table-click="majorSel">
          <el-button type="primary" @click="exportDataSel">导出为Excel表格</el-button>
          <el-table
              :data="listData"
              border stripe
              highlight-current-row
              max-height="850"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
<!--            <el-table-column label="序号" type="index"></el-table-column>-->
            <el-table-column label="专业招生代码" prop="specialCode"></el-table-column>
            <el-table-column label="专业名称" prop="specialName"></el-table-column>
            <el-table-column label="所属高校" prop="schoolName"></el-table-column>
            <el-table-column label="所属高校招生代码" prop="schoolCode"></el-table-column>
            <el-table-column label="最低录取分数" prop="lowMark"></el-table-column>
            <el-table-column label="最低录取位次" prop="lowRank"></el-table-column>
            <el-table-column label="选课要求" prop="subjectLimit"></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="danger" icon="el-icon-delete" circle @click="delS(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
<!--        <el-tab-pane label="查看生成志愿" @tab-click="majorAuto">
          <el-button type="primary" @click="exportDataAuto">导出Excel表格</el-button>
          <el-table
              :data="listDataAuto"
              border stripe
              highlight-current-row
              max-height="700"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="专业招生代码" prop="methodCode"></el-table-column>
            <el-table-column label="专业名称" prop="major"></el-table-column>
            <el-table-column label="所属高校" prop="admissionDirection"></el-table-column>
            <el-table-column label="所属高校招生代码" prop="admissionCode"></el-table-column>
            <el-table-column label="最低录取分数" prop="lowScore"></el-table-column>
            <el-table-column label="最低录取位次" prop="lowLevel"></el-table-column>
            <el-table-column label="选课要求" prop="request">
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="danger" icon="el-icon-delete" circle @click="delA(scope.row.major_id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>-->
      </el-tabs>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Applications",
  data() {
    return {
      info:{
        userId:'',
      },
      listData: [],
      listDataAuto: [],
      form:{
        major_id:''
      }
    }
  },
  mounted() {
    this.info.userId = parseInt(window.sessionStorage.getItem("userId"));
    this.majorSel()
  },
  methods: {
    majorSel() {
      // this.listData = []
      this.$http({
        method: 'get',
        url: '/SpecialsBoardLine/exportMajor?userId=' + this.info.userId,
      }).then(({data}) => {
        this.listData = data.list;
      })
    },
    majorAuto() {
      this.listData = []
      this.$http({
        method: 'post',
        url: '/User/showMajorAuto',
        data: this.form
      }).then(res => {
        this.listDataAuto = res.data
      })
    },
    delS(item) {
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
        this.majorSel()
      }, 100);
    },
    delA(id) {
      this.form.major_id = id;
      this.$http({
        method: 'post',
        url: '/User/deleteMajorByAuto',
        data: this.form
      }).then(res => {
        this.majorAuto()
      })
    },
    confirmChange() {
      this.$http({
        method: 'post',
        url: '/User/showMajorSelected',
        data: this.listData
      }).then(res => {

      })
    },

    exportDataSel() {
      this.excelData = this.listData;
      this.export2Excel();
    },
    exportDataAuto() {
      this.excelData = this.listDataAuto;
      this.export2Excel();
    },
    export2Excel() {
      const that = this;
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("@/assets/excel/Export2Excel");
        const tHeader = ["学校代码", "学校名称", "专业代码", "专业名称"]; // 导出的excel表头名信息
        const filterVal = [
          "schoolCode",
          "schoolName",
          "specialCode",
          "specialName",
        ]; // 导出的excel表头字段名，需要导出表格字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "志愿填报表");
      });
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }

}
</script>

<style scoped>

</style>
