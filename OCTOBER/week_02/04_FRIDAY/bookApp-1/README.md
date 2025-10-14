# 📚 Book Management API

This project implements a fully functional **Book Management API** with:

- User authentication via JWT
- CRUD operations for books
- Redis caching for fast GET requests
- Bulk book insertion using Redis + cron jobs
- Role-based access control (`user` role)

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Redis (ioredis)
- JWT Authentication
- Node-Cron for scheduled tasks

---

##  Features

1. **User Authentication**
   - JWT-based authentication
   - Role-based access control
   - Protects book routes

2. **Book CRUD**
   - `POST /books` – Add a book
   - `GET /books` – List user’s books (cached in Redis)
   - `PUT /books/:id` – Update a book
   - `DELETE /books/:id` – Delete a book

3. **Redis Caching**
   - GET `/books` first checks Redis cache
   - If cached, returns data from Redis
   - If not cached, fetches from MongoDB and stores in Redis for 1 hour

4. **Bulk Book Insertion**
   - `POST /books/bulk` accepts an array of books
   - Stores them in Redis immediately, without writing to MongoDB
   - Returns response: `"Books will be added later"`

5. **Cron Job**
   - Runs every 2 minutes
   - Reads all pending bulk books from Redis
   - Inserts them into MongoDB
   - Invalidates Redis cache after insertion

---


