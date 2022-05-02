import { reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import errorHandle from '@/helpers/errorHandle';

export const useBookingDateStore = defineStore('bookingDates', () => {
  const crosUrl = 'https://esc-cros-anywhere.herokuapp.com/';
  const baseUrl = 'https://chill-bar-sp.herokuapp.com';
  const apiPath = 'api/v1';

  const datesData = reactive({
    bookingList: [],
    bookingData: {},
    tempData: {},
    isLoading: false,
    errorMessage: '',
  });

  function handleResetTempData() {
    datesData.tempData = {};
  }

  function handleGetBookingDataAll() {
    axios
      .get(`${crosUrl}${baseUrl}/${apiPath}/dates`)
      .then((res) => {
        datesData.bookingList = res.data;
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleGetBookingData(id) {
    axios
      .get(`${crosUrl}${baseUrl}/${apiPath}/date/${id}`)
      .then((res) => {
        datesData.bookingData = res.data.order;
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleEditBookingData(id, item) {
    axios
      .put(`${crosUrl}${baseUrl}/${apiPath}/date/${id}`, item)
      .then(() => {
        handleGetBookingDataAll();
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleDeleteBookingData(id = null) {
    axios
      .delete(`${crosUrl}${baseUrl}/${apiPath}/date/${id}`)
      .then(() => {
        handleGetBookingDataAll();
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleCreateBookingData(data) {
    datesData.isLoading = true;
    axios
      .post(`${crosUrl}${baseUrl}/${apiPath}/date`, data)
      .then(() => {
        handleGetBookingDataAll();
        datesData.isLoading = false;
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  return {
    datesData,
    handleGetBookingDataAll,
    handleGetBookingData,
    handleEditBookingData,
    handleDeleteBookingData,
    handleCreateBookingData,
    handleResetTempData,
  };
});
export default useBookingDateStore;
