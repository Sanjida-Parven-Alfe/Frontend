# 🏠 StyleDecor - Smart Home & Ceremony Decoration System

**StyleDecor** is a modern, full-stack appointment and service management system designed for a local decoration company. It bridges the gap between traditional walk-in consultations and modern online booking needs. Whether it's for a cozy home makeover or a grand wedding ceremony, StyleDecor provides a seamless workflow for users, decorators, and admins.

### 🔗 Project Links
- **Live Site:** [https://style-decor-199.vercel.app](https://style-decor-199.vercel.app)
- **Backend API:** [https://backend-delta-sable-65.vercel.app](https://backend-delta-sable-65.vercel.app)

---

## 🚀 Key Features

### 👤 For Users
- **Browse Services:** Explore various decoration packages categorized by type (Home, Wedding, Office, etc.) with advanced search and filtering.
- **Smart Booking:** Logged-in users can book services by selecting dates and locations directly from the Service Details page.
- **Secure Payments:** Integrated **Stripe** payment gateway for seamless transactions.
- **Dashboard:** Manage bookings (Update/Cancel), view payment history, and track service status in real-time.

### 🎨 For Decorators
- **Project Tracking:** View assigned projects and update their progress step-by-step (e.g., Planning Phase → Setup in Progress → Completed).
- **Schedules & Earnings:** Access daily schedules and a summary of total earnings.

### 🛠 For Admins
- **Inventory Management:** Full CRUD operations for decoration services and packages.
- **User Management:** Approve, disable, or promote users to the "Decorator" role.
- **Service Assignment:** Assign dedicated decorator teams to paid bookings.
- **Business Insights:** Data visualization using charts to monitor revenue and service demand.

---

## 🛠 NPM Packages Used

### Client Side:
- `react-router-dom` (Routing)
- `axios` (API requests)
- `firebase` (Authentication)
- `framer-motion` (Animations)
- `react-leaflet` (Map Integration)
- `stripe / stripe-js` (Payments)
- `lucide-react` / `react-icons` (Icons)
- `tanstack/react-query` (Data Fetching)
- `recharts` (Analytics Charts)

### Server Side:
- `express` (Server framework)
- `mongodb` (Database)
- `jsonwebtoken` (Security)
- `dotenv` (Environment variables)
- `cors` (Cross-origin resource sharing)
- `firebase-admin` (Admin SDK)

---

## ⚙️ Environment Security
The following environment variables are secured to prevent unauthorized access:
- **Firebase Keys:** `VITE_apiKey`, `VITE_authDomain`, etc.
- **MongoDB Credentials:** `DB_USER`, `DB_PASS`.
- **Security Tokens:** `ACCESS_TOKEN_SECRET`.
- **Payment Keys:** `STRIPE_SECRET_KEY`.

---

## 🗺️ UI & UX Highlights
- **Modern Design:** Built with **Tailwind CSS** and **DaisyUI** for a clean, professional aesthetic.
- **Responsiveness:** Fully optimized for Mobile, Tablet, and Desktop views.
- **Feedback System:** Uses Toasts for success/error notifications and skeletons for smooth loading states.

---

## 🛠️ Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sanjida-Parven-Alfe/Frontend.git
   
2. Install dependencies:
   ```bash
   npm install

3. Set up .env file: Create a `.env.local` file and add your Firebase credentials and Backend URL.
   
4. Run the project:
   ```bash
   npm run dev

## 👨‍💼 Admin Credentials for Evaluation
Admin Email: admin@gmail.com

Admin Password: Admin123!

