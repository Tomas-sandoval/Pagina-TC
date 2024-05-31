$(document).ready(function() {

    $('#registro-form').submit(function(event) {
        // Evita que se envíe el formulario automáticamente
        event.preventDefault();

        // Define las expresiones regulares para las validaciones
        var rutRegex = /^[0-9]{7,8}-[0-9Kk]$/;
        var nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúüÜñÑ\s]+$/;
        var correoRegex = /^[a-zA-Z0-9._%+-]+@gmail\.(cl|com)$/;
        var direccionRegex = /^[A-Za-z0-9\s,]+$/;
        var contrasenaRegex = /^[a-zA-Z0-9]{6,15}$/;

        // Obtiene los valores de los campos
        var rut = $('#rut').val();
        var nombres = $('#nombres').val();
        var apellidos = $('#apellidos').val();
        var correo = $('#correo').val();
        var direccion = $('#direccion').val();
        var contrasena = $('#contrasena').val();
        var repetirContrasena = $('#repetir_contrasena').val();

        // Verifica cada campo y muestra mensajes de error si es necesario
        var errores = [];

        if (!rutRegex.test(rut)) {
            errores.push('Por favor, ingrese un RUT válido sin puntos y con guion.');
        }

        if (!nombreRegex.test(nombres)) {
            errores.push('El campo de nombres solo puede contener letras y espacios.');
        }

        if (!nombreRegex.test(apellidos)) {
            errores.push('El campo de apellidos solo puede contener letras y espacios.');
        }

        if (!correoRegex.test(correo)) {
            errores.push('Por favor, ingrese un correo válido con dominio @gmail.cl o @gmail.com.');
        }

        if (!direccionRegex.test(direccion)) {
            errores.push('La dirección debe contener letras y números.');
        }

        if (!contrasenaRegex.test(contrasena)) {
            errores.push('La contraseña debe tener entre 6 y 15 caracteres y contener solo letras y números.');
        }

        if (contrasena !== repetirContrasena) {
            errores.push('Las contraseñas no coinciden.');
        }

        // Si hay errores, muestra un mensaje de error en rojo
        if (errores.length > 0) {
            $('#mensaje-error').remove(); // Elimina el mensaje de error anterior si existe

            var mensaje = '<div id="mensaje-error" class="error-message" style="text-align: center;">';
            errores.forEach(function(error) {
                mensaje += '<p>' + error + '</p>';
            });
            mensaje += '</div>';

            $('.registro-form').prepend(mensaje);
        } else {
            // Si no hay errores, envía el formulario
            $('#registro-form').unbind('submit').submit();
        }
    });

    // Custom validation method for RUT
    $.validator.addMethod("validarRUT", function(value, element) {
        return this.optional(element) || /^[0-9]{7,8}-[0-9Kk]$/.test(value);
    }, "Por favor, ingrese un RUT válido sin puntos y con guion.");

    // Custom validation method for letters only
    $.validator.addMethod("lettersOnly", function(value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
    }, "Este campo solo puede contener letras.");

    // Custom validation method for valid email domain
    $.validator.addMethod("validEmailDomain", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9._%+-]+@gmail\.(cl|com)$/.test(value);
    }, "Por favor, ingrese un correo válido con dominio @gmail.cl o @gmail.com.");

    // Custom validation method for address
    $.validator.addMethod("validAddress", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\s,]+$/.test(value);
    }, "La dirección debe contener letras y números.");

    // Custom validation method for password
    $.validator.addMethod("validPassword", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]{6,15}$/.test(value);
    }, "La contraseña debe contener entre 6 y 15 caracteres y solo letras y números.");

    $("#registro-form").validate({
        rules: {
            rut: {
                required: true,
                validarRUT: true
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
                validEmailDomain: true
            },
            direccion: {
                required: true,
                validAddress: true
            },
            contrasena: {
                required: true,
                validPassword: true
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
                validarRUT: "Por favor, ingrese un RUT válido sin puntos y con guion."
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
                validEmailDomain: "Por favor, ingrese un correo válido con dominio @gmail.cl o @gmail.com."
            },
            direccion: {
                required: "Este campo es obligatorio.",
                validAddress: "La dirección debe contener letras y números."
            },
            contrasena: {
                required: "Este campo es obligatorio.",
                validPassword: "La contraseña debe contener entre 6 y 15 caracteres y solo letras y números."
            },
            repetir_contrasena: {
                required: "Este campo es obligatorio.",
                equalTo: "Las contraseñas no coinciden.",
                validPassword: "La contraseña debe contener entre 6 y 15 caracteres y solo letras y números."
            }
        },
        errorClass: "error-message",
    });
});
