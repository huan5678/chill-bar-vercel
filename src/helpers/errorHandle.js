import handleSweetAlert from '@/helpers/handleSweetAlert';

function errorHandle(err) {
  handleSweetAlert({
    icon: 'error',
    iconColor: '#F57375',
    timer: 5000,
    title: `😑 喔喔 發生了一些事
    ${err.response.data.message}`,
  });
}
export default errorHandle;
