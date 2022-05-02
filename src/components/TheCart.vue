<script>
import {
  computed,
  watch,
  onMounted,
  ref,
} from 'vue';
import { useRouter } from 'vue-router';
import useStore from '@/stores';

export default {
  emits: ['handleCart'],
  props: ['handleCart'],
  setup(props) {
    const { cartStore, couponStore } = useStore();
    const {
      cartData,
      handleGetCart,
      handleDeleteCart,
      handleClearCart,
      handleUpdateCart,
      handleSetResult,
    } = cartStore;
    const router = useRouter();
    const cart = {};
    const { couponData } = couponStore;

    function moneyFormat(num, qty) {
      let number = num;
      if (qty !== undefined) number *= qty;
      return num !== undefined ? Number(number.toFixed(1)).toLocaleString() : 0;
    }

    const cartTotalPrice = computed(() => moneyFormat(cartData.totalPrice));

    watch(
      () => cartData.cart,
      (newValue) => {
        if (newValue.length > 0) handleGetCart();
      },
    );

    function handleCloseCart(event) {
      if (event.target.id === 'checkout') {
        props.handleCart(false);
      }
    }

    function handleCheckout() {
      props.handleCart(false);
      router.push('/checkout');
    }

    function handleCountQty(qty) {
      if (qty <= 1) {
        return 1;
      }
      return qty;
    }

    const checkCoupon = ref('');
    const couponList = computed(() => couponData.couponList);
    const coupon = localStorage.getItem('coupon');

    onMounted(() => {
      if (coupon !== null) {
        [checkCoupon.value] = couponList.value.filter((item) => item.code === coupon);
      }
    });

    const cartFinalPrice = computed(() => {
      let resultPrice = 0;
      if (coupon !== null) {
        [checkCoupon.value] = couponList.value.filter((item) => item.code === coupon);
        if (checkCoupon.value.rules === 'minus') {
          resultPrice = cartData.totalPrice + checkCoupon.value.price;
        } else {
          resultPrice = cartData.totalPrice * checkCoupon.value.price;
        }
      } else {
        resultPrice = cartData.totalPrice;
      }
      handleSetResult(resultPrice);
      return moneyFormat(resultPrice);
    });

    return {
      windowWidth: window.innerWidth,
      cartList: computed(() => cartData.list),
      isOpenCart: computed(() => cartData.isOpenCart),
      cartTotalPrice,
      cartFinalPrice,
      handleCountQty,
      handleDeleteCart,
      handleClearCart,
      handleUpdateCart,
      moneyFormat,
      cart,
      handleCloseCart,
      isLoading: computed(() => cartStore.isLoading),
      handleCheckout,
      checkCoupon,
    };
  },
};
</script>

