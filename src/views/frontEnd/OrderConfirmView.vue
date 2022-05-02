<script>
import {
  onMounted,
  computed,
  reactive,
  ref,
} from 'vue';
import { useRouter } from 'vue-router';
import useStore from '@/stores';
import CheckStep from '@/components/CheckStep.vue';
import moneyFormat from '@/helpers/moneyFormat';
import axios from 'axios';

export default {
  components: {
    CheckStep,
  },
  setup() {
    const router = useRouter();
    const {
      orderStore,
    } = useStore();
    const {
      orderData,
      orderResult,
      handleGetOrderData,
    } = orderStore;

    const baseUrl = process.env.VUE_APP_API_URL;
    const apiPath = process.env.VUE_APP_API_PATH;

    const steps = ref(2);

    const paymentData = reactive(
      {
        success: false,
        order: {},
        total: 0,
        user: {},
        is_paid: false,
      },
    );

    const orderId = localStorage.getItem('order_id');

    function handlePayment(id) {
      axios.post(`${baseUrl}api/${apiPath}/pay/${id}`)
        .then((res) => {
          paymentData.success = res.data.success;
          paymentData.order = res.data.order;
          paymentData.total = res.data.total;
          paymentData.user = res.data.user;
          steps.value = 3;
          localStorage.removeItem('order_id');
        })
        .catch((err) => console.dir(err));
    }

    function handleToProduct() {
      router.push('product');
    }

    onMounted(() => {
      if (orderResult.orderId) {
        handleGetOrderData(orderResult.orderId);
      } else if (orderId !== null) {
        handleGetOrderData(orderId);
      }
    });
    return {
      steps,
      moneyFormat,
      handlePayment,
      paymentData,
      confirmData: computed(() => orderData),
      orderId,
      handleToProduct,
      success: computed(() => paymentData.success),
    };
  },
};
</script>

<template>
  <section class="py-8 min-h-[80vh] bg-gray-200">
    <CheckStep :active="`${steps}`" />
    <div class="container pt-4">
      <div class="flex flex-wrap gap-4
      justify-between lg:flex-nowrap"
      v-if="confirmData.total !== 0">
        <div class="flex flex-col flex-auto
        justify-between pb-4 w-full border-b border-secondary-500
        md:w-2/3
        lg:pt-14 lg:pb-20 lg:border-0">
          <h2 class="py-4 text-2xl font-medium text-center">訂單內容</h2>
          <ul id="list" class="overflow-y-auto space-y-4 max-h-[50vh]">
            <li v-for="data in confirmData.order.products" :key="data.id"
            class="flex gap-4 justify-between items-center
            px-4 pb-4 border-b border-secondary-200">
              <div class="flex gap-4">
                <img
                  class="object-cover w-20 h-20"
                  :src="data.product.imageUrl"
                  :alt="data.product.title"
                />
                <div class="space-y-4">
                  <h3 class="text-xl font-medium">{{ data.product.title }}</h3>
                  <span class="block font-mono tracking-wider">數量：{{ data.qty }}</span>
                </div>
              </div>
              <span class="font-mono tracking-widest">
                單項小記<br />
                NT${{ moneyFormat(data.final_total) }}
              </span>
            </li>
          </ul>
          <ul class="pt-4 space-y-2 text-right">
            <li class="text-xl font-medium tracking-widest">
              總金額
            </li>
            <li class="pb-2 font-mono text-2xl
            font-extralight border-b border-secondary-200">
              NT${{ moneyFormat(confirmData.order.total) }}
            </li>
            <li class="text-lg font-medium tracking-widest">
              訂單是否完成付款
            </li>
            <li class="text-xl font-medium tracking-widest">
              {{ success ? '已完成付款' : '未完成付款' }}
            </li>
          </ul>
        </div>
        <div class="lg:divider lg:divider-horizontal"></div>
        <div class="w-full md:w-1/2 lg:w-1/3">
          <h1 class="py-4 text-2xl font-medium text-center">訂購資訊</h1>
          <ul class="mb-4 space-y-2">
            <li class="flex gap-2 justify-between items-center">
              <span>訂購人姓名</span>
              <span>{{ confirmData.order.user?.name }}</span>
            </li>
            <li class="flex gap-2 justify-between items-center">
              <span>訂購人電話</span>
              <span>{{ confirmData.order.user?.tel }}</span>
            </li>
            <li class="flex gap-2 justify-between items-center">
              <span>訂購人Email</span>
              <span>{{ confirmData.order.user?.email }}</span>
            </li>
            <li class="flex gap-2 justify-between items-center">
              <span>寄件地址</span>
              <span>{{ confirmData.order.user?.address }}</span>
            </li>
          </ul>
          <button type="button"
          class="w-full text-secondary-700
          rounded border-secondary-700
          btn btn-outline
          " :class="{
            'disabled': paymentData.success,
            'cursor-not-allowed': paymentData.success,
            'opacity-30': paymentData.success,
            'hover:bg-secondary-700': !paymentData.success,
            'hover:text-secondary-100': !paymentData.success,
            }"
          @click="handlePayment(confirmData.orderId)">信用卡付款</button>
        </div>
      </div>
      <div v-else class="flex flex-col justify-center
      items-center space-y-8 min-h-[50vh]">
        <h1 class="rfs:text-2xl font-medium text-secondary-700
        ">目前沒有訂單</h1>
        <button type="button" @click="handleToProduct"
        class="text-xl font-normal text-primary-600 hover:text-primary-100 hover:bg-primary-600
        hover:border-primary-600 btn
        btn-lg btn-wide btn-outline">
          看看其他商品吧
        </button>
      </div>
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
