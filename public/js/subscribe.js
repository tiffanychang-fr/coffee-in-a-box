function setProductType() {
  sessionStorage.setItem("productType", productType);
}

// Pricing
const monthlyButton = document.querySelector(".monthly-price");
const annualButton = document.querySelector(".annual-price");
monthlyButton.addEventListener("click", (e) => {
  productType = "monthly";
  setProductType();
});
annualButton.addEventListener("click", (e) => {
  productType = "annual";
  setProductType();
});
