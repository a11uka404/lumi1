function getCartCount() {
  var cart = getCart();
  var count = 0;
  for (var i = 0; i < cart.length; i++) count += cart[i].qty;
  return count;
}

function getCartTotal() {
  var cart = getCart();
  var total = 0;
  for (var i = 0; i < cart.length; i++) total += cart[i].price * cart[i].qty;
  return total;
}

function addToCart(id) {
  var product = getProductById(id);
  if (!product) return;

  var cart = getCart();
  var item = cart.find(function (c) { return c.id === id; });

  if (item) item.qty++;
  else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });

  setCart(cart);
}

function changeQty(id, delta) {
  var cart = getCart();
  var item = cart.find(function (c) { return c.id === id; });
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(function (c) { return c.id !== id; });

  setCart(cart);
}

function removeFromCart(id) {
  setCart(getCart().filter(function (c) { return c.id !== id; }));
}

function clearCart() {
  setCart([]);
}

function renderCartPanel() {
  var list = document.getElementById("cartList");
  var totalEl = document.getElementById("cartTotal");
  if (!list || !totalEl) return;

  var cart = getCart();

  if (cart.length === 0) {
    list.innerHTML = '<li class="empty">Корзина пуста</li>';
    totalEl.textContent = formatPrice(0);
    return;
  }

  var html = "";
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    html += '<li class="cart-item">';
    html += '<span class="cart-item-name">' + item.name + '</span>';
    html += '<div class="cart-item-actions">';
    html += '<button type="button" class="qty-btn" data-id="' + item.id + '" data-delta="-1" aria-label="Меньше">−</button>';
    html += '<span class="qty">' + item.qty + '</span>';
    html += '<button type="button" class="qty-btn" data-id="' + item.id + '" data-delta="1" aria-label="Больше">+</button>';
    html += '<button type="button" class="remove-btn" data-id="' + item.id + '" aria-label="Удалить">×</button>';
    html += '</div>';
    html += '<span class="cart-item-price">' + formatPrice(item.price * item.qty) + '</span>';
    html += '</li>';
  }

  list.innerHTML = html;
  totalEl.textContent = formatPrice(getCartTotal());
}

function initCartPanel() {
  var panel = document.getElementById("cartPanel");
  var overlay = document.getElementById("overlay");
  var cartBtn = document.getElementById("cartBtn");
  var closeBtn = document.getElementById("closeCart");
  var checkoutBtn = document.getElementById("checkoutBtn");
  var list = document.getElementById("cartList");

  function openCart() {
    if (panel) panel.classList.add("open");
    if (overlay) overlay.classList.add("open");
  }

  function closeCart() {
    if (panel) panel.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
  }

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  if (overlay) overlay.addEventListener("click", closeCart);

  if (list) {
    list.addEventListener("click", function (e) {
      var qtyBtn = e.target.closest(".qty-btn");
      if (qtyBtn) {
        changeQty(Number(qtyBtn.dataset.id), Number(qtyBtn.dataset.delta));
        return;
      }
      var removeBtn = e.target.closest(".remove-btn");
      if (removeBtn) removeFromCart(Number(removeBtn.dataset.id));
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      if (getCart().length === 0) return;
      alert("Заказ оформлен! Спасибо за покупку.");
      clearCart();
      closeCart();
    });
  }

  document.addEventListener("lumi:cart", renderCartPanel);
  renderCartPanel();
}
