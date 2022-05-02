<script>
import { computed, ref, onMounted } from 'vue';
import useStore from '@/stores';
import ProductsTable from '@/components/table/ProductsTable.vue';
import OrdersTable from '@/components/table/OrdersTable.vue';
import CouponsTable from '@/components/table/CouponsTable.vue';
import ArticlesTable from '@/components/table/ArticlesTable.vue';

export default {
  setup() {
    const { adminDataStore } = useStore();
    const { adminData, handleGetDataList } = adminDataStore;
    const adminListTarget = ref([
      {
        en: 'product',
        zh_Tw: '產品',
      },
      {
        en: 'order',
        zh_Tw: '訂單',
      },
      {
        en: 'coupon',
        zh_Tw: '優惠券',
      },
      {
        en: 'article',
        zh_Tw: '文章',
      },
    ]);

    function handleSelectListType(target, idx) {
      adminData.selectedTarget = target;
      adminData.selectedTargetIndex = idx;
      handleGetDataList();
    }

    onMounted(() => {
      handleGetDataList();
    });

    return {
      adminListTarget,
      adminData: computed(() => adminData),
      handleSelectListType,
      handleGetDataList,
    };
  },
  components: {
    ProductsTable,
    OrdersTable,
    CouponsTable,
    ArticlesTable,
  },
};
</script>
<template>
  <section class="overflow-auto p-2 space-y-4 min-h-screen">
    <div class="flex gap-4 justify-center items-end p-6">
      <h2 class="text-4xl font-medium">
        {{ adminListTarget[adminData.selectedTargetIndex].zh_Tw }}列表
      </h2>
      <ul class="flex ml-auto">
        <li v-for="(item, idx) in adminListTarget" :key="item">
          <button
            type="button"
            class="px-2 border-b"
            :class="
              adminData.selectedTargetIndex === idx
                ? 'border-b border-secondary-700 text-secondary-700'
                : `border-secondary-300 text-secondary-300
          hover:border-secondary-500 hover:text-secondary-500`
            "
            @click="handleSelectListType(item.en, idx)"
          >
            {{ item.zh_Tw }}
          </button>
        </li>
      </ul>
    </div>
    <ProductsTable v-if="adminData.selectedTarget === 'product'" />
    <OrdersTable v-if="adminData.selectedTarget === 'order'" />
    <CouponsTable v-if="adminData.selectedTarget === 'coupon'" />
    <ArticlesTable v-if="adminData.selectedTarget === 'article'" />
    <!-- 分頁 -->
    <ul class="flex gap-4 justify-center items-center pb-12 mx-auto">
      <li>
        <button
          type="button"
          class="py-1 px-2 text-secondary-300 disabled:text-secondary-300 disabled:bg-secondary-100
          rounded border
          border-secondary-300 disabled:border-secondary-100"
          :class="!adminData.pagination?.has_pre ?
          '' : 'hover:bg-secondary-400 hover:border-secondary-400 hover:text-white' "
          :disabled="!adminData.pagination?.has_pre"
          @click="handleGetDataList(adminData.pagination?.current_page - 1)"
        >
          <i class="bi bi-arrow-left"></i>
        </button>
      </li>
      <li
      v-for="page in adminData.pagination?.total_pages"
      :key="page + new Date().getMilliseconds()">
        <button
          type="button"
          class="py-1 px-3 rounded"
          :class="
            page === adminData.pagination?.current_page ?
            `border-secondary-600 text-secondary-500
            border` :
            `text-secondary-300 hover:text-secondary-600
            `
          "
          @click="handleGetDataList(page)"
        >
          {{ page }}
        </button>
      </li>
      <li class>
        <button
          type="button"
          class="py-1 px-2 text-secondary-300 disabled:text-secondary-300 disabled:bg-secondary-100
          rounded border
          border-secondary-300 disabled:border-secondary-100"
          :class="!adminData.pagination?.has_next ?
          '' : 'hover:bg-secondary-400 hover:border-secondary-400 hover:text-white' "
          :disabled="!adminData.pagination?.has_next"
          @click="handleGetDataList(adminData.pagination?.current_page + 1)"
        >
          <i class="bi bi-arrow-right"></i>
        </button>
      </li>
    </ul>
  </section>
</template>
