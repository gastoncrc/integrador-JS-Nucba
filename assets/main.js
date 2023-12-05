// IMPORTO EL ARRAY DE PRODUCTOS DESDE OTRO ARCHIVO
import { products } from "./data.js";
import { appState } from "./data.js";

// TRAIGO LOS ELEMENOS DEL DOM

// PARA LAS CARDS-
const cardsContainer = document.querySelector(".cards-container");
const btnNextProducts = document.querySelector(".btn-next-products");

const categoriesList = document.querySelector(".categories-list");
const btnCart = document.querySelector(".btn-cart");
const cartToggle = document.querySelector(".cart-container");
const cartMenu = document.querySelector(".cart-products");
const counterBubble = document.querySelector(".counter-bubble");
const btnEmptyCart = document.querySelector(".btn-cart-delete");
const cartPrice = document.querySelector(".cart-price");
const btnBuy = document.querySelector(".btn-cart-buy");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
// -----------------------------------------------------------------CARDS-----------------------------------------------------
// -----------------------------------------ARRAY DE PRODUCTOS
// ------------------------------------------RENDERIZAR LA CARD
const renderCard = (product) => {
  const { id, nombre, precio, marca, imagen } = product;
  return `
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
              <button class="btn-add-cart" data-id=${id} data-nombre=${nombre} data-precio=${precio} data-imagen=${imagen} data-marca=${marca}>Agregar</button>
          </div>`;
};
//---------------------------------------- BUSCA CADA OBJETO DEL ARRAY DE PRODUCTOS
const createCards = (arrayProducts, agregar = false) => {
  if (agregar) {
    cardsContainer.innerHTML += arrayProducts.map(renderCard).join("");
    return;
  }
  cardsContainer.innerHTML = arrayProducts.map(renderCard).join("");
};

// MOSTRAR MAS PRODUCTOS----------------------------
const showNextCards = () => {
  appState.currentIndex += 1;
  // para sacar el boton al fin del array
  createCards(appState.products[appState.currentIndex], true);
  if (appState.currentIndex === appState.indexLimit - 1) {
    btnNextProducts.classList.add("hidden");
  }
};

// ---------------------------------------------------------------CATEGORIAS ------------------------------------------------------

// -------------------------------------------FILTRADO POR CATEGORIA
// FILTRAR POR CATEGORIAS
const handleCategories = ({ target }) => {
  const currentCategory = target.dataset.category.toLowerCase();
  appState.activeCategory = currentCategory;
  if (appState.activeCategory === "todos") {
    return createCards(appState.products[0]);
  }

  // CATEGORIA FILTRADA COINCIDENTE CON CON LA CATEGORIA SELECCIONADA-
  const productsFiltred = products.filter((product) =>
    product.categorias
      .map((category) => category.toLowerCase())
      .includes(appState.activeCategory)
  );

  createCards(productsFiltred);
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
  if (!e.target.classList.contains("btn-add-cart")) return;
  const product = e.target.dataset;

  if (isExistingCartProduct(product.id)) {
    addQuantity(product);
    createCart(cart);
    counterItemsCart();
    showTotal();
    return;
  }

  createPorductsCart(product);
  counterItemsCart();
  createCart(cart);
  showTotal();
};

const createPorductsCart = (product) => {
  cart = [...cart, { ...product, cantidad: 1 }];
};

// -------------------------------------------EXISTE EL PRODUCTO
const isExistingCartProduct = (idProduct) => {
  return cart.some((product) => product.id === idProduct);
};
// ---------------------------------------AGREGAR CANTIDAD AL PRODUCTO DEL CART
const addQuantity = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, cantidad: cartProduct.cantidad + 1 }
      : cartProduct
  );
};

// ---------------------------------------DESAGREGAR CANTIDAD AL PRODUCTO DEL CART
const downQuantity = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, cantidad: cartProduct.cantidad - 1 }
      : cartProduct
  );
};

const createCart = (arrayProducts) => {
  cartMenu.innerHTML = arrayProducts.map(renderCartProduct).join("");
  disableBtn(btnBuy);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ---------------------------------RENDERIZAR PROCUTOS EN CART
const renderCartProduct = (product) => {
  const { id, nombre, precio, marca, imagen, cantidad } = product;
  return `
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
                  <button class="btn-minus" data-cantidad=${cantidad} data-id=${id}>-</button>
                  <span>${cantidad}</span>
                  <button class="btn-plus" data-cantidad=${cantidad} data-id=${id}>+</button>
                </div>
                <p>subtotal</p>
              </div>
              <button class="fa fa-trash" data-cantidad=${cantidad} data-id=${id}>
              </button>
          </div>
                `;
};

// ---------------------------------------------------AGREGAR VALOR CON EL BOTON MAS-------------------------------------------
const btnPlus = ({ target }) => {
  if (!target.classList.contains("btn-plus")) return;
  addQuantity(target.dataset);
  counterItemsCart();
  showTotal();
  createCart(cart);
};

// ---------------------------------------------------DESAGREGAR VALOR CON EL BOTON MAS-------------------------------------------
const btnMinus = ({ target }) => {
  if (!target.classList.contains("btn-minus")) return;
  btnBlocked(target);
  downQuantity(target.dataset);
  counterItemsCart();
  showTotal();
  createCart(cart);
};

// ---------------------------------------------------- SACAR CUENTA -----------------------------------------------------
const showTotal = () => {
  cartPrice.textContent = cart.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
};

// ---------------------------------------------------------------BURBUJA CON VALOR---------------------------------------------------
const counterItemsCart = () => {
  counterBubble.textContent = cart.reduce(
    (acc, prod) => acc + prod.cantidad,
    0
  );
};

// -----------------------------------------------------------------VACIAR CARRITO----------------------------------------------------
// ----------------------------------------------VACIAR TODO EL CARRITO
const emptyCart = () => {
  cart = [];
  cart.cantidad = 0;
  showTotal();
  cartMenu.innerHTML = "";
  counterItemsCart();
  disableBtn(btnBuy);
};

// ---------------------------------------------VACIAR UN ITEM DEL CARRITO

const deleteProduct = (e) => {
  if (!e.target.classList.contains("fa-trash")) return;
  const product = e.target.dataset;

  const productFiltered = cart.filter(
    (productCart) => productCart.id !== product.id
  );
  cart = [...productFiltered];
  showTotal();
  createCart(cart);
  counterItemsCart();
};

// ----------------------------------VEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER --------------------------------------------------

// ---------------------------------------------FUNCION PARA NO DEJAR IR A NUMERO NEGATIVOS EN EL CARRITO -
const btnBlocked = (target) => {
  target.classList.add("blocked");
};

const disableBtn = (btn) => {
  if (cart.length < 1) {
    btn.classList.add("blocked");
  } else {
    btn.classList.remove("blocked");
  }
};

//------------------------------------------------------------------- INICIAR ----------------------------------------------------------
const init = () => {
  createCards(appState.products[0]);
  createCart(cart);
  btnNextProducts.addEventListener("click", showNextCards);

  // CLICK CATEGORIAS PARA FILTRAR
  categoriesList.addEventListener("click", handleCategories);

  // ABRIR Y CERRAR CART
  btnCart.addEventListener("click", togleCart);

  // ADD PRODUCTS TO CART --
  cardsContainer.addEventListener("click", addToCart);

  counterItemsCart(cart.cantidad);
  btnEmptyCart.addEventListener("click", emptyCart);

  cartMenu.addEventListener("click", deleteProduct);

  cartMenu.addEventListener("click", btnPlus);

  cartMenu.addEventListener("click", btnMinus);
  disableBtn(btnBuy);
};
init();
