function CallApi() {
  this.fectchData = function () {
    var promise = axios({
      url: "https://6519a404818c4e98ac609bd3.mockapi.io/api/products",
      method: "GET",
    });
    return promise;
  };
  this.getProductByType = function (type) {
    var promise = axios({
      url: `https://6519a404818c4e98ac609bd3.mockapi.io/api/products/${type}`,
      method: "GET",
    });
    return promise;
  };
  this.getProductByID = function () {
    var promise = axios({
      url: "https://6519a404818c4e98ac609bd3.mockapi.io/api/products",
      method: "GET",
    });
    return promise;
  };
}
