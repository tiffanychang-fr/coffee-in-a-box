// DOM of Recap.hbs
// Get products details elements
const durationInput = document.querySelector(".qty");
const prodTypeEl = document.querySelector(".prodTitle h3");
const prodTypeInputEl = document.querySelector(".prodTitleInput");
let productType = sessionStorage.getItem("productType");
const calculTextEl = document.querySelector(".calculText");
const prodTotalEl = document.querySelector(".prodTotal p");
// Get subtotal, shipping and total elements
const subTotalEl = document.querySelector(".subtotal-value");
const shippingEl = document.querySelector(".shipping-value");
const totalEl = document.querySelector(".total-value");

// Checkout - Show Discovery Offer
function showDiscoveryPrice() {
  const discoveryProd = "Discovery forfait";
  prodTypeEl.innerText = `${discoveryProd}`;
  prodTypeInputEl.value = `${discoveryProd}`;

  const monthlyCalculText = "Month(s) x €15.90";
  calculTextEl.innerHTML = `${monthlyCalculText}`;
}

// Checkout - Show Experience Offer
function showExperiencePrice() {
  const quarterlyProd = "Experience forfait";
  prodTypeEl.innerText = `${quarterlyProd}`;
  prodTypeInputEl.value = `${quarterlyProd}`;

  const quarterlyCalculText = "Quarter(s) x €41.70";
  calculTextEl.innerHTML = `${quarterlyCalculText}`;
}

// Checkout - Show Anniversary Offer
function showAnnivPrice() {
  const annualProd = "Anniversary forfait";
  prodTypeEl.innerText = `${annualProd}`;
  prodTypeInputEl.value = `${annualProd}`;

  const annualCalculText = "Year(s) x €142.80";
  calculTextEl.innerHTML = `${annualCalculText}`;
}

// Check if user clicked subscribe monthly or annual subscription
function checkProductType() {
  // console.log(productType);
  if (productType === "anniversary") {
    durationInput.placeholder = "1";
    prodTotalEl.innerText = "€142.80";
    subTotalEl.innerText = "€142.80";
    shippingEl.innerText = "€0.00";
    totalEl.innerText = "€142.80";
    showAnnivPrice();
  } else if (productType === "experience") {
    durationInput.placeholder = "1";
    prodTotalEl.innerText = "€41.70";
    subTotalEl.innerText = "€41.70";
    shippingEl.innerText = "€0.00";
    totalEl.innerText = "€41.70";
    showExperiencePrice();
  } else {
    durationInput.placeholder = "1";
    prodTotalEl.innerText = "€15.90";
    subTotalEl.innerText = "€15.90";
    shippingEl.innerText = "€0.00";
    totalEl.innerText = "€15.90";
    showDiscoveryPrice();
  }
}

// Calculate checkout total amount
function calculateTotal(e) {
  const durationInput = e.target.value;
  // productType === "annual"
  //   ? sessionStorage.setItem("duration", durationInput * 12)
  //   : sessionStorage.setItem("duration", durationInput);

  let price;
  // productType === "anniversary" ? (price = 122.9) : (price = 11.9);
  if (productType === "anniversary") {
    price = 142.8;
  } else if (productType === "experience") {
    price = 41.7;
  } else {
    price = 15.9;
  }

  const shipping = 0;

  let prodTotal = (price * durationInput).toFixed(2);
  prodTotalEl.innerText = `€${prodTotal}`;
  subTotalEl.innerText = `€${prodTotal}`;
  shippingEl.innerText = `€${shipping.toFixed(2)}`;
  totalEl.innerText = `€${(
    parseFloat(prodTotal) + parseFloat(shipping)
  ).toFixed(2)}`;
}

// Shopping Cart Events
durationInput.addEventListener("input", (e) => calculateTotal(e));

checkProductType();
