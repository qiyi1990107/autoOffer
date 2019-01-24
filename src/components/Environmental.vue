<template>
  <el-container style="height: 400px;border: 1px solid #eee; border-top:none;">
    <el-header>自动化offer配置信息</el-header>
    <el-main style="width:800px;margin:0 auto;">
      <el-form
        :label-position="labelPosition"
        label-width="140px"
        size="medium"
        :model="formLabelAlign"
      >
        <el-form-item label="请选择911路径">
          <el-input style="width:525px;" v-model="formLabelAlign.appPath"></el-input>
          <el-upload
            style="display:inline-block;"
            class="upload-demo"
            ref="getFilePath"
            :auto-upload="false"
            action="https://jsonplaceholder.typicode.com/posts/"
            :handlePreview="handlePreview"
            :show-file-list="false"
            :on-change="onChange"
          >
            <el-button @click="findApp" type="primary">添加</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="请上传用户资料路径">
          <el-input style="width:525px;" v-model="formLabelAlign.userInfo"></el-input>
          <el-upload
            style="display:inline-block;"
            class="upload-demo"
            ref="userInfo"
            :auto-upload="true"
            action="http://localhost:3000/excel"
            :handlePreview="handlePreview"
            :show-file-list="false"
            :on-change="onChange"
          >
            <el-button type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="请设置offer链接">
          <el-input style="width:525px;" v-model="formLabelAlign.offerLink"></el-input>
          <el-button style="opacity:0;" type="primary">上传</el-button>
        </el-form-item>
        <el-form-item label="是否随机答题">
          <el-radio v-model="formLabelAlign.israndom" label="1">随机</el-radio>
          <el-radio v-model="formLabelAlign.israndom" label="0">不随机</el-radio>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">开始任务</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        appPath: "",
        userInfo: "",
        israndom: "1",
        offerLink: ""
      }
    };
  },
  methods: {
    findApp() {},
    onSubmit() {
      this.formLabelAlign.offerLink = encodeURIComponent(
        this.formLabelAlign.offerLink
      );
      this.$fetch("http://localhost:3000/startTask", this.formLabelAlign).then(
        res => {
          if (res.status === "ok") {
          }
        }
      );
    },
    statrTask() {},
    handlePreview(file) {
      console.log(file);
    },
    onChange(file, fileList) {
      let fl = this.formLabelAlign;
      fl.appPath = this.$refs.getFilePath.$children[0].$refs.input.value;
      fl.userInfo = this.$refs.userInfo.$children[0].$refs.input.value;
      if (fl.userInfo) {
      }
    },
    handleRemove() {}, 
    beforeRemove() {},
    handleExceed() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
