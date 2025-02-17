# Smart-Inventory-Management-System
Gage Strong- Favorite quote is Do or do not there is no try


This is a simple **Inventory Management System** built using **Node.js**, **Express**, and **MongoDB**. It allows users to manage products, track locations, and handle stock alerts.

## 🚀 Features

- **User Authentication** (Login & Logout)
- **Dashboard** with product list, stock alerts, and locations
- **Add, Edit, and Delete Products**
- **Responsive UI** with a modal for adding/editing products
- **Protected Routes** for authorized users

## 🛠️ Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** HTML, CSS, JavaScript
- **Authentication:** Passport.js (Session-based Auth)

## 📌 Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/inventory-system.git
   cd inventory-system
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file and add the following:
   ```env
   MONGO_URI=mongodb+srv://your_mongodb_uri
   SESSION_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

## 📂 Project Structure

```
📦 inventory-management-system
├── 📂 public           # Static files (CSS, JS, images)
├── 📂 routes           # Express routes (product, auth, etc.)
├── 📂 controllers      # Business logic
├── 📂 models           # Mongoose models
├── 📂 views            # HTML templates
├── server.js          # Main Express server
├── package.json       # Project metadata
└── README.md          # Project documentation
```

## 🔑 Authentication

- Users need to log in to access the dashboard.
- The **Login button** dynamically changes to **Logout** when a user is authenticated.

## 📊 Dashboard

- Displays product list with **Edit** and **Delete** options.
- Shows **stock alerts** if a product's quantity is low.
- Includes a **modal form** to add new products.

## 🔄 API Endpoints

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | `/products`     | Get all products  |
| POST   | `/products`     | Add a new product |
| PUT    | `/products/:id` | Edit a product    |
| DELETE | `/products/:id` | Delete a product  |
| POST   | `/github/login`   | User login        |
| POST   | `/logout`  | User logout       |

## ✨ Contributions

Feel free to contribute by forking the repo and submitting a pull request.



