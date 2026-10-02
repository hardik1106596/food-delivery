# Hara Bhara Food Ordering Project Guide

This document describes the project as it currently exists in this workspace. It is a small full-stack food-ordering prototype for **Hara Bhara**, a vegetarian Indian restaurant. The frontend displays the menu, lets a visitor build a cart, and starts a Razorpay checkout flow. The Express backend creates Razorpay orders and exposes a payment-signature verification endpoint.

## Project at a glance

- `dish/` is the React 18 single-page frontend, built and served by Vite.
- `Backend/` is the Node.js/Express API used for Razorpay order creation and payment verification.
- There is no root-level package file or shared install command. Install dependencies separately in each application folder.
- The frontend does not currently use a database. Menu items are static JavaScript data, and cart state lives in browser memory.

## Folder and file structure

```text
food-delivery/
|-- PROJECT_GUIDE.md             # This project and setup guide
|-- README.md                    # Earlier overview; its example structure is out of date
|-- Backend/
|   |-- .env                     # Local backend secrets/configuration; do not commit
|   |-- package.json             # Backend dependencies and scripts
|   `-- server.js                # Express API and Razorpay integration
`-- dish/
    |-- index.html               # Browser document, fonts, Razorpay script, React mount
    |-- package.json             # Frontend dependencies and Vite scripts
    |-- vite.config.js           # Vite configuration and React plugin
    |-- public/
    |   `-- vite.svg             # Current public favicon asset
    `-- src/
        |-- main.jsx             # React bootstrap, router, and cart provider
        |-- App.jsx              # Application routes
        |-- index.css            # Global styles, fonts, and design tokens
        |-- assets/
        |   `-- food/            # Available folder for local food imagery (currently empty)
        |-- context/
        |   `-- CartContext.jsx  # Shared in-memory cart state and actions
        |-- data/
        |   `-- dishes.js        # Menu categories and dish records
        |-- components/
        |   |-- CategorySection/ # Menu category filter and its styles
        |   |-- DishCard/        # Individual dish and quantity controls
        |   |-- Features/        # Restaurant values section
        |   |-- Footer/          # Page footer
        |   |-- Hero/            # Home page introduction and menu link
        |   |-- Navbar/          # Brand, section links, login link, and cart button
        |   `-- PopularDishes/   # Filtered menu grid
        `-- pages/
            |-- Home.jsx/.css    # Home page composition, filtering, and cart drawer
            |-- Login.jsx/.css   # Login form presentation
            |-- Register.jsx/.css# Registration form presentation
            `-- Checkout.jsx/.css# Cart review, price summary, and payment launch
```

Each component folder contains a `.jsx` component and a matching `.css` file. Page-level CSS lives beside its page. `index.css` supplies the styles shared across the frontend.

## Frontend details

### Startup and routing

`dish/index.html` supplies the `#root` element, loads Fraunces and Work Sans from Google Fonts, and loads Razorpay's hosted checkout script. `src/main.jsx` mounts the React application, wraps it in `BrowserRouter`, and puts `CartProvider` around all routes so each page can read the same cart.

`src/App.jsx` defines these routes:

| Path | Page | Purpose |
| --- | --- | --- |
| `/` | `Home` | Restaurant introduction, menu, cart drawer, and footer |
| `/login` | `Login` | Login form UI |
| `/register` | `Register` | Registration form UI |
| `/checkout` | `Checkout` | Cart review and payment initiation |
| any other path | `Home` | Fallback route |

### Home page and menu

`pages/Home.jsx` composes the navbar, hero, category filter, dish grid, restaurant features, and footer. It owns the currently selected menu category and whether the cart drawer is open. Category changes filter the static `dishes` array before it is passed to the menu grid.

`data/dishes.js` exports two arrays:

- `categories`: category identifiers and labels used to classify dishes.
- `dishes`: the menu records. Each record has an `id`, `name`, `category`, `price` (in rupees), `description`, `image` URL, vegetarian flag, and spice rating.

Images currently use remote Unsplash URLs. The local `src/assets/food/` folder is empty, so the menu depends on network access to load those photos.

The menu components divide responsibilities as follows:

- `CategorySection` renders the category buttons and reports the selected category to `Home`.
- `PopularDishes` renders the filtered menu and passes cart-related callbacks to each card.
- `DishCard` displays one dish and switches between an “Add to bag” button and quantity controls.
- `Hero` introduces the restaurant and links visitors to the menu.
- `Features` renders the restaurant's three stated values.
- `Navbar` provides in-page navigation, a login link, and the cart button/count.
- `Footer` provides restaurant copy, an email link, and copyright text.

### Cart state

`context/CartContext.jsx` owns a cart object keyed by dish ID. `CartProvider` makes the cart and its actions available through `useCart()`:

