<script>
import { computed } from 'vue';
import useStore from '@/stores';
import getDate from '@/helpers/getDate';
import moneyFormat from '@/helpers/moneyFormat';
import ModalCardTitle from './ModalCardTitle.vue';

export default {
  components: { ModalCardTitle },
  setup(props, context) {
    const { adminDataStore } = useStore();
    return {
      targetProduct: computed(() => adminDataStore.adminData.tempProduct),
      handleOpenModal: context.attrs.handleOpenModal,
      moneyFormat,
      getDate,
    };
  },
};
</script>

<template>
  <section class="flex overflow-hidden flex-col pb-4 space-y-4 bg-gray-50 rounded-md">
    <ModalCardTitle title="訂單詳細內容" :close-modal="handleOpenModal" />
    <div class="flex justify-between p-4">
      <div class="p-2 divide-y">
        <span class="block text-sm">訂購人姓名</span>
        <h2 class="text-2xl font-medium">{{ targetProduct?.user.name }}</h2>
      </div>
      <div class="p-2 divide-y">
        <span class="block text-sm">聯絡電話</span>
        <h2 class="text-2xl font-medium">{{ targetProduct?.user.tel }}</h2>
      </div>
      <div class="p-2 divide-y">
        <span class="block text-sm">出貨地址</span>
        <h2 class="text-2xl font-medium">{{ targetProduct?.user.address }}</h2>
      </div>
    </div>
    <div class="flex flex-wrap gap-2 justify-around p-2">
      <h2 class="ml-4 w-full text-sm">訂購商品</h2>
      <div v-for="item in targetProduct?.products" :key="item.id">
        <img class="object-cover w-32 h-32"
        :src="item.product.imageUrl" :alt="item.product.title" />
        <div class="space-y-8">
          <div class="flex flex-col gap-1 items-start">
            <h3 class="text-xl font-bold">
              {{ item.product.title }}
            </h3>
            <p>訂購數量：{{ item.qty }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between p-4">
      <div class="p-2 divide-y">
        <span class="block text-sm">訂單總價</span>
        <h2 class="text-2xl font-medium">{{ moneyFormat(targetProduct?.total) }}</h2>
      </div>
      <div class="p-2 divide-y">
        <span class="block text-sm">下訂日期</span>
        <h2 class="text-2xl font-medium">{{ getDate(targetProduct?.create_at) }}</h2>
      </div>
    </div>
    <div class="p-2">
      <div class="p-2 divide-y">
        <span class="block text-sm">使用者留言</span>
        <p class="text-xl font-medium">{{ targetProduct?.message }}</p>
      </div>
    </div>
  </section>
</template>
