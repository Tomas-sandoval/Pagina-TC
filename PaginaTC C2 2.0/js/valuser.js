// Función para validar el RUT chileno
function validarRut(rut) {
    const regex = /^[0-9]{7,8}-[0-9Kk]$/;

    if (!regex.test(rut)) return false;

    const [num, dig] = rut.split("-");
    return digitoVerificador(num) === dig.toUpperCase();
}

function digitoVerificador(num) {
    let M = 0, S = 1;
    for (; num; num = Math.floor(num / 10)) {
        S = (S + num % 10 * (9 - M++ % 6)) % 11;
    }
    return S ? S - 1 : 'K';
}

// Función para validar el formulario
function validarFormulario() {
    let esValido = true;

    // Validar campo ID
    const id = document.querySelector("#id");
    if (id) {
        if (!id.value) {
            id.classList.add("is-invalid");
            esValido = false;
        } else {
            id.classList.remove("is-invalid");
        }
    }

    // Validar tipo de usuario
    const tipoUsuario = document.querySelector("input[name='tipo_usuario']:checked");
    const tipoUsuarioFeedback = document.querySelector("input[name='tipo_usuario']").parentElement.querySelector(".invalid-feedback");
    if (tipoUsuarioFeedback) {
        if (!tipoUsuario) {
            tipoUsuarioFeedback.style.display = "block";
            esValido = false;
        } else {
            tipoUsuarioFeedback.style.display = "none";
        }
    }

    // Validar RUT
    const rutField = document.querySelector("#Rut");
    if (rutField) {
        const rut = rutField.value.trim();
        if (!validarRut(rut)) {
            rutField.classList.add("is-invalid");
            esValido = false;
        } else {
            rutField.classList.remove("is-invalid");
        }
    }

    // Validar nombres
    const nombres = document.querySelector("#Nombres");
    if (nombres) {
        const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúüÜñÑ\s]+$/;
        if (!nombreRegex.test(nombres.value)) {
            nombres.classList.add("is-invalid");
            esValido = false;
        } else {
            nombres.classList.remove("is-invalid");
        }
    }

    // Validar apellidos
    const apellidos = document.querySelector("#Apellidos");
    if (apellidos) {
        const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúüÜñÑ\s]+$/;
        if (!nombreRegex.test(apellidos.value)) {
            apellidos.classList.add("is-invalid");
            esValido = false;
        } else {
            apellidos.classList.remove("is-invalid");
        }
    }

    // Validar correo
    const correo = document.querySelector("#Correo");
    if (correo) {
        const correoRegex = /^[a-zA-Z0-9._%+-]+@gmail\.(cl|com)$/;
        if (!correoRegex.test(correo.value)) {
            correo.classList.add("is-invalid");
            esValido = false;
        } else {
            correo.classList.remove("is-invalid");
        }
    }

    // Validar dirección
    const direccion = document.querySelector("#Direccion");
    if (direccion) {
        const direccionRegex = /^[A-Za-z0-9\s,]+$/;
        if (!direccionRegex.test(direccion.value)) {
            direccion.classList.add("is-invalid");
            esValido = false;
        } else {
            direccion.classList.remove("is-invalid");
        }
    }

    return esValido;
}

// Función para el botón Guardar
function guardar() {
    if (validarFormulario()) {
        alert("Formulario válido. Guardando datos...");
    } else {
        alert("Hay errores en el formulario. Por favor, corríjalos e intente nuevamente.");
    }
}

// Función para el botón Nuevo
function nuevo() {
    if (validarFormulario()) {
        alert("Se agregó un nuevo usuario.");
    } else {
        alert("Ocurrió un error al agregar un nuevo usuario.");
    }
}

// Función para el botón Eliminar
function eliminar() {
    if (validarFormulario()) {
        alert("Se eliminó un usuario correctamente.");
    } else {
        alert("Ocurrió un error al eliminar el usuario.");
    }
}

// Añadir eventos a los botones
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#guardar").addEventListener("click", guardar);
    document.querySelector("#nuevo").addEventListener("click", nuevo);
    document.querySelector("#eliminar").addEventListener("click", eliminar);
});

