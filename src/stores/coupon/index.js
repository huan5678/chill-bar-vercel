import { reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import errorHandle from '@/helpers/errorHandle';

export const useCouponStore = defineStore('coupon', () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const apiPath = process.env.VUE_APP_API_PATH;
  const couponData = reactive({
    couponList: [
      {
        name: '驚喜大禮包',
        code: '5d003b6e',
        price: 0.5,
        rules: 'minus',
      },
      {
        name: '不是酒折給你打8折',
        code: '366ea893',
        price: 0.8,
        rules: 'cross',
      },
      {
        name: '老闆請你喝一杯',
        code: 'e02c47e7',
        price: 0.65,
        rules: 'minus',
      },
      {
        name: '你是醉棒的',
        code: 'db13f8e5',
        price: 0.9,
        rules: 'minus',
      },
    ],
    message: '',
    finalTotal: 0,
  });

  function handleUseCoupon(codeVal) {
    axios
      .post(`${baseUrl}api/${apiPath}/coupon`, {
        data: {
          code: codeVal,
        },
      })
      .then((res) => {
        // console.log(res.data);
        couponData.message = res.data.message;
        couponData.finalTotal = res.data.data.final_total;
        return res.data.success;
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  return {
    couponData,
    handleUseCoupon,
  };
});
export default useCouponStore;
