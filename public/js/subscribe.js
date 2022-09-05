function setProductType() {
  sessionStorage.setItem("productType", productType);
}

// Pricing
const discoveryButton = document.querySelector(".discovery");
const experienceButton = document.querySelector(".experience");
const anniversaryButton = document.querySelector(".anniversary");
discoveryButton.addEventListener("click", (e) => {
  productType = "discovery";
  setProductType();
});
experienceButton.addEventListener("click", (e) => {
  productType = "experience";
  setProductType();
});
anniversaryButton.addEventListener("click", (e) => {
  productType = "anniversary";
  setProductType();
});
