<script>
import { computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
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

    const couponData = computed(() => adminData.tempProduct);

    function closeModal() {
      context.attrs.handleOpenModal(false);
    }

    function handleToggleActive() {
      if (couponData.value.is_enabled === 1) {
        couponData.value.is_enabled = 0;
      } else {
        couponData.value.is_enabled = 1;
      }
    }

    function handleResetFormInput() {
      couponData.value = {
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
          title: couponData.value.title,
          is_enabled: couponData.value.is_enabled ? 1 : 0,
          percent: parseInt(couponData.value.percent, 10),
          due_date: new Date(couponData.value.due_date).getTime(),
          code: String(couponData.value.code),
        },
      };
      if (functionSelected.selected === 'couponEdit') {
        handleEditData(couponData.value.id, data);
      } else {
        handleCreateData(data);
      }
      handleResetFormInput();
    }

    function handleCreateCode() {
      [couponData.value.code] = uuidv4().split('-');
    }

    return {
      selectType: computed(() => functionSelected.selected),
      couponData,
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
      :title="selectType === 'couponEdit' ? '內容編輯' : '新增優惠券'"
      :close-modal="handleOpenModal"
    />
    <form class="container p-4 space-y-4" @submit.prevent="handleProductAddition">
      <div class="flex flex-wrap justify-between">
        <div class="flex gap-4 justify-between w-full">
          <div class="flex-auto">
            <label for="couponName" class="block mb-4"
              >優惠券名稱</label>
              <input
                type="text"
                id="couponName"
                name="couponName"
                class="w-full form-style"
                v-model="couponData.title"
                required
              />
          </div>
          <div class="form-control">
            <label for="couponCode" class="label"
              ><span class="label-text">產生優惠券代碼</span></label>
              <div class="flex gap-2">
                <span class="form-control">
                  {{ couponData.code }}
                </span>
                <button
                  type="button"
                  id="couponCode"
                  name="couponCode"
                  class="btn btn-sm btn-square btn-outline"
                  @click="handleCreateCode"
                >
                <i class="bi bi-gift-fill"></i>
                </button>
              </div>
          </div>
          <div class="form-control">
            <label for="couponPercent" class="label"
              ><span class="label-text">優惠券折價</span></label>
              <input
                type="text"
                id="couponPercent"
                name="couponPercent"
                class="w-full form-style"
                v-model="couponData.percent"
                required
              />
          </div>
        </div>
      </div>
      <div class="flex gap-4 justify-between w-full">
        <div class="form-control">
          <label for="couponDate" class="label"
            ><span class="label-text">優惠券使用期限</span></label>
            <input
              type="date"
              id="couponDate"
              name="couponDate"
              class="w-full form-style"
              v-model="couponData.due_date"
            />
        </div>
        <div class="flex-auto">
          <span class="block mb-4">是否啟用優惠券</span>
          <div class="flex gap-2 justify-start items-center">
            <input id="couponIsEnabled"
            class="toggle"
              type="checkbox"
              v-model="couponData.is_enabled"
              />
            <label for="couponIsEnabled" class="p-2">
              {{ couponData.is_enabled === true ? '啟用' : '未啟用' }}
            </label>
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
          {{ selectType === 'couponEdit' ? '取消修改' : '取消新增' }}
        </button>
        <button
          class="flex-auto py-2 text-white bg-primary-500 hover:bg-primary-600
          rounded-md hover:shadow hover:shadow-primary-400
          transition duration-300"
          type="submit"
        >
          {{ selectType === 'couponEdit' ? '確定修改' : '新增優惠券' }}
        </button>
      </div>
    </form>
  </section>
</template>
