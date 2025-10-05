# 🚀 UXfolio-Backend-API: Designer Portfolio API

## 📝 Project Overview

This project provides a robust and secure Backend API for a modern UX/UI Designer Portfolio website. It is built on **Node.js, Express.js, and TypeScript**, utilizing **MongoDB (Mongoose)** for reference-based data modeling and **JWT-based Authentication** with strict **Role-Based Access Control (RBAC)** for Admin and Customer roles.

---

## 🎯 Key Features & Objectives

* **Role-Based Access Control (RBAC):** Strict separation of privileges for two user types:
    * **Admin:** Full CRUD control over Designs, Categories, Pricing Plans, and access to all Reviews and Purchase Orders.
    * **Customer:** Allowed to view designs, purchase, submit reviews, and manage their own profile/history.
* **Authentication & Security:** Secure JWT authentication is implemented, and **bcrypt** is used for hashing and salting user passwords.
* **Data Modeling:** Implements a **Reference-Based** MongoDB design across 6 core models: **User, Design, Category, PricingPlan, Review, and Purchase**.
* **Input Validation:** Strong request data validation is enforced using **Zod** schemas.

---

## ⚙️ Tech Stack & Tools

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | `Node.js` | Backend Environment |
| **Language** | `TypeScript` | Type Safety & Scalability |
| **Framework** | `Express.js` | API Endpoint Creation |
| **Database** | `MongoDB` | NoSQL Database |
| **ODM** | `Mongoose` | Object Data Modeling |
| **Security** | `bcrypt` | Password Hashing |
| **Validation** | `Zod` | Request Schema Validation |
| **Auth** | `JWT` | Authentication & Authorization |

---

## 🌐 API Endpoints & Authorization Details

All API routes are prefixed with `/api/`. Access is strictly controlled by the `checkAuth` middleware based on the user's role (Admin, Customer, or Public).

| Module | HTTP Method | Endpoint | Description | Access Role |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/login` | Authenticate with credentials and receive token | PUBLIC |
| **Auth** | `POST` | `/auth/refresh-token` | Generate a new access token using a refresh token | PUBLIC |
| **Auth** | `POST` | `/auth/logout` | Invalidate current session/token (Server-side implementation) | ADMIN, CUSTOMER |
| **Auth** | `POST` | `/auth/reset-password` | Change password for the authenticated user | ADMIN, CUSTOMER |
| **User** | `POST` | `/users/register` | Create a new user account (defaults to Customer) | PUBLIC |
| **User** | `GET` | `/users/all-users` | Retrieve all user accounts | ADMIN |
| **User** | `GET` | `/users/:id` | Get a specific user's details | ADMIN, CUSTOMER (self) |
| **User** | `PATCH` | `/users/:id` | Update user profile details | ADMIN, CUSTOMER (self) |
| **User** | `DELETE` | `/users/:id` | Delete a user account | ADMIN |
| **Category** | `GET` | `/categories` | Retrieve all design categories | PUBLIC |
| **Category** | `GET` | `/categories/:id` | Retrieve a single category by ID | PUBLIC |
| **Category** | `POST` | `/categories` | Create a new category | ADMIN |
| **Category** | `PATCH` | `/categories/:id` | Update an existing category | ADMIN |
| **Category** | `DELETE` | `/categories/:id` | Delete a category | ADMIN |
| **Design** | `GET` | `/designs` | Retrieve all designs (supports filtering/pagination) | PUBLIC |
| **Design** | `GET` | `/designs/:id` | Retrieve a single design by ID | PUBLIC |
| **Design** | `POST` | `/designs` | Create a new design record | ADMIN |
| **Design** | `PATCH` | `/designs/:id` | Update an existing design record | ADMIN |
| **Design** | `DELETE` | `/designs/:id` | Delete a design record | ADMIN |
| **Pricing** | `GET` | `/pricing` | Retrieve all pricing plans | PUBLIC |
| **Pricing** | `GET` | `/pricing/:id` | Retrieve a single pricing plan by ID | PUBLIC |
| **Pricing** | `POST` | `/pricing` | Create a new pricing plan | ADMIN |
| **Pricing** | `PATCH` | `/pricing/:id` | Update an existing pricing plan | ADMIN |
| **Pricing** | `DELETE` | `/pricing/:id` | Delete a pricing plan | ADMIN |
| **Review** | `GET` | `/reviews/design/:designId` | Get reviews for a specific design | PUBLIC |
| **Review** | `POST` | `/reviews` | Submit a new review for a design | ADMIN, CUSTOMER |
| **Review** | `GET` | `/reviews/all` | Get all reviews across all designs | ADMIN |
| **Review** | `DELETE` | `/reviews/:id` | Delete a review record | ADMIN, CUSTOMER (self) |
| **Purchase**| `POST` | `/purchases` | Initiate a purchase record | ADMIN, CUSTOMER |
| **Purchase**| `GET` | `/purchases/my-purchases` | Get authenticated user's purchase history | CUSTOMER |
| **Purchase**| `GET` | `/purchases` | Get all purchase orders (Order Tracking) | ADMIN |
| **Purchase**| `PATCH` | `/purchases/:id/status` | Update payment status of a purchase order | ADMIN |

<!-- ## 👥 User & Auth API Endpoints -->
---
## 🚀 Project Setup Guide

### Step 1: Clone and Install Dependencies

```bash
# 1. Clone the repository
git clone https://github.com/masud2005/UXfolio-Backend-API.git
cd uxfolio-backend-api

