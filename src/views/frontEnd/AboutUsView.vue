<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import InputField from '@/utils/InputField.vue';
import aboutImg01 from '@/assets/images/aboutImg01.jpg';
import aboutImg02 from '@/assets/images/aboutImg02.jpg';

export default {
  components: {
    InputField,
  },
  setup() {
    onMounted(() => {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/huan5678/cl0ytngt0000r15oyzq97yje8',
        center: [121.5268814, 25.0500413],
        zoom: 16,
      });
      map.on('load', () => {
        new mapboxgl.Marker({ color: 'red', rotation: 45 })
          .setLngLat([121.5269499, 25.0499477])
          .addTo(map);
      });
      map.on('click', () => {
        new mapboxgl.Popup()
          .setLngLat([121.5269, 25.0502])
          .setHTML('<h2>ChillBar 秋吧</h2>')
          .addTo(map);
      });
    });

    const formElement = ref(null);

    function handleSubmit() {
      const crosUrl = 'https://esc-cros-anywhere.herokuapp.com/';
      const googleUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeW8xDki0525stZP18uyb-bgY2Dc0uZpvPk1QjWEKweSQP3CQ/formResponse';
      const formEl = formElement.value;
      const formData = new FormData(formEl);
      axios.post(`${crosUrl + googleUrl}`, formData)
        .then(() => {
          Swal.fire({
            title: '您已成功送出訊息',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            text: '感謝您的支持和厚愛，順頌時祺。',
            icon: 'success',
          });
          formElement.value = null;
        });
    }

    return {
      aboutImg01,
      aboutImg02,
      formElement,
      handleSubmit,
    };
  },
};
</script>

<template>
<section class="relative py-12 min-h-screen
bg-fixed bg-center bg-no-repeat bg-cover
" :style="{ backgroundImage: `
linear-gradient(rgba(21,22,37,1), rgba(21,22,37,0), rgba(21,22,37,1)), url(${aboutImg01})
` }">
  <div class="container z-10">
    <div class="mx-auto card bg-base-100">
      <article class="card-body">
        <AppTitle class="mb-6 rfs:text-5xl" level="1">
          關於秋吧
        </AppTitle>
        <div class="flex flex-col gap-6 justify-between mb-2 lg:flex-row">
          <div class="order-1 mx-auto mb-6 space-y-2 text-secondary-700 lg:order-none">
            <h2 class="font-serif rfs:text-2xl font-medium text-center">我們的理念</h2>
            <p class="rfs:text-base font-light md:font-serif lg:max-w-screen-md">
              <span class="block text-center text-primary-500">
                「
                <span class="rfs:text-lg font-medium
                text-primary-500/70">秋日薄暮，用菊花煮竹葉青，人與海棠俱醉</span>
                」</span><br />
              林清玄在《溫一壺月光下酒》中寫到，在秋日薄暮時分，<br />
              來點小酒，人和海棠花皆醉了。<br />
              這樣的場景僅在腦海里一閃而過，就不禁陶醉其中。
            </p>
            <p class="font-light md:font-serif">
              我們致力於打造一個舒適的飲酒場景，<br />
              希望客人在我們店裡只有愜意沒有拘謹。</p>
          </div>
          <div class="relative
          mx-auto space-y-2 w-full h-[15vh] bg-top bg-no-repeat
          bg-cover md:order-none md:max-w-sm
          lg:w-[32vw] lg:max-w-screen-sm order-0"
          :style="{ backgroundImage: `url(${aboutImg02})` }"
          >
          </div>

        </div>
        <div class="flex flex-col gap-6 justify-between lg:flex-row">
            <form
            ref="formElement"
            @submit.prevent="handleSubmit"
            class="order-1 space-y-2 font-light lg:order-none lg:w-2/3"
            >
              <legend>
                <h3 class="rfs:text-lg font-normal text-center">與我們聯繫</h3>
              </legend>
              <div class="flex flex-col gap-4
              justify-between items-start mb-6 lg:flex-row">
              <InputField
                name="entry.1098885017"
                type="text"
                label="姓名"
                required
                placeholder="請輸入姓名"
              />
              <InputField
                name="entry.420921765"
                type="tel"
                maxlength="10"
                label="電話"
                required
                placeholder="請輸入電話"
              />
            </div>
            <InputField
              name="entry.547693488"
              type="email"
              label="Email"
              required
              placeholder="請輸入Email"
            />
            <div class="form-control">
              <label
                for="userMessage"
                class="label"
                ><span class="label-text">想告訴我們的話</span></label>
              <textarea
                id="userMessage"
                name="entry.1064200367"
                class="w-full form-style"
                rows="4"
                required
                placeholder="想要告訴我們什麼？"
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full text-xl font-normal text-secondary-50
              bg-secondary-300 hover:bg-primary-700
              rounded border-none btn
            "
            >
              送出訊息
            </button>
          </form>
          <ul class="flex-auto space-y-2 w-full max-w-screen-md lg:order-none order-0">
            <li>
              <h3 class="text-lg text-center">
              哪裡可以找到我們
              </h3>
            </li>
            <li class="flex justify-between text-lg font-light">
              <span class="block">地址 :</span>
              <span class="block">台北市中山區林森北路107巷55號2樓</span>
            </li>
            <li class="flex justify-between text-lg font-light">
              <span class="block">聯絡電話 :</span>
              <a href="tel:+886-912345678" class="block">0912-345678</a>
            </li>
            <li id="map" class="max-w-screen-lg h-64"></li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</section>
</template>
