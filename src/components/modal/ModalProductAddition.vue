<script>
import {
  computed,
  onMounted,
  ref,
} from 'vue';
import useStore from '@/stores';
import ModalCardTitle from './ModalCardTitle.vue';

export default {
  components: { ModalCardTitle },
  props: { products: Object },
  setup(props, context) {
    const { adminDataStore, productStore } = useStore();
    const {
      handleEditData, handleCreateData, handleImageUpload, functionSelected, adminData,
    } = adminDataStore;

    const { productCategory } = productStore;

    const productData = computed({
      get: () => ({ ...adminData.tempProduct }),
      set: (val) => val,
    });

    const imageFile = ref(null);
    const mainImageFile = ref(null);

    function closeModal() {
      context.attrs.handleOpenModal(false);
    }

    function resetForm() {
      productData.value = {
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: '',
        recommend: false,
        description: '',
        content: '',
        is_enabled: '',
        imageUrl: '',
        imagesUrl: [],
      };
      productData.value.imagesUrl = [];
    }

    function handleResetFormInput() {
      resetForm();
      closeModal();
    }

    function handleProductAddition() {
      if (functionSelected.selected === 'productEdit') {
        handleEditData(productData.value.id, { data: productData.value });
      } else {
        handleCreateData({ data: productData.value });
      }
      closeModal();
    }

    const handleGetImageUrl = async (target) => {
      let file = [];
      if (target === 'mainImage') {
        [file] = mainImageFile.value.files;
      } else {
        [file] = imageFile.value.files;
      }
      console.log('imageFile = ', imageFile);
      console.log('file = ', file);
      handleImageUpload(file)
        .then((res) => {
          if (target === 'mainImage') {
            productData.value.imageUrl = res.data.imageUrl;
          } else {
            productData.value.imagesUrl.push(res.data.imageUrl);
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.dir(err);
        });
    };

    function handleRemoveImageArr(idx) {
      productData.value.imagesUrl.splice(idx, 1);
    }

    onMounted(() => {
      if (functionSelected.selected === 'productCreate') {
        resetForm();
      }
    });

    return {
      selectType: computed(() => functionSelected.selected),
      productData,
      mainImageFile,
      imageFile,
      handleResetFormInput,
      handleProductAddition,
      handleGetImageUrl,
      handleRemoveImageArr,
      handleOpenModal: context.attrs.handleOpenModal,
      closeModal,
      productCategory: computed(() => productCategory),
    };
  },
};
</script>

<template>
  <section class="flex overflow-hidden flex-col pb-4 space-y-4 bg-secondary-50 rounded-md">
    <ModalCardTitle
      :title="selectType === 'productEdit' ? '內容編輯' : '新增產品'"
      :close-modal="handleOpenModal"
    />
    <form class="container p-4 space-y-4" @submit.prevent="handleProductAddition">
      <div class="flex flex-wrap justify-between">
        <div class="flex gap-4 justify-between">
          <div class="flex-auto">
            <div class="flex gap-2 justify-between">
              <div class="flex-1">
                <label for="productMainImage" class="block mb-4"
                  >產品主圖片</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="productMainImage"
                    name="productMainImage"
                    ref="mainImageFile"
                    class="block file:py-2 file:px-4 file:mr-4 w-full
                    file:text-sm text-secondary-400 file:text-secondary-700
                    file:bg-secondary-100 hover:file:bg-secondary-300 rounded file:rounded-full
                    file:border-0"
                    @change="handleGetImageUrl('mainImage')"
                  />
              </div>
              <img
                class="object-cover flex-auto max-h-48"
                v-if="productData.imageUrl"
                :src="productData.imageUrl"
                alt="產品主圖"
              />
            </div>
          </div>
        </div>
        <ul class="flex gap-2 justify-between">
          <li>
            <label for="productImages" class="block mb-4"
              >產品附屬圖片</label>
              <input
                type="file"
                accept="image/*"
                id="productImages"
                name="productImages"
                ref="imageFile"
                class="block file:py-2 file:px-4 file:mr-4 w-full file:text-sm
                text-secondary-400 file:text-secondary-700 file:bg-secondary-100
                hover:file:bg-secondary-300 rounded file:rounded-full file:border-0"
                @change="handleGetImageUrl()"
              />
          </li>
          <li class="flex-auto" v-for="(item, idx) in productData.imagesUrl" :key="item + idx">
            <div class="relative">
              <img
                class="object-cover w-32 max-h-24 rounded-xl"
                v-if="item !== ''"
                :src="item"
                alt="附屬圖片"
              />
              <button
                class="absolute top-0 right-0 p-4 text-secondary-100"
                type="button"
                @click="handleRemoveImageArr(idx)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                </svg>
              </button>
            </div>
          </li>
        </ul>
        <div class="flex gap-4 justify-between w-full">
          <div class="flex-auto">
            <label for="productName" class="block mb-4"
              >產品名稱</label>
              <input
                type="text"
                id="productName"
                name="productName"
                class="w-full form-style"
                v-model="productData.title"
                required
              />
          </div>
          <div class="flex-auto">
            <label for="productContent" class="block mb-4"
              >產品說明</label>
              <input
                type="text"
                id="productContent"
                name="productContent"
                class="w-full form-style"
                v-model="productData.content"
                required
              />
          </div>
          <div class="flex-auto">
            <label for="productCategory" class="block mb-4"
              >產品類別</label>
              <input type="text"
              v-model="productData.category"
              class="w-full form-style"
              required
              list="productCategory">
              <datalist
                class=""
                id="productCategory"
              >
                <template
                v-for="category in productCategory"
                :key="category.title"
                >
                  <option
                  :class="{'line-through': category.category === 'All'}"
                  :disabled="category.category === 'All'"
                  :value="category.category">
                    {{ category.title }}
                  </option>
                </template>
              </datalist>
          </div>
          <div class="flex-auto">
            <label for="productRecommend" class="block mb-4"
              >產品是否於首頁推薦</label>
              <input type="checkbox" id="productRecommend"
              class="toggle" v-model="productData.recommend">
              <span class="ml-3 text-sm font-medium text-secondary-900">
                <!-- {{ couponData?.is_enabled === 1 ? '啟用' : '未啟用' }} -->
              </span>
          </div>
        </div>
      </div>
      <div class="">
        <label for="productDescription" class="block mb-4"
          >產品描述</label>
          <textarea
            id="productDescription"
            name="productDescription"
            class="w-full form-style"
            v-model="productData.description"
          />
      </div>
      <div class="flex gap-4 justify-between">
        <div class="flex-auto">
          <label for="productIsEnable" class="block mb-4"
            >產品啟用狀態</label>
            <select
              class="w-full form-style"
              id="productIsEnable"
              required
              v-model="productData.is_enabled"
            >
              <option value="0">未啟用</option>
              <option value="1">啟用</option>
              <option value="2">未上架</option>
              <option value="3">已下架</option>
            </select>
        </div>
        <div class="flex-auto">
          <label for="productOriginPrice" class="block mb-4"
            >產品原價</label>
            <input
              type="text"
              id="productOriginPrice"
              name="productOriginPrice"
              class="w-full form-style"
              v-model.number="productData.origin_price"
            />
        </div>
        <div class="flex-auto">
          <label for="productPrice" class="block mb-4"
            >產品最終價格</label>
            <input
              type="text"
              id="productPrice"
              name="productPrice"
              class="w-full form-style"
              required
              v-model.number="productData.price"
            />
        </div>
        <div class="flex-auto">
          <label for="productUnit" class="block mb-4"
            >產品品項單位</label>
            <input
              type="text"
              id="productUnit"
              name="productUnit"
              class="w-full form-style"
              v-model="productData.unit"
            />
        </div>
      </div>
      <div class="flex gap-4 justify-between">
        <button
          class="flex-auto bg-secondary-500
          hover:bg-secondary-600 border-secondary-500
          hover:border-secondary-400 hover:shadow
          hover:shadow-secondary-400 transition
          duration-300 btn"
          @click="handleResetFormInput()"
          type="reset"
        >
          {{ selectType === 'productEdit' ? '取消修改' : '取消新增' }}
        </button>
        <button
          class="flex-auto bg-primary-500
          hover:bg-primary-600 border-primary-500
          hover:border-primary-600 hover:shadow
          hover:shadow-primary-400 transition
          duration-300 btn"
          type="submit"
        >
          {{ selectType === 'productEdit' ? '確定修改' : '新增產品' }}
        </button>
      </div>
    </form>
  </section>
</template>
