```json
{
  "type": "module",
  "scripts": {
    "dev": "node --watch server.js"
  }
}
```
Run:
```bash
npm run dev
```

---

## 📁 Project Structure

```
.env           # Environment variables
.gitignore     # Ignored files (e.g., node_modules/, .env)
server.js      # Main server file
routes/        # Route definitions
controllers/   # Controller functions
middleware/    # Custom middleware (e.g., auth)
models/        # Mongoose schemas
```

---

## 🔐 Environment Variables (`.env`)

```env
MONGO_URI=
JWT_SECRET=
```

Add `.env` to `.gitignore`:

```
.gitignore
.env
```

---

## 🌐 Server Info

* Base URL: `http://localhost:5000`

---

## 🚦 Status Codes

| Code | Meaning               | Usage                          |
| ---- | --------------------- | ------------------------------ |
| 200  | OK                    | Successful login               |
| 201  | Created               | Resource successfully created  |
| 401  | Unauthorized          | Invalid credentials            |
| 404  | Not Found             | User or resource not found     |
| 409  | Conflict              | Duplicate entry (e.g., email)  |
| 500  | Internal Server Error | Something went wrong on server |

* ✅ `true` → `response.status` is in range **200–299**
* ❌ `false` → All other status codes

---
# Roles:
- List:
  - user: Default role. Can create and view their own tasks.
  - admin: Can view all tasks (including those of other users) and create tasks.
- Roles are assigned during registration (default: user) and stored in the User model.
- Admins can be created manually in the database or via an admin-specific registration route (not implemented).

# Autherization:
- /middleware/restrictToUser: Doesn't allow users to access

## 🔐 Auth Routes (`/api/auth`)

### POST `/api/auth/register`

* **Description:** Register a new user.
* **Params:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
* **Response:** `201`


### POST `/api/auth/login`

* **Description:** Login with existing credentials.
* **Params:**

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
* **Response:** `200`, sets authentication token


### 🔒 **Logout User**

**Route:** `POST /api/auth/logout`
**Access:** Public (but only meaningful when user is logged in)
Logs out the current user by **clearing the JWT token cookie** from the browser.

#### ✅ Request:
No body required.
However, the request **must include credentials** to send the cookie.

```js
await fetch("http://localhost:5000/api/auth/logout", {
  method: "POST",
  credentials: "include"
});
```

* **Response:** `200`

#### 📝 Notes:
* JWT token must have been set during login using cookies.
* `res.clearCookie("token")` is used on the server to remove the token.
* Make sure `credentials: "include"` is used in all fetch requests involving authentication.




### GET `/api/auth/me`

* **Description:** Checking if user is loggedin.
* **Middleware:** `authMiddleware` -> checkLoggedin
* **Headers:**

  ```
  Authorization: Bearer <token>
  ```

* **Response:** `200`

---

### PUT /api/users/profile: 
* **Description:** Allows users with the user role to update their own profile (name only). Requires authentication and user role.
* **Params:**

  ```json
  { 
    "name": "New Name" 
  }
* **Response:**  200 { "data": { "name": "New Name", "email": "user@example.com", "role": "user" } }

---

## ✅ Task Routes (`/api/tasks`)

> ⚠️ All task routes require a valid `Authorization` token in headers.

### GET `/api/tasks/getTasks`

* **Middleware:** `authMiddleware` -> getTasks
* **Headers:**

  ```
  Authorization: Bearer <token>
  ```
* **Response:** `200`

---

### POST `/api/tasks/createTask`

* **Middleware:** `authMiddleware` -> createTask
* **Headers:**

  ```
  Authorization: Bearer <token>
  ```
* **Body:**

  ```json
  {
    "title": "New Task",
    "description": "Task description"
  }
  ```
* **Response:** `200`

---

## 🧠 Notes

* Use JWTs for secure routes.
* Keep your `.env` file private.
* Make sure MongoDB is running before starting the server.

---

## 🚀 Start the App

```bash
npm run dev
```
