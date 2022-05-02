<script>
import { ref, onMounted } from 'vue';
import { Roulette } from 'vue3-roulette';
import Swal from 'sweetalert2';

export default {
  components: {
    Roulette,
  },
  setup() {
    const wheel = ref(null);
    const showTip = ref(false);
    const showWheel = ref(true);
    const openModal = ref(false);
    function handleCloseModal() {
      openModal.value = false;
    }

    const giving = [
      {
        id: 1,
        name: 'freeOne',
        htmlContent: '老闆請你喝一杯',
        code: 'e02c47e7',
        textColor: '#151625',
        background: '#f59f13',
      },
      {
        id: 2,
        name: 'percent80',
        htmlContent: '不是酒折給你打8折',
        code: '366ea893',
        textColor: '#fde7c4',
        background: '#151625',
      },
      {
        id: 3,
        name: 'drunkGood',
        htmlContent: '你是醉棒的',
        code: 'db13f8e5',
        textColor: '#151625',
        background: '#f59f13',
      },
      {
        id: 4,
        name: 'specialPackage',
        htmlContent: '神秘驚喜大禮包',
        code: '5d003b6e',
        textColor: '#fde7c4',
        background: '#151625',
      },
    ];

    const result = ref(null);

    function launchWheel() {
      wheel.value.launchWheel();
    }

    function wheelEndedCallback(resultItem) {
      result.value = resultItem;
      showWheel.value = false;
      localStorage.setItem('coupon', resultItem.code);
      Swal.fire({
        title: '恭喜您!',
        html: `
        獲得禮券
        <br>【${resultItem.htmlContent}】
        <br>已幫您加入結帳項目`,
        icon: 'success',
        iconColor: '#fbd9a1',
        showClass: {
          popup: 'animate__animated animate__bounceIn animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__bounceOut animate__faster',
        },
      });
    }

    onMounted(() => {
      const localCoupon = localStorage.getItem('coupon');
      if (localCoupon !== null) {
        showWheel.value = false;
      } else {
        showWheel.value = true;
      }
    });

    return {
      giving,
      wheel,
      launchWheel,
      openModal,
      handleCloseModal,
      wheelEndedCallback,
      showTip,
      showWheel,
    };
  },
};
</script>

<template>
  <div class="fixed right-0 bottom-0 z-30 transition-all
  duration-500 ease-[cubic-bezier(0.18,0.89,0.32,1.28)] scale-50 active:scale-75
    translate-x-1/4
  -translate-y-1/4 cursor-pointer" v-if="showWheel"
  @mouseenter="showTip = true" @focus="showTip"
  @mouseleave="showTip = false" @blur="showTip"
  @keydown="openModal = true" @click="openModal = true">
    <div class="indicator">
      <span class="p-4 w-max text-3xl
      text-secondary-100 bg-secondary-700 rounded
      transition-all duration-500 indicator-item indicator-bottom indicator-center
      " :class="{'opacity-0': showTip === false}"
      >驚喜大轉盤</span>
      <SvgLoader
      name="Roulette" />
    </div>
  </div>
  <div>
    <AlertModal class=" select-none" v-model="openModal"
  @handleCloseModal="handleCloseModal" :closeButton="false">
    <template v-slot:title>驚喜大轉盤</template>
      <div class="relative">
        <Roulette ref="wheel" :items="giving"
        easing="bounce"
        @click="launchWheel"
        :display-border="true"
        :display-shadow="true"
        :centered-indicator="true"
        indicator-position="top"
        :base-display="true"
        :base-size="120"
        @wheel-end="wheelEndedCallback"
        base-background="#fde7c4"
        >
        <template #baseContent>
          <span class="font-mono text-4xl">GO</span>
        </template>
        </Roulette>
        <svg class="absolute top-0 left-0 translate-x-[10%] translate-y-[-8%]">
          <g class="text-primary-200">
            <path fill="currentColor"
            d="M122.65,7.06v22.27c0,0.17,0.04,0.34,0.12,0.49l3.48,
            6.62c1,1.9,3.7,1.96,4.78,0.1l3.89-6.71
              c0.09-0.16,0.14-0.35,0.14-0.53V7.06c0-0.59-0.48-1.06-1.06-1.06h-10.28C123.13,
              6,122.65,6.48,122.65,7.06z"/>
          </g>
          <g class="text-secondary-700">
            <path fill="currentColor" d="M128.7,39.9c0,0-0.1,0-0.1,0c-1.7,
            0-3.3-1-4.1-2.5l-3.5-6.6c-0.2-0.4-0.3-0.9-0.3-1.4V7.1
            c0-1.7,1.4-3.1,3.1-3.1H134c1.7,0,3.1,1.4,3.1,3.1v22.2c0,
            0.5-0.1,1.1-0.4,1.5l-3.9,6.7C131.9,39,130.4,39.9,128.7,39.9z
            M124.7,29.1l3.4,6.4c0.2,0.3,0.5,0.4,0.6,0.4c0.2,0,0.5,0,
            0.6-0.4l3.8-6.5V8h-8.4C124.7,8,124.7,29.1,124.7,29.1z M133.2,28.8
            C133.2,28.8,133.2,28.8,133.2,28.8L133.2,28.8z M134,8L134,8L134,8z"/>
          </g>
        </svg>
      </div>
    </AlertModal>
  </div>
</template>
