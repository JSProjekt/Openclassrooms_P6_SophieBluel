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

export async function getWorks() {
  const requete = await fetch("http://localhost:5678/api/works");
  return requete.json();
}
export async function getCategory() {
  const requete = await fetch("http://localhost:5678/api/categories");
  return requete.json();
}

/** connected **/

export function loginUser() {
  if (user) {
    loginOut.textContent = "logout";
    if (!document.querySelector(".mode-edition")) {
      // L'élément n'existe pas, procéder à l'insertion
      document.body.insertAdjacentHTML("afterbegin", userLogin
  );}

    editSpan.innerHTML = userLogout;
    editDiv.classList.add("div-edition");
    editDiv.appendChild(portFolioH2);
    editDiv.appendChild(editSpan);
    portFolio.prepend(editDiv);
    contentFilter.style = "display:none";
  } else {  }
}

async function main() {
  window.works=await getWorks()
  displayGallery();
  createButtons();
  loginUser();
  logoutUser();
  displayCategory();
}
main();

/* Display recup gallery*/

function displayGallery() {
  gallery.innerHTML = "";
  getWorks().then((data) => {
    data.forEach((work) => {
      createWorkElement(work);
    });
  });
}

function createWorkElement(work) {
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
    createButton(
      {id:0, name:"Tout"}
    );
    data.forEach((category) => {
      createButton(category);
    });
  });
}

function selectButton(id) {
  const buttons = document.querySelectorAll(".content-filter button");

  buttons.forEach((btn) => {
   
    if(id==btn.id) {
      btn.classList.add("selected");
    }
    else {
      btn.classList.remove("selected");
    }
  });
  
}

function createButton(category) {
  const btn = document.createElement("button");
  btn.classList.add("buttons-filter");
  btn.addEventListener("click", (e) => {
    const btnId = e.target.id;
    selectButton(btnId)
console.log(btnId)
    gallery.innerHTML = "";
    window.works.forEach((work) => {
      if (btnId == work.categoryId) {
        createWorkElement(work);
      }
      if (btnId == "0") {
        createWorkElement(work);
      }
    });
  });
  btn.textContent = category.name;
  btn.id = category.id;
  contentFilter.appendChild(btn);
}

async function displayCategory() {
  // const works = await getWorks();
  const buttons = document.querySelectorAll(".content-filter button");
  buttons.forEach((button) => {
    
  });
}


/** desconnected **/

