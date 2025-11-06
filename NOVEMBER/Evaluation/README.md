# Book_Your_Show_Backend/

## This is the backend codebase for the Book Your Show application, built using Node.js and Express. It provides RESTful APIs for user authentication, event management, ticket booking, and admin reporting.

│
├── controllers/  
│ ├── auth.controller.js
│ ├── event.controller.js
│ ├── ticket.controller.js
│ └── admin.controller.js
│
├── services/  
│ ├── event.service.js
│ ├── ticket.service.js
│ └── admin.service.js
│
├── models/  
│ ├── user.model.js
│ ├── event.model.js
│ └── ticket.model.js
│
├── middlewares/  
│ └── authMiddleware.js
│
├── routes/ # Express route files
│ ├── auth.routes.js
│ ├── event.routes.js
│ ├── ticket.routes.js
│ └── admin.routes.js
│
├── utils/ # Helper functions (email, etc.)
│ └── sendEmail.js
│
├── .env # Environment variables
├── package.json
├── server.js / index.js
└── README.md

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd Evaluation
   ```

2. Install dependencies:

   ```bash

    npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables from `.env_example`:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/book_your_show
   JWT_SECRET_KEY=your_jwt_secret
   APP_EMAIL=your_gmail@gmail.com
   GOOGLE_APP_PASSWORD=your_app_password
   FROM_NAME="Book_Your_Show"
   ```

### Event Create request example

```json
{
  "name": "Tech Conference 2025",
  "category": "conference",
  "date": "2025-12-10T09:00:00Z",
  "basePrice": 500
}
```

### Ticket Booking request example

```json
{
  "eventId": "6737af9ac7fd2d9b1f9aa9a2",
  "quantity": 2
}
```

### Admin Report Response example

```json
{
  "summary": {
    "totalBookings": 120,
    "totalRevenue": 240000,
    "avgSpendPerUser": 3000,
    "categoryBreakdown": [
      { "category": "concert", "bookings": 60, "revenue": 120000 },
      { "category": "sports", "bookings": 40, "revenue": 80000 },
      { "category": "conference", "bookings": 20, "revenue": 40000 }
    ]
  }
}

```