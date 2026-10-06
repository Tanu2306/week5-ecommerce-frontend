const img = (seed, n = 0) => `https://picsum.photos/seed/${seed}-${n}/600/600`;

const raw = [
  ['Walnut Desk Shelf', 'Desk', 64, 4.7, 212, 'Raised monitor shelf in solid walnut with a cable slot at the back.'],
  ['Ceramic Pour-over Set', 'Kitchen', 48, 4.8, 340, 'Hand-glazed dripper and carafe. Makes two strong cups.'],
  ['Canvas Weekender', 'Carry', 112, 4.5, 98, 'Waxed canvas duffel with a padded laptop sleeve and shoe pocket.'],
  ['Brass Task Lamp', 'Desk', 89, 4.6, 156, 'Dimmable LED lamp with a weighted base and a warm 2700K glow.'],
  ['Stoneware Mug Pair', 'Kitchen', 32, 4.4, 421, 'Two 350 ml mugs, dishwasher safe, speckled matte glaze.'],
  ['Leather Card Wallet', 'Carry', 39, 4.3, 275, 'Vegetable-tanned leather, holds six cards and folded notes.'],
  ['Felt Desk Mat', 'Desk', 36, 4.2, 187, 'Wool felt mat, 80 x 40 cm, non-slip underside.'],
  ['Cast Iron Skillet', 'Kitchen', 58, 4.9, 612, 'Pre-seasoned 26 cm skillet that goes from stove to oven to table.'],
  ['Rolltop Backpack', 'Carry', 129, 4.6, 143, 'Water-resistant 22 L pack with a magnetic rolltop closure.'],
  ['Mechanical Keyboard', 'Desk', 139, 4.7, 530, 'Compact 75% layout, hot-swappable switches, USB-C.'],
  ['Linen Apron', 'Kitchen', 28, 4.1, 76, 'Stonewashed linen apron with crossback straps and deep pockets.'],
  ['Everyday Tote', 'Carry', 45, 4.0, 201, 'Heavy cotton tote with an inner zip pocket and reinforced handles.'],
  ['Cork Monitor Stand', 'Desk', 54, 4.4, 119, 'Sustainable cork riser with a storage drawer for pens and chargers.'],
  ['Carbon Steel Knife', 'Kitchen', 76, 4.8, 288, '20 cm chef knife with a razor edge and walnut handle.'],
  ['Hard Shell Organizer', 'Carry', 34, 4.2, 164, 'Zip case for cables, chargers and earbuds with elastic loops.'],
  ['Standing Desk Mat', 'Desk', 72, 4.5, 93, 'Anti-fatigue mat with a contoured surface for long work sessions.'],
];

export const products = raw.map(([name, category, price, rating, reviewCount, description], i) => {
  const id = i + 1;
  const seed = name.toLowerCase().replace(/\s+/g, '-');
  return {
    id,
    name,
    category,
    price,
    rating,
    reviewCount,
    popularity: reviewCount,
    description,
    stock: 3 + ((i * 7) % 12),
    images: [img(seed, 0), img(seed, 1), img(seed, 2)],
    image: img(seed, 0),
    reviews: [
      { id: `${id}-1`, author: 'Aarav', rating: 5, text: 'Better than the photos. Solid build and arrived quickly.' },
      { id: `${id}-2`, author: 'Meera', rating: Math.max(3, Math.round(rating) - 1), text: 'Good value. Would buy again.' },
    ],
  };
});

export const categories = ['Desk', 'Kitchen', 'Carry'];
