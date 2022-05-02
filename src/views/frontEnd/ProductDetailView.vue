<script>
import {
  computed,
  ref,
  onMounted,
  onActivated,
} from 'vue';
import { useRoute } from 'vue-router';

import useStore from '@/stores';
import AppLink from '@/utils/AppLink.vue';
import TheRecommend from '@/components/TheRecommend.vue';

export default {
  components: { AppLink, TheRecommend },
  setup() {
    const { productStore, cartStore } = useStore();
    const { handleAddCart } = cartStore;
    const { productList, handleGetProductDetail, handleProductMainImage } = productStore;
    const route = useRoute();
    const qty = ref(0);

    onMounted(() => {
      handleGetProductDetail(route.params.id);
    });

    onActivated(() => {
      handleGetProductDetail(route.params.id);
    });

    function handleUpdateCart(id, num) {
      handleAddCart(id, num);
    }

    return {
      qty,
      products: computed(() => productList.productDetail),
      handleAddCart,
      isLoading: computed(() => cartStore.isLoading),
      handleUpdateCart,
      handleProductMainImage,
      productMainImage: computed(() => productList.productMainImage),
      productImages: computed(() => productList.productImages),
    };
  },
};
</script>

<template>
  <section class="pb-4 bg-gray-100">
    <div class="container flex flex-col space-y-4">
      <div class="flex gap-4 items-center py-2 whitespace-nowrap">
        <AppLink to="/product" class="flex gap-2 items-center text-lg">
          <SvgLoader name="bar" class="w-8 h-8" />
          產品列表
        </AppLink>
        <i class="text-xl bi bi-chevron-right" />
        <span class="text-lg">{{ products.title }}</span>
      </div>
      <div class="flex flex-col gap-4 py-4 md:flex-row">
        <div class="flex flex-col gap-2 md:pr-4 md:w-1/2">
          <div class="w-full min-h-[30vh] bg-center bg-no-repeat bg-cover md:min-h-[50vh]
          " :style="{ backgroundImage: `url(${productMainImage})`, }" />
          <div class="grid grid-cols-5 gap-2">
            <div v-for="img in productImages" :key="img"
                class="aspect-square flex-auto w-full bg-center bg-no-repeat bg-cover
                transition duration-300 cursor-pointer"
                :class="img === productMainImage ? '' : 'opacity-75 grayscale-[75%]'"
                @mouseover="handleProductMainImage(img)" @focus="handleProductMainImage(img)"
                :style="{ backgroundImage: `url(${img})`, }" />
          </div>
        </div>
        <div class="space-y-8 md:pl-4 md:w-1/2">
          <div class="flex gap-4 items-center">
            <h1 class="text-4xl font-bold">
              {{ products.title }}
            </h1>
            <span class="py-1 px-2 text-sm text-secondary-50 bg-primary-400 rounded">
              {{ products.category }}
            </span>
          </div>

          <ul class="space-y-4">
            <li class="flex justify-between">
              <span class="w-1/4 font-semibold">商品描述：</span>
              <span class="w-3/4">{{ products.description }}</span></li>
            <li class="flex justify-between">
              <span class="font-semibold">商品內容：</span>
              <span>{{ products.content }}</span></li>
            <li class="flex justify-between">
              <span class="font-semibold">價格:</span>
              <div class="flex gap-1 items-end rfs:text-3xl">
                {{ products.price }}
                <span class="pl-1 rfs:text-base text-gray-400 line-through">
                  {{ products.origin_price }}
                </span>
                <span class="rfs:text-base">杯 / 元</span>
              </div>
            </li>
            <li class="flex flex-col gap-4 justify-between">
              <select v-model="qty" class="ml-auto w-1/2 form-style">
                <option value="0" selected disabled>請選擇訂購數量</option>
                <option v-for="i in 20" :value="i" :key="i + products.id">
                  {{ i }}
                </option>
              </select>
              <button class="flex justify-center items-center py-3 w-full
              rounded border border-secondary-700 transition duration-300"
                      @click="handleUpdateCart(products.id, qty)" :disabled="qty === 0" :class="
                        qty === 0
                          ? 'bg-secondary-700 text-gray-50 opacity-40 cursor-not-allowed'
                          : 'bg-secondary-500 text-gray-50 hover:bg-secondary-700'
                      ">
                <svg class="mr-3 -ml-1 w-5 h-5 text-primary-50 animate-spin"
                    :class="isLoading === products.id ? '' : 'hidden'"
                    :disabled="isLoading === products.id" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                          stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
                  7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>

                加入購物車
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <TheRecommend title="你可能還想來點" :click="true" titleClass="rfs:text-2xl"
    class="text-secondary-700 bg-transparent" limit="5" />
  </section>
</template>
