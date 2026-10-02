// All images are real vegetarian dish photographs served from Unsplash's CDN.
// Format: https://images.unsplash.com/photo-<id>?params (free to use, no attribution required)

export const categories = [
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Main Course' },
  { id: 'south', label: 'South Indian' },
  { id: 'breads', label: 'Breads' },
  { id: 'desserts', label: 'Desserts' },
]

export const dishes = [
  {
    id: 1,
    name: 'Veg Samosa (2 pcs)',
    category: 'starters',
    price: 89,
    description:
      'Crisp golden pastry filled with spiced potatoes and green peas, served with tamarind and mint chutney.',
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    veg: true,
    spice: 2,
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    category: 'mains',
    price: 249,
    description:
      'Soft cottage cheese cubes simmered in a velvety tomato-butter gravy, finished with cream and kasuri methi.',
    image:
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    veg: true,
    spice: 1,
  },
  {
    id: 3,
    name: 'Chana Masala',
    category: 'mains',
    price: 199,
    description:
      'Chickpeas slow-cooked in a tangy onion-tomato masala with ginger, garlic and a blend of whole spices.',
    image:
      'https://images.unsplash.com/photo-1587033649773-5c231faa21e3?auto=format&fit=crop&w=800&q=80',
    veg: true,
    spice: 2,
  },
  {
    id: 4,
    name: 'Dal Makhani',
    category: 'mains',
    price: 219,
    description:
      'Black lentils and kidney beans simmered overnight with butter and cream for a rich, smoky finish.',
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    veg: true,
    spice: 1,
  },
  {
    id: 5,
    name: 'Vegetable Biryani',
    category: 'mains',
    price: 259,
    description:
      'Fragrant basmati rice layered and dum-cooked with garden vegetables, saffron and whole spices.',
    image:
      'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    veg: true,
    spice: 2,
  },
  {
    id: 6,
    name: 'Masala Dosa',
    category: 'south',
    price: 159,
    description:
      'A crisp fermented-rice crepe filled with spiced potato masala, served with sambar and coconut chutney.',
    image:
      'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    veg: true,
    spice: 1,
  },
  {
    id: 7,
    name: 'Idli Sambar',
    category: 'south',
    price: 129,
    description:
      'Steamed rice cakes, soft and pillowy, served with piping hot sambar and coconut chutney.',
    image:
      'https://images.unsplash.com/photo-1788621879512-0aefb7a774ff?auto=format&fit=crop&w=800&q=80',
    veg: true,
    spice: 1,
  },
  {
    id: 8,
    name: 'Butter Naan',
    category: 'breads',
    price: 69,
    description:
      'Pillowy tandoor-baked flatbread brushed with butter, best paired with any of our curries.',
    image:
      'https://images.unsplash.com/photo-1601050690294-397f3c324515?auto=format&fit=crop&w=800&q=80',
    veg: true,
    spice: 0,
  },
  {
    id: 9,
    name: 'Gulab Jamun (2 pcs)',
    category: 'desserts',
    price: 99,
    description:
      'Warm milk-solid dumplings soaked in rose and cardamom scented sugar syrup.',
    image:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=800&q=80',
    veg: true,
    spice: 0,
  },
  {
    id: 10,
    name: 'Assorted Mithai',
    category: 'desserts',
    price: 179,
    description:
      "A chef's selection of traditional Indian sweets, including kaju katli and barfi.",
    image:
      'https://images.unsplash.com/photo-1758910536889-43ce7b3199fd?auto=format&fit=crop&w=800&q=80',
    veg: true,
    spice: 0,
  },
]
