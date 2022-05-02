<script>
import { computed } from 'vue';
import useStore from '@/stores';
import ModalCardTitle from './ModalCardTitle.vue';

export default {
  components: { ModalCardTitle },
  setup(props, context) {
    const { adminDataStore } = useStore();
    return {
      targetProduct: computed(() => adminDataStore.adminData.tempProduct),
      handleOpenModal: context.attrs.handleOpenModal,
    };
  },
};
</script>

<template>
  <section class="bg-secondary-50 rounded shadow md:max-w-screen-lg card-side">
    <ModalCardTitle title="產品詳細內容"
    :close-modal="handleOpenModal" />
    <figure>
      <img class="max-h-48" :src="targetProduct?.imageUrl" :alt="targetProduct?.title" />
    </figure>
    <div class="card-body">
      <div class="space-y-8">
        <div class="flex gap-4 items-center">
          <h2 class="mb-2 text-xl font-bold">
            {{ targetProduct?.title }}
            <span class="py-1 px-2 ml-2 text-sm text-white bg-primary-400 rounded">
              {{ targetProduct?.category }}
            </span>
          </h2>
          <ul class="flex gap-1 items-center">
            <li v-for="(star, idx) in 5" :key="star + new Date()">
              <svg
                v-show="targetProduct?.rating > idx"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="w-6 h-6 text-primary-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173
                  6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                  0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83
                  4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                />
              </svg>
              <svg
                v-show="targetProduct?.rating <= idx"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="w-6 h-6 text-gray-400"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389
                  2.256c.386.198.824-.149.746-.592l-.83-4.73
                  3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513
                  0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523
                  3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0
                  0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847
                  3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694
                  3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                />
              </svg>
            </li>
          </ul>
        </div>

        <ul class="space-y-4">
          <li>商品描述：{{ targetProduct?.description }}</li>
          <li>商品內容：{{ targetProduct?.content }}</li>
          <li>
            {{ targetProduct?.price }}
            <span class="pl-1 text-gray-400 line-through">{{ targetProduct?.origin_price }}</span>
            個 / 元
          </li>
        </ul>
      </div>
      <div class="gap-4 carousel">
        <div v-for="img in targetProduct?.imagesUrl"
            :key="img" class="flex-auto carousel-item">
          <img
            class="object-cover max-h-96"
            width="500"
            :src="img"
            :alt="img"
          />
        </div>
      </div>
    </div>
  </section>
</template>
