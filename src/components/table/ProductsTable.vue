<script>
import { computed, ref } from 'vue';
import useStore from '@/stores';

export default {
  setup() {
    const { adminDataStore } = useStore();
    const { adminData, handleSelectFunction } = adminDataStore;
    const tempProduct = ref({
      title: '',
      category: '',
      origin_price: 0,
      price: 0,
      unit: '',
      description: '',
      content: '',
      is_enabled: '',
      imageUrl: '',
      imagesUrl: [],
    });

    function openModal(selected, item) {
      adminData.isOpenModal = true;
      handleSelectFunction(selected, item);
    }

    return {
      openModal,
      tempProduct,
      adminData: computed(() => adminData),
    };
  },
};
</script>
<template>
  <table class="table w-full">
    <thead>
      <tr class="text-secondary-400">
        <td width="200" class="p-4 text-lg whitespace-nowrap">產品名稱</td>
        <td width="250" class="p-4 text-lg text-right whitespace-nowrap">原價</td>
        <td width="250" class="p-4 text-lg text-right whitespace-nowrap">售價</td>
        <td width="250" class="p-4 text-lg text-center whitespace-nowrap">是否啟用</td>
        <td colspan="3" width="400" class="p-4 text-lg text-center whitespace-nowrap">功能</td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="hover"
        v-for="item in adminData.dataList"
        :key="item.id"
      >
        <td class="py-2 px-4 whitespace-nowrap">{{ item.title }}</td>
        <td class="py-2 px-4 text-right whitespace-nowrap">{{ item.origin_price }}</td>
        <td class="py-2 px-4 text-right whitespace-nowrap">{{ item.price }}</td>
        <td
          class="py-2 px-4 text-center text-secondary-700 whitespace-nowrap"
          v-if="item.is_enabled == 1"
        >
          啟用
        </td>
        <td
          class="py-2 px-4 text-center text-secondary-400 whitespace-nowrap"
          v-else-if="item.is_enabled == 0"
        >
          未啟用
        </td>
        <td
          class="py-2 px-4 text-center text-secondary-400 whitespace-nowrap"
          v-else-if="item.is_enabled == 2"
        >
          未上架
        </td>
        <td
          class="py-2 px-4 text-center text-secondary-300 whitespace-nowrap"
          v-if="item.is_enabled == 3"
        >
          已下架
        </td>

        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="font-normal text-primary-500 hover:text-primary-50
            hover:bg-primary-500 hover:border-primary-500
            hover:shadow hover:shadow-primary-400 transition duration-200
            btn btn-outline
            btn-xs sm:btn-sm md:btn-md"
            @click="openModal('getProductDetail', item)"
          >
            查看細節
          </button>
        </td>
        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="font-normal text-secondary-400
            hover:bg-secondary-500 border-secondary-400
            hover:border-secondary-500
            hover:shadow hover:shadow-secondary-400
            transition duration-200 btn btn-outline
            btn-xs sm:btn-sm md:btn-md"
            @click="openModal('productEdit', item)"
          >
            修改內容
          </button>
        </td>
        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="font-normal text-red-400 hover:text-white
            hover:bg-red-500 border border-red-300 hover:border-transparent
            hover:shadow hover:shadow-red-400
            transition duration-200 btn btn-outline
            btn-xs sm:btn-sm md:btn-md"
            @click="openModal('productDelete', item)"
          >
            刪除品項
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-between items-center">
    <p>目前有{{ adminData.dataList.length }}項產品</p>
    <button
      type="button"
      class="font-normal transition duration-200 btn btn-xs sm:btn-sm md:btn-md"
      @click="openModal('productCreate', tempProduct)"
    >
      新增品項
    </button>
  </div>
</template>
