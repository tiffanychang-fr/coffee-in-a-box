// DOM of Recap.hbs
// Get products details elements
const monthQtyInput = document.querySelector(".qty");
const prodTypeEl = document.querySelector(".prodTitle h3");
let productType = sessionStorage.getItem("productType");
const calculTextEl = document.querySelector(".calculText");
const prodTotalEl = document.querySelector(".prodTotal p");
// Get subtotal, shipping and total elements
const subTotalEl = document.querySelector(".subtotal-value");
const shippingEl = document.querySelector(".shipping-value");
const totalEl = document.querySelector(".total-value");

// Checkout - Show Monthly Price
function showMonthlyPrice() {
  const monthlyProd = "Monthly subscription - 11.90 €";
  prodTypeEl.innerText = `${monthlyProd}`;

  const monthlyCalculText = "Month(s) x €11.90";
  calculTextEl.innerHTML = `${monthlyCalculText}`;
}

// Checkout - Show Annual Price
function showAnnualPrice() {
  const annualProd = "Annual subscription - 122.90 €";
  prodTypeEl.innerText = `${annualProd}`;

  const annualCalculText = "Year(s) x €122.90";
  calculTextEl.innerHTML = `${annualCalculText}`;
}

// Check if user clicked subscribe monthly or annual subscription
function checkProductType() {
  console.log(productType);
  if (productType === "annual") {
    monthQtyInput.placeholder = "1";
    prodTotalEl.innerText = "€122.90";
    subTotalEl.innerText = "€122.90";
    shippingEl.innerText = "€0.00";
    totalEl.innerText = "€122.90";
    showAnnualPrice();
  } else {
    monthQtyInput.placeholder = "3";
    prodTotalEl.innerText = "€35.70";
    subTotalEl.innerText = "€35.70";
    shippingEl.innerText = "€0.00";
    totalEl.innerText = "€35.70";
    showMonthlyPrice();
  }
}

// Calculate checkout total amount
function calculateTotal(e) {
  const monthQty = e.target.value;

  let price;
  productType === "annual" ? (price = 122.9) : (price = 11.9);

  const shipping = 0;

  let prodTotal = (price * monthQty).toFixed(2);
  prodTotalEl.innerText = `€${prodTotal}`;
  subTotalEl.innerText = `€${prodTotal}`;
  shippingEl.innerText = `€${shipping.toFixed(2)}`;
  totalEl.innerText = `€${(
    parseFloat(prodTotal) + parseFloat(shipping)
  ).toFixed(2)}`;
}

// Shopping Cart Events
monthQtyInput.addEventListener("input", (e) => calculateTotal(e));

checkProductType();
