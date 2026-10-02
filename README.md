# 🌿 Hara Bhara — Food Delivery Web App

A modern full-stack **food delivery web application** built with the **MERN-style architecture**, featuring food browsing, authentication, cart management, checkout, **Razorpay online payments**, and automatic **Email + SMS order notifications** after successful payment.

## 🚀 Key Integrations

- 💳 **Razorpay** — Secure online payment integration
- 📧 **Nodemailer + Gmail** — Automatic order confirmation emails
- 📱 **Twilio** — SMS notification after successful payment
- 🔐 **User Authentication** — Register and login using registered credentials
- 🛒 **Shopping Cart** — Add dishes, manage quantities, and calculate totals
- ✅ **Payment Verification** — Razorpay signature verification on the backend
- 🎉 **Order Confirmation** — Dedicated success page after successful payment

---

## ✨ Features

### 👤 Authentication
- User registration
- User login
- Registered credentials used for login
- Logged-in user's name displayed in the navigation
- Customer information used during checkout

### 🍛 Food Menu
- Browse available dishes
- Food images and descriptions
- Individual dish pricing
- Add dishes to the shopping bag

### 🛒 Cart & Checkout
- Add/remove food items
- Manage item quantities
- Automatic subtotal calculation
- Delivery charge calculation
- Tax calculation
- Final order total

### 💳 Razorpay Payment

The application integrates **Razorpay Test Mode** for online payments.

Payment flow:

```text
Checkout
   ↓
Create Razorpay Order
   ↓
Razorpay Payment
   ↓
Payment Successful
   ↓
Backend Signature Verification
   ↓
Order Confirmation
```

The backend verifies the Razorpay payment signature before processing the order confirmation.

### 📧 Email Confirmation

After successful payment, the backend automatically sends an order confirmation email using **Nodemailer with Gmail SMTP**.

The email contains:

- Customer name
- Order confirmation
- Razorpay Payment ID
- Razorpay Order ID
- Hara Bhara confirmation message

### 📱 SMS Notification

After successful payment, **Twilio** is used to send an SMS notification to the customer's registered phone number.

The SMS includes:

- Customer name
- Order confirmation
- Payment ID
- Thank-you message

### 🎉 Order Confirmation

After successful payment and backend verification, the user is redirected to a dedicated:

**Order Confirmed** page

with a **Back to Home** button.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express.js
- REST API
- CORS
- dotenv

### Database / Storage

- LocalStorage for current authentication/customer information

### Payment

- Razorpay

### Communication

- Nodemailer
- Gmail SMTP
- Twilio SMS

### Development Tools

- VS Code
- Git
- GitHub
- npm

---

## 📁 Project Structure

```text
food-delivery/
│
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── dish/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   │   └── dishes.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── Home.css
│   │   │   ├── Login.css
│   │   │   ├── Register.css
│   │   │   ├── Checkout.css
│   │   │   └── OrderSuccess.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   └── index.html
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/hardik1106596/food-delivery.git
cd food-delivery
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Configure Backend Environment Variables

Create:

```text
Backend/.env
```

Add:

```env
PORT=5000

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### 4. Start Backend

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd dish
npm install
```

Create:

```text
dish/.env
```

Add:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 6. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔄 Complete Order Flow

```text
User Registration
       ↓
User Login
       ↓
Browse Food
       ↓
Add Items to Cart
       ↓
Checkout
       ↓
Calculate Subtotal + Delivery + Tax
       ↓
Create Razorpay Order
       ↓
Razorpay Payment
       ↓
Payment Successful
       ↓
Backend Verifies Razorpay Signature
       ↓
       ├── 📧 Send Confirmation Email
       │
       └── 📱 Send SMS
       ↓
Order Confirmed
       ↓
Order Success Page
       ↓
Back to Home
```

---

## 🔐 Security

- Razorpay secret key is kept on the backend.
- Environment variables are used for sensitive credentials.
- Razorpay payment signatures are verified on the server.
- `.env` files should never be committed to GitHub.

Add to `.gitignore`:

```text
.env
node_modules/
```

---

## 🧪 Payment Testing

The project currently supports **Razorpay Test Mode**.

Use Razorpay's test credentials/payment methods while developing. No real money should be involved when using the test environment.

---

## 📌 Future Improvements

- MongoDB database integration
- JWT authentication
- Order history
- Admin dashboard
- Real-time order tracking
- Restaurant/admin management
- Product search and filtering
- Coupon and discount system
- Delivery partner module
- Production Razorpay integration
- Deployment with frontend and backend hosting

---

## 👨‍💻 Author

**Hardik Sagadhara**

B.Tech IT | Full Stack Developer

GitHub: `https://github.com/hardik1106596`

---

## ⭐ Project Highlights

This project demonstrates a complete food-ordering workflow with:

**React + Node.js + Express + Razorpay + Nodemailer + Twilio**

from user registration all the way to **payment verification, email/SMS notification, and order confirmation**.
