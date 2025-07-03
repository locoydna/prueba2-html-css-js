// Cargar usuario
const usuario = JSON.parse(localStorage.getItem("loggedUser"));
if (!usuario) {
  window.location.href = "index.html";
} else {
  document.getElementById("tituloJugador").textContent = `${usuario.characterName} – ${usuario.realm}`;
  document.getElementById("charClass").textContent = usuario.charClass;
  document.getElementById("realm").textContent = usuario.realm;
  document.getElementById("guild").textContent = usuario.guild || "Sin hermandad";
  document.getElementById("lastLogin").textContent = usuario.lastLogin || "Sin registro";

  // Inyectar atributos en #statsExtras
  const statsContainer = document.getElementById("statsExtras");
  statsContainer.innerHTML = `
    <p>Fuerza: ${usuario.atributos.fuerza}</p>
    <p>Vitalidad: ${usuario.atributos.vitalidad}</p>
    <p>Agilidad: ${usuario.atributos.agilidad}</p>
    <p>Inteligencia: ${usuario.atributos.inteligencia}</p>
    <p>Tiempo Jugado: ${aleatorio(50, 200)}h</p>
  `;
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  slideImg.classList.add("fade-out");

  setTimeout(() => {
    slideImg.src = encodeURI(slides[idx]);
    slideImg.classList.remove("fade-out");
  }, 500);
}
showSlide(0);
setInterval(() => {
  showSlide(idx + 1);
}, 4000);