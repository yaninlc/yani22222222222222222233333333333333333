// Archivo unificado: script.js

// === Página de Inicio (Login) ===
if (window.location.pathname.includes("index.html")) {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "1234") {
            document.getElementById("login-message").innerText = "Inicio de sesión exitoso.";
            sendEmail(username);
            setTimeout(() => {
                window.location.href = "pagina2.html";
            }, 1000);
        } else {
            document.getElementById("login-message").innerText = "Usuario o contraseña incorrectos.";
        }
    });

    function sendEmail(user) {
        console.log(`Correo enviado: El usuario ${user} ingresó.`);
        // Simulación: Aquí puedes integrar una API real como SendGrid o Nodemailer.
    }
}

// === Página Principal (3 APIs) ===
if (window.location.pathname.includes("pagina2.html")) {
    document.getElementById("fetch-email").addEventListener("click", () => {
        document.getElementById("api-result").innerText = "Simulando datos de la API de correo...";
        // Simula una API o conecta con un servicio real como SendGrid.
    });

    document.getElementById("fetch-images").addEventListener("click", () => {
        fetch("https://api.unsplash.com/photos/random?client_id=YOUR_ACCESS_KEY")
            .then(response => response.json())
            .then(data => {
                const img = document.createElement("img");
                img.src = data.urls.small;
                img.alt = "Imagen aleatoria de Unsplash";
                document.getElementById("api-result").innerHTML = "";
                document.getElementById("api-result").appendChild(img);
            })
            .catch(error => {
                console.error("Error al obtener la imagen:", error);
                document.getElementById("api-result").innerText = "Error al cargar la imagen.";
            });
    });

    document.getElementById("fetch-optional").addEventListener("click", () => {
        document.getElementById("api-result").innerText = "Mostrando información de API opcional...";
        // Ejemplo: Conexión a OpenWeather, datos de un lugar, etc.
    });
}

// === Página con Formulario ===
if (window.location.pathname.includes("formulario.html")) {
    document.getElementById("formulario").addEventListener("submit", function (event) {
        event.preventDefault();
        const empleado = document.getElementById("empleado").value;
        const sueldo = document.getElementById("sueldo").value;
        const observaciones = document.getElementById("observaciones").value;

        alert(`Formulario enviado:\nEmpleado: ${empleado}\nSueldo: ${sueldo}\nObservaciones: ${observaciones}`);
        console.log("Formulario enviado correctamente.");

        // Simula el envío del formulario por correo:
        console.log("Simulando envío de correo...");
        // Aquí puedes usar una API de correo real.
    });

    document.getElementById("formulario").addEventListener("reset", function () {
        alert("Formulario limpiado.");
    });

    // Tabla de operaciones
    document.querySelectorAll("table button").forEach(button => {
        button.addEventListener("click", function () {
            alert("Ingresa valores para realizar el cálculo.");
        });
    });
}

// === Función para calcular salario con descuento ===
function calcularSalario() {
    const salario = parseFloat(prompt("Ingrese el salario:"));
    const descuento = parseFloat(prompt("Ingrese el porcentaje de descuento (0-100):"));

    if (isNaN(salario) || isNaN(descuento) || salario < 0 || descuento < 0 || descuento > 100) {
        alert("Por favor, ingrese valores válidos.");
        return;
    }

    const salarioConDescuento = salario - (salario * (descuento / 100));
    alert(`El salario con un descuento del ${descuento}% es: $${salarioConDescuento.toFixed(2)}`);
}

// === Función para calcular el total de puntos ingresados ===
function calcularPuntos() {
    const puntos1 = parseFloat(prompt("Ingrese el primer puntaje:"));
    const puntos2 = parseFloat(prompt("Ingrese el segundo puntaje:"));
    const puntos3 = parseFloat(prompt("Ingrese el tercer puntaje:"));

    if (isNaN(puntos1) || isNaN(puntos2) || isNaN(puntos3)) {
        alert("Por favor, ingrese valores válidos para los puntajes.");
        return;
    }

    const totalPuntos = puntos1 + puntos2 + puntos3;
    alert(`El total de los puntos ingresados es: ${totalPuntos}`);
}

// === Función para calcular el 15% de un puntaje ingresado ===
function calcularPorcentaje() {
    const puntaje = parseFloat(prompt("Ingrese un puntaje:"));

    if (isNaN(puntaje)) {
        alert("Por favor, ingrese un valor válido para el puntaje.");
        return;
    }

    const porcentaje = puntaje * 0.15;
    alert(`El 15% del puntaje ingresado (${puntaje}) es: ${porcentaje.toFixed(2)}`);
}

