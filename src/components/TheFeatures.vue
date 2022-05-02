<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import useStore from '@/stores';

import featureImg01 from '@/assets/images/featureImg01.jpg';
import featureImg02 from '@/assets/images/featureImg02.jpg';
import featureImg03 from '@/assets/images/featureImg03.jpg';
import featureImg04 from '@/assets/images/featureImg04.jpg';
import featureImg05 from '@/assets/images/featureImg05.jpg';
import featureImg06 from '@/assets/images/featureImg06.jpg';

export default {
  setup() {
    const baseUrl = process.env.VUE_APP_API_URL;
    const apiPath = process.env.VUE_APP_API_PATH;

    const isHovering = ref();
    const articles = ref();
    const data = [
      {
        title: '伏特加 VODKA',
        category: 'vodka',
        imageUrl: featureImg01,
      },
      {
        title: '琴酒 GIN',
        category: 'gin',
        imageUrl: featureImg02,
      },
      {
        title: '威士忌 WHISKY',
        category: 'whisky',
        imageUrl: featureImg03,
      },
      {
        title: '龍舌蘭 TEQUILA',
        category: 'tequila',
        imageUrl: featureImg04,
      },
      {
        title: '蘭姆酒 RUM',
        category: 'rum',
        imageUrl: featureImg05,
      },
      {
        title: '白蘭地 BRANDY',
        category: 'brandy',
        imageUrl: featureImg06,
      },
    ];

    const { productStore } = useStore();
    const { productList, handleGetProductList } = productStore;
    const router = useRouter();

    function handleGoProducts(category) {
      router.push('/product');
      productList.selectCategory = category;
      handleGetProductList(category);
    }

    function handleGetArticleAll() {
      axios.get(`${baseUrl}api/${apiPath}/articles`)
        .then((res) => { articles.value = res.data.articles; });
    }

    onMounted(() => {
      const header = document.getElementById('header');
      const feature = document.getElementById('feature');
      feature.style.marginTop = `${-header.offsetHeight}px`;
      handleGetArticleAll();
    });

    return {
      data,
      isHovering,
      handleGoProducts,
      articles,
    };
  },
};
</script>

<template>
  <section id="feature" class="bg-secondary-50">
    <div class="container py-9">
      <AppTitle level="2" class="mb-12 rfs:text-5xl">
        六大基酒
      </AppTitle>
      <ul class="group">
        <li
        class="flex flex-col justify-between text-center
        bg-secondary-100/20 cursor-pointer md:flex-row md:odd:flex-row-reverse md:text-left
        md:odd:text-right
        md:odd:hover:bg-secondary-50/10 md:border-b"
        :class="{
          'group-hover:bg-secondary-100/40': isHovering === idx
        }"
        @click="handleGoProducts(item.category)"
        @keypress="handleGoProducts(item.category)"
        @mouseover="isHovering = idx"
        @mouseout="isHovering = null"
        @focus="isHovering"
        @blur="isHovering"
        v-for="(item, idx) in data" :key="item.title"
        >
          <article class="order-1 py-12 px-4 w-full sm:px-6
          md:order-none md:py-16 md:px-8 md:w-1/2"
          data-aos="fade-up" data-aos-easing="ease-in-out"
          data-aos-once="true">
              <h2 class="mb-4 font-serif rfs:text-3xl font-medium
              text-primary-500/70 transition duration-150 ease-in-out"
              :class="{
                'group-hover:text-primary-500': isHovering === idx
              }"
              >
                {{ item.title }}
              </h2>
              <template v-for="article in articles" :key="article.id">
                <p class="rfs:text-base font-light tracking-wider
                text-secondary-400/70 transition-all
                duration-150 ease-in-out line-clamp-2"
                :class="{
                  'group-hover:text-secondary-400': isHovering === idx
                }"
                v-if="article.tag[0] === item.category"
                v-html="article.description"
                />
              </template>
              <div class="lg:flex-shrink-0 lg:mt-0">
                  <div class="inline-flex mt-12 w-full rounded-md md:w-auto">
                      <button type="button" class="py-4 px-12
                      w-full text-base font-normal text-center
                      text-primary-300 border border-primary-200
                      transition duration-150 ease-in
                      "
                      :class="
                      {
                        'group-hover-btn': isHovering === idx
                      }"
                      >
                          發現更多
                      </button>
                  </div>
              </div>
          </article>
          <img :src="item.imageUrl" :alt="item.title"
          :class=
          "{
            'saturate-[.3]' : isHovering !== idx,
            'saturate-[.9]' : isHovering === idx,
          }"
          class="aspect-video object-cover object-center transition-all
          duration-150 md:aspect-square
          md:max-w-[24rem] md:h-full"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
<style scoped>
.group-hover-btn {
  @apply group-hover:cursor-pointer group-hover:text-primary-500
    group-hover:border group-hover:border-primary-500 group-hover:shadow-sm
}
</style>
