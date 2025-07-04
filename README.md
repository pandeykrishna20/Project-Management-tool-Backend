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

## Install dependencies  

    npm install

## Set environment variables
   Create a .env file in the root directory:

     DB_URI=your_mongodb_connection_string
     SECRET_KEY=your_jwt_secret_key


## Running the Server
Start in production mode:

             npm start
Start in development mode with auto-restart:

              npm run dev
             
     



