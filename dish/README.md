# Hara Bhara — Pure Veg Restaurant Menu (React + Vite)

A fully working, pure-vegetarian restaurant menu web app with real dish
photographs, category filtering, and a working cart with quantity controls.

## Folder structure

```
veg-menu-app/
├── index.html                  # HTML entry point (loads fonts + root div)
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite + React plugin config
├── .gitignore
├── README.md
├── public/
│   └── vite.svg                # Favicon
└── src/
    ├── main.jsx                # React root render
    ├── App.jsx                 # Top-level app state (cart, filters)
    ├── index.css                # All styling / design tokens
    ├── data/
    │   └── dishes.js            # Dish list + real photo URLs
    └── components/
        ├── Header.jsx           # Top bar + cart button
        ├── CategoryTabs.jsx     # Starters / Mains / South Indian / etc.
        ├── MenuGrid.jsx         # Renders the grid of DishCards
        ├── DishCard.jsx         # Single dish card (image, price, add button)
        └── Cart.jsx             # Slide-in cart drawer with totals
```

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## About the images

Every dish photo is a real, free-to-use photograph served directly from
Unsplash's CDN (`images.unsplash.com`), no API key needed. If any single
image URL ever goes down, just replace that one `image` field in
`src/data/dishes.js` — search unsplash.com for the dish name and copy the
new photo's URL.

## Customizing

- **Add/edit dishes:** edit `src/data/dishes.js`.
- **Add a category:** add it to the `categories` array in `dishes.js`, then
  use its `id` on any dish's `category` field.
- **Change colors/fonts:** edit the CSS variables at the top of
  `src/index.css`.
