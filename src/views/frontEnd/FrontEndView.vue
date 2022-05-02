<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'FrontEndView',
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
<template>
  <div class="bg-secondary-700">
    <TheHeader />
      <RouterView v-slot="{ Component }">
        <transition name="fade">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </transition>
      </RouterView>
    <TheFooter />
  </div>
</template>
