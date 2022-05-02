<script>
import {
  onMounted,
  computed,
  ref,
} from 'vue';
import axios from 'axios';
import useStore from '@/stores';
import ProductCard from '@/components/ProductCard.vue';

export default {
  components: {
    ProductCard,
  },
  setup() {
    const { productStore } = useStore();
    const {
      productList, handleGetProductList, productCategory, isLoading,
    } = productStore;

    const baseUrl = process.env.VUE_APP_API_URL;
    const apiPath = process.env.VUE_APP_API_PATH;

    const articles = ref([]);
    const selectCategory = computed({
      get() { return productList.selectCategory; },
      set(val) { productList.selectCategory = val; },
    });

    function handleGetArticleAll() {
      axios.get(`${baseUrl}api/${apiPath}/articles`)
        .then((res) => { articles.value = res.data.articles; })
        .catch((err) => { console.error(err); });
    }

    onMounted(() => {
      handleGetArticleAll();
      handleGetProductList(productList.selectCategory);
    });

    function handleCategoryChange(value) {
      selectCategory.value = value;
      handleGetProductList(value, productList.currentPage);
    }

    function handlePaginationAction(val) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      handleGetProductList(productList.selectCategory, val);
    }

    return {
      selectCategory,
      productList: computed(() => productList.products),
      productCategory: computed(() => productCategory),
      handleCategoryChange,
      isLoading: computed(() => isLoading),
      pagination: computed(() => productList.pagination),
      handlePaginationAction,
      articles,
    };
  },
};
</script>

<template>
  <section class="py-6 bg-secondary-50">
    <div class="container space-y-4">
      <AppTitle level="1" class="rfs:text-5xl">
        產品列表
      </AppTitle>
      <div class="flex justify-center items-center">
        <div class="grid grid-cols-2 gap-4 pb-4 md:tabs">
          <a class="flex gap-2 justify-center items-center
          w-full rfs:text-lg transition-all duration-500 md:w-auto
          md:tab
          "
          :class="{
            'hover:border-primary-600': selectCategory !== category.category,
            'hover:text-primary-500': selectCategory !== category.category,
            'tab-active': selectCategory === category.category,
            'text-primary-600 hover:text-primary-500': selectCategory === category.category,
            'col-span-2': idx === 0,
          }"
          @click="handleCategoryChange(category.category)"
          @keydown="category"
          v-for="(category ,idx) in productCategory"
          :key="category.title">
          <SvgLoader :name="`icon-${category.category}`" class="w-8 h-8" />
            {{ category.title }}
          </a>
        </div>
      </div>
      <template v-for="article in articles" :key="article.id">
        <div class="p-4" :class="{'hidden': article.tag[0] !== selectCategory}"
        v-if="selectCategory !== 'All' ">
          <div v-if="article.tag[0] === selectCategory">
            <div class="flex flex-col gap-4 justify-between md:flex-row">
              <article class="order-1 md:order-none">
                <h2 class="mb-4 font-serif text-4xl
                font-medium text-center text-primary-400 border-b
                md:text-left">{{article.title}}</h2>
                <div class="space-y-2 font-serif
                text-lg font-light text-secondary-400"
                v-html="article.description" />
              </article>
              <figure class="md:order-none order-0">
                <img
                class="aspect-square object-cover"
                width="960"
                height="540"
                :src="article.image"
                :alt="article.title">
              </figure>
            </div>
          </div>
        </div>
      </template>
      <ul class="grid gap-4 pb-4
      mb-4 md:grid-cols-3 lg:grid-cols-4"
      :class="selectCategory === 'All'|| selectCategory === '' ?
      'grid-cols-2': 'grid-cols-1'"
      >
        <li
          class=""
          v-for="product in productList"
          :key="product.id"
        >
          <ProductCard :product="product" />
        </li>
      </ul>
      <!-- 分頁 -->
      <ul v-if="selectCategory === 'All' || selectCategory === ''"
      class="flex gap-4 justify-center items-center pb-12 mx-auto">
        <li>
          <button
            type="button"
            class="py-1 px-2 text-secondary-300
            disabled:text-secondary-300 disabled:bg-secondary-100 rounded border
            border-secondary-300 disabled:border-secondary-100"
            :class="!pagination?.has_pre ?
            '' : 'hover:bg-secondary-400 hover:border-secondary-400 hover:text-white' "
            :disabled="!pagination?.has_pre"
            @click="handlePaginationAction(pagination?.current_page - 1)"
          >
            <i class="bi bi-arrow-left"></i>
          </button>
        </li>
        <li
        v-for="page in pagination?.total_pages"
        :key="page + new Date().getMilliseconds()">
          <button
            type="button"
            class="py-1 px-3 rounded"
            :class="
              page === pagination?.current_page ?
              `border-secondary-600 text-secondary-500
              border` :
              `text-secondary-300 hover:text-secondary-600
              `
            "
            @click="handlePaginationAction(page)"
          >
            {{ page }}
          </button>
        </li>
        <li>
          <button
            type="button"
            class="py-1 px-2 text-secondary-300 disabled:text-secondary-300
            disabled:bg-secondary-100 rounded border
            border-secondary-300 disabled:border-secondary-100"
            :class="!pagination?.has_next ?
            '' : 'hover:bg-secondary-400 hover:border-secondary-400 hover:text-white' "
            :disabled="!pagination?.has_next"
            @click="handlePaginationAction(pagination?.current_page + 1)"
          >
            <i class="bi bi-arrow-right"></i>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