# 2. Install dependencies
npm install

```
### Step 2: Configure Environment Variables
Create a .env file in the project root directory and set the following variables:

```
# General Configuration
PORT=your_port_number
DB_URL=your_db_url
NODE_ENV=development

# Hashing (bcrypt)
BCRYPT_SALT_ROUND=salt_round_number

# JWT Access Token Configuration
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_ACCESS_EXPIRES=jwt_expires_time

# JWT Refresh Token Configuration
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRES=jwt_refresh_expires_time
```

### Step 3: Run the Project
# npm run build 

---

## 💾 Example Data for API Testing

### 1. User Model (POST /api/users/register)
```
{
  "name": "Alex Smith",
  "email": "alex.smith@example.com",
  "password": "strongpassword123",
  "phone": "01887654321",
  "address": "Dhaka, Bangladesh"
}
```

### 2. Category Model (POST /api/categories)

```
{
  "name": "Mobile UI/UX Design"
}
```
### 3. PricingPlan Model (POST /api/pricing)

```
{
  "name": "Standard Plan Access",
  "price": 49.99,
  "features": [
    "Full Commercial License",
    "Unlimited Downloads"
  ],
  "duration": "1 Year"
}
```

### 4. Design Model (POST /api/designs)

```
{
  "title": "Minimalist Dark Mode Dashboard",
  "category": "<CATEGORY_ID_HERE>",
  "description": "A highly functional and aesthetic dark theme dashboard template built with Figma.",
  "previewImageUrl": "[https://example.com/images/dark_dashboard_preview.png](https://example.com/images/dark_dashboard_preview.png)",
  "designerName": "Alice Designer",
  "usedTools": ["Figma", "Sketch"],
  "effectsUsed": ["3D Shadows"],
  "price": 69.50,
  "process": "Concept Sketch → Wireframing → High-Fidelity Mockup",
  "complexityLevel": "Intermediate",
  "tags": ["Dashboard", "Dark Mode", "SaaS"],
  "status": "Active"
}
```

### 5. Review Model (POST /api/reviews)

```
{
  "design": "<DESIGN_ID_HERE>",
  "rating": 5,
  "comment": "Absolutely brilliant design! Clean, modern, and easy to customize.",
  "reviewer": "<CUSTOMER_ID_HERE>"
}
```

### 6. Purchase Model (POST /api/purchases)
```
{
  "customer": "<CUSTOMER_ID_HERE>",
  "design": "<DESIGN_ID_HERE>",
  "selectedPricingPlan": "<PRICING_PLAN_ID_HERE>",
  "paymentStatus": "Pending" 
}
```