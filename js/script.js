document.addEventListener("DOMContentLoaded", function() {
    // Tu código JavaScript que accede a elementos del DOM aquí
    // Cargar la barra de navegación
    fetch("navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("navbar").innerHTML = data;
        });

    // Cargar la barra de navegación 2
    fetch("navbar2.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("navbar2").innerHTML = data;
        });

    // Utiliza fetch para obtener el contenido del archivo carrusel.html
    fetch("carrusel.html")
        .then((response) => response.text())
        .then((data) => {
            // Inserta el contenido en el div con id "carrusel-container"
            document.getElementById("carrusel-container").innerHTML = data;

            // Después de cargar el carrusel, puedes inicializarlo si estás usando Bootstrap Carousel
            var myCarousel = new bootstrap.Carousel(
                document.getElementById("carouselExampleAutoplaying"),
                {
                    interval: 2000, // Cambia el intervalo de cambio de diapositivas en milisegundos según lo necesites
                    wrap: true, // Activa el rebobinado del carrusel al llegar al final
                    pause: "hover", // Pausa el carrusel cuando el mouse está sobre él
                }
            );
        })
        .catch((error) => console.error("Error:", error));

    // Cargar el footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            // Insertar el contenido del footer en el div con id="footer"
            document.getElementById("footer").innerHTML = data;
            
            // Agregar el contenido de texto al footer
            var footerText = document.createElement("div");
            footerText.className = "footer-text";
            footerText.innerHTML = "WhatsApp +56 9 8879 9766   Facebook    Instagram   Direccion: Moneda 627, Santiago";
            document.getElementById("footer").appendChild(footerText);
        })
        .catch(error => {
            console.error("Error al cargar el footer:", error);
        });

    // Mostrar u ocultar el footer según la posición del scroll
    window.addEventListener('scroll', function() {
        var footer = document.getElementById('footer');
        var scrollPosition = window.scrollY;
        var windowHeight = window.innerHeight;
        var fullHeight = document.body.scrollHeight;

        if (scrollPosition + windowHeight >= fullHeight) {
            footer.classList.remove('footer-hide');
            footer.classList.add('footer-show');
        } else {
            footer.classList.remove('footer-show');
            footer.classList.add('footer-hide');
        }
    });
});
