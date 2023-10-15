// DOM ID
function domID(id) {
  return document.getElementById(id);
}

var api = new CallApi();
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
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
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
function addCart(button) {
  countProduct++;
  domID("cartNumber").style.display = "inline-block";
  domID("cartNumber").innerHTML = countProduct;
  let productId = button.getAttribute("data-id");
  console.log("productId", productId);
  let promise = api.fectchData();
  promise
    .then(function (result) {
      let data = result.data;
      console.log(data);
      const item = data.filter((value) => value.id === productId);
      listItemInCart.push(item);
      console.log(listItemInCart);
      renderCart(listItemInCart);
    })
    .catch(function (error) {
      console.log(error);
    });
}
//===================================

// RENDER CART
function renderCart(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var listItemInCart = data[i];
    content += `
    <tr>
                            <td>
                                <img src="../asset/img/${listItemInCart.image}">
                                <h6 class="mt-2">${listItemInCart.name}</h6>
                            </td>
                            <td>
                                <div class="quantity d-flex align-items-center justify-content-center ">
                                    <button><i class="fa-solid fa-minus"></i></button>
                                    <p id="count" class="">8</p>
                                    <button><i class="fa-solid fa-plus"></i></button>
                                </div>
                            </td>
                            <td>
                                <div id="totalPrice" class="total"><b>$</b> ${listItemInCart.price}</div>
                            </td>
                            <td>
                                <button class="button-62" role="button" id="deleteItem"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4" />
                                    </svg></button>
                            </td>
                        </tr>
  `;
  }
  domID("itemInCart").innerHTML = content;
}
// CART
// function itemInCart() {
//   var promise = api.fectchData();
//   promise
//     .then(function (result) {
//       renderCart(result.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
// itemInCart();
