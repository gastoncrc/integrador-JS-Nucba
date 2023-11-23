export const products = [
  {
    id: 1,
    nombre: "Chuck Taylor",
    precio: 500,
    marca: "Converse",
    categoria: ["Zapatillas", "Adultos", "Converse", "Mujeres", "Hombres"],
    imagen: "./assets/img/products/converse-id1.jpg",
    cantidad: 1,
  },

  {
    id: 2,
    nombre: "Go-To All Star Patch",
    precio: 1500,
    marca: "Converse",
    categoria: ["Remeras", "Converse", "Adultos", "Hombres", "Mujeres"],
    imagen: "./assets/img/products/converse-id2.jpg",
    cantidad: 1,
  },

  {
    id: 3,
    nombre: "Standard-Fit Fleece Sweatpants",
    precio: 1380,
    marca: "Converse",
    categoria: ["Pantalones", "Adultos", "Converse", "Hombres", "Mujeres"],
    imagen: "./assets/img/products/converse-id3.jpg",
    cantidad: 1,
  },

  {
    id: 4,
    nombre: "Chaqueta acolchada con bolsillo tipo parche",
    precio: 1000,
    marca: "Converse",
    categoria: ["Camperas", "Adultos", "Converse"],
    imagen: "./assets/img/products/converse-id4.jpg",
    cantidad: 1,
  },

  {
    id: 5,
    nombre: "Flannel Woven Top",
    precio: 600,
    marca: "Converse",
    categoria: ["Camisas", "Niños", "Converse"],
    imagen: "./assets/img/products/vans-id5.jpg",
    cantidad: 1,
  },
  {
    id: 6,
    nombre: "U OLD SKOOL",
    precio: 500,
    marca: "Vans",
    categoria: ["Zapatillas", "Adultos", "Vans"],
    imagen: "./assets/img/products/vans-id6.jpg",
    cantidad: 1,
  },

  {
    id: 7,
    nombre: "Remera Vans Classic",
    precio: 1500,
    marca: "Vans",
    categoria: ["Remeras", "Vans", "Adultos"],
    imagen: "./assets/img/products/vans-id7.jpg",
    cantidad: 1,
  },

  {
    id: 8,
    nombre: "Patch Standard-Fit Fleece Sweatpants",
    precio: 1380,
    marca: "Vans",
    categoria: ["Pantalones", "Adultos", "Vans"],
    imagen: "./assets/img/products/converse-id1.jpg",
    cantidad: 1,
  },

  {
    id: 9,
    nombre: "Chaqueta acolchada con bolsillo",
    precio: 1000,
    marca: "Vans",
    categoria: ["Camperas", "Adultos", "Vans"],
    imagen: "./assets/img/products/converse-id1.jpg",
    cantidad: 1,
  },

  {
    id: 10,
    nombre: "Flannel Woven Top",
    precio: 600,
    marca: "Vans",
    categoria: ["Camisas", "Niños", "Vans"],
    imagen: "./assets/img/products/converse-id1.jpg",
    cantidad: 1,
  },
];

// DIVIDÍ EL ARRAY EN PEQUEÑOS ARRAYS DE PRODUCTOS -------
const divideProductsInParts = (size) => {
  let arrayProducts = [];

  for (let i = 0; i < products.length; i += size) {
    arrayProducts.push(products.slice(i, i + size));
  }
  return arrayProducts;
};

export const appState = {
  products: divideProductsInParts(8),
  currentIndex: 0,
  indexLimit: divideProductsInParts(8).length,
  activeCategory: null,
};
// console.log(appState);

export const categories = [
  "Pantalones",
  "Zapatillas",
  "Remeras",
  "Camisas",
  "Adultos",
  "Niños",
  "Camperas",
  "Vans",
  "Converse",
  "Hombres",
  "Mujeres",
];
