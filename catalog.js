var currentFilter = "all";
var currentQuery = "";

function getFilteredProducts() {
  var q = currentQuery.trim().toLowerCase();

  return PRODUCTS.filter(function (p) {
    var matchCategory = currentFilter === "all" || p.category === currentFilter;
    var matchSearch = !q || p.name.toLowerCase().indexOf(q) !== -1;
    return matchCategory && matchSearch;
  });
}

function renderCatalog() {
  var grid = document.getElementById("productGrid");
  var empty = document.getElementById("catalogEmpty");
  if (!grid) return;

  var list = getFilteredProducts();

  if (list.length === 0) {
    grid.innerHTML = "";
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;

  var html = "";
  for (var i = 0; i < list.length; i++) html += renderProductCard(list[i]);
  grid.innerHTML = html;
}

function initCatalog() {
  initHeader();

  var grid = document.getElementById("productGrid");
  bindProductGrid(grid);

  var search = document.getElementById("searchInput");
  if (search) {
    search.addEventListener("input", function () {
      currentQuery = search.value;
      renderCatalog();
    });
  }

  var filters = document.getElementById("filters");
  if (filters) {
    filters.addEventListener("click", function (e) {
      if (!e.target.classList.contains("filter")) return;

      var buttons = filters.querySelectorAll(".filter");
      for (var i = 0; i < buttons.length; i++) buttons[i].classList.remove("active");

      e.target.classList.add("active");
      currentFilter = e.target.dataset.filter;
      renderCatalog();
    });
  }

  document.addEventListener("lumi:rerender", renderCatalog);
  document.addEventListener("lumi:favorites", renderCatalog);
  renderCatalog();
}
