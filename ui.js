function updateHeaderCounts() {
  var cartEl = document.getElementById("cartCount");
  var favEl = document.getElementById("favCount");
  if (cartEl) cartEl.textContent = getCartCount();
  if (favEl) favEl.textContent = getFavorites().length;
}

function renderProductCard(p) {
  var inFav = isFavorite(p.id);
  var html = "";

  html += '<article class="card" data-id="' + p.id + '">';
  html += '<a href="product.html?id=' + p.id + '" class="card-link">';
  html += '<div class="card-img">';
  if (p.isNew) html += '<span class="card-badge">New</span>';
  html += '<img src="' + p.image + '" alt="' + p.name + '">';
  html += '</div>';
  html += '<h3 class="card-name">' + p.name + '</h3>';
  html += '<p class="card-price">' + formatPrice(p.price) + '</p>';
  html += '</a>';
  html += '<div class="card-actions">';
  html += '<button type="button" class="fav-btn' + (inFav ? " active" : "") + '" data-id="' + p.id + '" aria-label="В избранное">♥</button>';
  html += '<button type="button" class="add-btn" data-id="' + p.id + '">В корзину</button>';
  html += '</div>';
  html += '</article>';

  return html;
}

function bindProductGrid(grid) {
  if (!grid) return;

  grid.addEventListener("click", function (e) {
    var addBtn = e.target.closest(".add-btn");
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      addToCart(Number(addBtn.dataset.id));
      return;
    }

    var favBtn = e.target.closest(".fav-btn");
    if (favBtn) {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(Number(favBtn.dataset.id));
      document.dispatchEvent(new CustomEvent("lumi:rerender"));
    }
  });
}

function setActiveNav() {
  var page = document.body.dataset.page;
  if (!page) return;

  var links = document.querySelectorAll(".nav a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].dataset.nav === page) links[i].classList.add("active");
  }
}

function initHeader() {
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  document.addEventListener("lumi:cart", updateHeaderCounts);
  document.addEventListener("lumi:favorites", updateHeaderCounts);
  updateHeaderCounts();
  setActiveNav();
  initCartPanel();
}
