<script>
import { onMounted } from 'vue';
import { ModalsContainer } from 'vue-final-modal';
import AOS from 'aos';

export default {
  name: 'App',
  components: {
    ModalsContainer,
  },
  watch: {
    $route(to) {
      const nowTitle = `${to.meta.title}` || 'ChillBar 秋吧';
      document.title = nowTitle;
    },
  },
  setup() {
    onMounted(() => {
      AOS.init();
    });
  },
};
</script>
<template>
    <RouterView />
    <ModalsContainer />
</template>
