var productContainer;

if (localStorage.getItem("products") != null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayData();
} else {
  productContainer = [];
}

var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var searchProductInput = document.getElementById("searchProduct").value;

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };

  productContainer.push(product);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayData();
  // clearForm();
}

function clearForm() {
  (productNameInput.value = ""),
    (productPriceInput.value = ""),
    (productCategoryInput.value = ""),
    (productDescInput.value = "");
}

function displayData() {
  var container = ``;
  for (var i = 0; i < productContainer.length; i++) {
    container += `<tr>
    <td>${i}</td>
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].desc}</td>
    <td><button onClick="getProduct(${i})" class="btn btn-outline-info">Update</button></td>
    <td><button onClick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
  </tr>`;
  }
  document.getElementById("tableBody").innerHTML = container;
}

function deleteProduct(index) {
  productContainer.splice(index);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayData();
}

function searchProduct(searchProductInput) {
  var container = ``;
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name
        .toLowerCase()
        .includes(searchProductInput.toLowerCase())
    ) {
      container += `<tr>
      <td>${i}</td>
      <td>${productContainer[i].name}</td>
      <td>${productContainer[i].price}</td>
      <td>${productContainer[i].category}</td>
      <td>${productContainer[i].desc}</td>
      <td><button class="btn btn-outline-info">Update</button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
    </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = container;
}

function getProduct(index) {
  var item = productContainer[index]
  productNameInput.value = item.name;
  productPriceInput.value = item.price;
  productCategoryInput.value = item.category;
  productDescInput.value = item.desc;

  document.getElementById("mainBtn").innerHTML = "Update Product";
  document.getElementById("mainBtn").onclick  = function() {updateProduct(index)} ;
}

function updateProduct(index) {
  var item = productContainer[index]
  item.name = productNameInput.value;
  item.price = productPriceInput.value;
  item.category = productCategoryInput.value;
  item.desc = productDescInput.value;
  
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayData();
}