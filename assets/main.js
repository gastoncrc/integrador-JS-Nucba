// IMPORTO EL ARRAY DE PRODUCTOS DESDE OTRO ARCHIVO
import { products } from "./data.js";
import { categories } from "./data.js";

// TRAIGO LOS ELEMENOS DEL DOM
const cardsContainer = document.querySelector(".cards-container");
const categoriesList = document.querySelector(".categories-list");

// -----------------------------------------ARRAY DE PRODUCTOS
// BUSCA CADA OBJETO DEL ARRAY DE PRODUCTOS
const createCards = (array) => {
  array.map(renderCard);
};

// RENDERIZAR LA CARD
const renderCard = (product) => {
  const { nombre, precio, marca, imagen } = product;
  cardsContainer.innerHTML += `
        <div class="card">
            <img
              src=${imagen}
              alt="foto-producto"
              class="img-card"
            />
            <div class="card-info-container">
              <h2 class="card-title">${nombre}</h2>
              <p>${marca}</p>
              <div class="card-button">
                <h3>"$ ${precio}"</h3>
                <div class="btn-card">
                  <a href=".cart.html">Agregar</a>
                </div>
              </div>
            </div>
          </div>`;
};

// -------------------------------------------ARRAY DE CATEGORIAS
// RECORRE EL ARRAY DE CATEGORIAS
const createCategories = () => {
  categories.map(renderCategories);
};

// const createCategories = () => {
//   categories.map((category) => renderCategories(category));
// };

// RENDERIZAR LA CATEGORIAS
const renderCategories = (category) => {
  categoriesList.innerHTML += `
  <button class="btn-category">${category}</button>`;
};

// -------------------------------------------FILTRADO POR CATEGORIA
// FILTRAR POR CATEGORIAS

const filterCategories = (category) => {
  return products.filter((product) => product.categoria.includes(category));
};

const handleCategory = (e) => {
  const textBtn = e.target.textContent;
  const categorySelected = filterCategories(textBtn);
  cardsContainer.innerHTML = "";
  createCards(categorySelected);
};

//---------------------------------------------- INICIAR
const init = () => {
  createCategories();
  createCards(products);
  const htmlToArray = [...categoriesList.children];
  htmlToArray.map((btn) => btn.addEventListener("click", handleCategory));
};
init();

// console.log(htmlToArray);
