import { reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import errorHandle from '@/helpers/errorHandle';

export const useOrderStore = defineStore('order', () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const apiPath = process.env.VUE_APP_API_PATH;
  const orderResult = reactive({
    success: false,
    message: '',
    total: 0,
    create_at: 0,
    orderId: '',
  });
  const orderList = reactive({
    success: false,
    orders: [],
    pagination: {},
    message: [],
  });
  const orderData = reactive({
    success: false,
    order: {},
    total: 0,
    user: {},
  });

  function handleSendOrder(data) {
    axios
      .post(`${baseUrl}api/${apiPath}/order`, {
        data: {
          user: {
            name: data.name,
            email: data.email,
            tel: data.tel,
            address: data.address,
          },
          message: data.message,
        },
      })
      .then((res) => {
        // console.log(res.data);
        orderResult.success = res.data.success;
        orderResult.message = res.data.message;
        orderResult.total = res.data.total;
        orderResult.create_at = res.data.create_at;
        orderResult.orderId = res.data.orderId;
        localStorage.setItem('order_id', res.data.orderId);
        return res.data.success;
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleGetOrderData(id) {
    axios
      .get(`${baseUrl}api/${apiPath}/order/${id}`)
      .then((res) => {
        orderData.success = res.data.success;
        orderData.order = res.data.order;
        orderData.total = res.data.total;
        orderData.user = res.data.user;
        return res.data.success;
      })
      .catch((err) => {
        errorHandle(err);
        return err.response.success;
      });
  }

  function handleGetOrderList() {
    axios
      .get(`${baseUrl}api/${apiPath}/orders`)
      .then((res) => {
        // console.log(res.data);
        orderList.success = res.data.success;
        orderList.orders = res.data.orders;
        orderList.pagination = res.data.pagination;
        orderList.message = res.data.message;
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  return {
    orderResult,
    orderList,
    orderData,
    handleSendOrder,
    handleGetOrderList,
    handleGetOrderData,
  };
});
export default useOrderStore;
