$(document).ready(function () {
    $('#nuevo').on('click', function () {
        // Limpiar todos los campos del formulario
        $('#categoria').val('');
        $('#nombre').val('');
        $('#cantidad').val('0');
        $('.invalid-feedback').hide(); // Ocultar todos los mensajes de error
    });

    $('#agregar').on('click', function () {
        // Validar campos
        let isValid = true;

        if ($('#categoria').val() === '') {
            $('#categoria-error').show();
            isValid = false;
        } else {
            $('#categoria-error').hide();
        }

        if ($('#nombre').val() === '') {
            $('#nombre-error').show();
            isValid = false;
        } else {
            $('#nombre-error').hide();
        }

        if ($('#cantidad').val() <= 0) {
            $('#cantidad-error').show();
            isValid = false;
        } else {
            $('#cantidad-error').hide();
        }

        if (isValid) {
            alert('Se agregó un nuevo producto');
        } else {
            alert('Ocurrió un error al agregar un producto');
        }
    });
});
