// Cargar usuario
const usuario = JSON.parse(localStorage.getItem("loggedUser"));
if (!usuario) {
  window.location.href = "index.html";
} else {
  document.getElementById("tituloJugador").textContent =
    `${usuario.characterName} – ${usuario.realm}`;
  document.getElementById("charClass").textContent  = usuario.charClass;
  document.getElementById("realm").textContent      = usuario.realm;
}

// Toggle estadísticas
function toggleStats() {
  const stats = document.getElementById("statsExtras");
  stats.style.display = stats.style.display === "block" ? "none" : "block";
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("loggedUser");
  window.location.href = "index.html";
}

// Slider
const slides = [
  'imagenes/arte_wow.png',
  'imagenes/Animated_GIF.png',
  'imagenes/cazador_bestia.png',
  'imagenes/cazador_bestia_2.png',
  'imagenes/colina2.0.png',
  'imagenes/enano_caballero.png'
];
let idx = 0;
const slideImg = document.getElementById("slide");
document.getElementById("prev").onclick = () => showSlide(idx - 1);
document.getElementById("next").onclick = () => showSlide(idx + 1);

function showSlide(i) {
  idx = (i + slides.length) % slides.length;

  // Aplica clase para fade-out
  slideImg.classList.add("fade-out");

  // Espera a que se desvanezca antes de cambiar la imagen
  setTimeout(() => {
    slideImg.src = encodeURI(slides[idx]);

    // Remueve fade-out y restaura visibilidad con nueva imagen
    slideImg.classList.remove("fade-out");
  }, 500); // Debe coincidir con transition del CSS
}
showSlide(0);
setInterval(() => {
  showSlide(idx + 1); // Avanza al siguiente slide cada 4 segundos
}, 4000);
