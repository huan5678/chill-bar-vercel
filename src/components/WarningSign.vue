<script>
import { ref } from 'vue';

export default {
  setup() {
    const showAlert = ref(true);
    const handleCloseAlert = function () {
      showAlert.value = false;
    };
    return {
      showAlert,
      handleCloseAlert,
    };
  },
};
</script>

<template>
<div class="fixed bottom-0 z-20 w-full" v-if="showAlert">
  <div class="flex gap-6 justify-center
    items-center py-3 px-2 w-full
  text-white bg-primary-400/70">
    <div class="container overflow-hidden mx-auto w-full whitespace-nowrap"
    >
      <p class="inline-block text-sm font-medium text-left
      sm:text-center
      " v-for="item in 4" :key="item"
      >
        <span class="mx-2">禁止酒駕</span>
        <SvgLoader name="dontDrunkDrive" class="inline mx-2 w-8 h-8" />
        <span class="mx-2">酒後不開車</span>
        <span class="mx-2">安全有保障</span>
        <span class="mx-2">未滿18歲請勿飲酒</span>
        <span class="mx-2">飲酒過量</span>
        <span class="mx-2">有害健康</span>
      </p>
    </div>

    <button
      type="button"
      aria-label="Close"
      class="bg-primary-700/30 hover:bg-primary-900/40 rounded-lg
      border-0 transition btn btn-sm"
      @click="handleCloseAlert"
    >
      <i class="rfs:text-base bi bi-x-lg"></i>
    </button>
  </div>
</div>
</template>
<style scoped>
p {
  animation: marquee 8s linear infinite;
}
@keyframes marquee {
  0% {
    transform: translate(0%, 0);
  }

  100% {
    transform: translate(-100%, 0);
  }
}
</style>
