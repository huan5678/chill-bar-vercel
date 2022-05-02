<script>
export default {
  name: 'AlertModal',
  inheritAttrs: false,
  emits: ['handleCloseModal'],
  props: ['closeButton'],
};
</script>

<template>
  <VueFinalModal
  v-slot="{ params, handleCloseModal }"
  v-bind="$attrs"
  classes="flex justify-center items-center bg-opacity-50 backdrop-blur-[2px]"
  content-class="bg-gray-50 rounded-md shadow-md overflow-hidden min-w-[350px]"
  >
    <span class="block relative p-4 text-secondary-100 bg-secondary-700">
      <slot name="title"></slot>
      <button class="absolute top-0 right-0 p-2"
      @click="$emit('handleCloseModal', handleCloseModal)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="w-8 h-8"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707
            8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0
            1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </span>
    <div class="p-4">
      <slot :params="params"></slot>
    </div>
    <div class="flex justify-center items-center p-4" v-if="closeButton">
      <button class="py-2 px-4 w-1/3 text-secondary-50 bg-secondary-700 rounded"
      @click="$emit('handleCloseModal', handleCloseModal)">確定</button>
    </div>
  </VueFinalModal>
</template>
