import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import axios from 'axios';
import errorHandle from '@/helpers/errorHandle';

export const useAdminStore = defineStore('admin', () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const token = ref('');
  const expired = ref('');
  const isLoggedIn = ref(false);
  const router = useRouter();
  const params = useRoute();

  const handleGetToken = function () {
    const cookies = document.cookie.split('backendToken=').pop();
    token.value = cookies;
    return cookies;
  };

  const handleCheckUser = async function () {
    if (token.value) {
      axios.defaults.headers.common.Authorization = token.value;
      await axios
        .post(`${baseUrl}api/user/check`)
        .then((res) => {
          isLoggedIn.value = res.data.success;
          if (params.name !== 'admin') {
            router.push('admin');
          }
        })
        .catch((err) => {
          isLoggedIn.value = err.response.data.success;
          errorHandle(err);
          router.push('login');
        });
    } else {
      router.push('login');
    }
  };

  function handleSetLogin(data) {
    token.value = data.token;
    expired.value = data.expired;
    isLoggedIn.value = true;
    document.cookie = `backendToken=${data.token}; expires=${new Date(data.expired)};`;
  }
  function handleSetLogout() {
    isLoggedIn.value = false;
    token.value = '';
    expired.value = '';
    axios.post(`${baseUrl}logout`);
  }

  function handleClearToken() {
    document.cookie = `backendToken=; expires=${new Date(0)};`;
  }

  return {
    token,
    expired,
    isLoggedIn,
    handleSetLogin,
    handleSetLogout,
    handleCheckUser,
    handleGetToken,
    handleClearToken,
  };
});
export default useAdminStore;
