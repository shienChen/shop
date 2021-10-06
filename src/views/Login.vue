<template>
  <div class="login" clearfix>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm"  :model="user"  :rules="rules" status-icon label-width="80px">
          <h3>登录</h3>
          <hr>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon></el-input>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <router-link to="/">找回密码</router-link>
          <router-link to="/register">注册账号</router-link>
          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button> 
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div> 
</template>

<script>
    export default {
        name:'Login',
        data() {
            return {
                user:{
                  username:'admin',
                  password:'123456'
                },
                rules:{
                  username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
                  ],
                  password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
                  ]
                }
            }
        },
        methods:{
          // doLogin(){
          //   if(!this.user.username){
          //     this.$message.error("请输入用户名！")
          //     return;
          //   }else if(!this.user.password){
          //     this.$message.error("请输入密码！")
          //     return;
          //   }
          // },
          doLogin(){
             this.$refs.loginForm.validate(async valid => {
               if(!valid) return;
               const { data: res} = await this.$http.post("login", this.user)
               if( res.meta.status !== 200 ) return this.$message.error("登陆失败")
              //  console.log(res)
               this.$message.success("登陆成功")
               window.sessionStorage.setItem("token",res.data.token)
               this.$router.push('/home')
             })
          },
        }
    }
</script>

<style  >
    .login {
    width: 100%;
    height: 740px;
    background: url("../assets/images/bg1.jpg") no-repeat;
    background-size: cover;
    overflow: hidden;
    }
    .login-wrap {
    background: url("../assets/images/login_bg.jpg") no-repeat;
    background-size: cover;
    width: 400px;
    height: auto;
    margin: 215px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 40px;
    }
    #password {
    margin-bottom: 5px;
    }
    h3 {
    color: #0babeab8;
    font-size: 24px;
    }
    hr {
    background-color: #444;
    margin: 20px auto;
    }
    a {
    text-decoration: none;
    color: #aaa;
    font-size: 15px;
    }
    a:hover {
    color: coral;
    }
    .el-button {
    width: 80%;
    margin-left: -50px;
    } 
</style>