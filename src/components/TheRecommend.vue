<script>
import {
  computed,
  watch,
  onMounted,
  ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper';
import useStore from '@/stores';
import CollectionCard from '@/components/CollectionCard.vue';

export default {
  components: {
    CollectionCard,
    Swiper,
    SwiperSlide,
  },
  props: [
    'title',
    'limit',
    'click',
    'titleClass',
  ],
  setup(props) {
    const { productStore, cartStore } = useStore();
    const {
      productList, productCategory, isLoading, handleGetProductAll,
    } = productStore;
    const { cartData } = cartStore;
    const route = useRoute();

    const recommendArr = computed(() => productList.products);
    const result = computed(() => recommendArr.value.filter((item) => item.recommend));
    const productData = computed(() => result.value);

    function handleRandomList(array) {
      const calculArray = [];
      array.forEach((product) => {
        cartData.list.forEach((cartProduct) => {
          if (product.id !== cartProduct.id || product.id !== productList.productDetail.id) {
            calculArray.push(product);
          }
        });
      });
      const set = new Set();
      const resultCal = calculArray.filter((item) => (
        !set.has(item.id) ? set.add(item.id) : false
      ));
      let currentIdx = resultCal.length;
      let tempValue;
      let randomIndex;
      const resultArray = resultCal.slice(0);

      while (currentIdx !== 0) {
        randomIndex = Math.floor(Math.random() * currentIdx);
        currentIdx -= 1;
        tempValue = resultArray[currentIdx];
        resultArray[currentIdx] = resultArray[randomIndex];
        resultArray[randomIndex] = tempValue;
      }
      return resultArray;
    }

    const dataList = ref([]);

    const URL = computed(() => route.path);

    watch(URL, () => {
      handleGetProductAll();
      if (productData.value) {
        dataList.value = handleRandomList(productData.value).splice(0, props.limit);
      }
    });

    const produces = computed(() => productData.value);

    const stopWatchProduct = watch(produces, () => { });

    watch(produces, () => {
      if (productData.value) {
        dataList.value = handleRandomList(productData.value).splice(0, props.limit);
        stopWatchProduct();
      }
    });

    onMounted(() => {
      handleGetProductAll();
    });

    return {
      dataList,
      cartData,
      produces,
      productCategory: computed(() => productCategory),
      isLoading: computed(() => isLoading),
      modules: [Autoplay],
      titles: props.title,
      limits: props.limit,
      isClick: props.click,
      handleRandomList,
      className: props.titleClass,
      URL,
    };
  },
};
</script>

<template>
  <section class="bg-secondary-700">
    <div class="container py-12">
      <AppTitle level="2" class="mb-12" :class="className">
        {{ titles }}
      </AppTitle>
      <swiper
        class="select-none"
        :loop="true"
        :breakpoints="{
          '640': {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          '768': {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          '1280': {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }"
        :loopFillGroupWithBlank="true"
        :grabCursor="true"
        :modules="modules"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
      >
      <template v-if="cartData.list.length === 0">
        <swiper-slide
        class="items-stretch"
        v-for="product in produces"
        :key="product.id"
        >
          <CollectionCard :click="isClick" :product="product" />
        </swiper-slide>
      </template>
      <template v-else>
        <swiper-slide
        class="items-stretch"
        v-for="product in dataList"
        :key="product.id"
        >
          <CollectionCard :click="isClick" :product="product" />
        </swiper-slide>
      </template>
      </swiper>
    </div>
  </section>
</template>
