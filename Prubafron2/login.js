const loginForm       = document.getElementById("loginForm");
const registerForm    = document.getElementById("registerForm");
const loginMessage    = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

let users = JSON.parse(localStorage.getItem("users")) || [];

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
  users.push({ username: u, password: p, characterName: cName, realm, race, charClass: cls });
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
  localStorage.setItem("loggedUser", JSON.stringify(user));
  window.location.href = "profile.html";
});