import Swal from "sweetalert2";
import { handleToast } from "./handleToast";

export const swalConfirmedDelet = () => {
  Swal.fire({
    title: "Você tem certeza?",
    text: "Essa ação é irreversível!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar!",
  }).then((result) => {
    if (result.isConfirmed) {
      handleToast("Produto deletado com sucesso.", "success");
    }
  });
};
