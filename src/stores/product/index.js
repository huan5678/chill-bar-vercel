import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import errorHandle from '@/helpers/errorHandle';

export const useProductStore = defineStore('product', () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const apiPath = process.env.VUE_APP_API_PATH;
  const productList = reactive({
    products: [],
    pagination: {},
    currentPage: 1,
    productDetail: {},
    selectCategory: '',
    errorMessage: '',
    productMainImage: '',
    productImages: [],
  });
  const isLoading = ref('');
  const productCategory = ref([
    {
      title: '全品項',
      category: 'All',
    },
    {
      title: '伏特加',
      category: 'vodka',
    },
    {
      title: '琴酒',
      category: 'gin',
    },
    {
      title: '威士忌',
      category: 'whisky',
    },
    {
      title: '龍舌蘭',
      category: 'tequila',
    },
    {
      title: '蘭姆酒',
      category: 'rum',
    },
    {
      title: '白蘭地',
      category: 'brandy',
    },
  ]);

  function checkImage(productArray) {
    const result = productArray.filter((product) => product.imageUrl !== '');
    return result;
  }

  function handleGetProductAll() {
    axios
      .get(`${baseUrl}api/${apiPath}/products/all`)
      .then((res) => {
        productList.products = checkImage(res.data.products);
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleGetProductList(category = '', page = productList.currentPage) {
    let selectCategory = category;
    if (category === 'All') {
      selectCategory = '';
    }
    axios
      .get(`${baseUrl}api/${apiPath}/products?page=${page}&category=${selectCategory}`)
      .then((res) => {
        productList.products = checkImage(res.data.products);
        productList.pagination = res.data.pagination;
      })
      .catch((err) => {
        errorHandle(err);
      });
  }

  function handleProductMainImage(img) {
    productList.productMainImage = img;
  }

  function handleGetProductDetail(id) {
    isLoading.value = id;
    axios(`${baseUrl}api/${apiPath}/product/${id}`)
      .then((res) => {
        isLoading.value = '';
        productList.productDetail = res.data.product;
        productList.productMainImage = res.data.product.imageUrl;
        productList.productImages = [...res.data.product.imagesUrl];
        productList.productImages.push(res.data.product.imageUrl);
      })
      .catch((err) => {
        errorHandle(err);
        isLoading.value = '';
      });
  }

  return {
    productList,
    handleGetProductAll,
    handleGetProductList,
    productCategory,
    handleGetProductDetail,
    handleProductMainImage,
    isLoading,
  };
});
export default useProductStore;
