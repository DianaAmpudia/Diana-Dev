/*----------- BACKGROUND -----------*/
let max = 90;

let container = document.querySelector(".bubbles");

for (let i = 0; i < max; i++) {
  let bubble = document.createElement("span");

  let size = 4 + 12 * Math.random();
  let position_x = 100 * Math.random();
  let position_y = 100 * Math.random();
  let visibility = 0.2 + Math.random();
  let anime_duration = 4 + 4 * Math.random();
  let anime_delay = 4 * Math.random();
  let distance = 16 + 24 * Math.random();

  bubble.style.setProperty("--size", size + "px");
  bubble.style.setProperty("--position-x", position_x + "%");
  bubble.style.setProperty("--position-y", position_y + "%");
  bubble.style.setProperty("--visibility", visibility);
  bubble.style.setProperty("--anime-duration", anime_duration + "s");
  bubble.style.setProperty("--anime-delay", anime_delay + "s");
  bubble.style.setProperty("--distance", distance + "px");

  container.append(bubble);
}

document.querySelector(".scroll-down").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(this.getAttribute("href")).scrollIntoView({
    behavior: "smooth",
  });
});

/*----------- PROYECTOS -----------*/

const projects = [
  {
    title: "Aleph Art",
    description:
      "Aleph Art es una red social desarrollada para conectar artistas de diversas disciplinas, permitiéndoles compartir su arte y establecer conexiones significativas. El proyecto se divide en dos áreas principales: una sección pública que incluye páginas de inicio, información del equipo, contacto y opciones de registro, y una sección privada que requiere autenticación donde los usuarios pueden acceder a un muro de publicaciones, gestionar su perfil y participar en eventos. La aplicación fue construida utilizando JavaScript, HTML, CSS y Bootstrap para el frontend, mientras que el backend se implementó con Java y Spring Boot, creando una API RESTful respaldada por una base de datos en MySQL.",
    image: "assets/aleph-art-profile.png",
    link: "https://github.com/DianaAmpudia/AlephArtDiana",
  },
  {
    title: "Space App",
    description:
      "Space App es un pequeño sitio web desarrollado con React y Material UI (MUI). La aplicación realiza consultas a dos APIs distintas: una que proporciona información en tiempo real sobre los astronautas actualmente en el espacio, incluyendo sus nombres y las naves espaciales en las que se encuentran, y la API APOD de la NASA, que muestra la imagen astronómica del día.",
    image: "assets/space-app.png",
    link: "https://github.com/DianaAmpudia/React-space-app",
  },
  {
    title: "Pokedata",
    description:
      "Pokedata es un sitio web interactivo construido con JavaScript, HTML y CSS que se integra con la PokeAPI para ofrecer a los usuarios una experiencia completa de búsqueda y exploración de Pokémon. La aplicación no solo permite a los usuarios buscar y visualizar información detallada sobre diferentes Pokémon, sino que también implementa funcionalidad de Local Storage para mantener la persistencia de datos, asegurando que la información del último Pokémon buscado se mantenga disponible incluso después de recargar la página.",
    image: "assets/pokemon.png",
    link: "https://github.com/DianaAmpudia/JS-07-Fetch-REST-API",
  },
  {
    title: "Encriptador",
    description:
      "Es un sitio web que permite a los usuarios cifrar y descifrar mensajes de texto. Desarrollada siguiendo fielmente un diseño propuesto en Figma, la aplicación combina HTML, CSS y JavaScript para crear una experiencia de usuario intuitiva y visualmente atractiva. El proceso de desarrollo fue gestionado eficientemente utilizando Trello para coordinar y dar seguimiento a las diferentes tareas del proyecto.",
    image: "assets/encriptador.png",
    link: "https://github.com/DianaAmpudia/Challenge01-Encriptador",
  },
  {
    title: "Burger Queen",
    description:
      "Burger Queen es una Single Page Application (SPA) diseñada para optimizar la gestión de restaurantes. Desarrollada con React, la aplicación permite administrar empleados, productos y pedidos de manera eficiente. El proyecto se destaca por su uso de componentes reutilizables para optimizar el rendimiento y su gestión efectiva a través de Github Projects, lo que permitió alcanzar los objetivos del proyecto dentro de los plazos establecidos.",
    image: "assets/burger-queen.png",
    link: "https://github.com/DianaAmpudia/Burger-Queen-API-client",
  },
  {
    title: "ComuniApp",
    description:
      "ComuniApp es una red social especialmente diseñada para crear una comunidad de apoyo para personas migrantes en México. La aplicación se destaca por su diseño responsivo que optimiza la experiencia en dispositivos móviles y su implementación de Firebase para el almacenamiento y recuperación eficiente de datos. Este enfoque técnico no solo mejoró el rendimiento y la confiabilidad de la aplicación, sino que también creó una plataforma más accesible y útil para su audiencia objetivo.",
    image: "assets/comuniapp.png",
    link: "https://github.com/DianaAmpudia/CDMX013-social-network",
  },
];

// Cards de proyectos
function createProjectCard(project, index) {
  return `
        <div class="col-md-4 mb-4">
            <div class="card project-card h-100">
                <img src="${project.image}" class="card-img-top" alt="${
    project.title
  }">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description.substring(
                      0,
                      100
                    )}...</p>
                    <button class="btn btn-primary" onclick="openProjectModal(${index})">Ver Detalles</button>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("projectGallery");
  projects.forEach((project, index) => {
    gallery.innerHTML += createProjectCard(project, index);
  });

  // Navbar
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      document.querySelector(".navbar").classList.add("scrolled");
    } else {
      document.querySelector(".navbar").classList.remove("scrolled");
    }
  });
});

// Modal de proyecto
function openProjectModal(index) {
  const project = projects[index];
  const modal = document.getElementById("projectModal");
  modal.querySelector(".modal-title").textContent = project.title;
  modal.querySelector(".modal-body img").src = project.image;
  modal.querySelector(".modal-body img").alt = project.title;
  modal.querySelector(".project-description").textContent = project.description;
  modal.querySelector(".project-link").href = project.link;

  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
}

/*-----------  FORMULARIO DE CONTACTO -----------*/

let config = {};

async function loadConfig() {
  try {
    const response = await fetch('/api/config'); 
    config = await response.json();
    console.log('Configuración cargada:', config);
    

    emailjs.init(config.EMAIL_PUBLIC_KEY);
    

    setupFormSubmission();
  } catch (error) {
    console.error('Error al cargar la configuración:', error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo cargar la configuración. Por favor, recarga la página.",
    });
  }
}


function setupFormSubmission() {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      Swal.fire({
        title: "Enviando...",
        text: "Por favor, espere",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      emailjs.sendForm(config.EMAIL_SERVICE_ID, config.EMAIL_TEMPLATE_ID, this).then(
        function () {
          console.log("SUCCESS!");
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Mensaje enviado con éxito",
          });
          document.getElementById("contact-form").reset();
        },
        function (error) {
          console.log("FAILED...", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al enviar el mensaje. Por favor, intenta de nuevo.",
          });
        }
      );
    });
}


loadConfig();