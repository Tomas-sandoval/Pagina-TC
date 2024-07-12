$(document).ready(function() {
    // Método personalizado para validar el nombre de usuario
    $.validator.addMethod("validUsername", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9_-]+$/.test(value);
    }, "El nombre de usuario solo puede contener letras, números, guiones y guiones bajos.");

    // Añadir la validación al formulario cuando se envíe
    $("#login-form").validate({
        rules: {
            usuario: {
                required: true,
                maxlength: 25,
                validUsername: true
            },
            contraseña: {
                required: true,
                minlength: 5,
                maxlength: 15
            }
        },
        messages: {
            usuario: {
                required: "Por favor, ingrese su nombre de usuario.",
                maxlength: "El nombre de usuario no debe exceder los 25 caracteres.",
                validUsername: "El nombre de usuario solo puede contener letras, números, guiones y guiones bajos."
            },
            contraseña: {
                required: "Debes ingresar una contraseña.",
                minlength: "La contraseña debe tener al menos 5 caracteres.",
                maxlength: "La contraseña no debe exceder los 15 caracteres."
            }
        },
        errorClass: "error-message",
        errorElement: "div",
        highlight: function(element, errorClass) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function(element, errorClass) {
            $(element).removeClass("is-invalid");
        }
    });

    // Controla la funcionalidad del botón de ingreso
    $("button[type='submit']").click(function(event) {
        event.preventDefault();
        if ($("#login-form").valid()) {
            alert("Formulario enviado correctamente.");
            // Aquí puedes agregar la lógica para enviar el formulario
            // $("#login-form").submit(); // Si deseas enviar el formulario
        }
    });
});
