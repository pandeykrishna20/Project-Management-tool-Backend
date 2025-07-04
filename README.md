#  Project Management Tool – Backend

A backend API built using **Node.js**, **Express.js**, and **MongoDB** for managing users, projects, and tasks.

---

##  Tech Stack

- **Node.js** – JavaScript runtime (v22.14)
- **Express.js** – Web framework for building RESTful APIs
- **MongoDB** – NoSQL database for storing users, projects, and tasks

---

##  Features

- User registration and login with JWT authentication
- Email verification system
- CRUD operations for Projects and Tasks
- Task filtering by status
- Password hashing with bcrypt
- Form validation using Joi
- Protected routes with token middleware

---

##  Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pandeykrishna20/Project-Management-tool-Backend.git
   cd Project-Management-tool-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**

   Create a `.env` file in the root directory:

   ```env
   DB_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   ```

---

##  Running the Server

- Start in production mode:
  ```bash
  npm start
  ```

- Start in development mode with auto-restart:
  ```bash
  npm run dev
  ```

---

##  API Endpoints (Overview)

| Method | Route                          | Description                 |
|--------|--------------------------------|-----------------------------|
| POST   | `/api/users/register`          | Register a new user         |
| POST   | `/api/users/login`             | Login user and return token |
| GET    | `/api/projects`                | List all user projects      |
| POST   | `/api/projects`                | Create new project          |
| PUT    | `/api/projects/:id`            | Update a project            |
| GET    | `/api/tasks/:projectId/tasks`  | List tasks by project       |
| POST   | `/api/tasks/:projectId/tasks`  | Create task for project     |

---

## 🧾 License

This project is licensed under the MIT License.

---

> Built by [@pandeykrishna20](https://github.com/pandeykrishna20)
