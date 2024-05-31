document.addEventListener("DOMContentLoaded", function() {
    // Obtener los elementos del formulario
    const idInput = document.getElementById('id');
    const categoriaSelect = document.querySelector('select[name="tipo_usuario"]');
    const nombreInput = document.getElementById('nombre');
    const descripcionInput = document.getElementById('descripcion');
    const precioInput = document.getElementById('precio');
    const descuentoInput = document.getElementById('descsus');
    const ofertaInput = document.getElementById('oferta');
    const guardarBtn = document.getElementById('guardar-btn');
    const nuevoBtn = document.getElementById('nuevo-btn');
    const eliminarBtn = document.getElementById('eliminar-btn');

    // Función para validar que el ID contenga solo números
    function validarId() {
        const idValue = idInput.value.trim();
        const errorSpan = document.getElementById('idError');
        if (!/^\d+$/.test(idValue)) {
            errorSpan.innerText = 'El ID debe contener solo números.';
            idInput.classList.add('is-invalid');
            return false;
        } else {
            errorSpan.innerText = '';
            idInput.classList.remove('is-invalid');
            return true;
        }
    }

    // Función para validar que la categoría no esté vacía
    function validarCategoria() {
        const errorSpan = document.getElementById('categoriaError');
        if (categoriaSelect.value === '') {
            errorSpan.innerText = 'Debe seleccionar una categoría.';
            categoriaSelect.classList.add('is-invalid');
            return false;
        } else {
            errorSpan.innerText = '';
            categoriaSelect.classList.remove('is-invalid');
            return true;
        }
    }

    // Función para validar que el nombre contenga solo letras y espacios
    function validarNombre() {
        const nombreValue = nombreInput.value.trim();
        const errorSpan = document.getElementById('nombreError');
        if (!/^[a-zA-Z\s]+$/.test(nombreValue)) {
            errorSpan.innerText = 'El nombre debe contener solo letras y espacios.';
            nombreInput.classList.add('is-invalid');
            return false;
        } else {
            errorSpan.innerText = '';
            nombreInput.classList.remove('is-invalid');
            return true;
        }
    }

    // Función para validar la descripción
    function validarDescripcion() {
        const descripcionValue = descripcionInput.value.trim();
        const errorSpan = document.getElementById('descripcionError');
        if (descripcionValue === '') {
            errorSpan.innerText = 'La descripción no puede estar vacía.';
            descripcionInput.classList.add('is-invalid');
            return false;
        } else {
            errorSpan.innerText = '';
            descripcionInput.classList.remove('is-invalid');
            return true;
        }
    }

    // Función para validar el precio
    function validarPrecio() {
        const precioValue = parseFloat(precioInput.value.trim());
        const errorSpan = document.getElementById('precioError');
        if (isNaN(precioValue) || precioValue < 0) {
            errorSpan.innerText = 'El precio debe ser un número mayor o igual a 0.';
            precioInput.classList.add('is-invalid');
            return false;
        } else {
            errorSpan.innerText = '';
            precioInput.classList.remove('is-invalid');
            return true;
        }
    }

    // Función para validar el descuento suscriptor
    function validarDescuento() {
        const descuentoValue = parseFloat(descuentoInput.value.trim());
        const errorSpan = document.getElementById('descuentoError');
        if (isNaN(descuentoValue) || descuentoValue < 0 || descuentoValue > 100) {
            errorSpan.innerText = 'El descuento suscriptor debe ser un número entre 0 y 100.';
            descuentoInput.classList.add('is-invalid');
            return false;
        } else {
            errorSpan.innerText = '';
            descuentoInput.classList.remove('is-invalid');
            return true;
        }
    }

    // Función para validar el descuento por oferta
    function validarOferta() {
        const ofertaValue = parseFloat(ofertaInput.value.trim());
        const errorSpan = document.getElementById('ofertaError');
        if (isNaN(ofertaValue) || ofertaValue < 0 || ofertaValue > 100) {
            errorSpan.innerText = 'El descuento por oferta debe ser un número entre 0 y 100.';
            ofertaInput.classList.add('is-invalid');
            return false;
        } else {
            errorSpan.innerText = '';
            ofertaInput.classList.remove('is-invalid');
            return true;
        }
    }

    // Función para validar todos los campos del formulario
    function validarFormulario() {
        const esIdValido = validarId();
        const esCategoriaValida = validarCategoria();
        const esNombreValido = validarNombre();
        const esDescripcionValida = validarDescripcion();
        const esPrecioValido = validarPrecio();
        const esDescuentoValido = validarDescuento();
        const esOfertaValida = validarOferta();
        return esIdValido && esCategoriaValida && esNombreValido && esDescripcionValida && esPrecioValido && esDescuentoValido && esOfertaValida;
    }

    // Event listeners para validaciones en tiempo real
    idInput.addEventListener('input', validarId);
    categoriaSelect.addEventListener('change', validarCategoria);
    nombreInput.addEventListener('input', validarNombre);
    descripcionInput.addEventListener('input', validarDescripcion);
    precioInput.addEventListener('input', validarPrecio);
    descuentoInput.addEventListener('input', validarDescuento);
    ofertaInput.addEventListener('input', validarOferta);

    // Event listener para el botón Guardar
    guardarBtn.addEventListener('click', function() {
        if (validarFormulario()) {
            alert("Formulario validado con éxito.");
        } else {
            alert("Error al validar el formulario. Por favor, revise los campos.");
        }
    });

    // Event listener para el botón Nuevo
    nuevoBtn.addEventListener('click', function() {
        if (validarFormulario()) {
            alert("Producto agregado.");
        } else {
            alert("Error al agregar producto. Por favor, revise los campos.");
        }
    });

    // Event listener para el botón Eliminar
    eliminarBtn.addEventListener('click', function() {
        if (validarFormulario()) {
            alert("Producto eliminado.");
        } else {
            alert("Error al eliminar producto. Por favor, revise los campos.");
        }
    });
});
