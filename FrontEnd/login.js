/** Variables **/

const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginOut = document.getElementById("log-link");

/** recovery psw / userid **/

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMail = email.value;
  const userPwd = password.value;
  const login = {
    email: userMail,
    password: userPwd,
  };
  const user = JSON.stringify(login);

  /** request **/

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: user,
  })
    // recovery api
    .then((response) => {
      if (!response.ok) {
        email.style.border = "2px solid #FF0000";
        password.style.border = "2px solid #FF0000";
        const errorLogin = document.querySelector("p");
        errorLogin.textContent =
          "Mot de passe et/ou identifiant fourni incorrect.";
        throw new Error("Mot de passe et/ou identifiant fourni incorrect.");
      }
      return response.json();
    })
    .then((data) => {
      const userId = data.userId;
      const userToken = data.token;
      window.sessionStorage.setItem("token", userToken);
      window.sessionStorage.setItem("userId", userId);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Une erreur est survenue : ", error);
    });
});