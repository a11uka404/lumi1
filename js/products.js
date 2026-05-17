var PRODUCTS = [
  { id: 1, name: "Шерстяное пальто", price: 18900, category: "outerwear", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80", isNew: true, description: "Двубортное пальто из мериносовой шерсти. Прямой крой, подкладка из хлопка." },
  { id: 2, name: "Льняная рубашка", price: 4900, category: "tops", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2b?w=600&q=80", description: "Рубашка из европейского льна. Мягкая отделка, классический воротник." },
  { id: 3, name: "Брюки прямого кроя", price: 7200, category: "bottoms", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80", description: "Брюки со средней посадкой. Смесовая шерсть, застёжка на пуговицу." },
  { id: 4, name: "Кашемировый свитер", price: 9800, category: "tops", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", isNew: true, description: "Свитер из 100% кашемира. Круглый вырез, лёгкая фактура." },
  { id: 5, name: "Плащ", price: 12400, category: "outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", description: "Плащ из водоотталкивающего хлопка. Пояс в комплекте." },
  { id: 6, name: "Шёлковый шарф", price: 3200, category: "accessories", image: "https://images.unsplash.com/photo-1601924994987-69e26d3dc1e9?w=600&q=80", description: "Шарф из натурального шёлка. Размер 180×70 см." },
  { id: 7, name: "Джинсы relaxed", price: 6500, category: "bottoms", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80", description: "Джинсы свободного кроя. Органический хлопок, без эластана." },
  { id: 8, name: "Кожаная сумка", price: 15600, category: "accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", description: "Сумка из растительного дубления. Минимум фурнитуры." }
];

function getProductById(id) {
  return PRODUCTS.find(function (p) { return p.id === id; });
}

function formatPrice(n) {
  return n.toLocaleString("ru-RU") + " ₽";
}
