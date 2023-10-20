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
      let totalPriceItem = quantity * itemInCart.price;
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
                              <td >
                                <i class="fa-solid fa-dollar-sign"></i>
                                  <div id="totalPrice_${id}" class="totalPriceItem d-inline">${totalPriceItem}</div>
                              </td>
                              <td>
                              <button class="btn btn-warning" onclick = deleteProduct(${itemInCart.id}) >Delete</button>
                              </td>
                          </tr>
    `;
    }
  }

  domID("itemInCart").innerHTML = content;
  renderPriceAll();
}
// CHANGE QUANTITY
function decrement(id) {
  if (productQuantities[id] <= 1) {
    if (confirm(`"Do you want to delete this product?"`) == true) {
      productQuantities[id] = 0;
      renderCart(listItemInCart);
      deleteProduct(id);
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
  // renderPriceAll(id);

  countProduct--;
  domID("cartNumber").innerHTML = countProduct;
  if (countProduct == 0) {
    domID("cartNumber").style.display = "none";
  }
  let productId = id;
  for (let i = 0; i < listItemInCart.length; i++) {
    let itemInCart = listItemInCart[i][0]; // Lấy sản phẩm từ mảng con
    if (itemInCart.id == productId) {
      // Tìm thấy sản phẩm có id tương ứng
      listItemInCart.splice(i, 1);
      productQuantities[id] = 0;
      renderCart(listItemInCart);
      console.log(itemInCart.id); // In ra sản phẩm
      // Đây bạn có thể trích xuất các giá trị cụ thể của itemInCart bằng cách sử dụng itemInCart.property (ví dụ: itemInCart.price)
      break; // Đã tìm thấy sản phẩm, có thể dừng vòng lặp
    }
  }
}

// PURCHASE PRODUCT
domID("purchase").onclick = function () {
  listItemInCart = [];
  renderCart(listItemInCart);
  countProduct = 0;
  domID("cartNumber").style.display = "none";
};

function renderPriceAll() {
  let elements = document.querySelectorAll(".totalPriceItem");
  // console.log(elements);
  let totalPriceAll = 0;
  for (let i = 0; i < elements.length; i++) {
    totalPriceAll += parseInt(elements[i].textContent);
  }
  // console.log(totalPriceAll);
  domID("totalPriceAll").textContent = totalPriceAll;
}
