function CallApi() {
  this.fectchData = function () {
    var promise = axios({
      url: "https://6519a404818c4e98ac609bd3.mockapi.io/api/products",
      method: "GET",
    });
    return promise;
  };

  this.getProductByID = function (product) {
    var promise = axios({
      url: `https://6519a404818c4e98ac609bd3.mockapi.io/api/products${product.id}`,
      method: "GET",
    });
    return promise;
  };
  this.deleteProduct = function (id) {
    var promise = axios({
      url: `https://6519a404818c4e98ac609bd3.mockapi.io/api/products/${id}`,
      method: "DETELE",
    });
    return promise;
  };
}
