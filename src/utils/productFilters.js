export function applyFilters(products, { query, category, maxPrice, minRating, sort }) {
  const q = (query || '').trim().toLowerCase();
  let out = products.filter(
    (p) =>
      (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
      (category === 'All' || p.category === category) &&
      p.price <= maxPrice &&
      p.rating >= minRating
  );
  const sorters = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name),
    popularity: (a, b) => b.popularity - a.popularity,
  };
  if (sorters[sort]) out = [...out].sort(sorters[sort]);
  return out;
}
