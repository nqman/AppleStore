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
            <button onclick="addCart(${product.id})" id="" class="btn add_cart"> <i class="fa-solid fa-cart-plus"></i>
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
domID("cartNumber").style.display = "none";
let countProduct = 0;
let listItemInCart = [];
let idExist = [];
let productQuantities = {};
// let countID = 1;
function addCart(id) {
  let productId = id;
  console.log(productId);
  let promise = api.fectchData();
  promise
    .then(function (result) {
      let data = result.data;
      let item = data.filter((value) => value.id == productId);
      let checkRepeat = false;
      for (let i = 0; i < idExist.length; i++) {
        if (productId === idExist[i]) {
          checkRepeat = true;
          break;
        }
      }
      if (!checkRepeat) {
        listItemInCart.push(item);
        idExist.push(productId);
        countProduct++;
        domID("cartNumber").style.display = "inline-block";
        domID("cartNumber").innerHTML = countProduct;
        productQuantities[id] = 1;
      } else {
        productQuantities[id]++;
      }
      renderCart(listItemInCart);
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
      const id = itemInCart.id;
      const quantity = productQuantities[id];
      const totalPrice = quantity * itemInCart.price;

      content += `
      <tr>
                              <td>
                                  <img src="../asset/img/${itemInCart.image}">
                                  <h6 class="mt-2">${itemInCart.name}</h6>
                              </td>
                              <td>
                                  <div  class="quantity d-flex align-items-center justify-content-center ">
                    <button onclick = decrement(${itemInCart.id})>-</button>
                                      <span class="count_${id} p-2">${quantity}</span>
                    <button onclick = increment(${itemInCart.id})>+</button>
                                  </div>
                              </td>
                              <td>
                                  <div id="totalPrice_${id}" class="total"><b>$</b> ${totalPrice}</div>
                              </td>
                              <td>
                              <button class="btn btn-warning" onclick = deleteProduct(${itemInCart.id}) >Delete</button>
                              </td>
                          </tr>
    `;
    }
  }
  domID("itemInCart").innerHTML = content;
}
// CHANGE QUANTITY
function decrement(id) {
  if (productQuantities[id] <= 1) {
    if (confirm(`"Do you want to delete this product?"`) == true) {
      productQuantities[id] = 0;
      renderCart(listItemInCart);
      // document.querySelector(`#decrease_${id}`).disabled = true;
      return;
    }
    productQuantities[id] = 1;
    renderCart(listItemInCart);
  } else {
    productQuantities[id]--;
    renderCart(listItemInCart);
  }
}
function increment(id) {
  productQuantities[id]++;
  renderCart(listItemInCart);
}

// DELETE PRODUCT
function deleteProduct(id) {
  let productId = id;
  console.log(productId);
  console.log(listItemInCart);
  for (let i = 0; i < listItemInCart.length; i++) {
    let itemInCart = listItemInCart[i];
    console.log(itemInCart[i]);
  }

  // console.log(listItemInCart);

  if (itemInCart == productId) {
    // Xóa sản phẩm khỏi danh sách
    listItemInCart.splice(productId, 1);

    // Cập nhật số lượng sản phẩm và render lại giỏ hàng
    productQuantities[id] = 0;
    renderCart(listItemInCart);
  }
}
