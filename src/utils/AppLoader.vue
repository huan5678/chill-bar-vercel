<script>
import { toRef } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import TheLoading from '@/components/TheHelixLoading.vue';

export default {
  components: { Loading, TheLoading },
  props: ['openLoading'],
  setup(props) {
    return {
      isOpenLoading: toRef(props, 'openLoading'),
    };
  },
};
</script>

<template>
  <Loading
    :active="isOpenLoading"
    :can-cancel="false"
    :is-full-page="true"
    backgroundColor="#151625"
    :opacity=".65"
    :zIndex="30"
    >
    <TheLoading />
  </Loading>
</template>
