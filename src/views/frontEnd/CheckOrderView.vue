<script>
import useStore from '@/stores';
import {
  onMounted,
  computed,
  watch,
  ref,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import OrderForm from '@/components/OrderForm.vue';
import CheckStep from '@/components/CheckStep.vue';
import TheRecommend from '@/components/TheRecommend.vue';
import moneyFormat from '@/helpers/moneyFormat';

export default {
  components: {
    OrderForm,
    CheckStep,
    TheRecommend,
  },
  setup() {
    const { cartStore, couponStore, orderStore } = useStore();
    const {
      cartData,
      handleGetCart,
      handleDeleteCart,
      handleClearCart,
      handleUpdateCart,
    } = cartStore;
    const { couponData, handleUseCoupon } = couponStore;
    const { orderResult } = storeToRefs(orderStore);
    const showRecommended = ref(false);
    const router = useRouter();

    watch(
      () => cartData.cart,
      (newValue) => {
        if (newValue.length > 0) handleGetCart();
      },
    );

    function handleGoConfirm() {
      router.push('confirm');
    }

    watch(
      () => orderResult.value.success,
      (newVal) => {
        if (newVal === true) {
          handleGoConfirm();
          localStorage.removeItem('coupon');
        }
      },
    );

    const checkCoupon = ref('');
    const couponList = computed(() => couponData.couponList);
    const coupon = localStorage.getItem('coupon');

    onMounted(() => {
      handleGetCart();
      if (coupon !== null) {
        handleUseCoupon(coupon);
        [checkCoupon.value] = couponList.value.filter((item) => item.code === coupon);
      }
    });

    function handleCloseModal() {
      showRecommended.value = false;
    }
    return {
      cartList: computed(() => cartData.list),
      cartTotalPrice: computed(() => moneyFormat(cartData.totalPrice)),
      cartFinalPrice: computed(() => moneyFormat(cartData.finalPrice)),
      cartResultPrice: computed(() => cartData.resultPrice),
      handleDeleteCart,
      handleClearCart,
      handleUpdateCart,
      moneyFormat,
      showRecommended,
      checkCoupon,
      orderResult,
      handleCloseModal,
    };
  },
};
</script>

<template>
  <section class="py-8 bg-gray-200">
    <CheckStep active="1" />
    <div class="container">
      <div class="flex flex-wrap gap-4
      justify-between lg:flex-nowrap">
        <div class="flex flex-col flex-auto pb-4
        space-y-8 w-full border-b border-secondary-500
        md:w-2/3
        lg:pt-14 lg:border-0">
          <h1 class="py-4 text-2xl font-medium text-center">訂單內容</h1>
          <ul id="list" class="overflow-y-auto space-y-4 max-h-[50vh]">
            <li v-for="cart in cartList" :key="cart.id"
            class="flex gap-4 justify-between items-center
            px-4 pb-4 border-b border-secondary-200">
              <div class="flex gap-4">
                <img
                  class="object-cover w-20 h-20"
                  :src="cart.product.imageUrl"
                  :alt="cart.product.title"
                />
                <div class="space-y-4">
                  <h3 class="text-xl font-medium">{{ cart.product.title }}</h3>
                  <span class="block font-mono tracking-wider">數量：{{ cart.qty }}</span>
                </div>
              </div>
              <span class="font-mono tracking-widest">
                NT${{ moneyFormat(cart.product.price, cart.qty) }}
              </span>
            </li>
          </ul>
          <div class="flex justify-between">
            <div class="flex justify-start items-center p-4">
              <label class="gap-2 cursor-pointer label">
                <span class="text-lg">還想加購點什麼</span>
                <input type="checkbox" class="toggle" v-model="showRecommended">
              </label>
            </div>
            <div class="text-right">
              <p v-if="cartList.length === 0"
              class="text-2xl text-center text-secondary-500">
                您的購物車是空的
              </p>
              <p class="mb-2 rfs:text-lg font-medium" v-if="checkCoupon?.name">
                已套用折價券<br />
                <span class="rfs:text-xl font-light">{{ checkCoupon?.name }}</span>
              </p>
              <p class="rfs:text-2xl font-medium tracking-widest" v-show="cartList.length > 0">
                總金額
              </p>
              <p class="font-mono text-xl font-extralight" v-show="cartList.length > 0">
                NT${{ moneyFormat(cartResultPrice) }}
              </p>
            </div>
          </div>
        </div>
        <div class="lg:divider lg:divider-horizontal" />
        <OrderForm />
      </div>
      <AlertModal class="select-none" v-model="showRecommended"
        @handleCloseModal="handleCloseModal" :closeButton="false">
        <template v-slot:title>現在我想來點</template>
        <TheRecommend v-if="showRecommended" title="還有些好貨"
        titleClass="rfs:text-2xl" class="text-secondary-700 bg-transparent" limit="10" />
      </AlertModal>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.divider-horizontal {
  &:before {
    width: 1px;
  }
  &:after {
    width: 1px;
  }
}
</style>
