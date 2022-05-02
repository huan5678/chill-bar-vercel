<script>
import { computed } from 'vue';

export default {
  setup(props, context) {
    return {
      svgName: computed(() => context.attrs.name),
      className: computed(() => context.attrs.class),
      size: computed(() => context.attrs.size),
    };
  },
};
</script>
<template>
  <svg :class="className"
  :style="{
    height: `${size}`,
  }">
    <use :xlink:href="`#${svgName}`"/>
  </svg>
</template>
