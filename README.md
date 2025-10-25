# UrbanPouch

UrbanPouch is a simple e-commerce web application built using Node.js, Express, MongoDB, and EJS. It supports both user and admin roles. Users can browse products and manage their cart, while admins can add or remove products.

## Features

* User authentication with JWT and bcrypt
* Flash messages for notifications
* Admin can add and delete products
* Users can view and add products to the cart
* Session management using express-session
* EJS templating with Bootstrap for UI

## Tech Stack

Node.js, Express.js, MongoDB, Mongoose, EJS, Multer, JWT, Bootstrap 5

## Installation

1. Clone the repository

   ```
   git clone https://github.com/Prabhdeep-24/UrbanPouch.git
   cd UrbanPouch
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_KEY=your_jwt_secret
   PORT=3000
   ```

4. Run the application

   ```
   node app.js
   ```

5. Open your browser and go to:

   ```
   http://localhost:3000
   ```

## Default Admin Account

The first time the app runs, it automatically creates a default admin account.

```
Email: owner@gmail.com  
Password: IamOwner
```

The admin can add new products, delete existing ones, and access the admin dashboard.

## Deployment

The backend is deployed on Render.
**Live Link:** [https://urbanpouch.onrender.com](https://urbanpouch.onrender.com)

**Build Command:**

```
npm install
```

**Start Command:**

```
node app.js
```

**Environment Variables on Render:**

```
MONGODB_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
PORT=3000
```

## Author
