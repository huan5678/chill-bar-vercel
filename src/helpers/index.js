import getDate from './getDate';
import moneyFormat from './moneyFormat';
import handleSweetAlert, { closeToast } from './handleSweetAlert';

export default function useHelper() {
  return {
    getDate,
    moneyFormat,
    handleSweetAlert,
    closeToast,
  };
}
