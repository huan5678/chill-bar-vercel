<script>
import {
  ref,
  reactive,
  onBeforeMount,
} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import useStore from '@/stores';

export default {
  setup() {
    const baseUrl = process.env.VUE_APP_API_URL;
    const { adminStore } = useStore();
    const {
      handleSetLogin, handleCheckUser, handleGetToken,
    } = adminStore;
    const router = useRouter();
    const userName = ref('');
    const userPassword = ref('');
    const modalMessage = reactive({
      title: '',
      message: '',
      detail: '',
    });
    const openModal = ref(false);

    function handlerSubmit() {
      const username = userName.value;
      const password = userPassword.value;
      axios.post(`${baseUrl}admin/signin`, { username, password })
        .then((res) => {
          const data = {
            token: res.data.token,
            expired: res.data.expired,
          };
          handleSetLogin(data);
          modalMessage.message = res.data.message;
          modalMessage.title = '登入成功';
          openModal.value = true;
          setTimeout(() => {
            openModal.value = false;
            router.push('/admin');
          }, 3000);
        })
        .catch((err) => {
          modalMessage.message = err.response.data.message;
          modalMessage.detail = err.response.data.error.message;
          modalMessage.title = '登入失敗';
          openModal.value = true;
        });
    }

    function handleCloseModal() {
      openModal.value = false;
    }

    onBeforeMount(() => {
      handleGetToken();
      handleCheckUser();
    });

    return {
      userName,
      userPassword,
      handlerSubmit,
      openModal,
      handleCloseModal,
      modalMessage,
    };
  },
};
</script>

<template>
  <main class="flex justify-center items-center h-screen bg-gray-50">
    <div class="container max-w-lg">
      <form class="p-8 space-y-8 bg-white rounded shadow-sm"
      data-aos="fade-in" data-aos-once="true"
      @submit.prevent="handlerSubmit">
        <legend class="text-3xl font-medium
        tracking-wide text-center text-primary-600">管理者登入</legend>
        <div class="form-control">
          <label for="name" class="font-normal label">
            <span class="label-text">使用者帳號</span>
          </label>
          <input
            id="name"
            type="text"
            name="userName"
            placeholder="請輸入帳號Email"
            v-model.trim="userName"
            class="input form-style"
          />
        </div>
        <div class="form-control">
          <label for="password" class="font-normal label">
            <span class="label-text">使用者密碼</span></label>
          <input
            id="password"
            type="password"
            class="input form-style"
            v-model="userPassword"
            placeholder="請輸入密碼"
          />
        </div>
        <button
          type="submit"
          class="w-full text-secondary-50 bg-secondary-400 hover:bg-secondary-600 rounded-lg
          transition
          duration-300 btn"
        >
          登入
        </button>
      </form>
    </div>
    <AlertModal v-model="openModal" @handleCloseModal="handleCloseModal">
      <template v-slot:title>
        {{ modalMessage.title }}
      </template>
      <p class="mb-2 text-center">
        {{ modalMessage.message }}
      </p>
      <p>
        {{ modalMessage.detail }}
      </p>
    </AlertModal>
  </main>
</template>
