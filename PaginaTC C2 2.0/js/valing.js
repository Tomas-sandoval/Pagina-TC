$(document).ready(function() {
    // Método personalizado para validar los dominios de correo
    $.validator.addMethod("validEmailDomain", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9._%+-]+@(gmail\.com|gmail\.cl|duocuc\.cl)$/.test(value);
    }, "Por favor, ingrese un correo válido con dominio @gmail.com, @gmail.cl o @duocuc.cl.");

    // Añadir la validación al formulario cuando se envíe
    $("#login-form").validate({
        rules: {
            correo: {
                required: true,
                email: true,
                validEmailDomain: true
            },
            contraseña: {
                required: true,
                minlength: 5,
                maxlength: 12
            }
        },
        messages: {
            correo: {
                required: "Por favor, ingrese su correo.",
                email: "Por favor, ingrese un correo válido.",
                validEmailDomain: "Por favor, ingrese un correo válido con dominio @gmail.com, @gmail.cl o @duocuc.cl."
            },
            contraseña: {
                required: "Debes ingresar una contraseña.",
                minlength: "La contraseña debe tener al menos 5 caracteres.",
                maxlength: "La contraseña no debe exceder los 12 caracteres."
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
