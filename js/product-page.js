function initProductPage() {
  initHeader();

  var id = Number(new URLSearchParams(location.search).get("id"));
  var product = getProductById(id);
  var root = document.getElementById("productDetail");

  if (!product || !root) {
    location.href = "catalog.html";
    return;
  }

  document.title = product.name + " — LUMI";

  var inFav = isFavorite(product.id);

  root.innerHTML =
    '<div class="product-gallery">' +
      '<img src="' + product.image + '" alt="' + product.name + '">' +
    '</div>' +
    '<div class="product-info">' +
      '<p class="eyebrow">' + (product.isNew ? "New" : "Коллекция") + '</p>' +
      '<h1>' + product.name + '</h1>' +
      '<p class="product-price">' + formatPrice(product.price) + '</p>' +
      '<p class="product-desc">' + product.description + '</p>' +
      '<div class="product-actions">' +
        '<button type="button" class="btn-primary" id="addToCartBtn">В корзину</button>' +
        '<button type="button" class="fav-btn large' + (inFav ? " active" : "") + '" id="productFavBtn">♥ В избранное</button>' +
      '</div>' +
    '</div>';

  document.getElementById("addToCartBtn").addEventListener("click", function () {
    addToCart(product.id);
  });

  document.getElementById("productFavBtn").addEventListener("click", function () {
    toggleFavorite(product.id);
    document.getElementById("productFavBtn").classList.toggle("active", isFavorite(product.id));
  });
}
