import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

//解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("../page/Main.vue"),
    redirect: "/home",
    children: [
      // {
      //     path: '/home',
      //     name: 'home',
      //     component: () => import('../page/home')
      // },
      // {
      //     path: '/user',
      //     name: 'user',
      //     component: () => import('../page/user')
      // },
      // {
      //     path: '/mall',
      //     name: 'mall',
      //     component: () => import('../page/mall')
      // }
      // ,
      // {
      //     path: '/page1',
      //     name: 'page1',
      //     component: () => import('../page/other/pageOne.vue')
      // }
      // ,
      // {
      //     path: '/page2',
      //     name: 'page2',
      //     component: () => import('../page/other/pageTwo.vue')
      // }
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../page/login/login.vue"),
  },
  {
    path: '/home/notify',
    name: 'Notify',
    meta: {
      title: '消息通知',
    },
    component: () =>  import("../page/home/notify.vue"),
  },
  {
    path: '/home/profile',
    name: 'Profile',
    meta: {
      title: '个人信息',
    },
    component:  () =>  import("../page/home/profile.vue"),
  },
];

const router = new VueRouter({
  // mode: "history",
  base: "/college-web/",
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit("getToken");
  console.log(store.state.user.token);
  const token = store.state.user.token;
  if (!token && to.name !== "login") {
    console.log("未放行");
    next({ name: "login" });
  } else if (token && to.name === "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
