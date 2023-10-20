// DOM ID
function domID(id) {
  return document.getElementById(id);
}

let api = new CallApi();
function getListProduct() {
  domID("loader").style.display = "block";

  let promise = api.fectchData();
  promise
    .then(function (result) {
      domID("loader").style.display = "none";
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
// ONCHANGE
function filter() {
  let typeSelect = domID("select").value;
  console.log(typeSelect);
  let promise = api.fectchData();
  promise
    .then(function (result) {
      domID("loader").style.display = "none";

      let data = result.data;
      console.log(data);
      const typeProduct = data.filter((value) => value.type === typeSelect);
      if (typeSelect === "all") {
        renderUI(data);
        return;
      }
      data = typeProduct;
      console.log(data);
      renderUI(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// REDER
function renderUI(data) {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    let product = data[i];
    content += `
    <div class="${product.type} product_item col-lg-4 col-md-6 col-sm-12">
    <div class="product_card p-4">
        <div class="item_top d-flex justify-content-between">
            <h4>${product.name}</h4>
            <p>$${product.price}</p>
        </div>
        <div class="item_midle d-flex justify-content-center">
            <img src="./asset/img/${product.image}">
        </div>
        <div class="item_bottom d-flex justify-content-between align-items-center">
            <button onclick="addCart(this)" data-id="${product.id}" class="btn add_cart"> <i class="fa-solid fa-cart-plus"></i>
                </i> Add to Cart</button>
            <button onclick="buyNow()" class="btn btn-primary buy_now">Buy Now</button>
        </div>
    </div>
</div>
  `;
  }
  domID("listProduct").innerHTML = content;
}
getListProduct();

// ADD PRODUCT TO CART
let countProduct = 0;
domID("cartNumber").style.display = "none";
let listItemInCart = [];
let idExist = [];
let quantityID = [];
function addCart(button) {
  let productId = button.getAttribute("data-id");
  quantityID.push(productId);
  console.log(quantityID);
  let promise = api.fectchData();
  promise
    .then(function (result) {
      let data = result.data;
      // console.log(data);
      let item = data.filter((value) => value.id === productId);
      if (idExist.length === 0) {
        listItemInCart.push(item);
        renderCart(listItemInCart);
        idExist.push(productId);
        console.log(idExist);
        countProduct++;
        domID("cartNumber").style.display = "inline-block";
        domID("cartNumber").innerHTML = countProduct;
        return;
      }
      let checkRepeat = false;
      for (let i = 0; i < idExist.length; i++) {
        if (productId === idExist[i]) {
          checkRepeat = true;
          break;
        }
      }
      if (!checkRepeat) {
        listItemInCart.push(item);
        renderCart(listItemInCart);
        console.log(listItemInCart);
        idExist.push(productId);
        // console.log(idExist);
        countProduct++;
      } else {
        // nếu trùng thì tăng số lượng lên
      }

      domID("cartNumber").innerHTML = countProduct;
    })
    .catch(function (error) {
      console.log(error);
    });
}
//===================================

// RENDER CART
function renderCart(data) {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    let listItemInCart = data[i];
    for (let i = 0; i < listItemInCart.length; i++) {
      let itemInCart = listItemInCart[i];
      content += `
      <tr>
                              <td>
                                  <img src="../asset/img/${itemInCart.image}">
                                  <h6 class="mt-2">${itemInCart.name}</h6>
                              </td>
                              <td>
                                  <div  class="quantity d-flex align-items-center justify-content-center ">
                    <button onclick = decrement(${itemInCart.id})>-</button>
                                      <span class="count_${itemInCart.id} p-2">1</span>
                    <button onclick = increment(${itemInCart.id})>+</button>
                                  </div>
                              </td>
                              <td>
                                  <div id="totalPrice" class="total"><b>$</b> ${itemInCart.price}</div>
                              </td>
                              <td>
                                  <button  class="btn btn-warning" id="deleteItem">Delete</button>
                              </td>
                          </tr>
    `;
    }
  }
  domID("itemInCart").innerHTML = content;
}
// CHANGE QUANTITY
// Get the elements
// let productQuantities = {};

// function decrement(id) {
//   if (productQuantities[id] === undefined || productQuantities[id] <= 1) {
//     alert("Are you sure you want to quit this product?");
//     document.querySelector(`.count_0${id}`).innerHTML = "";
//     return;
//   }
//   productQuantities[id]--;
//   document.querySelector(`.count_0${id}`).innerHTML = productQuantities[id];
// }
// function increment(id) {
//   if (productQuantities[id] === undefined) {
//     productQuantities[id] = 1;
//   } else {
//     productQuantities[id]++;
//   }

//   document.querySelector(`.count_0${id}`).innerHTML = productQuantities[id];
// }
