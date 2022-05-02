<script>
import {
  computed,
  ref,
  reactive,
  watch,
} from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Form } from 'vee-validate';
import useStore from '@/stores';
import ModalCardTitle from './ModalCardTitle.vue';

export default {
  components: { ModalCardTitle, Form },
  props: { products: Object },
  setup(props, context) {
    const { adminDataStore } = useStore();
    const {
      handleEditData,
      handleCreateData,
      handleImageUpload,
      functionSelected,
      handleResetTempProduct,
      adminData,
    } = adminDataStore;

    const articleData = computed(() => adminData.tempProduct);

    const imageFile = ref(null);

    const article = reactive({
      content: '',
    });

    watch(() => articleData.value.description, (nv) => {
      article.content = nv;
    });

    const tagList = ref([
      {
        value: 'whisky',
        name: '威士忌',
      },
      {
        value: 'gin',
        name: '琴酒',
      },
      {
        value: 'vodka',
        name: '伏特加',
      },
      {
        value: 'tequila',
        name: '龍舌蘭',
      },
      {
        value: 'rum',
        name: '蘭姆酒',
      },
      {
        value: 'brandy',
        name: '白蘭地',
      },
    ]);

    function closeModal() {
      context.attrs.handleOpenModal(false);
    }

    function handleResetFormInput() {
      handleResetTempProduct();
      article.content = '';
      closeModal();
    }

    function handleProductAddition() {
      const data = {
        data: {
          title: articleData.value.title,
          subTitle: articleData.value.subTitle,
          author: articleData.value.author,
          isPublic: articleData.value.isPublic,
          content: ' ',
          description: article.content,
          create_at: new Date().getTime(),
          image: articleData.value.image,
          tag: articleData.value.tag,
        },
      };
      if (functionSelected.selected === 'articleEdit') {
        handleEditData(articleData.value.id, data);
      } else {
        handleCreateData(data);
      }
      handleResetFormInput();
    }

    function handleGetImageUrl() {
      const file = imageFile.value.files[0];
      handleImageUpload(file)
        .then((res) => {
          articleData.value.image = res.data.imageUrl;
        })
        .catch((err) => {
          console.dir(err);
        });
    }

    return {
      selectType: computed(() => functionSelected.selected),
      articleData,
      tagList,
      imageFile,
      handleResetFormInput,
      handleProductAddition,
      handleGetImageUrl,
      handleOpenModal: context.attrs.handleOpenModal,
      closeModal,
      editor: ClassicEditor,
      editorConfig: {
        placeholder: '請輸入文章...',
        language: 'zh',
      },
      article,
    };
  },
};
</script>

<template>
  <section class="flex overflow-hidden flex-col pb-4 space-y-4 bg-gray-50 rounded-md">
    <ModalCardTitle
      :title="selectType === 'articleEdit' ? '內容編輯' : '新增文章'"
      :close-modal="handleOpenModal"
    />
    <Form class="container p-4 space-y-4" @submit="handleProductAddition">
      <div class="flex gap-2 justify-between">
        <div class="flex-1">
          <label for="articleImage" class="block mb-4">文章圖片</label>
          <input
            type="file"
            accept="image/*"
            id="articleImages"
            name="articleImages"
            ref="imageFile"
            class="block file:py-2 file:px-4 file:mr-4 w-full
            file:text-sm text-gray-400 file:text-secondary-700
            file:bg-secondary-100 hover:file:bg-secondary-300 rounded file:rounded-full
            file:border-0"
            @change="handleGetImageUrl()"
          />
        </div>
        <img
          class="object-cover flex-auto max-h-48"
          v-if="articleData.image"
          :src="articleData.image"
          alt="文章附圖"
        />
      </div>
      <div class="flex gap-4 justify-between w-full">
        <div class="flex-auto">
          <label for="articleName" class="block mb-4">文章標題</label>
          <input
            type="text"
            id="articleName"
            name="articleName"
            class="w-full form-style"
            v-model="articleData.title"
            required
          />
        </div>
        <div class="flex-auto">
          <label for="articleSubTitle" class="block mb-4">文章副標題</label>
          <input
            type="text"
            id="articleSubTitle"
            name="articleSubTitle"
            class="w-full form-style"
            v-model="articleData.subTitle"
            required
          />
        </div>
        <div class="flex-auto">
          <label for="articleAuthor" class="block mb-4">文章作者</label>
          <input
            type="text"
            id="articleAuthor"
            name="articleAuthor"
            class="w-full form-style"
            v-model="articleData.author"
          />
        </div>
      </div>
      <div class="flex gap-4 space-between">
        <div class="flex-auto w-full">
          <label for="articleContent" class="block mb-4">文章內容</label>
          <ckeditor id="articleContent"
          name="articleContent"
          :editor="editor"
          v-model="article.content"
          :config="editorConfig"
          />
        </div>
        <div class="flex-auto w-1/4">
          <h3 class="block mb-4">文章是否公開</h3>
          <input id="articleIsEnable"
            class="toggle"
              type="checkbox"
              v-model="articleData.isPublic"
              />
          <label for="articleIsEnable" class="p-2">
            {{ articleData.isPublic === true ? '公開' : '未公開' }}
          </label>
        </div>
        <div class="flex-auto">
          <h3 class="mb-4">文章標籤</h3>
          <div
          class="flex flex-wrap gap-2 justify-around items-center"
          >
            <div class="form-control" v-for="tag in tagList" :key="tag.value">
              <label class="cursor-pointer label" :for="tag.value">
                <input
                type="checkbox"
                class="checkbox"
                :id="tag.value"
                v-model="articleData.tag"
                :value="tag.value"
              >
                <span class="ml-2 label-text">
                  {{ tag.name }}
                </span>
              </label>
            </div>
            <div class="form-control">
              <label class="cursor-pointer label" for="coupon">
                <input
                type="checkbox"
                class="checkbox"
                id="coupon"
                v-model="articleData.tag"
                value="coupon"
              >
                <span class="ml-2 label-text">優惠券</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-4 justify-between">
        <button
          class="flex-auto py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md hover:shadow
          hover:shadow-gray-400 transition duration-300"
          @click="handleResetFormInput()"
          type="reset"
        >
          {{ selectType === 'articleEdit' ? '取消修改' : '取消新增' }}
        </button>
        <button
          class="flex-auto py-2 text-white bg-primary-500 hover:bg-primary-600
          rounded-md hover:shadow hover:shadow-primary-400
          transition duration-300"
          type="submit"
        >
          {{ selectType === 'articleEdit' ? '確定修改' : '新增文章' }}
        </button>
      </div>
    </Form>
  </section>
</template>