<template>
  <VueFinalModal
    v-bind="$attrs"
    v-slot="{ handleCart }"
    classes="bg-secondary-900 bg-opacity-50 backdrop-blur-[2px]"
    id="chec-div"
    >
      <div
        class="flex overflow-y-auto flex-wrap justify-end
        h-screen transition-all
        duration-700 transform translate-x-0 lg:flex-row lg:h-auto
        ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
        id="checkout"
        @click="handleCloseCart" @keydown="handleCloseCart"
      >
        <div
          class="overflow-y-auto py-4 px-4 h-screen
          bg-white md:py-8 md:px-6 md:w-8/12 lg:py-14 lg:px-8 lg:w-1/2 lg:h-screen"
          id="scroll"
        >
          <div class="flex justify-between items-center">
            <h2 class="pt-3 rfs:text-4xl font-medium text-secondary-800">購物車內容</h2>
            <button class="btn btn-ghost"
            @click="$emit('handleCart', handleCart)" @keydown.esc="handleCart">
              <i class="text-2xl bi bi-x-lg"></i>
            </button>
          </div>
          <div v-if="cartList.length === 0">
            <h3 class="pt-12 text-xl font-light">
              您的購物車還沒有商品<br />
              來加入一些你想要的東西吧...
              </h3>
          </div>
          <ul v-else class="py-8 space-y-4
          border-t border-secondary-50">
            <li v-for="cart in cartList" :key="cart.id"
            class="flex gap-4 justify-between items-center pb-4 border-b">
              <button
                type="button"
                class="
                text-primary-700 hover:text-primary-100
                hover:bg-primary-600 rounded
                border-primary-600
                hover:border-primary-600
                btn btn-sm btn-square btn-outline
              " @click="handleDeleteCart(cart.id)"
              >
                <i class="text-xl bi bi-x"></i>
              </button>
              <div class="md:w-1/2 lg:w-1/3">
                <img
                  :src="cart.product.imageUrl"
                  :alt="cart.product.title"
                  class="object-cover object-center"
                />
              </div>
              <div class="flex flex-col flex-auto justify-center">
                <p class="text-secondary-800 select-none md:pt-0
                badge badge-outline badge-md">{{ cart.product.category }}</p>
                <div class="flex gap-4 items-center pt-1">
                  <p class="text-base font-medium
                  text-secondary-800">{{ cart.product.title }}</p>
                  <div class="flex gap-1 items-center ml-auto">
                    <button class="btn btn-sm btn-outline btn-square"
                    :disabled="cart.qty === 1"
                    @click="
                    cart.qty = handleCountQty(cart.qty -= 1);
                    handleUpdateCart(cart.id, cart.qty)">
                      <svg
                        class="w-5 h-5 text-gray-300 animate-spin"
                        :class="isLoading === cart.id ? '' : 'hidden'"
                        :disabled="isLoading === cart.id"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
                          7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <i class="bi bi-dash-lg" :class="{ 'hidden' : isLoading === cart.id }" />
                    </button>
                    <span class="p-4">{{ cart.qty }}</span>
                    <button class="btn btn-sm btn-outline btn-square"
                    @click="cart.qty += 1; handleUpdateCart(cart.id, cart.qty)">
                      <svg
                        class="w-5 h-5 text-gray-300 animate-spin"
                        :class="isLoading === cart.id ? '' : 'hidden'"
                        :disabled="isLoading === cart.id"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
                          7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <i class="bi bi-plus-lg" :class="{ 'hidden' : isLoading === cart.id }" />
                    </button>
                  </div>
                </div>
                <ul class="pt-5 space-y-6">
                  <li class="flex justify-between items-center">
                  <p class="text-sm">
                    單價
                  </p>
                  <p class="text-sm font-black leading-none text-secondary-800">
                    NT${{ moneyFormat(cart.product.price) }}
                  </p>
                  </li>
                  <li class="flex justify-between items-center">
                    <p class="text-sm">
                      單一品項總價
                    </p>
                    <p class="text-base font-black leading-none text-secondary-800">
                      NT${{ moneyFormat(cart.product.price, cart.qty) }}
                    </p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="flex justify-end">
            <button
            @click="handleClearCart"
            v-if="cartList.length > 0"
            class="hover:text-secondary-100 hover:bg-secondary-700
            rounded border-secondary-700
            hover:border-transparent transition
            duration-300 ease-in-out btn btn-outline
            ">刪除全部品項</button>
          </div>
        </div>
        <div class="w-full bg-secondary-100 md:w-8/12 lg:w-96">
          <div
            class="flex overflow-y-auto flex-col justify-between
            py-6 px-4 h-auto md:py-10 md:px-7
            lg:py-20 lg:px-8 lg:h-screen"
          >
            <div>
              <h2 class="rfs:text-3xl font-medium leading-9 text-secondary-800 lg:text-4xl">合計</h2>
              <ul class="pt-12 space-y-6">
                <li class="flex justify-between items-center">
                  <p class="rfs:text-base leading-none text-secondary-800">小計</p>
                  <p class="rfs:text-base leading-none text-secondary-800">${{ cartTotalPrice }}</p>
                </li>
                <li class="flex justify-between items-center">
                  <p class="rfs:text-base leading-none text-secondary-800">優惠折價券</p>
                  <p class="rfs:text-base leading-none text-secondary-800">
                    {{checkCoupon.name ? checkCoupon.name : '您還未取得優惠券'}}
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <div class="flex justify-between items-center pt-20 pb-6 lg:pt-5">
                <p class="rfs:text-2xl leading-normal text-secondary-800">總計</p>
                <p class="rfs:text-2xl font-bold leading-normal text-right text-secondary-800">
                  ${{ cartFinalPrice }}
                </p>
              </div>
              <button
                @click="handleCheckout"
                :disabled="cartList.length === 0"
                class="
                w-full text-base leading-none text-secondary-50 bg-secondary-800
                border border-secondary-800 btn
              ">
                前往結賬
              </button>
            </div>
          </div>
        </div>
      </div>
  </VueFinalModal>
</template>
