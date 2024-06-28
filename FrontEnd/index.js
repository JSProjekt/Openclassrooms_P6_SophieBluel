/** Variables **/

const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");
const contentFilter = document.querySelector(".content-filter");

/** Variables connected **/

const token = window.sessionStorage.getItem("token");
const user = window.sessionStorage.getItem("userId");
const loginOut = document.getElementById("log-link");
const portFolio = document.querySelector("#portfolio");
const portFolioH2 = document.querySelector("#portfolio h2");
const userText = "Mode édition";
const userLogo = `<i class="fa-regular fa-pen-to-square"></i>`;
const userLogin = `<div class="mode-edition">
<p>${userLogo}${userText}</p>
</div>`;
const editDiv = document.createElement("div");
const editSpan = document.createElement("span");
const userLogout = `${userLogo}  ${userText} `;

/** tabler API **/

async function getWorks() {
  const requete = await fetch("http://localhost:5678/api/works");
  return requete.json();
}
async function getCategory() {
  const requete = await fetch("http://localhost:5678/api/categories");
  return requete.json();
}

async function main() {
  displayGallery();
  createButtons();
  loginUser();
  logoutUser();
}
main();

/* Display recup gallery*/

function displayGallery() {
  gallery.innerHTML = "";
  getWorks().then((data) => {
    data.forEach((work) => {
      createWork(work);
    });
  });
}

function createWork(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;
  img.src = work.imageUrl;
  img.alt = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

/** filter buttons **/

function createButtons() {
  getCategory().then((data) => {
    data.forEach((category) => {
      createButton(category);
    });
  });
}
function createButton(category) {
  const btn = document.createElement("button");
  btn.classList.add("buttons-filter");
  btn.textContent = category.name;
  btn.id = category.id;
  contentFilter.appendChild(btn);
}

/** connected **/

function loginUser() {
  if (user) {
    loginOut.textContent = "logout";
    document.body.insertAdjacentHTML("afterbegin", userLogin);
    editSpan.innerHTML = userLogout;
    editDiv.classList.add("div-edition");
    editDiv.appendChild(portFolioH2);
    editDiv.appendChild(editSpan);
    portFolio.prepend(editDiv);
    contentFilter.style = "display:none";
  } else {  }
}

/** desconnected **/

function logoutUser() {
  loginOut.addEventListener("click", () => {
    if (user) {
      window.sessionStorage.setItem("token", "");
      loginOut.textContent = "login";
      window.sessionStorage.setItem("userId", "");
      window.location.href = "index.html";
    } else {
      window.location.href = "login.html";
    }
  });
}