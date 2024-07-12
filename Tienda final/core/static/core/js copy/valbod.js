$(document).ready(function() {
    // Validación al hacer clic en Agregar
    $('#agregar').on('click', function() {
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

    // Validación al hacer clic en Nuevo
    $('#nuevo').on('click', function() {
        // Limpiar todos los campos del formulario y ocultar mensajes de error
        $('#categoria').val('');
        $('#nombre').val('');
        $('#cantidad').val('0');
        $('.invalid-feedback').hide();
    });
});
