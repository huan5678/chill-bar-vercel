<script>
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
// import useStore from '@/stores';
import TheHero from '@/components/TheHero.vue';
import TheContact from '@/components/TheContact.vue';
import TheFeatures from '@/components/TheFeatures.vue';
import WarningSign from '@/components/WarningSign.vue';
import TheRecommend from '@/components/TheRecommend.vue';
import TheCouponWheel from '@/components/TheCouponWheel.vue';

export default {
  components: {
    TheHero,
    TheContact,
    TheFeatures,
    WarningSign,
    TheRecommend,
    TheCouponWheel,
  },
  setup() {
    // const router = useRouter();
    // const {  } = useStore();

    onMounted(() => {});
    return {
    };
  },
};
</script>
<template>
  <TheHero />
  <TheFeatures />
  <TheRecommend title="推薦給您" :click="true" titleClass="rfs:text-2xl"
    class="text-secondary-100" limit="15" />
  <TheContact />
  <WarningSign />
  <TheCouponWheel />
</template>
