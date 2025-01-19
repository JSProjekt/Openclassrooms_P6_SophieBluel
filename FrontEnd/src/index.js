// index.js
import { getWorks, getCategory } from '../src/services/api.js';

/** Variables **/

const gallery = document.querySelector(".gallery");
export const contentFilter = document.querySelector(".content-filter");



export async function main() {
    window.works=await getWorks()
    displayGallery();
    createButtons();
  }

/* Display recup gallery*/

export function displayGallery() {
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
      selectButton(0);
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
  
  
