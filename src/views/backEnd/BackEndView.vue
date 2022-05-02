<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import { onMounted } from 'vue';
import useStore from '@/stores';

export default {
  name: 'BackEndView',
  components: { TheHeader, TheFooter },
  setup() {
    const { adminStore } = useStore();
    const { handleCheckUser, handleGetToken } = adminStore;

    onMounted(() => {
      console.log('mount admin');
      handleGetToken();
      handleCheckUser();
    });
  },
};
</script>
<template>
  <TheHeader />
    <RouterView v-slot="{ Component }">
      <transition name="fade">
          <component :is="Component" />
      </transition>
    </RouterView>
  <TheFooter />
</template>
