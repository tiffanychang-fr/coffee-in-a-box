// Show Monthly or Annual Price in Checkout Page
// const prodTypeEl = document.querySelector(".prodTitle h3");
// let productType = sessionStorage.getItem("productType");

// function checkProductType() {
//   console.log(productType);
//   if (productType === "annual") {
//     showAnnualPrice();
//   } else {
//     showMonthlyPrice();
//   }
// }

// function showMonthlyPrice() {
//   let monthlyProd = "Monthly subscription - 11.90 €";
//   prodTypeEl.innerText = `${monthlyProd}`;
// }

// function showAnnualPrice() {
//   let annualProd = "Annual subscription - 122.90 €";
//   prodTypeEl.innerText = `${annualProd}`;
// }

// Calculate checkout total amount
function calculateTotal(e) {
  const monthQty = e.target.value;
  const prodTotalEl = document.querySelector(".prodTotal p");
  const subTotalEl = document.querySelector(".subtotal-value");
  const shippingEl = document.querySelector(".shipping-value");
  const totalEl = document.querySelector(".total-value");

  const price = 11.9;
  const shipping = 0;

  let prodTotal = (price * monthQty).toFixed(2);
  prodTotalEl.innerText = `€${prodTotal}`;
  subTotalEl.innerText = `€${prodTotal}`;
  shippingEl.innerText = `€${shipping.toFixed(2)}`;
  totalEl.innerText = `€${(
    parseFloat(prodTotal) + parseFloat(shipping)
  ).toFixed(2)}`;
}

// Shopping Cart
const monthQtyInput = document.querySelector(".qty");
monthQtyInput.addEventListener("input", (e) => calculateTotal(e));

// checkProductType();
