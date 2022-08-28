import { createRouter, createWebHashHistory } from 'vue-router'
import SchoolSel from "@/views/StudentHome/SchoolSel";
import ManagerHome from "@/components/ManageHome";
import ManagerWelcome from "@/views/ManagerHome/ManagerWelcome";
import StudentHome from"@/components/StudentHome"
import StudentInfManager from "@/views/ManagerHome/StudentInfManager";
import TeacherInfManager from "@/views/ManagerHome/TeacherInfManager";
import StudentWelcome from "@/views/StudentHome/StudentWelcome"
import SchoolInfManager from "@/views/ManagerHome/SchoolInfManager";
import MajorSel from "@/views/StudentHome/MajorSel";
import Applications from "@/views/StudentHome/Applications";
const routes = [{
  path: '/',
  redirect: '/Home'
},
  {
    path: '/Login',
    name: 'Login',
    component: ()=>import("@/views/Home/Login"),
  },
  {
    path: '/Home',
    name: 'Home',
    component:()=>import('@/views/Home/Home'),
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: ()=>import("@/views/Home/Signup"),
  },
  {
    path: '/SchoolInf',
    component: ()=>import("@/views/Home/SchoolInf"),
  },{
    path: '/MajorInf',
    component: ()=>import("@/views/Home/MajorInf"),
  },
  //管理员界面
  {
    path: '/ManagerHome',
    name: 'ManagerHome',
    component: ManagerHome,
    redirect: '/ManagerWelcome',
    children: [{
      path: '/ManagerWelcome',
      component: ManagerWelcome
    },{
      path: '/StudentInfManager',
      component: StudentInfManager,
    },{
      path: '/TeacherInfManager',
      component: TeacherInfManager,
    },{
      path: '/SchoolInfManager',
      component: SchoolInfManager,
    },]
  },
  //学生界面
  {
    path: '/StudentHome',
    name: 'StudentHome',
    component: StudentHome,
    redirect: '/StudentWelcome',
    children: [{
      path: '/StudentWelcome',
      component: StudentWelcome,
    },{
      path: '/SchoolSel',
      component: ()=>import("@/views/StudentHome/SchoolSel"),
    },{
      path: '/MajorSel',
      component: MajorSel,
    },{
      path: '/Applications',
      component: Applications
    }]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//导航守卫
//开启前先做白名单
/*
router.beforeEach((to, from, next) => {
  if (to.path === '/Login'||to.path === '/SchoolPublic'||to.path === '/MajorPublic'||to.path === '/Home'|| to.path === '/Signup')
    return next();

  const tokenStr = window.sessionStorage.getItem('token');

  if (!tokenStr) return next('/Login');

})
*/
export default router

