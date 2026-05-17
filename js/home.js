function initHome() {
  initHeader();

  var grid = document.getElementById("productGrid");
  if (!grid) return;

  var featured = PRODUCTS.filter(function (p) { return p.isNew; });
  if (featured.length === 0) featured = PRODUCTS.slice(0, 4);

  function render() {
    var html = "";
    for (var i = 0; i < featured.length; i++) html += renderProductCard(featured[i]);
    grid.innerHTML = html;
  }

  bindProductGrid(grid);
  document.addEventListener("lumi:rerender", render);
  document.addEventListener("lumi:favorites", render);
  render();
}
