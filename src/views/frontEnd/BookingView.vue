<script>
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch,
} from 'vue';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import VueCal from 'vue-cal';
import 'vue-cal/dist/i18n/zh-hk';
import 'vue-cal/dist/vuecal.css';

import InputField from '@/utils/InputField.vue';
import useStore from '@/stores';
import bookingImage01 from '@/assets/images/bookingImage01.jpg';
import bookingImage02 from '@/assets/images/bookingImage02.jpg';
import useHelper from '@/helpers';

export default {
  components: {
    InputField,
    Form,
    VueCal,
  },
  setup() {
    const { handleSweetAlert, closeToast } = useHelper();
    const { bookingStore } = useStore();
    const {
      datesData,
      handleGetBookingDataAll,
      handleCreateBookingData,
    } = bookingStore;
    const isOpenLoading = computed(() => datesData.isLoading);
    const phoneRegex = /09\d{2}-?\d{3}-?\d{3}/;
    const schema = Yup.object().shape({
      userName: Yup.string().trim().required('請輸入姓名'),
      userEmail: Yup.string().trim().email('請輸入正確的Email信箱').required('請輸入Email'),
      userPhone: Yup.string()
        .test('phone', '請輸入正確的10碼手機號碼(09...)', (value) => phoneRegex.test(value))
        .required('請輸入電話號碼'),
    });

    const bookingDate = ref({});
    const userRemark = ref('');
    const selectedDate = ref();

    const message = reactive({
      title: '成功',
      content: '送出預定',
      icon: 'info',
    });

    const selectedDates = ref([]);

    const timestamps = ref([]);
    const bookedTimestamps = ref([]);
    const bookedDate = ref([]);
    const timeNow = ref(new Date());

    function handleDateSet(date, Fn) {
      let time = date;
      if (Fn === 'Add') {
        time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
      const idx = selectedDates.value.findIndex((dates) => dates === time);
      if (idx === -1) {
        if (Fn === 'Add') {
          let haveBooked = false;
          bookedDate.value.forEach((dates) => {
            if (dates.start === time) {
              haveBooked = true;
            }
          });
          if (haveBooked === false) {
            selectedDates.value.push(time);
            timestamps.value.push(date.getTime());
          }
        }
      }
      if (Fn === 'Remove') {
        selectedDates.value.splice(idx, 1);
      }
    }

    watch(isOpenLoading, (newVal) => {
      if (newVal) {
        handleSweetAlert(message);
      } else {
        setTimeout(() => {
          closeToast();
        }, 5000);
      }
    });

    function handleSubmit(data, actions) {
      const bookingData = {
        data: {
          name: data.userName,
          email: data.userEmail,
          tel: data.userPhone,
          address: data.userAddress,
          message: userRemark.value,
          dates: selectedDates.value,
          timestamps: timestamps.value,
        },
      };
      handleCreateBookingData(bookingData);
      userRemark.value = '';
      selectedDates.value = [];
      timestamps.value = [];
      actions.resetForm();
    }

    onMounted(() => {
      handleGetBookingDataAll();
    });

    const dateList = computed(() => datesData.bookingList);

    watch(dateList, (newVal) => {
      newVal.dates.forEach((booking) => {
        booking.dates.forEach((date) => {
          const data = {
            start: date,
            end: date,
            title: '已被預約',
            content: '<i class="bi bi-calendar2-check text-2xl"></i>',
            allDay: true,
            deletable: true,
          };
          bookedDate.value.push(data);
        });
        booking.timestamps.forEach((time) => {
          bookedTimestamps.value.push(time);
        });
      });
    });

    return {
      bookingImage01,
      bookingImage02,
      handleSubmit,
      schema,
      userRemark,
      bookingDate,
      selectedDate,
      selectedDates,
      handleDateSet,
      dateList,
      bookedDate,
      bookedTimestamps,
      timeNow,
    };
  },
};
</script>

<template>
  <section
    class="relative py-12 min-h-screen bg-fixed bg-center bg-no-repeat bg-cover"
    :style="{
      backgroundImage: `
        linear-gradient(rgba(21,22,37,1), rgba(21,22,37,0), rgba(21,22,37,1)),
        url(${bookingImage01})`,
    }"
  >
    <div class="container">
      <div class="mx-auto card bg-base-100">
        <div class="space-y-4 card-body">
          <AppTitle class="mb-6 rfs:text-5xl" level="1">預約訂位</AppTitle>
          <p class="text-xl rfs:text-base text-center">
            想要辦PARTY，生日慶功宴，不想要被人打擾，已經財富自由想包場，歡迎進行預約。
          </p>
          <div class="flex flex-col gap-6 justify-between lg:flex-row">
            <Form
              :validationSchema="schema"
              class="order-1 space-y-2 h-full font-light lg:order-none lg:w-2/3 form-control"
              @submit="handleSubmit"
            >
              <legend>
                <h3 class="text-lg font-normal text-center">請填寫預約資料</h3>
              </legend>
              <div class="flex flex-col gap-4
              justify-between items-start mb-6 lg:flex-row">
                <InputField
                  name="userName"
                  type="text"
                  label="訂位人姓名"
                  required
                  placeholder="請輸入姓名"
                />
                <InputField
                  name="userPhone"
                  type="tel"
                  maxlength="10"
                  label="訂位電話"
                  required
                  placeholder="請輸入電話"
                />
              </div>
              <InputField
                name="userEmail"
                type="email"
                label="Email"
                required
                placeholder="請輸入Email"
              />
              <label for="userRemark" class="label">
                <span class="label-text">備註事項</span>
              </label>
              <textarea
                id="userRemark"
                name="userRemark"
                class="w-full form-style textarea"
                v-model="userRemark"
                rows="4"
                placeholder="是否有其他需求"
              ></textarea>
              <button
                type="submit"
                class="w-full text-xl font-normal text-secondary-50
                bg-secondary-300 hover:bg-primary-700
                rounded border-none btn"
                :class="
                selectedDates.length === 0 ?
                'opacity-30 cursor-not-allowed hover:bg-secondary-300': ''"
                :disable="selectedDates.length === 0"
              >
                送出預約
              </button>
            </Form>
            <div class="flex-auto space-y-2 w-full max-w-screen-md
            h-full lg:order-none order-0">
              <h3 :class="selectedDates.length === 0 ? 'opacity-0': 'opacity-100'"
                class="text-lg font-normal text-center
            transition-all duration-500">選擇預定日期</h3>
              <div class="flex flex-wrap gap-2">
                <button v-for="date in selectedDates"
                :key="date"
                type="button"
                class="gap-4 btn"
                @click="handleDateSet(date, 'Remove')">
                {{ date }}
                <i class="text-xl bi bi-x-lg" />
                </button>
              </div>
              <vue-cal
              activeView="month"
              :selectedDate="selectedDate"
              todayButton
              locale="zh-hk"
              :time="false"
              :disableViews="['years', 'year', 'week' , 'day']"
              :maxDate="timeNow.addDays(30)"
              :minDate="timeNow"
              :disableDays="bookedTimestamps"
              :events="bookedDate"
              @cellClick="handleDateSet($event, 'Add')"
              >
              <template v-slot:arrow-prev>
                <div class="tooltip tooltip-right" data-tip="上個月">
                  <i aria-hidden="true"
                  class="text-2xl text-primary-400
                  hover:text-primary-600 transition duration-500
                  bi bi-arrow-left-square-fill" />
                </div>
              </template>
              <template v-slot:arrow-next>
                <div class="tooltip tooltip-left" data-tip="下個月">
                  <i aria-hidden="true"
                  class="text-2xl text-primary-400
                  hover:text-primary-600 transition duration-500
                  bi bi-arrow-right-square-fill" />
                </div>
              </template>
              <template v-slot:today-button>
                <div class="tooltip" data-tip="返回今天">
                  <button type="button"
                  class="hover:bg-transparent btn btn-square
                  btn-ghost
                  ">
                    <i class="text-2xl bi bi-at" />
                  </button>
                </div>
              </template>
              </vue-cal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.vuecal {
  @apply border-none rounded overflow-hidden
}
.vuecal__cell-content {
  @apply p-2
}
.vuecal__menu,
.vuecal__cell-events-count {
  @apply bg-primary-400 text-primary-100
}
.vuecal__title-bar {
  @apply bg-primary-200
}
.vuecal__cell--today,
.vuecal__cell--current {
  @apply bg-primary-500 text-primary-50
}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  @apply bg-primary-200
}
.vuecal__cell--selected:before {
  @apply border-primary-500
}
.vuecal__event-title {
  @apply text-lg font-medium
}
.vuecal__no-event {
  @apply text-secondary-700
}

.vuecal__cell-events-count {
  @apply hidden;
}

.vuecal__cell--has-events {
  @apply bg-secondary-100 border border-secondary-300 cursor-not-allowed
}

.vuecal__cell--disabled {
  @apply bg-secondary-50
}
.vuecal__cell--before-min {
  @apply text-primary-200
}
.vuecal__cell--after-max {
  @apply text-primary-300
}
.vuecal__cell--has-events {
  @apply text-secondary-400
}

</style>
