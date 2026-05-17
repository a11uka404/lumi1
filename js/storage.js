var STORAGE_KEYS = {
  cart: "lumi_cart",
  favorites: "lumi_favorites"
};

function readJSON(key, fallback) {
  try {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCart() {
  return readJSON(STORAGE_KEYS.cart, []);
}

function setCart(cart) {
  writeJSON(STORAGE_KEYS.cart, cart);
  document.dispatchEvent(new CustomEvent("lumi:cart"));
}

function getFavorites() {
  return readJSON(STORAGE_KEYS.favorites, []);
}

function setFavorites(ids) {
  writeJSON(STORAGE_KEYS.favorites, ids);
  document.dispatchEvent(new CustomEvent("lumi:favorites"));
}

function isFavorite(id) {
  return getFavorites().indexOf(id) !== -1;
}

function toggleFavorite(id) {
  var ids = getFavorites();
  var i = ids.indexOf(id);
  if (i === -1) ids.push(id);
  else ids.splice(i, 1);
  setFavorites(ids);
  return ids.indexOf(id) !== -1;
}
