import { getWorks, getCategory, } from '../libs/api.js';
import { user, token } from '../libs/auth.js';
import { displayGallery } from "../views/index.js";

const body = document.querySelector("body");
/** Variables **/

const modalSection = document.getElementById("modal-section");
const modalGallery = document.querySelector(".modal-gallery");

/** Variables display second modal **/

const addPhotoBtn = document.querySelector(".add-button button");
const modalPortfolio = document.querySelector(".modal-portfolio");
const modalAdd = document.querySelector(".modal-add");

/** Variables for formular **/

const formAdd = document.querySelector("#form-add");
const titleInput = document.querySelector("#title");
const fileInput = document.querySelector("#file");
const imagePw = document.getElementById("image-pw");

export function initModal() {
  displayModalCategory();
  if (user) {
    displayModal();
    displayModalWork();
    closeGallery();
    displayModalAdd();
    returnPortfolio();
    addWork();
    imgPw();
    veriFication();
  }
}

/** Display if connected **/

function displayModal() {
  const modeEdition = document.querySelector(".div-edition span");
  modeEdition.addEventListener("click", () => {
    
    modalSection.style.display = "flex";
    modalPortfolio.style.display = "flex";
    modalAdd.style.display = "none";
  });
}
/** works request and recup in gallery **/

function displayModalWork() {
  modalGallery.innerHTML = "";
  getWorks().then((works) => {

    works.forEach((work) => {
      createWorkModal(work);
    });
    deleteWork();
  });
}

/** balise and data from fetchWorks **/

function createWorkModal(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const span = document.createElement("span")
  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash-can");
  trash.id = work.id;
  img.src = work.imageUrl;
  img.alt = work.title;
  span.appendChild(trash)
  figure.appendChild(img);
  figure.appendChild(span);
  modalGallery.appendChild(figure);
}

/** closing modals **/

function closeGallery() {


  const xMark = document.querySelector(".modal-portfolio span .fa-xmark");
  xMark.addEventListener("click", () => {
    modalSection.style.display = "none";
  });


  const xMark2 = document.querySelector(".modal-add span .fa-xmark");
  xMark2.addEventListener("click", () => {

    /** no preview **/

    fileInput.value = "";
    imagePw.style.display = "none";
    modalSection.style.display = "none";
  });

  /** closing grey modal **/

  body.addEventListener("click", (e) => {
    if (e.target == modalSection) {

      /** no preview **/

    fileInput.value = "";
    imagePw.style.display = "none";
    modalSection.style.display = "none";

    }
  });
}

/** DELETE method **/

/** config DELETE and token **/

const deleteWorkID = {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "same-origin",
};

/** delete with trashcan with update **/

function deleteWork() {
  const trashs = document.querySelectorAll(".fa-trash-can")


  trashs.forEach(trash => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      const workID = trash.id;


      fetch(`http://localhost:5678/api/works/${workID}`, deleteWorkID).then(
        () => {
          
          displayModalWork();
          displayGallery();
        }
      );
    });
  });
}

// display modalAdd by click **/

function displayModalAdd() {
  addPhotoBtn.addEventListener("click", () => {
    modalPortfolio.style.display = "none";
    modalAdd.style.display = "flex";
  });
}

/** return arrow **/

function returnPortfolio() {
  const arrowLeftModalWorks = document.querySelector(
    ".modal-add .fa-arrow-left"
  );
  arrowLeftModalWorks.addEventListener("click", () => {

    /** no preview **/

    fileInput.value = "";
    imagePw.style.display = "none";
    modalPortfolio.style.display = "flex";
    modalAdd.style.display = "none";
  });
}

/** add new work **/

function addWork() {
  formAdd.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formAdd);
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi du fichier");
        }
        return response.json();
      })
      .then((data) => {

        displayModalWork();
        displayGallery();
        formAdd.reset();
        modalPortfolio.style.display = "flex";
        modalAdd.style.display = "none";
        imagePw.style.display = "none";
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  });
}

/** creat category for add **/

async function displayModalCategory() {
  const select = document.querySelector("form select");
  const categorys = await getCategory();
  categorys.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  });
}

/** preview image **/

function imgPw() {
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePw.src = e.target.result;
        imagePw.style.display = "block";
      
      };
      reader.readAsDataURL(file);
    } else {
      imagePw.style.display = "none";
    }
  });
}

/** verification for input **/

function veriFication() {
  const buttonValidation = document.querySelector(
    ".button-add  button"
  );
  formAdd.addEventListener("input", () => {
    if (!titleInput.value == "" && !fileInput.files[0] == "") {
      buttonValidation.classList.remove("button-add-work");
      buttonValidation.classList.add("button-validation");
    } else {
      buttonValidation.classList.remove("button-validation");
      buttonValidation.classList.add("button-add-work");
    }
  });
}