- `addToCart(dish)` adds a dish or increments its quantity.
- `increase(id)` and `decrease(id)` update quantity; decreasing the final item removes it.
- `cartItems`, `cartCount`, and `cartTotal` are derived from the cart.

The cart is in React state only. It is not saved to local storage or a server, so reloading the page clears it. The home page's cart drawer links to checkout; checkout reads the same shared cart.

### Login and registration

`pages/Login.jsx` and `pages/Register.jsx` currently implement form layouts and required browser input fields, but not real account operations. Login submission navigates to `/`; registration submission navigates to `/login`. Neither form calls the backend, checks credentials, stores an account, or creates an authenticated session.

## Backend and payment flow

`Backend/server.js` creates an Express app with JSON request parsing and CORS enabled. It loads configuration from `Backend/.env` through `dotenv` and initializes the Razorpay SDK with server-side credentials.

| Method and path | Current behavior |
| --- | --- |
| `GET /` | Returns a JSON message indicating the backend is running. |
| `POST /api/payment/create-order` | Reads `amount` from the request body, converts rupees to paise, and asks Razorpay to create an INR order. |
| `POST /api/payment/verify` | Recomputes the HMAC-SHA256 signature for the supplied Razorpay order and payment IDs and compares it with the submitted signature. |

When the checkout button is pressed, `pages/Checkout.jsx` calculates a fixed delivery fee of ₹40 and taxes of 5% (rounded) on the cart subtotal. It sends the total to `http://localhost:5000/api/payment/create-order`, then opens the Razorpay browser checkout using `VITE_RAZORPAY_KEY_ID`.

The browser's successful-payment handler currently logs the payment response only. It does **not** call `/api/payment/verify`, show a durable order confirmation, clear the cart, or store the order. The backend's verification route exists, but the frontend flow is not yet connected to it.

### Configuration and secrets

Create or update these local environment files. Do not commit real credentials:

`Backend/.env`:

```dotenv
PORT=5000
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

`dish/.env`:

```dotenv
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

The `VITE_` prefix makes the frontend key available to browser code. It must contain only the Razorpay key ID, never the key secret. The key ID used by frontend and backend should belong to the same Razorpay account/environment (test or live).

## Install and run locally

Use two terminals from the project root.

Terminal 1, frontend:

```powershell
cd dish
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

Terminal 2, backend:

```powershell
cd Backend
npm install
node server.js
```

The API listens on `http://localhost:5000` by default. The backend `package.json` currently has no start or development script, so `node server.js` is the current launch command.

To make a production frontend build:

```powershell
cd dish
npm run build
npm run preview
```

The production build output is generated in `dish/dist/`. The backend must still be deployed and configured separately; the checkout currently calls the hard-coded local URL `http://localhost:5000`.

## Dependencies and scripts

The frontend dependencies are React, React DOM, and React Router. Vite and `@vitejs/plugin-react` are development dependencies. Its scripts are `dev`, `build`, and `preview`.

The backend dependencies are Express, CORS, dotenv, and Razorpay. Its package currently defines only a placeholder `test` script that intentionally exits with an error; there is no automated test suite configured here.

## Current limitations and implementation notes

- The root `README.md` describes a previous app structure (for example, `Header.jsx` and `Cart.jsx`) that does not match the current source. This guide follows the actual `dish/src/` files.
- No database, user authentication service, order persistence, or server-side menu exists.
- Cart contents disappear on refresh and are not tied to a user.
- The checkout amount is supplied by the browser and trusted by the order-creation route. Before using real payments, the server should calculate/validate totals from trusted product and price data rather than accepting arbitrary client amounts.
- The payment verification endpoint should be called from the frontend after Razorpay reports payment success. A production flow should also handle failures, persist verified orders, and show a confirmation state.
- CORS currently allows requests from any origin. Restrict it to the deployed frontend origin for production.
- The frontend and backend need matching test/live Razorpay credentials; never expose `RAZORPAY_KEY_SECRET` in frontend files or variables prefixed with `VITE_`.
- `dish/public/vite.svg` is still the configured favicon and can be replaced with restaurant branding.

## Typical changes

- Add or edit menu items: update `dish/src/data/dishes.js`.
- Add a menu category: add its identifier and label to the category data, add a matching selectable category in `CategorySection.jsx`, and use that identifier on dish records.
- Change shared colors or typography: edit the tokens at the top of `dish/src/index.css` and the font links in `dish/index.html`.
- Change cart behavior: edit `dish/src/context/CartContext.jsx`.
- Change page navigation: edit `dish/src/App.jsx`.
- Change checkout or payment integration: coordinate changes in `dish/src/pages/Checkout.jsx` and `Backend/server.js`; keep secrets server-side.
