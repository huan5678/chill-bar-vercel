<script>
import { ref, watchEffect, computed } from 'vue';
import useStore from '@/stores';
import ModalCardTitle from './ModalCardTitle.vue';

export default {
  components: { ModalCardTitle },
  setup(props, context) {
    const { adminDataStore } = useStore();
    const { handleDeleteData, adminData } = adminDataStore;
    const productData = ref({ ...adminDataStore.adminData.tempProduct });

    watchEffect(() => {
      productData.value = { ...adminDataStore.adminData.tempProduct };
    });

    function closeModal() {
      context.attrs.handleOpenModal(false);
    }

    function handleSetDeleteProduct(id) {
      handleDeleteData(id);
      closeModal();
    }

    return {
      productData,
      handleSetDeleteProduct,
      handleOpenModal: context.attrs.handleOpenModal,
      closeModal,
      selectType: computed(() => adminData.selectedTarget),
    };
  },
};
</script>

<template>
  <section class="overflow-hidden space-y-4 bg-gray-50 rounded-md">
    <ModalCardTitle title="請確認是否刪除" :close-modal="handleOpenModal" />
    <p class="p-2 text-xl text-center text-secondary-500">
      {{ selectType === 'product'? '產品 : ' :
      selectType === 'order' ? '訂單編號 : ' :
      selectType === 'coupon' ? '優惠券 : ' : '文章 : ' }}
      {{ selectType === 'product'? productData.title :
      selectType === 'order' ? productData.id :
      selectType === 'coupon' ? productData.title : productData.id }}
    </p>
    <div class="container flex gap-4 justify-between p-4">
      <button
        class="flex-auto p-2 text-white bg-primary-500 hover:bg-primary-600
        rounded-md hover:shadow hover:shadow-primary-500 transition duration-300"
        type="button"
        @click="handleSetDeleteProduct(productData.id)"
      >
        確認刪除
      </button>
      <button
        class="flex-auto p-2 text-white bg-gray-500 hover:bg-gray-600
        rounded-md hover:shadow hover:shadow-gray-500 transition duration-300"
        @click="closeModal"
        type="button"
      >
        取消刪除
      </button>
    </div>
  </section>
</template>
