<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/images/bg1.jpg" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px':'200px'"> 
        <div class="toggle-button" @click="toggleCollapse">|||</div> 
        <el-menu 
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu :index="list.id + '' " v-for="list in menuList" :key="list.id">
            <template slot="title"> 
              <i :class="iconsObj[list.id]"></i>
              <span>{{list.authName}}</span>
            </template> 

            <el-menu-item 
             :index="'/' + subItem.path"
             v-for="subItem in list.children" 
             :key="subItem.id"
             @click="saveNavState('/' + subItem.path)"
             >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
            </template> 
            </el-menu-item>

          </el-submenu>  
        </el-menu>
      </el-aside>
      <el-main> 
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>   
export default {
  name: 'Home',
  data(){
    return{
      menuList:[],
      iconsObj:{
        '125':'iconfont icon-user',
        '103':'iconfont icon-quanxian',
        '101':'iconfont icon-shangpin-tianchong',
        '102':'iconfont icon-dingdan',
        '145':'iconfont icon-shujutongji'  
      },
      isCollapse:false,
      activePath:''
    }
  },
  created() {
    this.getMenuList() 
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('login')
    },
    async getMenuList(){
      const {data: res} = await this.$http.get('/menus')
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log('菜单' + res)
    },
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath 
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  padding-left: 0;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 60px;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.el-submenu__title i{
  margin-right: 8px;
}

.toggle-button{
  background-color: #4a5064;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>