<script>
import { computed, ref } from 'vue';
import useStore from '@/stores';
import useHelper from '@/helpers';

export default {
  setup() {
    const { adminDataStore } = useStore();
    const { adminData, handleGetDataList, handleSelectFunction } = adminDataStore;
    const { getDate, moneyFormat } = useHelper();

    const tempProduct = ref({
      name: '',
      email: '',
      tel: '',
      address: '',
    });

    function openModal(selected, item) {
      adminData.isOpenModal = true;
      handleSelectFunction(selected, item);
    }

    return {
      getDate,
      moneyFormat,
      handleGetDataList,
      openModal,
      tempProduct,
      adminData: computed(() => adminData),
    };
  },
};
</script>
<template>
  <table class="table w-full">
    <thead class="">
      <tr class="text-secondary-400">
        <td width="200" class="p-4 text-lg whitespace-nowrap">訂單編號</td>
        <td width="250" class="p-4 text-lg text-right whitespace-nowrap">訂購日期</td>
        <td width="250" class="p-4 text-lg text-right whitespace-nowrap">訂單總價</td>
        <td width="250" class="p-4 text-lg text-center whitespace-nowrap">是否付款</td>
        <td colspan="3" class="p-4 text-lg text-center whitespace-nowrap">功能</td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="hover"
        v-for="item in adminData.dataList"
        :key="item.id"
      >
        <td class="py-2 px-4 whitespace-nowrap">{{ item.id }}</td>
        <td class="py-2 px-4 text-right whitespace-nowrap">
          {{ getDate(item.create_at) }}
        </td>
        <td class="py-2 px-4 text-right whitespace-nowrap">
          {{ moneyFormat(item.total) }}
        </td>
        <td
          class="py-2 px-4 text-center whitespace-nowrap"
          :class="item.is_paid ? 'text-secondary-400' : 'text-secondary-300'"
        >
          {{ item.is_paid ? '已付款' : '未付款' }}
        </td>

        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="py-2 px-4 text-primary-500 hover:text-primary-50 hover:bg-primary-600
            rounded border border-primary-500 hover:shadow
            hover:shadow-primary-400 transition duration-200"
            @click="openModal('getOrderDetail', item)"
          >
            查看細節
          </button>
        </td>
        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="py-2 px-4 text-secondary-50 bg-secondary-400 hover:bg-secondary-500
            rounded hover:shadow
            hover:shadow-secondary-400 transition duration-200"
            @click="openModal('orderEdit', item)"
          >
            修改內容
          </button>
        </td>
        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="py-2 px-4 text-secondary-400 hover:text-white hover:bg-secondary-500 rounded
            border border-secondary-300 hover:border-transparent hover:shadow
            hover:shadow-secondary-400 transition duration-200"
            @click="openModal('productDelete', item)"
          >
            刪除訂單
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-between items-center">
    <p>目前有 {{ adminData.dataList.length }} 筆訂單</p>
  </div>
</template>
