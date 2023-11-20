// IMPORTO EL ARRAY DE PRODUCTOS DESDE OTRO ARCHIVO
import { products } from "./data.js";
import { categories } from "./data.js";

// TRAIGO LOS ELEMENOS DEL DOM
const cardsContainer = document.querySelector(".cards-container");
const categoriesList = document.querySelector(".categories-list");
const btnCart = document.querySelector(".btn-cart");
const cartToggle = document.querySelector(".cart-container");
const cartMenu = document.querySelector(".cart-products");
const counterBubble = document.querySelector(".counter-bubble");
const btnEmptyCart = document.querySelector(".btn-cart-delete");
const cartProduct = document.querySelector(".cart-product");

let cart = [];
// -----------------------------------------------------------------CARDS-----------------------------------------------------
// -----------------------------------------ARRAY DE PRODUCTOS
//---------------------------------------- BUSCA CADA OBJETO DEL ARRAY DE PRODUCTOS
const createCards = (array) => {
  array.map(renderCard);
};

// ------------------------------------------RENDERIZAR LA CARD
const renderCard = (product) => {
  const { id, nombre, precio, marca, imagen } = product;
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
              <h3>"$ ${precio}"</h3>
              </div>
              <button class="btn-add-cart" data-id=${id}>Agregar</button>
          </div>`;
};
// ---------------------------------------------------------------CATEGORIAS ------------------------------------------------------
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
// ----------------------------------------------------------------------CART--------------------------------------------------------
// ---------------------------------TOGGLE CART
const togleCart = () => {
  if (cartToggle.classList.contains("togle-close-cart")) {
    cartToggle.classList.remove("togle-close-cart");
  } else {
    cartToggle.classList.add("togle-close-cart");
  }
};

// --------------------------------AGREGAR AL CARRITO
const addToCart = (e) => {
  const idProduct = Number(e.target.dataset.id);
  const cardSelected = () => {
    return products.find((product) => product.id === idProduct);
  };
  const cartProduct = cardSelected();
  if (isExistingCartProduct(idProduct)) {
    addQuantity(cartProduct);
  } else {
    cart.push(cartProduct);
  }
  cartMenu.innerHTML = "";

  createPorductsCart(cart);
  counterItemsCart(cart);
};

const createPorductsCart = (cart) => {
  cart.map(renderCartProduct);
};

// -------------------------------------------EXISTE EL PRODUCTO
const isExistingCartProduct = (idProduct) => {
  return cart.some((product) => product.id === idProduct);
};
// ---------------------------------------AGREGAR CANTIDAD AL PRODUCTO DEL CART
const addQuantity = (cartProduct) => {
  cartProduct.cantidad++;
};

// ---------------------------------RENDERIZAR PROCUTOS EN CART
const renderCartProduct = (product) => {
  const { id, nombre, precio, marca, imagen, cantidad } = product;
  cartMenu.innerHTML += `
          <div class="cart-product">
             <div class="cart-product-content">
                <div class="img-cart-container">
                  <img
                  src=${imagen}
                    class="cart-img"
                    />
                </div>
                <div class="info-cart-container">
                  <h3>${nombre}</h3>
                  <span>${marca}</span>
                  <p>${precio}</p>
                </div>
              </div>
              <div class="total-product-container">
                <div class="plus-minus-container">
                  <span>-</span>
                  <span>${cantidad}</span>
                  <span>+</span>
                </div>
                <p>subtotal</p>
              </div>
              <button class="fa fa-trash" data-cantidad="${cantidad}" data-id="${id}">
              </button>
          </div>
                `;
};

// ---------------------------------------------------------------BURBUJA CON VALOR---------------------------------------------------
const counterItemsCart = (cart) => {
  const lenghtCart = cart.length;
  counterBubble.textContent = lenghtCart;
};

// -----------------------------------------------------------------VACIAR CARRITO----------------------------------------------------
// ----------------------------------------------VACIAR TODO EL CARRITO
const emptyCart = () => {
  cart = [];
  cartMenu.innerHTML = "";
  counterItemsCart(cart);
};

// ---------------------------------------------VACIAR UN ITEM DEL CARRITO

const deleteProduct = (e) => {
  const idProductCart = Number(e.target.dataset.id);
  const quantityProduct = Number(e.target.dataset.cantidad);

  // VER------------------------------------
  // console.log(quantityCart);
  const quantityRgfhget = cart.filter(
    (product) => product.cantidad === quantityProduct
  );

  // VER -------------------------------------

  const productFiltered = cart.filter(
    (product) => product.id !== idProductCart
  );
  cartMenu.innerHTML = "";
  cart = [...productFiltered];
  createPorductsCart(cart);
  counterItemsCart(cart);
};

//------------------------------------------------------------------- INICIAR ----------------------------------------------------------
const init = () => {
  createCategories();
  createCards(products);

  const categoriesListArray = [...categoriesList.children];
  categoriesListArray.map((btn) =>
    btn.addEventListener("click", handleCategory)
  );
  btnCart.addEventListener("click", togleCart);

  const cardsArray = [...cardsContainer.children];
  cardsArray.map((card) =>
    card.childNodes[5].addEventListener("click", addToCart)
  );
  counterItemsCart(cart);
  btnEmptyCart.addEventListener("click", emptyCart);

  cartMenu.addEventListener("click", deleteProduct);
};
init();
// REVISAR
// cartMenu.addEventListener("click", (event) => {
//   if (event.target.classList.contains("fa-trash")) {
//     deleteProduct(event);
//   }
// });
// const deleteProductArray = [...cartMenu.children];
// console.log(deleteProductArray);
// deleteProductArray.map((product) =>
//   product.childNodes[2].addEventListener("click", deleteProduct)
// );
// console.log(cartMenu.childNodes[3]);
// console.log(deleteProductArray);
// console.log(cartMenu.children);
