import Swal from 'sweetalert2';

function handleSweetAlert({
  title = '',
  timer = 0,
  content = '',
  icon = 'info',
  iconColor = '#f59f13',
}) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    title,
    showConfirmButton: false,
    timer,
    text: content,
    icon,
    iconColor,
    showClass: {
      popup: 'animate__animated animate__fadeInRight animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutRight animate__faster',
    },
  });
}

export function closeToast() {
  Swal.close();
}

export default handleSweetAlert;
