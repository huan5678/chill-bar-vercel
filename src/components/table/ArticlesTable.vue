<script>
import { computed, ref } from 'vue';
import useStore from '@/stores';

export default {
  setup() {
    const { adminDataStore } = useStore();
    const { adminData, handleGetDataList, handleSelectFunction } = adminDataStore;
    const tempProduct = ref({
      title: '',
      author: '',
      isPublic: false,
      content: '',
      subTitle: '',
      description: '',
      create_at: '',
      is_enabled: '',
      image: '',
      tag: [],
    });

    function openModal(selected, item) {
      adminData.isOpenModal = true;
      if (selected === 'articleCreate') {
        const data = {
          title: '',
          author: '',
          isPublic: false,
          content: '',
          subTitle: '',
          description: '',
          create_at: '',
          is_enabled: '',
          image: '',
          tag: [],
        };
        handleSelectFunction(selected, data);
      } else {
        handleSelectFunction(selected, item);
      }
    }

    return {
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
        <td width="200" class="p-4 text-lg whitespace-nowrap">文章標題</td>
        <td width="250" class="p-4 text-lg text-right whitespace-nowrap">副標題</td>
        <td width="250" class="p-4 text-lg text-right whitespace-nowrap">標籤</td>
        <td width="250" class="p-4 text-lg text-center whitespace-nowrap">是否公開</td>
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
        <td class="py-2 px-4 text-right whitespace-nowrap">{{ item.subTitle }}</td>
        <td class="py-2 px-4 text-right whitespace-nowrap">{{ item.tag }}</td>
        <td
          class="py-2 px-4 text-center whitespace-nowrap"
          :class="item.isPublic ? 'text-secondary-300' : 'text-primary-600'"
        >
          {{ item.isPublic ? '公開' : '未公開' }}
        </td>
        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="text-primary-500 hover:text-primary-50
            hover:bg-primary-600 border border-primary-500
            hover:border-primary-600 hover:shadow hover:shadow-primary-400
            btn btn-outline"
            @click="openModal('getArticleDetail', item)"
          >
            查看內容
          </button>
        </td>
        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="text-secondary-400 hover:text-secondary-50 hover:bg-secondary-500 hover:shadow
            hover:shadow-secondary-400 btn
            btn-outline"
            @click="openModal('articleEdit', item)"
          >
            修改內容
          </button>
        </td>
        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="text-red-400 hover:text-white hover:bg-red-500 border border-red-300
            hover:border-transparent hover:shadow hover:shadow-red-400 btn
            btn-outline"
            @click="openModal('productDelete', item)"
          >
            刪除文章
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-between items-center">
    <p>目前有{{ adminData.dataList.length }}篇文章</p>
    <button
      type="button"
      class="text-primary-500 hover:text-primary-50 hover:bg-primary-600 border border-primary-500
        hover:border-primary-600 hover:shadow hover:shadow-primary-400 transition
        duration-200 btn btn-outline"
      @click="openModal('articleCreate', tempProduct)"
    >
      新增文章
    </button>
  </div>
</template>
