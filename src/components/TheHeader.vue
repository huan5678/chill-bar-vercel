<script>
import { useRoute, useRouter } from 'vue-router';
import {
  onMounted,
  computed,
  watch,
  ref,
  reactive,
} from 'vue';

import useStore from '@/stores';
import AppLink from '@/utils/AppLink.vue';
import TheCart from '@/components/TheCart.vue';

export default {
  components: { AppLink, TheCart },
  setup() {
    const route = useRoute();
    const { adminStore, cartStore } = useStore();
    const { handleSetLogout, handleClearToken } = adminStore;
    const {
      cartData,
      handleGetCart,
    } = cartStore;
    const router = useRouter();
    const openCart = ref(false);

    const scroll = reactive({
      current: 0,
      prev: 0,
      showHeader: true,
    });

    const isHome = ref(true);

    const openDropdown = ref(false);

    window.onscroll = () => {
      scroll.current = window.scrollY;
    };

    const header = ref(null);
    watch(() => scroll.current, (newVal, oldVal) => {
      if (route.name === 'home') {
        if (scroll.current !== 0) {
          if (oldVal < newVal) {
            scroll.showHeader = false;
          } else if (oldVal > newVal) {
            scroll.showHeader = true;
          }
        } else {
          scroll.showHeader = true;
        }
      }
    });

    function handleIsLogout() {
      handleClearToken();
      handleSetLogout();
      router.push('/');
    }

    function checkoutHandler(boolean) {
      const checkout = document.getElementById('checkout');
      const checdiv = document.getElementById('chec-div');
      const vfmContainer = document.querySelector('.vfm__content');
      if (!boolean) {
        checkout.classList.add('translate-x-full');
        checkout.classList.remove('translate-x-0');
        setTimeout(() => {
          checdiv.classList.add('opacity-0');
          vfmContainer.classList.add('hidden');
        }, 300);
        cartData.isOpenCart = boolean;
      } else {
        setTimeout(() => {
          checkout.classList.remove('translate-x-full');
          checkout.classList.add('translate-x-0');
          checdiv.classList.add('opacity-100');
          vfmContainer.classList.remove('hidden');
        }, 300);
        cartData.isOpenCart = !boolean;
      }
    }

    function handleCart(boolean) {
      checkoutHandler(boolean);
      openCart.value = boolean;
      openDropdown.value = false;
    }

    watch(
      () => cartData.cart,
      (newValue) => {
        if (newValue.length > 0) handleGetCart();
      },
    );

    watch(() => openDropdown.value, (newVal) => {
      const body = document.querySelector('body');
      if (newVal === true) {
        body.classList.add('overflow-hidden');
      } else {
        body.classList.remove('overflow-hidden');
      }
    });

    function checkRoute(routeName) {
      if (routeName === 'home') {
        isHome.value = true;
      } else {
        isHome.value = false;
      }
    }

    watch(route, (newValue) => {
      checkRoute(newValue.name);
    });

    onMounted(() => {
      handleGetCart();
      checkRoute(route.name);
    });

    return {
      route,
      handleIsLogout,
      cartList: computed(() => cartData.list),
      openCart,
      handleCart,
      scroll,
      header,
      openDropdown,
      isHome,
    };
  },
};
</script>
<template>
  <section id="header" ref="header"
  class="sticky top-0 z-30
  w-full bg-secondary-900/70 transition-all duration-500"
  :class="{
    'bg-secondary-700': !isHome,
    'translate-y-0': scroll.showHeader,
    '-translate-y-full': !scroll.showHeader,
  }"
  >
    <nav class="container flex
    static justify-between items-center py-3">
      <a href="/">
        <SvgLoader name="bannerLogo"
          class="w-28 h-8 text-primary-500" />
        <h2 class="hidden text-primary-500">ChillBar秋吧</h2>
      </a>
      <label for="menuBtn"
      class="md:hidden btn swap">
        <input type="checkbox" id="menuBtn" v-model="openDropdown">
        <i class="bi bi-list"></i>
      </label>
      <ul class="hidden pt-2 transition-all duration-500 md:flex">
          <li class="flex flex-auto justify-end px-2"
          v-if="route.name !== 'dashboard'">
            <AppLink to="/product"> 產品列表 </AppLink>
          </li>
          <li class="flex flex-auto justify-end px-2"
          v-if="route.name !== 'dashboard'">
            <AppLink to="/booking"> 預約訂位 </AppLink>
          </li>
          <li class="flex flex-auto justify-end px-2"
          v-if="route.name !== 'dashboard'">
            <AppLink to="/about"> 關於我們 </AppLink>
          </li>
          <li v-if="route.name === 'dashboard' || route.name === 'order-confirm'" />
          <li class="flex-auto indicator" v-else>
            <span class="rfs:text-xs text-primary-50
            bg-primary-500 indicator-item badge
            " v-show="cartList.length > 0">{{ cartList.length }}</span>
            <button class="btn btn-circle btn-ghost" type="button"
            @click="handleCart(true)" @keydown="true">
              <i class="rfs:text-2xl text-secondary-300 bi bi-bag-heart">
              </i>
            </button>
          </li>
        </ul>
      <div class="flex gap-4 justify-center items-center" v-if="route.name === 'dashboard'">
        <button type="button"
          class="gap-2 rfs:text-base font-normal bg-primary-400 hover:bg-primary-600
          transition duration-300 btn
          btn-xs sm:btn-sm md:btn-md"
          @click="handleIsLogout()"
        >
          <i class="rfs:text-xl bi bi-person-circle"></i>
          管理者登出
        </button>
      </div>
    </nav>
  </section>
  <TheCart v-model="openCart" @handleCart="handleCart" :handleCart="handleCart" />
  <Teleport to="body">
    <Transition name="fade">
      <div class="overflow-hidden absolute inset-0 z-[9999] w-screen h-screen
      bg-secondary-900/80 backdrop-blur-sm transition-all duration-500"
      :class="{'translate-x-[-250%]': !openDropdown}"
      >
        <nav class="flex flex-col gap-8 items-center p-4">
          <label for="overlayMenuBtn"
          class="ml-auto btn swap">
            <input type="checkbox" id="overlayMenuBtn" v-model="openDropdown">
            <i class="bi bi-x-lg"></i>
          </label>
          <AppLink to="/product" class="rfs:text-4xl"
          @click="openDropdown = false" @keydown="openDropdown = false"> 產品列表 </AppLink>
          <AppLink to="/booking" class="rfs:text-4xl"
          @click="openDropdown = false" @keydown="openDropdown = false"> 預約訂位 </AppLink>
          <AppLink to="/about" class="rfs:text-4xl"
          @click="openDropdown = false" @keydown="openDropdown = false"> 關於我們 </AppLink>
          <p class="py-2 px-3 rfs:text-4xl font-normal text-secondary-300"
          v-if="cartList.length > 0"
          @click="handleCart(true)" @keydown="handleCart(true)"
          >查看購物車</p>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>
