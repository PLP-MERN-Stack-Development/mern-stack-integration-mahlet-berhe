# 📝 MERN Blog App

## 📌 Project Overview

A full-stack blog platform built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in, create posts, comment, and toggle dark mode. The app features responsive design, secure authentication, and a clean user experience.

---

## 🚀 Setup Instructions

### 🔧 Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Fill in your MongoDB URI and JWT secret in .env
npm run server
cd client
npm install
cp .env.example .env
# Set VITE_API_URL to your backend URL in .env
npm run dev
## 📡 API Documentation

### 🔐 Authentication Routes
- `POST /api/users/register`  
  Registers a new user with name, email, and password.

- `POST /api/users/login`  
  Authenticates a user and returns a JWT token.

---

### 📝 Post Routes
- `GET /api/posts`  
  Retrieves all blog posts.

- `POST /api/posts`  
  Creates a new post (requires authentication).

- `GET /api/posts/:id`  
  Retrieves a single post by ID.

- `PUT /api/posts/view/:id`  
  Increments the view count of a post.

---

### 💬 Comment Routes
- `GET /api/posts/:id/comments`  
  Retrieves all comments for a specific post.

- `POST /api/posts/:id/comments`  
  Adds a new comment to a post (requires authentication).

---

### 📂 Category Routes
- `GET /api/categories`  
  Retrieves all available post categories.

---

## ✅ Features Implemented

- 🔐 **User Authentication**  
  Register and login with secure JWT-based authentication.

- 📝 **Post Management**  
  Create, view, and read blog posts with category and tag support.

- 💬 **Comment System**  
  Users can comment on posts and view all comments.

- 🌙 **Dark Mode Toggle**  
  Switch between light and dark themes with localStorage persistence.

- 📈 **View Count Tracking**  
  Each post tracks how many times it’s been viewed.

- 🧭 **Routing with React Router**  
  Seamless navigation between pages with protected routes.

- 🎨 **Responsive UI with Tailwind CSS**  
  Clean, mobile-friendly design with dark mode styling.

- 🛠️ **Error Handling**  
  Graceful handling of 404s, server errors, and form validation.

- 📦 **Environment Configuration**  
  `.env.example` files provided for both client and server setup.