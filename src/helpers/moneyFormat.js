const moneyFormat = (num, qty) => {
  let number = num;
  if (qty !== undefined) number *= qty;
  return num !== undefined ? Number(number.toFixed(1)).toLocaleString() : 0;
};
export default moneyFormat;
