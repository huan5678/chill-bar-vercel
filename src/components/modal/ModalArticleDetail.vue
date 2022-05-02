<script>
import { computed, ref, onMounted } from 'vue';
import useStore from '@/stores';
import useHelper from '@/helpers';
import ModalCardTitle from './ModalCardTitle.vue';

export default {
  components: { ModalCardTitle },
  props: { products: Object },
  setup(props, context) {
    const { adminDataStore } = useStore();
    const { functionSelected, adminData } = adminDataStore;
    const { getDate } = useHelper();

    function closeModal() {
      context.attrs.handleOpenModal(false);
    }
    const tagList = ref({
      whisky: '威士忌',
      gin: '琴酒',
      vodka: '伏特加',
      tequila: '龍舌蘭',
      rum: '蘭姆酒',
      brandy: '白蘭地',
    });

    const date = computed(() => adminData.tempProduct.create_at);
    const dateTime = ref(null);

    onMounted(() => {
      dateTime.value = getDate(date.value);
    });

    return {
      selectType: computed(() => functionSelected.selected),
      articleData: computed(() => adminData.tempProduct),
      tagList,
      handleOpenModal: context.attrs.handleOpenModal,
      closeModal,
      dateTime,
    };
  },
};
</script>

<template>
  <section class="container">
    <div class="bg-secondary-50 card">

      <ModalCardTitle
        title="文章詳細內容"
        className="bg-secondary-500"
        :close-modal="handleOpenModal"
      />
      <ul class="flex flex-wrap justify-between p-4 space-y-2">
        <li class="p-2 space-y-2">
          <span class="block text-sm border-b">文章標籤</span>
          <p class="text-2xl font-medium">
            {{articleData?.title}}
          </p>
        </li>
        <li class="p-2 space-y-2">
          <span class="block text-sm border-b">文章副標題</span>
          <p class="text-2xl font-medium">
            {{articleData?.subTitle}}
          </p>
        </li>
        <li class="p-2 space-y-2">
          <span class="block text-sm border-b">文章作者</span>
          <p class="text-2xl font-medium">
            {{articleData?.author}}
          </p>
        </li>
        <li class="p-2 space-y-2">
          <span class="block text-sm border-b">文章標籤</span>
          <p class="text-2xl font-medium">
            {{ tagList[articleData?.tag]}}
          </p>
        </li>
        <li class="flex justify-between w-full">
          <div class="p-2 space-y-2">
            <span class="block text-sm border-b">文章內文</span>
            <div v-html="articleData?.description"></div>
          </div>
          <div class="p-2 space-y-2">
            <span class="block text-sm border-b">文章圖片</span>
            <img :src="articleData?.image" :alt="articleData?.title"
            class="object-cover object-center max-h-screen">
          </div>
        </li>
        <li class="p-2 space-y-2">
          <span class="block text-sm border-b">文章是否公開</span>
          <div>
            <input id="articleIsEnable"
                class="toggle"
                  type="checkbox"
                  v-model="articleData.isPublic"
                  disabled
                  />
              <label for="articleIsEnable" class="p-2">
                {{ articleData?.isPublic === true ? '公開' : '未公開' }}
              </label>
          </div>
        </li>
        <li class="space-y-2">
          <span class="block text-sm border-b">文章新增日期</span>
          <p class="text-2xl font-medium">
            {{ dateTime }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
