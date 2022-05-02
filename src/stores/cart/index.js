import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import errorHandle from '@/helpers/errorHandle';

export const useCartStore = defineStore('cart', () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const apiPath = process.env.VUE_APP_API_PATH;
  const cartData = reactive({
    data: {},
    message: '',
    list: [],
    totalPrice: 0,
    finalPrice: 0,
    isOpenCart: false,
    resultPrice: 0,
    checkoutStep: 1,
    errorMessage: '',
  });

  const isLoading = ref('');

  function handleSetResult(val) {
    cartData.resultPrice = val;
  }

  function handleSetCheckoutStep(val) {
    cartData.checkoutStep = val;
  }

  function handleGetCart() {
    axios
      .get(`${baseUrl}api/${apiPath}/cart`)
      .then((res) => {
        cartData.list = res.data.data.carts;
        cartData.totalPrice = res.data.data.total;
        cartData.finalPrice = res.data.data.final_total;
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleAddCart(id, qty = 1) {
    isLoading.value = id;
    axios
      .post(`${baseUrl}api/${apiPath}/cart`, {
        data: {
          product_id: id,
          qty,
        },
      })
      .then((res) => {
        cartData.data = res.data.data;
        cartData.message = res.data.message;
        isLoading.value = '';
        handleGetCart();
      })
      .catch((err) => {
        errorHandle(err);
        isLoading.value = '';
      });
  }

  function handleDeleteCart(id) {
    isLoading.value = id;
    axios
      .delete(`${baseUrl}api/${apiPath}/cart/${id}`)
      .then((res) => {
        cartData.message = res.data.message;
        isLoading.value = '';
        handleGetCart();
      })
      .catch((err) => {
        errorHandle(err);
        isLoading.value = '';
      });
  }

  function handleUpdateCart(id, qty) {
    isLoading.value = id;
    axios
      .put(`${baseUrl}api/${apiPath}/cart/${id}`, {
        data: {
          product_id: id,
          qty,
        },
      })
      .then((res) => {
        cartData.message = res.data.message;
        isLoading.value = '';
        handleGetCart();
      })
      .catch((err) => {
        errorHandle(err);
        isLoading.value = '';
      });
  }

  function handleClearCart() {
    axios
      .delete(`${baseUrl}api/${apiPath}/carts`)
      .then((res) => {
        cartData.message = res.data.message;
        handleGetCart();
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  return {
    cartData,
    isLoading,
    handleAddCart,
    handleGetCart,
    handleDeleteCart,
    handleUpdateCart,
    handleClearCart,
    handleSetResult,
    handleSetCheckoutStep,
  };
});
export default useCartStore;
