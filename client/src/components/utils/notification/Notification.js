import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customId = "toast-custom-id";

// toast error message
export const showErrMsg = (msg) => {
    toast.error(msg, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customId
    });
};

// toast success message
export const showSuccessMsg = msg => {
    toast.success(msg, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customId
    });
};
