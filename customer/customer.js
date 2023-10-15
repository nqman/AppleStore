// DOM ID

function domID(id) {
  return document.getElementById(id);
}

var api = new CallApi();
// RENDER CART
function renderCart(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
    <tr>
                            <td>
                                <img src="../asset/img/${product.image}">
                                <h6 class="mt-2">${product.name}</h6>
                            </td>
                            <td>
                                <div class="quantity d-flex align-items-center justify-content-center ">
                                    <button><i class="fa-solid fa-minus"></i></button>
                                    <p id="count" class="">8</p>
                                    <button><i class="fa-solid fa-plus"></i></button>
                                </div>
                            </td>
                            <td>
                                <div id="totalPrice" class="total"><b>$</b> ${product.price}</div>
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
function itemInCart() {
  domID("loaderCart").style.display = "block";
  var promise = api.fectchData();
  promise
    .then(function (result) {
      domID("loaderCart").style.display = "none";
      renderCart(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
itemInCart();
