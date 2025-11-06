# Book Your Show - Backend

Backend for the Book Your Show application, built with Node.js, Express and MongoDB.  
Provides RESTful APIs for user authentication, event management, ticket booking and admin reports.

## Project structure

```
Book_Your_Show_Backend/
├── controllers/
│   ├── auth.controller.js
│   ├── event.controller.js
│   ├── ticket.controller.js
│   └── admin.controller.js
├── services/
│   ├── event.service.js
│   ├── ticket.service.js
│   └── admin.service.js
├── models/
│   ├── user.model.js
│   ├── event.model.js
│   └── ticket.model.js
├── middlewares/
│   └── authMiddleware.js
├── routes/
│   ├── auth.routes.js
│   ├── event.routes.js
│   ├── ticket.routes.js
│   └── admin.routes.js
├── utils/
│   └── sendEmail.js
├── .env
├── package.json
└── server.js (or index.js)
```

## Setup

1. Clone and enter the repo:

```bash
git clone <repository_url>
cd Evaluation
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (use `.env_example` if present) and set required variables:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/book_your_show
JWT_SECRET_KEY=your_jwt_secret
APP_EMAIL=your_gmail@gmail.com
GOOGLE_APP_PASSWORD=your_app_password
FROM_NAME="Book_Your_Show"
```

4. Start the server (development):

```bash
npm run dev
# or
node server.js
```

## Common API examples

- Create Event (POST /api/events)

```json
{
  "name": "Tech Conference 2025",
  "category": "conference",
  "date": "2025-12-10T09:00:00Z",
  "basePrice": 500
}
```

- Book Ticket (POST /api/tickets)

```json
{
  "eventId": "6737af9ac7fd2d9b1f9aa9a2",
  "quantity": 2
}
```

- Admin Report (GET /api/admin/report) — example response:

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