function sendPersonalForm(event) {
    event.preventDefault(); // Evita que se recargue la página

    // Captura los datos del formulario
    const nombreEmpleado = document.getElementById("empleado").value;
    const sueldo = document.getElementById("sueldo").value;
    const observaciones = document.getElementById("observaciones").value;
    const datetime = new Date().toLocaleString();

    // Parámetros para el correo
    const params = {
        From_Name: "Formulario de Empleados",
        datetime: datetime,
        to_email: "victorraul20002015@gmail.com", // Correo destinatario
        From_Mail: "no-reply@sistema.com", // Dirección genérica de envío
        message: `
            Nombre del Empleado: ${nombreEmpleado}
            Sueldo: ${sueldo}
            Observaciones: ${observaciones}
        `,
    };

    // Envío del correo con EmailJS
    emailjs.send("service_3b29alp", "template_a8a29b5", params).then(
        () => {
            alert("Formulario enviado exitosamente.");
            document.getElementById("empleadoForm").reset(); // Limpia el formulario
        },
        (error) => {
            alert("Error al enviar el formulario: " + JSON.stringify(error));
            console.error("Error al enviar el correo:", error);
        }
    );
}

function sendEmail(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Captura los valores del formulario
    const to_email = document.getElementById("to_email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const datetime = new Date().toLocaleString();

    // Parámetros para el correo
    const params = {
        From_Name: "Sistema Web", // Nombre genérico para identificar el sistema
        datetime: datetime,
        to_email: to_email, // Correo ingresado por el usuario
        From_Mail: subject, // Dirección genérica de envío
        message: message,
    };

    // Enviar el correo usando EmailJS
    emailjs.send("service_3b29alp", "template_a8a29b5", params).then(
        () => {
            alert("Correo enviado exitosamente.");
            document.getElementById("emailForm").reset(); // Limpia el formulario
        },
        (error) => {
            alert("Error al enviar el correo: " + JSON.stringify(error));
            console.error("Error al enviar el correo:", error);
        }
    );
}

// Función para consumir la API de imágenes y mostrar el contenido
// Función para consumir la API de Unsplash
// Tu clave de acceso de Unsplash
const accessKey = "lDgw5d2DLwAAXO7sYU6WWWQDh1f-s576DNh69sdZNk8";

// Función para obtener imágenes desde Unsplash
function fetchImagesFromUnsplash() {
    fetch(`https://api.unsplash.com/photos?client_id=${accessKey}&per_page=12`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener imágenes: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const gallery = document.getElementById("gallery");
            gallery.innerHTML = ""; // Limpia el contenido previo

            // Itera sobre las imágenes y crea elementos HTML para mostrarlas
            data.forEach(image => {
                const imgElement = document.createElement("img");
                imgElement.src = image.urls.small; // URL de la imagen en tamaño pequeño
                imgElement.alt = image.alt_description || "Imagen de Unsplash";
                gallery.appendChild(imgElement);
            });
        })
        .catch(error => {
            console.error("Error al consumir la API de Unsplash:", error);
            document.getElementById("gallery").innerHTML = `
                <p>Error al cargar las imágenes. Por favor, intenta de nuevo más tarde.</p>
            `;
        });
}

// Llama a la función cuando la página cargue
if (window.location.pathname.includes("imagenes.html")) {
    fetchImagesFromUnsplash();
}

function cargarCotizaciones(url) {
    const cotizacionesContainer = document.getElementById('cotizaciones-container');
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        cotizacionesContainer.innerHTML = '';  // Limpiamos el contenedor
  
        // Iteramos sobre las fechas (por ejemplo, "2022-03-23")
        Object.keys(data).forEach(fecha => {
          const fechaCotizacion = data[fecha];
          
          // Creamos un elemento para la fecha
          const fechaElement = document.createElement('h3');
          fechaElement.textContent = `Cotizaciones del ${fecha}`;
          cotizacionesContainer.appendChild(fechaElement);
          
          // Iteramos sobre las monedas dentro de la fecha (por ejemplo, "usd", "brl")
          Object.keys(fechaCotizacion).forEach(moneda => {
            const valorMoneda = fechaCotizacion[moneda];
            
            // Crear un div para cada cotización
            const cotizacionElement = document.createElement('div');
            cotizacionElement.classList.add('cotizacion');
  
            // Crear el contenido para mostrar la moneda, compra y venta
            const monedaElement = document.createElement('p');
            monedaElement.textContent = `${moneda.toUpperCase()}: Compra - ${valorMoneda.purchase}, Venta - ${valorMoneda.sale}`;
  
            // Agregamos el contenido al contenedor
            cotizacionElement.appendChild(monedaElement);
            cotizacionesContainer.appendChild(cotizacionElement);
          });
        });
      })
      .catch(error => {
        console.error('Error:', error);
        cotizacionesContainer.textContent = 'Error al cargar las cotizaciones.';
      });
  }
  
  // Llamamos a la función con la URL de las cotizaciones
  cargarCotizaciones('https://cdn.jsdelivr.net/gh/sistemasaguila/cotizaciones-set@main/data/latest.json');