import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useAdminStore } from '@/stores/admin';
import axios from 'axios';
import errorHandle from '@/helpers/errorHandle';

export const useAdminDataStore = defineStore('adminData', () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const apiPath = process.env.VUE_APP_API_PATH;

  const adminData = reactive({
    selectedTarget: 'product',
    selectedTargetIndex: 0,
    dataList: [],
    pagination: {},
    currentPage: 1,
    category: null,
    tempProduct: {},
    isOpenModal: false,
    errorMessage: '',
  });

  const functionSelected = reactive({
    selected: '',
  });

  function handleResetTempProduct() {
    adminData.tempProduct = {};
  }

  function handleSelectFunction(selected, item) {
    functionSelected.selected = selected;
    adminData.tempProduct = item;
  }

  function handleControlModal(boolean = false) {
    adminData.isOpenModal = boolean;
  }

  const adminStore = useAdminStore();

  function handleGetDataAll() {
    let target = adminData.selectedTarget;
    switch (target) {
      case 'product':
        target = 'products/all';
        break;
      case 'order':
        target = 'orders';
        break;
      case 'coupon':
        target = 'coupons';
        break;
      case 'article':
        target = 'articles';
        break;
      default:
        target = 'products';
        break;
    }
    axios
      .get(`${baseUrl}api/${apiPath}/admin/${adminData.selectedTarget}`, {
        token: adminStore.token,
      })
      .then((res) => {
        adminData.dataList = res.data[`${target}`];
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleGetDataList(page, category) {
    let target = adminData.selectedTarget;
    switch (target) {
      case 'product':
        target = 'products';
        break;
      case 'order':
        target = 'orders';
        break;
      case 'coupon':
        target = 'coupons';
        break;
      case 'article':
        target = 'articles';
        break;
      default:
        target = 'products';
        break;
    }
    let currentPage = page;
    if (page === undefined) {
      currentPage = adminData.currentPage;
    }
    let productCategory = `&category=${category}`;
    if (category === null || category === undefined) {
      productCategory = '';
    }
    axios
      .get(`${baseUrl}api/${apiPath}/admin/${target}/?page=${currentPage}${productCategory}`, {
        token: adminStore.token,
      })
      .then((res) => {
        adminData.dataList = res.data[`${target}`];
        adminData.pagination = res.data.pagination;
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleEditData(id, item) {
    let target = adminData.selectedTarget;
    switch (target) {
      case 'order':
        target = 'order';
        break;
      case 'coupon':
        target = 'coupon';
        break;
      case 'article':
        target = 'article';
        break;
      default:
        target = 'product';
        break;
    }
    axios
      .put(`${baseUrl}api/${apiPath}/admin/${target}/${id}`, item, {
        token: adminStore.token,
      })
      .then(() => {
        handleGetDataList(adminData.currentPage, adminData.category);
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleDeleteData(id = null) {
    let target = adminData.selectedTarget;
    switch (target) {
      case 'order':
        target = 'orders/all';
        break;
      case 'coupon':
        target = 'coupon';
        break;
      case 'article':
        target = 'article';
        break;
      default:
        target = 'product';
        break;
    }
    axios
      .delete(`${baseUrl}api/${apiPath}/admin/${target}/${id}`, { token: adminStore.token })
      .then(() => {
        handleGetDataList(adminData.currentPage, adminData.category);
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleCreateData(data) {
    axios
      .post(`${baseUrl}api/${apiPath}/admin/${adminData.selectedTarget}`, data, {
        token: adminStore.token,
      })
      .then(() => {
        handleGetDataList(adminData.currentPage);
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleImageUpload(file) {
    const formData = new FormData();
    formData.append('file-to-upload', file);
    return axios.post(`${baseUrl}api/${apiPath}/admin/upload`, formData, {
      token: adminStore.token,
    });
  }

  return {
    adminData,
    functionSelected,
    handleControlModal,
    handleCreateData,
    handleGetDataAll,
    handleGetDataList,
    handleEditData,
    handleDeleteData,
    handleImageUpload,
    handleSelectFunction,
    handleResetTempProduct,
  };
});
export default useAdminDataStore;
