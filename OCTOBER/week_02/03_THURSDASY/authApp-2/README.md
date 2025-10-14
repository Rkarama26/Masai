# Dish Booking System

A **Dish Booking System** with multi-role access (Admin, User, Chef), automatic chef assignment, order status updates, password reset via email, and Swagger API documentation.  

---

## Features

- **User Authentication**: Signup & login with hashed passwords and JWT authentication.
- **Role-Based Access Control**: 
  - Admin: CRUD dishes  
  - User: Place orders  
  - Chef: Update order status
- **Order Management**: 
  - Orders auto-assigned to a random chef
  - Status: `Order Received` → `Preparing` → `Out for Delivery` → `Delivered`
- **Password Reset**: Request and reset password via email
- **API Documentation**: Swagger `/api-docs` endpoint

---

## Tech Stack

- Node.js, Express.js  
- MongoDB & Mongoose  
- JWT for authentication  
- Bcrypt for password hashing  
- Nodemailer for email  
- Swagger for API documentation  

---

