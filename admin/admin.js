// DOM ID
function domID(id) {
  return document.getElementById(id);
}
let api = new CallApi();
function getListProduct() {
  let promise = api.fectchData();
  promise
    .then(function (result) {
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function renderUI(data) {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    let product = data[i];
    content += `
    <tr>
    <td>${i + 1}</td>
    <td>${product.type}</td>
    <td>${product.name}</td>
    <td>
    <img width = "50" src ="../asset/img/${product.image}" />
    </td>
    <td>${product.price}</td>
    <td>
    <button class= "btn btn-warning mr-2" data-toggle="modal" data-target="#myModal" onclick="editProduct(
        ${product.id})"> Edit </button>
    <button class= "btn btn-danger" onclick="deleteProduct(
        ${product.id})"> Delete </button>
    </td>
    </tr>
        `;
  }
  domID("listProductAdmin").innerHTML = content;
}
getListProduct();

// DELETE PRODUCT
function deleteProduct(id) {
  let promise = api.deleteProduct(id);
  promise
    .then(function (result) {
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}
// EDIT PRODUCT
function editProduct(id) {
  console.log(id);
}
