import { createRouter, createWebHashHistory } from 'vue-router';

const title = 'ChillBar秋吧';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/frontEnd/FrontEndView.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/frontEnd/HomeView.vue'),
        meta: {
          title: `${title} - 首頁`,
        },
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/frontEnd/ProductView.vue'),
        meta: {
          title: `${title} - 產品頁`,
        },
      },
      {
        path: 'detail/:id',
        name: 'product-detail',
        component: () => import('@/views/frontEnd/ProductDetailView.vue'),
        meta: {
          title: `${title} - 產品詳細頁`,
        },
      },
      {
        path: 'booking',
        name: 'booking',
        component: () => import('@/views/frontEnd/BookingView.vue'),
        meta: {
          title: `${title} - 預約訂位`,
        },
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/frontEnd/LoginView.vue'),
        meta: {
          title: `${title} - 管理者登入`,
        },
      },
      {
        path: 'checkout',
        name: 'check-order',
        component: () => import('@/views/frontEnd/CheckOrderView.vue'),
        meta: {
          title: `${title} - 確認訂單`,
        },
      },
      {
        path: 'confirm',
        name: 'order-confirm',
        component: () => import('@/views/frontEnd/OrderConfirmView.vue'),
        meta: {
          title: `${title} - 建立訂單`,
        },
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/frontEnd/AboutUsView.vue'),
        meta: {
          title: `${title} - 關於我們`,
        },
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/backEnd/BackEndView.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/backEnd/DashboardView.vue'),
        meta: {
          title: `${title} - 管理者後台`,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/frontEnd/The404View.vue'),
    meta: {
      title,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
