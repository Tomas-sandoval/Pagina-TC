$(document).ready(function() {
    // Método personalizado para validar el RUT chileno
    $.validator.addMethod("rutChileno", function(value, element) {
        var rutPattern = /^\d{7,8}-[\dK]$/;
        if (!rutPattern.test(value)) {
            return false;
        }

        var rutSinGuion = value.replace("-", "");
        var rut = rutSinGuion.slice(0, -1);
        var dv = rutSinGuion.slice(-1).toUpperCase();
        var factor = 2;
        var sum = 0;
        for (var i = rut.length - 1; i >= 0; i--) {
            sum += parseInt(rut.charAt(i)) * factor;
            factor = factor === 7 ? 2 : factor + 1;
        }
        var dvCalculado = 11 - (sum % 11);
        dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();

        return dv === dvCalculado;
    }, "El RUT no es válido (escriba sin puntos y con guión).");

    // Método personalizado para validar correos electrónicos
    $.validator.addMethod("emailCompleto", function(value, element) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;
        return regex.test(value);
    }, 'El formato del correo no es válido.');

    // Método personalizado para validar direcciones
    $.validator.addMethod("validAddress", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\s,]+$/.test(value);
    }, "La dirección debe contener letras y números.");

    // Método personalizado para validar contraseñas
    $.validator.addMethod("validPassword", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]{5,15}$/.test(value);
    }, "La contraseña debe contener entre 5 y 15 caracteres y solo letras y números.");

    // Método personalizado para validar solo letras
    $.validator.addMethod("lettersOnly", function(value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
    }, "Este campo solo puede contener letras.");
    // El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula
    document.getElementById('rut').addEventListener('keyup', function(e) {
        e.target.value = e.target.value.toUpperCase();
    });

    // Validaciones del formulario
    $("#registro-form").validate({
        rules: {
            rut: {
                required: true,
                rutChileno: true
            },
            nombres: {
                required: true,
                lettersOnly: true
            },
            apellidos: {
                required: true,
                lettersOnly: true
            },
            correo: {
                required: true,
                email: true,
                emailCompleto: true
            },
            direccion: {
                required: true,
                validAddress: true
            },
            contrasena: {
                required: true,
                validPassword: true,
                minlength: 5,
                maxlength: 15
            },
            repetir_contrasena: {
                required: true,
                equalTo: "#contrasena",
                validPassword: true
            }
        },
        messages: {
            rut: {
                required: "Este campo es obligatorio.",
                rutChileno: "Por favor, ingrese un RUT válido sin puntos y con guion."
            },
            nombres: {
                required: "Este campo es obligatorio.",
                lettersOnly: "Este campo solo puede contener letras."
            },
            apellidos: {
                required: "Este campo es obligatorio.",
                lettersOnly: "Este campo solo puede contener letras."
            },
            correo: {
                required: "Este campo es obligatorio.",
                email: "Por favor, ingrese un correo válido.",
                emailCompleto: "El formato del correo no es válido."
            },
            direccion: {
                required: "Este campo es obligatorio.",
                validAddress: "La dirección debe contener letras y números."
            },
            contrasena: {
                required: "Este campo es obligatorio.",
                validPassword: "La contraseña debe contener entre 5 y 15 caracteres."
            },
            repetir_contrasena: {
                required: "Este campo es obligatorio.",
                equalTo: "Las contraseñas no coinciden.",
                validPassword: "La contraseña debe contener entre 5 y 15 caracteres."
            }
        },
        errorClass: "error-message",
    });
});
