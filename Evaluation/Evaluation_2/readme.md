# 💡 IdeaHub –  Idea Sharing Platform


To access the app locally, open this URL in your browser:

👉 **[Dashboard](http://127.0.0.1:5500/Evaluation/Evaluation_2/dashboard.html)**

---

## 🔐 Authentication Pages

- ✨ **[Signup Page](http://127.0.0.1:5500/Evaluation/Evaluation_2/signup.html)** – Create a new user account.
- 🔑 **[Login Page](http://127.0.0.1:5500/Evaluation/Evaluation_2/login.html)** – Log in to an existing account.

> Only logged-in users can post or upvote ideas.



## 🔧 Sample JSON Data

Below is an example of how the post data is structured in the Firebase Realtime Database:

```json
{
  "postId123": {
    "title": "Add dark mode to IdeaHub",
    "description": "Dark mode would improve usability at night.",
    "author": "rohit@example.com",
    "votes": 12,
    "timestamp": 1690998200000
  },
  "postId456": {
    "title": "Introduce categories for ideas",
    "description": "Helps users to filter and explore ideas by topics.",
    "author": "user2@example.com",
    "votes": 7,
    "timestamp": 1691084600000
  }
}

```json
And also the user 
```json
{
  "users": {
    "user1": {
      "email": "user@example.com",
      "password": "secure123"
    },
    "user2": {
      "email": "admin@example.com",
      "password": "adminpass"
    },
     "user3": {
      "email": "rv262003@gmail.com",
      "password": "rohit"
    }

  }
}
```json