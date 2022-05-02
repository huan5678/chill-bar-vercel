import { useAdminStore } from './admin';
import { useAdminDataStore } from './adminData';
import { useProductStore } from './product';
import { useOrderStore } from './order';
import { useCartStore } from './cart';
import { useCouponStore } from './coupon';
import { useBookingDateStore } from './dates';

export default function useStore() {
  const adminStore = useAdminStore();
  const adminDataStore = useAdminDataStore();
  const productStore = useProductStore();
  const orderStore = useOrderStore();
  const cartStore = useCartStore();
  const couponStore = useCouponStore();
  const bookingStore = useBookingDateStore();

  return {
    adminStore,
    adminDataStore,
    productStore,
    orderStore,
    cartStore,
    couponStore,
    bookingStore,
  };
}
