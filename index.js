// DOM ID
function domID(id) {
  return document.getElementById(id);
}

var api = new CallApi();
function getListProduct() {
  domID("loader").style.display = "block";

  var promise = api.fectchData();
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
// function getType() {
//   domID("loader").style.display = "block";
//   let type = domID("select").value;
//   console.log(type);
//   let promise = api.getProductByType("type");
//   promise
//     .then(function (result) {
//       domID("loader").style.display = "none";
//       renderUI(result.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
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
            <button onclick="addCart()" class="btn add_cart"> <i class="fa-solid fa-cart-plus"></i>
                </i> Add to Cart</button>
            <button onclick="buyNow()" class="btn btn-primary buy_now">Buy Now</button>
        </div>
    </div>
</div>
  `;
  }
  domID("listProduct").innerHTML = content;
}
// ADD PRODUCT TO CART
getListProduct();
let countProduct = 0;
domID("cartNumber").style.display = "none";
function addCart() {
  countProduct++;
  domID("cartNumber").style.display = "inline-block";
  domID("cartNumber").innerHTML = countProduct;
}
