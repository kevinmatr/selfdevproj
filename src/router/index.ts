import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../layout/index.vue";

import Info from "../views/infos/index.vue";

import { Setting } from "@element-plus/icons-vue";


export const routes = [
  {
    path: '/',
    component: Layout,
    redirect: "/first",
    meta: {
      til: "首页",
      icon: Setting,
      isShow: true
    },
    children: [
      {
        path: 'first',
        components: {
          default: () => import('../views/home/index.vue')
        },
        meta: {
          til: "欢迎",
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
    meta: {
      til: "登录",
      isShow: false
    }
  },
  {
    path: '/register',
    component: () => import('../views/register/index.vue'),
    meta: {
      til: "注册",
      isShow: false
    }
  },
  {
    path: "/info",
    component: Layout, //router-view
    redirect: "/info/info",
    meta: {
      til: "个人中心",
      icon: Setting,
      isShow: true
    },
    children: [
      {
        path: "info",
        components: {
          default: Info, //
        },
        meta: {
          til: "个人信息",
        },
      },
    ],
  },
  {
    path: "/health",
    component: Layout,
    redirect: "/health/health",
    meta: {
      til: "健康上报管理",
      icon: Setting,
      isShow: true
    },
    children: [
      {
        path: "health",
        components: {
          // 命名视图
          default: () => import("../views/health/clock.vue"),
        },
        meta: {
          til: "健康打卡",
        },
      },
      {
        path: "add",
        components: {
          // 命名视图
          default: () => import("../views/health/itinerary.vue"),
        },
        meta: {
          til: "疫苗接种信息",
        },
      },
    ],
  },
  {
    path: "/epidemic",
    component: Layout,
    redirect: "/epidemic/epidemic",
    meta: {
      til: "疫情管理",
      icon: Setting,
      isShow: true
    },
    children: [
      {
        path: "epidemic",
        components: {
          // 命名视图
          default: () => import("../views/epidemic/index.vue"),
        },
        meta: {
          til: "疫苗预约",
        },
      },
      {
        path: "addas",
        components: {
          // 命名视图
          default: () => import("../views/epidemic/everywhere.vue"),
        },
        meta: {
          til: "各地疫情信息",
        },
      },
      {
        path: "adddw",
        components: {
          // 命名视图
          default: () => import("../views/epidemic/material.vue"),
        },
        meta: {
          til: "物资申请",
        },
      },

    ],

  },
  {
    path: "/feedback",
    component: Layout,
    redirect: "/feedback/feedback",
    meta: {
      til: "用户反馈管理",
      icon: Setting,
      isShow: true
    },
    children: [
      {
        path: "feedback",
        components: {
          // 命名视图
          default: () => import("../views/feedback/index.vue"),
        },
        meta: {
          til: "反馈",
        },
      },


    ],

  },
];

const router = createRouter({
  routes: routes,
  history: createWebHashHistory(),
});

export default router;
