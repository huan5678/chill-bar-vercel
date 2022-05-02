<script>
import { computed, ref } from 'vue';
import useStore from '@/stores';

export default {
  setup() {
    const { adminDataStore } = useStore();
    const { adminData, handleGetDataList, handleSelectFunction } = adminDataStore;
    const tempProduct = ref({
      title: '',
      percent: 0,
      is_enabled: 1,
      due_date: '',
      code: '',
    });

    function openModal(selected, item) {
      adminData.isOpenModal = true;
      handleSelectFunction(selected, item);
    }

    function handleDateChange(timestamp) {
      const time = parseInt(timestamp, 10);
      const date = new Date(time);
      return `
      ${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日 -
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `;
    }

    return {
      handleDateChange,
      handleGetDataList,
      openModal,
      tempProduct,
      adminData: computed(() => adminData),
    };
  },
};
</script>
<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead class="">
        <tr class="text-secondary-400">
          <td width="300" class="p-4 text-lg whitespace-nowrap">優惠券名稱</td>
          <td width="200" class="p-4 text-lg text-center whitespace-nowrap">優惠券代碼</td>
          <td width="200" class="p-4 text-lg text-right whitespace-nowrap">優惠券折價</td>
          <td width="200" class="p-4 text-lg text-center whitespace-nowrap">是否啟用</td>
          <td width="250" class="p-4 text-lg text-center whitespace-nowrap">使用期限</td>
          <td colspan="3" class="p-4 text-lg text-center whitespace-nowrap">功能</td>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover"
          v-for="item in adminData?.dataList"
          :key="item?.id"
        >
          <td class="py-2 px-4 whitespace-nowrap">{{ item?.title }}</td>
          <td class="py-2 px-4 text-center whitespace-nowrap">{{ item?.code }}</td>
          <td class="py-2 px-4 text-right whitespace-nowrap">
            {{ item?.percent }}
          </td>
          <td class="py-2 px-4 text-center whitespace-nowrap">
            {{ item?.is_enabled ? '已啟用' : '未啟用' }}
          </td>
          <td
            class="py-2 px-4 text-center text-primary-600 whitespace-nowrap"
          >
            {{ handleDateChange(item?.due_date) }}
          </td>
          <td class="py-2 px-4 text-center whitespace-nowrap">
            <button
              type="button"
              class="py-2 px-4 text-secondary-50 bg-secondary-400 hover:bg-secondary-500
              rounded hover:shadow
              hover:shadow-secondary-400 transition duration-200"
              @click="openModal('couponEdit', item)"
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
              刪除優惠券
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-between items-center">
    <p>目前有 {{ adminData.dataList?.length }} 種優惠券</p>
    <button
      type="button"
      class="py-2 px-4 text-primary-500 hover:text-primary-50 hover:bg-primary-600
        rounded border border-primary-500 hover:shadow
        hover:shadow-primary-400 transition duration-200"
      @click="openModal('couponCreate', tempProduct)"
    >
      新增優惠券
    </button>
  </div>
</template>
