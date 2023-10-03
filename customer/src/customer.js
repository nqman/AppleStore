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
            <button id="addCart" class="btn"> <i class="fa-solid fa-cart-plus"></i>
                </i> Add to Cart</button>
            <button id="buyNow" class="btn btn-primary">Buy Now</button>
        </div>
    </div>
</div>
  `;
  }
  domID("listProduct").innerHTML = content;
}
getListProduct();

// FILTER
function selectFilter() {
  var seclectIndex = domID("select").selectedIndex;
  var type = "All";
  switch (seclectIndex) {
    case 1:
      type = "phone";
      break;
    case 2:
      type = "laptop";
      break;
    case 3:
      type = "tablet";
      break;
    case 4:
      type = "watch";
      break;
  }
  console.log(type);
  return type;
}
domID("filter").onclick = function (type) {
  var seclectIndex = selectFilter();
  if (seclectIndex === "phone") {
    var elements = document.querySelectorAll(".phone");
    console.log(elements);
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }
};
