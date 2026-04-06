import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

export const errorSwal = (message = "Something went wrong!") => {
  Swal.fire({
    icon: "error",
    title: message,
    toast: true,
    position: "center",
    showConfirmButton: false,
    showCloseButton: true,         
    timerProgressBar: true,
    background: "#fff",
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer); 
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      popup: 'error-toast',
    }
  });
};


export const successSwal = (message = "Task Successfull!") => {
  Swal.fire({
    icon: "success",
    title: message,
    toast: true,
    position: "center",
    showConfirmButton: false,
    showCloseButton: true,         
    timerProgressBar: true,
    background: "#fff",
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer); 
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      popup: 'success-toast',
    }
  });
};