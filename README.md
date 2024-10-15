
# Blog Admin Panel

A powerful and interactive blog administration panel built with **Node.js**, **Express.js**, and **MongoDB**. This application supports a variety of functionalities, including blog and comment management, image uploads with **Multer**, and user authentication with **Passport.js** and **express-session**. The password recovery system uses OTP verification for enhanced security. 

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Available Routes](#available-routes)
- [Models](#models)
- [Controllers](#controllers)
- [Middleware](#middleware)
- [Authentication](#authentication)
- [Password Reset](#password-reset)
- [Image Upload](#image-upload)
- [Running the App](#running-the-app)
- [Future Improvements](#future-improvements)

## Features

- User registration, login, and session management.
- OTP-based password recovery with email verification.
- Image upload for blog posts and profiles.
- CRUD operations for users, blogs, topics, subtopics, and comments.
- Clear separation using the MVC architecture.
- Role-based access control (Admin, Editor, User).
- Image handling with **Multer** for file uploads.
- Clean and responsive UI built with **EJS** templates and **Bootstrap**.

## Getting Started

Follow these steps to get the project up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/rakeshmakvana/Node-pr-8.git
cd blog-admin-panel
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the App

To configure the app without `.env` file, directly modify the `app.js` or `config.js` (if available) for credentials and settings like:

- **Port**: Modify the port if necessary (default: 3000)
- **MongoDB URI**: Configure the MongoDB connection in the database file or directly in the code:
  ```js
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/blogAdminDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
  ```

- **Session Secret**: Modify `SESSION_SECRET` in the session middleware:
  ```js
  app.use(session({
      secret: 'mysecrate',
      resave: false,
      saveUninitialized: false
  }));
  ```

- **Email Settings**: For password recovery (using OTP), configure the email transport directly in your `userController.js`:
  ```js
  const transporter = nodemailer.createTransport({
      host: 'smtp.your-email.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'your-email@example.com',
          pass: 'your-email-password'
      }
  });
  ```

### 4. Start the Application

```bash
npm start
```

Visit `http://localhost:3000` to access the app.

## Project Structure

```plaintext
├── controllers
│   ├── blogController.js
│   ├── userController.js
│   ├── topicController.js
│   ├── subtopicController.js
│   └── commentController.js
├── models
│   ├── Blog.js
│   ├── User.js
│   ├── Topic.js
│   ├── Subtopic.js
│   └── Comment.js
├── routes
│   ├── blogRoutes.js
│   ├── userRoutes.js
│   ├── topicRoutes.js
│   ├── subtopicRoutes.js
│   └── commentRoutes.js
├── views
│   ├── blog.ejs
│   ├── dashboard.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── forgotPassword.ejs
│   ├── resetPassword.ejs
│   └── partials
│       └── navbar.ejs
├── public
│   ├── css
│   └── uploads
├── app.js
├── package.json
└── README.md
```

## Configuration

Ensure that the following are configured directly in the code:

- **MongoDB URI** in the database connection code.
- **Session Secret** in session middleware.
- **SMTP Settings** for email-based OTP verification.

## Available Routes

| Route                | HTTP Method | Description                   |
|----------------------|-------------|-------------------------------|
| `/users/register`     | POST        | Registers a new user.          |
| `/users/login`        | POST        | Logs in an existing user.      |
| `/users/logout`       | GET         | Logs out the current user.     |
| `/blogs`              | GET/POST    | Fetch/Create blog posts.       |
| `/topics`             | GET/POST    | Fetch/Create blog topics.      |
| `/subtopics`          | GET/POST    | Fetch/Create subtopics.        |
| `/comments`           | GET/POST    | Fetch/Create blog comments.    |
| `/password/forgot`    | POST        | Initiate password reset.       |
| `/password/reset/:otp`| POST        | Reset password with OTP.       |

## Models

- **User**: Stores user credentials, roles, and metadata.
- **Blog**: Stores blog content, author, and timestamps.
- **Topic**: Holds blog topics for organization.
- **Subtopic**: Nested categories under topics.
- **Comment**: Stores user comments on blog posts.

## Controllers

Each controller handles the logic for different parts of the app:

- **User Controller**: Manages user registration, login, and password resets.
- **Blog Controller**: Handles blog post CRUD operations.
- **Topic Controller**: Manages topics and subtopics.
- **Comment Controller**: Adds, edits, and deletes comments.

## Middleware

- **authMiddleware**: Protects routes based on user roles and authentication status.
- **multerMiddleware**: Configured for image uploads in the `/public/uploads` directory.

## Authentication

Using **Passport.js**, the app authenticates users with username and password. Sessions are managed using **express-session**, allowing users to stay logged in across different routes.

## Password Reset

Users can reset their passwords by requesting an OTP via email. After submitting the OTP, users can set a new password. This system is built using **NodeMailer** and customized OTP generation.

## Image Upload

Image uploads are managed via **Multer**. Uploaded files are stored in the `public/uploads` folder and can be linked to blog posts or user profiles.

## Running the App

To run the app, simply execute:

```bash
npm start
```

Access the app at `http://localhost:3000`.

## Future Improvements

- **Pagination** for blogs and comments.
- **Advanced search** functionality.
- **Two-factor authentication** for enhanced security.
- **Social media login** (e.g., Google, Facebook).

---

Enjoy building your Blog Admin Panel!
