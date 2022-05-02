<script>
import { useRouter } from 'vue-router';
import bg404 from '@/assets/images/bg404.jpg';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: { TheHeader, TheFooter },
  setup() {
    const router = useRouter();

    function handleToProduct() {
      router.push('product');
    }
    return {
      handleToProduct,
      bg404,
    };
  },
};
</script>

<template>
  <TheHeader />
  <main class="relative after:absolute after:inset-0 h-full
  min-h-[100vh] bg-secondary-700 bg-center bg-cover
  after:bg-gradient-to-t after:from-secondary-900/75 after:to-secondary-700/50"
  :style="{backgroundImage: `url(${bg404})`}">
    <section class="container flex absolute z-10 flex-col
    justify-center items-center h-full text-secondary-50 backdrop-blur-sm">
      <AppTitle level="1" class="mb-12 font-mono">
        404 ERROR NOT FOUND
      </AppTitle>
      <button type="button" @click="handleToProduct"
      class="text-xl bg-secondary-200 hover:border-secondary-100 btn btn-outline">
        瀏覽其他的東西吧 😂
      </button>
    </section>
  </main>
  <TheFooter />
</template>
