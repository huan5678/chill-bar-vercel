<script>
import { computed } from 'vue';
import useStore from '@/stores';
import ModalCardTitle from './ModalCardTitle.vue';

export default {
  components: { ModalCardTitle },
  props: { products: Object },
  setup(props, context) {
    const { adminDataStore } = useStore();
    const {
      handleEditData, handleCreateData, functionSelected, adminData,
    } = adminDataStore;

    const orderData = computed(() => adminData.tempProduct);

    function closeModal() {
      context.attrs.handleOpenModal(false);
    }

    function handleToggleActive() {
      if (orderData.value.is_enabled === 1) {
        orderData.value.is_enabled = 0;
      } else {
        orderData.value.is_enabled = 1;
      }
    }

    function handleResetFormInput() {
      orderData.value = {
        title: '',
        percent: 0,
        is_enabled: 0,
        due_date: '',
        code: '',
      };
      closeModal();
    }

    function handleProductAddition() {
      const data = {
        data: {
          title: orderData.value.title,
          is_enabled: orderData.value.is_enabled ? 1 : 0,
          percent: parseInt(orderData.value.percent, 10),
          due_date: new Date(orderData.value.due_date).getTime(),
          code: String(orderData.value.code),
        },
      };
      if (functionSelected.selected === 'orderEdit') {
        handleEditData(orderData.value.id, data);
      } else {
        handleCreateData(data);
      }
      handleResetFormInput();
    }

    function handleCreateCode() {
      orderData.value.code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    }

    return {
      selectType: computed(() => functionSelected.selected),
      orderData,
      handleResetFormInput,
      handleProductAddition,
      handleOpenModal: context.attrs.handleOpenModal,
      closeModal,
      handleCreateCode,
      handleToggleActive,
    };
  },
};
</script>

<template>
  <section class="flex overflow-hidden flex-col pb-4 space-y-4 bg-gray-50 rounded-md">
    <ModalCardTitle
      title="內容編輯"
      :close-modal="handleOpenModal"
    />
    <form class="container p-4 space-y-4" @submit.prevent="handleProductAddition">
      <div class="flex flex-wrap justify-between">
        <div class="flex gap-4 justify-between w-full">
          <div class="flex-auto">
            <label for="userName" class="block mb-4"
              >訂購人姓名</label>
              <input
                type="text"
                id="userName"
                name="userName"
                class="w-full rounded"
                v-model="orderData.user.name"
                required
              />
          </div>
          <div class="flex-auto">
            <label for="userTel" class="block mb-4"
              >訂購人電話</label>
              <input
                type="text"
                id="userTel"
                name="userTel"
                class="w-full rounded"
                v-model="orderData.user.tel"
                required
              />
          </div>
          <div class="flex-auto">
            <label for="userAddress" class="block mb-4"
              >收件地址</label>
              <input
                type="text"
                id="userAddress"
                name="userAddress"
                class="w-full rounded"
                v-model="orderData.user.address"
                required
              />
          </div>
        </div>
      </div>
      <div class="flex gap-4 justify-between">
        <button
          class="flex-auto py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md hover:shadow
          hover:shadow-gray-400 transition duration-300"
          @click="handleResetFormInput()"
          type="reset"
        >
          取消修改
        </button>
        <button
          class="flex-auto py-2 text-white bg-primary-500 hover:bg-primary-600
          rounded-md hover:shadow hover:shadow-primary-400
          transition duration-300"
          type="submit"
        >
          確定修改
        </button>
      </div>
    </form>
  </section>
</template>
