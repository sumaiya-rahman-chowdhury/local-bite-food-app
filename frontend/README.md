# 🍽️ Local Bite

**Local Bite** is a Food Sharing Community platform that connects hotels, restaurants, and food vendors with individuals in need or those looking for affordable meals. Vendors can sell surplus food at discounted prices or donate it to the community. Users can claim donations or purchase low-cost meals with ease and dignity.

---

## 🌐 Live Demo

👉 [localbite.vercel.app](https://frontend-xi-bay-91.vercel.app/)

---

## 📌 Features

- Vendor registration and login with role-based access
- Add, edit, and manage food listings (sell or donate)
- Users can browse, buy, or claim donated food
- Secure checkout with Stripe integration
- In-app and email notifications for orders and donations
- Clean and responsive UI with real-time updates
- Cart management and order tracking
- Donation request handling and fulfillment
- Contact and support page

---

## 🛠️ Tech Stack

The project uses a modern MERN stack along with several popular libraries and tools:

### Frontend
The frontend is built with Next.js 14 using the App Router. It is styled with Tailwind CSS and ShadCN UI components. Forms are managed using React Hook Form, with animations provided by Framer Motion for smooth UI interactions.

### Backend
The backend is powered by Express.js and includes secure JWT authentication, Stripe integration for handling payments, NodeMailer for sending email notifications, and Multer for file/image uploads.

### Database
MongoDB is used as the primary database, managed through Mongoose for schema modeling and querying.

### Other Tools
The project integrates Cloudinary for image hosting, React Toastify for real-time user alerts, and Context API for global state management. Deployment is handled via Vercel (frontend), Render or Railway (backend), and MongoDB Atlas for database hosting.

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account
- Stripe account (for payments)

### Clone the repository

```bash
git clone https://github.com/yourusername/local-bite.git
cd local-bite
