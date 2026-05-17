function initFavoritesPage() {
  initHeader();

  var grid = document.getElementById("productGrid");
  var empty = document.getElementById("favoritesEmpty");
  bindProductGrid(grid);

  function render() {
    if (!grid) return;

    var ids = getFavorites();
    var list = PRODUCTS.filter(function (p) { return ids.indexOf(p.id) !== -1; });

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

  document.addEventListener("lumi:rerender", render);
  document.addEventListener("lumi:favorites", render);
  render();
}
