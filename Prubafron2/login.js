const loginForm       = document.getElementById("loginForm");
const registerForm    = document.getElementById("registerForm");
const loginMessage    = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

let users = JSON.parse(localStorage.getItem("users")) || [];

const hermandades = [
  "Luz Eterna", "Sombras del Vacío", "Alas del Norte",
  "Legión de la Tormenta", "Furia de Dragón", "Vigilantes del Alba",
  "Eco del Destino", "Guardianes del Núcleo"
];

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarAtributosPorClase(clase) {
  switch (clase) {
    case "Guerrero":
    case "Paladín":
      return {
        fuerza: aleatorio(80, 100),
        agilidad: aleatorio(30, 60),
        inteligencia: aleatorio(20, 50),
        vitalidad: aleatorio(70, 100)
      };
    case "Mago":
    case "Nigromante":
    case "Sacerdote":
      return {
        fuerza: aleatorio(10, 40),
        agilidad: aleatorio(30, 50),
        inteligencia: aleatorio(80, 100),
        vitalidad: aleatorio(40, 70)
      };
    case "Cazador":
    case "Pícaro":
    case "Druida":
      return {
        fuerza: aleatorio(30, 60),
        agilidad: aleatorio(80, 100),
        inteligencia: aleatorio(40, 70),
        vitalidad: aleatorio(50, 80)
      };
    default:
      return {
        fuerza: aleatorio(50, 70),
        agilidad: aleatorio(50, 70),
        inteligencia: aleatorio(50, 70),
        vitalidad: aleatorio(50, 70)
      };
  }
}

function horaActual() {
  const ahora = new Date();
  return ahora.toLocaleTimeString();
}

// Registro
registerForm.addEventListener("submit", e => {
  e.preventDefault();
  const u     = document.getElementById("registerUser").value.trim();
  const p     = document.getElementById("registerPass").value.trim();
  const cName = document.getElementById("registerCharName").value.trim();
  const realm = document.getElementById("registerRealm").value;
  const race  = document.getElementById("registerRace").value;
  const cls   = document.getElementById("registerClass").value;

  if (users.some(x => x.username === u)) {
    registerMessage.style.color = "#f66";
    registerMessage.textContent = "⚠️ Usuario ya existe.";
    return;
  }

  const guild = hermandades[Math.floor(Math.random() * hermandades.length)];
  const atributos = generarAtributosPorClase(cls);

  users.push({ username: u, password: p, characterName: cName, realm, race, charClass: cls, guild, atributos });
  localStorage.setItem("users", JSON.stringify(users));

  registerMessage.style.color = "#8f8";
  registerMessage.textContent = "✅ Registro exitoso. Ya puedes iniciar sesión.";
  registerForm.reset();
});

// Login
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const u = document.getElementById("loginUser").value.trim();
  const p = document.getElementById("loginPass").value.trim();
  const user = users.find(x => x.username === u && x.password === p);

  if (!user) {
    loginMessage.style.color = "#f66";
    loginMessage.textContent = "❌ Usuario o contraseña incorrectos.";
    return;
  }

  user.lastLogin = horaActual();
  localStorage.setItem("loggedUser", JSON.stringify(user));
  window.location.href = "profile.html";
});