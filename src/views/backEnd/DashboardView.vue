<script>
import {
  onBeforeMount,
  onMounted,
  computed,
  toRef,
} from 'vue';
import { $vfm } from 'vue-final-modal';
import handleSweetAlert from '@/helpers/handleSweetAlert';

import useStore from '@/stores';
import DashboardTable from '@/components/DashboardTable.vue';
import ModalProductDetail from '@/components/modal/ModalProductDetail.vue';
import ModalCardDelete from '@/components/modal/ModalCardDelete.vue';
import ModalProductAddition from '@/components/modal/ModalProductAddition.vue';
import ModalOrderDetail from '@/components/modal/ModalOrderDetail.vue';
import ModalCouponDetail from '@/components/modal/ModalCouponDetail.vue';
import ModalCouponAddition from '@/components/modal/ModalCouponAddition.vue';
import ModalArticleAddition from '@/components/modal/ModalArticleAddition.vue';
import ModalArticleDetail from '@/components/modal/ModalArticleDetail.vue';
import ModalOrderAddition from '@/components/modal/ModalOrderAddition.vue';

export default {
  components: {
    DashboardTable,
    ModalCardDelete,
    ModalProductDetail,
    ModalProductAddition,
    ModalOrderDetail,
    ModalCouponDetail,
    ModalCouponAddition,
    ModalArticleAddition,
    ModalArticleDetail,
    ModalOrderAddition,
  },
  setup() {
    const { adminStore, adminDataStore } = useStore();
    const { handleCheckUser, handleGetToken, isLoggedIn } = adminStore;
    const { functionSelected, adminData } = adminDataStore;

    function handleOpenModal(boolean = true) {
      adminData.isOpenModal = boolean;
      $vfm.show('adminModal');
    }

    const isOpenModal = toRef(adminData, 'isOpenModal');

    onBeforeMount(() => {
      handleGetToken();
      handleCheckUser();
    });

    onMounted(() => {
      if (isLoggedIn) {
        handleSweetAlert({
          title: '您已成功登入',
          icon: 'success',
          iconColor: '#f59f13',
          timer: 3000,
        });
      }
    });

    return {
      handleOpenModal,
      isOpenModal,
      modalState: computed(() => functionSelected.selected),
    };
  },
};
</script>

<template>
  <main class="bg-gray-100">
    <div class="container">
      <DashboardTable />
      <VueFinalModal
        v-model="isOpenModal"
        id="adminModal"
        classes="flex justify-center items-center bg-opacity-50 backdrop-blur-[2px]"
        focus-trap
      >
        <ModalCardDelete v-if="modalState === 'productDelete'" :handleOpenModal="handleOpenModal" />
        <ModalProductDetail
        v-if="modalState === 'getProductDetail'"
        :handleOpenModal="handleOpenModal" />
        <ModalProductAddition
          v-if="modalState === 'productEdit' || modalState === 'productCreate'"
          :handleOpenModal="handleOpenModal"
        />
        <ModalOrderDetail
        v-if="modalState === 'getOrderDetail'"
        :handleOpenModal="handleOpenModal" />
        <ModalOrderAddition
        v-if="modalState === 'orderEdit'"
        :handleOpenModal="handleOpenModal" />
        <ModalCouponDetail v-if="modalState === 'couponDetail'"
        :handleOpenModal="handleOpenModal" />
        <ModalCouponAddition v-if="modalState === 'couponEdit' || modalState === 'couponCreate'"
        :handleOpenModal="handleOpenModal" />
        <ModalArticleDetail v-if="modalState === 'getArticleDetail'"
        :handleOpenModal="handleOpenModal" />
        <ModalArticleAddition v-if="modalState === 'articleEdit' || modalState === 'articleCreate'"
        :handleOpenModal="handleOpenModal" />
      </VueFinalModal>
    </div>
  </main>
</template>
