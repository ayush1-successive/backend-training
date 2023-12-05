# Middleware Documentation

## Table of Contents

- [What is Middleware?](#what-is-middleware)
- [Key aspects of middleware](#key-aspects-of-middleware)
- [Usage](#usage)

## What is Middleware?

In Node.js, middleware refers to a series of functions that have access to the request and response objects in the HTTP cycle. These functions can modify these objects, end the request-response cycle, or call the next middleware function in the stack. Middleware plays a crucial role in handling tasks such as authentication, logging, error handling, and more in Node.js web applications.

## Key aspects of middleware

Here are some key aspects of middleware in Node.js:

### 1. Middleware Functions:

- Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.
- These functions can perform various tasks, modify the request or response objects, and control the flow of the request-response cycle.

### 2. Middleware Stack:

- In a Node.js application, middleware functions are organized into a stack. When a request is received, it passes through this stack, and each middleware function has the opportunity to process the request or response.
- Middleware functions are executed in the order they are added to the stack.

### 3. 'next' Function:

- The next function is a callback function that passes control to the next middleware function in the stack.
- If a middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function.

### 4. Built-in Middleware:

Node.js includes some built-in middleware modules, such as:

- **express.static:** Serves static files like HTML, images, and stylesheets.
- **express.json** and **express.urlencoded:** Parse incoming request bodies in JSON and URL-encoded formats, respectively.

## Usage

### 1. Application-level Middleware:

- Middleware can be applied at the application level using app.use() in frameworks like Express. This means the middleware will be executed for every incoming request.
- Example:

```javascript
import express from "express";
const app = express();

// Application-level middleware
app.use(myMiddleware);
```

### 2. Router-level Middleware:

- Middleware can also be applied at the router level to affect only specific routes.
- Example:

```javascript
import express from "express";
const router = express.Router();

// Router-level middleware
router.use(myMiddleware);
```

### 3. Error Handling Middleware:

- Special middleware functions can be defined to handle errors in the application.
- Example:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
```
