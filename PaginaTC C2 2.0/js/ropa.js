// Crear funcion ready
$(document).ready(function() {

    // Crear invocacion a la API donde se obtienen los datos:
    // https://fakestoreapi.com/products

    $.get('https://fakestoreapi.com/products', function(data) {

    // usando $.each recorrer la lista de ropas
    
        $.each(data, function(i, item) {

            // Crear el codigo HTMl dinamico para agregar los productos al contenedor

            html = `
                <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <div class="card" style="width: 18rem;">
                        <img src="${item.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">
                            ${item.title}
                        </h5>
                        <h6 class="card-title">
                            ${item.category}
                        </h6>
                        <p class="card-text">
                            ${item.description}
                        </p>
                        <a href="#" class="btn btn-primary">
                            Buscar en Gnomowear
                        </a>
                        </div>
                    </div>
                </div>
            `;

            $('#recuadro-de-ropa').append(html);
        });
    });
});


// Crear evento de click del boton usando su id #btn-obtener

// Crear invocacion a la API donde se obtienen los datos usando $.get con la...

// Crear funcion que recupera los datos

// Recorrer los datos usando $each

// Crear funcion de recorrido

// Crear el codigo HTML para agregar filas a la tabla usando los campos de cada...

