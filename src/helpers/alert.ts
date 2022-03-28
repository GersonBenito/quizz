import Swal, { SweetAlertIcon } from "sweetalert2"

export const showAlert = ( title: string, description: string, type: SweetAlertIcon ) =>{
    Swal.fire({
        title: title,
        text: description,
        icon: type,
        showCloseButton: true,
        confirmButtonText: 'Agree'
    });
}