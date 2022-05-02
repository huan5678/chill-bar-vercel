<script>
import { ref } from 'vue';

export default {
  setup() {
    const email = ref('');
    const handleSubscribed = function (emailSet) {
      if (email.value !== undefined || email.value !== '') {
        let subscribedEmailArr = [];
        subscribedEmailArr = JSON.parse(localStorage.getItem('subscribedEmail')) || [];
        if (subscribedEmailArr.findIndex(emailSet) === -1) {
          subscribedEmailArr.push(emailSet);
          localStorage.setItem('subscribedEmail', JSON.stringify(subscribedEmailArr));
          email.value = '';
        }
      }
    };
    return {
      email,
      handleSubscribed,
    };
  },
};
</script>

<template>
    <aside class="p-12 bg-secondary-100 sm:p-16 lg:p-24">
      <div class="mx-auto max-w-xl text-center">
        <p class="rfs:text-lg font-normal text-secondary-400">
          不要錯過第一手最新消息
        </p>

        <p class="mt-2 rfs:text-2xl font-thin text-secondary-600 sm:text-4xl">
          現在訂閱電子報由時未晚
        </p>

        <form class="mt-8 sm:flex" @submit.prevent="handleSubscribed(email)">
          <div class="sm:flex-1 form-control">
            <label for="email" class="sr-only label"><span class="label-text">Email</span></label>
            <input
              type="email"
              placeholder="請輸入電子郵件信箱"
              class="input form-style"
              v-model="email"
            />
          </div>
          <button
            type="submit"
            class="font-normal text-white bg-primary-500 hover:bg-primary-500/80
            border-0 sm:mt-0 sm:ml-4 sm:w-auto btn"
          >
            訂閱電子報
            <i class="ml-3 text-2xl bi bi-envelope-plus"></i>
          </button>
        </form>
      </div>
    </aside>
</template>
