export const user = window.sessionStorage.getItem("userId");
export const token = window.sessionStorage.getItem("token");

import { contentFilter } from "../index.js";

const loginOut = document.getElementById("log-link");
const userText = "Mode édition";
const userLogo = `<i class="fa-regular fa-pen-to-square"></i>`;
const userLogin = `<div class="mode-edition">
<p>${userLogo}${userText}</p>
</div>`;
const userLogout = `${userLogo}  ${userText} `;
const portFolio = document.querySelector("#portfolio");
const portFolioH2 = document.querySelector("#portfolio h2");
const editDiv = document.createElement("div");
const editSpan = document.createElement("span");

export function loginUser() {
  if (user) {
    loginOut.textContent = "logout";
    if (!document.querySelector(".mode-edition")) {
      document.body.insertAdjacentHTML("afterbegin", userLogin);
    }
    editSpan.innerHTML = userLogout;
    editDiv.classList.add("div-edition");
    editDiv.appendChild(portFolioH2);
    editDiv.appendChild(editSpan);
    portFolio.prepend(editDiv);
    contentFilter.style = "display:none";
  } else {  }
}

export function logoutUser() {
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