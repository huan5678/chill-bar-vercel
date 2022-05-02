const getDate = (timestamp = 0) => {
  let times = null;
  if (timestamp.toString().length < 13) {
    times = timestamp * 1000;
  } else {
    times = timestamp;
  }
  const date = new Date(times);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `
      ${year} 年 ${month} 月 ${day} 日 -
      ${hour} : ${minute} : ${second}
      `;
};
export default getDate;
